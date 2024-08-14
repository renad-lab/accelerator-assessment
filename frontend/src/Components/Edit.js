import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const API = process.env.REACT_APP_BASE_URL;

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [anime, setAnime] = useState({
    name: "",
    description: "",
  });

  const handleTextChange = (event) => {
    const { id, value } = event.target;
    setAnime((prevAnime) => ({
      ...prevAnime,
      [id]: value,
    }));
  };

  const updateAnime = () => {
    fetch(`${API}/animes/${id}`, {
      method: "PUT",
      body: JSON.stringify(anime),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => navigate(`/animes/${id}`))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetch(`${API}/animes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAnime({
          name: data.name || "",
          description: data.description || "",
        });
      })
      .catch((error) => console.error("Error:", error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateAnime();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Edit Anime
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              id="name"
              label="Name"
              value={anime.name || ""}
              onChange={handleTextChange}
              fullWidth
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              id="description"
              label="Description"
              value={anime.description || ""}
              onChange={handleTextChange}
              fullWidth
              multiline
              rows={4}
            />
          </Box>
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
            <Link to={`/animes/${id}`} style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>
                Cancel
              </Button>
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default Edit;
