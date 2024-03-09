import { Pokemon } from "../models/interfaces";
import Search from "./search";
import { usePokemonContext } from "../context";
import Pagination from "./paginations";
import { LuEye } from "react-icons/lu";

const TableTable = () => {
  const {
    state,
    currentPage,
    findPokemon,
    recordsPerPage,
    filterText,
  } = usePokemonContext();
  const { pokemons } = state;

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.includes(filterText.toLowerCase())
  );
  const currentRows = filteredPokemons.slice(startIndex, endIndex);

  return (
    <div className="relative ">
      <Search />

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
          {currentRows.map((pokemon: Pokemon, index: number) => (
            <tr key={index} className=" border-b dark:border-gray-700">
              <td className="border px-4 py-2">
                {(currentPage - 1) * 20 + index + 1}
              </td>
              <td className="border px-4 py-2">{pokemon.name}</td>
              <td className="border px-4 py-2">
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => findPokemon(pokemon.name)}
                    type="button"
                    className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                  >
                    <LuEye />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination startIndex={startIndex} endIndex={endIndex} />
    </div>
  );
};

export default TableTable;

