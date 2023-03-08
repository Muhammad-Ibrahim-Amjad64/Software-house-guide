// For now we only worked ith single self contained documents but in the real world there is a relationship betweenn documents 
// AS IN RELATIONAL DATABASES 


// APPEOACHES TO ESTABLISH A RELATIONSHIP 


// * Using references (Normalization)  --> CONSISTENCY 
// --------------------------------------------------------

let author = {
    name: "mosh"       // isko agar hm mosh se mosh hamdani kr dain tou jaahan jahan is author ka reference use hua ho ga wahan wahan update ho ja aa ga 
}

let cousrse = {
    author: "id"
}

// * Using Embeded classes (Denormalization)  --> PERFORMANCE 
//-----------------------------------------------------------

let  course = {
    author:{
        name : "mosh"    // hr course ke andar author daal dia // agar author ka naam mosh se mosh hamdani karain gain tou usko quary laga kr update krna ho ga   //aur agar quary galat lg gyi tou data corrupt 
    }
}


// * Using Hybrid approach
//-------------------------
//--> this approach is particularly useful when you want to store  snapshot of your data at a point in time // in each order we have to store snapshot of the product 

let author = {
    name : "mosh"
    // 50 other properties like id adress etc 
}

let course ={
    author:{
        id : "ref"  // ref ot author document 
        name : "mosh"  // we dint have to store the author properties in the course object 

    }

}


//---------------------------------------------------------------------------

// REferencing 1 st step 

//---------------------------------------------------------------------------

// Establishing a relationship between coutor and course table (Normalization)
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author:{
     // author ko object id se course se connect kia jaa rha ha 
    type: mongoose.Schema.Types.ObjectId, //---------------------
    ref : 'Author'    // js se id aa rhi ha , name of teh targeted collection ------ 
  }
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .select('name');
  console.log(courses);
}

// createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('Node Course', 'authorId')   // id daaldi 
createCourse('Node Course', '62d6e0723ebc785a775ff5c9')  //----------------------

// listCourses();



//-------------------------------------------------------------------------

// Population (populate method)
// refrencing 2nd step 
//-------------------------------------------------------------------------

// uper sirf id load ho rhi thi author ka data load nai ho rh tha so populate method se wo load kr pa aain gain 

// SUMMARY JIS PROPERTY KE ANNDAR KISIS KA REF HA TOU USKO JB GET KARAIN GAIN TOU 
//' populate ' method ka use karain gain

// Establishing a relationship between coutor and course table (Normalization)
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author:{
     // author ko object id se course se connect kia jaa rha ha 
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Author'    // js se id aa rhi ha , name of teh targeted collection 
  }
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
  .find()
  .populate('author' , 'name -_id')  // hmn ne schema mn author ki ref se object id li .ab ppulate method author collection mn operation perform kry ga /// isko find ke neecha hona cha ha ya // EXCLUDES ID INCLUDES NAME PROPERTY ONLY 
  // populate multiple times bhi kr skty hain 
  // .populate('categorey', 'categorey_name')   // ++++++++++++++++++++++++
  .select({name:1, author:1});
  console.log(courses);
}

// createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('Node Course', 'authorId')   // id daaldi --
// createCourse('Node Course', '62d6e0723ebc785a775ff5c9')

listCourses();


//------------------------------------------------------------------------

// Embedding documents 

//------------------------------------------------------------------------





const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: {type:String,required:true},  //  +++
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author :{
    required:true,
    type: authorSchema  
  }   // type author schema krdi taa ke schema ke saary properties is author object mn aa ja aain +++++ 
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}


async function updateAuthor(id){   // by quary first ++++
  const course = await Course.findById(id)
  if (!course) { return;}
  course.author.name = "Syeda nabiha jamali"
  course.author.website = "www.nabo.com"
  course.name = "java course"
  const result = await course.save()
  console.log("successfully updated", result )
}

async function Authorupdatefirst(id){   // update first ++++
  const result = await Course.findByIdAndUpdate(id,{$set:{
    'author.name':"syeda nabiha jamal :)"  // traverse using . 
},},{new:true})
  console.log("successfully updated", result )
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));   // create course ke andar hi author bna aain gain // alag se nai // composition +++

// Authorupdatefirst("62d9305e81a91cbc68f01701")   //++++
// updateAuthor("62d9305e81a91cbc68f01701")   //+++


// OUTPUT ON MONGODB ++

// {
//   name: 'Node Course',
//   author: { name: 'Mosh', _id: new ObjectId("62d9305e81a91cbc68f01700") },
//   _id: new ObjectId("62d9305e81a91cbc68f01701"),
//   __v: 0
// }




// NOW THE author becomes a ""sub document"" that is embeded in course documents . And these sub documents are like a normal documents  // we can apply validations like is required etc and if we want only name of the author is required then make required :true directly on author schema ,  update etc them  // Writing an update author  async func on above  //+++


//------------------------------------------------------------------------

//  Using an of sub document  

//-------------------------------------------------------------------------


// Suppose we have to save a course with multiple authors then we can run use embedded authors array 

// CODE IMPLEMENTATION 




const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: {type:String,required:true},  //  +++
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author :{
    required:true,
    type: [authorSchema]   
  }   // type author schema array  krdi taa ke schema ke saary properties is author object mn aa ja aain aur array bn ja aa inki =====
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}


async function updateAuthor(id){   // by quary first ++++
  const course = await Course.findById(id)
  if (!course) { return;}
  course.author.name = "Syeda nabiha jamali"
  course.author.website = "www.nabo.com"
  course.name = "java course"
  const result = await course.save()
  console.log("successfully updated", result )
}

async function Authorupdatefirst(id){   // update first ++++
  const result = await Course.findByIdAndUpdate(id,{$set:{
    'author.name':"syeda nabiha jamal :)"  // traverse using . 
},},{new:true})
  console.log("successfully updated", result )
}

// WE CAN ALSO ADD A NEW AUTHOR IN THE EXISTING COURSE BY USING A PUSH METHOD OF ARRAY  ============
async function addNewAuthor(id, author){
  const course = await Course.findById(id);
  course.author.push(author);
  const result = await course.save()
}

// WE CAN ALSO REMOVE AN AUTHOR ===========
async function removeAuthor (courseID, authorID){
  const course = await Course.findById(courseID)
  const author =  course.author.id(authorID)  // id method search krta ha for  matching  _id // then we can remove 
  author.remove();
  const result = await course.save()
  
}


// createCourse('Node and java course', [
//   new Author ({name: "ibrahim", bio:"bio", website:"nbc.com"}),
//   new Author ({name: "nabiha", bio:"bio", website:"nabo.com"})
// ]);   // PASSIN GAN ARRAY OF AUTHOR/S INSTEAD OF SINGLE OBJECT ======== 

// Authorupdatefirst("62d9305e81a91cbc68f01701")   //++++
// updateAuthor("62d9305e81a91cbc68f01701")   //+++

// addNewAuthor("62d93f51d173bf4ee9be1f80" ,new Author ({name: "sufiyan", bio:"bio", website:"sufi.com"}))   // ===========

removeAuthor("62d93f51d173bf4ee9be1f80","62d94233ad97152870441580");  // sufiyan deleted  ===========



// NOW THE author becomes a sub document that is embeded in course documents . And these sub documents are like a normal documents  // we can apply validations like is required etc and if we want only name of the author is required then make required :true directly on author schema ,  update etc them  // Writing an update author  async func on above  //+++


//----------------------------------------------------------------
 
// Project restructure ( Vidly Phase 4 )

//----------------------------------------------------------------
// Bth mongoose and joi schemas are independent 
// we can also embed a custom schema like 
//  type : new mongoose.Schema({}) instead of  type : moviesSchema
// this technique is used to shorting the schamas for example in real world there can be a 50+ properties of customers we can define new schema of little peoperties    



// added movies.js route and model aur genere ko embedd kr dia movies.js 
// rentals.js models and route 


//---------------------------------------------------------------

//  build  a rental api 

//---------------------------------------------------------------


// Successfully built in vidly phase 4 

// Maked rentals and movies apis functional : )


//-----------------------------------------------------------------

// transaction 

//-----------------------------------------------------------------


// # In relational databases we have a concept of transaction which basically means a group of operations that should perform as a single unit 
// box of 4 circles 
// * if any operation is failed our database roled back to an initial state 

// # In Mongodb we dont have transactions as in relational databases 
// we have two phase commit 

// we are using a libarary to implement mongodb 2 phase commits 
// * npm i fawn

// * rentals ke andar hmy transaction lagani cha ha ya for reducing stock and saveing renatals and movies 



// APPLYING IT IN VIDLY PHASE 5 

const Fawn = reuire('fawn')
Fawn.init(mongoose);
// * Fawn will create a new collection for transactions in mongodb and it will be empty when the operation is complete 



// CODE IMPLEMENTATION OF RENTLE.JS ROUTE IN VIDLY 5


const Fawn = require("fawn");   // ye loa
const {Rental,validate}= require("../models/rentals")
const {Film}= require("../models/movies")
const {Customer}= require("../models/customers")
const Joi = require('jOi');
const mongoose = require("mongoose")
const express = require('express');
const router = express.Router();
Fawn.init("mongodb://localhost/vidly"); //-------------------------
// router.use(express.json());




//gettting all courses frm db
router.get('/',  async (req,res)=>{

    try {
        const rentals = await Rental
            .find()
            .sort({dateOut:-1})
            // .select({genere:1})
            
        res.send(rentals);
        
    } catch (error) {
        res.send(error.message)
        
    }
    




})

// getting with specific id 
router.get('/:id', async (req,res)=>{
    
    const rentals = await  Rental.findById(req.params.id)
        
    if (!rentals) {
        res.status(404).send("the rental with that id was not found");
        return;

        
    }
    res.send(rentals);

    


})


router.delete('/:id',async (req,res)=>{
    // find  -- if found delete -- return

    const rental = await  Rental.findByIdAndDelete(req.params.id)

    
    if (!rental) {
        res.status(404).send("the rental with that id was not found");
        return; 
    }
    
    res.send(rental)

});



router.post('/', async (req,res)=>{
    const {error} = validate(req.body);
    
    if (error) {
        res.status(400).send(error.details[0].message); 
        return;    
    }

    // fetcting and confirming the dependencies ---

    const costumer = await Customer.findById(req.body.CustomerID)
    // console.log(costumer);
    if (!costumer) {
        res.status(400).send("Invalid costumer ID");
        return;
        // res.status(400).send(error.datails[0].message);
    }
    
    const movie = await Film.findById(req.body.MoviesID)
    console.log(movie)
    if (!movie) {
        res.status(400).send("Invalid movie ID");
        console.log(movie)
        return;
    }

    if (movie.numberInStock===0) {
        res.send("The movie is not in stock :(")
        
    }

   const newRental = new Rental({
        customer:{
            _id:costumer._id,
            name: costumer.name,
            // isGold:costumer.isGold,  // ye why not 
            phone:costumer.phone
        },
        movies:{
         
    
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate

        },
        
        // dateReturned:req.body.,
        // rentalFee:   // iska daikhna pry ga ke kaisay calculate krna ha 

    })


   try {
    // const result = await newRental.save();  //
    // movie.numberInStock--;
    // movie.save();
    // using fawn instead of above 3 lines for a trnsaction 
    new Fawn.Task()  //----------------------
        .save('rentals', newRental)
        .update('films',{_id: movie._id},{
            $inc:{numberInStock:-1} // jis movie ki id di vi ha usko decrement krny ke lia  // you can also use .remove() to remove a document 
        })
        .run();
        // .update('movies',{quary to search an object }, {operations})
        res.send(newRental)  
    
    } catch (error) {
     res.send(error.message);
   }


})



router.put('/:id',async(req,res)=>{    // update first approach 
    //  find genere -- validate input  -- return    (top pe validate rkhny hain )
    const {error} = validate(req.body);
    
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
        
    }

    const costumer = await Customer.findById(req.body.CustomerID)
    if (!costumer) {
        res.status(400).send("Invalid costumer ID");
        return;
        // res.status(400).send(error.datails[0].message);
    }
    
    const movie = await Film.findById(req.body.MovieID)
    if (!movie) {
        res.status(400).send("Invalid movie ID");
        return;
    }

    const rental = await Rental.findByIdAndUpdate(req.params.id,{$set:{
        "customer.name":req.body.custumer
        
    },},{new:true})
     

    

    
    if (!rental) {
        res.status(404).send("the categorey to be updated was not found");
        return;
    } 
    
    
    
    res.send(genere);


})

module.exports = router;

//----------------------------------------------------------------------

//  OBjectID 

//---------------------------------------------------------------------

//_id:62dd147f17fd98f839e15c16

// 12 bytes

// 4 bytes : timestamp
// 3 bytes : machine identifier
// 2 bytes : process identifier 
// 3 bytes : counter

// 1 byte = 8 bits 
// 2 ^ 8 = 256
// 2 ^ 24 = 16M  (if we create 16M documents in 1 sec then there is a chance of of objects with same id )

// Driver -> MongoDB

// mongoDB driver create unique id for mondodb 

// we can also create an objectID

const mongoose = require("mongoose")
const id = new mongoose.Types.ObjectId();  // this line will gnrerate a valid  obj id that we can use any where in the mongodb 
console.log(id.getTimestamp())  /// this will give the stamp at the time ihis id is created 


//We have also a method for  validating an objectID in mongoose 

const isValid = mongoose.Types.ObjectId.isValid("1234");  //false 
// const isValid = mongoose.Types.ObjectId.isValid("62dd30d088d2d1b70d38f7f6"); // true 
console.log(isValid);


// 2022-07-24T11:56:06.000Z
// false  // coz the id is invalid  // it will retun true when the id is valid 


//--------------------------------------------------------------------------

// Validating object IDs in mongoose 

//---------------------------------------------------------------------------

// we can validate theobject id by using mongoose isValid function 
// And also using joi objectId validator 

// CODE IMPLEMENTATION 


// rental.js route //(alternative of joi objectId)
//------------------------------------------------



router.post('/', async (req,res)=>{
    const {error} = validate(req.body);
    
    if (error) {
        res.status(400).send(error.details[0].message); 
        return;    
    }

    //  We can validate objectIds using that invalid properties // but this implementation is not feseable coz we have to repeate the  same process for all the ids . So we will use the above validate function for validation ======
    // if (!mongoose.Types.ObjectId.isValid(req.body.CustomerID)) {
        
    //     res.status(400).send("Invalid customer")
    // }

    // fetcting and confirming the dependencies ---

    const costumer = await Customer.findById(req.body.CustomerID)
    // console.log(costumer);
    if (!costumer) {
        res.status(400).send("Invalid costumer ID");
        return;
        // res.status(400).send(error.datails[0].message);
    }
    
    const movie = await Film.findById(req.body.MoviesID)
    console.log(movie)
    if (!movie) {
        res.status(400).send("Invalid movie ID");
        console.log(movie)
        return;
    }

    if (movie.numberInStock===0) {
        res.send("The movie is not in stock :(")
        
    }

   const newRental = new Rental({
        customer:{
            _id:costumer._id,
            name: costumer.name,
            // isGold:costumer.isGold,  // ye why not 
            phone:costumer.phone
        },
        movies:{
         
    
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate

        },
        
        // dateReturned:req.body.,
        // rentalFee:   // iska daikhna pry ga ke kaisay calculate krna ha 

    })


   try {
    // const result = await newRental.save();  //
    // movie.numberInStock--;
    // movie.save();
    // using fawn instead of above 3 lines for a trnsaction 
    new Fawn.Task()  //----------------------
        .save('rentals', newRental)
        .update('films',{_id: movie._id},{
            $inc:{numberInStock:-1} // jis movie ki id di vi ha usko decrement krny ke lia  // you can also use .remove() to remove a document 
        })
        .run();
        // .update('movies',{quary to search an object }, {operations})
        res.send(newRental)  
    
    } catch (error) {
     res.send(error.message);
   }


})



// rental.js model  
//----------------


const Joi = require('jOi');
Joi.objectId = require("joi-objectid") (Joi)  //====== for validating objectIds of mongodb uing joi 
const mongoose = require("mongoose")


const rentalSchema =  new mongoose.Schema({ // const rentalSchema
    customer:{
        
        
        type: new mongoose.Schema({
            name:{
                
                type:String,
                minlength:3,
                maxlength:20,
                required:true,
                
            },
            
            isGold:{
                type:Boolean,
                default:false
                
            },
            
            
            phone:{
                type:String,
                required:true,
                minlength:3,
                maxlength:40,
            }

        }),
        required:true
        },

    movies:{
        type: new mongoose.Schema({

            title:{
        
                type:String,
                minlength:3,
                maxlength:30,
                trim:true,
                required:true,
        
            },

            dailyRentalRate:{
                type:Number,
                required:true,
                min:3,
                max:50        
            },


        }),
        required:true


    },
    dateOut:{
        type:Date,
        default: Date.now,
        required:true

    },
    dateReturned:{
        type:Date,
    },
    rentalFee:{
        type:Number,
        min:0,
        // required:true
        
    }

        
    
})
    
const Rental =  mongoose.model("rental",rentalSchema)

// const movies = [
//     {id: 1 , genere: "horror"},
//     {id: 2 , genere: "adventures"},
//     {id: 3 , genere: "funny"},
// ]



const ValidateRentals = rental=>{

    const  schema={
        CustomerID: Joi.objectId().required(),
        MoviesID: Joi.objectId().required()
    };

    return Joi.validate(rental,schema);


}

// So by using joi.objectId we can check if the object id is of mongodb pttern
// ON POST MAN JSON WINDOW 
//---------------
// {"CustomerID":"12123"                               // declaring invalid obj id 
// ,"MoviesID":"62dd00ad4c7c17d6ce4e0091"

// }

//ON response
//----------
// "CustomerID" with value "12123" fails to match the valid mongo id pattern

exports.validate = ValidateRentals;
exports.Rental = Rental;
exports.rentalSchema = rentalSchema;



//-------------------------------------------------------------------

// A batter implementation

//-------------------------------------------------------------------


// We should  load joi.object in index.js joi object and use it every where globally 


/// vidly phase 5 mn joi.objectId ko index.js mn load krwa lia 
// SPECTATATE VIDLY PHASE 5 FOR MORE DETAILS AND THAT [HASE IS FINAL FOR THAT SECTION ]