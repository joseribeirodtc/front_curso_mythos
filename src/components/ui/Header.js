import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: "green" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Curso Mythos
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button color="inherit">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Home
              </Link>
            </Button>

            <Button color="inherit">
              <Link
                to="/cursos"
                style={{ textDecoration: "none", color: "white" }}
              >
                Cursos
              </Link>
            </Button>

            <Button color="inherit">
              <Link
                to="/alunos"
                style={{ textDecoration: "none", color: "white" }}
              >
                Alunos
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
