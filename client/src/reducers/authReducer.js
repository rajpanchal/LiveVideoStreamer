import { SIGNED_IN, SIGNED_OUT } from '../actions';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  authToken: null,
  userProfile: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  // console.log(`action: \n`, action);
  switch(action.type) {
    case SIGNED_IN: 
      const { userId, authToken, userProfile } = action.payload;
      return {...state, isSignedIn: true, userId, authToken, userProfile};
    case SIGNED_OUT: 
      const updatedState = {...state, isSignedIn: false, userId: null, authToken: null, userProfile: null };
      return updatedState;
    default: 
      return state;
  }
}

export default authReducer;