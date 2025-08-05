import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "../../../store/action/users.action";

const grades = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
const levels = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), "Z+"];
const relationships = ["Mom", "Dad", "Guardian", "Other"];
const genders = ["Male", "Female", "Non-binary", "Prefer not to say"];

const AddChildForm = ({ kids, setKids, setLoaderMessages }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [newKid, setNewKid] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    grade: "",
    level: "",
    password: "",
    relationship: "",
    email: "",
  });

  const user = useSelector((state) => state.storeData.userData);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleAddKid = async () => {
    const { firstName, lastName, grade, level, password } = newKid;
    if (!firstName || !lastName || !grade || !level || !password) {
      Swal.fire(
        "Missing Fields!",
        "Please fill all the required fields.",
        "warning"
      );
      return;
    }
    if (password.length < 6) {
      Swal.fire(
        "Weak Password!",
        "Password must be at least 6 characters.",
        "warning"
      );
      return;
    }
    setLoaderMessages(["Adding Student..."]);
    const res = await dispatch(
      addStudent({
        ...newKid,
        parentId: user?.userId || "",
      })
    );
    if (res.payload?.success) {
      setKids([...kids, newKid]);
      setNewKid({
        firstName: "",
        lastName: "",
        gender: "",
        grade: "",
        password: "",
        level: "",
        relationship: "",
        email: "",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        overflowX: "hidden",
        boxShadow: 3,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Paper
      
        sx={{
          boxShadow: 'none',
          p: 4,
          width: "100%",
          maxWidth: 850,
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          <span role="img" aria-label="plus">
            ➕
          </span>{" "}
          Add a Child
        </Typography>

        <TextField
          label="First Name"
          fullWidth
          margin="dense"
          value={newKid.firstName}
          onChange={(e) => setNewKid({ ...newKid, firstName: e.target.value })}
        />

        <TextField
          label="Last Name"
          fullWidth
          margin="dense"
          value={newKid.lastName}
          onChange={(e) => setNewKid({ ...newKid, lastName: e.target.value })}
        />

        <TextField
          select
          label="Gender"
          fullWidth
          margin="dense"
          value={newKid.gender}
          onChange={(e) => setNewKid({ ...newKid, gender: e.target.value })}
        >
          {genders.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Grade"
          fullWidth
          margin="dense"
          value={newKid.grade}
          onChange={(e) => setNewKid({ ...newKid, grade: e.target.value })}
        >
          {grades.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Reading Level"
          fullWidth
          margin="dense"
          value={newKid.level}
          onChange={(e) => setNewKid({ ...newKid, level: e.target.value })}
        >
          {levels.map((l) => (
            <MenuItem key={l} value={l}>
              {l}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Relationship"
          fullWidth
          margin="dense"
          value={newKid.relationship}
          onChange={(e) =>
            setNewKid({ ...newKid, relationship: e.target.value })
          }
        >
          {relationships.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Child's Email (13+)"
          fullWidth
          margin="dense"
          value={newKid.email}
          onChange={(e) => setNewKid({ ...newKid, email: e.target.value })}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="dense"
          value={newKid.password}
          onChange={(e) => setNewKid({ ...newKid, password: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3 }}
          onClick={handleAddKid}
        >
          Add Child
        </Button>
      </Paper>

      <Paper
        sx={{
          p: 3,
          margin: 3,
          flex: 1,
          minWidth: 300,
          maxWidth: 400,
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h6">📩 Invitations</Typography>
        {kids.length === 0 ? (
          <Typography>No children added yet.</Typography>
        ) : (
          kids.map((kid, idx) => (
            <Box key={idx} sx={{ mb: 2 }}>
              <Typography>
                <strong>
                  {kid.firstName} {kid.lastName}
                </strong>
              </Typography>
              <Typography variant="body2">
                Email: {kid.email || "N/A"}
              </Typography>
              <Typography variant="body2">
                Status: {kid.invitationStatus}
              </Typography>
              <Typography variant="body2">
                Reminders: {kid.remindersEnabled ? "On" : "Off"}
              </Typography>
            </Box>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default AddChildForm;
