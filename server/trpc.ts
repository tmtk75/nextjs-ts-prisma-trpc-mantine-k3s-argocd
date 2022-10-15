import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.create({ transformer: superjson });

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ next, ctx }) => {
  // if (!ctx.session?.user?.email) {
  //   throw new TRPCError({
  //     code: "UNAUTHORIZED",
  //   });
  // }
  // return next({
  //   ctx: {
  //     session: ctx.session,
  //   },
  // });
  return next();
});

export const protectedProcedure = t.procedure.use(isAuthed);
