import { PokemonClient } from "pokenode-ts";
import { prisma } from "../src/server/db/client";

const doBackfill = async () => {
  const api = new PokemonClient();

  const allPokemon = await api.listPokemons(0, 493);

  const formattedPokemon = allPokemon.results.map((p, i) => ({
    id: i + 1,
    name: p.name,
    spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      i + 1
    }.svg`,
  }));

  await prisma.pokemon.createMany({
    data: formattedPokemon,
  });
};

// doBackfill()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
