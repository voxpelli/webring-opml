/* eslint-disable no-console */

import got from 'got';
import * as cheerio from 'cheerio';

const options = {
  timeout: {
    request: 10000,
  },
};

const client = got.extend(options);

/**
 * @param {unknown} value
 * @returns {value is object}
 */
// eslint-disable-next-line no-unneeded-ternary
const isObject = value => value && typeof value === 'object' ? true : false;

/**
 * @param {string} name
 * @returns {Promise<unknown|undefined>}
 */
async function getWebringSites (name) {
  try {
    return await client(`https://webri.ng/webring/${encodeURIComponent(name)}/sites`).json();
  } catch (err) {
    if (
      isObject(err) && 'response' in err &&
      isObject(err.response) && 'statusCode' in err.response
    ) {
      console.error(`Failed to fetch webring "${name}", got response code:`, err.response.statusCode);
    }
  }
}

/**
 * @param {string} url
 * @returns {Promise<import('cheerio').CheerioAPI|undefined>}
 */
async function getCheerioDocumentForUrl (url) {
  try {
    const result = await client(url);
    return cheerio.load(result.body);
  } catch (err) {
    if (
      isObject(err) && 'response' in err &&
      isObject(err.response) && 'statusCode' in err.response
    ) {
      console.error(`Failed to fetch, got response code "${err.response.statusCode} for:`, url);
    }
  }
}

/**
 * @param {string} url
 * @returns {Promise<string|undefined>}
 */
async function getFeedForUrl (url) {
  const $ = await getCheerioDocumentForUrl(url);

  if (!$) return;

  const href = $('link[rel~="alternate"]').first().attr('href');

  if (href === undefined) return;

  const resolved = new URL(href, url);

  return resolved.toString();
}

/**
 * @param {string} name
 * @returns {Promise<string>}
 */
export async function generateOpmlForWebring (name) {
  const sites = await getWebringSites(name);

  if (sites === undefined) {
    throw new Error(`No response from webri.ng for name "${name}"`);
  }
  if (!Array.isArray(sites)) {
    throw new TypeError(`Invalid response from webri.ng for name "${name}"`);
  }

  const sitesWithFeeds = await Promise.all(sites.map(
    async ({ name, url }) => {
      const feed = await getFeedForUrl(url);
      return feed ? { feed, name, url } : undefined;
    }
  ));

  const $ = cheerio.load(`<?xml version="1.0" encoding="UTF-8"?>
  <opml version="1.0">
    <head>
      <title>Feeds for webri.ng</title>
      <dateCreated>${(new Date()).toISOString()}</dateCreated>
    </head>
    <body>
    </body>
  </opml>
  `, { xml: true });

  $('title').text(`Feeds for ${name} webri.ng`);

  for (const site of sitesWithFeeds) {
    if (!site) continue;

    $('<outline />').attr({
      htmlUrl: site.url,
      text: site.name,
      title: site.name,
      type: 'rss',
      xmlUrl: site.feed,
    }).appendTo('body');
  }
  return $.xml();
}
