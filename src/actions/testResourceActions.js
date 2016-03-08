"user strict"

var Dispatcher = require('../dispatcher/appDispatcher.js');
var API = require('../_API.js');
var ActionTypes = require('../constants/actionTypes.js');

var AuthorActions = {
  postToDB: function(data){
    // console.log('posting to db')
    API.create(data).then(function(savedRecord){
      Dispatcher.dispatch({
        actionType: ActionTypes.CREATE_TEST,
        authorData: savedRecord
      })
    })  
  },

  getManyFromDB: function(options){
    API.getMany().then(function(data){
      // console.log('--- from database in ACTION---')
      // console.log(data)

      Dispatcher.dispatch({
        actionType: ActionTypes.GET_MANY_TEST,
        actionPayload: data 
      })
    })
  },

  getSingleFromDB: function(dataObj){
    console.log('...getting single author...')
    API.getSingle(dataObj).then(function(data){
      console.log(data.results[0])
      Dispatcher.dispatch({
        actionType: ActionTypes.GET_SINGLE_TEST,
        authorData: data.results[0] 
      })
    });
  },

  updateDB: function(dataObj){
    console.log(dataObj)
    API.update(dataObj).then(function(d){
      console.log('Action saved to db successfully!')
      console.log(d)
      Dispatcher.dispatch({
        actionType: ActionTypes.UPDATE_TEST,
        authorData: d
      })
    })

  },

  deleteSingleInDB: function(dataObj){
    API.destroy(dataObj).then(function(d){
      console.log('Record DESRTOYED!')
      console.log(d)
      console.log('=======')

      Dispatcher.dispatch({
        actionType: ActionTypes.DESTROY_TEST,
        authorData: dataObj
      })
    })
  }

  // setEditFormState: function(dataObj){
  //   console.log('setting edit form state..')
  //   Dispatcher.dispatch({
  //     actionType: ActionTypes.EDIT_FORM_UPDATE_UI, 
  //     authorData: dataObj
  //   })
  // },

  // resetEditFormState: function(){
  //   Dispatcher.dispatch({
  //     actionType: ActionTypes.RESET_EDIT_FORM_STATE
  //   })
  // },  
}

module.exports = AuthorActions;