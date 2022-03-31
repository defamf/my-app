import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import ListArtist from "./components/ListArtist";

function App() {
  const CLIENT_ID = "34b1eddc05a1468388c46ab4a1580abd";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });

    let resultArtists = [...data?.artists?.items];
    console.log(data?.artists?.items);
    for (let i = 0; i < resultArtists.length - 1; i++) {
      for (let j = 0; j < selectedArtists.length - 1; j++) {
        if (resultArtists[i]?.id === selectedArtists[j]?.id) {
          resultArtists.splice(i, 1);
        }
      }
    }
    setArtists([...selectedArtists, ...resultArtists]);
  };

  const handleSelectArtist = (artistParams, isSelected) => {
    if (isSelected) {
      const arr = [...selectedArtists, artistParams];
      setSelectedArtists(arr);
    } else {
      let arr = [...selectedArtists];
      arr = arr.filter((item) => item?.id !== artistParams?.id);
      setSelectedArtists(arr);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"
          className="App-logo"
          alt="logo"
        />

        {token ? (
          <form onSubmit={searchArtists}>
            <input
              type="text"
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Search"
              value={searchKey}
            />
            <button type={"submit"}>Search</button>
          </form>
        ) : (
          <h4>Please Login</h4>
        )}

        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <>
            <br></br>
            <button onClick={logout}>Logout</button>
            <br></br>
          </>
        )}

        <ListArtist
          artists={artists}
          selectedArtists={selectedArtists}
          onSelected={handleSelectArtist}
        />
      </header>
    </div>
  );
}

export default App;
