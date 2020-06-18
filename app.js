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
    message: "What is the employee's github username?",
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

  async function managerPrompt() {
    try {
      const managerQuestions = questions.filter(function (question) {
        return question.category === "manager";
      });
      const response = await inquirer.prompt(managerQuestions);
      // console.log(managerQuestions);
      if (
        response.managerName === "" ||
        response.managerEmail === "" ||
        response.officeNumber === "" ||
        response.managerId === ""
      ) {
        throw new Error("Please enter a valid input");
      }
      const manager = new Manager(
        response.managerName,
        response.managerId,
        response.managerEmail,
        response.officeNumber
      );

      employees.push(manager);

      if (response.numberOfEngineers > 0) {
        await engineerPrompt(response.numberOfEngineers);
      }
      // console.log(response.numberOfEngineers);
      if (response.numberOfInterns > 0) {
        await internPrompt(response.numberOfInterns);
      }
      const html = render(employees);
      fs.writeFile(outputPath, html, function (err) {
        if (err) throw err;
      });
    } catch (err) {
      throw err;
    }
  }

  async function engineerPrompt(numberOfEngineers) {
    try {
      const engineerQuestions = questions.filter(function (question) {
        //need to include employee questions
        return (
          question.category === "employee" || question.category === "engineer"
        );
      });
      // console.log(engineerQuestions);
      for (let i = 0; i < numberOfEngineers; i++) {
        const response = await inquirer.prompt(engineerQuestions);
        if (
          response.name === "" ||
          response.id === "" ||
          response.email === "" ||
          response.github === ""
        ) {
          throw new Error("Please enter a valid input");
        }
        const engineer = new Engineer(
          response.name,
          response.id,
          response.email,
          response.github
        );
        employees.push(engineer);
      }
      console.log(employees);
    } catch (err) {
      throw err;
    }
  }

  async function internPrompt(numberOfInterns) {
    try {
      const internQuestions = questions.filter(function (question) {
        //need to include employee questions
        return (
          question.category === "intern" || question.category === "employee"
        );
      });
      // console.log(internQuestions);
      for (let i = 0; i < numberOfInterns; i++) {
        const response = await inquirer.prompt(internQuestions);
        if (
          response.name === "" ||
          response.id === "" ||
          response.email === "" ||
          response.school === ""
        ) {
          throw new Error("Please enter a valid input");
        }
        const intern = new Intern(
          response.name,
          response.id,
          response.email,
          response.school
        );
        employees.push(intern);
      }
    } catch (err) {
      throw err;
    }
  }
}

init();

//TODO
//get rid of commas on html, style html
