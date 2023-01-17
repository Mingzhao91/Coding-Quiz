const questionsArr = [
  {
    question: `The external JavaScript file must contain the <script> tag.`,
    options: [`False`, `True`],
    answer: `True`
  },
  {
    question: `How do you write "Hello World" in an alert box?`,
    options: [
      `alert("Hello World");`,
      `msg("Hello World");`,
      `alertBox("Hello World");`,
      `msgBox("Hello World");`
    ],
    answer: `alert("Hello World");`
  },
  {
    question: `How do you create a function in JavaScript?`,
    options: [
      `function = myFunction()`,
      `function:myFunction()`,
      `function myFunction()`
    ],
    answer: `function myFunction()`
  },
  {
    question: `How to write an IF statement in JavaScript?`,
    options: [`if i = 5 then`, `if (i == 5)`, `if i = 5`, `if i == 5 then`],
    answer: `if (i == 5)`
  },
  {
    question: `How does a WHILE loop start?`,
    options: [`while (i <= 10; i++)`, `while (i <= 10)`, `while i = 1 to 10`],
    answer: `while (i <= 10)`
  }
];

export default questionsArr;
