import React, { useEffect, useState } from "react";

const CardArtist = ({ artist, selectedArtists, onSelected }) => {
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    checkExistingArtist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedArtists]);

  const checkExistingArtist = () => {
    let arr = [...selectedArtists];
    arr = arr.filter((item) => item?.id === artist?.id);

    if (arr.length > 0) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  return (
    <div className="card-artist" key={artist.id}>
      {artist?.album?.images?.length ? (
        <img width={"100%"} src={artist?.album?.images[0].url} alt="" />
      ) : (
        <div>No Image</div>
      )}
      <div>
        <div>{artist?.name}</div>
        <div
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {artist?.genres?.map((item) => (
            <div style={{ fontSize: 16 }}>{item}</div>
          ))}
        </div>
        <button
          onClick={() => {
            setSelected(!isSelected);
            onSelected && onSelected(!isSelected);
          }}
        >
          {isSelected ? "Deselect" : "Select"}
        </button>
      </div>
    </div>
  );
};

export default CardArtist;
