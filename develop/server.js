const inquirer = require("inquirer");
const mysql = require("mysql");
const express = require('express')
const sequelize = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// const connection = mysql.createConnection({
//     host: "localhost",
  
    
//     port: 3306,
  
    
//     user: "root",
  
    
//     password: "7b3A^@QXB",
//     database: "company_db",
// });

const start = () => {
    inquirer.prompt({
        type: "list",
        name: "mainMenu",
            message: "What would you like to do?",
            choices: ["Add Employee", "View All Employees", "View Departments", "Update Departments", "Update Employee Information", "Update Employees' Managers", "View Employees by Their Manager", "Delete Departments", "Delete Employee Roles", "Delete Employee", "View a Department's Budget" ],
    })
}


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
