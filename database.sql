Drop database Products;
-- Create a Database 
CREATE DATABASE IF NOT EXISTS Products;

-- Use DB Products
use Products;

-- Create a table

Create table if not exists Products(
	uid VARCHAR(36) PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    product_name VARCHAR(150) NULL,
    quantity INT(2) NOT NULL,
    price DOUBLE NOT NULL,
    category_name VARCHAR(100) ,
    CONSTRAINT fk_category FOREIGN KEY (category_name) REFERENCES categories(name) ON DELETE CASCADE
); 

desc Products;

-- Populate Data
INSERT INTO Products (uid, brand, product_name, quantity, price, category_name) VALUES
('111e4567-e89b-12d3-a456-426614174001', 'Apple', 'iPhone 15 Pro Max', 10, 1499.99, 'Electronics'),
('222e4567-e89b-12d3-a456-426614174002', 'Samsung', 'Galaxy S24 Ultra', 15, 1399.50, 'Electronics'),
('333e4567-e89b-12d3-a456-426614174003', 'Sony', 'WH-1000XM5 Headphones', 25, 399.00, 'Electronics'),
('444e4567-e89b-12d3-a456-426614174004', 'Dell', 'XPS 15 Laptop', 8, 1999.99, 'Electronics'),
('555e4567-e89b-12d3-a456-426614174005', 'Nike', 'Air Jordan 1 Sneakers', 30, 199.99, 'Clothing'),
('666e4567-e89b-12d3-a456-426614174006', 'Adidas', 'Ultraboost 22 Running Shoes', 20, 179.50, 'Clothing'),
('777e4567-e89b-12d3-a456-426614174007', 'LG', '55-inch OLED TV', 12, 1299.99, 'Electronics'),
('888e4567-e89b-12d3-a456-426614174008', 'Nestle', 'KitKat Chocolate Pack', 100, 1.50, 'Food & Drinks'),
('999e4567-e89b-12d3-a456-426614174009', 'Pepsi', 'Pepsi 500ml Bottle', 200, 0.99, 'Food & Drinks'),
('aaaee567-e89b-12d3-a456-426614174010', 'Colgate', 'Toothpaste 150g', 50, 2.75, 'Food & Drinks');

select * from Products;

CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    description VARCHAR(255)
);

INSERT INTO categories (id, name, description) VALUES 
('c111e4567-e89b-12d3-a456', 'Electronics', 'Phones, laptops, TVs, and gadgets'),
('c333e4567-e89b-12d3-a456', 'Food & Drinks', 'Snacks, beverages, and packaged food'),
('c444e4567-e89b-12d3-a456', 'Clothing', 'Shirts, jeans, jackets, and dresses'),
('c555e4567-e89b-12d3-a456', 'Furniture', 'Tables, chairs, sofas, and beds');
