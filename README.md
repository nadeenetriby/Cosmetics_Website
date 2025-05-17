"# Cosmetics_webApp" 
# 💄 Cosmetics Website - Frontend

A modern and responsive frontend for the Cosmetics E-commerce Platform, built with **React**, **Tailwind CSS**, **Formik**, and **Vite**. This frontend communicates with the backend API to provide a seamless shopping experience, including product browsing, user authentication, cart management, and admin controls.

---

## 🔍 Overview

The frontend is responsible for rendering the user interface, managing client-side routing, handling forms and input validation, and making API requests to the backend. It supports two main user roles: **Customers** and **Admins**.

---

## 📋 Project Scope

- User Registration & Login (JWT-based auth)
- Profile Update and Order History
- Product Catalog with Search and Filters
- Cart Management and Checkout Integration
- Admin Dashboard for Product and Order Management

---

## ✨ Features

### 👤 User Features

- 🔐 **Authentication**: Secure login and registration with form validation (Formik)
- 🛍️ **Product Listing**: View, search, and filter cosmetic products
- 📦 **Cart Management**: Add, update, or remove items from cart
- 👤 **User Profile**: Edit profile picture, view personal info, order history
- 💬 **Reviews**: Leave ratings and reviews for products

### 🛠️ Admin Features

- ➕ **Add Products**: Create new products with image upload
- ✏️ **Update Products**: Edit product details and stock
- ❌ **Delete Products**
- 📦 **Order Management**: View and update order status
- 👥 **User Management**: Promote or remove users

---

## 🏗️ Project Structure


frontend/  
├── public/  
├── src/  
│ ├── assets/ # Static files (images, logos, etc.)  
│ ├── components/ # Reusable UI components  
│ ├── pages/ # Main pages (Home, Login, Cart, Admin Dashboard, etc.)  
│ ├── stores/ # Global state management (e.g., Redux/Zustand or context)  
│ ├── lib/ # API services, utilities  
│ ├── App.jsx # App layout and routing  
│ ├── main.jsx # Entry point  
├── index.css # Tailwind setup  
├── package.json  
├─








## 📋 Prerequisites

Before you begin, ensure you have the following:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **Backend API** (Must be running locally or deployed)
- **Postman** (Optional, for testing APIs)
- **Vite** for development server

---

## 🔧 Installation

Follow these steps to set up the frontend on your local machine:

1. **Clone the repository**
```bash
git clone https://github.com/nadeenetriby/Cosmetics_Website.git
cd Cosmetics_Website/frontend

```

2.  **Install dependencies**
```bash
`npm install`
```

3.  **Create your environment file**  
    Create a `.env` file in the root with the following:
    
```bash
`VITE_API_URL=http://localhost:3000`
```
Replace the URL if your backend is hosted remotely.


4.  **Run the development server**

```bash
`npm run dev`
```

5.  **Visit the App in your browser**
    
```bash
`http://localhost:5173`
```


## 🔌 API Integration

All APIs are consumed from the backend using Axios or Fetch with JWT stored in local storage or cookies.

### Example APIs used:

-   `POST /api/user/login`
    
-   `GET /api/product/viewProducts`
    
-   `POST /api/user/cart/addToCart`
    
-   `GET /api/user/cart/viewCart`
    
-   `POST /api/product/createProduct` (Admin)


## 🧪 Testing

You can use Postman to manually test backend endpoints. Frontend behavior can be verified using DevTools or React DevTools.





# Cosmetics Website - Backend API

## 🔍 Overview
Cosmetics Website is a full-stack e-commerce platform for cosmetic products. This backend API provides user authentication, product management, shopping cart, order processing, and admin dashboard functionality to support a comprehensive cosmetics online store.

---

## 📋 Project Scope

### User Features
- User Registration & Authentication with JWT
- Profile Management (Edit info, view order history)
- Product Browsing (Search, filter, sort)
- Shopping Cart (Add/remove/update products)
- Checkout & Secure Payment
- Product Reviews & Ratings

### Admin Features
- Product Management (Add/Edit/Delete products)
- Order Management (Process and update orders)
- User Management (View/manage user accounts)

---

## 🏗️ Architecture
Web_Project/
├── src/
│ ├── models/
│ ├── cloudinary/
│ ├── Admin/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
├── package.json
├── .env
└── README.md


---

## 📋 Prerequisites

- **Node.js** v14.x or higher ([Download](https://nodejs.org/))
- **NPM** v6.x or higher (comes with Node.js)
- **MongoDB** (Atlas account or local installation)
- **Cloudinary** account for image storage
- **Git** for version control ([Download](https://git-scm.com/))

---

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nadeenetriby/Cosmetics_Website.git
   ```

## Set up environment variables

Create a .env file in the root directory and add:

PORT=3000
JWT_SECRET=mysecretkey
MONGO_URI=mongodb+srv://nourrra7med:nour1234@cluster0.p1u2uqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
CLOUDINARY_API_NAME=dt4lcwvru
CLOUDINARY_API_KEY=982112398888828
CLOUDINARY_API_SECRET=GMt3rz1aGEXZqYx5yA2OTWvR43g


## Install dependencies
npm install

## Start the development server
npm start

## Access API
http://localhost:3000



##  APIs used:


| Method | Endpoint                                        | Description                             | Authentication |
| ------ | ----------------------------------------------- | --------------------------------------- | -------------- |
| POST   | `/api/user/register`                            | Register a new user                     | No             |
| POST   | `/api/user/login`                               | Authenticate user                       | No             |
| PUT    | `/api/user/promoteEmail`                        | Admin promotes user to admin            | Yes (Admin)    |
| POST   | `/api/product/reviews/:productid/createReviews` | Create a review for specific product    | Yes            |
| GET    | `/api/product/reviews/reviewRate/:productid`    | Get average review rating for a product | No             |
| GET    | `/api/user/cart/viewCart`                       | View user's cart                        | Yes            |
| POST   | `/api/user/cart/addToCart`                      | Add product to cart                     | Yes            |
| DELETE | `/api/user/cart/deleteFromCart/:productId`      | Delete product from cart                | Yes            |
| POST   | `/api/product/createProduct`                    | Admin creates new product               | Yes (Admin)    |
| PATCH  | `/api/product/updateProduct/:id`                | Admin updates product                   | Yes (Admin)    |
| DELETE | `/api/product/deleteProduct/:id`                | Admin deletes product                   | Yes (Admin)    |
| GET    | `/api/product/viewProducts`                     | View all products                       | No             |
| GET    | `/api/product/Search?name=value`                | Search products by name                 | No             |
| GET    | `/api/product/Search?category=value`            | Filter products by category             | No             |
| PUT    | `/api/user/profile/:userId`                     | Update user profile picture             | No             |
| DELETE | `/api/user/profile/:userId/delete`              | Delete profile picture                  | No             |
| GET    | `/api/user/userInfo`                            | Get user info                           | Yes            |





## 👥 Contributing
## We welcome contributions to improve the Cosmetics E-commerce Platform!

## 1-Fork the repository
## 2-Create your feature branch
git checkout -b feature/amazing-feature

## 3-Commit your changes
git commit -m "Add some amazing feature"

## 4-Push to the branch
git push origin feature/amazing-feature

## 5-Open a Pull Request


