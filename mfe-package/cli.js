#!/usr/bin/env node

const { Command } = require("commander");
const { startDevServer } = require("./webpack/webpack.config.dev");

const program = new Command();

console.log("Hello world from microfrontend-package");

program
  .command("dev")
  .description("Start the development server for the microfrontend")
  .action(() => {
    return startDevServer();
  });

program.parse(process.argv);
