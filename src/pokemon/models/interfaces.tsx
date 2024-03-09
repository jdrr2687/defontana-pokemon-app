export interface Action {
    type: string;
    payload: any;
  }
  
  
  export interface Pokemon {
    name: string;
    id: number;
    url: string;
    types?: string[];
    image?: string;
    description?: string;
  }
  
  export interface PokemonState {
    pokemons: Pokemon[];
    selected: Pokemon | null;
  }

  export interface PokemonContextType {
    state: PokemonState;
    loading: boolean;
    dispatcher: (_action: Action) => void;
    setPage: (page: number) => void;
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
    findPokemon: (name: string) => void;
    recordsPerPage: number;
    filterText: string;
    setFilterText: (filterText: string) => void;
  }