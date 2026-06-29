
-- profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  cefr_level TEXT DEFAULT 'A1',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- scenario_progress
CREATE TABLE public.scenario_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  scenario_id TEXT NOT NULL,
  confidence INT NOT NULL DEFAULT 0 CHECK (confidence BETWEEN 0 AND 5),
  times_practiced INT NOT NULL DEFAULT 0,
  last_practiced_at TIMESTAMPTZ,
  can_do_confirmed BOOL NOT NULL DEFAULT false,
  UNIQUE (user_id, scenario_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.scenario_progress TO authenticated;
GRANT ALL ON public.scenario_progress TO service_role;
ALTER TABLE public.scenario_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users manage own scenario_progress" ON public.scenario_progress FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- phrase_reviews
CREATE TABLE public.phrase_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  phrase_id TEXT NOT NULL,
  due_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  stability FLOAT NOT NULL DEFAULT 1.0,
  difficulty FLOAT NOT NULL DEFAULT 5.0,
  last_review_at TIMESTAMPTZ,
  review_count INT NOT NULL DEFAULT 0,
  UNIQUE (user_id, phrase_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.phrase_reviews TO authenticated;
GRANT ALL ON public.phrase_reviews TO service_role;
ALTER TABLE public.phrase_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users manage own phrase_reviews" ON public.phrase_reviews FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- real_life_uses
CREATE TABLE public.real_life_uses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  phrase_id TEXT NOT NULL,
  scenario_id TEXT,
  confirmed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.real_life_uses TO authenticated;
GRANT ALL ON public.real_life_uses TO service_role;
ALTER TABLE public.real_life_uses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users manage own real_life_uses" ON public.real_life_uses FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email,'@',1)))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
