import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";

const API = process.env.REACT_APP_BASE_URL;

function NewAnime() {
  const navigate = useNavigate();
  const [anime, setAnime] = useState({
    name: "",
    description: "",
  });

  // Add a new anime. Redirect to the index view.
  const addAnime = () => {
    fetch(`${API}/animes`, {
      method: "POST",
      body: JSON.stringify(anime),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate(`/animes`);
      })
      .catch((error) => console.error("catch", error));
  };

  const handleTextChange = (event) => {
    const { id, value } = event.target;
    setAnime({
      ...anime,
      [id]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addAnime();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mx: "auto",
        mt: 4,
      }}
    >
      <TextField
        id="name"
        label="Name"
        value={anime.name}
        onChange={handleTextChange}
        placeholder="Name of the Anime"
        required
        fullWidth
      />
      <TextField
        id="description"
        label="Description"
        value={anime.description}
        onChange={handleTextChange}
        placeholder="Write a short description of the anime"
        required
        multiline
        rows={4}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "#000000",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#ffffff",
            color: "#000000",
          },
        }}
      >
        Add Anime
      </Button>
    </Box>
  );
}

export default NewAnime;
