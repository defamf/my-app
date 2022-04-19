import axios from "axios";
import React from "react";
import { useState } from "react";

type Props = {
  onSubmit: () => void;
  token: string;
  userID: string;
};

const CreatePlaylist = ({ token, userID, onSubmit }: Props) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");

  const createPlaylist = async (e: any) => {
    e.preventDefault();
    const data = {
      name: playlistName,
      description: playlistDescription,
      public: true,
    };

    const headerConfig = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${userID}/playlists`,
        data,
        headerConfig
      );

      console.log("aweeaw", response);
      onSubmit && onSubmit();
      setPlaylistName("");
      setPlaylistDescription("");
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <div>
      <form onSubmit={createPlaylist} color="white">
        <table cellPadding={10}>
          <tr>
            <td>
              <input
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                type="text"
                placeholder="Title"
              />
            </td>
          </tr>

          <tr>
            <td>
              <input
                value={playlistDescription}
                onChange={(e) => setPlaylistDescription(e.target.value)}
                type="text"
                placeholder="Description"
              />
            </td>
          </tr>

          <tr>
            <td>
              <button type={"submit"}>Submit</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default CreatePlaylist;
