## Introduction

This is a data-driven test project for a Kanban board application built with Playwright. The test data is stored in the `test-data.json` file and the test cases are stored in the `example.spec.ts` file. The test cases are designed to validate the task names, columns, and tags in the Kanban board.

## Implementation Details

The project is implemented using the Page Object Model (POM) pattern. The `locators.po.ts` file contains the locators for the page elements (as well as some helper functions) and the `example.spec.ts` file contains the test cases.

## Challenges and Solutions

The main challenge, as is often the case, was to find the correct locators for the page elements. I will go into more detail in the Recommendations section as to how I would tackle these challenges given access to the codebase, but when writing tests for an app that you do not have code access to, it is often neccessary to be more verbose with the locators.

## Results

The test cases were successfully implemented and the results were as expected, there were no failures. I did test adding irrelevant tags to a task to see if the test would fail, and it did. I left the default projects in tact in the playwright config, and the tests passed on all three major browsers. 

## Recommendations

The main change I would make to the codebase is to add a `data-testid` attribute to the relevant elements in the DOM. This would allow for more concise locators and make the code more readable.
