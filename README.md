# bamazonApp



## Introduction

bamazon is a sales app that helps customers search for variety of products, place there orders and complete transactions. It also helps store managers to keep track of products especially when they running low. This app combines both node and mysql to make user's experience friendly and stress-free.


## Organization

This app has a good file management and organization, all the files directly associated with the two javascript files `bamazonCustomer.js` and `bamazonManager.js`, are placed in same folder except the screenshot images arranged in images folder. `bamazonCustomer.js` is the file that solves all the customers' needs while `bamazonManager.js` helps store managers to keep track on stock.
Within the javascript files, codes are well spaced out and where necessary are nested into functions to aid readability. They are also well commented for easy understanding




## How bamazonApp works

This app can do series of things for both customers and store managers. 

### Customers

The file for customers' app is `bamazonCustomer.js`. It's designed to display all products to customers on start up. Customers are prompted to choose which item they want to purchase using item id and how many (quantity) of the item they want.

[screenshot: display products to customer](images/showproducts.png)

When customer chooses an item to purchase and quantity of the item they want, the app checks for availability, sells the item to the customer, prints customer's receipt and updates stock.
However, if the items are not available, the app notifies the user.

[screenshot: ask customer what they want to purchase](images/askcustomer.png)

[screenshot: sell to customer, print receipt and update stock](images/sellproduct.png)



### Store Managers

The file for managers' app is `bamazonManager.js` and it can help managers accomplish 4 tasks. When this app loads, it asks the manager which of the 4 features he wants to use. The features are:

[screenshot: prompt manager](images/promptmanager.png)


* View Products for Sale

When the manager selects this option, all product with their item id, name, price and quantity in stock, are displayed to the manager

[screenshot: display products to manager](images/viewproducts.png)


* View Low Inventory

When this option is selected, all products that are less than 5 in stock are displayed to the manager. This feature helps managers to know which products need to be restocked.
However, if no product is low, the app informs the manager.

[screenshot: display low inventory to manager](images/lowinventory.png)


* Add to Inventory

This feature allows managers to add to any product low in stock. it asks the manager what item he wants to add to and what quantity of the item he's adding to stock. Once manager adds to inventory, the app updates stock.

[screenshot: add inventory](images/addinventory.png)


* Add New Product

This is used by managers to add new products that are not originally in the product's table. it asks the manager series of questions including name of the item, what department the item falls under, price and quantity in stock. All these information are used to update the product's table once the new item is added.

[screenshot: add new product](images/addproduct.png)

new item "desk" was added successfully to the product table

[screenshot: Item id 15 Desk added to product's table](images/deskadded.png)



## Link to github repository

[github repository](https://github.com/Leostino/bamazon)



## Technologies

1. Mysql node package to retrieve and send information to mysql database.

2. Inquirer node package to get information from customers and managers.

3. Javascript to link all the packages and features together (javascript's require()).

4. Git and Github to save and track different versions of the app [github repository](https://github.com/Leostino/bamazon)



## Role

I developed this app.