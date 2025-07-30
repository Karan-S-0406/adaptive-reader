import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function SelectBookPopup({
  open,
  onClose,
  searchQuery,
  setSearchQuery,
  searchResults,
  searchLoading,
  handleSearchBooks,
  handleSelectBook,
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Search Books</DialogTitle>
      <DialogContent>
        <Box display="flex" gap={2} mb={2}>
          <TextField
            fullWidth
            placeholder="Enter book name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearchBooks}>
            Search
          </Button>
        </Box>
        {searchLoading ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {searchResults.map((book, idx) => (
              <ListItem
                button
                key={idx}
                onClick={() => handleSelectBook(book)}
              >
                <ListItemText
                  primary={book.title}
                  secondary={
                    book.author
                      ? `Author: ${book.author}`
                      : ""
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
