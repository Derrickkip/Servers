import { ADD_SERVER_SUCCESS,
        ADD_SERVER_FAILURE,
        GET_SERVERS_SUCCESS,
        DELETE_SERVERS_SUCCESS,
        UPDATE_SERVERS_SUCCESS
      } from './types';
import axios from 'axios';


export const addServerSuccess = (server) => ({
  type: ADD_SERVER_SUCCESS,
  payload: {
    server
  }
})

export const addServerFail = (err) => ({
  type: ADD_SERVER_FAILURE,
  error: err
})

export const getServerSuccess = (servers) => ({
  type: GET_SERVERS_SUCCESS,
  payload: servers
})

export const deleteServerSuccess = (message) => ({
  type: DELETE_SERVERS_SUCCESS,
  message
})

export const updateServerSuccess = (message) => ({
  type: UPDATE_SERVERS_SUCCESS,
  message
})

export const getServers = () => {
  return(dispatch) => {
    return axios.get('http://localhost:4200/serverport/')
    .then(res => {
      dispatch(getServerSuccess(res.data))
    })
  }
}

export const addServer = (name, port) => {
  return (dispatch ) => {
    const serverport = {
      name,
      port
    }
    return axios.post('http://localhost:4200/serverport/add', serverport)
    .then(res => {
      dispatch(addServerSuccess(res))
      dispatch(getServers())
    })
    .catch(err => {
      dispatch(addServerFail)
      console.log('error', err)
    })
  }
}

export const updateServer = (id, serverport) => {
  return (dispatch) => {
    return axios.post('http://localhost:4200/serverport/update/'+id, serverport)
    .then(res => {
      dispatch(updateServerSuccess(res))
      dispatch(getServers())
    })
  }
}

export const deleteServer = (id) => {
  return (dispatch) => {
    return axios.get('http://localhost:4200/serverport/delete/'+id)
    .then(res => {
      dispatch(deleteServerSuccess(res))
      dispatch(getServers())
    })
    .catch(err => console.log(err))
  }
}