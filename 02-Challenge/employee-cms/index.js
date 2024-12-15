const inquirer = require('inquirer');
const db = require('./db');

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'Add Employee',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'View All Employees':
      viewAllEmployees();
      break;
    case 'Add Employee':
      addEmployee();
      break;
    case 'View All Roles':
      viewAllRoles();
      break;
    case 'Add Role':
      addRole();
      break;
    case 'View All Departments':
      viewAllDepartments();
      break;
    case 'Add Department':
      addDepartment();
      break;
    default:
      console.log('Goodbye!');
      process.exit();
  }
};

const viewAllEmployees = async () => {
  try {
    const result = await db.query(`
      SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary,
             CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employees e
      LEFT JOIN roles r ON e.role_id = r.id
      LEFT JOIN departments d ON r.department_id = d.id
      LEFT JOIN employees m ON e.manager_id = m.id;
    `);
    console.table(result.rows);
  } catch (err) {
    console.error('Error fetching employees:', err.message);
  } finally {
    mainMenu();
  }
};

const addEmployee = async () => {
  try {
    const roles = await db.query('SELECT * FROM roles;');
    const managers = await db.query('SELECT * FROM employees;');

    const answers = await inquirer.prompt([
      { name: 'first_name', message: 'Enter employee first name:' },
      { name: 'last_name', message: 'Enter employee last name:' },
      {
        type: 'list',
        name: 'role_id',
        message: "Select employee's role:",
        choices: roles.rows.map(role => ({ name: role.title, value: role.id })),
      },
      {
        type: 'list',
        name: 'manager_id',
        message: "Select employee's manager:",
        choices: [
          { name: 'None', value: null },
          ...managers.rows.map(emp => ({
            name: `${emp.first_name} ${emp.last_name}`,
            value: emp.id,
          })),
        ],
      },
    ]);

    await db.query(
      'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
      [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]
    );

    console.log('Employee added successfully!');
  } catch (err) {
    console.error('Error adding employee:', err.message);
  } finally {
    mainMenu();
  }
};

const viewAllRoles = async () => {
  try {
    const result = await db.query(`
      SELECT roles.id, roles.title, departments.name AS department, roles.salary
      FROM roles
      JOIN departments ON roles.department_id = departments.id;
    `);
    console.table(result.rows);
  } catch (err) {
    console.error('Error fetching roles:', err.message);
  } finally {
    mainMenu();
  }
};

const addRole = async () => {
    try {
      // Fetch the departments for user selection
      const departments = await db.query('SELECT * FROM departments;');
  
      const role = await inquirer.prompt([
        { name: 'title', message: 'Enter the role title:' },
        { name: 'salary', message: 'Enter the role salary:' },
        {
          type: 'list',
          name: 'department_id',
          message: 'Select the department for this role:',
          choices: departments.rows.map((dept) => ({
            name: dept.name,
            value: dept.id,
          })),
        },
      ]);
  
      // Insert the new role into the database
      await db.query(
        'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)',
        [role.title, role.salary, role.department_id]
      );
  
      console.log('Role added successfully!');
    } catch (err) {
      console.error('Error adding role:', err.message);
    } finally {
      mainMenu(); // Return to the main menu
    }
  };
  

const viewAllDepartments = async () => {
  try {
    const result = await db.query('SELECT * FROM departments;');
    console.table(result.rows);
  } catch (err) {
    console.error('Error fetching departments:', err.message);
  } finally {
    mainMenu();
  }
};

const addDepartment = async () => {
  try {
    const { name } = await inquirer.prompt([
      { name: 'name', message: 'Enter the name of the department:' },
    ]);

    await db.query('INSERT INTO departments (name) VALUES ($1)', [name]);
    console.log('Department added successfully!');
  } catch (err) {
    console.error('Error adding department:', err.message);
  } finally {
    mainMenu();
  }
};

mainMenu();
