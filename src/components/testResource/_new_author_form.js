var React = require('react')
var CheckBox = require('../common/checkBox.js')

var NewAuthorsForm = React.createClass({
  
  showElOnError: function(msg){
    if (msg) {
      return <div>
        <br/>
        <div className="alert alert-danger" role="alert">{msg}</div>
      </div>
    }
  },

  render: function(){
    return (
      <form className="col-xs-offset-3 col-xs-6" onSubmit={this.props.onSave}>
        
        <label htmlFor="firstName">Name Name</label>
        <input type= "text"
          name= "firstName"
          className= "form-control"
          placeholder= "First Name"
          ref="firstName"
          defaultValue= ""
        />
        { this.showElOnError(this.props.errors.firstName) }        
        
        <br/>
        
        <label htmlFor="lastName">Last Name</label>
        <input type= "text"
          name= "lastName"
          className= "form-control"
          placeholder= "Last Name"
          ref="lastName"
          defaultValue= ""
        />
        { this.showElOnError(this.props.errors.lastName) }        
        <br/>
       
       <label htmlFor="age">Age</label>
        <input type= "text"
          name= "age"
          className= "form-control"
          placeholder= "Age"
          ref="age"
          defaultValue= ""
        />
        { this.showElOnError(this.props.errors.age) }
        <br/>

        <label htmlFor="age">Active</label>
        <CheckBox 
          fieldName={'active'}
          isChecked={false}
        />



        <br/>
        <input type="submit"
          className="btn btn-default"
          value="Submit"/>

      </form>
    )
  }
})

module.exports = NewAuthorsForm;