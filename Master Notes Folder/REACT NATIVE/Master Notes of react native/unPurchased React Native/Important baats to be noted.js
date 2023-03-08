// to create component    == `text input ki borderradius by wrapping it into view 

import React from "react";
import {Text , View , StyleSheet} from "react-native";
const FavourateScreen =(props)=>{

    return(
        <View style={styles.screen}>
            <Text>Hello</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    }


})

export default FavourateScreen;



//--------------------------------------------------------------
// Making layouts using flexbox == Guide
//----------------------------------------------------------------


// flexbox is used ot create layouts Notes


// * flex : 1  to occupy alll the avalible space
// * flex direction column / row
// * justify content and align items = how the element is distributed in rows or colums
 
// * alignitems are by default STRETCH

// then  kisi element ko certain amount ki width ya height daini ho to width or height '10%' and so on


// very important note=========== TO MAKE BEAUTIFUL LAYOUTS

// * Align items and justify content depends upon the flex direction
// * by default the flex direction is columns in react native  align items is always perpendicular to the flex direcion and justify ciontent is parallel

// * main axis depends upon the flex direction
// * cross axis is perpendicular to the flex direction



// * By default every view uses flexbox

// By default in web flexbox arrange the childrens in a row but in react native it uses columns.

// * if flex direction row hoga then there will be no impact on setting width yani jis direction ka flex direction hoga then there will be no impact on that direction.

// * agar manipulate krna h in the sencse of flex direction then use justify content instead but still you can not stretch in the flex direction or main axis . can only stretch in cross axis


// *  we can manipulate the element sizes on the main axis by only using flex property that  can be applied on every element that is inside the flexbox  inside the flexbox by setting it to 1 to then it will occupy all  1 : 1 they will 50 50 distribute 1 plus 1 = 2 then divide
                                          

// * children ke upr laga aain gy to use ke andar ke content pr flex ki properties apply hn gain

// * we can make a layout by defining the flex 1 on the parent container and flex 1 ,2, 3 on the child containers to distribute the space accordingly




//----------------------------------------------------------------------------------
// Styling in ios and android
//----------------------------------------------------------------------------------

// shadows are only applicable in ios we use eleveation in android
// borderRadius did not work in ios on <Text> component if you want to apply border radius on the text component the wrap that text component with a <View>

// Also the some properties are not supported props properties

// There is a shadow difference

// pressable ki different properties

// we can write platform spcific code

// shadow is not displayed ripple effect mn overflow visible android mn hidden



//----------------------------------------------------------------------
// ScrollView and flat list
//---------------------------------------------------------------------
// Dis Advantage of scroll view is that is renders the whole (even if you dont see them )list of items as a 
// whole & if your list list is too long lets say 2000 items then it can slow down your app . So, use flatlist

// What is flatist :
//        it renders only those items of the list that are present on the current screen . neecha walay jb karay ga jb hm neechay scroll karain gain. 
// codeing using flatList instead of scroll view


// * To use ScrollView wrap the map funtion with the ScrollView instead of view then ScrollView ko bhi view mn wrap kr ke styling apply and apply flex1 23 etc and other properties

// * scrollable will treat the content scrollable by providing the bouncing effect . by the ALWAYSBOUNCEVERTICAL property

// To use the flatlist make it a self closing tag with certain properties

// flat list has
// * data (define the list name here)
// * renderItem contains a function(single item then return and transform )
// * keyExtracter return af funtion item and index to return key simply return key like this


// like this =====

</View>

<GoalInput cancel={cancelGoalAddingHandler} mode={addMode} onAddingGoal={addGoalHandler}/>

{/*  Using flat insted of ScrollView aur flat list can replay the map method of arry with the help of render item  */}
 {/* key agar id set hogi tou hm key extracter ka use krskta hain  */}
<FlatList

// flat list is used to generate unique keys for all items :)
// item.id = is the index of the item . by default ye =>item.key hota ha mgr hmne uper id ki islia yahan bhi id karain gy item.id is the id of an item (goal)
//  we dont need key flatlist automatically key generate krta ha but not arrays of strings is not supported . us array mn key honi zarori ha
keyExtractor={(item,index)=>item.id}
data={goalList}
renderItem={goalitem=>(
  <Goalitem id={goalitem.item.id} goaltitle={goalitem.item.value} deleteGoal={goalDeleteHandler}/>

  // deleteGoal={goalDeleteHandler.bind(this,goalitem.item.id)}
  //  that would also work

  )
}/>
{/* jis view ko scroll view se replace karain gy wo scrollable ho ja aa ga  */}
{/* <ScrollView> */}
  {/* is view mn list of tasks display  */}

  {/* key is the unique identifier for each goal this syntax is alsi react specific hmne key goal ka naam hi set kr dia so hm aik task do bar add nai kraain gy assuming   */}

 {/* {goalList.map((mygoal)=>(

   <View key={mygoal}>
   <Text  style={styles.listofgoals}>{mygoal}</Text>
   </View>
   // islo view mn islia wrap kia coz view zayada styling support krta ha

 ))} */}

{/* </ScrollView> */ }

// 1ST USE OF SCROLLVIEW 

</View>

  // 2ND USE OF SCROLL VIEW WITH KEYBOARDAVOIDING VIEW
  // Perfect Sample code for FlatList and ScrollView
  

  // SCROLLVIEW SAMPLE STARTGAMESCREEN.JS
  import { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState('');

  const { width, height } = useWindowDimensions();

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber('');
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }

    onPickNumber(chosenNumber);
  }

  const marginTopDistance = height < 380 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={numberInputHandler}
              value={enteredNumber}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: 'center',
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});


  

//-----------------------------------------------------------------------
// Modals
//-----------------------------------------------------------------------

// * to make any component a modal just wrap it with a modal component
// and then display it using the state in App js to render the modal. ny using props mode and animations . so that we can apply animations on that modal


// React native modal component : https://reactnative.dev/docs/modal
//                    It is a component that is used to display certain views when they when we perform different functionalities 
// like in button press slide , fade , none properties ko define kr skta hain 
// here is the code example 

// phir hm view ko modals mn wrap kr skte hain aur thet will be displayed using animations

// MODALS APPLY KRNE SE SAARI CSS GONE HAAHH blke sb kuch hi gayab kr dia 
/// adding button in app.js for demonstraction
// adding states -> modal ko states ke sath visibility control kr skta hain 
// we can also add animation in the modal

// Modal is a different screen with different css and structure 

    // view is not actually occupying all the avalible space on the screen. So, by setting flex:1 it will occupy all space and that css will work nicely for modal view


// ADDING a new mode for enabling and disabeling the model using setAddmode state

// Adding a text auto clearing mode by adding a new function goaldatahandler() in goalinput()

// to resize buttons wrap them in views for styling them/\\\\\\\\\\\\\\\\\\\\\\\\\  

    
    // Like this 

    
import React,{ useState } from 'react';
import { StyleSheet, View, Button, TextInput ,Modal} from 'react-native';



const GoalInput = (props) => {
  const [goal, setgoal] = useState('');

  const goalDatahandler = () => {
    props.onAddingGoal(goal);
    setgoal('');
    


  }
  ///L.....\..
  const goalHandeler = (enteredText) => {
    setgoal(enteredText)
    // ye set goal goal ki value\\ update kry ga with every  key stroke
  }
  return (
    // We can set visibility of that modal // if 
    // <Modal>
    <Modal visible={props.mode} animationType={'slide'} statusBarTranslucent={true}>  
      <View style={styles.screen}>
      {/* is view mn adding  */}
      <TextInput placeholder='type your goal please :)' style={styles.textInput} onChangeText={goalHandeler}  value={goal}/>

      <View style={styles.buttons}>
        <View style={styles.Button}>

              <Button title='add'  color={'rgb(4, 9, 9)'} onPress={goalDatahandler} />
          </View>
          

          {/* <View style={styles.buttons}>
          <View style={styles.Button}>
            <TouchableOpacity
              style={{ backgroundColor:"rgb(67, 255, 249)"}}
           
              onPress={goalDatahandler}
            >
              
              <Text>ADD</Text>
            </TouchableOpacity>
          </View> */}

      <View style={styles.Button}>
      <Button  title='Cancel' color="red" onPress={props.cancel} />
      </View>

      </View>
      

      {/* <Button title='Add to your task' color={'rgb(20, 23, 81)'}  onPress={props.onAddingGoal.bind(this,goal)} /> */}
      {/* onPress={()=>props.onAddingGoal(goal)}    // confirmed that is working        that would work */}

      {/* but in react native that approach is not very effective we can use vanila js syntax  where bind is a function in which 'this' must be passed and actual parameter after that so  bind(this , goal) */}




      {/* //'rgb(134, 255, 215)'  ye wo sea green button*/} 

      </View>
    </Modal>
    ) 

}

export default GoalInput;







s320x320


const styles = StyleSheet.create({

  Button:{
    width:'40%'
  },

  screen:{
    // view is not actually occupying all the avalible space on the screen. So, by setting flex:1 it will occupy all space and that css will work nicely for modal view
    flex:1,
    backgroundColor:'rgb(0, 65, 51);',
    
    // flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
    
  },

  buttons:{
    flexDirection:'row',
    justifyContent:'space-around',
    width:'60%',
    margin:10,

    

  },

    
  // button:{
  //   backgroundColor:'cyan',
  //   // color:"rgb(134, 255, 215)",
  //   // backgroundColor2:'black',

  //   textDecorationColor:'bleck',
  //   borderColor:"blue",
  //   // borderWidth:5,
  
  // } ,

  textInput:{
        // marginRight:30,

    // justifyContent:'space-around',
    // alignItems:'center',
    
    // maxWidth:1000,
    width:'60%',
    
    backgroundColor:'white',
    borderColor:'cyan',
    borderWidth:1,padding:5},



})



//------------------------------------------------------------------
// TouchableOpacity is now getting old now use pressable
//--------------------------------------------------------------------

    // TOUCHABLEOPACITY LEGACY SYNTAX 
       <TouchableOpacity   activeOpacity={.1} onPress={props.deleteGoal.bind(this,props.id)}>
            <View >
                <Text  style={styles.listofgoals}>{props.goaltitle}</Text>
            </View>       
        </TouchableOpacity>

// * onPress is not supported with in the view component
// So wrap them with pressable, or touchable opacities  to support the onPress() event on any component

// Android ripple ------ the below will produce ripple outside the view

{/* <Pressable  android_ripple={{color:"grey"}} onPress={props.deleteGoal.bind(this,props.id)}>
<View >
    <Text  style={styles.listofgoals}>{props.goaltitle}</Text>
</View>       
</Pressable> */}
    
    //and that will produce ripple inside a view cuz pressable is inside a view
<View >
<Pressable  android_ripple={{color:"grey"}} onPress={props.deleteGoal.bind(this,props.id)}>
    <Text  style={styles.listofgoals}>{props.goaltitle}</Text>
</Pressable>
</View>       


// PRESSABLE KA  RIPPLE EFFECT ON ANDROID AND IOS

// Ripple effect in android

// * step 1  view ke andar pressable then view ki padding 0 aur andar ke content jo ke pressable ke andar uski padding set

// To effect on IOS

// pressable ka style prop ko utilize

// like this

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Touchablef,
  Pressable,
} from "react-native";
// import { TouchableOpacity } from 'react-native-web';

const Goalitem = (props) => {
  return (
   

    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#154046" }} // step 1 android 
        onPress={props.deleteGoal.bind(this, props.id)}
        style={(pressedData) => { pressedData.pressed && styles.pressed } } // step 2 ios 
      >
        <Text style={styles.listofgoals}>{props.goaltitle}</Text>
      </Pressable>
    </View>
  );

};
export default Goalitem;

const styles = StyleSheet.create({
  listofgoals: {
    color: "rgb(0, 0, 0)",
    fontWeight: "bold",
    padding: 10,

    // fontWeight:2,
    },
    
     pressed: {
        opacity:0.5
    },

  goalItem: {
    justifyContent: "center",
    marginHorizontal: 70,
    // borderColor:'white',
    borderWidth: 2,
    marginVertical: 20,
    // padding:10,
    fontSize: 20,
    backgroundColor: "rgb(188, 255, 231)",
    borderRadius: 10,
  },
});




/// CUSTOM BUTTON OF PRESSABLE WHICH WORKS PROPERLY

import { View, Text, Pressable, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});


// PRESSABLE WITH ONLY OPACITY FOR ANDROID AND IOS

import React from "react";
import {  StyleSheet, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';  
const IconButton =(props)=>{

    return(
        <Pressable onPress={props.onPress} style={(press)=> press.pressed?[styles.pressed]:""}>
             <Ionicons  name="star" size={32} color="#5fe3c0" />
        </Pressable>
    )

}

const styles = StyleSheet.create({
    pressed: {
        opacity:0.5
    }


})

export default IconButton;

//------------------------------------------------------------------------
// To add new item AND delete an item in an array in which the current state depends upon the prvious state
//------------------------------------------------------------------------


// Add item function sample--------------------
    
const addGoalHandler= titleOfGoal=>{
    if (titleOfGoal.length==0) {
      return;

    }

    // currentGoals contains all the current states ... redirects all the current goals and adds the new goal/state in the goallist
    setgoalList(currentGoals=> [...currentGoals, {id:Math.random().toString() , value: titleOfGoal}]);

    // yaha sirf  aik expression thi jisko return krwa na tha is lia [] use kia
    // agar keys ka error aa rha ho tou sbki keys set krdo
    // Ab masla ye aa rha jha ke agar hm alaga component bna rhy hain tou goal tou udhar defined so goal is undefined here . So, now addgoal handler will receive an argumnet instead of goal aur ye argument GoalInput se aa rha ho ga

    setaddMode(false);
};

    
// Remove item function sample-----------------

const goalDeleteHandler = goalId=>{
    setgoalList(currentGoals=>{
      console.log(`the to be deleted goal  id is :${goalId}`)
     return currentGoals.filter((goal)=> goal.id !==goalId)})
      // a (builtin method in javascript) filter method returns a new array which is based on an old array which you are calling it

      console.log(goalList);  // but that code is not reachable coz uper return So jb re render ho ga tb hm display krwa skty hain so this should be out of that function
  }


  
// states ko jisme prev state pe dependence  function 
setgoalList(currentGoals=> [...currentGoals,goal])

//--------------------------------------------------------------------
// bind Method
//--------------------------------------------------------------------

// * The bind method is used to pass argument to the function 


// It is used to if you have multiple parameters and also if you have a single parameter but it is make sure that jis function pointer ko call kia jaa rha ha wo wahi argument get kr rha ha ya nai
/// See this exapm

<TouchableOpacity activeOpacity={.8} onPress={props.deleteGoal.bind(this,props.id)}>
<View >
    <Text  style={styles.listofgoals}>{props.goaltitle}</Text>
</View>       
</TouchableOpacity>



// ORRRRRR

// do it with the help of helper function
// like this
const onaddingHandler = () = {
    props.deletegoal(props.id)
}
onPress={onaddingHandler}


//---------------------------------------------------------------
// Adding images
//---------------------------------------------------------------

// Images can be added using the Image component and it contains ource to find the image by using require function

// like this
    
    // 1. import image then this then apply styles ( Local images from the project )

<Image style={styles.Image} source={require("../assets/goal.png")}/>


// Adding Images a BACKGROUND as an overlay above the gradient as an overlay
  
// * To use an Image as a background use the ImageBackground

  // 2. To use images from thhe web use image tag like this

  <Image style={styles.Image} source={{uri: "url here"}}/>



// JUST LIKE LINEAR GRADIENT the component in which you want to display the background wrap it  like this
  
  
    // Adding Images a BACKGROUND as an overlay above the gradient as an overlay
    // * To use an Image as a background use the ImageBackground
    // JUST LIKE LINEAR GRADIENT the component in which you want to display the background wrap it  like this
    
      <ImageBackground
        resizeMode="cover"

        style={styles.screen}
        source={require(
          "./assets/background.png")}
      >
        {content}
      </ImageBackground>
    </>

      // ImageBackgorund usuage

      import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';



import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    alignItems: "center",
    // padding:10
    // justifyContent:"center"
  },
  backgroundImage: {
    opacity: 0.15,
  },
});

    //------------------------------------------------------------------
    // expo Status bar component
    //--------------------------------------------------------------
    // tp manipulate the statusbar visual
    <StatusBar style='light' /></>
    
// **APP.json mn background color set karain gy to saaray pages ke lia applicable
      
      // IT IOs status bar is not shown by defaul tby status bar component we will decide that status bar is shown or not 
    
