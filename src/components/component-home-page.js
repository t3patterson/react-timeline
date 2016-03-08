"use strict";

var React = require('react');

var Home = React.createClass({

  getInitialState: function(){
    var timeLineItems = [
      {
        timelineStyle: null, //info, default, primary, warning
        badgeStyle: "primary",  //'timeline-inverted' to put on right side
        title: "Build API Module",
        date: Date,
        listTitle: "Goals",
        description: "Create a module-hub for interacting with the database.\
                     We want to do this so that we can create/read/update/delete records in a simple way throughout our application",
        items: [
          "Create API-Module Methods for Database", 
          "Create dummy data with json-generator",
          "Test API-Module methods",
          "Render data for many-users to a index-path react component"
        ]
      },
      {
        timelineStyle: "timeline-inverted", //'timeline-inverted' to put on right side 
        badgeStyle: null,  //info, default, primary, warning
        title: "Flux Implementation - Pt1",
        date: "Tuesday, March 8, 2016",
        listTitle: "Goals",
        description: "The goal is to establish a uni-directional data flow and see how these major parts interact when we fetch data.\
                     Components trigger actions, actions call our api module and pass the data to the store, the store updates its state\
                     and emits a change event. And finally, component listens for changes and calls a method on the store to return check the store's state\
                     so that the component can set its own state",
        items: [
          "Setup the action + dispatcher + store directories and files",
          "Wire up the component to trigger an action that makes an API request",
          "When the data returns, we will 'dispatch' the data to the store  ",
          "We will build our store, analyze its features, and examine how it notifies the component of changes",
          "We'll create a custom event-listener on our store that will run a callback on our component when the store updates",
        ]
      }

    ]

    return {
      events: timeLineItems
    }
  },

  _generateTimeline: function(eventList){
    var components = eventList.map(function(evt){
      
      return this._createTimelineComponent(evt)
    
    }.bind(this))

    return components
  },

  _createTimelineComponent: function(evtOps){

    return (
      <li className={ evtOps.timelineStyle || "" }>
        <div className={"timeline-badge " + ( evtOps.badgeStyle || "default" ) }><i className="fa fa-circle"></i></div>
        <div className="timeline-panel">
          <div className="timeline-heading">
            <h3 className="timeline-title">{evtOps.title}</h3>
            <p className="text-muted">
              <small><i className="fa fa-calendar"></i> {evtOps.date}</small>
              <br/><br/>
              {evtOps.description}
            </p>
          </div>
          <hr/>
          <h5>{evtOps.listTitle}</h5>
          <div className="timeline-body">
            <ul>
              { evtOps.items.map(function(itm){ return <li><small>{itm}</small></li> }) } 
            </ul>
          </div>
        </div>
      </li>
    ) 
  },

  render: function(){

    return(
      <div>
        <h1>Super Gulp React Schedule</h1>
        <ul className="timeline">        
          { this._generateTimeline(this.state.events)}
        </ul>
      </div>
      )
  }
})

module.exports = Home