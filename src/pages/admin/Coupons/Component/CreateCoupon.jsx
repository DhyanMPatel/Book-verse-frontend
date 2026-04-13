import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../../../services/axiosInstance";

const CreateCoupon = ({ isOpen, onClose, onSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    couponCode: "",
    discountType: "fixed",
    discount: "",
    categoryId: "",
    usageLimit: "",
    validTillDate: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation schema
  const validationSchema = yup.object().shape({
    couponCode: yup
      .string()
      .required("Coupon code is required")
      .min(3, "Coupon code must be at least 3 characters")
      .max(20, "Coupon code cannot exceed 20 characters"),
    discount: yup
      .number()
      .required("Discount is required")
      .min(0, "Discount cannot be less than 0"),
    categoryId: yup.string().required("Category is required"),
    validTillDate: yup
      .date()
      .required("Valid till date is required")
      .min(new Date(), "Valid till date must be in the future"),
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateField = async (name, value) => {
    try {
      await yup.reach(validationSchema, name).validate(value);
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate all fields
      await validationSchema.validate(formData, { abortEarly: false });

      // Submit form
      await onSubmit({
        ...formData,
        discount: Number(formData.discount),
        usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null,
      });

      // Reset form
      setFormData({
        couponCode: "",
        discountType: "fixed",
        discount: "",
        categoryId: "",
        usageLimit: "",
        validTillDate: "",
        description: "",
      });

      // Close modal
      onClose();
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Create New Coupon
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[80vh]">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Coupon Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  name="couponCode"
                  value={formData.couponCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all uppercase ${
                    errors.couponCode ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., SUMMER2024"
                  maxLength={20}
                />
                {errors.couponCode ? (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-500"
                  >
                    {errors.couponCode}
                  </motion.p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500">
                    3-20 characters, will be stored in uppercase
                  </p>
                )}
              </div>

              {/* Discount Type (Radio Buttons) & Discount */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Type
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="discountType"
                        value="fixed"
                        checked={formData.discountType === "fixed"}
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Fixed (₹)</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="discountType"
                        value="percentage"
                        checked={formData.discountType === "percentage"}
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Percentage (%)</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount {formData.discountType === "percentage" ? "(%)" : "Amount (₹)"}
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                      errors.discount ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={formData.discountType === "percentage" ? "e.g., 20" : "e.g., 100"}
                    min="0"
                    step="0.01"
                  />
                  {errors.discount && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors.discount}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
  name="categoryId"
  value={formData.categoryId}
  onChange={handleChange}
  onBlur={handleBlur}
  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
    errors.categoryId ? "border-red-500" : "border-gray-300"
  }`}
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.categoryName}
                          </option>
                        ))}
</select>
                {errors.categoryId && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-500"
                  >
                    {errors.categoryId}
                  </motion.p>
                )}
              </div>

              {/* Usage Limit & Valid Till Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Usage Limit
                  </label>
                  <input
                    type="number"
                    name="usageLimit"
                    value={formData.usageLimit}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Unlimited"
                    min="1"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Leave empty for unlimited
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valid Till Date
                  </label>
                  <input
                    type="date"
                    name="validTillDate"
                    value={formData.validTillDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                      errors.validTillDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.validTillDate && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors.validTillDate}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  placeholder="Optional description"
                  maxLength={500}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Max 500 characters
                </p>
              </div>
            </div>

            {/* Sticky Footer Actions */}
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
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="coupon-ticket-btn disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating..." : "Create Coupon"}
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateCoupon;
