# 🛍️ Ecommerce Frontend

This is the frontend for a full-stack eCommerce web application built using **React**, **TypeScript**, and **Tailwind CSS**, connected to a **Spring Boot (JWT-based)** backend.

## 🚀 Features

- 🔐 JWT Authentication (Admin, Seller, User)
- 🧑 Admin Dashboard:
  - Manage users (toggle roles/status)
  - View orders, products, stats
- 🛒 Seller Portal:
  - Add/Edit/Delete Products
  - Manage Orders and Shipments
- 🛍️ User Features:
  - Browse Products
  - Add to Cart & Checkout
  - View Order History

## 📦 Tech Stack

| Frontend    | Backend              |
|-------------|----------------------|
| React       | Spring Boot          |
| TypeScript  | Spring Security (JWT)|
| TailwindCSS | Hibernate / JPA      |
| Axios       | MySQL/PostgreSQL     |
| React Router| Role-based Access    |

## 🖥️ Project Structure


## 🔧 Setup Instructions

### 1. Clone this repository

```bash
git clone https://github.com/Sufi111729/ecommerce-frontend.git
cd ecommerce-frontend
npm install
npm run dev
📡 Backend API Reference
Ensure your Spring Boot app exposes:

POST /api/auth/signin → Login

POST /api/auth/signup → Register

GET /api/seller/products → Seller products

POST /api/seller/products → Create product

PUT /api/seller/products/{id} → Update product

DELETE /api/seller/products/{id} → Delete product

And more...

✨ Screenshots
Coming soon: Add screenshots of your Seller Dashboard, Product Form, and Order Table.

👨‍💻 Author
Sufi — GitHub

📃 License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

Let me know if:
- You want to include screenshots or deployment links
- You want a separate `README.md` for the **backend** too!
