# employee-tracker

## Description
It is vital for a modern company to be able to keep track of their employees, payroll, and other human resource inofrmation in an eletronic database. The employee tracker application, using a MySQL database, allows a company to perform a number of employee related applications to add to their workforce or or remove from it in an efficient and timely manner.

## Demonstration
![gif](https://media.giphy.com/media/hJB0OvSeaJqxcnfST0/giphy.gif)
[Full Video Link](https://www.youtube.com/watch?v=Rfb1Mx68NNM)

## Usage
1. Use the command line to select any of the employee management features.
2. Each feature has a series of propmts that allow the user to edit the companies database.
3. At the end of each applucation feature the user is returned to the main menu.
4. Select any number of features as needed then exit the application through the main menu.

# Installation and Set Up
1. Clone the Github Repository 

```bash
git clone https://github.com/Gpphelps/employee-tracker
```

2. Using node.js perform a npm install of the necessary dependencies at the root level of the directory

```bash
npm i
```

3. Create the company_db in mysql using the exisiting companydb.sql file from the Github repositiory

4. (OPTIONAL) In the mysql workbench seed the company_db databse from the companySeeds.sql file from the Github repository

5. Run the server.js file in node.js to start the employee tracker application, If step 4 was not followed it is necessary to manually create departments, employees, and roles for the application to be fully functional

```bash
node server.js
```

## Features
This application features the use of the command line to perfrom essential employee maintance functions. the application makes use of node.js, mysql, inquirer, and console.table. 

## Contributing
If you would like to contribute in any way to this project please feel free to post an issue to the Github repository and I will address it as soon as possible.

## Licence
MIT

## Repository 
https://github.com/Gpphelps/employee-tracker
