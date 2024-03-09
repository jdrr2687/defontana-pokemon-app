
import { usePokemonContext } from "../context";

export default function Dashboard() {

    const { state} = usePokemonContext();
    const { pokemons } = state;

    const abc = "abcdefghijklmnopqrstuvwxyz";
    const abcArray = abc.split('')

    const countPokemonByLetter = () => {
  
        let counts: { letter: string; count: number; }[] = [];

        abcArray.forEach((letter)=>{

          const filtered =  pokemons.filter(poke=>{
            return poke.name.charAt(0).toLowerCase()  ==  letter
          })

          counts.push({letter, count: filtered.length })

        })


        return counts
      };
    
      const pokemonCounts = countPokemonByLetter();

      return (
        <div>
      <h1>Cantidad de Pokémon que comienzan con cada letra del abecedario</h1>
      <ul className="dashboard-letter">
        {pokemonCounts.map((item) => (
          <li key={item.letter}>{item.letter.toUpperCase()}: {item.count}</li>
        ))}
      </ul>
    </div>
      )

}