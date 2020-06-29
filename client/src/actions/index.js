import streamyApi from "../api/streamy.axios";
import { SIGNED_IN, SIGNED_OUT,
  CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, DELETE_STREAM, EDIT_STREAM
} from './types';
import history from '../history';

const STREAMS_API_PATH = "/streams";

export const signedIn = (userId, authToken, userProfile) => {
  return {
    type: SIGNED_IN,
    payload: { 
      userId, authToken, userProfile
    }  
  };
}

export const signedOut = () => {
  // get the user back to the root route
  history.push('/');
  return {
    type: SIGNED_OUT    
  };  
}

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const data = { ...formValues, userId };
  console.log(`[DEBUG] <createStream> data: \n`, data);
  const response = 
    await streamyApi.post(STREAMS_API_PATH, data);      
  dispatch({ type: CREATE_STREAM, payload: response.data });
  // get the user back to the root route
  history.push('/');
}

export const fetchStreams = () => async dispatch => {
  const response = await streamyApi.get(STREAMS_API_PATH);
  dispatch({ type: FETCH_STREAMS, payload: response.data});
}

export const fetchStream = (id) => async dispatch => {
  const response = await streamyApi.get(`${STREAMS_API_PATH}/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
}

export const editStream = (id, title, description, userId) => async dispatch => {
  const response = await streamyApi.patch(`${STREAMS_API_PATH}/${id}`, { title, description, userId });
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push('/');
}

export const deleteStream = (id) => async dispatch => {
  await streamyApi.delete(`${STREAMS_API_PATH}/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
}

export * from './types';