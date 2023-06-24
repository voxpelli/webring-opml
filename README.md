# Webri.ng OPML generator

[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![Types in JS](https://img.shields.io/badge/types_in_js-yes-brightgreen)](https://github.com/voxpelli/types-in-js)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/voxpelli/eslint-config)
[![Follow @voxpelli@mastodon.social](https://img.shields.io/mastodon/follow/109247025527949675?domain=https%3A%2F%2Fmastodon.social&style=social)](https://mastodon.social/@voxpelli)

Generates and publishes OPML feeds for webrings on [webri.ng](https://github.com/webri-ng/webri.ng)

## Current webrings

- [CSS JOY Webring](https://cs.sjoy.lol/): https://webring-opml.voxpelli.com/cssjoy.opml
- ...yours? Open an issue / PR!

## How to use an OPML file

### Manually import it into your feed reader

This is supported by pretty much every feed reader out there. You typically download the OPML file to your computer and then uploads it to the feed reader. See eg. [Feedbin's documentation](https://feedbin.com/help/how-to-subscribe/).

This means that its a one time import and you have to yourself download a new OPML file and import it if you want to get access to any new feeds that has been added.

### Subscribe to it in your feed reader

Supported by very few feed readers, but at least supported by one: [Inoreader](https://www.inoreader.com/) ([see announcement post](http://blog.inoreader.com/2014/05/opml-subscriptions.html))

Inoreader supports two modes:

* Subscribe only mode
* Full syncronisation mode (that unsubscribes from feeds that are no longer part of the OPML file)

You give it a specific folder in your Inoreader and it will target that one with the OPML and add or sync feeds it finds in the OPML file to that one.

![Skärmavbild 2023-06-24 kl  15 44 03](https://github.com/voxpelli/webring-opml/assets/34457/5b72e8d1-98dd-4f43-9701-44e5c9d9a343)

## Technical details

Uses [a GitHub Actions workflow](.github/workflows/gh-pages.yml) that's runs daily (+ whenever I push to `main` or trigger it manually).

That workflow does two things:

* It calls [`cli.js`](cli.js) with the output folder and desired OPML files to build (eg. `node cli.js opmls cssjoy`)
* It has [a GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow) that publishes the generated OPML files to GitHub pages

Things that it doesn't do but technically could do:

* Be published as a CLI tool on npm
* Be published as a reusable library on npm
