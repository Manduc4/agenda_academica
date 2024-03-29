import { Link } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NotFound: React.FC = () => (
  <Box
    component="main"
    sx={{
      alignItems: "center",
      display: "flex",
      flexGrow: 1,
      minHeight: "100%",
    }}
  >
    <Container maxWidth="md">
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography align="center" color="textPrimary" variant="h1">
          404: A página que você está procurando não está aqui.
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          You either tried some shady route or you came here by mistake.
          Whichever it is, try using the navigation
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <img
            alt="Under development"
            src="/static/images/undraw_page_not_found_su7k.svg"
            style={{
              marginTop: 50,
              display: "inline-block",
              maxWidth: "100%",
              width: 560,
            }}
          />
        </Box>
        <Link to="/" style={{ textDecoration: 'none'}} >
          <Button
            component="a"
            startIcon={<ArrowBackIcon fontSize="small" />}
            sx={{ mt: 3 }}
            variant="contained"
          >
            Voltar para a Página Inicial
          </Button>
        </Link>
      </Box>
    </Container>
  </Box>
);

export default NotFound;
