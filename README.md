# Employee Database

## Description

The Employee Database is a command-line interface (CLI) application that allows users to manage a company's employee data. Built with **Node.js**, **Inquirer**, and **PostgreSQL**, this application provides functionality to view, add, and manage employees, roles, and departments efficiently.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

1. **Clone the Repository**
   ```bash
   git clone <your-repository-link>
   cd employee-cms
   ```

2. **Install Dependencies**  
   Run the following command to install all required packages:
   ```bash
   npm install
   ```

3. **Set Up PostgreSQL**
   - Start your PostgreSQL server.
   - Create the database:
     ```sql
     CREATE DATABASE employee_db;
     ```

   - Set up the database tables:
     ```sql
     CREATE TABLE departments (
         id SERIAL PRIMARY KEY,
         name VARCHAR(50) NOT NULL
     );

     CREATE TABLE roles (
         id SERIAL PRIMARY KEY,
         title VARCHAR(50) NOT NULL,
         salary DECIMAL NOT NULL,
         department_id INT REFERENCES departments(id)
     );

     CREATE TABLE employees (
         id SERIAL PRIMARY KEY,
         first_name VARCHAR(50) NOT NULL,
         last_name VARCHAR(50) NOT NULL,
         role_id INT REFERENCES roles(id),
         manager_id INT REFERENCES employees(id)
     );
     ```

4. **Create a `.env` File**  
   Add your PostgreSQL credentials in a `.env` file:
   ```plaintext
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=employee_db
   ```

---

## Usage

1. Run the application:
   ```bash
   node index.js
   ```

2. Use the interactive menu to:
   - View all employees.
   - Add a new employee.
   - View roles and departments.
   - Add roles and departments.

---

## Features

- **View All Employees:** Displays employee details including role, department, salary, and manager.
- **Add Employees:** Allows the addition of new employees with role and manager assignment.
- **View Roles and Departments:** Lists all roles with salaries and their respective departments.
- **Add Roles and Departments:** Enables adding new roles and departments dynamically.

---

## Technologies Used

- **Node.js**: Runtime environment for building server-side applications.
- **Inquirer.js**: CLI interaction for user input.
- **PostgreSQL**: Relational database for managing employee data.
- **dotenv**: Environment variable management.

---

## Database Schema

The database contains the following tables:

- **Departments**
  - `id`: Primary Key
  - `name`: Department name

- **Roles**
  - `id`: Primary Key
  - `title`: Job title
  - `salary`: Role salary
  - `department_id`: Foreign Key to `departments`

- **Employees**
  - `id`: Primary Key
  - `first_name`: Employee's first name
  - `last_name`: Employee's last name
  - `role_id`: Foreign Key to `roles`
  - `manager_id`: Self-referencing Foreign Key for manager relationship

---

## Screenshots

(Include a screenshot of the CLI interface here once the project is running.)

---

## Contributing

If you'd like to contribute to this project:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License.
