import inquirer from "inquirer";
import { AskNumber } from "Types";

export const promptNumber = async (askNumber: AskNumber) =>
  inquirer.prompt([
    {
      name: askNumber.name,
      type: "list",
      message: askNumber.message,
      choices: askNumber.choices || [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 50, 100, 500,
      ],
    },
  ]);

export const inputNumber = async (askNumber: AskNumber) =>
  inquirer.prompt([
    {
      name: askNumber.name,
      type: "input",
      message: askNumber.message,
    },
  ]);
