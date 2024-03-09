import { PokemonProvider } from "./context";
import Table from "./components/table";
import PokemonDetail from "./components/pokemon-form";
import Dashboard from "./components/dashboard";

const Pokemon = () => {
  return (
    <PokemonProvider>
      <div className="container mx-auto mt-8 max-w-screen-lg">
        <div className="flex">
          <div className="w-2/3 p-4">
            <Table />
          </div>
          <div className="w-1/3 p-4">
            <PokemonDetail />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 max-w-screen-lg">
        <div className="flex">
          <div className="w-2/3 p-4">
      <Dashboard />
      </div>
        </div>
      </div>
    </PokemonProvider>
  );
};

export default Pokemon;
