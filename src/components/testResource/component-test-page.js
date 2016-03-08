var React = require('react')

var TestActions = require('../../actions/testResourceActions.js');
var TestStore = require('../../stores/testResourceStore.js');

var TableComponent = require('./_many-records_table-component.js')

var TestPage = React.createClass({
  
  getInitialState: function(){
    
    return {
      dataList: [],
      dataSingle: {}
    }
  },
  
  //(1)
  componentDidMount: function(){
    
    TestStore.addChangeListener(function(){
      var results = TestStore.getDataList()
      this.setState({dataList: results})
    }.bind(this))

    TestActions.getManyFromDB()
  },

  componentWillUnmount: function(){
    // console.log('component unmounting --- AuthorsPage')
    
    // AuthorStore.removeChangeListener();
  },

  render: function(){
    return (
      <div>
        <h1>Flux Tester</h1>
        <TableComponent dataList={this.state.dataList}/>
        <hr/>

      </div>
    );
  }
})

module.exports = TestPage;
