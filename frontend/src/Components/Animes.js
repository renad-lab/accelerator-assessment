import { useState, useEffect } from "react";
import Anime from "./Anime";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";

const API = process.env.REACT_APP_BASE_URL;

function Animes() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/animes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAnimes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <Typography variant="h6" align="center">
          Loading animes...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">Error loading animes: {error.message}</Alert>
      </Container>
    );
  }

  // Display a static anime or a default message
  return (
    <Container>
      {animes.length > 0 ? (
        <Anime key={animes[0].id} anime={animes[0]} detailed={false} />
      ) : (
        <Typography variant="h6" align="center">
          No animes to display
        </Typography>
      )}
    </Container>
  );
}

export default Animes;
