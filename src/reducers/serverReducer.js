import { ADD_SERVER_SUCCESS, ADD_SERVER_FAILURE, GET_SERVERS_SUCCESS } from '../actions/types';

const initialState = {
  servers: []
}

const servers = (state=initialState, action) => {
  switch (action.type) {
    case GET_SERVERS_SUCCESS:
      return {
        ...state,
        servers: action.payload
      }
    case ADD_SERVER_SUCCESS:
      return {
        ...state,
      };
    case ADD_SERVER_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state
      
  }
}

export default servers;