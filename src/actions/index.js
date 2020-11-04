import * as types from '../constants/'
import axios from 'axios'
import { TrackHandler, Client } from 'spotify-sdk'

let client = Client.instance;

client.settings = {
    clientId: 'b5b88d6501a44efd976d266384e8adc6',
    secretId: 'ed95138c01e1471ea156cc1d8fa62ea6',
    scopes: ['user-follow-modify user-follow-read user-library-read user-top-read'],
    redirect_uri: 'http://localhost:3000/'
};

const startFetch = () => {
  return {
    type: types.IS_FETCHING,
    isFetching: true
  }
}

export const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;


const completeFetch = ( data ) => {
  return {
    type: types.COMPLETE_FETCH,
    success: true,
    payload: data
  }
}

const completeSong = ( data ) => {
  return {
    type: types.COMPLETE_SONG,
    success: true,
    payload: data
  }
}

export const checkSignIn = () => {
  return ( dispatch, getState ) => {
    if (sessionStorage.token) {
      client.token = sessionStorage.token;
    } else if (window.location.hash.split('&')[0].split('=')[1]) {
      sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
      client.token = sessionStorage.token;
    }else {
      client.login().then((url) => {
        window.location.href = url;
	    });
    }
  }
}

export const search = ( trackName ) => {
  return ( dispatch, getState ) => {
    dispatch(startFetch());
    let track = new TrackHandler();
    track.search( trackName, { limit: 5 })
      .then((trackColection) => {
        dispatch(completeFetch(trackColection))
      })
  }
}

export const playTrack = ( trackId ) => {
  return ( dispatch, getState ) => {
    dispatch(startFetch);
    axios.get('https://api.spotify.com/v1/tracks/'.concat( trackId ),{ headers: {"Authorization" : 'Bearer ' + client.token }} )
    .then(( response ) => {
      dispatch(completeSong(response.data));
    })
  }
}
