// connecting inquirer package

const inquirer = require("inquirer");

// connecting mysql package

const mysql = require("mysql");

// declaring variables needed

let itemId;

let itemUnit;

let prize;




// connecting to bamazon database

const connection = mysql.createConnection({

  host: "localhost",

  // Your port; if not 3306

  port: 3306,

  // Your username

  user: "root",

  // Your password

  password: "leo464315",

  database: "bamazon"
});

connection.connect(function(err) {

  if (err) throw err;

  console.log("connected as id " + connection.threadId);

  // after connection to bamazon database, display products to customer

  displayProducts();
  
});




// function that displays available products with item id and prices to the customer

function displayProducts() {

    // selects every item in the database

    connection.query("SELECT * FROM products", function(err, res) {

        if (err) throw err;

        // loop through response array and display item ids, item names and prices        

        for (let i = 0;i < res.length; i++) {
            
          console.log(`
            ####################################################
            Item id: ${res[i].item_id}
            Item Name: ${res[i].product_name}
            item Department: ${res[i].department_name}
            Item Price: $${res[i].price}
            Item Quantity: ${res[i].stock_quantity}
            ####################################################`);
                       
           
        

         }

         // after displaying products to customers, use inquirer to ask them what they want

        getInquirer();
    });
}



// function that asks customers what they want to purchase and collects their reply

async function getInquirer() {

    await inquirer.prompt([
        {
            type:"input",
            message:`
            ####################################################                            
                                Hi Customer
            ____________________________________________________
            What's the item id of the item you want to purchase?
            ####################################################`,
            name: "id"
        },{
            type:"input",
            message:`
            ####################################################
            How many do you want to purchase?
            ####################################################`,
            name:"quantity"
          }
    ]).then(function(inquirerResponse) {

        // if customer typed item id and quantity they want, check if it's in stock

        if((inquirerResponse.id) && (inquirerResponse.quantity)) {

           itemId = inquirerResponse.id;

           itemUnit = inquirerResponse.quantity;

           // item id and quantity passed in as inputs to check if item is available
           
           availability(itemId,itemUnit);

        }
    })
}




// function that checks if the customer's item is in stock

function availability(itemId,itemUnit) {

    // using the item id, check if the item is available

    connection.query("SELECT * FROM products WHERE ?",
    {
        item_id: itemId
    }, 
    function(err, res) {

        if (err) throw err;

         // assign response to a variable "order"

         let order = res[0];
         
         // if item is available

        if (order.stock_quantity >= itemUnit) {

            // sell to customer and update stock
            
            prize = order.price;

            let newId = order.item_id;

            let oldStock = order.stock_quantity;

            let newStock = oldStock - itemUnit;

            // update stock with the new quantity after recent sales

            updateStock(newId,newStock);   
            
            // if item not in stock

        }else if(order.stock_quantity < itemUnit) {

            // inform the customer the item is out of stock

            console.log(`
            ####################################################
            Sorry, this item is not in stock at the moment.
            ####################################################`);

            connection.end();
        }
        

    });
    
    return prize, itemUnit;
}



// function that updates stock after each sale

function updateStock(newId,newStock) {

    connection.query(

        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newStock
          },
          {
            item_id: newId
          }
        ],
        function(err, res) {

          if (err) throw err;

            console.log(`
            ####################################################
                                 ITEM SOLD

                          UPDATING PRODUCT'S TABLE
            ____________________________________________________              
            product with item id ${newId} has been updated to 
            ${newStock} quantity in stock
            ####################################################`);

            // after stock is update, display customer's receipt          
          
            displayInvoice(prize,itemUnit);
  
            connection.end();
          }
  
          
      );
}




// function that displays customer's receipt

function displayInvoice(prize,itemUnit) {

    console.log(`
            ####################################################
                                  RECEIPT
            ____________________________________________________
            Thank you for your purchase. Here's your receipt

            Unit: ${itemUnit}
            price: ${prize}
            ________________
            Total: ${itemUnit * prize}
            ####################################################`)
}