// To make circle set the border radius half of the height and width


//---------------------------------------------------------
// Dependency fix 
//---------------------------------------------------------
//  Simple Run  expo doctor --fix-dependencies  to fix the dependencies 

//--------------------------------------------------------------------

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

///------------------------------------------------------------------

// *
sum.toFixed(2)     // this will make the sum upto 2 decimal places 

// *
if (enteredValue.trim().length === 0) {   // jb bhi kisi string pr condition to trim ke sath

// *  
styles.process - control == styles["process-control"]
  
  

//--------------------------------------------------------
// Array functions
//--------------------------------------------------------


// map mn return number*2 bhi krwa skty hain to return [1,2,3] willl becomes [2,4,6]

// Not really next-gen JavaScript, but also important: JavaScript array functions like map() , filter() , reduce()  etc.

// You'll see me use them quite a bit since a lot of React concepts rely on working with arrays (in immutable ways).

// The following page gives a good overview over the various methods you can use on the array prototype - feel free to click through them and refresh your knowledge as required: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

// Particularly important in this course are:

// map()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// find()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
// findIndex()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
// filter()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// reduce()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=b
// concat()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat?v=b
// slice()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
// splice()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

//----------------------------------------------------------------------------------
// CONCAT EXPLAINATION ======================
//---------------------------------------------------------------------------------- 
const ar1= [1,3,{name:"nabiha"}]
const ar2= [1,3,4]

const ar3 = ar1.concat(ar2)

ar1.push(14)
ar1[2]={name:"nabo"}
// ar3[2]={name:"syeda nabiha jamali"}
// [ 1, 3, { name: 'nabo' }, 14 ]
// [ 1, 3, { name: 'syeda nabiha jamali' }, 1, 3, 4 ]
console.log(ar1)
console.log(ar3)

// OUTPUT
// [ 1, 3, { name: 'nabo' }, 14 ]
// [ 1, 3, { name: 'nabiha' }, 1, 3, 4 ]
//HENCE CONCAT METHOD IS SAFE if we only mody stings etc use it or prefer spread

//----------------------------------------------------------------------------------
// REDUCE EXPLAINATION =======================
//----------------------------------------------------------------------------------

// Reduce method to get the sum of a particular properties

const arr = [
  {id: 1, salary: 10},
  {id: 2, salary: 20},
  {id: 3, salary: 30},
];

const sum = arr.reduce((accumulator, object) => {
  return accumulator + object.salary;
}, 0);

console.log(sum); // 👉️ 60

//---------------------------------------------------------------------------------
// IndexOF Explaination =======================================================
//----------------------------------------------------------------------------------
  
const CategoryMeals = MEALS.filter(
  (meals) => meals.categoryIds.indexOf(catID) >= 0
  
// indexOf method element ka array mn index bata aa ga

// it will return -1 if the value ka index is not found

// https://www.w3schools.com/jsref/jsref_indexof_array.asp



//---------------------------------------------------------------------------------
// Slice =======================================================
//----------------------------------------------------------------------------------