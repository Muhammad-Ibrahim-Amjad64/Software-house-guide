// if(null) ya if(undefined)    ==== will be false we can use this technique to render different components or contents  conditionally by defining () state which is undefined


//------------------------------------------------------------------
// useEffect()
//------------------------------------------------------------------

// we can also use not to just send request but also run a logic when some dependencies changes


// IMP ==== useEfeect will run after the component rendered 


//-------------------------------------------------------------------
// Adding Gradient in the background
//-------------------------------------------------------------------


// * npx expo install expo-linear-gradient    ===  1

// * import { LinearGradient } from 'expo-linear-gradient';  =====   2

// * then wrap the compoents in which you want to show gradient

// * then  define colos array

//  Like   Pooora codde line 56 + pr safeareaview mn daikh lo
<LinearGradient colors={["#043e47", "#62fffa"]} style={styles.screen}></LinearGradient>


//---------------------------------------------------------------------
// Some special function tgo apply on states
//--------------------------------------------------------------------

// const userInput = parseInt(text);

// if (isNaN(userInput)   // That will check if userInput is not a number
// if the conversion failed

    // || userInput <= 0 || userInput > 99) {

    
//-------------------------------------------------------------------
// Showing alert messages
//-------------------------------------------------------------------
// title , messages , then text configure 
Alert.alert("Invalid Input!", "The number should be between 1 & 99 ", [
    { text: "Okay", style: "destructive", onPress: resetInputHandler },
  ]);



  // Complete code example

  import { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";

import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }

    onPickNumber(chosenNumber);
  }

  const { width, height } = useWindowDimensions();

  const marginTop = height < 380 ? 50 : 100; // like this
  console.log(marginTop);
  console.log(height);
  console.log(width);

  return (
    // we can merge styles by merging the styles using arrays
    // <View style={[{ ...styles.rootContainer, marginTop: marginTop }]}>
  <ScrollView style={{flex:1}}>
    <KeyboardAvoidingView style={{flex:1}}  behavior="position">
      <View style={[styles.rootContainer, { marginTop: marginTop }]}>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
    padding: 10,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: Platform.select({ios:"bold",android:"500"}),
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});


  

//-------------------------------------------------------------------
// Notch jo mobile pr hootay hain unko detect krny wala component (SafeAreaView) component
//-------------------------------------------------------------------


// that component will detect if there is a notch in a smart phone and set the width respectively

// how to use

// * just wrap the screen components with the safeareaview. then apply style on safearea view to flex=1 like this

// Like this

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
// Benefits of making color file different and their usuage
//------------------------------------------------------------------

// * Make a folder constants
// * colors.js
// make an const colorsobj define color and export

//------------------------------------------------------------------
// Expo vector icons
//------------------------------------------------------------------

// For more icons and families https://icons.expo.fyi/

// Documentation https://docs.expo.dev/guides/icons/   for more examples

// * 1  import {Ionicons} from '@expo/vector-icons/Ionicons';

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';  //1 

export default function App() {
  return (
    <View style={styles.container}>
      <Ionicons name="md-checkmark-circle" size={32} color="green" />  //2 
    </View>
  );
}


//-------------------------------------------------
// About expo Loading Component
//-------------------------------------------------

// This component will give us a splash loading screen until some conditions are met


// * expo install expo-app-loading

// * import AppLoading from 'expo-app-loading'

// then use this like this below example 

//------------------------------------------------------------
// Adding custom font text
//------------------------------------------------------------

// Custom fonts can only be loaded with the help of extra package
// *  expo install expo-font

// then where you want to use custom type   // Only define in app.js 

// * import { usefonts } from "expo-font"  

// * make a fonts folder inside assests folder then use this like this ( download ttf files of custom fonts )

// useFonts array have a first element which is boolean 


// ALWAYS USE CUSTOM FONT USEFONT HOOK WITH APPLOADING COMPONENT LIKE THIS 
// THEN APPLY IN CSS LIKE THIS 
fontFamily: 'open-sans'


// In App.js  ( setup for custom fonts)

import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';  // step 1 

import AppLoading from 'expo-app-loading'; // step 2 



import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);



  // step 3 
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded) {  // step 4 
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




// Then use custom like this ( in any component )

import { Text, StyleSheet } from 'react-native';

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',    ///   step 1
    fontSize: 24,
    // fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
    width: 300,   // ye dynamically setting
    maxWidth:"80%"
  },
});


//--------------------------------------------------------------------------------
// Woking with nested texts
//--------------------------------------------------------------------------------

// * The nested text is also effected with the parent font size 
// apply styling on nested texts like this to bold or colorify something

import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/colors';

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {

  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/success.png')}
        />
      </View>

      {/*  HERE  */}
      <Text style={styles.summaryText}>    
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{' '}
        rounds to guess the number{' '}
        <Text style={styles.highlight}>{userNumber}</Text>.
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
}

export default GameOverScreen;

const deviceWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: deviceWidth < 380 ? 150 : 300,
    height: deviceWidth < 380 ? 150 : 300,
    borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500,
  },
});


