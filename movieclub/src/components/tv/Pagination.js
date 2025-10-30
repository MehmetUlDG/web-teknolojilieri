import React, { useMemo } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { ACTIONS } from '../../contexts/appReducer';

const Pagination = () => {
  const { state, dispatch } = useAppContext();
  const { currentPage, pageSize } = state.pagination;
  const { shows, filters } = state;

  const totalFilteredResults = useMemo(() => {
    return shows.filter(item => {
      const { show } = item;
      const rating = show.rating?.average || 0;
      const matchesGenre = filters.genre ? 
        show.genres?.some(g => g.toLowerCase().includes(filters.genre.toLowerCase())) : true;
      const matchesLanguage = filters.language ?
        show.language?.toLowerCase().includes(filters.language.toLowerCase()) : true;
      const matchesRating = filters.minRating ? 
        rating >= parseFloat(filters.minRating) : true;
      return matchesGenre && matchesLanguage && matchesRating;
    }).length;
  }, [shows, filters]);

  const totalPages = Math.ceil(totalFilteredResults / pageSize);

  const setPage = (page) => {
    dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: page });
  };

  if (totalPages <= 1) return null;

  return (
    <div style={{ margin: '1rem 0', textAlign: 'center' }}>
      <button onClick={() => setPage(1)} disabled={currentPage === 1}>
        İlk
      </button>
      <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
        Geri
      </button>
      <span style={{ margin: '0 1rem' }}>
        Sayfa {currentPage} / {totalPages}
      </span>
      <button onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages}>
        İleri
      </button>
      <button onClick={() => setPage(totalPages)} disabled={currentPage === totalPages}>
        Son
      </button>
    </div>
  );
};

export default Pagination;