// Authentication :
//        It is the process of identifying if the user is who claim they are   // for example the user sends us password and we uthencte it

// Authrization : is determining if the user have the right permision to perform the given operation 



// Creating vidly phase 6 for this section 



// IN JOI schema  TO ENSURE THAT THIS EMAIL IS VALID USE .email
//  email:  Joi.string().max(50).min(3).required().email(),


//----------------------------------------------------------

// Registering users 

//----------------------------------------------------------

// IN VIDLY 6
// created register new user route/api and model
// introduced unique property of schema and uniqueness f user check using findOne and applying email filter

//------------------------------------------------------------------

// Using lodash (to modify the response )

//------------------------------------------------------------------

// * We can enforce user for the suggested password like password must contain 3 char 2 uppercases etc by using 

joi-passwords-complexity  ///+++++++++++++++ vip  

// We dont want to return password in the response we we can mdify the response 

// * By using lodash which gives a lot of utility function to work with objects 
// * It is a modified version of underscore 
// Its documentation 
// https://lodash.com/

// code implementation using lodash 


// for registering new users
const _ = require("lodash");  // --------------------
const Joi = require('jOi');
const {validate,User} = require ("../models/register");
const mongoose = require("mongoose")
const express = require('express');
const router = express.Router();



//gettting all courses frm db
router.get('/',  async (req,res)=>{

    try {
        const users = await User
            .find()
            .sort({name:-1})
            // .select({genere:1})
            
        res.send(users);
        
    } catch (error) {
        res.send(error.message)
        
    }

})

router.post('/', async (req,res)=>{
    const {error} = validate(req.body);
    
    if (error) {
        res.status(400).send(error.details[0].message); 
        return;    
    }
    // ye let newUser krlo aur neechay se const hata do 
    const checker = await User.findOne({email:req.body.email})
    if (checker) {
        res.status(400).send("User already registered..");
        return;
        
    }

   

   const newUser = new User(///-------------------------------
    // {
    //    name:req.body.name,
    //    email:req.body.email,
    //    password:req.body.password}
    _.pick(req.body,['name','email','password'])   // iski madad se baar baar req.body nai krna pry ga 
    )


   try {
        const result = await newUser.save();  //--------------------
    
        res.send(_.pick(newUser,['name','email'])); // ab sirf response mn name and email hi ja aa gi  
        // we can omit password in the response by sending costum object manually 
    
        // res.send({
        //     name:newUser.name,
        //     email:newUser.email
        // })
    
    } catch (error) {
        res.send(error.message);
   }


})



//-------------------------------------------------------------------

// Hashing passwords 

//-------------------------------------------------------------------


// We are using a libarary called bcrypt to hash the passwords 
//
// So npm i bcrypt



// we can store 1234 -> abcd    ( and this process is irreversible).
// but the hacker can hash the list of popular passwords to the real value of hashed password . So we will use a 'salt'   

// * A salt is basically a random string that is added before or after the original password so that it will be different from the original one 

// *  password aya -> salt add kia -> hash kia -> store kia


// EXAMPLE 

const bcrypt = require('bcrypt');
async function run(){

    const salt =await bcrypt.genSalt(10)   // where 10 is the number of rounds if the nmber of rounds are greater then the salt will be more complex and harder to break but it will take more time to be ready
    // Now hashing the password  1234 (our password entered by user)
    const hashedpassword= await bcrypt.hash('1234', salt)
    console.log("salt : ",salt)
    console.log('hashed password : ',hashedpassword)
}

run();


// Now IMPLEMENTING PASSWORD HASING IN REGISTER.JS // TO HASH USERS PASSWORDS 
// SO BY ADDING( princess  ) password for our new user the password is bcrypted into
"$2b$10$W0d9jT21fibA2SmQ.esApeSxLRQsp4ytwr4ZCFBQVftS1zE2uBw/K"  // this 


// CODE IMPLEMENTATION +


// for registering new users
const bcrypt = require('bcrypt')   ///++++
const _ = require("lodash");  // --------------------
const Joi = require('jOi');
const {validate,User} = require ("../models/register");
const mongoose = require("mongoose")
const express = require('express');
const router = express.Router();



//gettting all courses frm db
router.get('/',  async (req,res)=>{

    try {
        const users = await User
            .find()
            .sort({name:-1})
            // .select({genere:1})
            
        res.send(users);
        
    } catch (error) {
        res.send(error.message)
        
    }

})

router.post('/', async (req,res)=>{
    const {error} = validate(req.body);
    
    if (error) {
        res.status(400).send(error.details[0].message); 
        return;    
    }
    // ye let newUser krlo aur neechay se const hata do 
    const checker = await User.findOne({email:req.body.email})
    if (checker) {
        res.status(400).send("User already registered..");
        return;
        
    }

   

   const newUser = new User(///-------------------------------
    // {
    //    name:req.body.name,
    //    email:req.body.email,
    //    password:req.body.password}
    _.pick(req.body,['name','email','password'])   // iski madad se baar baar req.body nai krna pry ga 
    )

    // USING HASING IN THE USER OBJECT +++
    const salt =await bcrypt.genSalt(10)   //++++++++++++
    newUser.password= await bcrypt.hash(newUser.password, salt) //++++++++++++


   try {
        const result = await newUser.save();  //--------------------
    
        res.send(_.pick(newUser,['name','email'])); // ab sirf response mn name and email hi ja aa gi  
        // we can omit password in the response by sending costum object manually 
    
        // res.send({
        //     name:newUser.name,
        //     email:newUser.email
        // })
    
    } catch (error) {
        res.send(error.message);
   }


})


module.exports = router ;



//----------------------------------------------------------------------------

//  AUTHENTICATING EMAIL AND PASSWORD 

//----------------------------------------------------------------------------

// auth.js  (router)



// for registering new users
const bcrypt = require('bcrypt')   ///++++
const _ = require("lodash");  // --------------------
const Joi = require('jOi');
const {User} = require ("../models/register");
const mongoose = require("mongoose")
const express = require('express');
const router = express.Router();


router.post('/', async (req,res)=>{
    const {error} = validate(req.body);
    
    if (error) {
        res.status(400).send(error.details[0].message); 
        return;    
    }
    // ye let newUser krlo aur neechay se const hata do 
    
    // CHECK FOR VERIFYING A VALID EMAIL  
    const UserChecker = await User.findOne({email:req.body.email})
    if (!UserChecker) {
        res.status(400).send("Invalid Email or Password");
        return;
        
    }

    // CHECK FOR VERIFYING A VALID PASSWORD 
    const verifyPassword = await bcrypt.compare(req.body.password,UserChecker.password); //bcrypt will fetch salt from mongodb  -> then hash the give password -> add salt in it -> and if both password becomes same then it will return true
    if (!verifyPassword) {
       res.status(400).send("Invalid Email or Password");
       return ; 
    }

    
    res.send(true);
})




const validate = verifyUserRequest=>{

    const  schema={
        
        email:  Joi.string().max(50).min(3).required().email(),
        password: Joi.string().max(20).min(8).required(),
    };

    return Joi.validate(verifyUserRequest,schema);


}



module.exports = router ;




//-----------------------------------------------------------------------

// JSON web tockens 

//------------------------------------------------------------------------


/// A JSON web token is a long string that identifies a user 
// as a metahphor we can think of it as our liscence or password 

// So when the user login on the server we need to generate a json web tocken which is like a liscence or password -> we give it to the client -> so on the client we need to store that json web tocken -> So we can send it back to the server for future api calls // clint can be web or app // if you have a web app youcan store it in the local store of the web

// * https://jwt.io/   // real demonstraction of json web tocken 

// * pink part is standard 
// * purple part is payload -> which contains the properties of the user -> we did not run a quary to get the user properties from the db authntication mn jweb tokens ke payload se extract kr skta hain 

// * blue part -> is a digital siginature 
// a hacker can not generate a digital . he needs a private key which is only avalible on server  -> if he is not accessed the server hhe cnat generate a valid digital signature 
// * admin =true 


//-----------------------------------------------------------------------

// Generation Authencating tockens 

//-----------------------------------------------------------------------


// WE have various libararies for working with different platform of jwt 

//  * npm i jsonwebtoken


// SO THAT TOCKEN IS CREATED
// BY SENDING email: 123nabo@gmail.com , password: princess (on postman)

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlZjY3ZDQzYTcxNTQyYTNiNzZmODgiLCJuYW1lIjoibmFiaWhhIGphbWFsaSIsImlhdCI6MTY1OTAxMTAwNX0.4U2wnlenmzY4YsKpQhftp_RxPbh-VzaEvNqrg0BX3ns

// payload data 

// {
//     "_id": "62def67d43a71542a3b76f88",
//     "name": "nabiha jamali",
//     "iat": 1659011005
//   }


// for registering new users
const jwt = require('jsonwebtoken') //=====
const bcrypt = require('bcrypt');   
const _ = require("lodash");  
const Joi = require('jOi');
const {User} = require ("../models/register");
const mongoose = require("mongoose")
const express = require('express');
const router = express.Router();


router.post('/', async (req,res)=>{
    const {error} = validate(req.body);
    
    if (error) {
        res.status(400).send(error.details[0].message); 
        return;    
    }
    // ye let newUser krlo aur neechay se const hata do 
    
    // CHECK FOR VERIFYING A VALID EMAIL  
    const UserChecker = await User.findOne({email:req.body.email})
    if (!UserChecker) {
        res.status(400).send("Invalid Email or Password");
        return;
        
    }

    // CHECK FOR VERIFYING A VALID PASSWORD 
    const verifyPassword = await bcrypt.compare(req.body.password,UserChecker.password); //bcrypt will fetch salt from mongodb  -> then hash the give password -> add salt in it -> and if both password becomes same then it will return true
    if (!verifyPassword) {
       res.status(400).send("Invalid Email or Password");
       return ; 
    }

    // CREATING A JSON WEB TOCKEN //==========
    const token = jwt.sign({_id:UserChecker._id,name:UserChecker.name}, 'PrivateKey')

    res.send(token);
    
    // const token =  jwt.sign(//payload , secret private key in real world ise env var mn save )
    
    // res.send(true);
})




const validate = verifyUserRequest=>{

    const  schema={
        
        email:  Joi.string().max(50).min(3).required().email(),
        password: Joi.string().max(20).min(8).required(),
    };

    return Joi.validate(verifyUserRequest,schema);


}



module.exports = router ;



//--------------------------------------------------------------------------

// Stroting json token in env variable 

//--------------------------------------------------------------------------


// CREATED CONFIG FOLDER 
// USED CONFIG ENV VARIABLE IN AUTH TO STORE JSON PRIVATE KEY
// MAKING IN COMPLSARY TO SET IT BEFORE RUNNIGN APPLICATION IN INDEX.JS


// INDEX.JS 


const express = require('express');
const Joi = require('jOi');
Joi.objectId = require("joi-objectid") (Joi)  // for validating objectIds of mongodb using joi 
const movies = require('./routes/moviesCategories');
const config = require('config');  //=======================

const customers = require('./routes/customers');
const mongoose = require ("mongoose");
const films = require('./routes/movies');
const rentals = require('./routes/rentals');
const register = require('./routes/register');
const auth = require('./routes/auth');

const app = express();
mongoose.connect("mongodb://localhost/vidly")
    .then(console.log("successfully connected"))
    .catch((error)=>{console.log("failed to connect",error)})


app.use(express.json());
app.use('/api/movies', movies);
app.use('/api/customers', customers);
app.use('/api/films', films);
app.use('/api/rentals', rentals);
app.use('/api/register', register);
app.use('/api/auth', auth);


// MAKING IT COMPULSARY TO SET THAT VARIABLE 
const sett = config.get('jwtPrivateKay')
if (!sett) {
    console.error("Fatal error: jwtPrivateKay is not defined");

    process.exit(1);
    
    return; // zero indicates success
};

const port = process.env.PORT|| 3004;

app.listen(port, ()=> {console.log(`listening on port ${port}`)});


//--------------------------------------------------------------------------

// Setting response headers 

//--------------------------------------------------------------------------

// to set headers in the response  . We can use res.header() method isko 
// to define a header  x- se prefix krn azaroori ha phir ani arbitarary 


// ye knry se nabiha document mn x-auth-token : json web token set ho gaya

// SO in our client app we can read this header we can store this json web token on the client and next time to make api call we will send this to the server 



// for registering new users
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')   ///++++
const _ = require("lodash");  // --------------------
const Joi = require('jOi');
const {validate,User} = require ("../models/register");
const mongoose = require("mongoose")
const express = require('express');
const router = express.Router();



//gettting all courses frm db
router.get('/',  async (req,res)=>{

    try {
        const users = await User
            .find()
            .sort({name:-1})
            // .select({genere:1})
            
        res.send(users);
        
    } catch (error) {
        res.send(error.message)
        
    }

})

router.post('/', async (req,res)=>{
    const {error} = validate(req.body);
    
    if (error) {
        res.status(400).send(error.details[0].message); 
        return;    
    }
    // ye let newUser krlo aur neechay se const hata do 
    const checker = await User.findOne({email:req.body.email})
    if (checker) {
        res.status(400).send("User already registered..");
        return;
        
    }

   

   const newUser = new User(///-------------------------------
    // {
    //    name:req.body.name,
    //    email:req.body.email,
    //    password:req.body.password}
    _.pick(req.body,['name','email','password'])   // iski madad se baar baar req.body nai krna pry ga 
    )

    // USING HASING IN THE USER OBJECT +++
    const salt =await bcrypt.genSalt(10)   //++++++++++++
    newUser.password= await bcrypt.hash(newUser.password, salt) //++++++++++++
    const token = jwt.sign({_id:newUser._id,name:newUser.name}, config.get('jwtPrivateKay'))   //||||||||||||


   try {
      
        const result = await newUser.save();  //--------------------
        //DEFINING HEADER  //|||||||||||||
        res.header('x-auth-token',token).send(_.pick(newUser,['name','email']));

        // res.send(_.pick(newUser,['name','email'])); // ab sirf response mn name and email hi ja aa gi  
        // we can omit password in the response by sending costum object manually 
    
        // res.send({
        //     name:newUser.name,
        //     email:newUser.email
        // })
    
    } catch (error) {
        res.send(error.message);
   }


})


module.exports = router ;



