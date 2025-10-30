import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { ACTIONS } from '../../contexts/appReducer';

const SearchBox = () => {
  const { state, dispatch } = useAppContext();
  const [searchTerm, setSearchTerm] = useState(state.query);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchTerm !== state.query) {
        dispatch({ type: ACTIONS.SET_QUERY, payload: searchTerm });
      }
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm, state.query, dispatch]);

  return (
    <input
      type="text"
      placeholder="Dizi ara..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
    />
  );
};

export default SearchBox;