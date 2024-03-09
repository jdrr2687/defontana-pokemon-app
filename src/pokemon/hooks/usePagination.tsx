

import { usePokemonContext } from "../context";

const usePagination = ( ) => {

    const { currentPage,  setCurrentPage, state, recordsPerPage} = usePokemonContext();

    const totalRows = state.pokemons.length
  
    const totalPages = Math.ceil(totalRows / recordsPerPage);
  
    const currentData = () => {
      const startIndex = (currentPage - 1) * recordsPerPage;
      const endIndex = startIndex + recordsPerPage;
      return state.pokemons.slice(startIndex, endIndex);
    };
  
    const nextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
  
    const prevPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
  
    return { nextPage, prevPage, currentData, currentPage, totalPages, totalRows };
  };

  export default usePagination;