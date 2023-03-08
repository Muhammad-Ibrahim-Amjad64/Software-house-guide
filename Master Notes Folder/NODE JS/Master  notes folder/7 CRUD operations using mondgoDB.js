// Steps 
// 1 . Schema banao for document 
// 2 . model (is schema ki class bna ni ha )
// 3 . then aik object bna kr (create object (req.body.etc   (schema walay ki values define )))
// 4 . await course.save 





// TO store multiple values we use an array in js like in in operater


// About MongoDB :
    //   MongoDB is a non-relational database which only stores a data in a json objects 
    // https://www.mongodb.com/try/download/community


    // MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License which is deemed non-free by several distributions.

//_____________________________________________

//------------------------------------------------

// Connecting with mongodb database 
    
//-------------------------------------------------

// npm i mongoose   // it gives an api to connect with mongodb database

// In real world applications your connection  string should come from the configuration file 


const mongodb = require("mongoose");
mongodb.connect("mongodb://localhost/practicedb")
    .then(()=>{console.log("connected to mongodb")})
    .catch((error)=>{console.error('CAN NOT CONNECT ',error)})


    // then nodemon index.js
    // console.log ki jagah debugger use krna in real world apps 




//----------------------------------------------------------

// Schemas 

//-------------------------------------------------------------

// Collection : in mongodb is like a table in relational database
// documents : in mongodb is like a row in relational database 

// In mongoose we have a concept called schema 
// We use schema to define  the shape of the document with in a collection in mongodb


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/practicedb")
    .then(()=>{console.log("connected to mongodb")})
    .catch((error)=>{console.log('CAN NOT CONNECT ',error)})

//uper def di ha 
const courseSchema =  new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date:{type:Date, default:Date.now},
    isPublished: Boolean 
    // date : Date    ye agar date user se dl wani ha 
});


// List that data types that we can define in schema 

// String 
// Boolean 
// Number 
// Date 
// Buffer (which we use for storing binary data)
// ObjectID   ( which is fpr assigning unique identifier)
// []  (array)


//-----------------------------------------------------

// Models 

//-----------------------------------------------------

// classes , object  -> human , nabiha 


// in models  :  Course , nodecorse     

// mongoose.model(collections singular name like courses ka course , its document schema )

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/practicedb")
    .then(()=>{console.log("connected to mongodb")})
    .catch((error)=>{console.log('CAN NOT CONNECT ',error)})

//uper def di ha 
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
const course = new Course({
    name: "node course",
    author: "ibrahim",
    tags: ['node','backend'],
    isPublished: true
    
})

// Once we have a schema we need to compile that into model which gives usa class 


//---------------------------------------------------------------

// Saving a document in mongodb form index.js   (post)

//---------------------------------------------------------------

const mongoose = require("mongoose");
// In THE REAL WORLD APPLICATIONS THIS PATH IS DIFFEREENT 
mongoose.connect("mongodb://localhost/practicedb")
    .then(()=>{console.log("connected to mongodb")})
    .catch((error)=>{console.log('CAN NOT CONNECT ',error)})

//uper def di ha 
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
            name: "node course",
            author: "ibrahim",
            tags: ['node','backend'],
            isPublished: true
            
        })
        
        // Once we have a schema we need to compile that into model which gives usa class
        
        //saving 
        const result = await course.save()
        console.log(result);
        
    } catch (error) {
        console.log(error)
        
    }


}

AddNewCourse();


//-----------------------------------------------------------------

// Quaring documents - RETRIEVING THE DATA FROM MONGODB DATABASE 

//-----------------------------------------------------------------

//( get courses )   // WE can use course class to to get courses 
// class is use to model ('singular name', courseSchema )


// Then the course class has a lot of methodsto querying hte documents 


// $env:DEBUG='app:debug'
const debug = require('debug')('app:startup'); 


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/practicedb")
    .then(()=>{console.log("connected to mongodb")})
    .catch((error)=>{debug('CAN NOT CONNECT ',error)})

//uper def di ha 
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
            name: "java course",
            author: "nabiha",
            tags: ['java','frontent'],
            isPublished: true
            
        })
        
        // Once we have a schema we need to compile that into model which gives usa class
        
        //saving 
        const result = await course.save()
        console.log(result);
        
    } catch (error) {
        console.log(error)
        
    }


}
// TO add new course  in course collection in mongodb database call that function (post)
// AddNewCourse();-------------

// gettng courses from courses collecton in mongodb 
// * Empty find() method will retrive all the documents of that class
// * We can also apply filter find() ke andar key val pairs daal kr find({author:ibrahim})
// * We can alse sort our documents  .sort()
// * We can also set the limit on items to be reterived .limit()
// * We can also select specfic properties of the document to be reterived (yani document mn sirf name rterive ho etc )  .select()
async function getCourses() {
    const courses = await Course
        .find()
        // 1 means in assending order and -1 means in decending order
        .sort({name : 1 })
        .limit(1)
        .select({name:1, author:1}) 
        
        
    // const courses = await Course.find({name: "node course", author:"ibrahim"})
    console.log(courses);
    
}


getCourses();


// So the output is after getting courses 

// connected to mongodb
// [
//   {
//     _id: new ObjectId("62d037e489aad1e277d53032"),
//     name: 'java course',
//     author: 'nabiha'
//   },
//   {
//     _id: new ObjectId("62cf60518f2a3c015ec83e35"),
//     name: 'node course',
//     author: 'ibrahim'
//   }
// ]


//-----------------------------------------------------------------

// Comparism Quary Operators 

//-----------------------------------------------------------------

// In mongodb we have a bunch of operators for compairing a values 
// And that standard operators are also avalible in mongoose

// And these are 
// * eq (equal to =)
// * ne (not equal to !=)
// * gt (greater than >)
// * gte (greater than or equal to >=)
// * lt (less than <)
// * lte (less than or equal to <=)
// * in  (same thimgs multiple times )  (jaisy sql mn hota ha )
// * nin (not in )


// lets imagine that we want to reterive a course whose price is exactly 10 dollars then we can do it simply
// * .find({price:10}) 
// but if we want to retrive greater than or equal to  10 and less than or equal to 20   than
// * .find({price:{$gt:10,$lt:20}})
// IF we want to retrieve coureses of price 10, or 15 or 20  then we can use in operator 
// *  .find({price:{$in:[10,20,30]}}) 

//IMPLEMENTATIONS SAMPLE 

async function getCourses() {
    const courses = await Course
        .find({price:{$in:[10,20,30]}}) 
        .find({price:{$gte:10,$lte:20}})
        
        // 1 means in assending order and -1 means in decending order
        .sort({name : 1 })
        .limit(1)
        .select({name:1, author:1}) 
        
        
    // const courses = await Course.find({name: "node course", author:"ibrahim"})
    console.log(courses);
    
}


getCourses();




//-----------------------------------------------------------------

// Logical Quary Operators 

//-----------------------------------------------------------------

// Lets say tat we want to make conditions betweens filters then we can use and or like this 

// * .find({author:"ibrahim",isPublished:true})    // we only get ibrahim document
// * .or([{author:"ibrahim"},{isPublished:true}]) // author ibrahim ho ya ispublished true ho isme nam=biha bhi aa ja a gi coz un=sna bhi publish kra hua ha 

// TO store multiple values we use an array in js like in in operater


// or 
// and 


// TO add new course  in course collection in mongodb database call that function (post)
// AddNewCourse();-------------

// gettng courses from courses collecton in mongodb 
// * Empty find() method will retrive all the documents of that class
// * We can also apply filter find() ke andar key val pairs daal kr find({author:ibrahim})
// * We can alse sort our documents  .sort()
// * We can also set the limit on items to be reterived .limit()
// * We can also select specfic properties of the document to be reterived (yani document mn sirf name rterive ho etc )  .select()
async function getCourses() {
    const courses = await Course
        .find()
        .or([{author:"ibrahim"},{isPublished:true}])
        .and([{author:"ibrahim"},{isPublished:true}])
        // 1 means in assending order and -1 means in decending order
        .sort({name : 1 })
        .limit(1)
        .select({name:1, author:1}) 
        
        
    // const courses = await Course.find({name: "node course", author:"ibrahim"})
    console.log(courses);
    
}


getCourses();




//-----------------------------------------------------------------

// Regular expressions 

//-----------------------------------------------------------------
// In regular expressions
// *  ^ means string starts with    
 .find({author:/^Mosh/}) //(starts with mosh)
// *  $ means string end with
   .find({author:/hamadani$/i})// (ends with hamdani)
// *  i case insensetive  (now both uppercase and lower case are allowed )
// *   .*  represents zero or more characters 
 .find({author:/.*Mosh.*/i})// (contains mosh is end or start does not matters)

// setText(enteredtext.replace(/[^0-9]/g),'');  // from react native 

// IF YOU WANT MORE CONTROL ON FILTERING STRINGS YOU CAN USE A REGULAR EXPRESSIONS 

//FOR EXAMPLE

// .find ({author:"Mosh"})   -> ye exactly mosh ko hi return kry ga mosh hamdani , moshford etc nai la aa ga if we want to do that then we will use regular expressions 



//-----------------------------------------------------------------

// Counting 

//-----------------------------------------------------------------

// if you want ot count how many documents are reterived then use 
// * .count()   (by applying this we will only reterive number of documents not the documents )

// IMPLEMENTATION  

// $env:DEBUG='app:debug'
const debug = require('debug')('app:startup'); 


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/practicedb")
    .then(()=>{console.log("connected to mongodb")})
    .catch((error)=>{debug('CAN NOT CONNECT ',error)})

//uper def di ha 
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
            name: "java course",
            author: "nabiha",
            tags: ['java','frontent'],
            isPublished: true
            
        })
        
        // Once we have a schema we need to compile that into model which gives usa class
        
        //saving 
        const result = await course.save()
        console.log(result);
        
    } catch (error) {
        console.log(error)
        
    }


}
// TO add new course  in course collection in mongodb database call that function (post)
// AddNewCourse();-------------

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
        .count()  ///-------------------------------------------
        
        
    // const courses = await Course.find({name: "node course", author:"ibrahim"})
    console.log(courses);
    
}


getCourses();



// OUTPUT  
// connected to mongodb
// 1


//-----------------------------------------------------------------

// Pagination  

//-----------------------------------------------------------------

// Agar hm data pages mn limit krna chahain by assigning unique page numbers
// for this we require pagesize and pagenumbers  and .skip() method in getCourses to avoid repitations on same courses on different pages

async function getCourses() {
    // For simplicity we assigned hard quoted values 
    // In real world applications we pass these values as quary string parameters like
    // /api/courses/pageNumber=2&pageSize=10 
    const pagenumber = 2;
    const PageSize = 10;
    const courses = await Course
        .find({author:/^ibrahim/i}) 
        .skip((pagenumber-1)*PageSize)
        // .or([{author:"ibrahim"},{isPublished:true}])
        // .and([{author:"ibrahim"},{isPublished:true}])
        // 1 means in assending order and -1 means in decending order
        .sort({name : 1 })
        .limit(PageSize)
        .select({name:1, author:1}) 
        .count()  ///-------------------------------------------
        
        
    // const courses = await Course.find({name: "node course", author:"ibrahim"})
    console.log(courses);
    
}


getCourses();



//---------------------------------------------------------------------

// Updating a data from mongodb database - (UPDATE)  [ Quary first approach ]

//----------------------------------------------------------------------

// $env:DEBUG='app:debug'
const debug = require('debug')('app:startup'); 


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/practicedb")
    .then(()=>{console.log("connected to mongodb")})
    .catch((error)=>{debug('CAN NOT CONNECT ',error)})

//uper def di ha 
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
            name: "java course",
            author: "nabiha",
            tags: ['java','frontent'],
            isPublished: true
            
        })
        
        // Once we have a schema we need to compile that into model which gives usa class
        
        //saving 
        const result = await course.save()
        console.log(result);
        
    } catch (error) {
        console.log(error)
        
    }


}
// TO add new course  in course collection in mongodb database call that function (post)
// AddNewCourse();-------------

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

//APPROACH-------------------------------------------
// FindById()
// Modify its properties 
// save()
async function updateCourse(id) {
    const course = await Course.findById(id)
    if (!course) {
        return;
        
    }
    course.author="syeda nabiha ibrahim khan";  // ye ; lagana na bholna 

    const result = await course.save()
    console.log("updated......",result)

}

updateCourse("62d037e489aad1e277d53032");


// So the output is after getting courses 

// connected to mongodb
// [
//   {
//     _id: new ObjectId("62d037e489aad1e277d53032"),
//     name: 'java course',
//     author: 'nabiha'
//   },
//   {
//     _id: new ObjectId("62cf60518f2a3c015ec83e35"),
//     name: 'node course',
//     author: 'ibrahim'
//   }
// ]


//--------------------------------------------------------------------

// Updating a data from mongodb database - (UPDATE)  [ update first approach ] 

//--------------------------------------------------------------------


// MONGO DB UPDATE OPERATORS 
// https://www.mongodb.com/docs/manual/reference/operator/update/  (all operators link )


// $currentDate
// Sets the value of a field to current date, either as a Date or a Timestamp.

// $inc
// Increments the value of the field by the specified amount. --(fb likes eg (can also decrement by passing -ve value))

// $min
// Only updates the field if the specified value is less than the existing field value.

// $max
// Only updates the field if the specified value is greater than the existing field value.

// $mul
// Multiplies the value of the field by the specified amount.

// $rename
// Renames a field.

// $set
// Sets the value of a field in a document.

// $setOnInsert
// Sets the value of a field if an update results in an insert of a document. Has no effect on update operations that modify existing documents.

// $unset
// Removes the specified field from a document.


// CODE IMPLEMENTATIONS -----------------------(final code of CRUD mongoose)

// $env:DEBUG='app:debug'
const debug = require('debug')('app:startup'); 


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/practicedb")
    .then(()=>{console.log("connected to mongodb")})
    .catch((error)=>{debug('CAN NOT CONNECT ',error)})

//uper def di ha 
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
            name: "java course",
            author: "nabiha",
            tags: ['java','frontent'],
            isPublished: true
            
        })
        
        // Once we have a schema we need to compile that into model which gives usa class
        
        //saving 
        const result = await course.save()
        console.log(result);
        
    } catch (error) {
        console.log(error)
        
    }


}
// TO add new course  in course collection in mongodb database call that function (post)
// AddNewCourse();-------------

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

updateCourseUpdateFirstApproach("62d037e489aad1e277d53032");



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






 
//--------------------------------------------------------------------

// Removig course from mongodb database - (delete) 

//--------------------------------------------------------------------

//
//
async function deleteCourse(id) {
    // we can apply filter to delete courses  in deleteone ({})
    const result = await Course.deleteOne({_id: id})  // it will delete the 1st occurance of the eleemnt that matches the filter  course with that id 
    // const result = await Course.deleteMany({_id: id}) 
    // if you want to get the element the element that you deleted use 
    const result = await Course.findByIdAndRemove(id);
    console.log(result);   // upper wala method bs delete krta ha ye agar deleted item frontedn pe show krwana hua tou ye us ekarian gain   
   
    
}
// console.log("yaha aya");
deleteCourse("62cf60518f2a3c015ec83e35");



//-------------------------------------------------------

// EXERCISE 1 

//---------------------------------------------------------



// EXERCISE 1 
const mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost/mongo-exercises")
    .then(console.log("Successfully connected ..."))
    .catch((error)=>{console.log("failed to connect",error)})



    
const courseSchema = new mongoose.Schema({
    tags :[String],
    date:{type:Date,default:Date.now},
    name:String,
    author:String,
    isPublished:Boolean,
})


const Course = new mongoose.model("course",courseSchema);


async  function getCourses(){
    const courses = await Course
    .find()
    .sort({name : 1})
    .select({name:1 , author : 1 })
    console.log(courses)

}

getCourses();



//-------------------------------------------------------

// EXERCISE 2

//---------------------------------------------------------


// EXERCISE 1 
const mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost/mongo-exercises")
    .then(console.log("Successfully connected ..."))
    .catch((error)=>{console.log("failed to connect",error)})



    
const courseSchema = new mongoose.Schema({
    tags :[String],
    date:{type:Date,default:Date.now},
    name:String,
    author:String,
    isPublished:Boolean,
})


const Course = new mongoose.model("course",courseSchema);


async  function getCourses(){
    const courses = await Course
    .find({isPublished:true})//,tags:{$in:["frontend","backend"]}})
    .or([{tags:"frontend"},{tags:"backend"}])//tages arr mn frontend ho tou T so on  
    .sort({price:-1})
    .select({name:1 , author : 1})// ,price:1})
    console.log(courses)

}

getCourses();



//-------------------------------------------------------------------

// Exercise 3 

//-------------------------------------------------------------------

// EXERCISE 1 
const mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost/mongo-exercises")
    .then(console.log("Successfully connected ..."))
    .catch((error)=>{console.log("failed to connect",error)})



    
const courseSchema = new mongoose.Schema({
    tags :[String],
    date:{type:Date,default:Date.now},
    name:String,
    author:String,
    isPublished:Boolean,
    price:Number
})


const Course = new mongoose.model("course",courseSchema);


async  function getCourses(){
    const courses = await Course
    .find({isPublished:true})//,tags:{$in:["frontend","backend"]}})
    
    .or([{price:{$gte:15}},{name:/.*by.*/i}])//tages arr mn frontend ho tou T so on  
    .sort({price:-1})
    .select({name:1 , author : 1,price:1})
    console.log(courses)

}

getCourses();