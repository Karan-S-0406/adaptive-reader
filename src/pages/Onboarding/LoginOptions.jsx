import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Divider,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";
import smartzyLogo from "../../assets/smartzy.png";
import googleSvg from "../../assets/google.svg";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../store/slice/users.slice";
import {
  addParent,
  getOTP,
  getUserIdAndRole,
  verifyPasswordAndGetUserDetails,
} from "../store/action/users.action";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginOptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [view, setView] = useState("role");
  const [timer, setTimer] = useState(30);
  const [password, setPassword] = useState("");
  const [roleSelected, setRoleSelected] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const rules = {
    minLength: password.length >= 8,
    upperCase: /[A-Z]/.test(password),
    lowerCase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*]/.test(password),
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;
      const userData = {
        email: userEmail,
        name: result.user.displayName || "",
        role: roleSelected,
      };

      const response = await dispatch(getUserIdAndRole(userEmail));
      const user = response.payload;

      if (!user.success) {
        Swal.fire("Login Failed", user.message || "Invalid email", "error");
        return;
      }

      if (user.role !== roleSelected) {
        Swal.fire(
          "Wrong Role",
          `Please login as ${user.role} instead.`,
          "warning"
        );
        return;
      }

      localStorage.setItem("userData", JSON.stringify(userData));
      Swal.fire("Success", `Logged in as ${user?.name}`, "success");
      dispatch(setIsAuthenticated(true));
      navigate(`/dashboard/${roleSelected}`);
    } catch (error) {
      Swal.fire("Error", "Google Sign-In Failed", "error");
    }
  };

  const handleManualLogin = async () => {
    if (!email || !password) {
      Swal.fire("Error", "Please enter email and password", "error");
      return;
    }

    try {
      const response = await dispatch(
        verifyPasswordAndGetUserDetails({ email, password }) // ✅ Pass both email & password
      );

      const user = response.payload;

      // ✅ Check if request was successful
      if (!user.success) {
        if (user.message === "Invalid email") {
          Swal.fire(
            "Login Failed",
            "Email not found. Please sign up.",
            "error"
          );
        } else if (user.message === "Incorrect password") {
          Swal.fire("Login Failed", "Incorrect password. Try again.", "error");
        } else {
          Swal.fire(
            "Login Failed",
            user.message || "Invalid credentials",
            "error"
          );
        }
        return;
      }

      // ✅ Check if selected role matches
      if (user.role !== roleSelected) {
        Swal.fire(
          "Wrong Role",
          `You are registered as ${user.role}. Please select the correct role.`,
          "warning"
        );
        return;
      }

      // ✅ Save user data in localStorage
      localStorage.setItem("userData", JSON.stringify(user));

      dispatch(setIsAuthenticated(true));
      Swal.fire("Success", `Welcome back, ${user.name}!`, "success");
      navigate(`/dashboard/${user.role}`);
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    try {
      const parentData = {
        name,
        email,
        password, // Store hashed in real apps!
        role: "parent",
      };

      const response = await dispatch(addParent(parentData));
      const data = response.payload;

      if (data.success) {
        // ✅ Save user data locally just like manual login
        const userData = { name, email, role: "parent" };
        localStorage.setItem("userData", JSON.stringify(userData));

        dispatch(setIsAuthenticated(true));
        Swal.fire("Success", "Signup successful!", "success");
        navigate("/dashboard/parent");
      } else {
        Swal.fire("Error", data.message || "Signup failed", "error");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setName("");
    setView("role");
  };

  const handleRoleSelect = (role) => {
    setRoleSelected(role);
    setView("login");
  };

  // ✅ Send OTP Email
  const sendOtpEmail = async () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otpCode, "OTP");
    setGeneratedOtp(otpCode);

    try {
      const response = await dispatch(getOTP({ email, otp: otpCode }));
      const data = response.payload;
      if (data.success) {
        Swal.fire(
          "OTP Sent!",
          `OTP sent to ${email}. Please check your inbox and spam folder.`,
          "success"
        );
        setOtpSent(true);
        setView("verify-otp");
      } else {
        Swal.fire("Error", data.message || "Failed to send OTP", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to send OTP", "error");
    }
  };

  // ✅ Handle Get OTP
  const handleGetOTP = async () => {
    if (!name || !email || !password) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }
    sendOtpEmail();
    startResendTimer();
  };

  // ✅ Resend OTP
  const handleResendOTP = () => {
    sendOtpEmail();
    startResendTimer();
  };

  // ✅ Start Resend Timer
  const startResendTimer = () => {
    setResendDisabled(true);
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setResendDisabled(false);
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ✅ Verify OTP
  const handleVerifyOTP = () => {
    if (otp === generatedOtp) {
      Swal.fire("Success", "OTP Verified!", "success");
      handleSignUp();
    } else {
      Swal.fire("Error", "Invalid OTP", "error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{ p: 4, width: "100%", maxWidth: 500, borderRadius: 3 }}
      >
        <Box textAlign="center" mb={3}>
          <img src={smartzyLogo} alt="Smartzy" width={60} />
          <Typography variant="h5" fontWeight="bold" mt={1}>
            Welcome to Smartzy
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Please choose how you’d like to continue
          </Typography>
        </Box>

        {/* Role Selection */}
        {view === "role" && (
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<PersonIcon />}
                onClick={() => handleRoleSelect("parent")}
              >
                Parent
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<SchoolIcon />}
                onClick={() => handleRoleSelect("student")}
              >
                Student
              </Button>
            </Grid>
          </Grid>
        )}

        {/* Login View */}
        {view === "login" && (
          <Box mt={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="subtitle1">
                Login as{" "}
                <strong>
                  {roleSelected.charAt(0).toUpperCase() + roleSelected.slice(1)}
                </strong>
              </Typography>
              <Button
                onClick={reset}
                startIcon={<ArrowBackIcon />}
                size="small"
                variant="outlined"
              >
                Back
              </Button>
            </Box>

            <Button
              fullWidth
              variant="contained"
              startIcon={<img src={googleSvg} alt="Google" width="20" />}
              onClick={handleGoogleSignIn}
              sx={{ mb: 2 }}
            >
              Sign in with Google
            </Button>

            <Divider sx={{ my: 2 }}>or</Divider>

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleManualLogin}
            >
              Login
            </Button>

            <Typography variant="body2" align="center" mt={2}>
              {roleSelected === "parent" ? (
                <>
                  Don’t have an account?{" "}
                  <Button
                    onClick={() => {
                      setView("signup");
                      setEmail("");
                      setPassword("");
                    }}
                    size="small"
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontStyle="italic"
                >
                  Don’t have an account? Ask your parent or teacher to register
                  you.
                </Typography>
              )}
            </Typography>
          </Box>
        )}

        {/* Sign Up - Only for Parent */}
        {view === "signup" && roleSelected === "parent" && (
          <Box mt={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="subtitle1">
                Sign up as <strong>Parent</strong>
              </Typography>
              <Button
                onClick={() => setView("login")}
                startIcon={<ArrowBackIcon />}
                size="small"
                variant="outlined"
              >
                Back
              </Button>
            </Box>

            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* ✅ Password Strength Rules */}
            <Box mt={1}>
              <Typography
                variant="body2"
                color={rules.minLength ? "green" : "error"}
              >
                • Minimum 8 characters
              </Typography>
              <Typography
                variant="body2"
                color={rules.upperCase ? "green" : "error"}
              >
                • At least one uppercase letter
              </Typography>
              <Typography
                variant="body2"
                color={rules.lowerCase ? "green" : "error"}
              >
                • At least one lowercase letter
              </Typography>
              <Typography
                variant="body2"
                color={rules.number ? "green" : "error"}
              >
                • At least one number
              </Typography>
              <Typography
                variant="body2"
                color={rules.specialChar ? "green" : "error"}
              >
                • At least one special character (!@#$%^&*)
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleGetOTP}
              disabled={
                !rules.minLength ||
                !rules.upperCase ||
                !rules.lowerCase ||
                !rules.number ||
                !rules.specialChar
              }
            >
              Get OTP
            </Button>

            <Typography variant="body2" align="center" mt={2}>
              Already have an account?{" "}
              <Button
                onClick={() => {
                  setView("login");
                  setName(""); // Reset name if needed
                }}
                size="small"
              >
                Login
              </Button>
            </Typography>
          </Box>
        )}

        {view === "verify-otp" && otpSent && (
          <Box mt={3}>
            <TextField
              fullWidth
              label="Enter OTP"
              margin="normal"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={handleResendOTP}
              disabled={resendDisabled}
            >
              {resendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default LoginOptions;
