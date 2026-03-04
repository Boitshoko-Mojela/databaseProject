-- Database Schema: Order Management System
-- Normalized to 3rd Normal Form (3NF)

-- 1. Customers Table
CREATE TABLE customer (
    Customer_ID INT PRIMARY KEY AUTO_INCREMENT,
    Cus_Name VARCHAR(50) NOT NULL,
    Cus_Email VARCHAR(100) UNIQUE NOT NULL
);

-- 2. Products Table
CREATE TABLE product (
    Product_ID INT PRIMARY KEY AUTO_INCREMENT,
    Product_Name VARCHAR(100) NOT NULL,
    Product_Cost DECIMAL(10, 2) NOT NULL,
    Product_Picture LONGBLOB
);

-- 3. Orders Table (Header)
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    order_date DATE DEFAULT (CURRENT_DATE),
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customer(Customer_ID)
);

-- 4. Order Details Table (Line Items)
-- Note: A Composite Primary Key (order_id, product_id) is best here
-- to allow multiple products per order.
CREATE TABLE order_details (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL DEFAULT 1,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES product(Product_ID)
);