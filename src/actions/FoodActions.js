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

import api from '../api';

export function searchFood(term) {
  return (dispatch) => {
    dispatch({
      type: SEARCH_FOOD,
      payload: term
    });

    api.get('/food', {
      params: { term }
    }).then(({ data }) => {
      dispatch({
        type: SEARCH_FOOD_SUCCESS,
        payload: data
      });
    }, () => {
      console.log('Error');
    });
  };
}

export function addFood(food) {
  return {
    type: ADD_FOOD,
    payload: food
  };
}

export function setIngestionDateTime(time) {
  return {
    type: SET_INGESTION_DATE_TIME,
    payload: time
  };
}

export function resetFoodData() {
  return {
    type: RESET_FOOD_DATA
  };
}

export function addIngestion(params) {
  return (dispatch) => {
    dispatch({
      type: ADD_INGESTION
    });

    api.post('/ingestion', params).then(({ data }) => {
      dispatch({
        type: ADD_INGESTION_SUCCESS,
        payload: data
      });
    }, () => {
      console.log('Error');
    });
  };
}

export function getIngestions(user_id) {
  return (dispatch) => {
    dispatch({
      type: GET_INGESTIONS
    });

    api.get('/ingestion', {
      params: { user_id }
    }).then(({ data }) => {
      dispatch({
        type: GET_INGESTIONS_SUCCESS,
        payload: data
      });
    }, () => {
      console.log('Error');
    });
  };
}

export function setFilters(filters) {
  return {
    type: SET_FILTERS,
    payload: filters
  };
}
