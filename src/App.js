import { useEffect, useState } from 'react';
import './App.css';
import Login from './Components/Login';
import Player from './Components/Player';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {

  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    const _token = hash.access_token;

    if(_token){

      dispatch({
        type: 'SET_TOKEN',
        token: _token
      })
      
      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        console.log("Creating User");
        dispatch({
          type: 'SET_USER',
          user: user
        })
      });
    }

    console.log("GOTS TOKEN", token);
  }, []);

  console.log("Printing user: ");
  console.log(user);
  console.log(token);

  return (
    <div className="App">
      {
        token ? (
          <Player spotify={spotify}/>
        ) : (
          <Login />
        )
      }      
    </div>
  );
}

export default App;
