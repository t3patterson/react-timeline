"use strict"
var API = require('../_API.js')




// ===========================================
// ---------- TEST API MODULE HERE ----------
console.log('API TESTER')

// 1) GET ALL Users
// ----------------------
// API.getMany({orderBy:'"$key"' , limitToFirst: 5}).then(function(data){console.log(data)})

// 4) GET SINGLE
// ----------------------

// API.getSingle({orderBy: '"userName"' , equalTo: '"commodo87"'}).then(function(data){console.log(data)})



// 3) CREATE user
// ----------------------
// var user = {
//     "guid": "353c4f88-1eaf-4262-add5-04d8638f993c",
//     "isActive": false,
//     "picture": "https://robohash.org/56ddd56ffb4d9abbd9908e50?250x250",
//     "age": 43,
//     "favoriteColor": "green",
//     "name": "Spencer Holland",
//     "gender": "male",
//     "email": "spencerholland@bolax.com",
//     "userName": "Lorem56",
//     "about": "Sunt incididunt sint occaecat sint nisi in amet anim nisi nisi officia veniam. Dolor cillum ea labore do labore commodo proident esse elit ipsum quis pariatur exercitation. Magna dolor ea eiusmod sunt consectetur id. Qui aliqua in id nisi consectetur velit amet. Labore aliqua deserunt anim eiusmod. Commodo Lorem proident deserunt amet aliqua aliquip adipisicing.\r\n",
//     "registered": "2013-08-30T01:10:02 +05:00",
//     "ssn": "222-095-095"
//   }

// API.create( user ).then(function(d){
//   console.log('success?')
//   console.log(d)
// })


// 4) UPDATE user
// --------------------------
// var user = {
//   hey: 'how are you'
// }

// API.update({"age" : 21, "userName" : 'Billy Bomb' }, '1').then(function(d){
//   console.log(d)
// })


// 5) DELETE user
// --------------------------
// var user = {
//   hey: 'how are you'
// }

// API.destroy({key: '1'}).then(function(d){
//   console.log(d)
// })



// ------------------------------------------
// ===========================================
