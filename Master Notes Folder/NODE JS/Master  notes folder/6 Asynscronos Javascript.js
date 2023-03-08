
// ______________________________________________________________________________



// ASYNCHRONOUS VS SYNCHRONOUS JAVASCRIPT 



// ________________________________________________________________________________


// What is synchronous code :
        //  When the first line executes the second line is blocking and have to wait until the first line finishes the execution this type of code is called synchronous 

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
// xx  
// THis is not an ideal but a batter to escape call back hell 




// There is a batter way to deal with asynchronous code and that by using promises
//________________________________________

// PROMISES  
//_________________________________________


// jacascript promises  : 
        //  WHICH are exterely powerful when dealing with asynchronous code
        
        // 1 . Holds an eventual result of an asynchronous operation ( basiacally a  function (eg with some time taken operations)db se samaan aa rha ha aur front end pe send krna ha ) 

        // 2 . So when the asynchronous operation completes it can either be a value or an error 

        //  3 . Initially when we create a promise object it will be in a PENDING  state at this point it will kick off some asynshronous operation . When the reeult is ready the promise can either be fullfilled= 'result' . or if something went wring then its value will be 'error' 

        // LETS SEE IN ACTION 


        // Creating a promise 
// WHere resolve and reject are its self a function function ke arguments functions 
const promise = new Promise((resolve, reject)=>{
    // kicking off some asynshronous operation 
    // you may starting a database , start a web server , set a timer or any kind of asynshronous operation 

    // we are using resolve to send this value to the consumer's of this promise object  = result
    resolve(1);  // lets imagine our asynshronous operation completes ad we get result as 1  in the real life we will have a user json object that we are getting from the database 

    // And if something went wrong then we want ot return an error to the consumer of that promise  
    reject(new Error ("error message "))  // each error object in js have a message property which stores error message 
});

// catch for catching any errors
// then for getting the result of asynshronous operation
// finally err or result and value can  not be modified 
// where result is the the resolved output 
promise.then(result=>{console.log("result : ", result )})




// OUTPUT 
// result :  1


//--------------------adding reject method and consuming that promise object 


// This is how we coreate it 
// Creating a promise 
// WHere resolve and reject are its self a function function ke arguments functions 
const promise = new Promise((resolve, reject)=>{
    // kicking off some asynshronous operation 
    // you may starting a database , start a web server , set a timer or any kind of asynshronous operation 

    // we are using resolve to send this value to the consumer's of this promise object  = result
    
    setTimeout(()=>{
        resolve(1); 
        
        // And if something went wrong then we want ot return an error to the consumer of that promise  
        // reject(new Error ("error message aagya error"))
        
    },2000)
    
    // catch for catching any errors
    // then for getting the result of asynshronous operation
    // finally err or result and value can  not be modified 
    // where result is the the resolved output 
    
    // this is how we consume it 
});
    promise
    .then(result=>{console.log("result : ", result )})
    .catch(err=>{console.log("Error : ", err.message)})
    



// OUTPUT 
// result : 1 

// OUTPUT // resolve commented 
// Error :  error message aagya error


// ------------simplified version 



// this is how we create it
const promise = new Promise((resolve, reject)=>{
   
    setTimeout(()=>{
        resolve(1);  // pending => resolved , fulfilled 
        
        
        reject(new Error ("error message aagya error")) // pending => rejected
        
    },2000)
    

});

promise
    .then(result=>{console.log("result : ", result )})
    .catch(err=>{console.log("Error : ", err.message)})
    

// take away = anywhere there is a async operation function  taht takes a callback you should modify that function to return promise  

// OUTPUT 
// 




//------------------------------------------------------------------------------

// Replacing callbacks with promises 

//---------------------------------------------------------------------------


// take away = anywhere there is a async operation function  taht takes a callback you should modify that function to return promise  



// INITIAL CALLBACK CONTAINNG CODE ------INDEX.JS

console.log('Before');
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    })
  })
});
console.log('After');

function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading a user from a database...');
    callback({ id: id, gitHubUsername: 'mosh' });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    callback(['repo1', 'repo2', 'repo3']);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    callback(['commit']);
  }, 2000);
}



// REPLACED WITH PROMISES CODE   bs callback ko hata do aur function body should be wrapped  in promise object (yani async work should be wrapped in promise object)
// return the result with resolve 

console.log('Before');
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    })
  })
});
console.log('After');

function getUser(id) {
        const promise = new Promise((resolve,reject)=>{
                
                setTimeout(() => {
                  console.log('Reading a user from a database...');
                  resolve( { id: id, gitHubUsername: 'mosh' });
        
                }, 2000);
        })
}

function getRepositories(username) {
        const promisess = new Promise((resolve,reject)=>{

                setTimeout(() => {
                  console.log('Calling GitHub API...');
                  resolve(['repo1', 'repo2', 'repo3']);
                }, 2000);
        })
}

function getCommits(repo) {
        const promises = new Promise((resolve,reject)=>{

                setTimeout(() => {
                  console.log('Calling GitHub API...');
                  resolve(['commit']);
                }, 2000);
        })
}

//------------------------------------------------------------------------------

// REwriting the callback approach with promises  and consuming them 

//-----------------------------------------------------------------------------


// callback approach 

console.log('Before');
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     })
//   })
// });
console.log('After');


// Promises approach 

// const promise = getUser(1)
getUser(1)
        .then(user=>getRepositories(user.gitHubUsername))
        .then(repos=>getCommits(repos[0]))
        .then(commits=>console.log("COMMITS", commits))
// Now the promise of get  user is resolved to ressole the promise of getRepository add another .then block
// promise.then(user=>getRepositories(user.gitHubUsername)) 


function getUser(id) {
         return new Promise((resolve,reject)=>{
                
                setTimeout(() => {
                  console.log('Reading a user from a database...');
                  resolve( { id: id, gitHubUsername: 'mosh' });
        
                }, 2000);
        })
}

function getRepositories(username) {
        return new Promise((resolve,reject)=>{

                setTimeout(() => {
                  console.log('Calling GitHub API...');
                  resolve(['repo1', 'repo2', 'repo3']);
                //   console.log(repos[0])
                }, 2000);
        })
}

function getCommits(repo) {
        return new Promise((resolve,reject)=>{

                setTimeout(() => {
                  console.log('Calling GitHub API...');
                  resolve(['commit']);
                }, 2000);
        })
}


// SO THE OUTPUT IS 

// Before
// After
// Reading a user from a database...
// Calling GitHub API...
// Calling GitHub API...
// COMMITS [ 'commit' ]




//------------------------------------------------------------------

// Creating setteled promise 

//------------------------------------------------------------------

// LOOKING api of promise object in js  in more detailed

// Some times you want ot create a promise that is already ressolved this is particularly useful when writing unit test . So you want to simulate a scenario where a async operation like calling a webserver completes successfullly 

// So in a unit test you want to create a promise that is already ressolved 

const promise =  Promise.resolve({id: 1})
promise.then(user=>{console.log(user)});


// And in some cases you want to create a promise that is already rejected 

const promise =  Promise.reject(new Error(" reason of rejection  message"))
promise.catch(err=>console.log(err.message))


//--------------------------------------------------------------------

// Parallel promises 

//--------------------------------------------------------------------

// Sometimes you want to run a few asynchronous operations in parallel and when they all compete then you want to do something after for example you may call different apis like facebook api or twitter api and when the result of both asynchronous operations are ready then you want to show something o the client 


// In the above we get first user after 2 sec thwn repos ater 2 sec  then commits ater 2 sec 



// LETS SIMULATE

const p1 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log("calling fb api")
        resolve(1);

    },2000)
})


const p2 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log("calling twitter api")
        resolve(2);

    },2000)
})

//  ye methods Promise class ke methos hain instead of promise obj p.resolve , p.reject , p.all etc 
// the 'all'  wil return a new promise when all the promises of  that array is ressolved
Promise.all([p1,p2])
    .then(result=>{console.log(result)})

    // OUtPut 
// calling fb api
// calling twitter api
// [ 1, 2 ]

// it is still in single threading thrad start the 1st operation then released then start the other . they are not displaying on same time but almost same time 


// WE ARE NOT WAITING FOR THE 1ST ASYNCHRONOUS OPERATION TO BE READY BEFORE STARTING ANOTHER ASYNCHRONOUS OPERATION .


//like in our previous example of user and repo in which each asynchronous operation started after the pre asynchronous operation is completed 



//____________what if one of these promises failes : if any on e of the promise is failed the the whole resultant promise is considered as failed 


// code implementation 


const p1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log("calling fb api")
        // resolve(1);
        reject(new Error("something went wrong "))

    },2000)
})


const p2 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log("calling twitter api")
        resolve(2);

    },2000)
})

//  ye methods Promise class ke methos hain instead of promise obj p.resolve , p.reject , p.all etc 
// the 'all'  wil return a new promise when all the promises of  that array is ressolved
Promise.all([p1,p2])
    .then(result=>{console.log(result)})
    .catch(err=>{console.log(err)})
    // OUtPut 
// calling fb api
// calling twitter api
// Error: something went wrong

// it is still in single threading thrad start the 1st operation then released then start the other . they are not displaying on same time but almost same time 


// WE ARE NOT WAITING FOR THE 1ST ASYNCHRONOUS OPERATION TO BE READY BEFORE STARTING ANOTHER ASYNCHRONOUS OPERATION .


//like in our previous example of user and repo in which each asynchronous operation started after the pre asynchronous operation is completed 





//----------------- what if  we want ot do something in which as soon as  1 promise in this array is fullfilled promise array is passed 


// Code implementation 

const p1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log("calling fb api")
        resolve(1);
        // reject(new Error("something went wrong "))

    },2000)
})


const p2 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log("calling twitter api")
        resolve(2);

    },2000)
})

//  ye methods Promise class ke methos hain instead of promise obj p.resolve , p.reject , p.all etc 
// the 'all'  wil return a new promise when all the promises of  that array is ressolved
Promise.race([p1,p2])
    .then(result=>{console.log(result)})
    .catch(err=>{console.log(err)})
    // OUtPut 
    // calling fb api
    // 1
    // calling twitter api

// it is still in single threading thrad start the 1st operation then released then start the other . they are not displaying on same time but almost same time 


// WE ARE NOT WAITING FOR THE 1ST ASYNCHRONOUS OPERATION TO BE READY BEFORE STARTING ANOTHER ASYNCHRONOUS OPERATION .


//like in our previous example of user and repo in which each asynchronous operation started after the pre asynchronous operation is completed 



//-------------------------------------------------------------------------

// Async and Await 

//-------------------------------------------------------------------------


// callback approach 

console.log('Before');
//--------
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     })
//   })
// });
//---------
console.log('After');


// Promises approach 
//--------
// const promise = getUser(1)
// getUser(1)
//         .then(user=>getRepositories(user.gitHubUsername))
//         .then(repos=>getCommits(repos[0]))
//         .then(commits=>console.log("COMMITS", commits))
//-------
// Now the promise of get  user is resolved to ressole the promise of getRepository add another .then block
// promise.then(user=>getRepositories(user.gitHubUsername))


// Async and await approach 
// * Async and await are built  promises 
// * Helps to write async code like synchronous // await ki madad se hm promise ka result aik consant mn store kr sktay hain  
// * Internally when js engine execute that code ti will convert that await code into promises wala code that is shown above 
// * when the thread sees await it will start that task and goes further without waiting for complition 
// Every time when a function  returns a promise then we can await that function 
// When ever oyu use await you have to use a function that is decorated with async
// like this       // And once the promise is fullfilled it does not return a value its void so it does not return anything 
// in async and Await we have not a catch method so we will use try catch to cathc errors 
async function DisplayCommits(){
        
        
        try {
                const user = await getUser(1)
                const Repositories = await getRepositories(user.gitHubUsername) 
                const commits = await getCommits(Repositories[0])
                console.log('The commits are : ', commits)
                
        } catch (error) {
                console.log( "THE ERROR IS ",error);
                
        }

                
}
// running the code 
DisplayCommits();

function getUser(id) {
         return new Promise((resolve,reject)=>{
                
                setTimeout(() => {
                  console.log('Reading a user from a database...');
                  resolve( { id: id, gitHubUsername: 'mosh' });
        
                }, 2000);
        })
}

function getRepositories(username) {
        return new Promise((resolve,reject)=>{

                setTimeout(() => {
                  console.log('Calling GitHub API...');
                  resolve(['repo1', 'repo2', 'repo3']);
                //   console.log(repos[0])
                }, 2000);
        })
}

function getCommits(repo) {
        return new Promise((resolve,reject)=>{

                setTimeout(() => {
                  console.log('Calling GitHub API...');
                //   console.log("commits")
                  resolve(['commit']);
                }, 2000);
        })
}


// SO THE OUTPUT IS of asyns and await is 

// Before
// After
// Reading a user from a database...
// Calling GitHub API...
// Calling GitHub API...
// The commits are :  [ 'commit' ]



//---------------------------------------------------------------------
// convert callback approach into async and await approach  

// Exercise.js 





// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function sendEmailToGoldMember(){

        try {
      
          
        const customer = await getCustomer(1)
        console.log("Customer : ", customer)
        if (customer.isGold) {
          const TopMovies = await getTopMovies()
          console.log('Top movies: ', TopMovies);
          const email = await sendEmail(customer.email,TopMovies)
          console.log("Email sent")
          
        }
      
          
        } catch (error) {
          console.log(error)
          
        }
      }
      
      sendEmailToGoldMember();
      
      
      
      function getCustomer(id) {
        return new Promise ((resolve)=>{
      
          setTimeout(() => {
            resolve({ 
              id: 1, 
              name: 'Mosh Hamedani', 
              isGold: true, 
              email: 'email' 
            });
          }, 4000)
      
        })
      
        
      }
      
      function getTopMovies() {
        return new Promise((resolve)=>{
      
          setTimeout(() => {
            resolve(['movie1', 'movie2']);
          }, 4000)
      
        })
      
      
        
       
      }
      
      function sendEmail(email, movies) {
        return new Promise((resolve)=>{
      
      
          setTimeout(() => {
            resolve();
          }, 4000)
      
        })
        
      }






// // Some times you want ot create a promise that is already ressolved this is particularly useful when writing unit test . So you want to simulate a scenario where a async operation like calling a webserver completes successfullly 

// // So in a unit test you want to create a promise that is already ressolved 

// // const promise =  Promise.resolve({id: 1})
// // promise.then(user=>{console.log(user)});


// // And in some cases you want to create a promise that is already rejected 

// const promise =  Promise.reject(new Error(" reason of rejection  message"))
// promise.catch(err=>console.log(err.message))

