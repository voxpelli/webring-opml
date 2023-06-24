# Webri.ng OPML generator

[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![Types in JS](https://img.shields.io/badge/types_in_js-yes-brightgreen)](https://github.com/voxpelli/types-in-js)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/voxpelli/eslint-config)
[![Follow @voxpelli@mastodon.social](https://img.shields.io/mastodon/follow/109247025527949675?domain=https%3A%2F%2Fmastodon.social&style=social)](https://mastodon.social/@voxpelli)

Generates and publishes OPML feeds for webrings on [webri.ng](https://github.com/webri-ng/webri.ng)

## Current webrings

- [CSS JOY Webring](https://cs.sjoy.lol/): https://webring-opml.voxpelli.com/cssjoy.opml
- ...yours? Open an issue / PR!

## Technical details

Uses [a GitHub Actions workflow](.github/workflows/gh-pages.yml) that's runs daily (+ whenever I push to `main` or trigger it manually).

That workflow does two things:

* It calls [`cli.js`](cli.js) with the output folder and desired OPML files to build (eg. `node cli.js opmls cssjoy`)
* It has [a GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow) that publishes the generated OPML files to GitHub pages

Things that it doesn't do but technically could do:

* Be published as a CLI tool on npm
* Be published as a reusable library on npm
