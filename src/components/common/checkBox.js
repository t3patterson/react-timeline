"use strict";

var React = require('react');

var CheckBox = React.createClass({
  getInitialState: function(){
    console.log(this.props)
    return {
      isChecked: this.props.isChecked || false
    }
  },

  _toggleCheckBox: function(e){

    if ( !this.state.isChecked ){
      this.setState({
        isChecked: true
      })
    } else {
      this.setState({
        isChecked: false
      })
    }
  },

  render: function(){
    return(
      <input type="checkbox" 
        id={this.props.fieldName} 
        checked={this.state.isChecked} 
        data-field={this.props.fieldName} 
        className="form-control" 
        onChange={this._toggleCheckBox} />
    )
  }
})

module.exports = CheckBox