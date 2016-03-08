/*eslint-disable strict*/

// put jQuery in global namespace
$ = jQuery = require('jquery');

var React = require('react');
var Router = require('react-router');

var utils = require('./_utils.js')
var appRoutes = require('./routes.js');


Router.run(appRoutes, Router.HistoryLocation, function(Handler){
  React.render(<Handler/>, document.querySelector('.container'));
})


// TESTERS
require('./test-sandbox/_setup-test.js')