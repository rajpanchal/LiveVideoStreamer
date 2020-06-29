import _ from 'lodash';
import { CREATE_STREAM, DELETE_STREAM, 
  EDIT_STREAM, FETCH_STREAM, FETCH_STREAMS } from '../actions/types';

const streamsReducer = (state = {}, action) => {
  switch(action.type) {
    case FETCH_STREAM:
    case CREATE_STREAM:
    case EDIT_STREAM:
      // Key Interpolation Index - A crazy new syntax
      return {...state, [action.payload.id]: action.payload};
    case FETCH_STREAMS:
      // Instead of using for..of loop, we can use lodash's mapKeys method to map a list of objects as an object 
      return {...state, ..._.mapKeys(action.payload, 'id')};
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default: 
      return state;
  }
}

export default streamsReducer;