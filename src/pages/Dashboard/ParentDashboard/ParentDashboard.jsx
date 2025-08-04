import { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux";
import LoaderModal from "../../Loader/LoaderModal";
import LibraryAndAssignments from "./LibraryAndAssignments/LibraryAndAssignments";
import UploadAssignmentForm from "./AssignmentUpload/UploadAssignmentForm";
import "./ParentDashboard.css";
import AddChildForm from "./AddChild/AddChildForm";

const ParentDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("library");
  const [kids, setKids] = useState([]);
  const [loaderMessages, setLoaderMessages] = useState([]);
  const user = useSelector((state) => state.storeData.userData);

  return (
    <Box className="dashboard-container">
      <Box className="sidebar">
        <Typography variant="h6" className="menu-title">
          👩 Parent Dashboard
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedMenu === "library"}
              onClick={() => setSelectedMenu("library")}
            >
              <ListItemText primary="Library & Assignments" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedMenu === "add"}
              onClick={() => setSelectedMenu("add")}
            >
              <ListItemText primary="Add Kids" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedMenu === "upload"}
              onClick={() => setSelectedMenu("upload")}
            >
              <ListItemText primary="Assignments" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Box className="main-content-parent-dashboard">
        {selectedMenu === "library" && <LibraryAndAssignments />}
        {selectedMenu === "upload" && <UploadAssignmentForm />}
        {selectedMenu === "add" && (
          <AddChildForm
            kids={kids}
            setKids={setKids}
            setLoaderMessages={setLoaderMessages}
          />
        )}
      </Box>

      <LoaderModal open={user?.addStudentLoading} messages={loaderMessages} />
    </Box>
  );
};

export default ParentDashboard;
