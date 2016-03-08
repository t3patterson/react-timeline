"use strict"
var _ = require('lodash');
var apiBaseURL = 'https://fluxsetup.firebaseio.com/dummy'


var db_utils = {
  build_fb_URL: function (base, extensions, paramsObj){
    var authKey = "vQOguiKkqh6GXqOkYjw8Lr8SiQkMBHPWwP3LFmWE"
    var fileType = ".json"

    function _buildQueryStringParams(paramsObj){
      var qryStr = ''
      var paramsObj = paramsObj || {}
      paramsObj.auth = authKey
      for (var prop in paramsObj){
        qryStr += "&" + prop + "=" + paramsObj[prop];
      }
      
      return '?' + qryStr.substr(1) 
    }

    var ext
    ext = '' 
    if ( extensions ){ ext = "/" + extensions }
    
    var qryStr = ''
    var qryStr = _buildQueryStringParams(paramsObj)
    return base + ext + fileType + qryStr
  },

  returnEmptyPromise: function(data){
    console.log('promise so empty')
    return ( new $.Deferred() ).resolve(data)
  },

  parseFBDataToArray: function(fb_data_objects){
    console.log('huuuu')
    var p = new $.Deferred()
    var fbArray = _(fb_data_objects)
      .keys()
      .map(function(kStr){
        console.log(fb_data_objects[kStr])
        fb_data_objects[kStr]._key = kStr
        return fb_data_objects[kStr]
      })
      .value()

    p.resolve(fbArray)

    return p
  }
}


function APIConstructor(){
  var apiParams = {
    headers: {
    }
  }

  function requestType(reqType){

    var apiReqSettings = function(optionsObj, record){

      var dataProcessing_fn = db_utils.returnEmptyPromise

      switch (reqType) {
        case ('getMany'):
          console.log(optionsObj)
          var url = db_utils.build_fb_URL(apiBaseURL, null, optionsObj) 
          apiParams.url = url;
          apiParams.type = 'get';
          dataProcessing_fn = db_utils.parseFBDataToArray  
          break;

        case ('getSingle'):

          var url = db_utils.build_fb_URL(apiBaseURL, null, optionsObj) 
          console.log(url)
          apiParams.url = url;
          apiParams.type = 'get';

          break;

        case ('create'):
          apiParams.url = db_utils.build_fb_URL(apiBaseURL, null, optionsObj)
          apiParams.type = 'post';
          apiParams.contentType = 'application/json';
          console.log(optionsObj)
          apiParams.data = JSON.stringify(optionsObj);
          break;

        case ('update'):
          apiParams.type = 'patch';
          apiParams.url = db_utils.build_fb_URL(apiBaseURL, record, optionsObj);
          console.log(apiParams.url)
          apiParams.contentType = 'application/json';
          apiParams.data = JSON.stringify(optionsObj);
          break;
        
        case ('destroy'):
          apiParams.url = db_utils.build_fb_URL(apiBaseURL, optionsObj.key, null);
          console.log('deleter')
          console.log(apiParams.url)
          apiParams.type = 'delete';
      }

        return $.ajax(apiParams).then(dataProcessing_fn);

    }

    return apiReqSettings
  }

  return {
    getMany: requestType('getMany'), //returns a FUNCTION that, when executed, will ajax-request+return a promise
    getSingle: requestType('getSingle'),
    create: requestType('create'),
    update: requestType('update'),
    destroy: requestType('destroy')
  }
}

var API = new APIConstructor();

module.exports =  API