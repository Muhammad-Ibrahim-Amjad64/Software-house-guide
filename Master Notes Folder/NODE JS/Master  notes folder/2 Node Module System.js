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

