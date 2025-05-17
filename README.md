💄 Cosmetics Website - Frontend
🔍 Overview
A modern and responsive frontend for the Cosmetics E-commerce Platform, built with React, Tailwind CSS, Formik, and Vite. This frontend communicates with the backend API to provide a seamless shopping experience, including product browsing, user authentication, cart management, and admin controls.
The frontend is responsible for rendering the user interface, managing client-side routing, handling forms and input validation, and making API requests to the backend. It supports two main user roles: Customers and Admins.

📋 Project Scope
- User Registration & Login (JWT-based auth)
- Profile Update and Order History
- Product Catalog with Search and Filters
- Cart Management and Checkout Integration
- Admin Dashboard for Product and Order Management

✨ Features
👤 User Features
- Authentication: Secure login and registration with form validation (Formik)
- Product Listing: View, search, and filter cosmetic products
- Cart Management: Add, update, or remove items from cart
- User Profile: Edit profile picture, view personal info, order history
- Reviews: Leave ratings and reviews for products


🛠️ Admin Features
- Add Products: Create new products with image upload
- Update Products: Edit product details and stock
- Delete Products
- Order Management: View and update order status
- User Management: Promote or remove users


🏗️ Project Structure
frontend/
├── public/
├── src/
│   ├── assets/           # Static files (images, logos, etc.)
│   ├── components/       # Reusable UI components
│   ├── pages/            # Main pages (Home, Login, Cart, Admin Dashboard, etc.)
│   ├── stores/           # Global state management (e.g., Redux/Zustand or context)
│   ├── lib/              # API services, utilities
│   ├── App.jsx           # App layout and routing
│   ├── main.jsx          # Entry point
├── index.css             # Tailwind setup
├── package.json
├── .env





📋 Prerequisites
Before you begin, ensure you have the following:
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Backend API (Must be running locally or deployed)
- Postman (Optional, for testing APIs)
- Vite for development server

🔧 Installation

1. Clone the repository
git clone https://github.com/nadeenetriby/Cosmetics_Website.git
cd Cosmetics_Website/frontend

2. Install dependencies
npm install

3. Create your environment file
Create a `.env` file in the root with the following:
VITE_API_URL=http://localhost:3000
Replace the URL if your backend is hosted remotely.

4. Run the development server
npm run dev

5. Visit the App in your browser
http://localhost:5173
🔌 API Integration
All APIs are consumed from the backend using Axios or Fetch with JWT stored in local storage or cookies.


Example APIs used:
- POST /api/user/login
- GET /api/product/viewProducts
- POST /api/user/cart/addToCart
- GET /api/user/cart/viewCart
- POST /api/product/createProduct (Admin)

🧪 Testing
You can use Postman to manually test backend endpoints. Frontend behavior can be verified using DevTools or React DevTools.
-------------------------------------------------------------------------------------------------------------------------------------------
BACKEND:
🔍 Overview
Cosmetics Website is a full-stack web application designed to provide a comprehensive e-commerce solution for cosmetic products. The platform allows users to browse products, create accounts, manage their shopping carts, place orders, and leave reviews. The admin dashboard enables inventory management, user management, and order tracking.
📋 Project Scope
•	User authentication and profile management
•	Product catalog with search, filter, and categorization
•	Shopping cart and checkout functionality
•	Order processing and history
•	Product reviews and ratings
•	Admin dashboard for product and order management
✨ Features
User Features
•	User Registration & Authentication - Secure account creation and login with JWT
•	Profile Management - Edit personal info and view order history
•	Product Browsing - Search, filter, and sort products by category, price, and rating
•	Shopping Cart - Add, remove, and update quantities of products
•	Checkout Process - Secure payment processing and order confirmation
Admin Features
•	Product Management - Add, edit, and remove products from stock
•	Order Management - Process orders and update order status
•	User Management - View and manage user accounts





🏗️ Architecture
The application follows a modular architecture with clear separation of concerns:
Web_Project /
├── src/
│   ├── models/
│   ├── cloudinary/
│   ├── Admin/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
└── package.json
└── .env
└── Readme

📋 Prerequisites
Before you begin, ensure you have met the following requirements:
•	Node.js - Version 14.x or higher (Download)
•	NPM - Version 6.x or higher (comes with Node.js)
•	MongoDB - A MongoDB Atlas account (or local MongoDB installation)
•	Cloudinary - Account for image storage
•	Git - For version control (Download)




🔧 Installation
Follow these steps to set up the backend API on your local machine:
1-Clone the repository  
git clone https://github.com/nadeenetriby/Cosmetics_Website.git
2- Set up environment variables Create a .env file in the root directory with the following variables: 
PORT=3000
JWT_SECRET=mysecretkey
MONGO_URI=mongodb+srv://nourrra7med:nour1234@cluster0.p1u2uqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
CLOUDINARY_API_NAME=dt4lcwvru
CLOUDINARY_API_KEY=982112398888828
CLOUDINARY_API_SECRET=GMt3rz1aGEXZqYx5yA2OTWvR43g

3- Start the development server
npm start
4- The API will be running at: 
http://localhost:3000	





## 📊 API Endpoints

### 👤 User Authentication

| Method | Endpoint               | Description                            | Auth Required |
|--------|------------------------|----------------------------------------|---------------|
| POST   | `/api/user/register`   | Register a new user                    | ❌ No         |
| POST   | `/api/user/login`      | Authenticate user                      | ❌ No         |

### 🛡️ Admin Operations

| Method | Endpoint                        | Description                          | Auth Required |
|--------|---------------------------------|--------------------------------------|---------------|
| PUT    | `/api/user/promoteEmail`        | Promote a user to admin              | ✅ Yes (Admin) |
| POST   | `/api/product/createProduct`    | Create a new product                 | ✅ Yes (Admin) |
| PATCH  | `/api/product/updateProduct/:id`| Update a product                     | ✅ Yes (Admin) |
| DELETE | `/api/product/deleteProduct/:id`| Delete a product                     | ✅ Yes (Admin) |

### 🛍️ Products

| Method | Endpoint                                 | Description                              | Auth Required |
|--------|------------------------------------------|------------------------------------------|---------------|
| GET    | `/api/product/viewProducts`              | View all products                        | ❌ No         |
| GET    | `/api/product/Search?name=value`         | Search products by name (query param)    | ❌ No         |
| GET    | `/api/product/Search?category=value`     | Filter products by category (query param)| ❌ No         |

### 📝 Reviews

| Method | Endpoint                                                  | Description                                  | Auth Required |
|--------|-----------------------------------------------------------|----------------------------------------------|---------------|
| POST   | `/api/product/reviews/:productid/createReviews`          | Add a review to a product                    | ✅ Yes        |
| GET    | `/api/product/reviews/reviewRate/:productid`             | Get average rating of a product's reviews    | ❌ No         |

### 🛒 Shopping Cart

| Method | Endpoint                                 | Description                                 | Auth Required |
|--------|------------------------------------------|---------------------------------------------|---------------|
| GET    | `/api/user/cart/viewCart`                | View user’s cart                            | ✅ Yes        |
| POST   | `/api/user/cart/addToCart`               | Add a product to the cart                   | ✅ Yes        |
| DELETE | `/api/user/cart/deleteFromCart/:productId`| Remove a product from the cart             | ✅ Yes        |

### 🖼️ User Profile

| Method | Endpoint                                 | Description                     | Auth Required |
|--------|------------------------------------------|---------------------------------|---------------|
| PUT    | `/api/user/profile/:userId`              | Update profile picture          | ❌ No         |
| DELETE | `/api/user/profile/:userId/delete`       | Delete profile picture          | ❌ No         |
| GET    | `/api/user/userInfo`                     | Get user information            | ✅ Yes        |



👥 Contributing
We welcome contributions to improve the Cosmetics E-commerce Platform!
1.	Fork the repository
2.	Create your feature branch (git checkout -b feature/amazing-feature)
3.	Commit your changes (git commit -m 'Add some amazing feature')
4.	Push to the branch (git push origin feature/amazing-feature)
5.	Open a Pull Request






