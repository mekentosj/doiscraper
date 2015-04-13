var assert = require('assert');
var crossref = require('./../crossref');
var getDoi = require('./../doi');
var fs = require('fs');
var html = {
  nature: fs.readFileSync('./test/fixtures/nature-1.html'),
  sciencedirect: fs.readFileSync('./test/fixtures/sciencedirect-1.html'),
  pubmed: fs.readFileSync('./test/fixtures/pubmed.html', 'utf8')
};

var ran = 0;

assert.equal('10.1016/j.accreview.2005.11.090', getDoi(html.sciencedirect));
assert.equal('10.1016/j.psyneuen.2015.03.010', getDoi(html.pubmed));

crossref.getMetaDataFromHtml(html.nature, function(err, json) {
  ran++;
  var expectedTitle = 'Negative regulation of the NLRP3 inflammasome by A20 protects against arthritis';
  assert.equal(json.title, expectedTitle);
});

crossref.getMetaDataFromHtml(html.sciencedirect, function(err, json) {
  ran++;
  var expectedTitle = 'Variations in Adult Congenital Heart Disease Training in Adult and Pediatric Cardiology Fellowship Programs';
  assert.equal(json.title, expectedTitle);
});

process.on('exit', function() {
  assert.equal(ran, 2, 'Expected a specific number of tests to run');
});
