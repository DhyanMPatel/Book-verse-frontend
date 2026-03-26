import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import axiosInstance from "../../../../services/axiosInstance";
import "./UpdateBookStyle.css";

const CreateBooks = ({ isOpen, onClose, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [fileUrlPreview, setFileUrlPreview] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setCategories(res?.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const validationSchema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .test(
        "no-only-spaces",
        "Cannot be empty or spaces only",
        (value) => value && value.trim().length > 0
      ),
    author: yup
      .string()
      .required("Author is required")
      .test(
        "no-only-spaces",
        "Author cannot be empty or spaces only",
        (value) => value && value.trim().length > 0
      ),
    description: yup
      .string()
      .required("Description is required")
      .test(
        "no-only-spaces",
        "Description cannot be empty or spaces only",
        (value) => value && value.trim().length > 0
      ),
    categoryId: yup.string().required("Category is required"),
     isbn: yup
      .string()
      .required("ISBN is required")
      .matches(
        /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/,
        "Invalid ISBN format",
      ),
    price: yup
      .number()
      .required("Price is required")
      .min(0, "Price must be positive")
      .max(10000, "Price must be less than 10000"),
    discount: yup
      .number()
      .min(0, "Discount must be positive")
      .max(100, "Discount must be less than 100"),
    pages: yup
      .number()
      .required("Pages is required")
      .min(1, "Pages must be at least 1")
      .max(100000, "Pages must be less than 100000"),
    stock: yup
      .number()
      .required("Stock is required")
      .min(0, "Stock must be positive")
      .max(10000, "Stock must be less than 10000"),
    language: yup
      .string()
      .trim()
      .required("Language is required")
      .min(2, "Language must be at least 2 characters")
      .max(50, "Language must be less than 50 characters"),
    publisher: yup
      .string()
      .trim()
      .required("Publisher is required")
      .min(2, "Publisher must be at least 2 characters")
      .max(100, "Publisher must be less than 100 characters"),
    publishedDate: yup
      .date()
      .required("Published date is required")
      .max(new Date(), "Published date cannot be in the future"),
    coverImage: yup
      .mixed()
      .required("Cover image is required"),
    fileUrl: yup
      .mixed()
      .test("fileType", "Only PDF files are allowed", (value) => {
        if (!value) return true;
        return value.type === "application/pdf";
      })
      .test("fileSize", "File size must be less than 10MB", (value) => {
        if (!value) return true;
        return value.size <= 100 * 1024 * 1024;
      }),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      description: "",
      categoryId: "",
      isbn: "",
      price: "",
      discount: "",
      pages: "",
      stock: "",
      language: "",
      publisher: "",
      publishedDate: "",
      coverImage: null,
      file: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("author", values.author);
        formData.append("description", values.description);

        const selectedCategory = categories.find(
          (cat) => cat.id === values.categoryId
        );
        formData.append("category", selectedCategory?.categoryName || "");

        formData.append("price", values.price);
        formData.append("discount", values.discount || 0);
        formData.append("stock", values.stock);
        formData.append("pages", values.pages);
        formData.append("language", values.language);
        formData.append("publisher", values.publisher);
        formData.append("publishedDate", values.publishedDate);
        formData.append("isbn", values.isbn);
        formData.append("format", "pdf");

        formData.append("coverImage", values.coverImage);

        if (values.file) {
          formData.append("file", values.file);
        }

        await onSubmit(formData);

        formik.resetForm();
        setCoverImagePreview(null);
        setFileUrlPreview(null);
        onClose();
      } catch (error) {
        console.error("Create book error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (isOpen) {
      formik.resetForm();
      setCoverImagePreview(null);
      setFileUrlPreview(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleCoverImageChange = (event) => {
    const files = event.currentTarget.files;

    if (files.length > 1) {
      formik.setFieldError("coverImage", "Only one image allowed");
      return;
    }

    const file = files[0];

    if (file) {
      formik.setFieldValue("coverImage", file);
      formik.setFieldTouched("coverImage", true);

      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUrlChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("file", file);
      setFileUrlPreview(file.name);
    }
  };

  const clearCoverImage = () => {
    formik.setFieldValue("coverImage", null);
    setCoverImagePreview(null);
  };

  const clearFileUrl = () => {
    formik.setFieldValue("fileUrl", null);
    setFileUrlPreview(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 shrink-0">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Add New Book</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto p-6 min-h-0">
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                    Basic Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          formik.errors.title && formik.touched.title
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter book title"
                      />
                      {formik.errors.title && formik.touched.title && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500 text-left"
                        >
                          {formik.errors.title}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Author
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={formik.values.author}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          formik.errors.author && formik.touched.author
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter author name"
                      />
                      {formik.errors.author && formik.touched.author && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500 text-left"
                        >
                          {formik.errors.author}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ISBN
                      </label>
                      <input
                        type="text"
                        name="isbn"
                        value={formik.values.isbn}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          formik.errors.isbn && formik.touched.isbn
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter ISBN (e.g., 978-3-16-148410-0)"
                      />
                      {formik.errors.isbn && formik.touched.isbn && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500 text-left"
                        >
                          {formik.errors.isbn}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows="4"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          formik.errors.description && formik.touched.description
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter book description"
                      />
                      {formik.errors.description && formik.touched.description && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500 text-left"
                        >
                          {formik.errors.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                    Pricing & Inventory
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        name="categoryId"
                        value={formik.values.categoryId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          formik.errors.categoryId && formik.touched.categoryId
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.categoryName}
                          </option>
                        ))}
                      </select>
                      {formik.errors.categoryId && formik.touched.categoryId && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500 text-left"
                        >
                          {formik.errors.categoryId}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        step="0.01"
                        min="0"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          formik.errors.price && formik.touched.price
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter price"
                      />
                      {formik.errors.price && formik.touched.price && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500 text-left"
                        >
                          {formik.errors.price}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        name="discount"
                        value={formik.values.discount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        step="0.01"
                        min="0"
                        max="100"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          formik.errors.discount && formik.touched.discount
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter discount percentage"
                      />
                      {formik.errors.discount && formik.touched.discount && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500 text-left"
                        >
                          {formik.errors.discount}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formik.values.stock}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        min="0"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          formik.errors.stock && formik.touched.stock
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter stock quantity"
                      />
                      {formik.errors.stock && formik.touched.stock && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500 text-left"
                        >
                          {formik.errors.stock}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                    Additional Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pages
                      </label>
                      <input
                        type="number"
                        name="pages"
                        value={formik.values.pages}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        min="1"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          formik.errors.pages && formik.touched.pages
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter number of pages"
                      />
                      {formik.errors.pages && formik.touched.pages && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500 text-left"
                        >
                          {formik.errors.pages}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <input
                        type="text"
                        name="language"
                        value={formik.values.language}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          formik.errors.language && formik.touched.language
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter language (e.g., English, Hindi)"
                      />
                      {formik.errors.language && formik.touched.language && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500 text-left"
                        >
                          {formik.errors.language}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Publisher
                      </label>
                      <input
                        type="text"
                        name="publisher"
                        value={formik.values.publisher}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          formik.errors.publisher && formik.touched.publisher
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter publisher name"
                      />
                      {formik.errors.publisher && formik.touched.publisher && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500 text-left"
                        >
                          {formik.errors.publisher}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Published Date
                      </label>
                      <input
                        type="date"
                        name="publishedDate"
                        value={formik.values.publishedDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        max={new Date().toISOString().split("T")[0]}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          formik.errors.publishedDate &&
                          formik.touched.publishedDate
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {formik.errors.publishedDate &&
                        formik.touched.publishedDate && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-sm text-red-500 text-left"
                          >
                            {formik.errors.publishedDate}
                          </motion.p>
                        )}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                    Files
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Image
                      </label>
                      <div className="space-y-2">
                        <input
                          type="file"
                          name="coverImage"
                          onChange={handleCoverImageChange}
                          accept=".jpg,.jpeg,.png,.webp"
                          multiple={false}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                            formik.errors.coverImage && formik.touched.coverImage
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {coverImagePreview && (
                          <div className="relative inline-block">
                            <img
                              src={coverImagePreview}
                              alt="Cover preview"
                              className="w-32 h-48 object-cover rounded-lg border border-gray-300"
                            />
                            <button
                              type="button"
                              onClick={clearCoverImage}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                      {formik.errors.coverImage && formik.touched.coverImage && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500 text-left"
                        >
                          {formik.errors.coverImage}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Book Softcopy (PDF)
                      </label>
                      <div className="space-y-2">
                        <input
                          type="file"
                          name="fileUrl"
                          onChange={handleFileUrlChange}
                          accept=".pdf"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                            formik.errors.fileUrl && formik.touched.fileUrl
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {fileUrlPreview && (
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <svg
                              className="w-5 h-5 text-red-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <span className="text-sm text-gray-700">
                              {fileUrlPreview}
                            </span>
                            <button
                              type="button"
                              onClick={clearFileUrl}
                              className="ml-auto bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                      {formik.errors.fileUrl && formik.touched.fileUrl && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500 text-left"
                        >
                          {formik.errors.fileUrl}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 bg-gray-50 p-6 shrink-0">
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancel
                </button>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || !formik.isValid}
                  whileHover={{
                    scale: isSubmitting || !formik.isValid ? 1 : 1.02,
                  }}
                  whileTap={{
                    scale: isSubmitting || !formik.isValid ? 1 : 0.98,
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating..." : "Create Book"}
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateBooks;