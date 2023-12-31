#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const chalk = require('chalk');
const execa = require('execa');
const path = require('path');

const shell = (cmd) =>
  execa(cmd, {
    shell: true,
    stdio: ['pipe', 'pipe', 'inherit'],
  });

const srcRoot = path.join(__dirname, '../src');
const start = Date.now();

function buildModules() {
  const commands = [];
  ['cjs', 'es'].forEach((env) => {
    commands.push(
      shell(
        `yarn babel ${srcRoot} -x ".ts,.tsx,.js,.jsx" --out-dir ${env} --env-name "${env}"`
      )
    );
  });
  return Promise.all(commands);
}

Promise.resolve()
  .then(() => {
    console.log(chalk.cyan('Transpiling modules...\n'));
  })
  .then(buildModules)
  .then(() => {
    const seconds = (Date.now() - start) / 1000;
    console.log(chalk.green(`Finished building modules in ${seconds}s\n`));
  });
