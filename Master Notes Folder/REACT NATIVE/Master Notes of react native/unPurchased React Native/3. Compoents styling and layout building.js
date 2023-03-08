// ...currentGoals ye us current object ke all the key value pairs ko contain kr laita ha 

// Also with the help of this we can do for css like 
// ...props.style we can we can assign new styles regardless of current styles and can override the current styles the syntax is 

// style={{...styles.card, ...props.style}}

// shadows are only applicable in ios we use eleveation in android 

// Template for components creation

import React from "react";
import {Text , View , StyleSheet} from "react-native";
const Header =(props)=>{

    return(
     null
    )

}

const styles = StyleSheet.create({
 


})

export default Header;



// VERY MAIN SECTION

// IN THAT SECTION WE WILL ALSO WORK WITH SCREENS 
// SCREENS ARE JUST COMPONENTS BUT THEY ARE COMPLETE ON THEIR OWN 

// Example code 


// screen folder  mn StartScreenGame.js-----------------

import React from "react";
import {Text , View , StyleSheet, TextInput, Button} from "react-native";
const StartScreenGame =(props)=>{

    return(
     <View style={styles.screen}>
        <Text style={styles.title}>Let's start the game</Text>
        <View style={styles.container}>
        <TextInput placeholder='Enter your number' style={styles.textInput} onChangeText={""} />
        <View style={styles.buttons}>
        <Button title="hahah"/>
        <Button title="start" />
        </View>
        </View>

        
     </View>
    )

}

const styles = StyleSheet.create({

    container:{
        backgroundColor:"white",
        borderRadius:10,
        margin:30,
        alignItems:"center",
        width:300,
        padding:20,
        maxWidth:"80%",  // for responsivness
        // height:400,
        // justifyContent:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,  // ye agar 0 ho ga tou vertical shadow gone in ios android ke lia sirf elevation ah

        elevation: 5,
    },

    title:{
        fontSize:20,

    },
 
    screen:{
        // backgroundColor:"red",
        flex:1,
        // padding:30,
        padding:16,
        alignItems:'center'
    },

    textInput:{

        // alignItems:"center",
         width:'100%',
        //  width:'100%',
        marginVertical:30,
        backgroundColor:'white',
        borderColor:'black',
        borderWidth:1,
        padding:5,
        borderRadius:10,

        // shadowColor: "#000",
        // shadowOffset: {
	    // width: 0,
	    // height: 2,
        //     },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation:4


    },

    buttons:{

        flexDirection:'row',
        // neechay wali 2 lines ke ilawa ye bhi sai ha
         justifyContent:'space-around',
        // paddingHorizontal:15,
        // justifyContent:'space-between',
        width:'60%',
        margin:10,

    },

})

export default StartScreenGame;




// components mn Header.js ----------------


import React from "react";
import {Text , View , StyleSheet} from "react-native";
const Header =(props)=>{

    return(
        <View style={styles.Header}>
            <Text style={styles.HeaderTitle} >{props.title}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    Header:{
        width:'100%',
        backgroundColor:'#f7287b',
        // height:'10%',
        height:90,
        paddingTop:36,
        justifyContent:"center",
        alignItems:"center"



    },

    HeaderTitle:{
        color:'black',
        fontSize:18,
        // fontWeight:13,

    }


})

export default Header;



// APP.JS -----------------


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput } from 'react-native';
import Header from './components/Header';
import StartScreenGame from './screens/StartScreenGame';
export default function App() {
  return (
    <View style={styles.screen}>
      <Header title={"The guess game"}/>
      <StartScreenGame/>



    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    

  }
});


// _______________________________________________________________

// We can make special empty layouts just like that card component 
// that act like a view contains only a single basic object and all css is applied on it 

// Now making card component  ---------------


// Card.js --------------


import React from "react";
import {Text , View , StyleSheet} from "react-native";
const Card =(props)=>{
// ...styles.card (contains all the key value pairs) ...styles.props (contains all the key value of the styles from the outsouce outside of the card coponents) then final styles will be the merge of both 
    return(
     <View style={{...styles.card, ...props.style}}>{props.children}</View>
    )

}

const styles = StyleSheet.create({
 card:{
    backgroundColor:"white",
    borderRadius:10,
    margin:30,
    alignItems:"center",
    width:300,
    padding:20,
    maxWidth:"80%",  // for responsivness
    // height:400,
    // justifyContent:"center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,  // ye agar 0 ho ga tou vertical shadow gone in ios android ke lia sirf elevation ah

    elevation: 5,
}

})

export default Card;



// StartGmaeScreen.js ---------------------

import React from "react";
import {Text , View , StyleSheet, TextInput, Button} from "react-native";
import Card from "../components/Card";
import { Colors } from "react-native/Libraries/NewAppScreen";
const StartScreenGame =(props)=>{

    return(
     <View style={styles.screen}>
        <Text style={styles.title}>Let's start the game</Text>
        {/* replacing view container with card layout  */}
        <Card style={styles.container}>
        <TextInput placeholder='Enter your number' style={styles.textInput} onChangeText={""} />
        <View style={styles.buttons}>
        <View style={styles.button}>
        <Button color={"#c717fc"} title="RESET"/>
        </View>
        <View style={styles.button}>
        <Button color={"#f7287b"} title="CONFIRM" />
        </View>
        </View>
        </Card>

        
     </View>
    )

}

const styles = StyleSheet.create({

    container:{
        // working verified
        // backgroundColor:"black"
    },

    title:{
        fontSize:20,

    },
 
    screen:{
        // backgroundColor:"red",
        flex:1,
        // padding:30,
        padding:16,
        alignItems:'center'
    },

    textInput:{

        // alignItems:"center",
         width:'100%',
        //  width:'100%',
        marginVertical:30,
        backgroundColor:'white',
        borderColor:'black',
        borderWidth:1,
        padding:5,
        borderRadius:10,

        // shadowColor: "#000",
        // shadowOffset: {
	    // width: 0,
	    // height: 2,
        //     },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation:4


    },

    buttons:{
        // backgroundColor:'red',

        flexDirection:'row',
        // neechay wali 2 lines ke ilawa ye bhi sai ha
         justifyContent:'space-around',
        // paddingHorizontal:15,
        // justifyContent:'space-between',
        width:'90%',
        // margin:10,

    },

    button:{
        width:100,
        maxWidth:90,   // ye check 
        marginHorizontal:40,

        // paddingHorizontal:
        
    }

})

export default StartScreenGame;



// _____________________________________________________________________________

// to make a constant theme of colours we can make a new file of key value pairs 
// that can be in any folder . So, by changing them from it will change it from everywhere 

// like this  

// Colors.js -> in constans folder --------------

export default{

    primary:"#f7287b",
    secondary:"#c717fc"
}

// now the header and stratscreengame brcomes-----

import React from "react";
import colors from "../constants/colors";
import {Text , View , StyleSheet} from "react-native";
const Header =(props)=>{

    return(
        <View style={styles.Header}>
            <Text style={styles.HeaderTitle} >{props.title}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    Header:{
        width:'100%',
        backgroundColor:colors.primary,
        // height:'10%',
        height:90,
        paddingTop:36,
        justifyContent:"center",
        alignItems:"center"



    },

    HeaderTitle:{
        color:'black',
        fontSize:18,
        // fontWeight:13,

    }


})

export default Header;


// _____________________________________________________________

// Configuring and styling  textInput  

// Making the separate file for textInput .To make it reuseable

// We can configure the input by setting its different properties we can set it directly from the input component but for different scenerios there is a difference 

// so we will  set input configuration from where that component  was actually used and then pass it to the input component by setting
 {...props}  // property in the input ke textinput component 



// Input.js -------------


import React from "react";
import {TextInput, StyleSheet} from "react-native";
const Input  =(props)=>{
// iss ...props mn saari text input ki properties incluting style= wali bhi but the below style will override that style coming with ...props
    return(
     <TextInput {...props}  style={{...styles.input,...props.style}}/>
    )

}

const styles = StyleSheet.create({
    input:{

        // Secondary 

                // alignItems:"center",
                // textAlign:'center',
                // width:50,
               //  width:'100%',
               marginVertical:30,
               backgroundColor:'white',
               borderBottomColor:'red',
               // borderColor:'black',
               // borderWidth:1,
               borderBottomWidth:1,
               padding:5,
               // borderRadius:10,
       
            //    // // shadowColor: "#000",
            //    // // shadowOffset: {
            //    // // width: 0,
            //    // // height: 2,
            //    // //     },
            //    // // shadowOpacity: 0.25,
            //    // // shadowRadius: 3.84,
            //    // // elevation:3

        


        //primary 
        // textAlign:'center',
        //     width:'70%',
        // //  width:'100%',
        // marginVertical:30,
        // backgroundColor:'white',
        // borderColor:'grey',
        // borderWidth:1,
        // padding:5,
        // borderRadius:10,





    },



})

export default Input ;






// Now 

// StartScreenGmae.js 


import React, { useState } from "react";
import {Text , View , StyleSheet, TextInput, Button} from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";
import Input from "../components/Input";
const StartScreenGame =(props)=>{

    const [enteredNumber,setenteredNumber]= useState('');
    const [selectedNumber, setSelectedNumber ]= useState('');
    // aik extra state use kr rhy hain to verfy that if the use confirmed or not his choice then we will display the button to the user to start the game 
    const [flag, setflag ]= useState(false);

    const InputNumberHandler = enteredNumber=>{
     // Now we want to make sure that the input should only be a numbr so we use 
        setenteredNumber(enteredNumber);

    }



    const resetInputHandler = ()=>{
        setenteredNumber('');
        setflag(false);

    }

    const confirmInputHandler = ()=>{
        userInput = parseInt(enteredNumber)
        if (userInput===NaN || userInput<=0 || userInput> 99) {
            return;

        }

        setSelectedNumber(userInput);
        setenteredNumber('');
        setflag(true);

//it does not matters
        // setenteredNumber('');
        // setSelectedNumber(userInput);
        // setflag(true);


    }
    return(
     <View style={styles.screen}>
        <Text style={styles.title}>Let's start the game</Text>
        {/* replacing view container with card layout  */}
        <Card style={styles.container}>
            <Text>Select a number </Text>
            {/* we will replace TextInput with our input component  */}
            {/* jb hm value daaal kr done py click krty hain tou bluronsubmit AUTOMATICALLY keyboard andar kr daita ha  */}
        <Input autoCorrect={false} keyboardType={"number-pad"} maxLength={2}  blurOnSubmit autoCapitalize="none"   style={styles.textInput} onChangeText={InputNumberHandler} />
        <View style={styles.buttons}>
        <View style={styles.button}>
        <Button onPress={resetInputHandler} color={colors.secondary} title="RESET"/>
        </View>
        <View style={styles.button}>
        <Button onPress={confirmInputHandler} color={colors.primary} title="CONFIRM" />
        </View>
        </View>
        </Card>

        
     </View>
    )

}

const styles = StyleSheet.create({

    textInput:{
        textAlign:'center',
        width:50,
        // width:'100%',
        // //  width:'100%',
        // marginVertical:30,
        // backgroundColor:'white',
        // borderColor:'black',
        // borderWidth:1,
        // padding:5,
        // borderRadius:10,

    },

    container:{
        // working verified
        // backgroundColor:"black"
    },

    title:{
        fontSize:20,

    },
 
    screen:{
        // backgroundColor:"red",
        flex:1,
        // padding:30,
        padding:16,
        alignItems:'center'
    },


    buttons:{
        // backgroundColor:'red',

        flexDirection:'row',
        // neechay wali 2 lines ke ilawa ye bhi sai ha
         justifyContent:'space-around',
        // paddingHorizontal:15,
        // justifyContent:'space-between',
        width:'90%',
        // margin:10,

    },

    button:{
        width:100,
        maxWidth:90,   // ye check 
        marginHorizontal:40,

        // paddingHorizontal:
        
    }

})

export default StartScreenGame;







// _______________________________________________________________________

// Cleaning user input and softkeyboard 

// if we want to make sure that the user touches anywhere and then the keyboard will be removed etc then wrapping our code in touchable without feed back is good idea 
//* in which when onpress{}  the react native gives us a useful api called Keyboard
// and  byusing this we can handle keyboard by  
keyboard.Dismiss 


// SO,

// APP.JS -------------------------


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, TouchableWithoutFeedback,Keyboard } from 'react-native';
import Header from './components/Header';
import StartScreenGame from './screens/StartScreenGame';

// const dismisser = ()=>{Keyboard.dismiss}

export default function App() {
  return (
    // will act like a button but there is no visual like buttom
    // RECAP FROM INTRO 
    // TouchableOpacity 
    // TouchableHighlight (ye backgrounf colour change krta ha )
    // TouchableNativeFeedback (currently supporting on android (ye wo jo sadahara button mn hota ha ))
    // TouchableWithoutFeedback (ye kuch nai kry g bs make it touchable )
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >

    <View style={styles.screen}>
      <Header title={"The guess game"}/>
      <StartScreenGame/>



    </View>
</TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    

  }
});


// StartScreenGame.JS------------


import React, { useState } from "react";
import {Text , View , StyleSheet, TextInput, Button} from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";
import Input from "../components/Input";
const StartScreenGame =(props)=>{

    const [enteredNumber,setenteredNumber]= useState('');
    const [selectedNumber, setSelectedNumber ]= useState('');
    // aik extra state use kr rhy hain to verfy that if the use confirmed or not his choice then we will display the button to the user to start the game 
    const [flag, setflag ]= useState(false);

    const InputNumberHandler = enteredNumber=>{
     // Now we want to make sure that the input should only be a number so we use
    //  (VALIDATING USING REGULR EXPRESSION  )
        setenteredNumber(enteredNumber.replace(/[^0-9]/g), '');  // this regular expression will replace any characer other than 0 to 9 number value with a blank '' space (in case if in some android device user have a decimal so he will not be able to do that )

    }



    const resetInputHandler = ()=>{
        setenteredNumber('');
        setflag(false);

    }

    const confirmInputHandler = ()=>{
        userInput = parseInt(enteredNumber)
        if (userInput===NaN || userInput<=0 || userInput> 99) {
            return;

        }

        setSelectedNumber(userInput);
        setenteredNumber('');
        setflag(true);

//it does not matters
        // setenteredNumber('');
        // setSelectedNumber(userInput);
        // setflag(true);


    }
    return(
     <View style={styles.screen}>
        <Text style={styles.title}>Let's start the game</Text>
        {/* replacing view container with card layout  */}
        <Card style={styles.container}>
            <Text>Select a number </Text>
            {/* we will replace TextInput with our input component  */}
            {/* jb hm value daaal kr done py click krty hain tou bluronsubmit AUTOMATICALLY keyboard andar kr daita ha  */}
        <Input autoCorrect={false} keyboardType={"number-pad"} maxLength={2}  blurOnSubmit autoCapitalize="none"   style={styles.textInput} onChangeText={InputNumberHandler} />
        <View style={styles.buttons}>
        <View style={styles.button}>
        <Button onPress={resetInputHandler} color={colors.secondary} title="RESET"/>
        </View>
        <View style={styles.button}>
        <Button onPress={confirmInputHandler} color={colors.primary} title="CONFIRM" />
        </View>
        </View>
        </Card>

        
     </View>
    )

}

const styles = StyleSheet.create({

    textInput:{
        textAlign:'center',
        width:50,
        // width:'100%',
        // //  width:'100%',
        // marginVertical:30,
        // backgroundColor:'white',
        // borderColor:'black',
        // borderWidth:1,
        // padding:5,
        // borderRadius:10,

    },

    container:{
        // working verified
        // backgroundColor:"black"
    },

    title:{
        fontSize:20,

    },
 
    screen:{
        // backgroundColor:"red",
        flex:1,
        // padding:30,
        padding:16,
        alignItems:'center'
    },


    buttons:{
        // backgroundColor:'red',

        flexDirection:'row',
        // neechay wali 2 lines ke ilawa ye bhi sai ha
         justifyContent:'space-around',
        // paddingHorizontal:15,
        // justifyContent:'space-between',
        width:'90%',
        // margin:10,

    },

    button:{
        width:100,
        maxWidth:90,   // ye check 
        marginHorizontal:40,

        // paddingHorizontal:
        
    }

})

export default StartScreenGame;


//_________________________________________________________________

//  RESETTING AND CONFIRMING USER INPUT 

//_________________________________________________________________


//startcreengame



import React, { useState } from "react";
import {Text , View , StyleSheet, TextInput, Button} from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";
import Input from "../components/Input";
const StartScreenGame =(props)=>{

    const [enteredNumber,setenteredNumber]= useState('');
    const [selectedNumber, setSelectedNumber ]= useState('');
    // aik extra state use kr rhy hain to verfy that if the use confirmed or not his choice then we will display the button to the user to start the game 
    const [flag, setflag ]= useState(false);

    const resetInputHandler=()=>{
        // props.onAddingGoal(goal);
        setenteredNumber('');
        // setenteredNumber(null);
        
        setflag(false);
    
    
      }
     

    const InputNumberHandler = enteredtext=>{
     // Now we want to make sure that the input should only be a number so we use
    //  (VALIDATING USING REGULR EXPRESSION  )
        setenteredNumber(enteredtext.replace(/[^0-9]/g),'');  // this regular expression will replace any characer other than 0 to 9 number value with a blank '' space (in case if in some android device user have a decimal so he will not be able to do that )

    }




    const confirmInputHandler = ()=>{
      const   userInput = parseInt(enteredNumber)
        if (userInput===NaN || userInput<=0 || userInput> 99) {
            return;

        }

        setSelectedNumber(userInput);
        setenteredNumber('');
        setflag(true);

//it does not matters
        // setenteredNumber('');
        // setSelectedNumber(userInput);
        // setflag(true);

    


    }
    let confirmedNumber;

    if (flag) {
        confirmedNumber= <Text>the chosen nubmer is {selectedNumber}</Text>

        
    }


    return(
        <View style={styles.screen}>
       
        <Text style={styles.title}>Let's start the game</Text>
        {/* replacing view container with card layout  */}
        <Card style={styles.container}>
            <Text>Select a number</Text>
            {/* we will replace TextInput with our input component  */}
            {/* jb hm value daaal kr done py click krty hain tou bluronsubmit AUTOMATICALLY keyboard andar kr daita ha  */}
        <Input autoCorrect={false}
         keyboardType={"number-pad"}
        maxLength={2} 
        blurOnSubmit 
        autoCapitalize="none" 
        style={styles.textInput}
        onChangeText={InputNumberHandler} />
        <View style={styles.buttons}>
        <View style={styles.button}>
        <Button onPress={resetInputHandler} color={colors.secondary} title="RESET"/>
        
        </View>
        <View style={styles.button}>
        <Button onPress={confirmInputHandler} color={colors.primary} title="CONFIRM" />
        </View>
        </View>
        </Card>
        {confirmedNumber}

        
     </View>
    )

}

const styles = StyleSheet.create({

    textInput:{
        textAlign:'center',
        width:50,
        // width:'100%',
        // //  width:'100%',
        // marginVertical:30,
        // backgroundColor:'white',
        // borderColor:'black',
        // borderWidth:1,
        // padding:5,
        // borderRadius:10,

    },

    container:{
        // working verified
        // backgroundColor:"black"
    },

    title:{
        fontSize:20,

    },
 
    screen:{
        // backgroundColor:"red",
        flex:1,
        // padding:30,
        padding:16,
        alignItems:'center'
    },


    buttons:{
        // backgroundColor:'red',

        flexDirection:'row',
        // neechay wali 2 lines ke ilawa ye bhi sai ha
         justifyContent:'space-around',
        // paddingHorizontal:15,
        // justifyContent:'space-between',
        width:'90%',
        // margin:10,

    },

    button:{
        width:100,
        maxWidth:90,   // ye check 
        marginHorizontal:40,

        // paddingHorizontal:
        
    }

})

export default StartScreenGame;


//______________________________________________________________

// Showing the alert messages 

//______________________________________________________________
import React, { useState } from "react";
import {Text , View , StyleSheet, TextInput, Button, Alert } from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";
import Input from "../components/Input";
const StartScreenGame =(props)=>{
    // const nayaReset = (val) =>{
        //        setText('');
        //    }
        
        //  const changeHandler = value=>{
            //     setText(value.replace(/[^0-9]/g),''); 
            // //    setText(value)
    // }
    
    
    
    
    // const [text,setText]= useState('');
    const [text, setText] = useState('');
    const [selectedNumber, setSelectedNumber ]= useState('');
    // aik extra state use kr rhy hain to verfy that if the use confirmed or not his choice then we will display the button to the user to start the game 
    const [flag, setflag ]= useState(false);

    const resetInputHandler=()=>{
        // props.onAddingGoal(goal);
        setText('');
        // console.log(text)
        // setText(null);
        
        setflag(false);
    
    
      }
     

    const InputNumberHandler = enteredtext=>{
     // Now we want to make sure that the input should only be a number so we use
    //  (VALIDATING USING REGULR EXPRESSION  )
        setText(enteredtext.replace(/[^0-9]/g),'');  // this regular expression will replace any characer other than 0 to 9 number value with a blank '' space (in case if in some android device user have a decimal so he will not be able to do that )

    }



    // We can show alert messages by using the react native alert api 
    //  Alert.alert(title, message)
    const confirmInputHandler = ()=>{
        // Alert.alert("Invalid Input!", "The number should be between 1 & 99 :)" , [{text:"Ok", style:"destructive",onPress:{resetInputHandler}}] );
      const   userInput = parseInt(text)
        if (isNaN(userInput) || userInput<=0 || userInput> 99) {
            Alert.alert("Invalid Input!", "The number should be between 1 & 99 :)" , [{text:"Ok", style:"destructive",onPress:resetInputHandler}] );
            return;

        }

        setSelectedNumber(userInput);
        setText('');
        setflag(true);

//it does not matters
        // setText('');
        // setSelectedNumber(userInput);
        // setflag(true);

    


    }
    let confirmedNumber;

    if (flag) {
        confirmedNumber= <Text>the chosen nubmer is {selectedNumber}</Text>

        
    }


    return(

        <View style={styles.screen}>

            
    {/* <View> */}
    {/* <Input 
     autoCorrect={false}
     keyboardType={"number-pad"}
     maxLength={2} 
     blurOnSubmit 
     autoCapitalize="none" 
     style={styles.textInput}

    // style={{margin:30}}
    value ={text}
    onChangeText ={changeHandler}
    placeholder = 'Add '
   /> */}
  

  {/* </View> */}
            
       
        <Text style={styles.title}>Let's start the game</Text>
        {/* replacing view container with card layout  */}
        <Card style={styles.container}>
            <Text>Select a number</Text>
            <Input 
     autoCorrect={false}
     keyboardType={"number-pad"}
     maxLength={2} 
     blurOnSubmit 
     autoCapitalize="none" 
     style={styles.textInput}
    value ={text}        // AAAAAAAAHHHHHH PUCK THIS WAS AN ERROR 
    onChangeText ={InputNumberHandler}
    placeholder = 'Add '
   />
            {/* we will replace TextInput with our input component  */}
            {/* jb hm value daaal kr done py click krty hain tou bluronsubmit AUTOMATICALLY keyboard andar kr daita ha  */}
        {/* <Input autoCorrect={false}
        keyboardType={"number-pad"}
        maxLength={2} 
        blurOnSubmit 
        autoCapitalize="none" 
        style={styles.textInput}
        onChangeText={InputNumberHandler}
        /> */}
        <View style={styles.buttons}>
        <View style={styles.button}>
        <Button 
    title = "RESET"
    onPress = {resetInputHandler}
    // onPress = {()=>  { nayaReset(text)}}
    color={colors.secondary}
    />
        {/* <Button onPress={resetInputHandler} color={colors.secondary} title="RESET"/> */}
        
        </View>
        <View style={styles.button}>
        <Button   onPress = {confirmInputHandler} color={colors.primary} title="CONFIRM" />
        </View>
        </View>
        </Card>
        {confirmedNumber}

        
     </View>
    )

}

const styles = StyleSheet.create({

    textInput:{
        textAlign:'center',
        width:50,
        // width:'100%',
        // //  width:'100%',
        // marginVertical:30,
        // backgroundColor:'white',
        // borderColor:'black',
        // borderWidth:1,
        // padding:5,
        // borderRadius:10,

    },

    container:{
        // working verified
        // backgroundColor:"black"
    },

    title:{
        fontSize:20,

    },
 
    screen:{
        // backgroundColor:"red",
        flex:1,
        // padding:30,
        padding:16,
        alignItems:'center'
    },


    buttons:{
        // backgroundColor:'red',

        flexDirection:'row',
        // neechay wali 2 lines ke ilawa ye bhi sai ha
         justifyContent:'space-around',
        // paddingHorizontal:15,
        // justifyContent:'space-between',
        width:'90%',
        // margin:10,

    },

    button:{
        width:100,
        maxWidth:90,   // ye check 
        marginHorizontal:40,

        // paddingHorizontal:
        
    }

})

export default StartScreenGame;


//______________________________________________________________

// TIME TO FINISH THE CONFIRMATION BOX 

//______________________________________________________________



// APP.JS-----------


import React, { useState } from "react";
import {Text , View , StyleSheet, TextInput, Button, Alert, Keyboard } from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
const StartScreenGame =(props)=>{
    // const nayaReset = (val) =>{
        //        setText('');
        //    }
        
        //  const changeHandler = value=>{
            //     setText(value.replace(/[^0-9]/g),''); 
            // //    setText(value)
    // }
    
    
    
    
    // const [text,setText]= useState('');
    const [text, setText] = useState('');
    const [selectedNumber, setSelectedNumber ]= useState('');
    // aik extra state use kr rhy hain to verfy that if the use confirmed or not his choice then we will display the button to the user to start the game 
    const [flag, setflag ]= useState(false);

    const resetInputHandler=()=>{
        // props.onAddingGoal(goal);
        setText('');
        // console.log(text)
        // setText(null);
        
        setflag(false);
    
    
      }
     

    const InputNumberHandler = enteredtext=>{
     // Now we want to make sure that the input should only be a number so we use
    //  (VALIDATING USING REGULR EXPRESSION  )
        setText(enteredtext.replace(/[^0-9]/g),'');  // this regular expression will replace any characer other than 0 to 9 number value with a blank '' space (in case if in some android device user have a decimal so he will not be able to do that )

    }



    // We can show alert messages by using the react native alert api 
    //  Alert.alert(title, message)
    const confirmInputHandler = ()=>{
        // Alert.alert("Invalid Input!", "The number should be between 1 & 99 :)" , [{text:"Ok", style:"destructive",onPress:{resetInputHandler}}] );
      const   userInput = parseInt(text)
        if (isNaN(userInput) || userInput<=0 || userInput> 99) {
            Alert.alert("Invalid Input!", "The number should be between 1 & 99 :)" , [{text:"Ok", style:"destructive",onPress:resetInputHandler}] );
            return;

        }

        setSelectedNumber(userInput);
        setText('');
        setflag(true);
        Keyboard.dismiss;

//it does not matters
        // setText('');
        // setSelectedNumber(userInput);
        // setflag(true);

    


    }

    // WE CAN MAKE TO DISPLAY CERTAIN ELEMENTS LIKE THIS AND THEN USE INTO OUR REACT LIKE {confirmedNumber}//-------------

    let confirmedNumber;

    if (flag) {
        confirmedNumber=  <Card style={styles.confirmedNumber}>
            <Text style={{fontSize:20}}>You selected :P</Text>
            <NumberContainer>
                {selectedNumber}
            </NumberContainer>
            
            <Button title="Start the game" color={colors.secondary}/>
            </Card>


        
    }


    return(

        <View style={styles.screen}>

            
    {/* <View> */}
    {/* <Input 
     autoCorrect={false}
     keyboardType={"number-pad"}
     maxLength={2} 
     blurOnSubmit 
     autoCapitalize="none" 
     style={styles.textInput}

    // style={{margin:30}}
    value ={text}
    onChangeText ={changeHandler}
    placeholder = 'Add '
   /> */}
  

  {/* </View> */}
            
       
        <Text style={styles.title}>Let's start the game</Text>
        {/* replacing view container with card layout  */}
        <Card style={styles.container}>
            <Text>Select a number</Text>
            <Input 
     autoCorrect={false}
     keyboardType={"number-pad"}
     maxLength={2} 
     blurOnSubmit 
     autoCapitalize="none" 
     style={styles.textInput}
    value ={text}        // AAAAAAAAHHHHHH PUCK THIS WAS AN ERROR 
    onChangeText ={InputNumberHandler}
    placeholder = 'Add '
   />
            {/* we will replace TextInput with our input component  */}
            {/* jb hm value daaal kr done py click krty hain tou bluronsubmit AUTOMATICALLY keyboard andar kr daita ha  */}
        {/* <Input autoCorrect={false}
        keyboardType={"number-pad"}
        maxLength={2} 
        blurOnSubmit 
        autoCapitalize="none" 
        style={styles.textInput}
        onChangeText={InputNumberHandler}
        /> */}
        <View style={styles.buttons}>
        <View style={styles.button}>
        <Button 
    title = "RESET"
    onPress = {resetInputHandler}
    // onPress = {()=>  { nayaReset(text)}}
    color={colors.secondary}
    />
        {/* <Button onPress={resetInputHandler} color={colors.secondary} title="RESET"/> */}
        
        </View>
        <View style={styles.button}>
        <Button   onPress = {confirmInputHandler} color={colors.primary} title="CONFIRM" />
        </View>
        </View>
        </Card>
        {confirmedNumber}

        
     </View>
    )

}

const styles = StyleSheet.create({

    confirmedNumber:{
        height:220,
        width:220,
        
        // backgroundColor:',
        // borderColor:'black',
        // borderWidth:2,


    },

    textInput:{
        textAlign:'center',
        width:50,
        // width:'100%',
        // //  width:'100%',
        // marginVertical:30,
        // backgroundColor:'white',
        // borderColor:'black',
        // borderWidth:1,
        // padding:5,
        // borderRadius:10,

    },

    container:{
        // working verified
        // backgroundColor:"black"
    },

    title:{
        fontSize:20,

    },
 
    screen:{
        // backgroundColor:"red",
        flex:1,
        // padding:30,
        padding:16,
        alignItems:'center'
    },


    buttons:{
        // backgroundColor:'red',

        flexDirection:'row',
        // neechay wali 2 lines ke ilawa ye bhi sai ha
         justifyContent:'space-around',
        // paddingHorizontal:15,
        // justifyContent:'space-between',
        width:'90%',
        // margin:10,

    },

    button:{
        width:100,
        maxWidth:90,   // ye check 
        marginHorizontal:40,

        // paddingHorizontal:
        
    }

})

export default StartScreenGame;




// NumberContainer.js ----------------




import React from "react";
import {Text , View , StyleSheet} from "react-native";
import colors from "../constants/colors";
const NumberContainer =(props)=>{

    return(
        <View style={{...styles.container,...props.style}}>
        <Text style={styles.Textsettings} >{props.children}</Text>
    </View>
    )

}

const styles = StyleSheet.create({
    container:{
        // height:100,
        borderColor:colors.secondary,
        marginVertical:20,
        // margin:20,
        padding:20,
        borderWidth:2,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',

        
        
        // backgroundColour:'black',

    },

    Textsettings:{
        fontSize:22,
        color:colors.secondary
    }
   
 


})

export default NumberContainer;


//_______________________________________________________________________

// Adding game screen and adding random number generation 

//________________________________________________________________________


// We can add a new function outside a functional component . if your function dont rely on the props and states of the fuctional component then you can add a new function to save time and memory of the re rendering 



// GameScreen.js--------------


import React from "react";
import {Text , View , StyleSheet, Button } from "react-native";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";

const RandomNumberGenerator= (min,max,exclude)=>{
    min = Math.ceil(min)   // to round off the number to the integer if in case the float number is passed 
    max = Math.floor(max)  // if 99.0 then 99 so is lia floor
    const randomNumber = Math.floor(Math.random() *(max-min) + min)
    if (randomNumber===exclude) {
        RandomNumberGenerator(min,max,exclude);
        
    }
    else{
    return randomNumber;
    }

}

 
 }
const GameScreen =(props)=>{
    const [generatedNumber,setGeneratedNumber] = useState(RandomNumberGenerator(1,100,props.userChoice));

    return(

    
     <View>
        <Text>Opponent's guess</Text>
        <NumberContainer style={styles.Buttons}>
            {generatedNumber}
        </NumberContainer  >
            <Card style={styles.Buttons}>
            <Button title="Lower?"  onPress={numberGusser.bind(this,'lower')}/>
            <Button title="Greater?" onPress={numberGuesser.bind(this,'greater')}/>
            </Card>
        
     </View>
    
    //  <View>
    //     <Text>Opponent's guess</Text>
    //     <Card>
    //         {generatedNumber}
    //         <Card style={styles.Buttons}>
    //         <Button title="Lower?" />
    //         <Button title="Greater?"/>
    //         </Card>
    //     </Card>
    //  </View>
    )

}

const styles = StyleSheet.create({

    screen:{
        // backgroundColor:"red",
        flex:1,
        // padding:30,
        padding:16,
        alignItems:'center'
    },

    Buttons:{
        flexDirection:"row",
        justifyContent:"space-around",
        // width:"90%",
        // marginTop:20,
        // ma
    }
 


})

export default GameScreen;

//______________________________________________________________________

// Switching beteween the screens 

// We can effectively switch with the help of if blocks ad states  ---------


// App.js ------------


import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
// import React, { useState } from "react";
import { StyleSheet, Text, View , TextInput, TouchableWithoutFeedback,Keyboard } from 'react-native';
import Header from './components/Header';
import StartScreenGame from './screens/StartScreenGame';
import GameScreen from './screens/GameScreen';

// const dismisser = ()=>{Keyboard.dismiss}

// const [active,setActive]=(true);



export default function App() {
  


      // useState undefined == false in if ---------------------------------------
    const [chosen, setchosen]= useState(); 
    
    
    const chosenInputHandler= (chosenNumber)=>{
      setchosen(chosenNumber);
    }
    let content =    <StartScreenGame onChosen={chosenInputHandler}/>

    if (chosen) {
      content = <GameScreen userChoice={chosen}/> 
      
    }
      
      return (

    
    // will act like a button but there is no visual like buttom
    // RECAP FROM INTRO 
    // TouchableOpacity 
    // TouchableHighlight (ye backgrounf colour change krta ha )
    // TouchableNativeFeedback (currently supporting on android (ye wo jo sadahara button mn hota ha ))
    // TouchableWithoutFeedback (ye kuch nai kry g bs make it touchable )
<TouchableWithoutFeedback onPress={Keyboard.dismiss} >
    <View style={styles.screen}>

      <Header title={"The guess game"}/>
      {content}



    </View>
</TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    

  }
});



//_______________________________________________________________________


// useRef  hook if you dont wantthe component to re render  
// coz useState hook re render the the code  

// CODE IMPLEMENTATION 


import React from "react";
import {Text , View , StyleSheet, Button , Alert} from "react-native";
import Card from "../components/Card";
import { useState, useRef  } from 'react';
import NumberContainer from "../components/NumberContainer";

const RandomNumberGenerator= (min,max,exclude)=>{
    min = Math.ceil(min)   // to round off the number to the integer if in case the float number is passed 
    max = Math.floor(max)  // if 99.0 then 99 so is lia floor
    const randomNumber = Math.floor(Math.random() *(max-min) + min)
    if (randomNumber===exclude) {
        RandomNumberGenerator(min,max,exclude);
        
    }
    else{
    return randomNumber;
    }
}




const GameScreen =(props)=>{
    const [generatedNumber,setGeneratedNumber] = useState(RandomNumberGenerator(1,100,props.userChoice));

    const lowerBound = useRef(1);
    const upperBound = useRef(100);

    // const 

    const otherthenfirstNumberguesser =(hint)=>{

        if (hint=='lower' && props.userChoice>generatedNumber ) {
            Alert.alert("Don't cheat ;)","Please don't cheat :') ",[{style:'destructive',text:'ok sir '}])
            return;        
        }
    
        if (hint=='greater' && props.userChoice<generatedNumber ) {
            Alert.alert("Don't cheat ;)","Please don't cheat :') ",[{style:'destructive',text:'ok sir '}])
            return;
        }
    
        if (hint=='lower') {
            // updating the lower ound to the generated number 
            upperBound.current= generatedNumber;

            
        } // agar the geenerated number is smaller than the to be guessed then else block runs  
        else{
            lowerBound.current= generatedNumber;

        }

        const nextGuess = RandomNumberGenerator(lowerBound.current,upperBound.current,generatedNumber);

        setGeneratedNumber(nextGuess);
        


    }
    

    return(

    
     <View style={styles.screen}>
        <Text>Opponent's guess</Text>
        <NumberContainer style={styles.Buttons}>
            {generatedNumber}
        </NumberContainer  >
            <Card style={styles.Buttons}>
            <Button title="Lower?"  onPress={otherthenfirstNumberguesser.bind(this,'lower')}/>
            <Button title="Greater?" onPress={otherthenfirstNumberguesser.bind(this,'greater')}/>
            </Card>
        
     </View>
    
    //  <View>
    //     <Text>Opponent's guess</Text>
    //     <Card>
    //         {generatedNumber}
    //         <Card style={styles.Buttons}>
    //         <Button title="Lower?" />
    //         <Button title="Greater?"/>
    //         </Card>
    //     </Card>
    //  </View>
    )

}

const styles = StyleSheet.create({

    screen:{
        // backgroundColor:"red",
        flex:1,
        // padding:30,
        padding:16,
        alignItems:'center',
        // backgroundColor:'red'
        // justifyContent:'center'
    },

    Buttons:{
        flexDirection:"row",
        justifyContent:"space-around",
        // alignItems:'baseline'
        // width:"90%",
        // marginTop:20,
        // ma
    }
 


})

export default GameScreen;

//______________________________________________________________________________

// Introducing use effect hooks 

// useEffect hook :    it allows you to run side effects or in general Allows you to run logic after every render cycle 

//   // We can also set dependencies in useEffect  in which use effect only run when these values will be changed . by adding a second argument in the useEffect function 


// USING useEffect and Writing logic for displaying the game overScreen 



// App.js ---------------------


import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
// import React, { useState } from "react";
import { StyleSheet, Text, View , TextInput, TouchableWithoutFeedback,Keyboard } from 'react-native';
import Header from './components/Header';
import StartScreenGame from './screens/StartScreenGame';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen'

// const dismisser = ()=>{Keyboard.dismiss}

// const [active,setActive]=(true);



export default function App() {
  


      // useState undefined == false in if ---------------------------------------
    const [chosen, setchosen]= useState(); 
    const [totalNumberOfRounds,settotalNumberOfRounds]= useState(0);


    const againPlay= ()=>{
      setchosen();
      settotalNumberOfRounds(0);
      console.log("yaha aya")
      content = <StartScreenGame onChosen={chosenInputHandler}/>
    }

    
    
    const chosenInputHandler= (chosenNumber)=>{
      setchosen(chosenNumber);
    }
    let content =    <StartScreenGame onChosen={chosenInputHandler}/>

    
    const onEndingGameHandler = totalRounds=>{
      
      settotalNumberOfRounds(totalRounds);
      // setchosen(undefined)


    }

    if (chosen && totalNumberOfRounds<=0 ) {
      console.log(totalNumberOfRounds)
      content = <GameScreen userChoice={chosen} WhenCorrectGuessed={onEndingGameHandler}/> 
      // content= <StartScreenGame onChosen={chosenInputHandler}/>
      
    } 
    else if (totalNumberOfRounds>0){
      content = <GameOverScreen userchoice= {chosen} numberofrounds={totalNumberOfRounds} playAgain={againPlay}/>
      // content =<Text> hello
      {/* </Text> */}
      // trounds = totalNumberOfRounds;

    }


    // let trounds;
    
    // if (totalNumberOfRounds>0) {
    //   content = <GameOverScreen  />
    //    trounds = totalNumberOfRounds;
    // }


   
      return (

    
    // will act like a button but there is no visual like buttom
    // RECAP FROM INTRO 
    // TouchableOpacity 
    // TouchableHighlight (ye backgrounf colour change krta ha )
    // TouchableNativeFeedback (currently supporting on android (ye wo jo sadahara button mn hota ha ))
    // TouchableWithoutFeedback (ye kuch nai kry g bs make it touchable )
<TouchableWithoutFeedback onPress={Keyboard.dismiss} >
    <View style={styles.screen}>

      <Header title={"The guess game"}/>
      {content}
      {/* <Text>
      {trounds}
      </Text> */}



    </View>
</TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    

  }
});




// GameOverScreen.js -----------


import React from "react";
import {Text , View , StyleSheet, Button} from "react-native";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import colors from "../constants/colors";
const GameOverScreen =(props)=>{

    return(
        <View style={styles.screen}>

     <Card  >
        <Text style={{fontSize:25,color:colors.primary}}>
            The game is over 

        </Text>
        <Text>Your choice is  { props.userchoice}</Text>
        <Text> Total number of rounds {props.numberofrounds}</Text>
        
        <Button title="want to play again :)" color={"#be0d54"} onPress={props.playAgain} />
     </Card>
        </View>
    )

}

const styles = StyleSheet.create({
 
    
        screen:{
            // backgroundColor:"red",
            flex:1,
            // padding:30,
            padding:16,
            alignItems:'center'
        },


})

export default GameOverScreen;


// GameScreen.js





import React from "react";
import {Text , View , StyleSheet, Button , Alert} from "react-native";
import Card from "../components/Card";
import { useState, useRef , useEffect } from 'react';
import NumberContainer from "../components/NumberContainer";

const RandomNumberGenerator= (min,max,exclude)=>{
    min = Math.ceil(min)   // to round off the number to the integer if in case the float number is passed 
    max = Math.floor(max)  // if 99.0 then 99 so is lia floor
    const randomNumber = Math.floor(Math.random() *(max-min) + min)
    if (randomNumber===exclude) {
        RandomNumberGenerator(min,max,exclude);
        
    }
    else{
    return randomNumber;
    }
}




const GameScreen =(props)=>{
    const [generatedNumber,setGeneratedNumber] = useState(RandomNumberGenerator(1,100,props.userChoice));

    const [rounds,setRounds]= useState(0); 

    const lowerBound = useRef(1);
    const upperBound = useRef(100);

    // const 

    const otherthenfirstNumberguesser =(hint)=>{

        if (hint=='lower' && props.userChoice>generatedNumber ) {
            Alert.alert("Don't cheat ;)","Please don't cheat :') ",[{style:'destructive',text:'ok sir '}])
            return;        
        }
    
        if (hint=='greater' && props.userChoice<generatedNumber ) {
            Alert.alert("Don't cheat ;)","Please don't cheat :') ",[{style:'destructive',text:'ok sir '}])
            return;
        }
    
        if (hint=='lower') {
            // updating the lower ound to the generated number 
            upperBound.current= generatedNumber;

            
        } // agar the geenerated number is smaller than the to be guessed then else block runs  
        else{
            lowerBound.current= generatedNumber;

        }

        const nextGuess = RandomNumberGenerator(lowerBound.current,upperBound.current,generatedNumber);

        setGeneratedNumber(nextGuess);
        console.log(rounds)
// theyboth work         
        // setRounds(roundss=>roundss+1);
        setRounds(rounds+1);
        


    }

    // We can also set dependencies in useEffect  in which use effect only run when these values will be changed . by adding a second argument in the useEffect function 

    // Using advanced javascript to distruct props alag alag 
    const {WhenCorrectGuessed,userChoice} = props
    useEffect(()=>{
        if (generatedNumber==props.userChoice) {
            //  yaha pr hamain game over screen ko activate krna ho ga 
            // setRounds(rounds)
            props.WhenCorrectGuessed(rounds);
            
        }
    }, [generatedNumber,WhenCorrectGuessed,userChoice])
    

    return(

    
     <View style={styles.screen}>
        <Text>Opponent's guess</Text>
        <NumberContainer style={styles.Buttons}>
            {generatedNumber}
        </NumberContainer >
            <Card style={styles.Buttons}>
            <Button title="Lower?"  onPress={otherthenfirstNumberguesser.bind(this,'lower')}/>
            <Button title="Greater?" onPress={otherthenfirstNumberguesser.bind(this,'greater')}/>
            </Card>
        
     </View>
    
    //  <View>
    //     <Text>Opponent's guess</Text>
    //     <Card>
    //         {generatedNumber}
    //         <Card style={styles.Buttons}>
    //         <Button title="Lower?" />
    //         <Button title="Greater?"/>
    //         </Card>
    //     </Card>
    //  </View>
    )

}

const styles = StyleSheet.create({

    screen:{
        // backgroundColor:"red",
        flex:1,
        // padding:30,
        padding:16,
        alignItems:'center',
        // backgroundColor:'red'
        // justifyContent:'center'
    },

    Buttons:{
        flexDirection:"row",
        justifyContent:"space-around",
        // alignItems:'baseline'
        // width:"90%",
        // marginTop:20,
        // ma
    }
 


})

export default GameScreen;


//__________________________________________________________________________

// FOCUSING ON APP  STYLING AGAIN
// adding custom fonts

//______________________________________________________________________________
// adding images -_____________________________
