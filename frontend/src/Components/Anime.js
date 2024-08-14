import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Alert,
  Button,
  Box,
} from "@mui/material";

const API = process.env.REACT_APP_BASE_URL;

function Anime() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch details for a specific anime
      fetch(`${API}/animes/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setAnime(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setError(error);
          setLoading(false);
        });
    } else {
      // Fetch the list of animes
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
    }
  }, [id]);

  const handleDelete = () => {
    fetch(`${API}/animes/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        navigate("/"); // Navigate to the home page after deletion
      })
      .catch((error) => console.error("Delete error:", error));
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <Typography variant="h6" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">Error: {error.message}</Alert>
      </Container>
    );
  }

  if (id) {
    // Render detailed view if id is present
    return (
      <Container>
        <Card sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
          <CardContent>
            <Typography variant="h4" component="div">
              {anime.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {anime.description}
            </Typography>
          </CardContent>
          <CardContent>
            <Box display="flex" gap={2} justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/"
              >
                Home
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to={`/animes/${anime.id}/edit`}
              >
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    );
  }

  // Render list view if no id is present
  return (
    <Container>
      <Grid container spacing={4} mt={4}>
        {animes.length > 0 ? (
          animes.map((anime) => (
            <Grid item xs={12} sm={6} md={4} key={anime.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {anime.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {anime.description}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Link
                    to={`/animes/${anime.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography variant="body2" color="primary">
                      View Details
                    </Typography>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center">
            No animes to display
          </Typography>
        )}
      </Grid>
    </Container>
  );
}

export default Anime;
