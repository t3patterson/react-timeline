var Dispatcher = require('../dispatcher/appDispatcher.js');
var $ = require('jquery');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var ActionTypes = require('../constants/actionTypes.js');
var API = require('../_API.js');

//----------------------------------------------------------
// State Variables -- Dispatcher Updates and Component Can Access Through AuthorStore
//----------------------------------------------------------
var _testDataList = [];


//----------------------------------------------------------
// THE STORE -- Dispatcher Updates and Store Returns to Component
//----------------------------------------------------------

var changeListenerCB = null

var TestStore = _.assign({},EventEmitter.prototype, {
  //note, the methods below have here will have EventEmitter's `.emit` ,` .on`,`.removeChangeListener`,  methods
    
    // will need to REMOVE this change listenter when component unmounts
    storeChange_fn: null,

    addChangeListener: function(cb){
      var p = $.Deferred()
      this.storeChange_fn = cb
      p.resolve( this.on('store-change', this.storeChange_fn ) );
      return p
    },

    removeChangeListener: function(){
      console.log(this)
      this.removeListener('store-change', this.storeChange_fn )

    },

    emitChange: function(moreInfo){
      this.emit('store-change');
    },
   // -----------

    getDataList: function(){
      return _testDataList;
    },

});

//every store that is registered w/ the dispatcher 
//  is notified of every single action
Dispatcher.register( function(dispatchObj) {

  switch(dispatchObj.actionType) {
    case ActionTypes.GET_MANY_TEST:
      _testDataList = dispatchObj.actionPayload;
      console.log('DATA ON STORE')
      console.log(_testDataList)     
      TestStore.emitChange();
      break;
    case ActionTypes.CREATE_AUTHOR:
      newAuthor = dispatchObj.authorData;
      TestStore.emitChange();
      break;
    
    case ActionTypes.GET_SINGLE_AUTHOR:
      // console.log(dispatchObj.authorData)
      _authorsList = []
      _authorsList.push(dispatchObj.authorData)
      _authorEditFormState = dispatchObj.authorData
      TestStore.emitChange();
      break;

    case ActionTypes.UPDATE_AUTHOR:
      _recordHasBeenUpdated = true;
      TestStore.emitChange();
      break;
    
    case ActionTypes.EDIT_FORM_UPDATE_UI:
      console.log('ui state per store')
      console.log(dispatchObj.authorData)
      if ( JSON.stringify(_authorEditFormState) !== JSON.stringify(dispatchObj.authorData) ){
        _authorEditFormState = dispatchObj.authorData;
        TestStore.emitChange();
      }
      break;

    case ActionTypes.RESET_EDIT_FORM_STATE:
      _recordHasBeenUpdated = false;
      _authorEditFormState = {}
      break;
    

    case ActionTypes.DELETE_AUTHOR: 
      // console.log('author was deleted, mayne!!!');
      _recordHasBeenUpdated = true
      TestStore.emitChange();
    
    default:
      //no operation

  }
})

module.exports = TestStore;
