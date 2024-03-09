import { usePokemonContext } from "../context";

export default function Dashboard() {
  const { state } = usePokemonContext();
  const { pokemons } = state;

  const abc = "abcdefghijklmnopqrstuvwxyz";
  const abcArray = abc.split("");

  const countPokemonByLetter = () => {
    const counts: { letter: string; count: number }[] = [];

    abcArray.forEach((letter) => {
      const filtered = pokemons.filter((poke) => {
        return poke.name.charAt(0).toLowerCase() == letter;
      });

      counts.push({ letter, count: filtered.length });
    });

    return counts;
  };

  const pokemonCounts = countPokemonByLetter();

  return (
    <div className="flex flex-col items-center gap-[10px] p-5 my-5 border-2 rounded-md">
      <h1>Number of Pokemon that start with each letter of the alphabet</h1>
      <ul className="dashboard-letter">
        {pokemonCounts.map((item) => (
          <li key={item.letter}>
            {item.letter.toUpperCase()}: {item.count}
          </li>
        ))}
      </ul>
    </div>
  );
}

