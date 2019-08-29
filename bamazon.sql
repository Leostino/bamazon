DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Guitar","Music",99.99,80);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("PS4","Electronics",350,160);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Crip","Baby",134.42,200);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Printer","Office",105.50,55);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Mattress","Home",150,100);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Television","Electronic",200,125);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Treadmill","Fitness",207.99,80);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Microwave","Kitchen Appliances",69.99,172);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Piano","Music",80,40);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("computer","Electronics",550,65);