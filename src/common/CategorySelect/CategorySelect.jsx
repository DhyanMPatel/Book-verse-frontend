import React, { useState, useEffect, useCallback } from "react";
import {
  Autocomplete,
  TextField,
  MenuItem,
  Box,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axiosInstance from "../../services/axiosInstance";
import EditCategoryModal from "./EditCategoryModal";

const CategorySelect = ({
  value,
  onChange,
  error = false,
  helperText = "",
  name = "categoryId",
  open = false,
  displayName = "",
  readOnly = false,
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Helper to capitalize every word (Title Case)
  const toTitleCase = (str) => {
    if (!str) return str;
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Fetch categories when modal opens
  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(res?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to load categories");
    }
  };

  // Create new category
  const handleCreateCategory = async (categoryName) => {
    if (!categoryName?.trim()) return;

    setLoading(true);
    try {
      const res = await axiosInstance.post("/categories", {
        category: toTitleCase(categoryName.trim()),
      });
      const newCategory = res?.data?.data;
      if (newCategory) {
        setCategories((prev) => [...prev, newCategory]);
        onChange(newCategory.id || newCategory._id);
        setInputValue("");
        toast.success("Category created successfully");
      }
    } catch (error) {
      console.error("Failed to create category:", error);
      toast.error(
        error?.response?.data?.message || "Failed to create category",
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDeleteCategory = async (categoryId, e) => {
    e.stopPropagation();

    // Close the dropdown and blur the input before showing alert
    const activeElement = document.activeElement;
    if (activeElement) {
      activeElement.blur();
    }

    const result = await Swal.fire({
      title: "Delete Category?",
      text: "Are you sure you want to delete this category? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.delete(`/categories/${categoryId}`);
      setCategories((prev) =>
        prev.filter((cat) => (cat.id || cat._id) !== categoryId),
      );
      if (value === categoryId) {
        onChange("");
      }
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error(
        error?.response?.data?.message || "Failed to delete category",
      );
    }
  };

  // Open edit modal
  const handleEditClick = (category, e) => {
    e.stopPropagation();
    // Close the dropdown and blur the input before opening modal
    const activeElement = document.activeElement;
    if (activeElement) {
      activeElement.blur();
    }
    setEditingCategory(category);
    setEditModalOpen(true);
  };

  // Update category
  const handleUpdateCategory = async (categoryId, newName) => {
    try {
      const res = await axiosInstance.patch(`/categories/${categoryId}`, {
        category: toTitleCase(newName),
      });
      const updatedCategory = res?.data?.data;
      if (updatedCategory) {
        setCategories((prev) =>
          prev.map((cat) =>
            (cat.id || cat._id) === categoryId ? updatedCategory : cat,
          ),
        );
        toast.success("Category updated successfully");
      }
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update category",
      );
      throw error;
    }
  };

  // Check if input value exists in categories
  const categoryExists = useCallback(
    (name) => {
      return categories.some(
        (cat) => cat.categoryName?.toLowerCase() === name?.trim().toLowerCase(),
      );
    },
    [categories],
  );

  // Get selected category
  const selectedCategory =
    categories.find((cat) => (cat.id || cat._id) === value) ||
    (displayName
      ? categories.find(
          (cat) =>
            cat.categoryName?.toLowerCase() === displayName.toLowerCase(),
        )
      : null) ||
    (value && displayName ? { id: value, categoryName: displayName } : null);

  // Handle category selection change
  const handleChange = (event, newValue) => {
    if (newValue && !newValue.isCreateOption) {
      const categoryId = newValue.id || newValue._id;
      const categoryName = newValue.categoryName;
      onChange(categoryId, categoryName);
    }
  };

  // Custom render option
  const renderOption = (props, option) => {
    const { key, ...restProps } = props;

    // Render "Create new" option
    if (option.isCreateOption) {
      return (
        <MenuItem
          key={key}
          {...restProps}
          onClick={() => {
            // Blur active element to prevent validation trigger
            const activeElement = document.activeElement;
            if (activeElement) {
              activeElement.blur();
            }
            handleCreateCategory(option.inputValue);
          }}
          sx={{
            borderTop: "1px solid #e5e7eb",
            py: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Add fontSize="small" color="primary" />
            <Typography variant="body2" color="primary">
              Create &quot;{option.inputValue}""
            </Typography>
          </Box>
        </MenuItem>
      );
    }

    // Render regular category with edit/delete (only if not readOnly)
    const categoryId = option.id || option._id;

    return (
      <MenuItem
        key={key}
        {...restProps}
        sx={{
          py: 0.5,
          px: 1.5,
          minHeight: "36px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {toTitleCase(option.categoryName)}
          </Typography>
          {!readOnly && (
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <IconButton
                size="small"
                onClick={(e) => handleEditClick(option, e)}
                onMouseDown={(e) => e.preventDefault()}
                sx={{
                  p: 0.5,
                  color: "#6b7280",
                  "&:hover": { color: "#2563eb" },
                }}
              >
                <Edit fontSize="small" sx={{ fontSize: "16px" }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => handleDeleteCategory(categoryId, e)}
                onMouseDown={(e) => e.preventDefault()}
                sx={{
                  p: 0.5,
                  color: "#6b7280",
                  "&:hover": { color: "#ef4444" },
                }}
              >
                <Delete fontSize="small" sx={{ fontSize: "16px" }} />
              </IconButton>
            </Box>
          )}
        </Box>
      </MenuItem>
    );
  };

  // Prepare options with create option if needed
  const getOptions = () => {
    const filtered = inputValue
      ? categories.filter((cat) =>
          cat.categoryName?.toLowerCase().includes(inputValue.toLowerCase()),
        )
      : categories;

    // Add create option if input exists and doesn't match any category (only if not readOnly)
    if (!readOnly && inputValue && !categoryExists(inputValue)) {
      return [
        ...filtered,
        { isCreateOption: true, inputValue, id: "create-option" },
      ];
    }

    return filtered;
  };

  return (
    <>
      <Autocomplete
        options={getOptions()}
        value={selectedCategory || null}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionLabel={(option) => {
          if (option.isCreateOption) return "";
          return option.categoryName || "";
        }}
        getOptionKey={(option) => option.id || option._id || option.inputValue}
        isOptionEqualToValue={(option, value) =>
          (option.id || option._id) === (value.id || value._id)
        }
        renderOption={renderOption}
        loading={loading}
        filterOptions={(options) => options} // We handle filtering manually
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            placeholder="Search or select category"
            error={error}
            helperText={helperText}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                backgroundColor: "white",
                fontSize: "0.875rem",
                minHeight: "38px",
                paddingRight: "14px !important",
                "& fieldset": {
                  borderColor: error ? "#ef4444" : "#d1d5db",
                },
                "&:hover fieldset": {
                  borderColor: error ? "#ef4444" : "#9ca3af",
                },
                "&.Mui-focused fieldset": {
                  borderColor: error ? "#ef4444" : "#3b82f6",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputBase-input": {
                padding: "8px 12px !important",
              },
              "& .MuiFormHelperText-root": {
                marginLeft: 0,
                fontSize: "0.75rem",
                color: error ? "#ef4444" : "#6b7280",
              },
            }}
          />
        )}
        PaperComponent={(props) => (
          <Paper
            {...props}
            sx={{
              borderRadius: "0.5rem",
              mt: 0.5,
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
        )}
        ListboxProps={{
          sx: {
            maxHeight: "280px",
            padding: "4px 0",
          },
        }}
        fullWidth
      />

      {!readOnly && (
        <EditCategoryModal
          open={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setEditingCategory(null);
          }}
          category={editingCategory}
          onUpdate={handleUpdateCategory}
        />
      )}
    </>
  );
};

export default CategorySelect;
