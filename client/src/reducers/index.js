import { combineReducers } from 'redux';
import { reducer as formReducer }  from 'redux-form';
import auth from './authReducer';
import streams from './streamsReducer';

const combinedReducers = combineReducers({
  auth,
  form: formReducer,
  streams,
});

export default combinedReducers;