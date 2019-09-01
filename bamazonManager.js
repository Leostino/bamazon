// connecting inquirer package

const inquirer = require("inquirer");

// connecting mysql package

const mysql = require("mysql");

// declaring variables needed

let itemId;

let itemUnit;

let newStock = 0;


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
  
    // after connection to bamazon database, display options to manager
  
    displayOptions();
    
});



// function to ask manager what he wants to do

async function displayOptions() {

    await inquirer.prompt([
        {
            type:"list",
            message:"Good day Manager, What do you want to do?",
            choices:["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"],
            name: "item"
        }
    ]).then(function(inquirerResponse) {

        // if manager replies, call a function that does what he requested

       if(inquirerResponse.item) {

          let task = inquirerResponse.item;
       
            if(task === "View Products for Sale") {

               displayProducts();

            }else if(task === "View Low Inventory") {

               lowInventory();

            }else if(task === "Add to Inventory") {

               addInventory();

            }else if(task === "Add New Product") {

               newProduct();

            }
        }
    })

}




// function that displays all products to the manager

function displayProducts() {

    // selects every item in the database

    connection.query("SELECT * FROM products", function(err, res) {

        if (err) throw err;

        // loop through response array and display details of the item       

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

        connection.end();

    });

}




// function that checks if any item is low in quantity

function lowInventory() {

    // selects every item in the database

    connection.query("SELECT * FROM products", function(err, res) {

        if (err) throw err;

        // loop through response array and display details of any item less than 5 in stock        

        for (let i = 0;i < res.length; i++) {

            stock = res[i].stock_quantity;

            if(stock < 5) {
                       
             console.log(`
             ##################################################
             Item id: ${res[i].item_id}
             Item Name: ${res[i].product_name}
             item Department: ${res[i].department}
             Item Price: $${res[i].price}
             Item Quantity: ${res[i].stock_quantity}
             ##################################################`);

             connection,end();            
            }                         

        }

            console.log(`
            ###################################################
            We dont have any low inventory at the moment
            check later
            ###################################################`)

        connection.end();

    });

}


// function to add inventory to any item already in stock

async function addInventory() {

    await inquirer.prompt([
        {
            type:"input",
            message:`
            ####################################################                            
                                Hey Manager
            ____________________________________________________
            What's the item id of the item you want to add?
            ####################################################`,
            name: "id"
        },{
            type:"input",
            message:`
            ####################################################
            How many do you want to add?
            ####################################################`,
            name:"quantity"
          }
    ]).then(function(inquirerResponse) {

        // if manager typed item id and quantity to add to item, update stock 

        if((inquirerResponse.id) && (inquirerResponse.quantity)) {

           itemId = inquirerResponse.id;

           itemUnit = parseInt(inquirerResponse.quantity);

           // item id and quantity passed in as inputs to check if item is available
           
           itemSelect(itemId,itemUnit);

        }
    })
}



// function that selects item to add to

function itemSelect(itemId,itemUnit) {

    // if item ids match, add to stock

    connection.query("SELECT * FROM products WHERE ?",
    {
        item_id: itemId
    }, 
    function(err, res) {

        if (err) throw err;       
                 
        newStock = res[0].stock_quantity + itemUnit;


        // update stock with the new quantity

        updateStock(itemId,newStock);   
            
            


    });

}




// function that updates stock after adding inventory

function updateStock(itemId,newStock) {

    connection.query(

        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newStock
          },
          {
            item_id: itemId
          }
        ],
        function(err, res) {

          if (err) throw err;

            console.log(`
            ####################################################
                          UPDATING PRODUCT'S TABLE
            ____________________________________________________              
            product with item id ${itemId} has been updated to 
            ${newStock} quantity in stock
            ####################################################`);              
                     
  
            connection.end();
        }
  
          
    );
}


// function that gets details of the new product from the manager

async function newProduct() {

    await inquirer.prompt([
        {
            type:"input",
            message:`
            ####################################################                            
                                Hey Manager
            ____________________________________________________
            What's the name of the new item you want to add?
            ####################################################`,
            name: "name"
        },{
            type:"input",
            message:`
            ####################################################
            Which department does the new item belong?
            ####################################################`,
            name:"department"
        },{
            type:"input",
            message:`
            ####################################################
            What is the price of the new item?
            ####################################################`,
            name:"prize"
        },{
            type:"input",
            message:`
            ####################################################
            How many of the new item are you adding today?
            ####################################################`,
            name:"quantity"
        }
    ]).then(function(inquirerResponse) {

        // variables to hold the response        

        let newItem = inquirerResponse.name;

        let newDepartment = inquirerResponse.department;

        let newPrize = inquirerResponse.prize;

        let newQuantity = parseInt(inquirerResponse.quantity);

        // call the function that adds the new product
           
        addProduct(newItem,newDepartment,newPrize,newQuantity);

        
    })
}



// function that adds the new product

function addProduct(newItem,newDepartment,newPrize,newQuantity) {

    connection.query(

        "INSERT INTO products SET ?",
        [
          {
            product_name: newItem,
            department_name: newDepartment,
            price: newPrize,
            stock_quantity: newQuantity
          }
        ],
        function(err, res) {
          if (err) throw err;            
            
            console.log(`
            ####################################################
                          UPDATING PRODUCT'S TABLE
            ____________________________________________________              
            ${newItem} has been added to the products table
            ####################################################`);

            connection.end();
            
        }
    );
}