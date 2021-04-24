USE company_db

----- Department Seeds -----

INSERT INTO department (department_id, name)
VALUES (1, "Finance");

INSERT INTO department (department_id, name)
VALUES (2, "Security");

INSERT INTO department (department_id, name)
VALUES (3, "Engineering");

INSERT INTO department (department_id, name)
VALUES (4, "Human Resources");

INSERT INTO department (department_id, name)
VALUES (5, "Sales");

INSERT INTO department (department_id, name)
VALUES (6, "Development Operations");

----- Role Seeds -----

INSERT INTO role (role_id, title, salary, department_id)
VALUES (1, "Software Developer", 85000, 3);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (2, "Software Project Manager", 100000, 3);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (3, "Sales Person", 45000, 5);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (4, "Sales Manager", 65000, 5);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (5, "Financial Advisor", 65000, 1);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (6, "HR Generalist", 60000, 4);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (7, "HR Director", 90000, 4);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (8, "Dev Ops Coordinator", 81000, 6);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (9, "Dev Ops Lead", 100000, 6);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (10, "Security Guard", 55000, 2);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (11, "Head of Security", 76000, 2);

----- Employees Seeds -----

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (1, "Alex", "Bell", 9, null);

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (2, "Keri", "Grant", 7, null);

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (3, "Kung", "Liao", 11, null);

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (4, "Michael", "Scott", 4, null);

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (5, "Douglas", "Fargo", 2, null);

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (6, "Jordan", "Belfort", 5, null);

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (7, "Henry", "Deacon", 8, 1);

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (8, "Toby", "Flenderson", 6, 2);

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (9, "Jack", "Carter", 10, 3);

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (10, "Dwight", "Schrute", 3, 4);

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (11, "Richard", "Hendricks", 1, 5);
