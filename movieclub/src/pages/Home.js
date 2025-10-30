import React, { useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { ACTIONS } from '../contexts/appReducer';
import * as api from '../api/tvmaze';

import SearchBox from '../components/search/SearchBox';
import Filters from '../components/search/Filters';
import TVList from '../components/tv/TVList';
import Pagination from '../components/tv/Pagination';
import WatchlistPanel from '../components/watchlist/WatchlistPanel';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';

const Home = () => {
  const { state, dispatch } = useAppContext();
  const { query, isLoading, isError, error, shows } = state;

  const fetchData = async () => {
    dispatch({ type: ACTIONS.FETCH_INIT });
    try {
      const response = await api.searchShows(query);
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: ACTIONS.FETCH_FAILURE, payload: err.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]); 

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (isError) {
      return <ErrorMessage message={error} onRetry={fetchData} />;
    }
    if (shows.length === 0) {
      return <EmptyState message={`"${query}" için sonuç bulunamadı.`} />;
    }
    return (
      <>
        <TVList />
        <Pagination />
      </>
    );
  };

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 3 }}>
        <SearchBox />
        <Filters />
        {renderContent()}
      </div>
      <div style={{ flex: 1 }}>
        <WatchlistPanel />
      </div>
    </div>
  );
};

export default Home;