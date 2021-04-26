const inquirer = require("inquirer");
const mysql = require("mysql");
const express = require('express')
const ctable = require("console.table")
const promisemysql = require("promise-mysql");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const connection = mysql.createConnection({
    host: "localhost",


    port: 3306,


    user: "root",


    password: "7b3A^@QXB",
    database: "company_db",
});

const mainMenu = () => {
    inquirer.prompt({
        type: "list",
        name: "mainMenu",
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employee", "Add Department", "View Departments", "Add Employee Role", "View Employee Roles", "Update Employee Role", "Update Departments", "Update Employees' Managers", "View Employees by Their Manager", "Delete Departments", "Delete Employee Roles", "Delete Employee", "View a Department's Budget", "Exit Application"],
    })
        .then((answer) => {
            if (answer.mainMenu === "Add Employee") {
                addEmployee();
            } else if (answer.mainMenu === "View All Employees") {
                viewEmployees();
            } else if (answer.mainMenu === "Add Department") {
                addDepartment();
            } else if (answer.mainMenu === "View Departments") {
                viewDepartments();
            } else if (answer.mainMenu === "Add Employee Role") {
                addRole();
            } else if (answer.mainMenu === "View Employee Roles") {
                viewRoles();
            } else if (answer.mainMenu === "Update Employee Role") {
                updateEmployeeRole();
            }
        })
};

const addEmployee = () => {
    connection.query(`SELECT id, title FROM role ORDER BY title ASC`,
    (err, res) => {
        if (err) {
            throw (err);
        } else {
            let empFirstName;
            let empLastName;
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
                        } else {
                            return true;
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
                        } else {
                            return true;
                        }
                    }
                },
            ]).then((answer) => {
                empFirstName = answer.empFirstName;
                empLastName = answer.empLastName;

                connection.query(`SELECT id, title FROM role`, (err, res) => {
                    if (err) {
                        throw (err);
                    } else {
                        let roleArr = [];
                        let roleMap = {};
                        let selectedRoleId;
                        let selectedRole;
                        for (i = 0; i < res.length; i++) {
                            let roleTitle = res[i].title;
                            roleArr.push(roleTitle);
                            roleMap[roleTitle] = res[i].id;
                        }
                        inquirer.prompt([
                            {
                                name: "empRole",
                                type: "list",
                                message: "What is this employee's role?",
                                choices: roleArr
                            },
                        ]).then((answer) => {
                            selectedRoleId = RoleMap[answer.empRole];
                            selectedRole = answer.empRole;

                            connection.query(`SELECT e.id, e.first_name, e.last_name 
                            FROM employee AS e`
                            , (err, res) => {
                                if (err) {
                                    throw (err);
                                } else {
                                    let managerArr = [];
                                    let managerMap = {};
                                    let selectedManagerId;
                                    let selectedManager;

                                    for (i = 0; i < res.length; i++) {
                                        let managerName = res[i].first_name + " " + res[i].last_name;
                                        managerArr.push(managerName);
                                        managerMap[managerName] = res[i].id;
                                    }
                                    inquirer.prompt([
                                        {
                                            name: "empManager",
                                            type: "list",
                                            message: "Who is employee's manager?",
                                            choices: managerArr
                                        }
                                    ]).then((answer) => {
                                        connection.query(
                                            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                            VALUES ("${empFirstName}", "${empLastName}", ${selectedRoleId}, ${managerMap[managerName]})`, (err, res) => {
                                                if (err) throw err;

                                                // Confirms via the console that the new employe has been added
                                                console.log(`\n ${empFirstName} ${empLastName} has been added to the company as a(n) ${answer.empRole}.\n `);
                                                mainMenu();
                                            })
                                    })
                                }
                            })
                        })
                    }
                })
            })
        }
    })
}

                        // Function to view all the employees of the company
                        const viewEmployees = () => {
                                connection.query(
                                    `SELECT e.id, e.first_name, e.last_name, r.title, r.salary,COALESCE( CONCAT(m.first_name, " ", m.last_name),'') AS manager FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON m.id = e.manager_id`, (err, res) => {
                                        if (err) {
                                            throw (err);
                                        } else {
                                            console.table(res);
                                            mainMenu();
                                        }
                                    })
                            };

                            const addDepartment = () => {
                                inquirer.prompt({
                                    name: "addDepartment",
                                    type: "input",
                                    message: "What is this department's name?",
                                    // Validates that the user did not leave this field blank
                                    validate: function (answer) {
                                        if (answer === "") {
                                            console.log("The department must have a name.");
                                            return false;
                                        } else {
                                            return true;
                                        }
                                    }
                                }).then((answer) => {
                                    connection.query(
                                        `INSERT INTO department (name)
            VALUES ("${answer.addDepartment}")`, (err, res) => {
                                        if (err) throw err;

                                        console.log(`\n ${answer.addDepartment} has been added to the company.\n `);
                                        mainMenu();
                                    });

                                })
                            };


                            const viewDepartments = () => {
                                connection.query(
                                    `SELECT d.id, d.name, e.first_name, e.last_name
     FROM department AS d
     LEFT JOIN role AS r ON d.id = r.department_id
    LEFT JOIN employee AS e on r.id = e.role_id`, (err, res) => {
                                    if (err) {
                                        throw (err);
                                    } else {
                                        console.table(res);
                                        mainMenu();
                                    }
                                })
                            };

                            const addRole = () => {
                                inquirer.prompt([
                                    {
                                        name: "roleTitle",
                                        type: "input",
                                        message: "What is this role's title?",
                                        // Validates that the user did not leave this field blank
                                        validate: function (answer) {
                                            if (answer === "") {
                                                console.log("Role must have a title.");
                                                return false;
                                            } else {
                                                return true;
                                            }
                                        }
                                    },
                                    {
                                        name: "roleSalary",
                                        type: "input",
                                        message: "What is this role's Salary?",
                                        // Validates that the user did not leave this field blank
                                        validate: function (answer) {
                                            if (isNaN(answer)) {
                                                console.log("Role must have a salary.");
                                                return false;
                                            } else {
                                                return true;
                                            }
                                        }
                                    },
                                    {
                                        name: "departmentID",
                                        type: "input",
                                        message: "What department is this role in?",
                                        // Validates that the user did not leave this field blank
                                        validate: function (answer) {
                                            if (answer === "") {
                                                console.log("Role must be in a department.");
                                                return false;
                                            } else {
                                                return true;
                                            }
                                        }
                                    }
                                ]).then((answer) => {
                                    connection.query(
                                        `INSERT INTO role (title, salary, department_id)
            SELECT "${answer.roleTitle}", "${answer.roleSalary}", id
            FROM department
            WHERE department.name = "${answer.departmentID}"`, (err, res) => {
                                        if (err) throw err;

                                        console.log(`\n ${answer.roleTitle} has been added to the company.\n `);
                                        mainMenu();
                                    });

                                })
                            };

                            const viewRoles = () => {
                                connection.query(
                                    `SELECT r.id, r.title, e.first_name, e.last_name
     FROM role AS r
     LEFT JOIN department AS d ON d.id = r.department_id
    LEFT JOIN employee AS e on r.id = e.role_id`, (err, res) => {
                                    if (err) {
                                        throw (err);
                                    } else {
                                        console.table(res);
                                        mainMenu();
                                    }
                                })
                            };

                            const updateEmployeeRole = () => {
                                connection.query(`SELECT e.id, e.first_name, e.last_name 
                        FROM employee AS e`
                                    , (err, res) => {
                                        if (err) {
                                            throw (err);
                                        } else {
                                            let empArr = [];
                                            let empMap = {};
                                            let selectedEmpId;
                                            let selectedEmp;
                                            for (i = 0; i < res.length; i++) {
                                                let empName = res[i].first_name + " " + res[i].last_name;
                                                empArr.push(empName);
                                                empMap[empName] = res[i].id;
                                            }
                                            inquirer.prompt([
                                                {
                                                    name: "empList",
                                                    type: "list",
                                                    message: "Which employee would you like to edit?",
                                                    choices: empArr
                                                }
                                            ]).then((answer) => {
                                                selectedEmpId = empMap[answer.empList];
                                                console.log(selectedEmpId);
                                                selectedEmp = answer.empList;

                                                connection.query(`SELECT title FROM role`, (err, res) => {
                                                    if (err) {
                                                        throw (err);
                                                    } else {
                                                        let roleArr = [];
                                                        let roleMap = {};

                                                        for (i = 0; i < res.length; i++) {
                                                            let roleTitle = res[i].title;
                                                            roleArr.push(roleTitle);
                                                            roleMap[roleTitle] = res[i].id;
                                                        }
                                                        inquirer.prompt([
                                                            {
                                                                name: "roleSelection",
                                                                type: "list",
                                                                message: "What would you like " + selectedEmp + "'s new role to be?",
                                                                choices: roleArr
                                                            }
                                                        ]).then((answer) => {
                                                            connection.query(`UPDATE employee SET role_id =(SELECT id FROM role WHERE title = "${answer.roleSelection}") WHERE id = ${selectedEmpId}`)
                                                            console.log(selectedEmp + ` is now a ${answer.roleSelection}`);
                                                            mainMenu();
                                                        })
                                                    }
                                                })

                                            })
                                        };
                                    });
                            };


                            const depBudget = () => {
                                connection.query(`SELECT `)
                            }



                            connection.connect((err) => {
                                if (err) throw err;
                                // run the start function after the connection is made to prompt the user
                                mainMenu();
                            });
