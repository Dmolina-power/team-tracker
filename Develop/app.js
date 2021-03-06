const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamMembers = [];
function initialPrompt() {
  inquirer
    .prompt([
      {
        name: "profession",
        type: "list",
        message: "What is the team member's RANK that you would like to ADD?",
        choices: ["manager", "engineer", "intern", "Exit application"],
      },
    ])
    .then(function (response) {
      switch (response.profession) {
        case "manager":
          addManager();
          break;
        case "engineer":
          addEngineer();
          break;
        case "intern":
          addIntern();
          break;
        default:
          exitApplication();
      }
    });
}

initialPrompt();

function addManager() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Enter managers name",
      },
      {
        name: "id",
        type: "input",
        message: "Enter managers ID",
      },
      {
        name: "email",
        type: "input",
        message: "Enter managers email",
      },
      {
        name: "officeId",
        type: "input",
        message: "Enter managers office number",
      },
    ])
    .then(function (res) {
      var manager = new Manager(res.name, res.id, res.email, res.officeId);
      teamMembers.push(manager);
      console.log(res);
      initialPrompt();
    });
}
function addEngineer() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Enter engineers name",
      },
      {
        name: "id",
        type: "input",
        message: "Enter engineers ID",
      },
      {
        name: "email",
        type: "input",
        message: "Enter engineers email",
      },
      {
        name: "githubName",
        type: "input",
        message: "Enter engineers GitHub name",
      },
    ])
    .then(function (res) {
      var engineer = new Engineer(res.name, res.id, res.email, res.githubName);
      teamMembers.push(engineer);
      console.log(res);
      initialPrompt();
    });
}
function addIntern() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Enter interns name",
      },
      {
        name: "id",
        type: "input",
        message: "Enter interns ID",
      },
      {
        name: "email",
        type: "input",
        message: "Enter interns email",
      },
      {
        name: "schoolName",
        type: "input",
        message: "Which bootcamp does intern attend?",
      },
    ])
    .then(function (res) {
      var intern = new Intern(res.name, res.id, res.email, res.schoolName);
      teamMembers.push(intern);
      console.log(res);
      initialPrompt();
    });
}
function exitApplication() {
  var page = render(teamMembers);
  fs.writeFile(outputPath, page, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Success!");
  });
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questio ns via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
