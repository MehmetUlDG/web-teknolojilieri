export const ACTIONS = {
  FETCH_INIT: 'FETCH_INIT',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
  SET_QUERY: 'SET_QUERY',
  SET_FILTERS: 'SET_FILTERS',
  SET_WATCHLIST: 'SET_WATCHLIST',
  SET_PAGE_SIZE: 'SET_PAGE_SIZE',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  ADD_WATCHLIST: 'ADD_WATCHLIST',
  REMOVE_WATCHLIST: 'REMOVE_WATCHLIST',
  CLEAR_WATCHLIST: 'CLEAR_WATCHLIST'
};

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  query: 'friends',
  shows: [],
  watchlist: [],
  filters: {
    genre: '',
    language: '',
    minRating: 0
  },
  pagination: {
    currentPage: 1,
    pageSize: 6,
    totalResults: 0
  }
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_INIT:
      return { ...state, isLoading: true, isError: false, error: null };

    case ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        shows: action.payload,
        pagination: {
          ...state.pagination,
          totalResults: action.payload.length,
          currentPage: 1 
        }
      };

    case ACTIONS.FETCH_FAILURE:
      return { ...state, isLoading: false, isError: true, error: action.payload };

    case ACTIONS.SET_QUERY:
      return { ...state, query: action.payload, pagination: { ...state.pagination, currentPage: 1 } };

    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, currentPage: 1 }
      };

    case ACTIONS.ADD_WATCHLIST:
      if (state.watchlist.find(item => item.show.id === action.payload.show.id)) {
        return state;
      }
      return { ...state, watchlist: [...state.watchlist, action.payload] };

    case ACTIONS.REMOVE_WATCHLIST:
      return {
        ...state,
        watchlist: state.watchlist.filter(item => item.show.id !== action.payload.id)
      };

    case ACTIONS.CLEAR_WATCHLIST:
      return { ...state, watchlist: [] };

    case ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        pagination: { ...state.pagination, currentPage: action.payload }
      };

    case ACTIONS.SET_PAGE_SIZE:
      return {
        ...state,
        pagination: { ...state.pagination, pageSize: action.payload, currentPage: 1 }
      };
      
    default:
      return state;
  }
};