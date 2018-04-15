import moment from 'moment';
import { SEARCH_FOOD,
         SEARCH_FOOD_SUCCESS,
         ADD_FOOD,
         SET_INGESTION_DATE_TIME,
         RESET_FOOD_DATA,
         ADD_INGESTION,
         ADD_INGESTION_SUCCESS,
         GET_INGESTIONS,
         GET_INGESTIONS_SUCCESS,
         SET_FILTERS } from '../constants/Food';

const initialState = {
  fetching: false,
  foundFoods: [],
  buildingIngestion: {
    foods: [],
    dateTime: null
  },
  ingestions: [],
  filteredIngestions: null,
  ingestionAdded: false
};

export default function food(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FOOD:
    case GET_INGESTIONS:
      return { ...state, fetching: true };

    case ADD_INGESTION:
      return { ...state, fetching: true, ingestionAdded: true };

    case GET_INGESTIONS_SUCCESS:
      return { ...state, ingestions: action.payload, fetching: false };

    case SEARCH_FOOD_SUCCESS:
      return { ...state, foundFoods: action.payload, fetching: false };

    case ADD_FOOD:
      return { ...state, buildingIngestion: { ...state.buildingIngestion, foods: [...state.buildingIngestion.foods, action.payload] } };

    case SET_INGESTION_DATE_TIME:
      return { ...state, buildingIngestion: { ...state.buildingIngestion, dateTime: action.payload } };

    case RESET_FOOD_DATA:
      return { ...state, foundFoods: [], buildingIngestion: { foods: [], dateTime: null }, ingestionAdded: false };

    case ADD_INGESTION_SUCCESS:
      return { ...state, foundFoods: [], ingestions: [...state.ingestions, action.payload], buildingIngestion: { foods: [], dateTime: null }, ingestionAdded: false };

    case SET_FILTERS:
      const filteredIngestions = state.ingestions.filter(ingestion => moment(ingestion.date_time).format('DD-MM-YYYY') === moment(action.payload.date_time).format('DD-MM-YYYY'));
      return { ...state, filteredIngestions };

    default:
      return state;
  }
}
