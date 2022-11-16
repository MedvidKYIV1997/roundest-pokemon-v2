import { router } from "../trpc";
import { rootRouter } from "./root";

export const appRouter = router({
  root: rootRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
