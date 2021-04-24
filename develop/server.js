const inquirer = require("inquirer");
const mysql = require("mysql");
const express = require('express')
const sequelize = require('./config/connection');
const routes = require('./routes');
const table = require("console.table")
const promisemysql = require("promise-mysql");

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
        choices: ["View All Employees", "Add Employee", "Add Department", "View Departments", "Add Employee Role", "View Employee Roles", "Update Employee Roles/Information", "Update Departments", "Update Employees' Managers", "View Employees by Their Manager", "Delete Departments", "Delete Employee Roles", "Delete Employee", "View a Department's Budget", "Exit Application"],
    })
        .then((answer) => {
            if (answer.mainMenu === "Add Employee") {
                addEmployee();
            } else if (answer.mainMenu === "View All Employee") {
                viewEmployees();
            } else if (answer.mainMenu === "Add Department") {
                addDepartment();
            } else if (answer.mainMenu === "View Departments") {
                viewDepartments();
            } else if (answer.mainMenu === "Add Employee Role") {
                addRole();
            } else if (answer.mainMenu === "View Employee Roles") {
                viewRoles();
            } else if (answer.mainMenu === "Update Employee Roles/Information") {
                updateEmployee();
            }
        })
};

let rolesArr = [];
let managersArr = [];
let departmentArr = [];

const addEmployee = () => {

    promisemysql.createConnection(connectionProperties
    ).then((conn) => {

        // Quereies all roles and employees and returns as a mysql promise
        return Promise.all([
            conn.query('SELECT role_id, title FROM role ORDER BY title ASC'),
            conn.query("SELECT employee_id, concat(employee.first_name, ' ',  employee.last_name) AS employee FROM employee ORDER BY employee ASC")
        ]);
    }).then(([roles, managers]) => {

        // Places all roles into the rolesArr
        for (i = 0; i < roles.length; i++) {
            rolesArr.push(roles[i].title);
        }

        // Places all employees into the managersArr
        for (i = 0; i < managers.length; i++) {
            managersArr.push(managers[i].Employee);
        }

        return Promise.all([roles, managers]);
    }).then(([roles, managers]) => {

        // Adds an option for the employee to have no manager
        managersArr.unshift('--');

        inquirer.prompt([
            {
                name: "empFirstName",
                type: "input",
                message: "What is this employee's first name?",
                // Validates that the user did not leave this field blank
                validate: function (answer) {
                    if (answer === "") {
                        console.log("Employee must have a first name.");
                        return false;
                    }
                }
            },
            {
                name: "empLastName",
                type: "input",
                message: "What is this employee's last name?",
                // Validates that the user put in a last name for the employee
                validate: function (answer) {
                    if (answer === "") {
                        console.log("Employee must have a last name.");
                        return false;
                    }
                }
            },
            {
                name: "empRole",
                type: "list",
                message: "What is this employee's role?",
                choices: rolesArr
            }, {
                name: "empManager",
                type: "list",
                message: "Who is employee's manager?",
                choices: managersArr
            }]).then((answer) => {

                // Sets variable for the role_id
                let role_id;
                // Sets variable for the manager_id
                let manager_id = null;

                // Gets id of the selected role
                for (i = 0; i < roles.length; i++) {
                    if (answer.empRole == roles[i].title) {
                        role_id = roles[i].id;
                    }
                }

                // Gets id of the selected manager
                for (i = 0; i < managers.length; i++) {
                    if (answer.empManager == managers[i].Employee) {
                        manager_id = managers[i].id;
                    }
                }
                // Inserts the user's answers into the employee table
                connection.query(
                    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES ("${answer.firstName}", "${answer.lastName}", ${role_id}, ${manager_id})`, (err, res) => {
                    if (err) throw err;

                    // Confirms via the console that the new employe has been added
                    console.log(`\n ${answer.empFirstName} ${answer.empLastName} has been added to the company as a(n) ${answer.empRole}.\n `);
                    start();
                });
            });
    });
}


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
