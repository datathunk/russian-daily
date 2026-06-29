// Local single-user mode — no Supabase auth required.
// Always passes through with userId "local-user".
// The supabase context is a no-op stub; server functions use JSON files directly.
import { createMiddleware } from '@tanstack/react-start'

export const requireSupabaseAuth = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    return next({
      context: {
        supabase: {} as any,
        userId: 'local-user',
      },
    })
  }
)
