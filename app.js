const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Questions
const questions = [
  {
    type: "input",
    name: "name",
    message: "What is the employee's name?",
    category: "employee",
  },
  {
    type: "input",
    name: "id",
    message: "What is the employee's ID?",
    category: "employee",
  },
  {
    type: "input",
    name: "email",
    message: "What is the employee's email?",
    category: "employee",
  },
  {
    type: "input",
    name: "github",
    message: "What is the employee's github url?",
    category: "engineer",
  },
  {
    type: "input",
    name: "school",
    message: "What is the employee's school?",
    category: "intern",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is your office number?",
    category: "manager",
  },
  {
    type: "input",
    name: "managerName",
    message: "What is your name?",
    category: "manager",
  },
  {
    type: "input",
    name: "managerId",
    message: "What is your employee ID?",
    category: "manager",
  },
  {
    type: "input",
    name: "managerEmail",
    message: "What is your email?",
    category: "manager",
  },
  {
    type: "input",
    name: "numberOfInterns",
    message: "How many interns do you have in your team?",
    category: "manager",
  },
  {
    type: "input",
    name: "numberOfEngineers",
    message: "How many engineers do you have in your team?",
    category: "manager",
  },
];

//Employess
const employees = [];

function init() {
  managerPrompt();
}

async function managerPrompt() {
  const managerQuestions = questions.filter(function (question) {
    return question.category === "manager";
  });
  const response = await inquirer.prompt(managerQuestions);
  // console.log(managerQuestions);
  if (
    response.managerName === "" ||
    response.managerEmail === "" ||
    response.managerOfficeNumber === "" ||
    response.managerId === ""
  ) {
    throw new Error("Please enter a valid input");
  }
  const manager = new Manager(
    response.managerName,
    response.managerId,
    response.managerEmail,
    response.managerOfficeNumber
  );

  employees.push(manager);
  const html = render(employees);
  fs.writeFile(outputPath, html, function (err) {
    if (err) throw err;
  });
}

async function 
init();
