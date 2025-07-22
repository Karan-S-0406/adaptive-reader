import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import { addStudent } from "../../store/action/users.action";
import { useDispatch, useSelector } from "react-redux";
import LoaderModal from "../../Loader/LoaderModal";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";
import LibraryAndAssignments from "./LibraryAndAssignments/LibraryAndAssignments";
import UploadAssignmentForm from "../TeacherDashboard/AssignmentUpload/UploadAssignmentForm";
import "./ParentDashboard.css";

const grades = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
const levels = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), "Z+"];
// const languages = ["English", "Spanish", "Hindi", "Mandarin", "French"];
const relationships = ["Mom", "Dad", "Guardian", "Other"];
const genders = ["Male", "Female", "Non-binary", "Prefer not to say"];

const ParentDashboard = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const [kids, setKids] = useState([]);
  const [loaderMessages, setLoaderMessages] = useState([]);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleAddKid = async () => {
    const { firstName, lastName, grade, level, password } = newKid;
    if (!firstName || !lastName || !grade || !level || !password) {
      Swal.fire(
        "Missing Fields!",
        "Please Fill all the required fields.",
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
        parentId: user?.userId || "", // assumes your stored userData has an `id` field
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
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        👩 Parent Dashboard
      </Typography>

      <Tabs
        value={tab}
        onChange={(e, val) => setTab(val)}
        variant="scrollable"
        scrollButtons="auto"
        className="tabs-container"
      >
        <Tab label="Add Kids" />
        <Tab label="Library & Assignments" />
        <Tab label="Upload Assignments" />
      </Tabs>

      {/* Tab 0: Add Kids */}
      {tab === 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">➕ Add a Child</Typography>
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                value={newKid.firstName}
                onChange={(e) =>
                  setNewKid({ ...newKid, firstName: e.target.value })
                }
              />
              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                value={newKid.lastName}
                onChange={(e) =>
                  setNewKid({ ...newKid, lastName: e.target.value })
                }
              />
              <TextField
                select
                label="Gender"
                fullWidth
                margin="normal"
                value={newKid.gender}
                onChange={(e) =>
                  setNewKid({ ...newKid, gender: e.target.value })
                }
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
                margin="normal"
                value={newKid.grade}
                onChange={(e) =>
                  setNewKid({ ...newKid, grade: e.target.value })
                }
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
                margin="normal"
                value={newKid.level}
                onChange={(e) =>
                  setNewKid({ ...newKid, level: e.target.value })
                }
              >
                {levels.map((l) => (
                  <MenuItem key={l} value={l}>
                    {l}
                  </MenuItem>
                ))}
              </TextField>
              {/* <FormControl fullWidth margin="normal">
                <InputLabel>Primary Languages</InputLabel>
                <Select
                  multiple
                  value={newKid.languages}
                  onChange={(e) => setNewKid({ ...newKid, languages: e.target.value })}
                  input={<OutlinedInput label="Primary Languages" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => <Chip key={value} label={value} />)}
                    </Box>
                  )}
                >
                  {languages.map((lang) => (
                    <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <TextField
                select
                label="Relationship"
                fullWidth
                margin="normal"
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
                margin="normal"
                value={newKid.email}
                onChange={(e) =>
                  setNewKid({ ...newKid, email: e.target.value })
                }
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                value={newKid.password}
                onChange={(e) =>
                  setNewKid({ ...newKid, password: e.target.value })
                }
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={newKid.remindersEnabled}
                    onChange={(e) => setNewKid({ ...newKid, remindersEnabled: e.target.checked })}
                  />
                }
                label="Send reminders every 2 days"
              /> */}
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleAddKid}
              >
                Add Child
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
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
          </Grid>
        </Grid>
      )}

      {/* Tab 1: Library & Assignments */}
      {tab === 1 && <LibraryAndAssignments />}

      {/* Tab 2: Dashboard */}
      {tab === 2 && <UploadAssignmentForm />}
      <LoaderModal open={user?.addStudentLoading} messages={loaderMessages} />
    </Box>
  );
};

export default ParentDashboard;
