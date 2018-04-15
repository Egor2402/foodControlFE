import { combineReducers } from 'redux';
import user from './user';
import food from './food';

export default combineReducers({
  user,
  food
})
