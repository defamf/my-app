import React, { useState } from "react";
import CardArtist from "../CardArtist";

const ListArtist = (props) => {
  const { artists, onSelected, selectedArtists } = props;

  return (
    <div>
      {artists.map((artist, index) => (
        <CardArtist
          key={index}
          artist={artist}
          selectedArtists={selectedArtists}
          onSelected={(isSelected) =>
            onSelected && onSelected(artist, isSelected)
          }
        />
      ))}
    </div>
  );
};

export default ListArtist;
