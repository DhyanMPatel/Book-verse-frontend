# BookVerse Frontend

A modern, feature-rich **Book E-Commerce & Reading Platform** built with React 19, Vite, and Tailwind CSS. BookVerse allows users to browse books, manage their library, create wishlists, and make purchases, while providing admins with comprehensive dashboard analytics and management tools.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Core Functions](#core-functions)
- [Routing & Authentication](#routing--authentication)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Available Scripts](#available-scripts)

## Features

### User Features
- **Authentication**: JWT-based login, registration, forgot/reset password
- **Home Page**: Browse featured books, categories, and active coupons
- **Book Discovery**: Search books with filters, view detailed book information
- **Library**: Access purchased/read books
- **Cart**: Add books to cart and manage purchases
- **Wishlist**: Save favorite books for later
- **Profile**: Manage user profile and account settings
- **Settings**: Update password and account preferences

### Admin Features
- **Dashboard**: Analytics with charts (Revenue, Orders, User Stats, Top Books)
- **User Management**: View and manage registered users
- **Book Management**: Add, edit, delete books
- **Order Management**: View and update order statuses
- **Coupon Management**: Create and manage discount coupons

### UI/UX Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for page transitions and scroll animations
- **Data Visualization**: Recharts for admin dashboard analytics
- **3D Effects**: Three.js integration for immersive UI elements
- **Toast Notifications**: React-Toastify for user feedback
- **Interactive Components**: Material UI components with custom styling

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 + Vite 7 |
| **Styling** | Tailwind CSS 4 + Material UI 7 |
| **State Management** | React Context API + useReducer |
| **Routing** | React Router DOM 7 |
| **HTTP Client** | Axios |
| **Animations** | Framer Motion |
| **Charts** | Recharts |
| **3D Graphics** | Three.js + React Three Fiber |
| **Forms** | Formik + Yup |
| **Notifications** | React-Toastify + SweetAlert2 |
| **Icons** | Lucide React + React Icons |
| **Carousel** | React Slick |
| **Rating** | @smastrom/react-rating |
| **Date** | Day.js |
| **Linting** | ESLint 9 + Prettier |

## Project Structure

```
src/
├── App.jsx                 # Main app component with providers
├── main.jsx               # Entry point
├── assets/                # Static assets (images, icons)
├── common/                # Reusable common components (DataTable, Pagination)
├── components/            # Shared UI components (Navbar, Footer, Cards)
├── contexts/              # React Context providers
│   ├── AppContext.jsx     # Aggregates all providers
│   ├── AuthContext.jsx    # Authentication state & actions
│   ├── BookContext.jsx    # Book-related state
│   └── ReviewContext.jsx  # Review/rating state
├── hooks/                 # Custom React hooks
│   └── useAuth.jsx        # Authentication hook
├── layout/                # Layout components
│   ├── mainLayout/        # Main layout wrapper
│   ├── navbar/            # Navigation bar
│   └── footer/            # Footer component
├── pages/                 # Page components (Container pattern)
│   ├── admin/             # Admin pages
│   │   ├── Dashboard/     # Admin analytics dashboard
│   │   ├── Users/         # User management
│   │   ├── Books/         # Book management
│   │   ├── Orders/        # Order management
│   │   └── Coupons/       # Coupon management
│   ├── auth/              # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── home/              # Home page
│   ├── booksdetail/       # Book detail page
│   ├── search/            # Search results
│   ├── library/           # User's library
│   ├── cart/              # Shopping cart
│   ├── wishlist/          # User's wishlist
│   ├── profile/           # User profile
│   ├── setting/           # Account settings
│   └── error/             # 404 error page
├── routes/                # Routing configuration
│   ├── routesIndex.jsx    # Main router component
│   ├── constants.jsx      # Route definitions
│   ├── privateRoutes.jsx  # Private route guard
│   ├── publicRoutes.jsx   # Public route guard
│   └── adminRoutes.jsx    # Admin route guard
├── services/              # API services
│   └── axiosInstance.js   # Configured Axios instance
└── utils/                 # Utility functions
    ├── routeConstants.jsx # Route path constants
    └── AdminRouteConstants.jsx # Admin route constants
```

## Installation & Setup

### Prerequisites
- **Node.js**: v24.x.x (as specified in package.json engines)
- **npm**: v10.x.x

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Book-verse-frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_LIVE_API_URL=https://your-production-api.com/api
VITE_NODE_ENV=development
```

### Step 4: Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Step 5: Build for Production
```bash
npm run build
```

### Step 6: Preview Production Build
```bash
npm run preview
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Local/Development API URL | `http://localhost:5000/api` |
| `VITE_LIVE_API_URL` | Production API URL | `https://api.bookverse.com/api` |
| `VITE_NODE_ENV` | Environment mode | `development` or `production` |

## Core Functions

### 1. Authentication Functions (`AuthContext.jsx`)

#### `login(email, password)`
Authenticates user and stores tokens in localStorage/sessionStorage.
```javascript
const { login } = useContext(AuthContext);
const result = await login("user@example.com", "password123");
// Returns: { success: true, user, token, data } or { success: false, error }
```

#### `register(name, email, password, phone)`
Registers a new user and automatically logs them in.
```javascript
const { register } = useContext(AuthContext);
const result = await register("John Doe", "john@example.com", "password", "1234567890");
```

#### `logout()`
Clears all auth state and storage.
```javascript
const { logout } = useContext(AuthContext);
logout();
```

#### `isAdmin()`
Checks if current user has admin role.
```javascript
const { isAdmin } = useContext(AuthContext);
const adminStatus = isAdmin(); // Returns boolean
```

### 2. Axios Instance (`axiosInstance.js`)

Pre-configured Axios instance with interceptors for:
- **Request Interceptor**: Automatically attaches JWT token to headers
- **Response Interceptor**: Handles 401 errors by redirecting to login

```javascript
import axiosInstance from './services/axiosInstance';

// GET request
const response = await axiosInstance.get('/books/all');

// POST request
const response = await axiosInstance.post('/wishlist/add', { bookId });

// DELETE request
const response = await axiosInstance.delete(`/wishlist/remove/${bookId}`);
```

### 3. Wishlist Handler (`booksdetailContainer.jsx`)

#### `handleClickWishlist(book)`
Toggles a book in the user's wishlist with SweetAlert2 notifications.
```javascript
const handleClickWishlist = async (book) => {
  // 1. Validates user authentication
  // 2. Extracts book ID from various formats (book._id, book.id, book.bookId)
  // 3. If not liked: POST /wishlist/add
  // 4. If liked: DELETE /wishlist/remove/{bookId}
  // 5. Shows SweetAlert2 notification
  // 6. Handles 400 errors (already in wishlist) by syncing state
};
```

### 4. Home Page Data Fetching (`homeContainer.jsx`)

Fetches and manages:
- **Books**: `GET /books/all` - All available books
- **Categories**: Derived from books data (unique categories)
- **Coupons**: `GET /coupons/list` - Active discount coupons

```javascript
// Usage in HomeContainer
useEffect(() => {
  fetchBooks();    // Populates books[] and categories[]
  fetchCoupons();  // Populates coupons[]
}, []);
```

## Routing & Authentication

### Route Protection Components

#### `PublicRoute`
Prevents authenticated users from accessing auth pages (login, register).
```jsx
<PublicRoute>
  <LoginContainer />
</PublicRoute>
```

#### `PrivateRoute`
Redirects unauthenticated users to login with return path preserved.
```jsx
<PrivateRoute>
  <CartContainer />
</PrivateRoute>
```

#### `AdminRoute`
Restricts access to admin-only pages, redirects non-admins to home.
```jsx
<AdminRoute>
  <AdminDashboardContainer />
</AdminRoute>
```

### Route Constants (`utils/routeConstants.jsx`)

```javascript
RouteConstants = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/:token",
  search: "/search",
  booksdetails: "/book/:id",
  library: "/library",
  cart: "/cart",
  wishlist: "/wishlist",
  profile: "/profile",
  settings: "/settings",
  // Admin routes
  adminDashboard: "/admin/dashboard",
  adminUsers: "/admin/users",
  adminBooks: "/admin/books",
  adminOrders: "/admin/orders",
  admincoupons: "/admin/coupons",
};
```

## State Management

### Auth State Structure
```javascript
{
  user: null | { _id, name, email, role, ... },
  token: null | string,
  isAuthenticated: boolean,
  loading: boolean,
  error: null | string
}
```

### Context Hierarchy (`AppContext.jsx`)
```
AuthProvider
  └── BooksProvider
        └── ReviewProvider
              └── App Routes
```

### Auth Actions
| Action | Description |
|--------|-------------|
| `LOGIN_START` | Sets loading state |
| `LOGIN_SUCCESS` | Stores user, token, sets authenticated |
| `LOGIN_FAILURE` | Stores error, clears auth |
| `REGISTER_START/SUCCESS/FAILURE` | Same pattern as login |
| `LOGOUT` | Clears all auth state |
| `CLEAR_ERROR` | Resets error to null |

## API Integration

### Base Configuration
- **Base URL**: Determined by environment (`VITE_API_URL` or `VITE_LIVE_API_URL`)
- **Timeout**: 10 seconds
- **Content-Type**: `application/json`

### Authentication Flow
1. User logs in with credentials
2. Backend returns `authToken` and `refreshToken`
3. `authToken` stored in `localStorage`
4. `refreshToken` stored in `sessionStorage`
5. Token auto-attached to all requests via interceptor
6. On 401 response, user is redirected to login

### API Endpoints Used
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | POST | User authentication |
| `/auth/register` | POST | User registration |
| `/books/all` | GET | Fetch all books |
| `/wishlist/add` | POST | Add to wishlist |
| `/wishlist/remove/:id` | DELETE | Remove from wishlist |
| `/coupons/list` | GET | Fetch active coupons |

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with host (`--host`) |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on all files |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

[Your License Here]

## Contributors

[Your Name/Team]

---

**Note**: This project uses the Container-View pattern where each page has a `*Container.jsx` (logic) and `*View.jsx` (UI) component for better separation of concerns.
