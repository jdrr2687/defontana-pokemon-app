import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { usePokemonContext } from "../context";

export default function Search() {
  const { state, findPokemon, setFilterText } = usePokemonContext();
  const { pokemons } = state;

  const handleOnSearch = (string, results) => {
    setFilterText(string);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = async (item) => {
    await findPokemon(item.name);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  return (
    <div className="py-5">
      <label>Search by pokemon's name:</label>

      <ReactSearchAutocomplete
        items={pokemons}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        onClear={handleOnClear}
        styling={{ zIndex: 9 }} // To display it on top of the search box below
        fuseOptions={{ keys: ["name"] }}
        autoFocus
      />
    </div>
  );
}

