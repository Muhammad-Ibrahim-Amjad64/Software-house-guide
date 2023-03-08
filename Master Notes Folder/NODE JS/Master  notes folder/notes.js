// anonymous  function :
   // A function which does not have a name

// __________________________________________________
//  1ST NODE PROGRAM
// __________________________________________________

// function hello_bol(name){

//     console.log("hello " + name )

// }

// hello_bol("Ibrahim");
// hello_bol(99999);
// Window.hello_bol();  // Window not avalible in node js
// global.hello_bol();
// global.setTimeout();
// console.log(global.hello_bol);
// console.log(setTimeout());





// console.log("Hello World", 4 + 6, "Another log"); 4
// + se concatination hoti ha , se f tring wala kaam
// console.log("Hello World"+ 4 + 6+ "Another log");

// console.log(window);  // window is not defined in node js . but is defined in node js



// __________________________________________________
//  NODE MODULE SYSTEM
// __________________________________________________

// ------------------------------------------------
// global objects in Node
// -----------------------------------------------

// setInterval()       // global.setsetTimeout() same same 
// setTimeout()

// clearTimeout()
// console.log( setInterval())    // AND WHY THIS IS UNDEFINED 

// console.log(); // global


// ye saaray global objects hain 
// in js it is window.setTimeout()
// in node js is is global.setTimeout()



// const message = 'dee';
// // window.message;
// console.log(global.message);  // WHY THIS IS UNDEFINED = variables are not defined in global

// * jo variable and functions yaha define kia jaa aain gy are not added in global object they are only scoped in that file or module app.js

// -----------------------------------------------------------------
// Modules 
// -----------------------------------------------------------------

// c=;
console.log(module);


// file 1 logger.js 

var url = 'http:/ibrahim.com/log';
function log(message) {
    // send an HTTP request 
    console.log(message);
    

}

module.exports.show_log=log;  // for exporting methods 
// module.exports=log;

// file 2 app.js

const logger = require('./logger');
// logger("ye rhi log");
logger.show_log("log ye rhi ");

// -----------------------------------------------------------------
// Module wrapper function 
// -----------------------------------------------------------------


(function (exports, require, module, __filename,__dirname) {  // Wrapper function 
    // const x=;
    var url = 'http:/ibrahim.com/log';
    function log(message) {
        // send an HTTP request 
        console.log(message);
        console.log("ye ha life name ");
        console.log(__filename);
        console.log("dir name ") // ye folder name dir = folder 
        console.log(__dirname);
        

    }

    // module.exports.show_log=log;  // for exporting methods 
    module.exports=log;



})
// node does not execute our code directly it wraps into a function
// poori node file aik function ke andar wrap hoti ha  and that function si called wrapper function


// -----------------------------------------------------------------
// Important node buildin modules
// -----------------------------------------------------------------


// 1. Path    (module)
// 2. File System   
// 3. HTTP
// 4. OS 
// 5. Process 
// 6. Query Strings 
// 7. Stream 


// -----------------------------------------------------------------
// Path module 
// -----------------------------------------------------------------

// This module provides utilities fro working with file and directory paths. can be accessed using 

// const path_obj = require ('path');

const path_obj = require ('path');
const path_shower = path_obj.parse(__filename);
console.log(path_shower);

// standard
// const path = require ('path');
// const pathobj = path.parse(__filename);
// console.log(pathobj);

// output for file app.js 

// {
//     root: 'e:\\',
//     dir: 'e:\\Ibrahim\\Node js',
//     base: 'app.js',
//     ext: '.js',
//     name: 'app'
//   }


// -----------------------------------------------------------------
// OS module 
// -----------------------------------------------------------------



// USE of OS module 

const os = require('os');
const totalSpace = os.totalmem();
const freeSpace = os.freemem();
console.log("total space: ",totalSpace);
console.log("Free space : ", freeSpace);
console.log(`total space : ${totalSpace}`);


// -----------------------------------------------------------------
// File System 
// -----------------------------------------------------------------

// node call this function when asynchronous  method is complete  in fs

// always prefer to ise asynchronous  methods


const fs=  require('fs');
// Using synchronous method to red directory (dispays all the folder in the specified directory)
const read_sync = fs.readdirSync("./");
console.log(read_sync);  
//OUTPUT (for node js directory)
// [ 'app.js', 'logger.js', 'notes.js' ]
const read_async= fs.readdir("./",  (err,files)=> {  // we dpes not need rea_async object here to assess with asynchronous 
    if (err){
        console.log("error", err)
    }
    else{
        console.log("files : ",files);
    }
    
});


// function (err, files) {  }       ====       (err, files)=> {   }


// -----------------------------------------------------------------
// Events module-  A signal that something happened
// -----------------------------------------------------------------
// important in event module is EventEmitter
// EventEmitter is a class
// and object of that class provides tha actual functionality

// Meaning of emit = Making a noise - produce signalling 
// importnant methods in event emitter
// 1. emit (just  raised an event )  
// 2.  on () and addListener  ()  (listens to a raised event)

// a listener is a  function that would be called when an event is raised

// BASIC EVENT EMITTER CODE THAT LISTENTS AND RAISED
// ---
const EventEmitter = require('events');
const event = new EventEmitter();

//adding listener
event.on("logging", ()=>{

console.log("the event is called")
})
// RAISING AN EVENT
event.emit("logging");
// ---


// -----------------------------------------------------------------
// Event arguments
// -----------------------------------------------------------------


const EventEmitter = require('events');
const event = new EventEmitter();

//adding listener
event.on("logging", (arg)=>{

console.log("the event is called", arg)
});
// RAISING AN EVENT
event.emit("logging",{id:1 , information:"hello"});


// Raise: logging (data: message) 

const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on("logging", (arg)=>{
    console.log("the event is raised ", arg);

}) 

emitter.emit("logging", {data: "kia hal ha"});



// -----------------------------------------------------------------
// Extending EventEmitter
// -----------------------------------------------------------------


// in app.js


const EventEmitter = require('events');
const event = new EventEmitter();
const logger = require("./logger");

//adding listener
event.on("logging", (arg)=>{

console.log("the event is called", arg)
});

//  trying to raise an event through logger function 
logger("this is a message");

// in logger.js

const EventEmitter = require('events');
const event = new EventEmitter();

    var url = 'http:/ibrahim.com/log';
    function log(message) {
        // send an HTTP request 
        console.log(message);
        // RAISING AN EVENT
        event.emit("logging",{id:1 , information:"hello"});
        
        

    }

    // module.exports.show_log=log;  // for exporting methods 
    module.exports=log;

    // output after running app.js =  "this is a message"
    // the event is not listened because they have different event objects



    // AFTER MAKING CLASS IN LOGGER MODULE TO RAISE AN EVENT 

    // logger.js

    const EventEmitter = require('events');


    var url = 'http:/ibrahim.com/log';


    class Logger extends EventEmitter{
        log(message) {
            // send an HTTP request 
            console.log(message);
            // RAISING AN EVENT
            this.emit("logging",{id:1 , information:"hello"});
        }


    }


// module.exports.show_log=log;  // for exporting methods 
    module.exports=Logger;


    // app.js


    const EventEmitter = require('events');

    const Logger = require("./logger");
    const logg = new Logger();
    // adding listener
    logg.on("logging", (arg)=>{
        
        console.log("the event is called", arg)
    });
    logg.log("hello i am ibraim");


// -----------------------------------------------------------------
// HTTP Module
// -----------------------------------------------------------------


// it is used to create network in an applications. we can create a web server  that listens to a given http request to a given port .amd with we can easily creatw a backend sevice for our applications.

// createServer is an event emitter


// Everytime there is a new connection or new request this server raises an EVENT 


const http = require("http");
const server = http.createServer();


// responding to a connection event (using listener)
server.on('connection', (stream) => {
    console.log('someone connected!');
  });

server.listen("3000");   // yaha listen = emit wala kaam kr rha ha raising an event on port 3000
console.log("listening on port 3000");

// the above code is the simplest we dont do that in real world applications
// In real world apps we are not going to respond to connection event to build an http service . As this is very low level



/// Yaha high levee a a a ajqo



// __________________________________________________
//  NODE MODULE SYSTEM
// __________________________________________________


// When ever you create a node project (backend run " npm init " to to create package.json)
// npm init --yes      // shortcut 
// package.json  contains all the dependencies and meta data of our node project 


// npm install underscore
// npm i mongoose 
//    node_modules/
// in packeges ki bhi dependencies hoti hain  for example our app use async version 1 and mongoose dependent on async version 2 so node modules ke andar version 1 a aa ga coz hamara app uspr dependent ha . aur mongoose  ke  node_modules ke folder ke andar version 2 aa a ga .


// -------------------------------------------------
//  NPM PACKAGES AND SCM 
// -----------------------------------------------

// in real  world apps the node modules folder becomes very large GBs so we does not include it in our source code we can easily recover our dependencies with the help og packages.json . so by running

// npm i   (to recover node_modules folder)

// all dependencies recovered (node modules folder recovered)

//GITHUB PE NODE_MODULES NO INCLUDE
// so we use git to exclude it

// git init 
// git status

// screen shot mn aur git code 


// -------------------------------------------------
//  Semantic Versioning  (X.Y.Z) or SEMVER
// -----------------------------------------------

// 4.13.6   // Majaor.Minor.Patch
//  where path is the bug fixing  after fixing 4.13.6

// Minor version is used to add new feature without breaking the existing api
// API is the acronym for Application Programming Interface, which is a software intermediary that allows two applications to talk to each other
// so    4.14.0

// major version jo existing api tor de ga  tou 5.0.0
// ^ = caret

// In our dependdencies the versions are like "^4.13.6" this carot indicates that if we delete node_modules foldes and there is a minor and bug fixes then they will be applied like 
    // "^4.13.6" = 4.x 
    // "~4.13.6" = 4.13.x     (tilde) 

// To get the exact versions with npm i  remove ~ ^




// -------------------------------------------------
//  Listing the installed packages
// -----------------------------------------------


// jb hma compare krn ahn ke package.json aur istsalled ka version same ha tou ue

// npm list      // to display the list of the dependencies of our node application


// -------------------------------------------------
//  Viewing registry info for a package
// -----------------------------------------------
 
// if you want to see info of any package then use 
// npm view 
// eg :  npm view mongoose 

// Agar kisi bhi package ki dependencies list knri hn tou use
// npm view packname dependencies 
// npm view mongoose dependencies 

// To view all versions of a certain package use
// npm view packname versons
// eg : npm view mongoose versions

// -------------------------------------------------
// Installing the specific versions of any package
// -----------------------------------------------


//  npm i mongoose@2.4.2


// -------------------------------------------------
// Updating the local packages
// -----------------------------------------------

// To check the outdsted packages use (dependencies)
// npm outdated


// To update the package minor and patch(bug fixes) updates use 
// npm update

// To update a package to its latest version use
// "npm i -g npm-check-updates"  // ye check updates wala package install krdy g 
// is baad we can run "npm-check-updates"

// where ncu is the alias of npm check updates 
// u for update

// to update a package after running "npm-check-updates" run "ncu -u"
// "ncu -u" se update hua install nai hua "package .json mn wo latest version aa ja aa g  "
// BY  running npm i (jis command line se node modules install hota hain ) we can install the updated package

// the kaam og npm outdated and npm check-updates are same 


// -------------------------------------------------
// Dev dependencies ( developer dependency )
// -----------------------------------------------

// Application dependencies : 
        //    Are the dependencies are that dependencies in which our application is dependent . without them our app can not be run properly 

// Developer dependenies : 
        //  Are those dependencies that are required by developers for testing purposes  , for refacting and error finding etc

        // in order to specify a dev dependeny  supply flag  "--save-dev"
        // eg of dev dependency  : "  npm i jshint --save-dev"



// -------------------------------------------------
// Unstalling a package (dependency)
// -----------------------------------------------

// npm uninstall mongoose 
// npm un mongoose  



// -------------------------------------------------
// Working with global packages 
// -----------------------------------------------

// npm is an example pack its a command line tool we can run it from any folders 
// ng (angular cli to create angular project ) // also eg of -g  package 

// saary local package wali command line global ke lia bhi valid hain 

// npm i -g npm    (installs the latest version of npm globally )
// @2.1.4  = specific version installation 

// npm -g outdated 
// npm un -g 



// -------------------------------------------------
// Creating our own package
// -----------------------------------------------

// To create your own package 
// step 1  : make a folder for a package . And install package.json file using 
// npm init --yes
// step 2  :  make an index.js and to write diff methods use module.exports.multiply = function (a,b){ a+b } etc 

// step 3 :   npm adduser (to signup)   ; npm login (to login)
// logged in in npm  
// username = muhammad-ibrahim-khan
// password = 0554371574 

// step 4 :  then after login  (make sure you are in package/lib folder (folder publish ho g))  run  " npm publish "

// step 5 :  Hurray now you can install that package using npm anywhere after publishing by 
// npm i my-multiplier-lib

// in any project we can use it like this

const a = require('my-multiplier-lib');
const b =  a.mutiply(4,6);
console.log(b);


// -------------------------------------------------
// Updating  our own package
// -----------------------------------------------

// To update your package go to that lib folder then you cange version manually or by using npm like 
// npm version minor  
// npm version major 
// npm version patch
// then run npm publish again to apdate the version 



// __________________________________________________
//  Building restful APIs using express
// __________________________________________________


// What is restful services :
//    REST is just a pattern for making api . using this api you can access resources  like images , videos , post , text content and so on .

// www.nabiha.com/costumers  in the rest world we call this part (/costumers) as a resource we can expose our resources . all the operations on costumers such as creating a costumer or updaing a costumers is done by sending http request on that end point .


// What is express js :
        //   express gives our app a proper structure make our app more convinent 


// -------------------------------------------------
// Creating 1st express project and using .get method
// -----------------------------------------------

//  app.get() method is used to get the data from the database and display's it on the window using res.send() 

const express = require('express');
const app = express();

app.get('/',  (req,res)=> {
    res.send("hello mn database se aya hn ");
    
})

app.listen(3000,  ()=> {
    console.log("yes your server is running / listening on port 3000....")
    
})

// OUTPUT 

//hello mn database se aya hn ( On window screen )

// adding new app.get  does not make sense for the same path 

const express = require('express');
const { env } = require('process');
const { prototype } = require('./logger');
const app = express();


app.get('/', (req,res) =>{
    res.send([1,2,3,"nabiha :)"]);
    
});
//   / is the root window (home)
app.get('/',  (req,res)=> {
    res.send("hello mn database se aya hn ");  // ye does not make sense jo phalay likha gaya ha wo execute ho ja aa ga 

    
});

app.get('/api/courses', (req,res) =>{             // directed window /courses ke lia makhsoos 
    res.send([1,2,3,"nabiha :)"]);
    
});



app.listen(3000,  ()=> {
    console.log("yes your server is running / listening on port 3000....")
    
})


// -------------------------------------------------
// Nodemon 
// -----------------------------------------------

// jb bhi ham koi change krta hain index.js tou ham server ko on kr ke off krna prhta ha which is very annoying 

// What is nodemon :   (   npm i -g nodemon   )
    //    iski madad se  hme baar bar server on off nai krna pry ga bs hma 

    // wtite  "nodemon index.js"    instead of "node index.js"




// -------------------------------------------------
// Environment varable 
// -----------------------------------------------
         
// in real world we dont use 3000 as port because it can unavailble 
// use should set a env variable so in case of unavalibility we can change the port 

//PORT 
const port = process.env.port;

app.listen(post,()=>{
    console.log(`listening on port ${port}`);
    
})


// example 


const express = require('express');
const app = express();


app.get('/', (req,res) =>{
    res.send([1,2,3,"nabiha :)",4,6,7,8,4]);
    
});

app.get('/',  (req,res)=> {
    res.send("hello mn database se aya hn ");

    
});

// app.get('/api/courses', (req,res) =>{
//     res.send([1,2,3,"nabiha :)"]);
    
// });

// Port use krain gy to intract dynamically (apni mrzi se kuch bhi aa skta ha ya specity kr skta hain)

// if this is set we  use this    if not set then it automatically set 3000 
const port = process.env.PORT    || 3001;


app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on port ${port}....`)
    
})

//  To set port use the "set"  in the terminal to set the port 

// set PORT=5000 


// app.listen(process.env.PORT, (err) => {
//     if (err) {
//         return console.error(err);
//     }
//     return console.log(`server is listening on ${process.env.PORT || 3000}`);
// });

// PORT mn koi issue a that should be ressolved _____________



// -------------------------------------------------
// Route parameters
// -----------------------------------------------

const express = require('express');
const app = express();


// this route is for getting all courses 
app.get('/',  (req,res)=> {
    res.send(["english","urdu","islamiat"]);

    
});
//           /api/courses/1 
// this route is for getting a single course 
app.get('/api/courses/:CourseID',(req,res)=>{
    res.send(req.params.CourseID);   // out is on  
    // http://localhost:3001/api/courses/1    which is 1 on window screen  
    
})

const port = process.env.PORT     || 3001;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});


// Now imagine you are building a service for powering a blog 

const express = require('express');
const app = express();


// this route is for getting all courses 
app.get('/',  (req,res)=> {
    res.send(["english","urdu","islamiat"]);

    
});
//  by doing this we are getting all the posts of december 2030
app.get('/api/courses/:month/:year',(req,res)=>{
    res.send(req.params.month);   // output is on  
    // http://localhost:3001/api/12/2030    which is 12 on window screen
    // if  we changes it to res.send(req.prams)   
    //  output is  {"month":"12","year":"2030"}  
    
})

const port = process.env.PORT     || 3001;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});


// ___________Quary parameter : if we displays all posts of december 2030 and we want to sort them by their name then we can do that by using quary parameter ___

// it is optional 
// syntax / key val pairs  =   ?sortby=name 

const express = require('express');
const app = express();


// this route is for getting all courses 
app.get('/',  (req,res)=> {
    res.send(["english","urdu","islamiat"]);

    
});


app.get('/api/courses/:month/:year',(req,res)=>{
    res.send(req.query);  
    // http://localhost:3001/api/12/2030   
    // the out put is { } before setting the key val pairs ( ?sortby=name)

    // http://localhost:3001/api/courses/12/2030?sortby=name
    // the output is {"sortby":"name"}  after adding at the end  ( ?sortby=name)
    
})

const port = process.env.PORT     || 3001;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});


// -------------------------------------------------
// Handling http get request 
// -----------------------------------------------
// how ot get all courses and a single specified course from the database

const e = require('express');
const express = require('express');
const app = express();
// ye asal mn db.quary(select * for courses (err,courses)=>{ } ) keh skta hain 
const courses = [
    {id: 1 , course:"BSSE"},
    {id: 2 , course:"MCS"},
    {id: 3 , course:"BSIT"},
]

// where coureses == reult of db and is select * from courses 
app.get('/api/courses/:id/',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));
    // res.send(course);  
     // output is on window screen if 3 http://localhost:3001/api/courses/3
     //{"id":3,"course":"BSIT"}   // course with id 3 reterived

     // but what is the course was not found 
     // we can handle it with the help of 
     if (!course) {
        res.status(404).send("The course with that id does not exist");
        // if we type an invalid id lets say 6 on http://localhost:3001/api/courses/6
        // output is on window screen with res status 404 (Not Found) on console 
        //The course with that id does not exist
        
     }
     res.send(course);
     
})

// this route is for getting all courses 
app.get('/api/courses/',  (req,res)=> {
    
    res.send(courses);
    // output is on window screen http://localhost:3001/api/courses/
    //  [{"id":1,"course":"BSSE"},{"id":2,"course":"MCS"},{"id":3,"course":"BSIT"}] 
    // phir is array ko hm frontend mn app.map se display kr skty hain normally 

    
});




const port = process.env.PORT     || 3001;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});




// -------------------------------------------------
//  Handling HTTP post requet 
// -----------------------------------------------

// above code with app.post method 

const e = require('express');
const express = require('express');
const app = express();

// ye lagana prta ha to use req.body.course etc 
app.use(express.json());

// ye asal mn db.quary(select * for courses (err,courses)=>{ } ) keh skta hain 
const courses = [
    {id: 1 , course:"BSSE"},
    {id: 2 , course:"MCS"},
    {id: 3 , course:"BSIT"},
]


app.post('/api/courses',(req,res)=>{
    const Newcourse = 
      {   id : courses.length+1,
        course: req.body.course,   // course ye database column se lia gaya ha 
    
    }
    courses.push(Newcourse);
    res.send(Newcourse);
})




// where coureses == result of db and is select * from courses 
app.get('/api/courses/:id/',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));
    // res.send(course);  
     // output is on window screen if 3 http://localhost:3001/api/courses/3
     //{"id":3,"course":"BSIT"}   // course with id 3 reterived

     // but what is the course was not found 
     // we can handle it with the help of 
     if (!course) {
        res.status(404).send("The course with that id does not exist");
        // if we type an invalid id lets say 6 on http://localhost:3001/api/courses/6
        // output is on window screen with res status 404 (Not Found) on console 
        //The course with that id does not exist
        
     }
     res.send(course);
     
})

// this route is for getting all courses 
app.get('/api/courses/',  (req,res)=> {
    
    res.send(courses);
    // output is on window screen http://localhost:3001/api/courses/
    //  [{"id":1,"course":"BSSE"},{"id":2,"course":"MCS"},{"id":3,"course":"BSIT"}] 
    // phir is array ko hm frontend mn app.map se display kr skty hain normally 

    
});




const port = process.env.PORT     || 3001;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});



// -------------------------------------------------
//  Postman - to call http services
// -----------------------------------------------
// open postman on the web 

// if you want to test the .get method of the 
// post man se request maari aur shyd passed hahaha



// -------------------------------------------------
//  Input validation 
// -----------------------------------------------


// What if your client send null name .You should 1st validate that input first in the app.post function 

// ya phir use a node package called joi ( npm i joi ) - used to handle input validations


const Joi = require('joi');  // it is a class so J is capital
const express = require('express');
const app = express();

// ye lagana prta ha to use req.body.course etc 
app.use(express.json());

// ye asal mn db.quary(select * for courses (err,courses)=>{ } ) keh skta hain 
const courses = [
    {id: 1 , course:"BSSE"},
    {id: 2 , course:"MCS"},
    {id: 3 , course:"BSIT"},
]


app.post('/api/coursess/',(req,res)=>{
    const schema ={
        course: Joi.string()
        .min(3)
        // .max(6)
        .required()
    }
    // if it is validated then result will be result  and error will be null else result will be null error will be error 
    const result = Joi.validate(req.body,schema);
    

    console.log(result);
    
    if (result.error) {
        // req status 400 - which means bad request 
        res.status(400).send(result.error.details[0].message);  // ye reslt.error frontend pe ja rha ha now changing it to excess message  
        return;
        // * after send null json to postmna  ' "course" is required' // to the user

        // {
        //     "course":"s"
        
        // }
        // *   "course" length must be at least 3 characters long
    }

    // after runing through postman

    // OUTPUT 
//     // {
//   error: null,
//   value: { course: 'Badnabiha' },
//   then: [Function: then],
//   catch: [Function: catch]
// }


// and if we send an empty request then there will be a validation error
//  error: Error [ValidationError]: child "course" fails because ["course" is required]





    // if (!req.body.course || req.body.course.length < 3) {
    //     // req status 400 - which means bad request 
    //     req.status(400).send("Please enter a valid information");
    //     return;
        
    // }
    const Newcourse = 
      {   id : courses.length+1,
        course: req.body.course,   // course ye database column se lia gaya ha 
    
      };
    courses.push(Newcourse);
    res.send(Newcourse);
})




// where coureses == reult of db and is select * from courses 
app.get('/api/courses/:id/',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));
    // res.send(course);  
     // output is on window screen if 3 http://localhost:3001/api/courses/3
     //{"id":3,"course":"BSIT"}   // course with id 3 reterived

     // but what is the course was not found 
     // we can handle it with the help of 
     if (!course) {
        res.status(404).send("The course with that id does not exist");
        // if we type an invalid id lets say 6 on http://localhost:3001/api/courses/6
        // output is on window screen with res status 404 (Not Found) on console 
        //The course with that id does not exist
        
     }
     res.send(course);
     
})

// this route is for getting all courses 
app.get('/api/courses/',  (req,res)=> {
    
    res.send(courses);
    // output is on window screen http://localhost:3001/api/courses/
    //  [{"id":1,"course":"BSSE"},{"id":2,"course":"MCS"},{"id":3,"course":"BSIT"}] 
    // phir is array ko hm frontend mn app.map se display kr skty hain normally 

    
});




const port = process.env.PORT     || 3001;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});



// ---------------------------------------------------------
//  Handling HTTP put request -- final code of crud section 4 
// -----------------------------------------------------------
// Agar ye jo schema ha of joi for validation tou 2 jagah duplicate ho ja aa ga islia validtion ka aik function bna dia ta ka usa use kr pa aain dono . (refactoring => making the code more readable and maintable ,removing complexixity)

const Joi = require('joi');  // it is a class so J is capital
const express = require('express');
const app = express();

// ye lagana prta ha to use req.body.course etc 
app.use(express.json());

// ye asal mn db.quary(select * for courses (err,courses)=>{ } ) keh skta hain 
const courses = [
    {id: 1 , course:"BSSE"},
    {id: 2 , course:"MCS"},
    {id: 3 , course:"BSIT"},
]


function ValidateCourse(courses) {
    const schema ={
        course: Joi.string()
        .min(3)
        // .max(6)
        .required()
    }

    return Joi.validate(courses,schema);
    
}

// we have to pass the parameter of the course that you want to delete 
app.delete('/api/courses/:id',(req,res)=>{

    // Lookup for the course___ 
    // if not found  send res.send 404___
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    // res.send(course);  
     // output is on window screen if 3 http://localhost:3001/api/courses/3
     //{"id":3,"course":"BSIT"}   // course with id 3 reterived

     // but what is the course was not found 
     // we can handle it with the help of 
     if (!course) {
        res.status(404).send("The course with that id does not exist");
        return;
        // if we type an invalid id lets say 6 on http://localhost:3001/api/courses/6
        // output is on window screen with res status 404 (Not Found) on console 
        //The course with that id does not exist
        
     }

    // delete the course____
    // indexOf return the index of the course in the courses array 
    
    const index = courses.indexOf(course);
    // splice method is used to remove eleemnt from the courses array
    courses.splice(index,1);
    // Return ____
    res.send(course);

    
    // SUS____fixed 
    // // console.log(courses.length);
    // // if (courses.length==1) {
        
    //     res.send(course);
    // // }
})
//  OUTPUT OF THE DELETE METHOD USING POSTMAN
// URL :  http://localhost:3001/api/courses/10
// OUTPUT : The course with that id does not exist

// URL : http://localhost:3001/api/courses/3
// OUTPUT : Deleted course sent to the use as a  
// {
//     "id": 3,
//     "course": "BSIT"
// }


// After delete the course with certain id execute app.get to verify the result using postman

// URL : http://localhost:3001/api/courses/

//OUTPUT : 
// [
//     {
//         "id": 1,
//         "course": "BSSE"
//     },
//     {
//         "id": 2,
//         "course": "MCS"
//     }
// ]




//_________________________________________________________________________
// Output 
// URL: http://localhost:3001/api/courses/1

// script for new course = from frontend(Axios) now using postman
//
// {
//     "course":"FCPS"      
// }
// Now the courses updated in the db
// URL : 
// OUTPUT :
// [
//     {
//         "id": 1,
//         "course": "FCPS"
//     },
//     {
//         "id": 2,
//         "course": "MCS"
//     },
//     {
//         "id": 3,
//         "course": "BSIT"
//     },
//     {
//         "id": 4,
//         "course": "sdddsda"
//     }
// ]

app.put('/api/courses/:id',(req,res)=>{
    // Look up for the course if exist go to nes=xt step (utilization of get ig)
    // if not existed res error 404
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if (!course) {
        res.status(404).send("The course with that id does not exist");
            return;
        
     }



    // Validate 
    // if not valid then bad request 400

    // const schema ={
    //     course: Joi.string()
    //     .min(3)
    //     // .max(6)
    //     .required()
    // }
    // // if it is validated then result will be result  and error will be null else result will be null error will be error 
    // const result = Joi.validate(req.body,schema);



    // nOW USING ValidateCourse for validation 

    // const result = ValidateCourse(req.body);
    
    // Using object destructring feature we are accessing result.error we can directly access error using that feature like that code below
    
    const {error} = ValidateCourse(req.body);  // error = result.error

    // now pasting that new validation logic in post method 
    

    

    // console.log(result);
    
    if (error) {
        // req status 400 - which means bad request 
        res.status(400).send(error.details[0].message);  // ye reslt.error frontend pe ja rha ha now changing it to excess message  
        return;

    }

    

    // update 
    course.course= req.body.course;

    // return the updated course
    res.send(course);


})
//____________________________________________________________________

app.post('/api/courses/',(req,res)=>{

    const {error} = ValidateCourse(req.body);   
    
    if (error) {
        // req status 400 - which means bad request 
        res.status(400).send(error.details[0].message);  // ye reslt.error frontend pe ja rha ha now changing it to excess message  
        return;

    }
   
   
   //__________________poorana wala validation 
    // const schema ={
    //     course: Joi.string()
    //     .min(3)
    //     // .max(6)
    //     .required()
    // }
    // // if it is validated then result will be result  and error will be null else result will be null error will be error 
    // const result = Joi.validate(req.body,schema);
    

    // // console.log(result);
    
    // if (result.error) {
    //     // req status 400 - which means bad request 
    //     res.status(400).send(result.error.details[0].message);  // ye reslt.error frontend pe ja rha ha now changing it to excess message  
    //     return;
    //     // * after send null json to postmna  ' "course" is required' // to the user

    //     // {
    //     //     "course":"s"
        
    //     // }
    //     // *   "course" length must be at least 3 characters long
    // }
// ________
    // after runing through postman

    // OUTPUT 
//     // {
//   error: null,
//   value: { course: 'Badnabiha' },
//   then: [Function: then],
//   catch: [Function: catch]
// }


// and if we send an empty request then there will be a validation error
//  error: Error [ValidationError]: child "course" fails because ["course" is required]





    // if (!req.body.course || req.body.course.length < 3) {
    //     // req status 400 - which means bad request 
    //     req.status(400).send("Please enter a valid information");
    //     return;
        
    // }
    const Newcourse = 
      {   id : courses.length+1,
        course: req.body.course,   // course ye database column se lia gaya ha 
    
      };
    courses.push(Newcourse);
    res.send(Newcourse);
})




// where coureses == reult of db and is select * from courses 
app.get('/api/courses/:id/',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));
    // res.send(course);  
     // output is on window screen if 3 http://localhost:3001/api/courses/3
     //{"id":3,"course":"BSIT"}   // course with id 3 reterived

     // but what is the course was not found 
     // we can handle it with the help of 
     if (!course) {
        res.status(404).send("The course with that id does not exist");
        return;
        // if we type an invalid id lets say 6 on http://localhost:3001/api/courses/6
        // output is on window screen with res status 404 (Not Found) on console 
        //The course with that id does not exist
        
     }
     res.send(course);
     
})

// this route is for getting all courses 
app.get('/api/courses/',  (req,res)=> {
    
    res.send(courses);
    // output is on window screen http://localhost:3001/api/courses/
    //  [{"id":1,"course":"BSSE"},{"id":2,"course":"MCS"},{"id":3,"course":"BSIT"}] 
    // phir is array ko hm frontend mn app.map se display kr skty hain normally 

    
});




const port = process.env.PORT     || 3001;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});





// -------------------------------------------------
//  Handling HTTP delete request 
// -----------------------------------------------



const Joi = require('joi');  // it is a class so J is capital
const express = require('express');
const app = express();

// ye lagana prta ha to use req.body.course etc 
app.use(express.json());

// ye asal mn db.quary(select * for courses (err,courses)=>{ } ) keh skta hain 
const courses = [
    {id: 1 , course:"BSSE"},
    {id: 2 , course:"MCS"},
    {id: 3 , course:"BSIT"},
]


// we have to pass the parameter of the course that you want to delete 
app.delete('/api/courses/:id',(req,res)=>{

    // Lookup for the course___ 
    // if not found  send res.send 404___
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    // res.send(course);  
     // output is on window screen if 3 http://localhost:3001/api/courses/3
     //{"id":3,"course":"BSIT"}   // course with id 3 reterived

     // but what is the course was not found 
     // we can handle it with the help of 
     if (!course) {
        res.status(404).send("The course with that id does not exist");
        return;
        // if we type an invalid id lets say 6 on http://localhost:3001/api/courses/6
        // output is on window screen with res status 404 (Not Found) on console 
        //The course with that id does not exist
        
     }

    // delete the course____
    // indexOf return the index of the course in the courses array 
    
    const index = courses.indexOf(course);
    // splice method is used to remove eleemnt from the courses array
    courses.splice(index,1);
    // Return ____
    res.send(course);

    
    // SUS____fixed 
    // // console.log(courses.length);
    // // if (courses.length==1) {
        
    //     res.send(course);
    // // }
})
//  OUTPUT OF THE DELETE METHOD USING POSTMAN
// URL :  http://localhost:3001/api/courses/10
// OUTPUT : The course with that id does not exist

// URL : http://localhost:3001/api/courses/3
// OUTPUT : Deleted course sent to the use as a  
// {
//     "id": 3,
//     "course": "BSIT"
// }


// After delete the course with certain id execute app.get to verify the result using postman

// URL : http://localhost:3001/api/courses/

//OUTPUT : 
// [
//     {
//         "id": 1,
//         "course": "BSSE"
//     },
//     {
//         "id": 2,
//         "course": "MCS"
//     }
// ]



// put ko baad mn daikhta video 52
//_________________________________________________________________________
// app.put('/api/courses/:id',(req,res)=>{
//     // Look up for the course (utilization of get ig)
//     // if not existed res error 404
//     const course = courses.find(c=>c.id===parseInt(req.params.id));
//     if (!course) {
//         res.status(404).send("The course with that id does not exist");
            // return;
        
//      }



//     // Validate 
//     // if not valid then bad request 400

//     const schema ={
//         course: Joi.string()
//         .min(3)
//         // .max(6)
//         .required()
//     }
//     // if it is validated then result will be result  and error will be null else result will be null error will be error 
//     const result = Joi.validate(req.body,schema);
    

//     // console.log(result);
    
//     if (result.error) {
//         // req status 400 - which means bad request 
//         res.status(400).send(result.error.details[0].message);  // ye reslt.error frontend pe ja rha ha now changing it to excess message  
//         return;

//     }

    

//     // update 
//     // return the updated course 


// })
//____________________________________________________________________

app.post('/api/coursess/',(req,res)=>{
    const schema ={
        course: Joi.string()
        .min(3)
        // .max(6)
        .required()
    }
    // if it is validated then result will be result  and error will be null else result will be null error will be error 
    const result = Joi.validate(req.body,schema);
    

    // console.log(result);
    
    if (result.error) {
        // req status 400 - which means bad request 
        res.status(400).send(result.error.details[0].message);  // ye reslt.error frontend pe ja rha ha now changing it to excess message  
        return;
        // * after send null json to postmna  ' "course" is required' // to the user

        // {
        //     "course":"s"
        
        // }
        // *   "course" length must be at least 3 characters long
    }

    // after runing through postman

    // OUTPUT 
//     // {
//   error: null,
//   value: { course: 'Badnabiha' },
//   then: [Function: then],
//   catch: [Function: catch]
// }


// and if we send an empty request then there will be a validation error
//  error: Error [ValidationError]: child "course" fails because ["course" is required]





    // if (!req.body.course || req.body.course.length < 3) {
    //     // req status 400 - which means bad request 
    //     req.status(400).send("Please enter a valid information");
    //     return;
        
    // }
    const Newcourse = 
      {   id : courses.length+1,
        course: req.body.course,   // course ye database column se lia gaya ha 
    
      };
    courses.push(Newcourse);
    res.send(Newcourse);
})




// where coureses == reult of db and is select * from courses 
app.get('/api/courses/:id/',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));
    // res.send(course);  
     // output is on window screen if 3 http://localhost:3001/api/courses/3
     //{"id":3,"course":"BSIT"}   // course with id 3 reterived

     // but what is the course was not found 
     // we can handle it with the help of 
     if (!course) {
        res.status(404).send("The course with that id does not exist");
        return;
        // if we type an invalid id lets say 6 on http://localhost:3001/api/courses/6
        // output is on window screen with res status 404 (Not Found) on console 
        //The course with that id does not exist
        
     }
     res.send(course);
     
})

// this route is for getting all courses 
app.get('/api/courses/',  (req,res)=> {
    
    res.send(courses);
    // output is on window screen http://localhost:3001/api/courses/
    //  [{"id":1,"course":"BSSE"},{"id":2,"course":"MCS"},{"id":3,"course":"BSIT"}] 
    // phir is array ko hm frontend mn app.map se display kr skty hain normally 

    
});




const port = process.env.PORT     || 3001;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});




//__________________________________________________________________________________

// ADVANCED TOPICS OF EXPRESS -- BUT DO VIDLY PROJECT 1st 

//_________________________________________________________________________________

// Middleware 
// Configuration
// debugging 
// Templating enginess


//------------------------------
// Middleware 
//-------------------------------

// A middleware function :
//            It is basically a function that takes a req object and either returns the response to the client or passes control to another middleware function 

// Examples of that func are 

app.use(express.json()); // this middleware function returns a json object, the job of this middleware function is to read the request and if there is a json object in the body of the request then it will parse the body of the request into a json object and then it will set req.body property

app.get('/api/courses/:id/',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));
     if (!course) {
        res.status(404).send("The course with that id does not exist");
        return;
        
     }
     res.send(course);
     
})

// Express has a few builtin middleware function 
// We can also built costum middleware function that we can put in the front of over request processing pipeline and with the help of cutom middleware functions we can do cross cutting concerns logging , authentaction , authorization ,security and so on .. 

//Cross-cutting concerns are parts of a program that rely on or must affect many other parts of the system. They form the basis for the development of aspects. Such cross-cutting concerns do not fit cleanly into object-oriented programming or procedural programming.

// So express application is just a bunch of middleware functions 


//------------------------------
// creating our custom middleware function
//-------------------------------


const Joi = require('joi');  // it is a class so J is capital
const express = require('express');
const authencation = require('../Building restful APIs using express/middleware/authentication');
const app = express();

// ye lagana prta ha to use req.body.course etc 
app.use(express.json());

app.use(function(req,res,next){  //  where next reference to the next middleware function 
    console.log("Logging");//  agr sirf ye func add karain gy tou it will hang coz of the absense of next http://localhost:3001/api/courses/
    next()   // passing work to next middleware function
})

// after adding authencation
app.use(function(req,res,next){  //  where next reference to the next middleware function 
    console.log("Authencating"); 
})

// OUTPUT on TERMINAL  
// Logging
// Authencating       
// but still hangs coz of the absense of next 

// ye asal mn db.quary(select * for courses (err,courses)=>{ } ) keh skta hain 
const courses = [
    {id: 1 , course:"BSSE"},
    {id: 2 , course:"MCS"},
    {id: 3 , course:"BSIT"},
]





// where coureses == reult of db and is select * from courses 
app.get('/api/courses/:id/',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));

     if (!course) {
        res.status(404).send("The course with that id does not exist");
        return;
   
        
     }
     res.send(course);
     
})

// this route is for getting all courses 
app.get('/api/courses/',  (req,res)=> {
    
    res.send(courses);
    // output is on window screen http://localhost:3001/api/courses/
    //  [{"id":1,"course":"BSSE"},{"id":2,"course":"MCS"},{"id":3,"course":"BSIT"}] 
    // phir is array ko hm frontend mn app.map se display kr skty hain normally 

    
});




const port = process.env.PORT     || 3001;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});

// ___________________________________
// Creating separate files for them 

// indes.js-------

const Joi = require('joi');  // it is a class so J is capital
const express = require('express');
const logger = require('./logger');
const authentication = require('./authentication')
const app = express();

// ye lagana prta ha to use req.body.course etc 
app.use(express.json());  // it parses the body of the request and if there is a json object it will populate  req.body  property


app.use(logger);

app.use(authentication);

// OUTPUT on TERMINAL  
// Logging
// Authencating       
// but still hangs coz of the absense of next 

// ye asal mn db.quary(select * for courses (err,courses)=>{ } ) keh skta hain


function ValidateCourse(courses) {
    const schema ={
        course: Joi.string()
        .min(3)
        // .max(6)
        .required()
    }

    return Joi.validate(courses,schema);
    
}

const courses = [
    {id: 1 , course:"BSSE"},
    {id: 2 , course:"MCS"},
    {id: 3 , course:"BSIT"},
]





// where coureses == reult of db and is select * from courses 
app.get('/api/courses/:id/',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));

     if (!course) {
        res.status(404).send("The course with that id does not exist");
        return;
   
        
     }
     res.send(course);
     
})

// this route is for getting all courses 
app.get('/api/courses/',  (req,res)=> {
    
    res.send(courses);
    // output is on window screen http://localhost:3001/api/courses/
    //  [{"id":1,"course":"BSSE"},{"id":2,"course":"MCS"},{"id":3,"course":"BSIT"}] 
    // phir is array ko hm frontend mn app.map se display kr skty hain normally 

    
});


app.post('/api/courses/',(req,res)=>{

    const {error} = ValidateCourse(req.body);   
    
    if (error) {
        // req status 400 - which means bad request 
        res.status(400).send(error.details[0].message);  // ye reslt.error frontend pe ja rha ha now changing it to excess message  
        return;

    }
   
   
   
    const Newcourse = 
      {   id : courses.length+1,
        course: req.body.course,   // course ye database column se lia gaya ha 
    
      };
    courses.push(Newcourse);
    res.send(Newcourse);
})






const port = process.env.PORT     || 3001;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});




//logger.js-------

function log(req,res,next){  //  where next reference to the next middleware function 
    console.log("Logging");//  agr sirf ye func add karain gy tou it will hang coz of the absense of next http://localhost:3001/api/courses/
    next()   // passing work to next middleware function
}

module.exports = log;


// authencation.js------

function authencation(req,res,next){  //  where next reference to the next middleware function 
    console.log("Authencating"); 
}

module.exports = authencation;


//------------------------------
// Builtin middleware functions
//-------------------------------
 // These are the buildin milldeware function in express

app.use(express.urlencoded());   // key=value&key=value old fashioned 
app.use(express.static());  // we used that to serve static files 
app.use(express.json());  //  // it parses the body of the request and if there is a json object it will populate  req.body  property

// ---- Using them
const Joi = require('joi');  // it is a class so J is capital
const express = require('express');
const logger = require('./logger');
const authentication = require('./authentication')
const app = express();

// ye lagana prta ha to use req.body.course etc 
app.use(express.json());  // it parses the body of the request and if there is a json object it will populate  req.body  property
app.use(express.urlencoded({extended:true}));  // with this exteneded object we can send array and complex objects using url encoded format
// new course is added using 
// URL (autogrnerated) : http://localhost:3001/api/courses/?course=nabiha

// key val pairs  |course  |  nabiha|  at x.www-urlencoded  at postman


app.use(express.static('public'));  // we used that to serve static files //iske parameter folder ka naam

//OUTPUT at
// URL : http://localhost:3001/readme.txt
// content of the readme.txt on window screen (hello i am ibrahim)

// URL : http://localhost:3001/nature.jpg
// picture displayed on window screen

// app.use(logger);

// app.use(authentication);

// OUTPUT on TERMINAL  
// Logging
// Authencating       
// but still hangs coz of the absense of next 

// ye asal mn db.quary(select * for courses (err,courses)=>{ } ) keh skta hain


function ValidateCourse(courses) {
    const schema ={
        course: Joi.string()
        .min(3)
        // .max(6)
        .required()
    }

    return Joi.validate(courses,schema);
    
}

const courses = [
    {id: 1 , course:"BSSE"},
    {id: 2 , course:"MCS"},
    {id: 3 , course:"BSIT"},
]





// where coureses == reult of db and is select * from courses 
app.get('/api/courses/:id/',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));

     if (!course) {
        res.status(404).send("The course with that id does not exist");
        return;
   
        
     }
     res.send(course);
     
})

// this route is for getting all courses 
app.get('/api/courses/',  (req,res)=> {
    
    res.send(courses);
    // output is on window screen http://localhost:3001/api/courses/
    //  [{"id":1,"course":"BSSE"},{"id":2,"course":"MCS"},{"id":3,"course":"BSIT"}] 
    // phir is array ko hm frontend mn app.map se display kr skty hain normally 

    
});


app.post('/api/courses/',(req,res)=>{

    const {error} = ValidateCourse(req.body);   
    
    if (error) {
        // req status 400 - which means bad request 
        res.status(400).send(error.details[0].message);  // ye reslt.error frontend pe ja rha ha now changing it to excess message  
        return;

    }
   
   
   
    const Newcourse = 
      {   id : courses.length+1,
        course: req.body.course,   // course ye database column se lia gaya ha 
    
      };
    courses.push(Newcourse);
    res.send(Newcourse);
})






const port = process.env.PORT     || 3001;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});


//-------------------------------------------------

// Third party middleware functions 

//-------------------------------------------------

// Express ha alot of third party middleware functons which does not mean you have to use them all . use them when they are necessary ciz using alot of middleware can slowdown your request processing  


// goto expressjs.com -> resourses -> middleware (and here is the list of all middleware functions ) 

// what is cors middleware function __?


// some   example of custom middleware by mosh are
//  * helmat 
//  * morgan


const helmet = require('helmet');  // Helps secure your apps by setting various HTTP headers.
var morgan = require('morgan');  // 	HTTP request logger.

const Joi = require('joi');  // it is a class so J is capital
const express = require('express');
const logger = require('./logger');
const authentication = require('./authentication')

const app = express();


// ye lagana prta ha to use req.body.course etc 
app.use(express.json());  // it parses the body of the request and if there is a json object it will populate  req.body  property
// app.use(express.urlencoded({extended:true}));  // with this exteneded object we can send array and comlex objects using url encoded format
// new course is added using 
// URL (autogrnerated) : http://localhost:3001/api/courses/?course=nabiha



app.use(express.static('public'));  // we used that to serve static files //iske parameter folder ka naam

//OUTPUT at
// URL : http://localhost:3001/readme.txt
// content of the readme.txt on window screen (hello i am ibrahim)

// URL : http://localhost:3001/nature.jpg
// picture displayed on window screen

// app.use(logger);

// app.use(authentication);

// OUTPUT on TERMINAL  
// Logging
// Authencating       
// but still hangs coz of the absense of next 

// ye asal mn db.quary(select * for courses (err,courses)=>{ } ) keh skta hain

// key val pairs  course    nabiha  at x.www-urlencoded  at postman


app.use =( helmet());  
// documentataion of helmet  https://github.com/helmetjs/helmet

// pata nai kiyon nia kaam kr rha _____________? 
// should fix in night 
app.use = (morgan('dev'));  //  (iske andar different format rakh skty hain ) ye hme jb koi testing etc krni hoti ha before launching our app //ise use krna
// documentation of morgran http://expressjs.com/en/resources/middleware/morgan.html

// USE : Every time when you send request to the server it will be logger on the console by default but you can also configure it to write it on the log file 



function ValidateCourse(courses) {
    const schema ={
        course: Joi.string()
        .min(3)
        // .max(6)
        .required()
    }

    return Joi.validate(courses,schema);
    
}

const courses = [
    {id: 1 , course:"BSSE"},
    {id: 2 , course:"MCS"},
    {id: 3 , course:"BSIT"},
]





// where coureses == reult of db and is select * from courses 
app.get('/api/courses/:id/',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));

     if (!course) {
        res.status(404).send("The course with that id does not exist");
        return;
   
        
     }
     res.send(course);
     
})

// this route is for getting all courses 
app.get('/api/courses/',  (req,res)=> {
    
    res.send(courses);
    // output is on window screen http://localhost:3001/api/courses/
    //  [{"id":1,"course":"BSSE"},{"id":2,"course":"MCS"},{"id":3,"course":"BSIT"}] 
    // phir is array ko hm frontend mn app.map se display kr skty hain normally 

    
});


app.post('/api/courses/',(req,res)=>{

    const {error} = ValidateCourse(req.body);   
    
    if (error) {
        // req status 400 - which means bad request 
        res.status(400).send(error.details[0].message);  // ye reslt.error frontend pe ja rha ha now changing it to excess message  
        return;
        
    }
   
   
   
    const Newcourse = 
      {   id : courses.length+1,
        course: req.body.course,   // course ye database column se lia gaya ha 
    
      };
    courses.push(Newcourse);
    res.send(Newcourse);
})






const port = process.env.PORT     || 3002;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});


//-------------------------------------------

// Envirnments 

//-------------------------------------------

// In node we can specify that our development environment and production env
// if we want to only some packages that only include in dev env like morgan



// $env:NODE_ENV=production   ___________________ ?? issue should be fixed
//  / HURRAY PORT AND ENV MASLA FIXED 
//  $env:NODE_ENV='production'   // node_env istarha 
// For Command Prompt: set PORT=5000
// For Power Shell: $env:PORT=5000
// For Bash (Windows): export PORT=5000


const helmet = require('helmet');  // Helps secure your apps by setting various HTTP headers.
const morgan = require('morgan');  // 	HTTP request logger.
const Joi = require('joi');  // it is a class so J is capital
const express = require('express');
const logger = require('./logger');
const authentication = require('./authentication')
const app = express();

// setting the environment variable
// it will return undefined 
console.log( `Node_ENV : ${process.env.Node_ENV}` );  // we can set this from outside we can st this for development to testing to staging orproduction

// it will return environment to development by default
// app.get('env') // this method internally uses  thhi environmet variable (Node_ENV) to detect the current environment  
// if this variable is not set then it will return development by default
console.log(`app : ${app.get('env')}`);


// we can use some packages for development environment like this


// ye lagana prta ha to use req.body.course etc 
app.use(express.json());  // it parses the body of the request and if there is a 
app.use(express.urlencoded({extended:true}));  // with this exteneded object we can 
app.use(express.static('public'));  // we used that to serve static files //iske 

app.use(logger);
// app.use = (morgan('tiny'));  //  (iske andar different format rakh skty hain ) ye hme jb koi testing etc krni hoti ha before launching our app //ise use krna

// ye walay packages for development environment 
if (app.get('env')=== "development") {
    console.log("morgan enabeled.....")
    app.use(morgan('tiny'));  // msla fixed shyd decleration mn issue tha 
    
    
}

app.use =(helmet());  
// app.use(authentication);

// OUTPUT on TERMINAL  
// Logging
// Authencating       
// but still hangs coz of the absense of next 




// documentataion of helmet  https://github.com/helmetjs/helmet

// pata nai kiyon nia kaam kr rha  fixed _____________
// should fix in night === fixed
// documentation of morgran http://expressjs.com/en/resources/middleware/morgan.html

// USE : Every time when you send request to the server it will be log on the console by default but you can also configure it to write it on the log file 



function ValidateCourse(courses) {
    const schema ={
        course: Joi.string()
        .min(3)
        // .max(6)
        .required()
    }

    return Joi.validate(courses,schema);
    
}

const courses = [
    {id: 1 , course:"BSSE"},
    {id: 2 , course:"MCS"},
    {id: 3 , course:"BSIT"},
]





// where coureses == reult of db and is select * from courses 
app.get('/api/courses/:id/',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));

     if (!course) {
        res.status(404).send("The course with that id does not exist");
        return;
   
        
     }
     res.send(course);
     
})

// this route is for getting all courses 
app.get('/api/courses/',  (req,res)=> {
    
    res.send(courses);
    // output is on window screen http://localhost:3001/api/courses/
    //  [{"id":1,"course":"BSSE"},{"id":2,"course":"MCS"},{"id":3,"course":"BSIT"}] 
    // phir is array ko hm frontend mn app.map se display kr skty hain normally 

    
});


app.post('/api/courses/',(req,res)=>{

    const {error} = ValidateCourse(req.body);   
    
    if (error) {
        // req status 400 - which means bad request 
        res.status(400).send(error.details[0].message);  // ye reslt.error frontend pe ja rha ha now changing it to excess message  
        return;
        
    }
   
   
   
    const Newcourse = 
      {   id : courses.length+1,
        course: req.body.course,   // course ye database column se lia gaya ha 
    
      };
    courses.push(Newcourse);
    res.send(Newcourse);
})






const port = process.env.PORT     || 3002;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});



//-----------------------------------------------

// CONFIGURATION 

//----------------------------------------------


// Configuration sdettings -> and override tese setting for each environment 
// ie development and production  . for example i dev environment you have different database and mail server 

// MOST popular package for configuration  is rc  https://www.npmjs.com/package/rc

// BUT we are using different one which is config eacy to use 
//https://www.npmjs.com/package/config  // mosh only teach the basics to learn more about this package visit that documentation 

// NOW USING IT BY 
// * CREATING A FOLDER NAMER : config 
// * created 3 files .json  default development and production and define their configuration   
// * In indes.js const require kr  ke load congfig  


// In custom-environment-variables.json we only have th emapping the mapping of our configuration settings  to environment variables to save passwords etc 

//CAUTION 
// You shold not store the config secrets in that json files like passwords of db and mail . coz they are visible to any source control repository

// So we should save the password and etc in the environment variables  $env:exppass=1234  like this 

const config = require('config');

const helmet = require('helmet');  // Helps secure your apps by setting various HTTP headers.
const morgan = require('morgan');  // 	HTTP request logger.
const Joi = require('joi');  // it is a class so J is capital
const express = require('express');
const logger = require('./logger');
const authentication = require('./authentication')
const app = express();


// CONFIGURATION 

console.log(` APP NAME : ${config.get('name')}`)
console.log(` Mail host : ${config.get('mail.host')}`)
console.log(` Mail password : ${config.get('mail.password')}`)
// NOW BY setting nod_env to development then development wali config follow ki ja aa gi 
// and by setting node_env to production then production wali .json follow ki ja aa gi 



// setting the environment variable
// it will return undefined 
// console.log( `Node_ENV : ${process.env.Node_ENV}` );__________________  // we can set this from outside we can st this for development to testing to staging orproduction

// it will return environment to development by default
// app.get('env') // this method internally uses  thhi environmet variable (Node_ENV) to detect the current environment  
// if this variable is not set then it will return development by default
// console.log(`app : ${app.get('env')}`);___________________________


// we can use some packages for development environment like this


// ye lagana prta ha to use req.body.course etc 
app.use(express.json());  // it parses the body of the request and if there is a 
app.use(express.urlencoded({extended:true}));  // with this exteneded object we can 
app.use(express.static('public'));  // we used that to serve static files //iske 

app.use(logger);
// app.use = (morgan('tiny'));  //  (iske andar different format rakh skty hain ) ye hme jb koi testing etc krni hoti ha before launching our app //ise use krna

// ye walay packages for development environment 
if (app.get('env')=== "development") {
    console.log("morgan enabeled.....")
    app.use(morgan('tiny'));  // msla fixed shyd decleration mn issue tha 
    
    
}

app.use =(helmet());  
// app.use(authentication);

// OUTPUT on TERMINAL  
// Logging
// Authencating       
// but still hangs coz of the absense of next 




// documentataion of helmet  https://github.com/helmetjs/helmet

// pata nai kiyon nia kaam kr rha _____________? 
// should fix in night 
// documentation of morgran http://expressjs.com/en/resources/middleware/morgan.html

// USE : Every time when you send request to the server it will be log on the console by default but you can also configure it to write it on the log file 



function ValidateCourse(courses) {
    const schema ={
        course: Joi.string()
        .min(3)
        // .max(6)
        .required()
    }

    return Joi.validate(courses,schema);
    
}

const courses = [
    {id: 1 , course:"BSSE"},
    {id: 2 , course:"MCS"},
    {id: 3 , course:"BSIT"},
]





// where coureses == reult of db and is select * from courses 
app.get('/api/courses/:id/',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));

     if (!course) {
        res.status(404).send("The course with that id does not exist");
        return;
   
        
     }
     res.send(course);
     
})

// this route is for getting all courses 
app.get('/api/courses/',  (req,res)=> {
    
    res.send(courses);
    // output is on window screen http://localhost:3001/api/courses/
    //  [{"id":1,"course":"BSSE"},{"id":2,"course":"MCS"},{"id":3,"course":"BSIT"}] 
    // phir is array ko hm frontend mn app.map se display kr skty hain normally 

    
});


app.post('/api/courses/',(req,res)=>{

    const {error} = ValidateCourse(req.body);   
    
    if (error) {
        // req status 400 - which means bad request 
        res.status(400).send(error.details[0].message);  // ye reslt.error frontend pe ja rha ha now changing it to excess message  
        return;
        
    }
   
   
   
    const Newcourse = 
      {   id : courses.length+1,
        course: req.body.course,   // course ye database column se lia gaya ha 
    
      };
    courses.push(Newcourse);
    res.send(Newcourse);
})






const port = process.env.PORT     || 3002;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});

//----------------------------------------------

// DEBUGGING 

//------------------------------------------------

// In simple javascript we debug using console.log() yaha aya phir remove phir comment . this approach is very tedious for the puspose of debugging use use debug package in node js

// npm i debug 
// then we can debug in our app by 

// require('debug') (app:startup)
// require('debug') this require function a fucntion  so we called this fuction and give it argument and this argument is an arbitrary anmespace(app:startup) So, when we called that fuction with this argument we get a fuction for writing debuggign messages in this messages


// perhaps we can also write debug function  for debugging by  require('debug')(app:db) 
// require('debug') this require function returns a function so we called this fuction and give it an argument the rgument is n arbitrary namespace that we define for debugging 
//  require('debug')(app:db) and this will return a debugging function 
//  then we store it in cosnt for debugging 



// We write debugging messages in our files
// then now  in console we declare an environment variable for debugging like this  
// $env:DEBUG='app:startup'

// then in console they will appear like this  
//   app:startup morgan enabeled... +0ms

// DEBUGGING FOR

// 1. single namespace 
//$env:DEBUG='app:startup'

// 2. for multiple namespaces
// $env:DEBUG='app:startup,app:db'

// 3. for all namespaces 
//$env:DEBUG='*'      //wild card 


// $env:DEBUG='app:startup' nodemon indes.js  shortcut 

const config = require('config');
const startupDebugger = require('debug')('app:startup'); // we can use use environment variable to enable and disable debugging we can also determine the level of debugging we wanna see maybe we are working with our database problem perhaps we only want to see debugging related to the database 
// debugging funcfor db
const DebuggerDB = require('debug')('app:db'); 
console.log(` ye ha debugger val : ${process.env.DEBUG}`)
const helmet = require('helmet');  // Helps secure your apps by setting various HTTP headers.
const morgan = require('morgan');  // 	HTTP request logger.
const Joi = require('joi');  // it is a class so J is capital
const express = require('express');
const logger = require('./logger');
const authentication = require('./authentication')
const app = express();


// CONFIGURATION 

console.log(` APP NAME : ${config.get('name')}`)
console.log(` Mail host : ${config.get('mail.host')}`)
console.log(` Mail password : ${config.get('mail.password')}`)
// NOW BY setting nod_env to development then development wali config follow ki ja aa gi 
// and by setting node_env to production then production wali .json follow ki ja aa gi 



// setting the environment variable
// it will return undefined 
// console.log( `Node_ENV : ${process.env.Node_ENV}` );__________________  // we can set this from outside we can st this for development to testing to staging orproduction

// it will return environment to development by default
// app.get('env') // this method internally uses  thhi environmet variable (Node_ENV) to detect the current environment  
// if this variable is not set then it will return development by default
// console.log(`app : ${app.get('env')}`);___________________________


// we can use some packages for development environment like this


// ye lagana prta ha to use req.body.course etc 
app.use(express.json());  // it parses the body of the request and if there is a 
app.use(express.urlencoded({extended:true}));  // with this exteneded object we can 
app.use(express.static('public'));  // we used that to serve static files //iske 

app.use(logger);
// app.use = (morgan('tiny'));  //  (iske andar different format rakh skty hain ) ye hme jb koi testing etc krni hoti ha before launching our app //ise use krna

// ye walay packages for development environment 
if (app.get('env')=== "development") {
    // Now using debugger instead console.log()
    // startupDebugger(console.log("morgan enabeled"));
    startupDebugger('morgan enabeled...');
    // console.log("morgan enabeled.....")
    app.use(morgan('tiny')); 
     
    
    
}
        

// db debugger 
DebuggerDB('connected with database')


app.use =(helmet());  
// app.use(authentication);

// OUTPUT on TERMINAL  
// Logging
// Authencating       
// but still hangs coz of the absense of next 




// documentataion of helmet  https://github.com/helmetjs/helmet

// pata nai kiyon nia kaam kr rha _____________? 
// should fix in night 
// documentation of morgran http://expressjs.com/en/resources/middleware/morgan.html

// USE : Every time when you send request to the server it will be log on the console by default but you can also configure it to write it on the log file 



function ValidateCourse(courses) {
    const schema ={
        course: Joi.string()
        .min(3)
        // .max(6)
        .required()
    }

    return Joi.validate(courses,schema);
    
}

const courses = [
    {id: 1 , course:"BSSE"},
    {id: 2 , course:"MCS"},
    {id: 3 , course:"BSIT"},
]





// where coureses == reult of db and is select * from courses 
app.get('/api/courses/:id/',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));

     if (!course) {
        res.status(404).send("The course with that id does not exist");
        return;
   
        
     }
     res.send(course);
     
})

// this route is for getting all courses 
app.get('/api/courses/',  (req,res)=> {
    
    res.send(courses);
    // output is on window screen http://localhost:3001/api/courses/
    //  [{"id":1,"course":"BSSE"},{"id":2,"course":"MCS"},{"id":3,"course":"BSIT"}] 
    // phir is array ko hm frontend mn app.map se display kr skty hain normally 

    
});


app.post('/api/courses/',(req,res)=>{

    const {error} = ValidateCourse(req.body);   
    
    if (error) {
        // req status 400 - which means bad request 
        res.status(400).send(error.details[0].message);  // ye reslt.error frontend pe ja rha ha now changing it to excess message  
        return;
        
    }
   
   
   
    const Newcourse = 
      {   id : courses.length+1,
        course: req.body.course,   // course ye database column se lia gaya ha 
    
      };
    courses.push(Newcourse);
    res.send(Newcourse);
})






const port = process.env.PORT     || 3002;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});







// In the real world we does not define multiple debugging function in same file we can simplify coz for simplicity we only write single function. 


const config = require('config');
const debug = require('debug')('app:debug'); // we can use use environment variable to enable and disable debugging we can also determine the level of debugging we wanna see maybe we are working with our database problem perhaps we only want to see debugging related to the database 
// debugging funcfor db
// const startupDebugger=require('debug)('app:startup');
// const DebuggerDB = require('debug')('app:db'); 
console.log(` ye ha debugger val : ${process.env.DEBUG}`)
const helmet = require('helmet');  // Helps secure your apps by setting various HTTP headers.
const morgan = require('morgan');  // 	HTTP request logger.
const Joi = require('joi');  // it is a class so J is capital
const express = require('express');
const logger = require('./logger');
const authentication = require('./authentication')
const app = express();


// CONFIGURATION 

console.log(` APP NAME : ${config.get('name')}`)
console.log(` Mail host : ${config.get('mail.host')}`)
console.log(` Mail password : ${config.get('mail.password')}`)
// NOW BY setting nod_env to development then development wali config follow ki ja aa gi 
// and by setting node_env to production then production wali .json follow ki ja aa gi 



// setting the environment variable
// it will return undefined 
// console.log( `Node_ENV : ${process.env.Node_ENV}` );__________________  // we can set this from outside we can st this for development to testing to staging orproduction

// it will return environment to development by default
// app.get('env') // this method internally uses  thhi environmet variable (Node_ENV) to detect the current environment  
// if this variable is not set then it will return development by default
// console.log(`app : ${app.get('env')}`);___________________________


// we can use some packages for development environment like this


// ye lagana prta ha to use req.body.course etc 
app.use(express.json());  // it parses the body of the request and if there is a 
app.use(express.urlencoded({extended:true}));  // with this exteneded object we can 
app.use(express.static('public'));  // we used that to serve static files //iske 

app.use(logger);
// app.use = (morgan('tiny'));  //  (iske andar different format rakh skty hain ) ye hme jb koi testing etc krni hoti ha before launching our app //ise use krna

// ye walay packages for development environment 
if (app.get('env')=== "development") {
    // Now using debugger instead console.log()
    // startupDebugger(console.log("morgan enabeled"));
    debug('morgan enabeled...');
    // console.log("morgan enabeled.....")
    app.use(morgan('tiny')); 
     
    
    
}
        

// db debugger 
// DebuggerDB('connected with database')


app.use =(helmet());  
// app.use(authentication);

// OUTPUT on TERMINAL  
// Logging
// Authencating       
// but still hangs coz of the absense of next 




// documentataion of helmet  https://github.com/helmetjs/helmet

// pata nai kiyon nia kaam kr rha _____________? 
// should fix in night 
// documentation of morgran http://expressjs.com/en/resources/middleware/morgan.html

// USE : Every time when you send request to the server it will be log on the console by default but you can also configure it to write it on the log file 



function ValidateCourse(courses) {
    const schema ={
        course: Joi.string()
        .min(3)
        // .max(6)
        .required()
    }

    return Joi.validate(courses,schema);
    
}

const courses = [
    {id: 1 , course:"BSSE"},
    {id: 2 , course:"MCS"},
    {id: 3 , course:"BSIT"},
]





// where coureses == reult of db and is select * from courses 
app.get('/api/courses/:id/',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));

     if (!course) {
        res.status(404).send("The course with that id does not exist");
        return;
   
        
     }
     res.send(course);
     
})

// this route is for getting all courses 
app.get('/api/courses/',  (req,res)=> {
    
    res.send(courses);
    // output is on window screen http://localhost:3001/api/courses/
    //  [{"id":1,"course":"BSSE"},{"id":2,"course":"MCS"},{"id":3,"course":"BSIT"}] 
    // phir is array ko hm frontend mn app.map se display kr skty hain normally 

    
});


app.post('/api/courses/',(req,res)=>{

    const {error} = ValidateCourse(req.body);   
    
    if (error) {
        // req status 400 - which means bad request 
        res.status(400).send(error.details[0].message);  // ye reslt.error frontend pe ja rha ha now changing it to excess message  
        return;
        
    }
   
   
   
    const Newcourse = 
      {   id : courses.length+1,
        course: req.body.course,   // course ye database column se lia gaya ha 
    
      };
    courses.push(Newcourse);
    res.send(Newcourse);
})






const port = process.env.PORT     || 3002;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});

//------------------------------------------------------------

// Templating engines 

//------------------------------------------------------------

// In our endpoints we return a json objects in response to the clients however sometimes we need to send html arkup to client 

// pug
// mustache
// EJS


// So we are using pug this time : npm i pug

//  NOW  WE need to set  view engine for our application 

app.set('view engine','pug')

// then make a folder folder views -> make a response file with any.pug 
// we can get that using res.render()

// following is the code example 

// in view folder file index.pug 

html 

  head 
    title=title 
  body 
   h1=firstheading 



   // indes.js 

   const config = require('config');
const debug = require('debug')('app:debug'); // we can use use environment variable to enable and disable debugging we can also determine the level of debugging we wanna see maybe we are working with our database problem perhaps we only want to see debugging related to the database 
// debugging funcfor db
// const startupDebugger=require('debug)('app:startup');
// const DebuggerDB = require('debug')('app:db'); 
console.log(` ye ha debugger val : ${process.env.DEBUG}`)
const helmet = require('helmet');  // Helps secure your apps by setting various HTTP headers.
const morgan = require('morgan');  // 	HTTP request logger.
const Joi = require('joi');  // it is a class so J is capital
const express = require('express');
const logger = require('./logger');
const authentication = require('./authentication')
const app = express();

// NOW  WE need to set  view engine for our application 
app.set('view engine','pug');

// Now we can send that pug html to the client using 
// res.render(view name (file name in the view folder ),{ for parameter that we define in template})


// So,  res.render('index',{ title:"nabiha", firstheading:"i am ibrahim"})

// now using it in below get method to send html response




// CONFIGURATION 

// console.log(` APP NAME : ${config.get('name')}`)
// console.log(` Mail host : ${config.get('mail.host')}`)
// console.log(` Mail password : ${config.get('mail.password')}`)
// NOW BY setting nod_env to development then development wali config follow ki ja aa gi 
// and by setting node_env to production then production wali .json follow ki ja aa gi 



// setting the environment variable
// it will return undefined 
// console.log( `Node_ENV : ${process.env.Node_ENV}` );__________________  // we can set this from outside we can st this for development to testing to staging orproduction

// it will return environment to development by default
// app.get('env') // this method internally uses  thhi environmet variable (Node_ENV) to detect the current environment  
// if this variable is not set then it will return development by default
// console.log(`app : ${app.get('env')}`);___________________________


// we can use some packages for development environment like this
// ye lagana prta ha to use req.body.course etc 
app.use(express.json());  // it parses the body of the request and if there is a 
app.use(express.urlencoded({extended:true}));  // with this exteneded object we can 
app.use(express.static('public'));  // we used that to serve static files //iske 

app.use(logger);
// app.use = (morgan('tiny'));  //  (iske andar different format rakh skty hain ) ye hme jb koi testing etc krni hoti ha before launching our app //ise use krna

// ye walay packages for development environment 
if (app.get('env')=== "development") {
    // Now using debugger instead console.log()
    // startupDebugger(console.log("morgan enabeled"));
    debug('morgan enabeled...');
    // console.log("morgan enabeled.....")
    app.use(morgan('tiny')); 
     
    
    
}
        

// db debugger 
// DebuggerDB('connected with database')


app.use =(helmet());  
// app.use(authentication);

// OUTPUT on TERMINAL  
// Logging
// Authencating       
// but still hangs coz of the absense of next 




// documentataion of helmet  https://github.com/helmetjs/helmet

// pata nai kiyon nia kaam kr rha _____________? 
// should fix in night 
// documentation of morgran http://expressjs.com/en/resources/middleware/morgan.html

// USE : Every time when you send request to the server it will be log on the console by default but you can also configure it to write it on the log file 



function ValidateCourse(courses) {
    const schema ={
        course: Joi.string()
        .min(3)
        // .max(6)
        .required()
    }

    return Joi.validate(courses,schema);
    
}

const courses = [
    {id: 1 , course:"BSSE"},
    {id: 2 , course:"MCS"},
    {id: 3 , course:"BSIT"},
]


app.get('/',(req,res)=>{
    res.render('index',{title:"nabiha jamali",firstheading :"i am ibrahim"})

    // OUTPUT IS ON http://localhost:3002/

    // I am ibrahim on window screes and title is nabiha jamali 
    // by inspecting we get this 
    //<html> <head> <title>nabiha jamali</title></head><body> <h1>i am ibrahim</h1></body></html>

    // at the res to client 
})



// where coureses == reult of db and is select * from courses 
app.get('/api/courses/:id/',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));

     if (!course) {
        res.status(404).send("The course with that id does not exist");
        return;
   
        
     }
     res.send(course);
     
})

// this route is for getting all courses 
app.get('/api/courses/',  (req,res)=> {
    
    res.send(courses);
    // output is on window screen http://localhost:3001/api/courses/
    //  [{"id":1,"course":"BSSE"},{"id":2,"course":"MCS"},{"id":3,"course":"BSIT"}] 
    // phir is array ko hm frontend mn app.map se display kr skty hain normally 

    
});


app.post('/api/courses/',(req,res)=>{

    const {error} = ValidateCourse(req.body);   
    
    if (error) {
        // req status 400 - which means bad request 
        res.status(400).send(error.details[0].message);  // ye reslt.error frontend pe ja rha ha now changing it to excess message  
        return;
        
    }
   
   
   
    const Newcourse = 
      {   id : courses.length+1,
        course: req.body.course,   // course ye database column se lia gaya ha 
    
      };
    courses.push(Newcourse);
    res.send(Newcourse);
})






const port = process.env.PORT     || 3002;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});


// -------------------------------------------------

// database integration 

//--------------------------------------------------


// we can use alot of database to connect with different database integration  

// LIST OF DATABASE THAT WE CAN HANDLE WITH THE HEL[ OF NODE JS

// Cassandra
// Couchbase
// CouchDB
// LevelDB
// MySQL
// MongoDB
// Neo4j
// Oracle
// PostgreSQL
// Redis
// SQL Server
// SQLite
// Elasticsearch

// learn more :   https://expressjs.com/en/guide/database-integration.html



//----------------------------------------------------------------

// Authenticaton:
//      cant be applicable by express coz it is a light weight framework will be discussed later 

//-----------------------------------------------------------------

// Structuring express applications 

//------------------------------------------------------------------

// In the real world we did not put all the the code in the index.js (indes.js)
// we hae to break the code into the components by creating separate files 

// Put out all the code for courses apis in a separate file 

// Now we can use the courses routes by a defining a express.router() instead of express()  then we can load  that module it in the indes.js


// by defining with specific route paths in indes.js we can use them by mentioning that suitable module which is courses.js in our case 


// created A Separate folder for routes of courses
// routes of home
// Now to use the in indes.js dont use app.get
// use app.use(/api/courses, courses);
// basiacally we are telling express that to handle that route use the courses module  
// for middleware


// jb hm  
// run krke check krna baki 


// CODE IMPLEMENTATION

// INDES.JS ----------------------------

const express = require('express');
const  courses = require('./routes/courses');  /// shyd ye diff path ho ga 
const  home = require('./routes/home');  /// shyd ye diff path ho ga 
const config = require('config');
const debug = require('debug')('app:debug'); // we can use use environment variable to enable and disable debugging we can also determine the level of debugging we wanna see maybe we are working with our database problem perhaps we only want to see debugging related to the database 
// debugging funcfor db
// const startupDebugger=require('debug)('app:startup');
// const DebuggerDB = require('debug')('app:db'); 
console.log(` ye ha debugger val : ${process.env.DEBUG}`)
const helmet = require('helmet');  // Helps secure your apps by setting various HTTP headers.
const morgan = require('morgan');  // 	HTTP request logger.
const Joi = require('joi');  // it is a class so J is capital
const logger = require('./middleware/logger');
const authentication = require('./middleware/authentication')
const app = express();

// NOW  WE need to set  view engine for our application 
 app.set('view engine','pug');


// Now we can send that pug html to the client using 
// res.render(view name (file name in the view folder ),{ for parameter that we define in template})


// So,  res.render('index',{ title:"nabiha", firstheading:"i am ibrahim"})

// now using it in below get method to send html response




// CONFIGURATION 

// console.log(` APP NAME : ${config.get('name')}`)
// console.log(` Mail host : ${config.get('mail.host')}`)
// console.log(` Mail password : ${config.get('mail.password')}`)
// NOW BY setting nod_env to development then development wali config follow ki ja aa gi 
// and by setting node_env to production then production wali .json follow ki ja aa gi 



// setting the environment variable
// it will return undefined 
// console.log( `Node_ENV : ${process.env.Node_ENV}` );__________________  // we can set this from outside we can st this for development to testing to staging orproduction

// it will return environment to development by default
// app.get('env') // this method internally uses  thhi environmet variable (Node_ENV) to detect the current environment  
// if this variable is not set then it will return development by default
// console.log(`app : ${app.get('env')}`);___________________________


// we can use some packages for development environment like this
// ye lagana prta ha to use req.body.course etc 
app.use(express.json());  // it parses the body of the request and if there is a 
app.use(express.urlencoded({extended:true}));  // with this exteneded object we can 
app.use(express.static('public'));  // we used that to serve static files //iske 

app.use(logger);
// app.use = (morgan('tiny'));  //  (iske andar different format rakh skty hain ) ye hme jb koi testing etc krni hoti ha before launching our app //ise use krna

// ye walay packages for development environment 
if (app.get('env')=== "development") {
    // Now using debugger instead console.log()
    // startupDebugger(console.log("morgan enabeled"));
    debug('morgan enabeled...');
    // console.log("morgan enabeled.....")
    app.use(morgan('tiny')); 
     
    
    
}
        

// db debugger 
// DebuggerDB('connected with database')


app.use('/api/courses', courses);//-------------------------------- ISTARHA
app.use('/', home);//----------------------------------------

// THE OUTPUT IS SAME AS PREVIIOUS ROUTES 
// ON localhost 3002/api/courses
// [{"id":1,"course":"BSSE"},{"id":2,"course":"MCS"},{"id":3,"course":"BSIT"}]
app.use =(helmet());  
// app.use(authentication);

// OUTPUT on TERMINAL  
// Logging
// Authencating       
// but still hangs coz of the absense of next 




// documentataion of helmet  https://github.com/helmetjs/helmet

// pata nai kiyon nia kaam kr rha _____________? 
// should fix in night 
// documentation of morgran http://expressjs.com/en/resources/middleware/morgan.html

// USE : Every time when you send request to the server it will be log on the console by default but you can also configure it to write it on the log file 











// Moving courses routes in courses.js (that is present in routes folder)-----





const port = process.env.PORT     || 3002;

app.listen(port,  ()=> {
    console.log(`yes your server is running / listening on PORT ${port}....`)
    
});



// -------------------------------------------

// courses.js ----------------------


const express= require('express');
const router = express.Router();


const courses = [
    {id: 1 , course:"BSSE"},
    {id: 2 , course:"MCS"},
    {id: 3 , course:"BSIT"},
]


function ValidateCourse(courses) {
    const schema ={
        course: Joi.string()
        .min(3)
        // .max(6)
        .required()
    }

    return Joi.validate(courses,schema);
    
}


// where coureses == reult of db and is select * from courses 
router.get('/:id',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));

     if (!course) {
        res.status(404).send("The course with that id does not exist");
        return;
   
        
     }
     res.send(course);
     
})

// this route is for getting all courses 
router.get('/',  (req,res)=> {
    
    res.send(courses);
    // output is on window screen http://localhost:3001/api/courses/
    //  [{"id":1,"course":"BSSE"},{"id":2,"course":"MCS"},{"id":3,"course":"BSIT"}] 
    // phir is array ko hm frontend mn router.map se display kr skty hain normally 

    
});


router.post('/',(req,res)=>{

    const {error} = ValidateCourse(req.body);   
    
    if (error) {
        // req status 400 - which means bad request 
        res.status(400).send(error.details[0].message);  // ye reslt.error frontend pe ja rha ha now changing it to excess message  
        return;
        
    }
   
   
   
    const Newcourse = 
      {   id : courses.length+1,
        course: req.body.course,   // course ye database column se lia gaya ha 
    
      };
    courses.push(Newcourse);
    res.send(Newcourse);
})

module.exports = router;

// -----------------------------------

// home.js ---------------------------

const express= require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('index',{title:"nabiha jamali",firstheading :"i am ibrahim"})

    // OUTPUT IS ON http://localhost:3002/

    // I am ibrahim on window screes and title is nabiha jamali 
    // by inspecting we get this 
    //<html> <head> <title>nabiha jamali</title></head><body> <h1>i am ibrahim</h1></body></html>

    // at the res to client 
})


module.exports = router ;



// vidly practice should be done ------------------------------------



// ______________________________________________________________________________



// ASYNCHRONOUS VS SYNCHRONOUS JAVASCRIPT 



// ________________________________________________________________________________


// What is synchronous code :
        //  When the first line executes the second line is blocking and have to wait until the first line finishes the execution this type of code is called asynshronous 

        // * Depndency on the previous 



        console.log('before')
        console.log('after')
        
        
        // What is asynchronous code :
        //          nON BLocking
        
        
        
        console.log('before')
        setTimeout(()=>{
                console.log("after 2 seconds ")
        },2000)
        console.log('after')
        
        
        // The output is 
        
        // before
        // after
        // before
        // after
        // after 2 seconds
        
        // because it is acynchronous code it will just shedule the task for future but didnot stop there 
        
        // note there is a single thread in a program 
        // in node programs when ever you are dealing with the operation that involves disk or network access you are dealing with the synshronous code 



//-------------------------------------------------------------------

// Asynchronous pattern 

// ---------------------------------------------------------------------


// PATTERNS TO DEAL WITH ASYNCHRONOS CODE 

    // promises 
    // callbacks 
    // Async/await 


    


    console.log('before');
    const user = getUser(1);
    console.log(user); // it is undeifned because the return statement is not avalible at the time of calling getUser()
    console.log('after');
    
    
    
    function getUser(id){
            // in the real world the results are bot ready immudeatly it takes time to ready and when it is ready then how to deal with that user obkect we can handle the synchronous code with the help of 
    
            // promises 
            // callbacks 
            // Async/await 
            setTimeout(()=>{
                    console.log("after 2 seconds ")
                    return {id:1 ,githudaccountname:"ibrahim amjad"}
            },2000)
    
           // return 1 // it will return to 1 coz it will be generated immidetely but dealing wtth the databse the result will not be availabe immediatly 
    
    
    }
    
    // The output of above code is
    
    // before
    // undefined
    // after
    // after 2 seconds 
    
    // because it the user is not defined the set time out is shecduled for the future 




     

//-------------------------------------------------------------------

// callbacks

// ---------------------------------------------------------------------

// A callback is a function that we are going to call when the resllt is ready in 
// the asynchronous operation ----------

console.log('before');
getUser(1,user=>{  // callback function body with argument user
        console.log(user);
});

console.log('after');



function getUser(id , callback ){
        // in the real world the results are bot ready immudeatly it takes time to ready and when it is ready then how to deal with that user obkect we can handle the synchronous code with the help of 

        // promises 
        // callbacks 
        // Async/await 
        setTimeout(()=>{
                console.log("Reading the data from database (after 2 seconds )")
                callback({id:id ,githudaccountname:"ibrahim amjad"}) // calling the callback function with the paramenter of user info this class back function bodey is efined in the getUser calling point 
        },2000)

       // return 1 // it will return to 1 coz it will be generated immidetely but dealing wtth the databse the result will not be availabe immediatly 


}

// The output of above code is

// before
// after
// Reading the data from database (after 2 seconds )
// { id: 1, githudaccountname: 'ibrahim amjad' }

// _____________________________________________________________________
// CODE AFTER RETRIVING GITHUB REPOSITRIES FOR A CERTAIN USER USING CALLBACK 

// A callback is a function that we are going to call when the resllt is ready in 
// the asynchronous operation ----------

console.log('before');
getUser(1,user=>{
        console.log('The user is :' , user);

        // Getting user repositries
        getRepositries(user.githudaccountname , repositries=>{

                console.log(`${user.githudaccountname} repositries`);
                console.log(repositries);
        });


});

console.log('after');

version

function getUser(id , callback ){
        // in the real world the results are bot ready immudeatly it takes time to ready and when it is ready then how to deal with that user obkect we can handle the synchronous code with the help of 

 
        setTimeout(()=>{
                console.log("Reading the data from database (after 2 seconds )")
                callback({id:id ,githudaccountname:"ibrahim amjad"}) // calling the callback function with the paramenter of user info this class back function bodey is efined in the getUser calling point 
        },2000)

       // return 1 // it will return to 1 coz it will be generated immidetely but dealing wtth the databse the result will not be availabe immediatly 


}

// ----Github 


//  Suppose we get the user  from the database then we are going to look the property 'githubuser'  and then we are going to call github api to get the list of repositries for this user 


// getting the user repositries of the github 
// assignment  -> convert this function in acynchronous -> and then call it above 
// this is a synchronous function 
function getRepositries(UserName, callback) {  // asynscronous mn settimeout coz there i time in retriving data
       
        setTimeout(()=>{
                console.log(`getting the  ${UserName} repositries using github api (afer 2 seconds)`)
                callback( ['repo1','repo2','repo3'])
        },2000)

      
        
}


// THE OUTPUT AFTER ADDING ADDING GITHUB REPOSITRIES IS 

// before
// after
// Reading the data from database (after 2 seconds )
// The user is : { id: 1, githudaccountname: 'ibrahim amjad' }
// getting the  ibrahim amjad repositries using github api (afer 2 seconds)
// ibrahim amjad repositries
// [ 'repo1', 'repo2', 'repo3' ]




//-------------------------------------------------------------------

// callbacks hell 

// -------------------------------------------------------------------

// In the below code there is a nested structure of user fun and repositries 
// perhaps you want to add something after calling the repositries like get 1st repo and get all commits and it will be nested and that is only happen in asynchronos code (and we call this structure an callbacks hell or a christmas tree problem ) and synchronous there is no nested structure

// ASYNCHRONOUS 
console.log('before');
getUser(1,user=>{
    getRepositries(user.githudaccountname , repositries=>{
        getcommit(repositries[0], commits=>{
            // CALLBACK HELL 
            // console.log(commits)
        })
    });
});

console.log("after");

// SYNCHRONOUS code structure 

console.log('before');
const user =  getUser(1);
const repos = getRepositries(user.githudaccountname)
const commits = getcommit(repositries[0])
console.log("after");


//----------------------------------------------------------------------

// Named function to rescue (callbacks nested structure)

//-----------------------------------------------------------------------


// anonymous  function :
   // A function which does not have a name

// resolving callback hell with the help of named functions


 

//-------------------------------------------------------------------

// callbacks

// ---------------------------------------------------------------------

// A callback is a function that we are going to call when the resllt is ready in 
// the asynchronous operation ----------

console.log('before');
// getUser(1,getRepositries)

getUser(1,getRepositries)

        
console.log('after');


function displayCommits(commits){
         // CALLBACK HELL 
        console.log(commits)

}

function getcommits(repositry){ // these are 2 different functions
        getcommit(repositry,displayCommits)
        // console.log(`${user.githudaccountname} repositries`);
        // console.log(repositries);
        // getcommits(repositries[0], displayCommits);  // these are 2 different functions

}


function getRepositries(user) {
        console.log('The user is :' , user)
        getRepositries(user.githudaccountname ,getcommits) 
;

        
}




function getUser(id , callback ){
        // in the real world the results are bot ready immudeatly it takes time to ready and when it is ready then how to deal with that user obkect we can handle the synchronous code with the help of 

 
        setTimeout(()=>{
                console.log("Reading the data from database (after 2 seconds )")
                callback({id:id ,githudaccountname:"ibrahim amjad"}) // calling the callback function with the paramenter of user info this class back function bodey is efined in the getUser calling point 
        },2000)

       // return 1 // it will return to 1 coz it will be generated immidetely but dealing wtth the databse the result will not be availabe immediatly 


}


//  Suppose we get the user  from the database then we are going to look the property 'githubuser'  and then we are going to call github api to get the list of repositries for this user 


// getting the user repositries of the github 
// assignment  -> convert this function in acynchronous -> and then call it above 
// this is a synchronous function 
function getRepositries(UserName, callback) {  // asynscronous mn settimeout coz there i time in retriving data
       
        setTimeout(()=>{
                console.log(`getting the  ${UserName} repositries using github api (afer 2 seconds)`)
                callback( ['repo1','repo2','repo3'])
        },2000)

      
        
}


// THE OUTPUT AFTER ADDING ADDING GITHUB REPOSITRIES IS 

// before
// after
// Reading the data from database (after 2 seconds )
// The user is : { id: 1, githudaccountname: 'ibrahim amjad' }
// getting the  ibrahim amjad repositries using github api (afer 2 seconds)
// ibrahim amjad repositries
// [ 'repo1', 'repo2', 'repo3' ]




// error in this code callback is not  function   --------------

