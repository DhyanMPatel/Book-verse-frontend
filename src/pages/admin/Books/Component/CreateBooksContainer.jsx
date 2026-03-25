// import React from 'react'
// import * as yup from "yup";
// import { motion, AnimatePresence } from "framer-motion";
// import { useFormik } from "formik";
// import { useEffect } from "react";
// import axiosInstance from "../../../../services/axiosInstance";
// import { useState } from "react";
// import CreateBooks from './CreateBooks';

// const CreateBooksContainer = ({ isOpen, onClose, onSubmit }) => {
// const [isSubmitting, setIsSubmitting] = useState(false);
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
//       .trim()
//       .required("Title is required")
//       .min(2, "Title must be at least 2 characters")
//       .max(200, "Title must be less than 200 characters"),
//     author: yup
//       .string()
//       .trim() // ✅ removes leading/trailing spaces

//       .required("Author is required")
//       .min(2, "Author must be at least 2 characters")
//       .max(100, "Author must be less than 100 characters"),
//     description: yup
//       .string()
//       .trim() // ✅ removes leading/trailing spaces

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
//       .matches(
//         /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/,
//         "Invalid ISBN format",
//       ),

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
//       .max(100000, "Pages must be less than 100000"),
//     stock: yup
//       .number()
//       .required("Stock is required")
//       .min(1, "Stock must be positive")
//       .max(10000, "Stock must be less than 10000"),
//     language: yup
//       .string()
//       .trim() // ✅ removes leading/trailing spaces
//       .required("Language is required")
//       .min(2, "Language must be at least 2 characters")
//       .max(50, "Language must be less than 50 characters"),
//     publisher: yup
//       .string()
//       .trim() // ✅ removes leading/trailing spaces

//       .required("Publisher is required")
//       .min(2, "Publisher must be at least 2 characters")
//       .max(100, "Publisher must be less than 100 characters"),
//     publishedDate: yup
//       .date()
//       .required("Published date is required")
//       .max(new Date(), "Published date cannot be in the future"),
//     coverImage: yup.mixed().required("Cover image is required"),

//     // ✅ Only one file check
//     // .test("singleFile", "Only one image is allowed", (value) => {
//     //   return value instanceof File;
//     // })

//     // // ✅ Extension + MIME validation
//     // .test("fileType", "Only JPG, PNG, WEBP allowed", (value) => {
//     //   if (!value) return false;

//     //   const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
//     //   const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

//     //   const ext = value.name.split(".").pop().toLowerCase();

//     //   return (
//     //     allowedExtensions.includes(ext) && allowedTypes.includes(value.type)
//     //   );
//     // })

//     // // ✅ Size validation
//     // .test("fileSize", "File must be less than 5MB", (value) => {
//     //   if (!value) return false;
//     //   return value.size <= 5 * 1024 * 1024;
//     // }),
//     fileUrl: yup
//       .mixed()
//       .test("fileType", "Only PDF files are allowed", (value) => {
//         if (!value) return true; // Optional field
//         return value.type === "application/pdf";
//       })
//       .test("fileSize", "File size must be less than 10MB", (value) => {
//         if (!value) return true; // Optional field
//         return value.size <= 100 * 1024 * 1024; // 10MB
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
//       file: null,
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       setIsSubmitting(true);
//       try {
//         const formData = new FormData();

//         // ✅ BASIC FIELDS
//         formData.append("title", values.title);
//         formData.append("author", values.author);
//         formData.append("description", values.description);

//         // 🔥 DYNAMIC CATEGORY (THIS IS IMPORTANT)
//         const selectedCategory = categories.find(
//           (cat) => cat.id === values.categoryId,
//         );

//         formData.append("category", selectedCategory?.categoryName);

//         // ✅ NUMBERS
//         formData.append("price", values.price);
//         formData.append("discount", values.discount || 0);
//         formData.append("stock", values.stock);
//         formData.append("pages", values.pages);

//         // ✅ OTHER FIELDS
//         formData.append("language", values.language);
//         formData.append("publisher", values.publisher);
//         formData.append("publishedDate", values.publishedDate);
//         formData.append("isbn", values.isbn);

//         // 🔥 REQUIRED STATIC (backend needs it)
//         formData.append("format", "pdf");

//         // ✅ FILES
//         formData.append("coverImage", values.coverImage);

//         if (values.file) {
//           formData.append("file", values.file); // ⚠️ rename here
//         }

//         await onSubmit(formData);

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

//   const handleCoverImageChange = (event) => {
//     const files = event.currentTarget.files;

//     // ❌ Block multiple files
//     if (files.length > 1) {
//       formik.setFieldError("coverImage", "Only one image allowed");
//       return;
//     }

//     const file = files[0];

//     if (file) {
//       formik.setFieldValue("coverImage", file);
//       formik.setFieldTouched("coverImage", true);

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
//       formik.setFieldValue("file", file);
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
