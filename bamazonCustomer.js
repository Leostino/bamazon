const inquirer = require("inquirer");

const mysql = require("mysql");

let itemId;

let itemUnit;

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
            What's the number of the item you want to purchase?
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

         // console.log(order.item_id);


        if (order.stock_quantity >= itemUnit) {
            console.log("Thank you");
            let oldStock = order.stock_quantity;
            let newStock = oldStock - itemUnit;
            updateStock(newStock);
            displayInvoice();

        }else if(order.stock_quantity < itemUnit) {
            console.log(`
            ####################################################
            Sorry We don't have it in stock at the moment
            ####################################################`);
            connection.end();
        }
        

    });
}


function updateStock(newStock) {
    
}