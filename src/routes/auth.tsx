import { createFileRoute, Navigate } from "@tanstack/react-router";

// Local single-user mode: skip login, go straight to the app.
export const Route = createFileRoute("/auth")({
  component: () => <Navigate to="/home" replace />,
});