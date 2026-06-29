import { createFileRoute, Outlet } from "@tanstack/react-router";

// Local single-user mode: no auth check, always pass through.
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: () => {
    return { user: { id: "local-user", email: "local@localhost" } };
  },
  component: () => <Outlet />,
});