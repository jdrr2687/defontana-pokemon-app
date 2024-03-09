import { pokemon } from "../context";
import Search from "./search";
import { usePokemonContext } from "../context";
import Pagination from "./paginations";
import Loading from "./loading";

const TableTable = () => {
  const { state, currentPage, loading, findPokemon, recordsPerPage, filterText} = usePokemonContext();
  const { pokemons } = state;

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  const filteredPokemons = pokemons.filter(pokemon =>
		pokemon.name.includes(filterText.toLowerCase())
	);
  const currentRows = filteredPokemons.slice(startIndex, endIndex);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Search searchPokemon={() => {}}></Search>
      {loading ? (
        <Loading />
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((pokemon: pokemon, index: number) => (
              <tr key={index} className=" border-b dark:border-gray-700">
                <td className="border px-4 py-2">
                  {(currentPage - 1) * 20 + index + 1}
                </td>
                <td className="border px-4 py-2">{pokemon.name}</td>
                <td className="border px-4 py-2">
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      type="button"
                      onClick={() => findPokemon(pokemon.name)}
                    >
                      Select
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Pagination startIndex={startIndex} endIndex={endIndex} />
    </div>
  );
};

export default TableTable;
