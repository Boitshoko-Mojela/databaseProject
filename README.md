# Online Store Order Management System

A full-stack **Express.js** application designed to manage customers, products, and orders using a strictly normalized **SQL** database.

## 🚀 Project Overview
This project demonstrates the transition from **Requirement Engineering** to a functional **RESTful API**. It serves as a proof-of-concept for an online store's backend, focusing on data integrity, logical relationships, and efficient querying.

## 🏗️ Database Architecture
The core of this project is a relational database designed according to **3rd Normal Form (3NF)** principles to eliminate data redundancy and ensure referential integrity.



### Key Entities:
* **Customers:** Stores unique user identities and contact information.
* **Products:** Manages inventory items, including name, cost, and image data (LONGBLOB).
* **Orders:** A header table linking customers to specific transaction dates.
* **Order Details:** A bridge table utilizing a **Composite Primary Key** (`order_id`, `product_id`) to support multiple items per transaction while maintaining normalization.

## 🛠️ Tech Stack
* **Backend:** Node.js & Express.js
* **Database:** SQL (Relational Modeling)
* **Development Environment:** WebStorm IDE
* **Version Control:** Git & GitHub

## 🔧 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Boitshoko-Mojela/databaseProject.git](https://github.com/Boitshoko-Mojela/databaseProject.git)
