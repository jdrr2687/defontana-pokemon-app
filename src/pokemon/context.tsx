import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constant/api";

export interface Action {
  type: string;
  payload: any;
}

export enum PokemonActionTypes {
  "LOAD" = "load_pokemons",
  "FIND" = "find_pokemon",
  "RESET" = "reset",
}

export interface pokemon {
  name: string;
  id: number;
  url: string;
  types?: string[];
  image?: string;
  description?: string;
}

export interface PokemonState {
  pokemons: pokemon[];
  selected: pokemon | null;
}

export const emptyState: PokemonState = {
  pokemons: [],
  selected: null,
};

function Reducer(state: PokemonState, action: Action): PokemonState {
  switch (action.type) {
    case PokemonActionTypes.LOAD:
      return { ...state, pokemons: action.payload };
    case PokemonActionTypes.FIND:
      return { ...state, selected: action.payload };
    case PokemonActionTypes.RESET:
      return emptyState;
    default:
      return state;
  }
}
interface PokemonContextType {
  state: PokemonState;
  loading: boolean;
  dispatcher: (_action: Action) => void;
  setPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  findPokemon: (name: string) => void;
  recordsPerPage:number;
  filterText:string;
  setFilterText:(filterText:string) => void;
}

const PokemonContext = createContext<PokemonContextType>({
  state: emptyState,
  loading: false,
  setPage: () => {},
  dispatcher: () => {},
  currentPage: 1,
  totalPages: 1,
  setCurrentPage: () => {},
  findPokemon: () => {},
  recordsPerPage:20,
  filterText:"",
  setFilterText:()=>{}
});

export const PokemonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatcher] = useReducer(Reducer, emptyState);

  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [recordsPerPage, setRecordPerPage] = useState<number>(20);
  const [filterText, setFilterText] = useState<string>('');

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/?limit=1302`);
        dispatcher({
          type: PokemonActionTypes.LOAD,
          payload: response.data.results,
        });
        setTotalPages(Math.ceil(response.data.count / recordsPerPage));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchData();

  }, [currentPage]);

  const findPokemon = async (name: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/${name}`);
      const data = {
        name: response.data.forms[0].name,
        id: "",
        url: "",
        types: response.data.types.map((type:any) => type.type.name),
        image:
          response.data.sprites.versions["generation-v"]["black-white"]
            .front_default,
      };
      dispatcher({
        type: PokemonActionTypes.FIND,
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching pokémon detail:", error);
    }
  };


  const setPage = (page: number) => setCurrentPage(page);

  return (
    <PokemonContext.Provider
      value={{
        loading,
        state,
        dispatcher,
        setPage,
        currentPage,
        totalPages,
        setCurrentPage,
        findPokemon,
        recordsPerPage,
        setFilterText,
        filterText
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error("usePokemonContext must be used within a PokemonProvider");
  }

  return context;
};
