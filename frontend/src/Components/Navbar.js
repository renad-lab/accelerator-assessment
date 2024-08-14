import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container
          maxWidth="lg"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "white" }}
          >
            Animania
          </Typography>
          <div>
            {/* Removed Animes button */}
            <Button component={Link} to="/animes/new" color="inherit">
              Add Anime
            </Button>
            {/* Removed Random button */}
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
