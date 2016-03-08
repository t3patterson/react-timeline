"use strict"
var React = require('react');
//React-Router
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;

var Redirect = Router.Redirect;


//Components
var App = require('./components/app.js');
var NotFoundPage = require('./components/component-not-found-page.js');

var HomeView         = require('./components/component-home-page.js');
var AboutView        = require('./components/about/component-about-page.js');
var TestView        = require( './components/testResource/component-test-page.js');


//<Route name="authors" path="/authors" handler={AuthorsView}/>

console.log('say hi');

var routes = (
  <Route name="app" path="/"  handler={App} >
    <DefaultRoute handler={HomeView}/>
    
    <Route name="about" handler={AboutView}/>
    <Route name="test" handler={TestView}/>

    <NotFoundRoute handler={NotFoundPage}/>
    <Redirect from="about-us" to="about"/>
    <Redirect from="about/*" to="about"/>
    <Redirect from="awthurs" to="authors"/>
  </Route>
);

module.exports = routes;