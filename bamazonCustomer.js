var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "yourRootPassword",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  runList();
});

function runList() {
    console.log("welcome to the Store, here are our products:");
    var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products";
            connection.query(query, function(err, res) {
              for (var i = 0; i < res.length; i++) {
                console.log("Item Id: " + res[i].item_id + " || Product: " + res[i].product_name + " || Dept: " + res[i].department_name + " || Price: $" + res[i].price + " || Stock: "+ res[i].stock_quantity);
              }
              runShopping(res);
    });
};

let myChosenItem;

function runShopping() {
  connection.query("SELECT * FROM products", function(err, results){
    if (err) throw err;
        inquirer
            .prompt ([
              {
                name: "item",
                type: "input",
                message: "Please enter the Item ID you would like to purchase:"
              }
          
          ])
            .then (function(answer){
              console.dir(answer);
              myChosenItem = answer.item;
              console.log(results[1].product_name);
              howMany(results);
            })
          });
            };      
    

   function howMany(results) {

    console.log("myChosenItem " + myChosenItem);
    var myItemNum = parseInt(myChosenItem);
    var myItemNum1 = myItemNum - 1;
    console.log("Item Id: " + results[myItemNum1].item_id + " || Product: " + results[myItemNum1].product_name + " || Dept: " + results[myItemNum1].department_name + " || Price: $" + results[myItemNum1].price + " || Stock: "+ results[myItemNum1].stock_quantity);
    connection.query("SELECT * FROM products", function(err, res){
          if (err) throw err;
              inquirer
                  .prompt ([
        {
          name: "amount",
          type: "input",
          message: "How many would you like?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        } ])


    .then (function(wantAmount){
      var quantity = parseInt(wantAmount.amount);
      var product = results[myItemNum1];
    console.log("Let's see if we have " + quantity + "...");
       

      if (quantity > product.stock_quantity ) {
        console.log ("\n Insufficient Quantity!");
      } else {

        makePurchase(product, quantity);

      };
    
  })
});
  }; 

function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      runList();
    }

  );
};
 



           
        

