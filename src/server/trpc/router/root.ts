import { PokemonClient } from "pokenode-ts";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { prisma } from "@/server/db/client";

export const rootRouter = router({
  getPokemonById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const api = new PokemonClient();

      const pokemon = await api.getPokemonById(input.id);

      return {
        name: pokemon.name,
        imageUrl: pokemon.sprites.other?.dream_world.front_default,
      };
    }),
  voteForRoundest: publicProcedure
    .input(z.object({ votedFor: z.number(), votedAgainst: z.number() }))
    .mutation(async ({ input }) => {
      const voteInDB = await prisma?.vote.create({
        data: {
          ...input,
        },
      });

      return { success: true, vote: voteInDB };
    }),
});
