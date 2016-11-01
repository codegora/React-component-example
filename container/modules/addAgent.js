require('es6-promise').polyfill()
import fetch from 'isomorphic-fetch'

// ------------------------------------
// Constants
// ------------------------------------

export const REQUEST_ADD_AGENT = 'REQUEST_ADD_AGENT'
export const RECIEVE_ADD_AGENT = 'RECIEVE_ADD_AGENT'
import { SHOW_SERVER_ERROR } from 'layouts/CoreLayout/modules/coreLayout'
let timeout = null

// ------------------------------------
// Actions
// ------------------------------------

import {
  showServerError,
  hideServerError,
  showSuccessMessage,
  hideSuccessMessage
} from 'layouts/CoreLayout/modules/coreLayout'

export function requestAddAgent () {
  return {
    type: REQUEST_ADD_AGENT
  }
}

export function recieveAddAgent () {
  return {
    type: RECIEVE_ADD_AGENT
  }
}

export function fetchAddAgent (data, callback) {
  return dispatch => {
    dispatch(requestAddAgent())
    clearTimeout(timeout)

    return fetch(__APIPATH__ + '/agent', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer' + localStorage.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        if (response.ok) {
          return {success: true}
        } else {
          return response.json()
        }
      })
      .then(function (json) {
        if (!json.error) {
          callback()
          dispatch(recieveAddAgent(json))
          dispatch(hideServerError())
          dispatch(showSuccessMessage(data.firstname + ' ' + data.lastname + ' has been added.'))
          timeout = setTimeout(function () {
            dispatch(hideSuccessMessage())
          }, 5000)
        } else {
          dispatch(hideSuccessMessage())
          dispatch(showServerError(json))
          timeout = setTimeout(function() {
            dispatch(hideServerError())
          }, 5000)
        }
      })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  loading: false
}

export default function addAgentReducer (state = initialState, action) {
  switch (action.type) {
    case REQUEST_ADD_AGENT:
      return { ...state, loading: true }

    case RECIEVE_ADD_AGENT:
      return { ...state, loading: false }

    case SHOW_SERVER_ERROR:
      return { ...state, loading: false }

    default:
      return state
  }
}
