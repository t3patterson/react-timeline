var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var TestUsersList = React.createClass({
  
  propTypes: {
    dataList: React.PropTypes.array.isRequired
  },

  _createAuthorRows: function(usr,i){
    return (
      <tr key={i}>
        <td>
          {i+1}
        </td>
        
        <td>
          {usr.userName}
        </td>

        <td>
          {usr.name}
        </td>
      </tr>
    );
  },

  render: function(){
    return (
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {this.props.dataList.map(this._createAuthorRows)}
        </tbody>
      </table>
    )
  }
})

module.exports = TestUsersList;
