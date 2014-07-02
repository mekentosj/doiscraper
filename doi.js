var cheerio = require('cheerio');

module.exports = getDoi;

function getMetaTag($, metaTagName) {
  return $('meta[name="' + metaTagName + '"]').attr('content');
}

function getJavaScriptValue(html) {
  if (html) {
    var matches = html.toString().match(/SDM\.pm\.doi\s+=\s+['"]([^"']*)['"];?$/m);
    return matches && matches.length ? matches[1] : undefined;
  }
}

function getDoi(html) {
  var $ = cheerio.load(html);

  return getMetaTag($, 'citation_doi')
    || getMetaTag($, 'DC.identifier')
    || getJavaScriptValue(html);
}
