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
              runShopping();
    });
};

function runShopping() {
        inquirer
            .prompt ({
                name: "item",
                type: "input",
                message: "Please enter the Item ID you would like to purchase:",
                

            })
            .then (function(answer){
                if 
                

            })

};

//     inquirer
//       .prompt({
//         name: "action",
//         type: "list",
//         message: "welcome to the Store, how can I help you today?",
//         choices: [
//           "Browse All Products",
//           "Browse Products by Department",
//           "Enter a 3-digit Item Id",
//           "Check Out",
//           "exit"
//         ]
//       })
//       .then(function(answer) {
//         switch (answer.action) {
//         case "Browse All Products":
//           browseProduct();
//           break;
  
//         case "Browse Products by Department":
//           browseDepartment();
//           break;
  
//         case "Enter a 3-digit Item Id":
//           enterItemId();
//           break;
  
//         case "Check Out":
//           checkOut();
//           break;
            
//         case "exit":
//           connection.end();
//           break;
//         }
//       });
//   };

//   function browseProduct() {
//     inquirer
//       .prompt({
//         name: "product",
//         type: "list",
//         message: "Please choose from our products",
//         choices: [
            

//         ]
//     })
//       .then(function(answer) {
//         var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?";
//         connection.query(query, { product: answer.product }, function(err, res) {
//           for (var i = 0; i < res.length; i++) {
//             console.log("Item Id: " + res[i].item_id + " || Product: " + res[i].product_name + " || Dept: " + res[i].department_name + " || Price: $" + res[i].price + "stock_quantity: "+ res[i].stock_quantitiy);
//           }
//           runShopping();
//         });
//       });
//   }

// function browseDepartment() {


// };

// function enterItemId() {


// };

// function checkOut() {


// };