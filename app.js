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
    role: "Employee",
  },
  {
    type: "input",
    name: "id",
    message: "What is the employee's ID?",
    role: "Employee",
  },
  {
    type: "input",
    name: "email",
    message: "What is the employee's email?",
    role: "Employee",
  },
  {
    type: "input",
    name: "github",
    message: "What is the employee's github username?",
    role: "Engineer",
  },
  {
    type: "input",
    name: "school",
    message: "What is the employee's school?",
    role: "Intern",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is your manager's office number?",
    role: "Manager",
  },
  {
    type: "input",
    name: "managerName",
    message: "What is your manager's name?",
    role: "Manager",
  },
  {
    type: "input",
    name: "managerId",
    message: "What is your manager's employee ID?",
    role: "Manager",
  },
  {
    type: "input",
    name: "managerEmail",
    message: "What is your manager's email?",
    role: "Manager",
  },
  {
    type: "input",
    name: "numberOfInterns",
    message: "How many interns do you have in your team?",
    role: "Manager",
  },
  {
    type: "input",
    name: "numberOfEngineers",
    message: "How many engineers do you have in your team?",
    role: "Manager",
  },
];

//Employess
const employees = [];
//Function that begins app
function init() {
  managerPrompt();

  async function managerPrompt() {
    try {
      //Filters questions with role "manager"
      const managerQuestions = questions.filter(function (question) {
        return question.role === "Manager";
      });
      //Prompts Managers Q's
      const response = await inquirer.prompt(managerQuestions);

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

      //Prompts Intern's Q's depends on the number of engineeers from user response
      if (response.numberOfInterns > 0) {
        console.log("Please enter Interns information");
        await internPrompt(response.numberOfInterns);
      }
      //Prompts Engineers Q's depends on the number of engineeers from user response
      if (response.numberOfEngineers > 0) {
        console.log("Please enter Engineers information");
        await engineerPrompt(response.numberOfEngineers);
      }
      //Renders the employees on to html based on the user's response
      const html = render(employees);
      fs.writeFile(outputPath, html, function (err) {
        if (err) throw err;
      });
    } catch (err) {
      throw err;
    }
  }

  async function internPrompt(numberOfInterns) {
    try {
      //Filters questions with role "employee" && "intern"
      const internQuestions = questions.filter(function (question) {
        return question.role === "Employee" || question.role === "Intern";
      });
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

  async function engineerPrompt(numberOfEngineers) {
    try {
      //Filters questions with role "employee" && "manager"
      const engineerQuestions = questions.filter(function (question) {
        return question.role === "Employee" || question.role === "Engineer";
      });
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
}

//Calls function init()
init();
