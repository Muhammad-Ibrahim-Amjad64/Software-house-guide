// In mySql , postgre etc : We can apply validation at database level 

// In  Mongodb : But in mongodb we cant apply validations at database level we have to apply validators using mongoose 
// mongo db empty object tk store kr skta ha so the validation is very important  

// validation = the action of checking or proving the validity or accuracy of something.



// IN course schema that we define earlier the new course we will create can be empty and  is optional in mongodb we can also define blank schema. To avoid we will implement mongodb data validation 
// for example

const courseSchema =  new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date:{type:Date, default:Date.now},
    isPublished: Boolean 
    // date : Date    ye agar date user se dl wani ha 
});

// to  create a class (like course ) we need to compile this schema into a model 


const Course = mongoose.model('Course', courseSchema);
async function AddNewCourse(){

    try {
        
        const course = new Course({
            // Mongo db does not care that we have a course whose doesnot have  a name who does not have a price 
            // THEY ARE OPTIONAL -------- TO AVOID THIS WE WILL USE VALIDATION 

            // name: "java course",
            // author: "nabiha",
            // tags: ['java','frontent'],
            // isPublished: true
            
        })
        
        // Once we have a schema we need to compile that into model which gives usa class
        
        //saving 
        const result = await course.save()
        console.log(result);
        
    } catch (error) {
        console.log(error)
        
    }


}

//---------------------------------------------------------------

// validation - (using require validator)

//---------------------------------------------------------------
// Schemas  mn require validators apply kr sktay hain 
// POST METHOD MN validation apply kr rhy hain

// ISkKA ADDNEWCOURSE WALA SCHEMA ND METHOD CHECK KR 
// CODE IMPLEMENTATION 


// $env:DEBUG='app:debug'
const debug = require('debug')('app:startup'); 


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/practicedb")
    .then(()=>{console.log("connected to mongodb")})
    .catch((error)=>{debug('CAN NOT CONNECT ',error)})

//uper def di ha 
const courseSchema =  new mongoose.Schema({
    name: {type:String,required:true},
    author: String,
    tags: [String],
    date:{type:Date, default:Date.now},
    isPublished: Boolean 
    // date : Date    ye agar date user se dl wani ha 
});

// to  create a class (like course ) we need to compile this schema into a model 


const Course = mongoose.model('Course', courseSchema);
async function AddNewCourse(){

    
        
        const course = new Course({
            // name: "java course",
            author: "nabiha",
            tags: ['java','frontent'],
            isPublished: true
            
        })
        
        // Once we have a schema we need to compile that into model which gives usa class
    try {
        //We can also use validation method to validate 
        // await Course.validate()   // the design flaw is that that it returna a promise of void we cant get the result  // Not use that 

        //saving 
        const result = await course.save()
        console.log(result);
        // catch(error) c.log(error)  se error with whole callstack with message
        
    } catch (error) {
        console.log(error.message)  /// only message 
        
    }


}
// TO add new course  in course collection in mongodb database call that function (post)
AddNewCourse();  //------------

// gettng courses from courses collecton in mongodb 
// * Empty find() method will retrive all the documents of that class
// * We can also apply filter find() ke andar key val pairs daal kr find({author:ibrahim})
// * We can alse sort our documents  .sort()
// * We can also set the limit on items to be reterived .limit()
// * We can also select specfic properties of the document to be reterived (yani document mn sirf name rterive ho etc )  .select()
async function getCourses() {
    const courses = await Course
        .find({author:/^ibrahim/i}) 
        // .or([{author:"ibrahim"},{isPublished:true}])
        // .and([{author:"ibrahim"},{isPublished:true}])
        // 1 means in assending order and -1 means in decending order
        .sort({name : 1 })
        .limit(10)
        .select({name:1, author:1}) 
        // .count() 
        
        
    // const courses = await Course.find({name: "node course", author:"ibrahim"})
    console.log(courses);
    
}

// to get courses
// getCourses(); ___

//APPROACH-------------------------------------------Quary first approach (this approach is useful when you receive input from the client and you wanna make sure that update is a valid operation
// For example we can set the business rules to stop updations like if the course is published then unable to update ya time limit ke 15 din se phalay update krn allow nai  like the code below )

// * FindById()
// * Modify its properties 
// * save()
async function updateCourse(id) {
    // find by id
    const course = await Course.findById(id)
    if (!course) {
        return;
        
    }

    // if business rule condition ke agar course published tou return 
    if (course.isPublished===true) {
        return;

        
    }
    course.author="syeda nabiha ibrahim khan";  // ye ; lagana na bholna 

    const result = await course.save()
    console.log("updated......",result)

}
// for updating quary first 
// updateCourse("62d037e489aad1e277d53032");


//APPROACH-------------------------------------------Update first approach 

// We will use this approach when we will not receive input from the client and you just want to update a document directly from mongodb database

// * Update directly 
// * optionally get the updated object 



async function updateCourseUpdateFirstApproach(id) {
    // const result = await Course.updateMany({_id:id},{$set:{
    //     author:"syeda nabiha"
    // }});

    // We can update multiple files by adding a generic filter like this
    // const course = await Course.updateMany({isPublished:true},{}) // this will update all courses that matches that filter

    // IF you want to get the updated object then use find wala method . this will return an object before updation  
    // const result = await Course.findByIdAndUpdate(id,{$set:{
    //     author:"syeda nabiha jamali "
    // }, })
    // console.log(result); 

    // this method will return object  method after updation 
    const result = await Course.findByIdAndUpdate(id,{$set:{
        author:"syeda nabiha jamal :)"
    },},{new:true})
    console.log(result); 

    
}

// updateCourseUpdateFirstApproach("62d037e489aad1e277d53032");



//
async function deleteCourse(id) {
    // we can apply filter to delete courses  in deleteone ({})
    // const result = await Course.deleteOne({_id: id})  // it will delete the 1st occurance of the eleemnt that matches the filter  course with that id 
    // const result = await Course.deleteMany({_id: id}) 
    // if you want to get the element the element that you deleted use 
    const result = await Course.findByIdAndRemove(id);
    console.log(result);   // upper wala method bs delete krta ha ye agar deleted item frontedn pe show krwana hua tou ye us ekarian gain   
   
    
}
// console.log("yaha aya");
// deleteCourse("62cf60518f2a3c015ec83e35");



//------------------------------------------------------------------------

// Mongoose built-in validators  

//------------------------------------------------------------------------

// Required is also a built-in validator in mongoose  


// IMPORTANT FOR STRING 
//_____________________
// * Required :   And it can also return a function (thorugh which we can make some required if on some conditions )

// * minlength   : to specify the minlength of strings
// * maxlength   : to specify the maxlength of strings
// * match : to specify a regular expression to limit input etc 
// * enum : to specify a valid string in the  for example category mn sirf 3 category ke ilawa ani daalni etc 
//_______________________________________
//IMPORTANT FOR NUMBERS 
//_____________________________________

// * min : to set minimum num
// * max : to set max number 



// CODE IMPLEMENTATION OF THESE 

// $env:DEBUG='app:debug'
const debug = require('debug')('app:startup'); 


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/practicedb")
    .then(()=>{console.log("connected to mongodb")})
    .catch((error)=>{debug('CAN NOT CONNECT ',error)})

//uper def di ha 
// OUTPUT AFTER MINL & MAXL ADN ENUM
// --------------------------------
// Course validation failed: name: Path `name` (`java course`) is longer than the maximum allowed length (5)., tags.1: `frontent` is not a valid enum value for path `tags.1`.
// OUTPUT AFTER SETTING MIN AND MAX IN PRICE  
//-------------------------------------------
// Course validation failed: price: Path `price` (5) is less than minimum allowed value (10).
const courseSchema =  new mongoose.Schema({
    name: {
        type:String,required:true,minlength:3,maxlength:100
    },
    author: String,
    tags: {
        type:[String],enum:["node","java","c","frontend","backend"],
    },
    date:{type:Date, default:Date.now},
    
    isPublished: Boolean ,

    price : {
        type:Number,min:10,max:40
    },

    // date : Date    ye agar date user se dl wani ha 
});

// to  create a class (like course ) we need to compile this schema into a model 


const Course = mongoose.model('Course', courseSchema);
async function AddNewCourse(){

    
        
        const course = new Course({
            name: "java course",
            author: "nabiha jamali",
            tags: ['java','frontend'],
            isPublished: true,
            price:5,
            
        })
        
        // Once we have a schema we need to compile that into model which gives usa class
    try {
        //We can also use validation method to validate 
        // await Course.validate()   // the design flaw is that that it returna a promise of void we cant get the result  // Not use that 

        //saving 
        const result = await course.save()
        console.log(result);
        // catch(error) c.log(error)  se error with whole callstack with message
        
    } catch (error) {
        console.log(error.message)  /// only message 
        
    }


}
// TO add new course  in course collection in mongodb database call that function (post)
AddNewCourse();  //------------

// gettng courses from courses collecton in mongodb 
// * Empty find() method will retrive all the documents of that class
// * We can also apply filter find() ke andar key val pairs daal kr find({author:ibrahim})
// * We can alse sort our documents  .sort()
// * We can also set the limit on items to be reterived .limit()
// * We can also select specfic properties of the document to be reterived (yani document mn sirf name rterive ho etc )  .select()
async function getCourses() {
    const courses = await Course
        .find({author:/^ibrahim/i}) 
        // .or([{author:"ibrahim"},{isPublished:true}])
        // .and([{author:"ibrahim"},{isPublished:true}])
        // 1 means in assending order and -1 means in decending order
        .sort({name : 1 })
        .limit(10)
        .select({name:1, author:1}) 
        // .count() 
        
        
    // const courses = await Course.find({name: "node course", author:"ibrahim"})
    console.log(courses);
    
}

// to get courses
// getCourses(); ___

//APPROACH-------------------------------------------Quary first approach (this approach is useful when you receive input from the client and you wanna make sure that update is a valid operation
// For example we can set the business rules to stop updations like if the course is published then unable to update ya time limit ke 15 din se phalay update krn allow nai  like the code below )

// * FindById()
// * Modify its properties 
// * save()
async function updateCourse(id) {
    // find by id
    const course = await Course.findById(id)
    if (!course) {
        return;
        
    }

    // if business rule condition ke agar course published tou return 
    if (course.isPublished===true) {
        return;

        
    }
    course.author="syeda nabiha ibrahim khan";  // ye ; lagana na bholna 

    const result = await course.save()
    console.log("updated......",result)

}
// for updating quary first 
// updateCourse("62d037e489aad1e277d53032");


//APPROACH-------------------------------------------Update first approach 

// We will use this approach when we will not receive input from the client and you just want to update a document directly from mongodb database

// * Update directly 
// * optionally get the updated object 



async function updateCourseUpdateFirstApproach(id) {
    // const result = await Course.updateMany({_id:id},{$set:{
    //     author:"syeda nabiha"
    // }});

    // We can update multiple files by adding a generic filter like this
    // const course = await Course.updateMany({isPublished:true},{}) // this will update all courses that matches that filter

    // IF you want to get the updated object then use find wala method . this will return an object before updation  
    // const result = await Course.findByIdAndUpdate(id,{$set:{
    //     author:"syeda nabiha jamali "
    // }, })
    // console.log(result); 

    // this method will return object  method after updation 
    const result = await Course.findByIdAndUpdate(id,{$set:{
        author:"syeda nabiha jamal :)"
    },},{new:true})
    console.log(result); 

    
}

// updateCourseUpdateFirstApproach("62d037e489aad1e277d53032");



//
async function deleteCourse(id) {
    // we can apply filter to delete courses  in deleteone ({})
    // const result = await Course.deleteOne({_id: id})  // it will delete the 1st occurance of the eleemnt that matches the filter  course with that id 
    // const result = await Course.deleteMany({_id: id}) 
    // if you want to get the element the element that you deleted use 
    const result = await Course.findByIdAndRemove(id);
    console.log(result);   // upper wala method bs delete krta ha ye agar deleted item frontedn pe show krwana hua tou ye us ekarian gain   
   
    
}
// console.log("yaha aya");
// deleteCourse("62cf60518f2a3c015ec83e35");


//-----------------------------------------------------------------

// Mongoose custom validator

//-----------------------------------------------------------------

// sometimes we have to use mongoose custom validators 

// for example atleast 1 tag is required


//  * we can set   custom validator in a validate property in the schemas


// CODE IMPLEMENTATION (WATHC TAGS  AND Course class)

// $env:DEBUG='app:debug'
const debug = require('debug')('app:startup'); 


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/practicedb")
    .then(()=>{console.log("connected to mongodb")})
    .catch((error)=>{debug('CAN NOT CONNECT ',error)})

//uper def di ha 
// OUTPUT AFTER MINL & MAXL ADN ENUM
// --------------------------------
// Course validation failed: name: Path `name` (`java course`) is longer than the maximum allowed length (5)., tags.1: `frontent` is not a valid enum value for path `tags.1`.
// OUTPUT AFTER SETTING MIN AND MAX IN PRICE  
//-------------------------------------------
// Course validation failed: price: Path `price` (5) is less than minimum allowed value (10).
const courseSchema =  new mongoose.Schema({
    name: {
        type:String,required:true,minlength:3,maxlength:100
    },
    
    author: String,
    tags: {
        type:[String],
        //  type : Array, (for array of general type can contain anything )
       
        enum:["node","java","c","frontend","backend"], 
        //  (enum can only set to an array of strings hmne validation ke lia general daal di mgr validation mn sb kuch valid ha )
        validate:{validator:function(v){//-----------------------
            // if v has a value and its length is greater  than 0 then it is valid 
            return v && v.length> 0;
           },message:"course should have atleast 1 tag" 
        }
    },
    date:{type:Date, default:Date.now},
    
    isPublished: Boolean ,

    price : {
        type:Number,min:10,max:40
    },

    // date : Date    ye agar date user se dl wani ha 
});

// to  create a class (like course ) we need to compile this schema into a model 


const Course = mongoose.model('Course', courseSchema);
async function AddNewCourse(){

    
        
        const course = new Course({
            name: "java course",
            author: "nabiha jamali",
            tags: ['java','frontend'],
            // tags: null ,   // ye check validator ke lia --------
            isPublished: true,
            // price:5,
            
    
        })
        
        // Once we have a schema we need to compile that into model which gives usa class
    try {
        //We can also use validation method to validate 
        // await Course.validate()   // the design flaw is that that it returna a promise of void we cant get the result  // Not use that 

        //saving 
        const result = await course.save()
        console.log(result);
        // catch(error) c.log(error)  se error with whole callstack with message
        
    } catch (error) {
        console.log(error.message)  /// only message 
        
    }


}
// TO add new course  in course collection in mongodb database call that function (post)
AddNewCourse();  //------------

// gettng courses from courses collecton in mongodb 
// * Empty find() method will retrive all the documents of that class
// * We can also apply filter find() ke andar key val pairs daal kr find({author:ibrahim})
// * We can alse sort our documents  .sort()
// * We can also set the limit on items to be reterived .limit()
// * We can also select specfic properties of the document to be reterived (yani document mn sirf name rterive ho etc )  .select()
async function getCourses() {
    const courses = await Course
        .find({author:/^ibrahim/i}) 
        // .or([{author:"ibrahim"},{isPublished:true}])
        // .and([{author:"ibrahim"},{isPublished:true}])
        // 1 means in assending order and -1 means in decending order
        .sort({name : 1 })
        .limit(10)
        .select({name:1, author:1}) 
        // .count() 
        
        
    // const courses = await Course.find({name: "node course", author:"ibrahim"})
    console.log(courses);
    
}

// to get courses
// getCourses(); ___

//APPROACH-------------------------------------------Quary first approach (this approach is useful when you receive input from the client and you wanna make sure that update is a valid operation
// For example we can set the business rules to stop updations like if the course is published then unable to update ya time limit ke 15 din se phalay update krn allow nai  like the code below )

// * FindById()
// * Modify its properties 
// * save()
async function updateCourse(id) {
    // find by id
    const course = await Course.findById(id)
    if (!course) {
        return;
        
    }

    // if business rule condition ke agar course published tou return 
    if (course.isPublished===true) {
        return;

        
    }
    course.author="syeda nabiha ibrahim khan";  // ye ; lagana na bholna 

    const result = await course.save()
    console.log("updated......",result)

}
// for updating quary first 
// updateCourse("62d037e489aad1e277d53032");


//APPROACH-------------------------------------------Update first approach 

// We will use this approach when we will not receive input from the client and you just want to update a document directly from mongodb database

// * Update directly 
// * optionally get the updated object 



async function updateCourseUpdateFirstApproach(id) {
    // const result = await Course.updateMany({_id:id},{$set:{
    //     author:"syeda nabiha"
    // }});

    // We can update multiple files by adding a generic filter like this
    // const course = await Course.updateMany({isPublished:true},{}) // this will update all courses that matches that filter

    // IF you want to get the updated object then use find wala method . this will return an object before updation  
    // const result = await Course.findByIdAndUpdate(id,{$set:{
    //     author:"syeda nabiha jamali "
    // }, })
    // console.log(result); 

    // this method will return object  method after updation 
    const result = await Course.findByIdAndUpdate(id,{$set:{
        author:"syeda nabiha jamal :)"
    },},{new:true})
    console.log(result); 

    
}

// updateCourseUpdateFirstApproach("62d037e489aad1e277d53032");



//
async function deleteCourse(id) {
    // we can apply filter to delete courses  in deleteone ({})
    // const result = await Course.deleteOne({_id: id})  // it will delete the 1st occurance of the eleemnt that matches the filter  course with that id 
    // const result = await Course.deleteMany({_id: id}) 
    // if you want to get the element the element that you deleted use 
    const result = await Course.findByIdAndRemove(id);
    console.log(result);   // upper wala method bs delete krta ha ye agar deleted item frontedn pe show krwana hua tou ye us ekarian gain   
   
    
}
// console.log("yaha aya");
// deleteCourse("62cf60518f2a3c015ec83e35");



//----------------------------------------------------------------------------

// Async Validator 

//-----------------------------------------------------------------------------

// Sometimes validation logic includes reading something from the database or remote http . So in this case we requied an async validator . we can convert sync validator into async validator 
// first  

// async property to true 
// then use calback in the function  ( use promise not the call back )
//  then use result  const instead of return 



// Code implemantation 

// $env:DEBUG='app:debug'
const debug = require('debug')('app:startup'); 


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/practicedb")
    .then(()=>{console.log("connected to mongodb")})
    .catch((error)=>{debug('CAN NOT CONNECT ',error)})

//uper def di ha 
// OUTPUT AFTER MINL & MAXL ADN ENUM
// --------------------------------
// Course validation failed: name: Path `name` (`java course`) is longer than the maximum allowed length (5)., tags.1: `frontent` is not a valid enum value for path `tags.1`.
// OUTPUT AFTER SETTING MIN AND MAX IN PRICE  
//-------------------------------------------
// Course validation failed: price: Path `price` (5) is less than minimum allowed value (10).
const courseSchema =  new mongoose.Schema({
    name: {
        type:String,required:true,minlength:3,maxlength:100
    },
    
    author: String,
    tags: {
        isAsync:true,//--------------------------
        type:[String],
        //  type : Array, (for array of general type can contain anything )
        
        enum:["node","java","c","frontend","backend"], 
        //  (enum can only set to an array of strings hmne validation ke lia general daal di mgr validation mn sb kuch valid ha )

        // CONVERTING INTO ASYNC VALIDATOR (IF NEEDED IN SOME CASES )
        // bs set isAsync preoperty to true and a callback function to mae validator async -- failed use promise instead 
        validate:{validator:function (v) {
            return new Promise((resolve) => {
                setTimeout(() => {
                  // Some async work , in real real world i=this result is calculated by some async works etc but here we assigning directly 
                const result = v && v.length > 0;
                resolve(result);
              }, 4000);
            });
          },message:"course should have atleast 1 tag" 
        }
    },
    date:{type:Date, default:Date.now},
    
    isPublished: Boolean ,

    price : {
        type:Number,min:10,max:40
    },

    // date : Date    ye agar date user se dl wani ha 
});

// to  create a class (like course ) we need to compile this schema into a model 


const Course = mongoose.model('Course', courseSchema);
async function AddNewCourse(){

    
        
        const course = new Course({
            name: "java course",
            author: "nabiha jamali",
            // tags: ['java','frontend'],
            tags: null ,   // ye check validator ke lia 
            isPublished: true,
            // price:5,
            
    
        })
        
        // Once we have a schema we need to compile that into model which gives usa class
    try {
        //We can also use validation method to validate 
        // await Course.validate()   // the design flaw is that that it returna a promise of void we cant get the result  // Not use that 

        //saving 
        const result = await course.save()
        console.log(result);
        // catch(error) c.log(error)  se error with whole callstack with message
        
    } catch (error) {
        console.log(error.message)  /// only message 
        
    }


}
// TO add new course  in course collection in mongodb database call that function (post)
AddNewCourse();  //------------

// gettng courses from courses collecton in mongodb 
// * Empty find() method will retrive all the documents of that class
// * We can also apply filter find() ke andar key val pairs daal kr find({author:ibrahim})
// * We can alse sort our documents  .sort()
// * We can also set the limit on items to be reterived .limit()
// * We can also select specfic properties of the document to be reterived (yani document mn sirf name rterive ho etc )  .select()
async function getCourses() {
    const courses = await Course
        .find({author:/^ibrahim/i}) 
        // .or([{author:"ibrahim"},{isPublished:true}])
        // .and([{author:"ibrahim"},{isPublished:true}])
        // 1 means in assending order and -1 means in decending order
        .sort({name : 1 })
        .limit(10)
        .select({name:1, author:1}) 
        // .count() 
        
        
    // const courses = await Course.find({name: "node course", author:"ibrahim"})
    console.log(courses);
    
}

// to get courses
// getCourses(); ___

//APPROACH-------------------------------------------Quary first approach (this approach is useful when you receive input from the client and you wanna make sure that update is a valid operation
// For example we can set the business rules to stop updations like if the course is published then unable to update ya time limit ke 15 din se phalay update krn allow nai  like the code below )

// * FindById()
// * Modify its properties 
// * save()
async function updateCourse(id) {
    // find by id
    const course = await Course.findById(id)
    if (!course) {
        return;
        
    }

    // if business rule condition ke agar course published tou return 
    if (course.isPublished===true) {
        return;

        
    }
    course.author="syeda nabiha ibrahim khan";  // ye ; lagana na bholna 

    const result = await course.save()
    console.log("updated......",result)

}
// for updating quary first 
// updateCourse("62d037e489aad1e277d53032");


//APPROACH-------------------------------------------Update first approach 

// We will use this approach when we will not receive input from the client and you just want to update a document directly from mongodb database

// * Update directly 
// * optionally get the updated object 



async function updateCourseUpdateFirstApproach(id) {
    // const result = await Course.updateMany({_id:id},{$set:{
    //     author:"syeda nabiha"
    // }});

    // We can update multiple files by adding a generic filter like this
    // const course = await Course.updateMany({isPublished:true},{}) // this will update all courses that matches that filter

    // IF you want to get the updated object then use find wala method . this will return an object before updation  
    // const result = await Course.findByIdAndUpdate(id,{$set:{
    //     author:"syeda nabiha jamali "
    // }, })
    // console.log(result); 

    // this method will return object  method after updation 
    const result = await Course.findByIdAndUpdate(id,{$set:{
        author:"syeda nabiha jamal :)"
    },},{new:true})
    console.log(result); 

    
}

// updateCourseUpdateFirstApproach("62d037e489aad1e277d53032");



//
async function deleteCourse(id) {
    // we can apply filter to delete courses  in deleteone ({})
    // const result = await Course.deleteOne({_id: id})  // it will delete the 1st occurance of the eleemnt that matches the filter  course with that id 
    // const result = await Course.deleteMany({_id: id}) 
    // if you want to get the element the element that you deleted use 
    const result = await Course.findByIdAndRemove(id);
    console.log(result);   // upper wala method bs delete krta ha ye agar deleted item frontedn pe show krwana hua tou ye us ekarian gain   
   
    
}
// console.log("yaha aya");
// deleteCourse("62cf60518f2a3c015ec83e35");


//---------------------------------------------------

// Validation errors 

//---------------------------------------------------


// We can get more details of each validation error by iterating in the catch block 

// Addd new course ka try catch check kr 


// sometimes we have to use mongoose custom validators 

// for example atleast 1 tag is required


//  * we can set   custom validator in a validate property in the schemas


// CODE IMPLEMENTATION (WATHC TAGS  AND Course class)

// $env:DEBUG='app:debug'
const debug = require('debug')('app:startup'); 


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/practicedb")
    .then(()=>{console.log("connected to mongodb")})
    .catch((error)=>{debug('CAN NOT CONNECT ',error)})

//uper def di ha 
// OUTPUT AFTER MINL & MAXL ADN ENUM
// --------------------------------
// Course validation failed: name: Path `name` (`java course`) is longer than the maximum allowed length (5)., tags.1: `frontent` is not a valid enum value for path `tags.1`.
// OUTPUT AFTER SETTING MIN AND MAX IN PRICE  
//-------------------------------------------
// Course validation failed: price: Path `price` (5) is less than minimum allowed value (10).
const courseSchema =  new mongoose.Schema({
    name: {
        type:String,required:true,minlength:3,maxlength:100
    },
    
    author: String,
    tags: {
        type:[String],
        //  type : Array, (for array of general type can contain anything )
       
        enum:["node","java","c","frontend","backend"], 
        //  (enum can only set to an array of strings hmne validation ke lia general daal di mgr validation mn sb kuch valid ha )
        validate:{validator:function(v){//-----------------------
            // if v has a value and its length is greater  than 0 then it is valid 
            return v && v.length> 0;
           },message:"course should have atleast 1 tag" 
        }
    },
    date:{type:Date, default:Date.now},
    
    isPublished: Boolean ,

    price : {
        type:Number,min:10,max:40
    },

    // date : Date    ye agar date user se dl wani ha 
});

// to  create a class (like course ) we need to compile this schema into a model 


const Course = mongoose.model('Course', courseSchema);
async function AddNewCourse(){

    
        
        const course = new Course({
            name: "java course",
            author: "nabiha jamali",
            tags: ['java','frontendd'],
            // tags: null ,   // ye check validator ke lia --------
            isPublished: true,
            price:5,
            
    
        })
        
        // Once we have a schema we need to compile that into model which gives usa class
    try {
        //We can also use validation method to validate 
        // await Course.validate()   // the design flaw is that that it returna a promise of void we cant get the result  // Not use that 

        //saving 
        const result = await course.save()
        console.log(result);
        // catch(error) c.log(error)  se error with whole callstack with message
        // catch ke andar exception
        //ITERATING IN ERRORS AND GET MORE DETAILS _________________-------________
        // OUTPUT 
        // Path `price` (5) is less than minimum allowed value (10).
        // `frontendd` is not a valid enum value for path `tags.1`. 
    } catch (error) {
        for ( field in error.errors ) {
            console.log(error.errors[field].message)  /// .message to get only messages
            // then the output we get 
            // different properties of validation errors object 
            
            
        }
        // console.log(error.message)  /// only message 
        
    }


}
// TO add new course  in course collection in mongodb database call that function (post)
AddNewCourse();  //------------

// gettng courses from courses collecton in mongodb 
// * Empty find() method will retrive all the documents of that class
// * We can also apply filter find() ke andar key val pairs daal kr find({author:ibrahim})
// * We can alse sort our documents  .sort()
// * We can also set the limit on items to be reterived .limit()
// * We can also select specfic properties of the document to be reterived (yani document mn sirf name rterive ho etc )  .select()
async function getCourses() {
    const courses = await Course
        .find({author:/^ibrahim/i}) 
        // .or([{author:"ibrahim"},{isPublished:true}])
        // .and([{author:"ibrahim"},{isPublished:true}])
        // 1 means in assending order and -1 means in decending order
        .sort({name : 1 })
        .limit(10)
        .select({name:1, author:1}) 
        // .count() 
        
        
    // const courses = await Course.find({name: "node course", author:"ibrahim"})
    console.log(courses);
    
}

// to get courses
// getCourses(); ___

//APPROACH-------------------------------------------Quary first approach (this approach is useful when you receive input from the client and you wanna make sure that update is a valid operation
// For example we can set the business rules to stop updations like if the course is published then unable to update ya time limit ke 15 din se phalay update krn allow nai  like the code below )

// * FindById()
// * Modify its properties 
// * save()
async function updateCourse(id) {
    // find by id
    const course = await Course.findById(id)
    if (!course) {
        return;
        
    }

    // if business rule condition ke agar course published tou return 
    if (course.isPublished===true) {
        return;

        
    }
    course.author="syeda nabiha ibrahim khan";  // ye ; lagana na bholna 

    const result = await course.save()
    console.log("updated......",result)

}
// for updating quary first 
// updateCourse("62d037e489aad1e277d53032");


//APPROACH-------------------------------------------Update first approach 

// We will use this approach when we will not receive input from the client and you just want to update a document directly from mongodb database

// * Update directly 
// * optionally get the updated object 



async function updateCourseUpdateFirstApproach(id) {
    // const result = await Course.updateMany({_id:id},{$set:{
    //     author:"syeda nabiha"
    // }});

    // We can update multiple files by adding a generic filter like this
    // const course = await Course.updateMany({isPublished:true},{}) // this will update all courses that matches that filter

    // IF you want to get the updated object then use find wala method . this will return an object before updation  
    // const result = await Course.findByIdAndUpdate(id,{$set:{
    //     author:"syeda nabiha jamali "
    // }, })
    // console.log(result); 

    // this method will return object  method after updation 
    const result = await Course.findByIdAndUpdate(id,{$set:{
        author:"syeda nabiha jamal :)"
    },},{new:true})
    console.log(result); 

    
}

// updateCourseUpdateFirstApproach("62d037e489aad1e277d53032");



//
async function deleteCourse(id) {
    // we can apply filter to delete courses  in deleteone ({})
    // const result = await Course.deleteOne({_id: id})  // it will delete the 1st occurance of the eleemnt that matches the filter  course with that id 
    // const result = await Course.deleteMany({_id: id}) 
    // if you want to get the element the element that you deleted use 
    const result = await Course.findByIdAndRemove(id);
    console.log(result);   // upper wala method bs delete krta ha ye agar deleted item frontedn pe show krwana hua tou ye us ekarian gain   
   
    
}
// console.log("yaha aya");
// deleteCourse("62cf60518f2a3c015ec83e35");


//----------------------------------------------------------------

// Schema type options 

//----------------------------------------------------------------

// Discussing few more properties of defining schema for strings and arrays

// * lowercase :  Converts all characters of the strings to lowercase
// * uppercase :  Converts all character of th strings to uppercase
// * trim : removes padding from the strings 

// * get: when we retrieve certian properties from the databes then that getter function is called 
// get:()=>{}

// * set: when we set certain properties then that setter function is called 
// set:()=>{} 

// CODE IMPLEMENTATION 

// sometimes we have to use mongoose custom validators 

// for example atleast 1 tag is required


//  * we can set   custom validator in a validate property in the schemas


// CODE IMPLEMENTATION (WATHC TAGS  AND Course class)

// $env:DEBUG='app:debug'
const debug = require('debug')('app:startup'); 


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/practicedb")
    .then(()=>{console.log("connected to mongodb")})
    .catch((error)=>{debug('CAN NOT CONNECT ',error)})

//uper def di ha 
// OUTPUT AFTER MINL & MAXL ADN ENUM
// --------------------------------
// Course validation failed: name: Path `name` (`java course`) is longer than the maximum allowed length (5)., tags.1: `frontent` is not a valid enum value for path `tags.1`.
// OUTPUT AFTER SETTING MIN AND MAX IN PRICE  
//-------------------------------------------
// Course validation failed: price: Path `price` (5) is less than minimum allowed value (10).

// APPLYING LOWER CASE AD UPPERCASE ========================
const courseSchema =  new mongoose.Schema({
    name: {
        type:String,required:true,minlength:3,maxlength:100,lowercase:true,
        // trim:true  --- google search  
    },
    
    author: String,
    tags: {
        type:[String],
        //  type : Array, (for array of general type can contain anything )
       
        enum:["node","java","c","frontend","backend"], 
        //  (enum can only set to an array of strings hmne validation ke lia general daal di mgr validation mn sb kuch valid ha )
        validate:{validator:function(v){//-----------------------
            // if v has a value and its length is greater  than 0 then it is valid 
            return v && v.length> 0;
           },message:"course should have atleast 1 tag" 
        }
    },
    date:{type:Date, default:Date.now},
    
    isPublished: Boolean ,

    price : {  // ye set kr dy ga to a rounded number 
        type:Number,min:10,max:40,
        // ye kl price walay assignmnet mn laga kr try karia
        set:(v)=>Math.round(v), //  -------------------------------
        get:(v)=>Math.round(v), //======================
    },

    // date : Date   ye agar date user se dl wani ha 
});

// to  create a class (like course ) we need to compile this schema into a model 


const Course = mongoose.model('Course', courseSchema);
async function AddNewCourse(){

    
        
        const course = new Course({
            name: "VIP JAVA COURSE",  // ye upper case kia magar mongodb mn lowecase store hua 
            author: "nabiha jamali",
            tags: ['java','frontend'],
            // tags: null ,   // ye check validator ke lia --------
            isPublished: true,
            price:13.6,  /// database mn jaa kr 14  save hua ==================
            
    
        })
        
        // Once we have a schema we need to compile that into model which gives usa class
    try {
        //We can also use validation method to validate 
        // await Course.validate()   // the design flaw is that that it returna a promise of void we cant get the result  // Not use that 

        //saving 
        const result = await course.save()
        console.log(result);
        // catch(error) c.log(error)  se error with whole callstack with message
        // catch ke andar exception
        //ITERATING IN ERRORS AND GET MORE DETAILS _________________-------________ 
    } catch (error) {
        for ( field in error.errors ) {
            console.log(error.errors[field].message)  /// .message to get only messages
            // then the output we get 
            // different properties of validation errors object 
            
            
        }
        // console.log(error.message)  /// only message 
        
    }


}
// TO add new course  in course collection in mongodb database call that function (post)
AddNewCourse();  //------------

// gettng courses from courses collecton in mongodb 
// * Empty find() method will retrive all the documents of that class
// * We can also apply filter find() ke andar key val pairs daal kr find({author:ibrahim})
// * We can alse sort our documents  .sort()
// * We can also set the limit on items to be reterived .limit()
// * We can also select specfic properties of the document to be reterived (yani document mn sirf name rterive ho etc )  .select()
async function getCourses() {
    const courses = await Course
        .find({author:/^ibrahim/i}) 
        // .or([{author:"ibrahim"},{isPublished:true}])
        // .and([{author:"ibrahim"},{isPublished:true}])
        // 1 means in assending order and -1 means in decending order
        .sort({name : 1 })
        .limit(10)
        .select({name:1, author:1}) 
        // .count() 
        
        
    // const courses = await Course.find({name: "node course", author:"ibrahim"})
    console.log(courses);
    
}

// to get courses
// getCourses(); ___

//APPROACH-------------------------------------------Quary first approach (this approach is useful when you receive input from the client and you wanna make sure that update is a valid operation
// For example we can set the business rules to stop updations like if the course is published then unable to update ya time limit ke 15 din se phalay update krn allow nai  like the code below )

// * FindById()
// * Modify its properties 
// * save()
async function updateCourse(id) {
    // find by id
    const course = await Course.findById(id)
    if (!course) {
        return;
        
    }

    // if business rule condition ke agar course published tou return 
    if (course.isPublished===true) {
        return;

        
    }
    course.author="syeda nabiha ibrahim khan";  // ye ; lagana na bholna 

    const result = await course.save()
    console.log("updated......",result)

}
// for updating quary first 
// updateCourse("62d037e489aad1e277d53032");


//APPROACH-------------------------------------------Update first approach 

// We will use this approach when we will not receive input from the client and you just want to update a document directly from mongodb database

// * Update directly 
// * optionally get the updated object 



async function updateCourseUpdateFirstApproach(id) {
    // const result = await Course.updateMany({_id:id},{$set:{
    //     author:"syeda nabiha"
    // }});

    // We can update multiple files by adding a generic filter like this
    // const course = await Course.updateMany({isPublished:true},{}) // this will update all courses that matches that filter

    // IF you want to get the updated object then use find wala method . this will return an object before updation  
    // const result = await Course.findByIdAndUpdate(id,{$set:{
    //     author:"syeda nabiha jamali "
    // }, })
    // console.log(result); 

    // this method will return object  method after updation 
    const result = await Course.findByIdAndUpdate(id,{$set:{
        author:"syeda nabiha jamal :)"
    },},{new:true})
    console.log(result); 

    
}

// updateCourseUpdateFirstApproach("62d037e489aad1e277d53032");



//
async function deleteCourse(id) {
    // we can apply filter to delete courses  in deleteone ({})
    // const result = await Course.deleteOne({_id: id})  // it will delete the 1st occurance of the eleemnt that matches the filter  course with that id 
    // const result = await Course.deleteMany({_id: id}) 
    // if you want to get the element the element that you deleted use 
    const result = await Course.findByIdAndRemove(id);
    console.log(result);   // upper wala method bs delete krta ha ye agar deleted item frontedn pe show krwana hua tou ye us ekarian gain   
   
    
}
// console.log("yaha aya");
// deleteCourse("62cf60518f2a3c015ec83e35");




//_________________________________________________________________________

// PROJECT RESTRUCTURE   -- IN VIDLY PHASE 3 

//_________________________________________________________________________

// Customers api created 
// movies connected with mongoose db 
// customers api connected with mongodb
// models folder created (for joi and modeling doucments )