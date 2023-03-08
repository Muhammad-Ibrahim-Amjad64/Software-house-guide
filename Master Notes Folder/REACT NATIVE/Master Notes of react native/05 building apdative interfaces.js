// We will learn these concepts

// Execiute platform specific code that should run on ios but not on ios

// Adjust to different device sizes

// Build an apdative components


// * to make an app responsive that should be responsive all size of devices


///----------------------------------------------------------------------------------
// Making width and height dynamic
//--------------------------------------------------------------------------------------

// We can do this by setting the combination of min and max width combination with the default  example

// title  ki width

// width :300   and maxWidth:80%    if in smaller devices if the width is smaller than 300 percent than 80 oercent will be applied

// Like this

import { Text, StyleSheet } from 'react-native';

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
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


//------------------------------------------------------------------------------
// Dimensions Api
//------------------------------------------------------------------------------


// By using that api we can get device width and height

// * screen ====  width and height  including  status bar
// * window ==== width and height  excluding status bar

// In smaller devices we have to make everything smaller so that all the content should fit in so we can achieve that by using dimensions api


// * Smaller devices ke lia smaller widths set krna is feasable to redce the sizes of the components and reducing gaps between them if they are in smaller devices by changing margin , padding , width and hweight, font size 


// We can change object styling by using some calculations like deviceWidth/10

// like this

import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Colors from '../../constants/colors';


function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

export default NumberContainer;


const deviceWidth = Dimensions.get("window").width
const deviceHeight = Dimensions.get("window").height

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: Colors.accent500,
    fontSize: deviceWidth < 380 ? 28 : 36,
    // fontWeight: 'bold',
    fontFamily: 'open-sans-bold'
  },
});


// * In a same emanner we did it with the card component by setting margintop with a formula with dimensionWidth

// * We can also set the image sizes with the dimension api by setting width and height and also must manupulate the border radius if height and width halfed ti alo should eb halfed  of the container of the image


//-------------------------------------------------------------------------------
// Dimension api  useWindowDimension() hook
//-------------------------------------------------------------------------------

// This hook is used to recalculate the the height and the width. if the orientations changes to and by the calculated width and the height we can apply styling just like dimension api

// Like this

import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert,Dimensions, useWindowDimensions } from 'react-native';

import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState('');

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

  const { width, height } = useWindowDimensions()    /// ============
  
  const marginTop = height < 380 ? 50 : 100   // like this 
  console.log(marginTop)
  console.log(height)
  console.log(width)

  return (
    // we can merge styles by merging the styles using arrays 
    // <View style={[{ ...styles.rootContainer, marginTop: marginTop }]}>
    
    <View style={[styles.rootContainer, { marginTop: marginTop }]}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>
          Enter a Number
        </InstructionText>
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
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    padding:10
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



//---------------------------------------------------------------------------------
// Understanding screen orientation problems
//---------------------------------------------------------------------------------


// * In app.json
 

orientation: "portrait"   // this will lock your app (vertically) and is not rotatable

orientation: "landscape"   // this will lock your app (horizontally) and is not rotatable 

orientation: "default"   // this will unlock your app and is now rotatable


//---------------------------------------------------------------------------------
// KeyboardAvoidingView()
//---------------------------------------------------------------------------------

// This is a component which you can use in your JSX code
// to wrap other content with it,
// other content that involves or contains an input field,
// and whenever the keyboard that opens up that content
// that holds your input element and other elements
// can be moved up so that you can still access it,
// even though the keyboard is open.



// * jis screen mn input laina ho wrap that page or screen with the keyboard avoiding view

// * then with scrollable

// Like this not final code asli kl laon ga 
 
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



//--------------------------------------------------------------------
// Checks and the dimensions api
//--------------------------------------------------------------------

// * adjust sizes etc  in landscape modes

const marginTop = height < 380 ? 50 : 100; // like this

// if ( width> 500){   /// ceck for new content 


// * To adjust the sizes in potrait mode 
const marginTop = width < 380 ? 50 : 100; // like this


//-------------------------------------------------------------------------
// changing the overall layout of the screen using dimension api
//-------------------------------------------------------------------------

// We can render different contents and components according to the width by deciding if we are in landscape or portrait mode

/// * hook define {width, height} = useWindowDimension()
/// * content variable
/// * if ( width> 500){
  // content = naya layout for landscape 
// }



// Like this 

//-----------------------------------------------------------------------------
// Writing the the platform specific code with the platform api of react native 
//------------------------------------------------------------------------------

// We can write platform specific code using platform api 

// Like this 

// * using

// Using ternary expressions like syntax 

numberInput: {
  height: 50,
  width: 50,
  fontSize: 32,
  borderBottomColor: Colors.accent500,
  borderBottomWidth: 2,
  color: Colors.accent500,
  marginVertical: 8,
  fontWeight: Platform.select({ios:"bold",android:"500"}),   // ye wala 
  textAlign: "center",
},



// * making platform specific components and is not limted to only components you can also make specific file for the colors for ios and androoid

//  by making components files like this and import normally

// Title.android.js  == title for android
// Title.ios.js    == title for ios
// colors.android.js


