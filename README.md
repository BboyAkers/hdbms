# HarperDB Studio
The comprehensive management suite for HarperDB. 

- [https://studio.harperdb.io](https://studio.harperdb.io)

## What’s in the box

- Third party software (click to review each library's licensing)
    - [ReactJS](https://reactjs.org/) site scaffold
    - [react-router](https://reacttraining.com/react-router/) for navigation
    - [pullstate](https://lostpebble.github.io/pullstate/) for global state management
    - [webpack 4](https://webpack.js.org/) module bundling and development webserver

## Magic... how does it work?

Follow these steps to run a local version of HarperDB Studio.

1. In your terminal, clone the UI scaffold, enter the directory, and install dependencies.
    ```
    git clone https://github.com/harperdb/hdbms.git
    cd hdbms
    npm i -s
    ```

1. Create your local config file.
    - Create a copy of the root level file `config.example.js`, named `config.js`.
    - update the `stripe_public_key` and/or other variables in that file as desired
    - save the file
    - **Never commit `config.js` to GitHub!**

1. Start the project.
    ```
    npm start
    ```

1. Visit the project at https://localhost:3000.
    - The development web server uses a self-signed certificate, and you may see a warning about the site being insecure. In your local development environment, it is safe to click "Advanced" > "proceed to site anyway."
