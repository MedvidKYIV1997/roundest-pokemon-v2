import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { PokemonOutput, trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

const btn =
  "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

const Home: NextPage = () => {
  const [pokemons, setPokemons] = useState<number[]>(getOptionsForVote());
  const [first, second] = pokemons;

  const firstPokemon = trpc.root.getPokemonById.useQuery({ id: first || 1 });
  const secondPokemon = trpc.root.getPokemonById.useQuery({ id: second || 2 });

  const voteMutation = trpc.root.voteForRoundest.useMutation();

  const voteForRoundest = (selected: number) => {
    if (first && second) {
      if (selected === first) {
        voteMutation.mutate({
          votedFor: first,
          votedAgainst: second,
        });
      } else {
        voteMutation.mutate({
          votedFor: first,
          votedAgainst: second,
        });
      }
      setPokemons(getOptionsForVote());
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="text-center text-2xl">Which Pokemon is Rounder</div>
      <div className="p-2" />
      <div className="flex max-w-2xl items-center justify-between rounded border p-8">
        {!firstPokemon.isLoading &&
          !secondPokemon.isLoading &&
          firstPokemon.data &&
          secondPokemon.data &&
          first &&
          second && (
            <>
              <PokemonListing
                pokemon={firstPokemon.data}
                vote={() => voteForRoundest(first)}
              />
              <div className="p-8 text-2xl">Vs</div>

              <PokemonListing
                pokemon={secondPokemon.data}
                vote={() => voteForRoundest(second)}
              />
            </>
          )}
      </div>
    </div>
  );
};

export default Home;

const PokemonListing: FC<{ pokemon: PokemonOutput; vote: () => void }> = (
  props
) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-64 w-64 flex-col place-content-center ">
        <img
          alt={props.pokemon.name}
          src={props.pokemon.imageUrl || ""}
          className="max-h-full max-w-full"
        />
      </div>
      <div className="p-3" />

      <div className="text-center text-xl capitalize">{props.pokemon.name}</div>
      <div className="p-3" />
      <button className={btn} onClick={props.vote}>
        Rounder
      </button>
    </div>
  );
};
