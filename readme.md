#Setup

##Configuration NOTE: Make sure that gulp program can be accessed
1) set `npm` prefix: `$ npm config set prefix /usr/local`
2) set `$ npm install gulp -g`
3) 

###Setup Tips

####Base Case (component rendering and , routing)
1. Clone the repo and set the url to your own remote repository
2. `$ npm install` the package.json
3. Run the gulp task-runner in terminal `$ gulp`
4. Test to see if home-page and about-page components are working

####API Module
1) Configure `_API.js` module to your database, and see if you can fetch data. *Firebase* is the current default backend

2) Execute the other methods in `_API.js` with dummy data
  - `getAll`
  - `getSingle`
  - `create`
  - `update`
  - `destroy`

####Create a component to render API module on page


##To Improve...
- create test-components to interact with database