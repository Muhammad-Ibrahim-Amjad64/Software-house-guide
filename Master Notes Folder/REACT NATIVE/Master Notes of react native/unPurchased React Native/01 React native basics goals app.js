// TO create an expo app 
// visit expo site

//To create an expo app use  
// expo init my-app --npm 

// then cd my-app

// npm start / expo start   se app run 

// if got error  open package.json  chance expo ~ from ^


// then open expo my 1st app dashboard connect your  device via url or qr code with the help of expo code

// CONTROL SPACE IS VERY IMPORTANT
// simple state chinging code in which we click on button and it got changed
// ____________________________________________________________________________________
import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [outpttext,setoutputtext]= useState("HEllo i am ibrahim ");
  return (
    <View style={styles.container}>
      <Text>{outpttext}</Text>
      <StatusBar style="auto" />
      <Button  onPress={()=>{setoutputtext("helloo i am nabiha")}} title='Mera naam button ha' color={"wheat"}/>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// ____________________________________________________________________________________


// ________________________________________
//  diving into basics 
// _____________________________________________

// * View = div  (it is a container component)
// * Text = to output text / to display text on the screen 
// * Image = to output an image 

// In web devlopment you can put text anywhere between div etc 
// But in react native you have to wrap the text in the text container to display/output the text on the screen 
// _______________________________________________________________________
// Code after adding simple layout for to do app 

import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [outpttext,setoutputtext]= useState("HEllo i am ibrahim ");
  return (
    <View style={styles.container}>
      <View>
      {/* is view mn adding  */}
      <TextInput/>
      <Text style={styles.display}>{outpttext}</Text>
      
      </View>

      <View>
        {/* is view mn list of tasks display  */}
      <Button onPress={()=>{setoutputtext("helloo i am nabihaa jamali")}} title='Add to your task' color={"rgb(146, 23, 23)"}/>
      </View>
      



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  display:{

    color: 'white',
  }

  

});
// _________________________________________________________________________
// After adding placeholder and inline styles in the above code 

import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [outpttext,setoutputtext]= useState("HEllo i am ibrahim ");
  return (
    <View style={{padding:90,backgroundColor:'black',flex:1}}  >
      <View>
      {/* is view mn adding  */}
      <TextInput placeholder='type your goal please :)' style={{backgroundColor:'white',borderColor:'cyan',borderWidth:1,padding:5}}/>
      <Text style={styles.display}>{outpttext}</Text>
      
      </View>

      <View>
        {/* is view mn list of tasks display  */}
      <Button  onPress={()=>{setoutputtext("helloo i am nabiha")}} title='Add to your task' color={"rgb(134, 255, 215)"} style={{color:'black'}}/>
      </View>
      



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  display:{

    color: 'white',
  }

  

});
// _________________________________________________________________________

// The inline style are hard to maintain if our app got a much much bigger as it does not use write once use it everywhere 
// Applying all the above code with with the stylesheet 
// Upper code mn aik hi view mn button aur text anaya thay

// simple deoration applied and aik hi line mn kr dia 

import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity } from 'react-native';

export default function App() {
  // const [outpttext,setoutputtext]= useState("HEllo i am ibrahim ");
  return (
    <View style={styles.container}>
      <View style={styles.screen}>
      {/* is view mn adding  */}
      <TextInput placeholder='type your goal please :)' style={styles.textInput}/>
      

      <Button title='Add to your task' color={'rgb(134, 255, 215)'} />
      {/* <TouchableOpacity
         style={styles.button}
        //  onPress={this.onPress}
       >
         <Text style={{color:'white'}}> Touch Here </Text>
 </TouchableOpacity> */}
      </View>

      <View>
        {/* is view mn list of tasks display  */}
      </View>

    </View>
  );
}
 
const styles = StyleSheet.create({
  screen:{
    // flex:1,
    
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
    
  },
  container: {
    padding:30,
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
// ______________________________________________________________________
// flex recap

//Every View in the react native organize their children in the flexbox by default
// default organize in col but in web it organize in row
// align item is by default streach , and is for cross axis
// flex 1 2 3 .ye child ke andar likh skty hain ke how much space they will occupy 
// flex  1 krny pr aik child saari avalible space le le ga 
// flex 1 flex 2 krnay pr aik toice space le ga phalay ke nisbat
// _________________________________________________________________________

// Working with states and making the add task button functional
// goalhandler mn () ye nai dalaian gy wrna code execute ho ja a ga 
// and applying css in task list 


import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity } from 'react-native';


export default function App() {
  const [goal,setgoal]= useState(null);
  const [goalList,setgoalList]= useState([]);

  // function goalHandeler(enteredText) {
  //   setgoal(enteredText);
  // This function is equvalent to the below function 

  const  goalHandeler=(enteredText)=> {
    setgoal(enteredText)
    // ye set goal goal ki value update kry ga with every  key stroke
  }

  const addGoalHandler= ()=>{
    
      // currentGoals contains all the current states ... redirects all the current goals and adds the new goal/state in the goallist 
      setgoalList(currentGoals=> [...currentGoals,goal])
  }
  return (
    <View style={styles.container}>
      <View style={styles.screen}>
      {/* is view mn adding  */}
      <TextInput placeholder='type your goal please :)' style={styles.textInput} onChangeText={goalHandeler}  value={goal}/>
      

      <Button title='Add to your task' color={'rgb(20, 23, 81)'}  onPress={addGoalHandler} />
      {/* //'rgb(134, 255, 215)' */}

      </View>
      

      <View>
        {/* is view mn list of tasks display  */}
      
        {/* key is the unique identifier for each goal this syntax is alsi react specific hmne key goal ka naam hi set kr dia so hm aik task do bar add nai kraain gy assuming   */}
       {goalList.map((mygoal)=>(
       
        <View key={mygoal}>
       <Text  style={styles.listofgoals}>{mygoal}</Text>
        </View>
        // islo view mn islia wrap kia coz view zayada styling support krta ha 
       
       ))}


           {/* {goalList.map((val,key)=>{
      return ( 

        <Text style={styles.listofgoals}>{val}</Text> 
      
       );
    })} */}
 
        
      </View>

    </View>
  );
}

const styles = StyleSheet.create({


  screen:{
    // flex:1,
    
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
    
  },
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

    listofgoals:{
      color:'rgb(154, 255, 154)',
      borderColor:'white',
      borderWidth:2,
      marginVertical: 20,
      padding:10,
      fontSize:20,
      backgroundColor:'rgb(16, 33, 27)',
      borderRadius:10,
      
      // fontWeight:2,

    }


  

});

//______________________________________________________________________________
// added scroll view 

import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity , ScrollView } from 'react-native';


export default function App() {
  const [goal,setgoal]= useState(null);
  const [goalList,setgoalList]= useState([]);

  // function goalHandeler(enteredText) {
  //   setgoal(enteredText);
  // This function is equvalent to the below function 

  const  goalHandeler=(enteredText)=> {
    setgoal(enteredText)
    // ye set goal goal ki value update kry ga with every  key stroke
  }

  const addGoalHandler= ()=>{
    
      // currentGoals contains all the current states ... redirects all the current goals and adds the new goal/state in the goallist 
      setgoalList(currentGoals=> [...currentGoals,goal])
  }
  return (
    <View style={styles.container}>
      <View style={styles.screen}>
      {/* is view mn adding  */}
      <TextInput placeholder='type your goal please :)' style={styles.textInput} onChangeText={goalHandeler}  value={goal}/>
      

      <Button title='Add to your task' color={'rgb(20, 23, 81)'}  onPress={addGoalHandler} />
      {/* //'rgb(134, 255, 215)' */}

      </View>
      
      {/* jis view ko scroll view se replace karain gy wo scrollable ho ja aa ga  */}
      <ScrollView>
        {/* is view mn list of tasks display  */}
      
        {/* key is the unique identifier for- each goal this syntax is alsi react specific hmne key goal ka naam hi set kr dia so hm aik task do bar add nai kraain gy assuming   */}
       {goalList.map((mygoal)=>(
       
        <View key={mygoal}>
       <Text  style={styles.listofgoals}>{mygoal}</Text>
        </View>
        // islo view mn islia wrap kia coz view zayada styling support krta ha 
       
       ))}


           {/* {goalList.map((val,key)=>{
      return ( 

        <Text style={styles.listofgoals}>{val}</Text> 
      
       );
    })} */}
 
        
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({


  screen:{
    // flex:1,
    
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
    
  },
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

    listofgoals:{
      color:'rgb(154, 255, 154)',
      borderColor:'white',
      borderWidth:2,
      marginVertical: 20,
      padding:10,
      fontSize:20,
      backgroundColor:'rgb(16, 33, 27)',
      borderRadius:10,
      
      // fontWeight:2,

    }


  

});
//_____________________________________________________________________________
// Dis Advantage of scroll view is that is renders the whole (even if you dont see them )list of items as a 
// whole & if your list list is too long lets say 2000 items then it can slow down your app . So, use flatlist

// What is flatist :
//        it renders only those items of the list that are present on the current screen . neecha walay jb karay ga jb hm neechay scroll karain gain. 
// codeing using flatList instead of scroll view


import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity , ScrollView, FlatList } from 'react-native';


export default function App() {
  const [goal,setgoal]= useState(null);
  const [goalList,setgoalList]= useState([]);

  // function goalHandeler(enteredText) {
  //   setgoal(enteredText);
  // This function is equvalent to the below function 


  const  goalHandeler=(enteredText)=> {
    setgoal(enteredText)
    // ye set goal goal ki value update kry ga with every  key stroke
  }

  const addGoalHandler= ()=>{
    
      // currentGoals contains all the current states ... redirects all the current goals and adds the new goal/state in the goallist 
      setgoalList(currentGoals=> [...currentGoals, {id:Math.random().toString() , value: goal}])
      // agar keys ka arror aa rha ho tou sbki keys set krdo
  }
  return (
    <View style={styles.container}>
      <View style={styles.screen}>
      {/* is view mn adding  */}
      <TextInput placeholder='type your goal please :)' style={styles.textInput} onChangeText={goalHandeler}  value={goal}/>
      

      <Button title='Add to your task' color={'rgb(20, 23, 81)'}  onPress={addGoalHandler} />
      {/* //'rgb(134, 255, 215)'  ye wo sea green button*/} 

      </View>
      {/*  Using flat insted of ScrollView aur flat list can replace the map method of arry with the help of render item  */}
       {/* key agar id set hogi tou hm key extracter ka use krskta hain  */}
      <FlatList 
      // flat list is used to generate unique keys for all items : )
      // item.id = is the index of the item . by default ye =>item.key hota ha mgr hmne uper id ki islia yahan bhi id karain gy item.id is the id of an item (goal) 
      keyExtractor={(item,index)=>item.id} 
      data={goalList} 
      renderItem={goalitem=>(
       
       //  we dont need key flatlist automatically key generate krta ha but not arrays of strings is not supported . us array mn key honi zarori ha 
       <View >
      <Text  style={styles.listofgoals}>{goalitem.item.value}</Text>
       </View>         //goalitem.item.key se hm key print krwa skta 
       // islo view mn islia wrap kia coz view zayada styling support krta ha
        
      
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


  screen:{
    // flex:1,
    
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
    flex:1 
  },
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

    listofgoals:{
      color:'rgb(154, 255, 154)',
      borderColor:'white',
      borderWidth:2,
      marginVertical: 20,
      padding:10,
      fontSize:20,
      backgroundColor:'rgb(16, 33, 27)',
      borderRadius:10,
      
      // fontWeight:2,

    }


  

});
//________________________________________________________________________
// THAT FUNCTION CODE IS EQUVALENT TO 

const GoalItem=(props)=>{

    return(

        null
    )

}
 flex
export default GoalItem;

// = THAT FUNCTION CODE 


export default function GoalItem(props) {


    return(
        null


    )
    
}



// _________________________________________________________________________________

// Breaking the code into components  // separated a goalitem component 

// App.js--------------


import Goalitem from './comp/Goalitem';
import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity , ScrollView, FlatList } from 'react-native';


export default function App() {
  const [goal,setgoal]= useState(null);
  const [goalList,setgoalList]= useState([]);

  // function goalHandeler(enteredText) {
  //   setgoal(enteredText);
  // This function is equvalent to the below function 

  const  goalHandeler=(enteredText)=> {
    setgoal(enteredText)
    // ye set goal goal ki value update kry ga with every  key stroke
  }

  const addGoalHandler= ()=>{
    
      // currentGoals contains all the current states ... redirects all the current goals and adds the new goal/state in the goallist 
      setgoalList(currentGoals=> [...currentGoals, {id:Math.random().toString() , value: goal}])
      // agar keys ka arror aa rha ho tou sbki keys set krdo
  }
  return (
    <View style={styles.container}>
      <View style={styles.screen}>
      {/* is view mn adding  */}
      <TextInput placeholder='type your goal please :)' style={styles.textInput} onChangeText={goalHandeler}  value={goal}/>
      

      <Button title='Add to your task' color={'rgb(20, 23, 81)'}  onPress={addGoalHandler} />
      {/* //'rgb(134, 255, 215)'  ye wo sea green button*/} 

      </View>
      {/*  Using flat insted of ScrollView aur flat list can replay the map method of arry with the help of render item  */}
       {/* key agar id set hogi tou hm key extracter ka use krskta hain  */}
      <FlatList 
      // flat list is used to generate unique keys for all items : )
      // item.id = is the index of the item . by default ye =>item.key hota ha mgr hmne uper id ki islia yahan bhi id karain gy item.id is the id of an item (goal) 
      //  we dont need key flatlist automatically key generate krta ha but not arrays of strings is not supported . us array mn key honi zarori ha 
      keyExtractor={(item,index)=>item.id} 
      data={goalList} 
      renderItem={goalitem=>(
        <Goalitem goaltitle={goalitem.item.value}/>
       

        
      
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


  screen:{
    // flex:1,
    
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
    
  },
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


// Goalitem.js--------

import React from 'react';
import { StyleSheet,View, Text } from "react-native";

const Goalitem=(props)=>{

    return(
        <View >
        <Text  style={styles.listofgoals}>{props.goaltitle}</Text>
         </View>         //goalitem.item.key se hm key print krwa skta 
         // islo view mn islia wrap kia coz view zayada styling support krta ha
    )

};

export default Goalitem;
    

const styles = StyleSheet.create({

    listofgoals:{
        color:'rgb(154, 255, 154)',
        borderColor:'white',
        borderWidth:2,
        marginVertical: 20,
        padding:10,
        fontSize:20,
        backgroundColor:'rgb(16, 33, 27)',
        borderRadius:10,
        
        // fontWeight:2,
  
      }
  


})




// ______________________________________________________________________________
// Passing the data between the components  & separating the goalinput 
//wHEN we want to do to action on button then we have to define stataes in that component  (same logic also applied in react js )

// App.js ------------



import React,{ useState } from 'react';
import { StyleSheet, View, Button, TextInput} from 'react-native';



const GoalInput=(props)=>{
  const [goal,setgoal]= useState(null);
 
  const  goalHandeler=(enteredText)=> {
    setgoal(enteredText)
    // ye set goal goal ki value update kry ga with every  key stroke
  }
    return(
      <View style={styles.screen}>
      {/* is view mn adding  */}
      <TextInput placeholder='type your goal please :)' style={styles.textInput} onChangeText={goalHandeler}  value={goal}/>
      

      <Button title='Add to your task' color={'rgb(20, 23, 81)'}  onPress={props.onAddingGoal.bind(this,goal)} />
      {/* onPress={()=>props.onAddingGoal(goal)}    // confirmed that is working        that would work */}

      {/* but in react native that approach is not very effective we can use vanila js syntax  where bind is a function in which 'this' must be passed and actual parameter after that so  bind(this , goal) */}




      {/* //'rgb(134, 255, 215)'  ye wo sea green button*/} 

      </View>
    ) 

}

export default GoalInput;
    
    

const styles = StyleSheet.create({

  screen:{
    // flex:1,
    
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
    
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



})


// Goalitem.js ----------


import React from 'react';
import { StyleSheet,View, Text } from "react-native";

const Goalitem=(props)=>{

    return(
        <View >
        <Text  style={styles.listofgoals}>{props.goaltitle}</Text>
         </View>         //goalitem.item.key se hm key print krwa skta 
         // islo view mn islia wrap kia coz view zayada styling support krta ha
    )

};

export default Goalitem;
    

const styles = StyleSheet.create({

    listofgoals:{
        color:'rgb(154, 255, 154)',
        borderColor:'white',
        borderWidth:2,
        marginVertical: 20,
        padding:10,
        fontSize:20,
        backgroundColor:'rgb(16, 33, 27)',
        borderRadius:10,
        
        // fontWeight:2,
  
      }
  


})






// GoalInput ---------




import React,{ useState } from 'react';
import { StyleSheet, View, Button, TextInput} from 'react-native';



const GoalInput=(props)=>{
  const [goal,setgoal]= useState(null);
 
  const  goalHandeler=(enteredText)=> {
    setgoal(enteredText)
    // ye set goal goal ki value update kry ga with every  key stroke
  }
    return(
      <View style={styles.screen}>
      {/* is view mn adding  */}
      <TextInput placeholder='type your goal please :)' style={styles.textInput} onChangeText={goalHandeler}  value={goal}/>
      

      <Button title='Add to your task' color={'rgb(20, 23, 81)'}  onPress={props.onAddingGoal.bind(this,goal)} />
      {/* onPress={()=>props.onAddingGoal(goal)}    // confirmed that is working        that would work */}

      {/* but in react native that approach is not very effective we can use vanila js syntax  where bind is a function in which 'this' must be passed and actual parameter after that so  bind(this , goal) */}




      {/* //'rgb(134, 255, 215)'  ye wo sea green button*/} 

      </View>
    ) 

}

export default GoalInput;
    
    

const styles = StyleSheet.create({

  screen:{
    // flex:1,
    
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
    
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



})



// ______________________________________________________________________________

// Making the goal to be done when we tap on that item so that should be remove 
// We can do that using touchables / ya goalitem ke view mn OntouchEnd add krdain
// but on touch end is very low level we can not identify how long the touch was 

// So using touchable by wraping any text , view or any of your component and that will become touchable it does not render any thing but it will provide advance functions Touchable is a parent class = it  got functions like touchable opacity etc .  


// Implementing goalitem : using 'touchable' so that they can be removable 
// mashoor touchable functions

// TouchableOpacity 
// TouchableHighlight (ye backgrounf colour change krta ha )
// TouchableNativeFeedback (currently supporting on android (ye wo jo sadahara button mn hota ha ))
// TouchableWithoutFeedback (ye kuch nai kry g bs make it touchable )


//________________________________________________________________________________


// App.js----------------------

import Goalitem from './comp/Goalitem';
import GoalInput from './comp/GoalInput';
import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity , ScrollView, FlatList } from 'react-native';


export default function App() {
 
  const [goalList,setgoalList]= useState([]);

  // function goalHandeler(enteredText) {
  //   setgoal(enteredText);
  // This function is equvalent to the below function 

 
  // when we click on the buton from goalInput we this function should be called 
  // we have to pass data from goalInput.js to app.js 
  // We can do that by setting props on Goal input component
  // yaha pr titleOfGoal argument aya coz only a goal is und here   
  const addGoalHandler= titleOfGoal=>{
    
      // currentGoals contains all the current states ... redirects all the current goals and adds the new goal/state in the goallist 
      setgoalList(currentGoals=> [...currentGoals, {id:Math.random().toString() , value: titleOfGoal}])
      // yaha sirf  aik expression thi jisko return krwa na tha is lia [] use kia 
      // agar keys ka error aa rha ho tou sbki keys set krdo
      // Ab masla ye aa rha jha ke agar hm alaga component bna rhy hain tou goal tou udhar defined so goal is undefined here . So, now addgoal handler will receive an argumnet instead of goal aur ye argument GoalInput se aa rha ho ga 

  }

  const goalDeleteHandler = goalId=>{
    setgoalList(currentGoals=>{
     return currentGoals.filter((goal)=> goal.id !==goalId)})
      // a (builtin method in javascript) filter method returns a new array which is based on an old array which you are calling it 


  }
  return (
    <View style={styles.container}>

      <GoalInput onAddingGoal={addGoalHandler}/>
      
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



// Goalitem.js--------------------

import React from 'react';
import { StyleSheet,View, Text,TouchableOpacity, TouchableHighlight, Touchablef} from "react-native";
// import { TouchableOpacity } from 'react-native-web';

const Goalitem=(props)=>{

    return(
        // touchable is a class . TouchableHighLight 
        // active opacity touchable opacity ki opacity ko control kry ha 
        <TouchableOpacity activeOpacity={0.8} onPress={props.deleteGoal.bind(this,props.id)}>
            <View >
                <Text  style={styles.listofgoals}>{props.goaltitle}</Text>
            </View>       
        </TouchableOpacity>


         
        
        
        
        );
        
        //   goalitem.item.key se hm key print krwa skta 
        //  islo view mn islia wrap kia coz view zayada styling support krta ha
        
    };
    export default Goalitem;



const styles = StyleSheet.create({
    
    listofgoals:{
        color:'rgb(154, 255, 154)',
        borderColor:'white',
        borderWidth:2,
        marginVertical: 20,
        padding:10,
        fontSize:20,
        backgroundColor:'rgb(16, 33, 27)',
        borderRadius:10,
        
        // fontWeight:2,
        
    }
    
    
    
})










// GoalInput.js-------------------



import React,{ useState } from 'react';
import { StyleSheet, View, Button, TextInput} from 'react-native';



const GoalInput=(props)=>{
  const [goal,setgoal]= useState(null);
 
  const  goalHandeler=(enteredText)=> {
    setgoal(enteredText)
    // ye set goal goal ki value update kry ga with every  key stroke
  }
    return(
      <View style={styles.screen}>
      {/* is view mn adding  */}
      <TextInput placeholder='type your goal please :)' style={styles.textInput} onChangeText={goalHandeler}  value={goal}/>
      

      <Button title='Add to your task' color={'rgb(20, 23, 81)'}  onPress={props.onAddingGoal.bind(this,goal)} />
      {/* onPress={()=>props.onAddingGoal(goal)}    // confirmed that is working        that would work */}

      {/* but in react native that approach is not very effective we can use vanila js syntax  where bind is a function in which 'this' must be passed and actual parameter after that so  bind(this , goal) */}




      {/* //'rgb(134, 255, 215)'  ye wo sea green button*/} 

      </View>
    ) 

}

export default GoalInput;
    
    

const styles = StyleSheet.create({

  screen:{
    // flex:1,
    
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
    
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



})



// _______________________________________________________________________________

// Adding a model overlay 

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

// to resize buttons wrap them in views for styling them

// HERE IS THE CODE IMPLEMENTATION 


// App.js ---------------

import Goalitem from './comp/Goalitem';
import GoalInput from './comp/GoalInput';
import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity , ScrollView, FlatList} from 'react-native';


export default function App() {
 
  const [goalList,setgoalList]= useState([]);
  const [addMode,setaddMode] = useState(false);

  // function goalHandeler(enteredText) {
  //   setgoal(enteredText);
  // This function is equvalent to the below function 

 
  // when we click on the buton from goalInput we this function should be called 
  // we have to pass data from goalInput.js to app.js 
  // We can do that by setting props on Goal input component
  // yaha pr titleOfGoal argument aya coz only a goal is und here   
  const addGoalHandler= titleOfGoal=>{
    
      // currentGoals contains all the current states ... redirects all the current goals and adds the new goal/state in the goallist 
      setgoalList(currentGoals=> [...currentGoals, {id:Math.random().toString() , value: titleOfGoal}]);

      
      // yaha sirf  aik expression thi jisko return krwa na tha is lia [] use kia 
      // agar keys ka error aa rha ho tou sbki keys set krdo
      // Ab masla ye aa rha jha ke agar hm alaga component bna rhy hain tou goal tou udhar defined so goal is undefined here . So, now addgoal handler will receive an argumnet instead of goal aur ye argument GoalInput se aa rha ho ga 


      setaddMode(false);
  };

  const goalDeleteHandler = goalId=>{
    setgoalList(currentGoals=>{
     return currentGoals.filter((goal)=> goal.id !==goalId)})
      // a (builtin method in javascript) filter method returns a new array which is based on an old array which you are calling it 


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




// GoalInput.js ------------------


import React,{ useState } from 'react';
import { StyleSheet, View, Button, TextInput ,Modal} from 'react-native';



const GoalInput=(props)=>{
  const [goal,setgoal]= useState(null);

  const goalDatahandler=()=>{
    props.onAddingGoal(goal);
    setgoal(null);


  }
 
  const  goalHandeler=(enteredText)=> {
    setgoal(enteredText)
    // ye set goal goal ki value update kry ga with every  key stroke
  }
    return(
        // We can set visibility of that modal // if 
    // <Modal>
    <Modal  visible={props.mode} animationType={'fade'}>  
      <View style={styles.screen}>
      {/* is view mn adding  */}
      <TextInput placeholder='type your goal please :)' style={styles.textInput} onChangeText={goalHandeler}  value={goal}/>

      <View style={styles.buttons}>
        <View style={styles.Button}>

      <Button title='Add to your task' color={'rgb(20, 23, 81)'}  onPress={goalDatahandler} />
        </View>

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
    
    

const styles = StyleSheet.create({

  Button:{
    width:'40%'
  },

  screen:{
    // view is not actually occupying all the avalible space on the screen. So, by setting flex:1 it will occupy all space and that css will work nicely for modal view
    flex:1,
    backgroundColor:'rgb(45, 62, 74);',
    
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




// Goalitem.js ---------------

import React from 'react';
import { StyleSheet,View, Text,TouchableOpacity, TouchableHighlight, Touchablef} from "react-native";
// import { TouchableOpacity } from 'react-native-web';

const Goalitem=(props)=>{

    return(
        // touchable is a class . TouchableHighLight 
        // active opacity touchable opacity ki opacity ko control kry ha 
        <TouchableOpacity activeOpacity={0.8} onPress={props.deleteGoal.bind(this,props.id)}>
            <View >
                <Text  style={styles.listofgoals}>{props.goaltitle}</Text>
            </View>       
        </TouchableOpacity>


         
        
        
        
        );
        
        //   goalitem.item.key se hm key print krwa skta 
        //  islo view mn islia wrap kia coz view zayada styling support krta ha
        
    };
    export default Goalitem;



const styles = StyleSheet.create({
    
    listofgoals:{
        color:'rgb(154, 255, 154)',
        borderColor:'white',
        borderWidth:2,
        marginVertical: 20,
        padding:10,
        fontSize:20,
        backgroundColor:'rgb(16, 33, 27)',
        borderRadius:10,
        
        // fontWeight:2,
        
    }
    
    
    
})






//------------------------------------------------------------

// THE FINAL WRAPUP 

//------------------------------------------------------------


// YOU can built your own based on core compnents 

// all styling done with javascript 

// View text etc  = compile in native code 

// jo uper fnctions wo javascript code hi rhy ga . ye vir machine mn chly ga ga communicate with native code by a special bridge setup by react native  