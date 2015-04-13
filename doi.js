var cheerio = require('cheerio');
var doireg = /\b(10\.\d{4,5}(\.[\.\w]+)*\/\S+[\w\d\)>#])/g;

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

function getDoiWithRegex(text) {
  var matches = text.match(doireg);
  if (matches && matches[1]) {
    return matches[1];
  }
}

function getDoi(html) {
  var $ = cheerio.load(html);

  return getMetaTag($, 'citation_doi')
    || getMetaTag($, 'DC.identifier')
    || getJavaScriptValue(html)
    || getDoiWithRegex(html);
}
