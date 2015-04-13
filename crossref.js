var getDoi = require('./doi');
var request = require('request');

module.exports.getMetaDataFromHtml = function(html, cb) {
  var doi = getDoi(html);
  var url;

  if (!doi) return cb(new Error('DOI not found'));

  url = 'http://dx.doi.org/' + doi;

  request({
    url: url,
    headers: {
      Accept: 'application/citeproc+json'
    }
  }, function(err, res, body) {
    try {
      cb(err, JSON.parse(body));
    } catch (e) {
      cb(err);
    }
  });
};
