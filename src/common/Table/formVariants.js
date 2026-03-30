export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateY: -15,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const buttonVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 40px rgba(59, 130, 246, 0.4)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

export const formThemes = {
  login: {
    title: "Book Verse",
    subtitle: "Enter your credentials to access the digital library",
    gradient: "from-blue-500/20 to-purple-600/20",
    buttonGradient: "from-blue-500 to-purple-600",
    submitText: "Sign In",
    loadingText: "Signing in...",
  },
  register: {
    title: "Join Book Verse",
    subtitle: "Create your account to access the digital library",
    gradient: "from-purple-500/20 to-blue-600/20",
    buttonGradient: "from-purple-500 to-blue-600",
    submitText: "Sign Up",
    loadingText: "Creating Account...",
  },
  forgotPassword: {
    title: "Book Verse",
   subtitle: "Enter your email to reset your password",
    gradient: "from-blue-500/20 to-purple-600/20",
    buttonGradient: "from-blue-500 to-purple-600",
   submitText: "Send Reset Link",
    loadingText: "Sending reset link...",
  },
  resetPassword: {
  title: "Book Verse",
  subtitle: "Create a new password for your account",
  gradient: "from-green-500/20 to-blue-600/20",
  buttonGradient: "from-green-500 to-blue-600",
  submitText: "Reset Password",
  loadingText: "Resetting password...",
  },
};
