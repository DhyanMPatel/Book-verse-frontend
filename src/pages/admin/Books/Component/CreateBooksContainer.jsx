// import React from 'react'
// import * as yup from "yup";
// import { motion, AnimatePresence } from "framer-motion";
// import { useFormik } from "formik";
// import { useEffect } from "react";
// import axiosInstance from "../../../../services/axiosInstance";
// import { useState } from "react";
// import CreateBooks from './CreateBooks';

// const CreateBooksContainer = (isOpen, onClose, onSubmit) => {
// // const CreateBooks = ({ isOpen, onClose, onSubmit }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);  
//   const [coverImagePreview, setCoverImagePreview] = useState(null);
//   const [fileUrlPreview, setFileUrlPreview] = useState(null);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axiosInstance.get("/categories"); // adjust if needed
//         setCategories(res?.data?.data || []);
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Validation schema
//   const validationSchema = yup.object().shape({
//     title: yup
//       .string()
//       .required("Title is required")
//       .min(2, "Title must be at least 2 characters")
//       .max(200, "Title must be less than 200 characters"),
//     author: yup
//       .string()
//       .required("Author is required")
//       .min(2, "Author must be at least 2 characters")
//       .max(100, "Author must be less than 100 characters"),
//     description: yup
//       .string()
//       .required("Description is required")
//       .min(10, "Description must be at least 10 characters")
//       .max(2000, "Description must be less than 2000 characters"),
//     //    category: yup
//     //       .string()
//     //       .required('Category is required')
//     //       .oneOf(['fiction', 'non-fiction', 'science', 'technology', 'business', 'self-help', 'romance', 'thriller', 'biography', 'history', 'children'], 'Invalid category'),
//     categoryId: yup.string().required("Category is required"),
//     isbn: yup
//       .string()
//       .required("ISBN is required")
//       .matches(/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/, 'Invalid ISBN format'),

//     price: yup
//       .number()
//       .required("Price is required")
//       .min(0, "Price must be positive")
//       .max(10000, "Price must be less than 10000"),
//     discount: yup
//       .number()
//       .min(0, "Discount must be positive")
//       .max(100, "Discount must be less than 100"),
//     pages: yup
//       .number()
//       .required("Pages is required")
//       .min(1, "Pages must be at least 1")
//       .max(10000, "Pages must be less than 10000"),
//     stock: yup
//       .number()
//       .required("Stock is required")
//       .min(0, "Stock must be positive")
//       .max(10000, "Stock must be less than 10000"),
//     language: yup
//       .string()
//       .required("Language is required")
//       .min(2, "Language must be at least 2 characters")
//       .max(50, "Language must be less than 50 characters"),
//     publisher: yup
//       .string()
//       .required("Publisher is required")
//       .min(2, "Publisher must be at least 2 characters")
//       .max(100, "Publisher must be less than 100 characters"),
//     publishedDate: yup
//       .date()
//       .required("Published date is required")
//       .max(new Date(), "Published date cannot be in the future"),
//     coverImage: yup
//       .mixed()
//       .required("Cover image is required")
//       .test("fileType", "Only image files are allowed", (value) => {
//         if (!value) return false;
//         const allowedTypes = [
//           "image/jpeg",
//           "image/jpg",
//           "image/png",
//           "image/webp",
//         ];
//         return allowedTypes.includes(value.type);
//       })
//       .test("fileSize", "File size must be less than 5MB", (value) => {
//         if (!value) return false;
//         return value.size <= 5 * 1024 * 1024; // 5MB
//       }),
//     fileUrl: yup
//       .mixed()
//       .test("fileType", "Only PDF files are allowed", (value) => {
//         if (!value) return true; // Optional field
//         return value.type === "application/pdf";
//       })
//       .test("fileSize", "File size must be less than 10MB", (value) => {
//         if (!value) return true; // Optional field
//         return value.size <= 10 * 1024 * 1024; // 10MB
//       }),
//   });

//   // Formik configuration
//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       author: "",
//       description: "",
//       categoryId: "",
//       isbn: "",
//       price: "",
//       discount: "",
//       pages: "",
//       stock: "",
//       language: "",
//       publisher: "",
//       publishedDate: "",
//       coverImage: null,
//       fileUrl: null,
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       setIsSubmitting(true);
//       try {
//         const formData = new FormData();

//         // Append all form fields
//         Object.keys(values).forEach((key) => {
//           if (values[key] !== null && values[key] !== undefined) {
//             formData.append(key, values[key]);
//           }
//         });

//         await onSubmit(formData);

//         // Reset form
//         formik.resetForm();
//         setCoverImagePreview(null);
//         setFileUrlPreview(null);
//         onClose();
//       } catch (error) {
//         console.error("Create book error:", error);
//       } finally {
//         setIsSubmitting(false);
//       }
//     },
//   });

//   // Handle file changes
//   const handleCoverImageChange = (event) => {
//     const file = event.currentTarget.files[0];
//     if (file) {
//       formik.setFieldValue("coverImage", file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCoverImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFileUrlChange = (event) => {
//     const file = event.currentTarget.files[0];
//     if (file) {
//       formik.setFieldValue("fileUrl", file);
//       setFileUrlPreview(file.name);
//     }
//   };

//   // Clear file previews
//   const clearCoverImage = () => {
//     formik.setFieldValue("coverImage", null);
//     setCoverImagePreview(null);
//   };

//   const clearFileUrl = () => {
//     formik.setFieldValue("fileUrl", null);
//     setFileUrlPreview(null);
//   };

//   if (!isOpen) return null;
  
  
//     return (
//     <>
// <CreateBooks
//   isOpen={isOpen}
//   onClose={onClose}
//   onSubmit={onSubmit}
//   validationSchema={validationSchema}
//   formik={formik}
//   coverImagePreview={coverImagePreview}
//   fileUrlPreview={fileUrlPreview}
//   handleCoverImageChange={handleCoverImageChange}
//   handleFileUrlChange={handleFileUrlChange}
//   clearCoverImage={clearCoverImage}
//   clearFileUrl={clearFileUrl}
//   categories={categories}
// />
//     </>
//   )
// }

// export default CreateBooksContainer
