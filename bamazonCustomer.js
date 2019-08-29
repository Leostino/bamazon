const inquirer = require("inquirer");

const mysql = require("mysql");

let itemId;

let itemUnit;

let prize;

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
  displayProducts();
  
});

function displayProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        

        for (let i = 0;i < res.length; i++) {
            
          console.log(`
            ####################################################
                Item id: ${res[i].item_id}
                Item Name: ${res[i].product_name}
                Item Price: $${res[i].price}
            ####################################################`);
                       
           
        

         }
        getInquirer();
    });
}

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

        if((inquirerResponse.id) && (inquirerResponse.quantity)) {

           itemId = inquirerResponse.id;

           itemUnit = inquirerResponse.quantity;
           
           availability(itemId,itemUnit);

        }
    })
}


function availability(itemId,itemUnit) {

    connection.query("SELECT * FROM products WHERE ?",
    {
        item_id: itemId
    }, 
    function(err, res) {
        if (err) throw err;

         let order = res[0];

         


        if (order.stock_quantity >= itemUnit) {
            
            prize = order.price;
            let newId = order.item_id;
            let oldStock = order.stock_quantity;
            let newStock = oldStock - itemUnit;
            updateStock(newId,newStock);
            


        }else if(order.stock_quantity < itemUnit) {
            console.log(`
            ####################################################
            Sorry We don't have it in stock at the moment
            ####################################################`);
            connection.end();
        }
        

    });
    return prize, itemUnit;
}


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
                          UPDATING PRODUCT'S TABLE
            ____________________________________________________              
            product with item id ${newId} has been updated to 
            ${newStock} quantity in stock
            ####################################################`);
          
          
            displayInvoice(prize,itemUnit);
  
            connection.end();
          }
  
          
      );
}

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