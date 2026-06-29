// Stub for local single-user mode — no Supabase auth required.
// Satisfies any frontend import of `supabase` without throwing.
export const supabase = {
  auth: {
    getUser: async () => ({
      data: { user: { id: "local-user", email: "local@localhost" } },
      error: null,
    }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } },
    }),
  },
} as any;
