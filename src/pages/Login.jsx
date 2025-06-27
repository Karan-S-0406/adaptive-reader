import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  TextField,
  Link,
} from "@mui/material";
import googleSvg from "../assets/google.svg";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Signed in as:", user.displayName);
      navigate("/gallery");
    } catch (error) {
      console.error("Sign-in error", error);
      alert("Google sign-in failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: 380,
          p: 4,
          borderRadius: 4,
          boxShadow: "0 8px 40px 0 rgba(0,0,0,0.10)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={0.5}>
          Sign in
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          to continue to <b>Personalized Reader</b>
        </Typography>

        <Button
          variant="outlined"
          onClick={handleGoogleSignIn}
          startIcon={
            <img
              src={googleSvg}
              alt="Google"
              style={{ width: 22, height: 22, marginRight: 4 }}
            />
          }
          sx={{
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 2,
            py: 1.2,
            mb: 2,
            borderColor: "#e0e0e0",
            color: "#444",
            background: "#fff",
            "&:hover": { background: "#f5f5f5", borderColor: "#bdbdbd" },
          }}
          fullWidth
        >
          Continue with Google
        </Button>

        <Divider sx={{ my: 1.5 }}>or</Divider>

        <Typography variant="body2" fontWeight={500} mb={0.5}>
          Email address
        </Typography>
        <TextField
          size="small"
          placeholder="Enter your email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, background: "#fafafa", borderRadius: 1 }}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{
            background: "#1B6CA8",
            fontWeight: 700,
            borderRadius: 2,
            py: 1.2,
            mt: 1,
            mb: 1,
            "&:hover": { background: "#a14a2e" },
          }}
          fullWidth
        >
          CONTINUE
        </Button>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          mt={1}
        >
          No account?{" "}
          <Link
            href="/signup"
            underline="hover"
            sx={{ color: "#1B6CA8", fontWeight: 500 }}
          >
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
