#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from 'chalk-animation';
import users from "./users.js"
var balance = 100000
async function atm() {
    let ans1 = await inquirer.prompt([
      {
        name: "user_name",
        type: "input",
        message: "Please Enter Your Name:",
      }
    ]);
    let userExist = users.findIndex((obj) => obj.name == ans1.user_name);
        if (userExist == -1) {
            console.log("Sorry!! User doest not exist")
        }
        else{
            startAgain()
        }
    }

async function askQuestions() {
     var ans = await inquirer.prompt([
        {
            type: "password",
            name: "PIN",
            message: "Please enter your PIN: "

        },
        {

            type: "list",
            name: "accountType",
            choices: ["Current", "Savings"],
            message: "Select your account type: ",
        },
        {
            type: "list",
            name: "operations",
            choices: ["Fast Cash", "Enter amount", "Balance check"],
            message: "Select operation: ",
            when(ans) {
                return ans.accountType
            }
        },
        {
            type: "list",
            name: "fast_c",
            choices: [1000, 2000, 5000, 10000, 25000],
            message: "Select amount: ",
            when(ans) {
                return ans.operations == "Fast Cash"
            }
        },
        {
            type: "number",
            name: "amount",
            message: "Enter the amount you want to withdraw: ",
            when(ans) {
                return ans.operations == "Enter amount"
            },
        },
        {
            type: "input",
            name: "bal",
            message: "Type yes if you want to check your balance ",
            when(ans) {
                return ans.operations == "Balance check"
            }
        }
    ]).then((check) => {
        if (check.amount > balance) {
            console.log("The amount you entered is greater than your balance")
        }
        else if (check.fast_c) {
            balance = balance - check.fast_c;
            console.log("Here is your ", check.fast_c)
            console.log("Your remaining balance is ", balance)
        }
        else if (check.amount) {
            balance = balance - check.amount;
            console.log("Here you go. Here is your ", check.amount)
            console.log("Remaining balance is ", balance)
        }
        else if (check.bal) {
            console.log("Your total balance is :", balance)
        }
    }
    )
}




async function startAgain() {
    do {
        await askQuestions();
         var again = await inquirer
            .prompt({
                type: "input",
                name: "doAgain",
                message: chalk.blueBright("Do you want to perform another transaction? Type 'y' for yes and 'n' for No ")
            })
    } 

while (again.doAgain == "y" || again.doAgain == "Y")
}

atm()
