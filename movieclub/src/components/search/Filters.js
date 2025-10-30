import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { ACTIONS } from '../../contexts/appReducer';

const Filters = () => {
  const { state, dispatch } = useAppContext();

  const handleFilterChange = (e) => {
    dispatch({
      type: ACTIONS.SET_FILTERS,
      payload: { [e.target.name]: e.target.value }
    });
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
      <input
        type="text"
        name="genre"
        placeholder="Tür"
        value={state.filters.genre}
        onChange={handleFilterChange}
      />
      <input
        type="text"
        name="language"
        placeholder="Dil"
        value={state.filters.language}
        onChange={handleFilterChange}
      />
      <input
        type="number"
        name="minRating"
        placeholder="Min Puan (0-10)"
        value={state.filters.minRating}
        onChange={handleFilterChange}
        min="0"
        max="10"
        step="0.1"
      />
    </div>
  );
};

export default Filters;