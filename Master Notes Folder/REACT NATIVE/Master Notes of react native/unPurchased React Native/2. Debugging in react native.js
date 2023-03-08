// Debugging is very inpoetan tin react native coz we got alot of errors 

// What we can do when the things gone wrong ?
//                  we will use different tools to identify that errors to avoid them 



// What is debug ?
// 1. What could possible gone wrong -> ratbox(means app crash)
// 2. things does not looked that they actually should be looked layout , design user interface 


// WHAT TO DEBUG SS HERE 

// Must read the error messages

// we can use chrome debugger and breakpoints


//With the app running on a real device, you can debug it from there, too. Shake the device a little to bring up the developer menu.

//There, you can enable the remote debugger and the other features covered in this module.

//---------------------------------------------

// Handling error messages

//---------------------------------------------

// App.js "me set is add" mode mn  agar 
//_______________________________________________________________
// setaddMode{true) mn agar ( agr bracket ka issue ay tou ye error which is nit correct 

// ',' expected.ts(1005)
// Identifier expected.
// showing the lines in which there is an error

// THIS ERROR IS A SYNTAX ERROR 
//________________________________________________________________

// agar is code mn hm 
const goalDatahandler=()=>{
    props.onAddingGoal(goal);
    setgoal('');

    // ye kr dain tou ye compile tou ho ja aa ga magar jb add pe click karain gy tou error a ja aa ga 
const goalDatahandler=()=>{
    props.onAddingGoal(goal);
    setgoal();


// So this type of error is logical error flow follwo krte hua ise fix krlo 
//____________________________________________________________

// Now using console.log method in coursegoal deleter

// if we want to check the deleted item and if we want to print the updated list after deleting  then the code will become 


import Goalitem from './comp/Goalitem';
import GoalInput from './comp/GoalInput';
import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity , ScrollView, FlatList} from 'react-native';


export default function App() {
 
  const [goalList,setgoalList]= useState([]);
  const [addMode,setaddMode] = useState(false);
  console.log("RE-RENDERING ........");
  console.log(goalList);

  // function goalHandeler(enteredText) {
  //   setgoal(enteredText);
  // This function is equvalent to the below function 

 
  // when we click on the buton from goalInput we this function should be called 
  // we have to pass data from goalInput.js to app.js 
  // We can do that by setting props on Goal input component
  // yaha pr titleOfGoal argument aya coz only a goal is und here   
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

  const goalDeleteHandler = goalId=>{
    setgoalList(currentGoals=>{
      console.log(`the to be deleted goal  id is :${goalId}`)
     return currentGoals.filter((goal)=> goal.id !==goalId)})
      // a (builtin method in javascript) filter method returns a new array which is based on an old array which you are calling it 

      console.log(goalList);  // but that code is not reachable coz uper return So jb re render ho ga tb hm display krwa skty hain so this should be out of that function 
  }

  const cancelGoalAddingHandler = ()=>{
    setaddMode(false);

  }
  return (
    // APPLYING MODAL IN GOALINPUT
  

    <View style={styles.container}>
      <Button title='Tap to add new goals' onPress={()=>{setaddMode(true)}}/>


      <GoalInput cancel={cancelGoalAddingHandler} mode={addMode} onAddingGoal={addGoalHandler}/>
      
      {/*  Using flat insted of ScrollView aur flat list can replay the map method of arry with the help of render item  */}
       {/* key agar id set hogi tou hm key extracter ka use krskta hain  */}
      <FlatList 
      // flat list is used to generate unique keys for all items : )
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


 
        
      {/* </ScrollView> */}

    </View>
    
  );
}

const styles = StyleSheet.create({



  container: {
    padding:80,
    flex:1,

    backgroundColor:'black',

    // alignItems:'center',
  },

  button:{
    backgroundColor:'cyan',
    // color:"rgb(134, 255, 215)",
    // backgroundColor2:'black',

    textDecorationColor:'bleck',
    borderColor:"blue",
    // borderWidth:5,
  
  } ,

  textInput:{
        // marginRight:30,

    // justifyContent:'space-around',
    // alignItems:'center',
    
    // maxWidth:1000,
    width:'60%',
    
    backgroundColor:'white',
    borderColor:'cyan',
    borderWidth:1,padding:5},


  

});

//___________________________________________________________________________

// DEBUG REMOTE JS


//  Hm DEBUGGER TURN ON KR SKTE HAIN remotly by developer by pressing 'm' in the 
// console  so now in browser window open console we can do more we can get file structure set break points from sources-> debugworker -> localhost

// WOW breakpoint set kr ke hm apna code step by step compile krwa skty to identify the error that really cool 
//Sample pic recommented 22 ig
//_________________________________________________________________________________

// DEVTOOLS

// Performace monitor :
//             show your app mem ram consuption etc information

//  Element inspector Toggle inspector : 
//                Used to inspect an element along with its properties 

// however there is abatter tool then element ininspector which is
//  react native debugger 
// download frm github
//  PRESS CRTL+T to set port inreact native debugger 1st this
// then device mn remote degubber enable kro then -> goto react native debigger then this 



// last video baki hab 