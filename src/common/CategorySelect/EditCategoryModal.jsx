import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const EditCategoryModal = ({ open, onClose, category, onUpdate }) => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setCategoryName(category.categoryName || "");
      setError("");
    }
  }, [category, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    if (categoryName.trim() === category?.categoryName) {
      onClose();
      return;
    }

    setLoading(true);
    try {
      await onUpdate(category.id || category._id, categoryName.trim());
      onClose();
    } catch {
      // Error is handled by parent, toast shown there
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      disableRestoreFocus
      PaperProps={{
        sx: {
          borderRadius: "0.75rem",
          boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 1,
          pr: 6,
          fontSize: "1.125rem",
          fontWeight: 600,
          color: "#111827",
        }}
      >
        Edit Category
        <IconButton
          onClick={handleClose}
          disabled={loading}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "#6b7280",
            "&:hover": { color: "#374151" },
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 0 }}>
          <TextField
            autoFocus
            fullWidth
            label="Category Name"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
              if (error) setError("");
            }}
            error={!!error}
            helperText={error}
            disabled={loading}
            size="small"
            sx={{
              mt: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                backgroundColor: "white",
                "& fieldset": {
                  borderColor: error ? "#ef4444" : "#d1d5db",
                },
                "&:hover fieldset": {
                  borderColor: error ? "#ef4444" : "#9ca3af",
                },
                "&.Mui-focused fieldset": {
                  borderColor: error ? "#ef4444" : "#3b82f6",
                },
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
          <Button
            onClick={handleClose}
            disabled={loading}
            sx={{
              textTransform: "none",
              color: "#6b7280",
              fontWeight: 500,
              borderRadius: "0.5rem",
              px: 2,
              py: 0.75,
              "&:hover": {
                backgroundColor: "#f3f4f6",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              borderRadius: "0.5rem",
              px: 3,
              py: 0.75,
              backgroundColor: "#3b82f6",
              "&:hover": {
                backgroundColor: "#2563eb",
              },
              "&:disabled": {
                backgroundColor: "#93c5fd",
              },
            }}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EditCategoryModal;
