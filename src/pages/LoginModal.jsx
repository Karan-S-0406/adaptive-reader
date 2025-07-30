// AuthModalContext.jsx
import { createContext, useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import LoginOptions from "../pages/Onboarding/LoginOptions";

const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");

  const openModal = (selectedRole) => {
    setRole(selectedRole);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  return (
    <AuthModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {/* One single Dialog */}
      <Dialog
        open={open}
        onClose={closeModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "12px",
            backgroundColor: "#fff",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
          },
        }}
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
          },
        }}
      >
        <DialogContent>
          <LoginOptions role={role} onClose={closeModal} />
        </DialogContent>
      </Dialog>
    </AuthModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthModal = () => useContext(AuthModalContext);
