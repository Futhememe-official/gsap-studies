import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {/* @ts-ignore */}
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  ),
});
