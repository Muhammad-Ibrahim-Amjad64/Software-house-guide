// Signup users and logging in

// Managing authentication status

// Storing authentication status on the device



// Authentication token has a life if it expires then it we have to refresh that life time depend upon teh api we are using


// In login and signup based applications we have two screens one is for unauthenticated where we will allow login and signup
// * And the other is for authenticated users which loggedin users can access



// Authentication steps

// 1. 1st we send http crendentials request to the backend
// 2. backend will validate the crenditals and generate a token and send this token to the device ( response with auth token)

//------------------------------------------------------------
// Authentication with firebase
//------------------------------------------------------------

// We will authentication with the help of firebase auth api


/// firase authentication will send you with some response for example idToken etc
// https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

// How to authenticate
// * Step 1 = go to the firebase console then go to the authentication section
// * STEP 2 = then go to the signin method then select method and enables