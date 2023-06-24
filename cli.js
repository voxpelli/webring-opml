#!/usr/bin/env node
/* eslint-disable no-console */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { argv } from 'node:process';

import { generateOpmlForWebring } from './index.js';

const outDir = argv[2];
const webringNames = argv.slice(3);

if (!outDir) {
  console.error('Error: An out dir is required');
  process.exit(1);
}

if (webringNames.length === 0) {
  console.error('Error: At least one webri.ng name required');
  process.exit(1);
}

try {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await mkdir(outDir);
} catch {
  // Its okay if it already exists
}

const settled = await Promise.allSettled(webringNames.map(async (name) => {
  const opml = await generateOpmlForWebring(name);

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await writeFile(
    path.join(outDir, name + '.opml'),
    opml,
    'utf8'
  );

  return name;
}));

let failed = false;

for (const status of settled) {
  if (status.status === 'rejected') {
    console.error('Failed generating a webri.ng OPML because:', status.reason);
    failed = true;
  } else {
    console.log('Successfully created webri.ng OPML for:', status.value);
  }
}

if (failed) {
  process.exit(1);
}
