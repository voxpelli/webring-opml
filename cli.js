#!/usr/bin/env node
/* eslint-disable no-console */

import { argv } from 'node:process';

import { generateOpmlForWebring } from './index.js';

const webringName = argv[2];

if (!webringName) {
  console.error('Error: A webri.ng name is requried');
  process.exit(1);
}

console.log(await generateOpmlForWebring(webringName));
