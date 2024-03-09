import { PokemonProvider } from "./context";
import Table from "./components/table";
import PokemonDetail from "./components/pokemon-form";
import Dashboard from "./components/dashboard";
import { useMediaQuery } from "usehooks-ts";
import PokemonModal from "./components/modal";

const Pokemon = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <PokemonProvider>
      <div className="container mx-auto mt-8">
        <div className="flex">
          <div className="w-full lg:w-2/3 p-4">
            <Table />
          </div>

          {isMobile ? (
            <PokemonModal />
          ) : (
            <div className="w-1/3" style={{ paddingTop: 125 }}>
              <PokemonDetail />
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto mt-8">
        <Dashboard />
      </div>
    </PokemonProvider>
  );
};

export default Pokemon;

