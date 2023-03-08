// To change the pages with animations and with the forward and backward functionality

// I will convert the meals app to the landscape

//---------------------------------------------------------------------------------
// Adding a dummy data
//---------------------------------------------------------------------------------

// data ko daal dia in the project
// data ke folder mn dummy data dala
// models ke andar layout
 

//------------------------------------------------------------------------------
// Getting the dummy data and displaying t using flatlist
//------------------------------------------------------------------------------

// categrogy screen bna aai then aur flat list se categories display kr dain

// now to display them in the form of grid we have to make a grid tile and passing color and data as props to that category grid tile component

// Styling the grid style

// * If we apply pressable ripple effect the ripple effect will go outside the contianer so to fix this we will make overflow to hidden. but in ios we have to make overflow to visible

// like this


//CategoryGridTile.js

import React from "react";
import { Text, View, StyleSheet, Pressable, Platform } from "react-native";

const CategoryGridTile = (props) => {
  // props.color  abhi use krna baaki ha
//   const backgroundColor = props.color;
  return (
    <View style={styles.categoryOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.button, styles.pressed]
            : styles.button
        }
        android_ripple={{ color: "black" }}
      >
        <View style={[styles.innerContainer, {backgroundColor:props.color}]}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
        padding: 16,
        borderRadius: 5,
  },
  categoryOuterContainer: {
    elevation: 8,
    backgroundColor: "white",
    flex: 1,
    height: 150,
    borderRadius: 5,
    margin: 16,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
    overflow:Platform.select({ios:"visible",android:"hidden"})   // iski baat kr rha 
    },
    pressed: {
      opacity:0.75
  },
    button: {
        flex:1
    },
    title: {
        fontSize: 18,
        fontWeight:"bold"
  }
});

export default CategoryGridTile;


//--------------------------------------------------------------------------------------
// Introduction to the useNavigation Hook
//--------------------------------------------------------------------------------------

// https://reactnavigation.org/docs/getting-started/


// step 1 : install the package
// * npm install @react-navigation/native

//  step 2 : Install dependencies for expo based projects

// * npx expo install react-native-screens react-native-safe-area-context

// Setup completed  Now implementing steps in code


// NavigationContainer === Wrap it with the entire app jo jo ike andar ho ga wo wo navigation use kr pa a ga

/// Step 3 : In App.js  wrap it with the NavigationContainer then use navigators


// * Navigators are the different navigatiuion behaviors explore official docs for more
// https://reactnavigation.org/docs/stack-navigator


// Installing the desired Navigator

// * npm install @react-navigation/native-stack



// * Navagation will build in added the 1 SafeArea View , 2  header , 3 background

// * The components that are wrapped in the navigation screen receive a prop navigation prop to navigate under different conditions


// Navigation using steps


import { NavigationContainer } from "@react-navigation/native"; // step 1
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CategoryScreen from "./screens/CategoryScreen";
import MealsOverView from "./screens/MealsOverView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// step 2 wrap it with the container
export default function App() {
  const Stack = createNativeStackNavigator(); // step 3
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Step 4 stack navigation setup   */}
      <NavigationContainer >   
        <Stack.Navigator >
          <Stack.Screen  name="Meals Categories" component={CategoryScreen}/>
          <Stack.Screen  name="Meals OverView" component={MealsOverView}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#48220bff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});



// In component that is wrapped in stack uses like this

import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import { CATEGORIES } from "../data/dummy-data";
const CategoryScreen = (props) => {
    const onPressCategoryHandler = () => {
        props.navigation.navigate("Meals OverView")   // step 5
    }
  return (
    <View style={styles.Screen}>
      <FlatList
        style={styles.Screen}
        keyExtractor={(item, index) => item.id}
        data={CATEGORIES}
        renderItem={(mealsItem) => {
          return (
            <CategoryGridTile
              title={mealsItem.item.title}
              color={mealsItem.item.color}
              onPress={onPressCategoryHandler}  
            />
          );
        }}
        numColumns={2}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    color: "black",
  },
});

export default CategoryScreen;



//-----------------------------------------------------------------------------
// About initial component screen
//------------------------------------------------------------------------------


// jo stack navigator mn sbse top pr hoga wo initial page


// Alternatively  define initial route ti stack navigator 

<Stack.Navigator initialRouteName="ProductDetails">
  <Stack.Screen name="AllProducts" component={AllProducts} /> 
  <Stack.Screen name="ProductDetails" component={ProductDetails} /> // initial screen
</Stack.Navigator>

//----------------------------------------------------------------------------
// UseNavigation hook
//---------------------------------------------------------------------------

// NAVIGATION AND THE ROUTE PROP 
// The component that is defined in the navigator will recevie the navigatin and route  props however the nested components will not receive the prop to navigation and route to get this we will use 
useNavigation() // to get navigation object in any component like this
useRoute() // to get route object in any component like this

// const navigation = useNavigation()

// Like this


import { useNavigation } from "@react-navigation/native"; // step 1 
import React from "react";
import { Text, View, StyleSheet,Button } from "react-native";


const MealsOverView = (props) => {
    const navigation = useNavigation()   // step 2 

    return(
        <View >
            <Text>Hello Ibrahim this is meals overview</Text>
            <Button  title="dabao" onPress={()=>{navigation.navigate("Meals Categories")}}/>
        </View>
    )

}
export default MealsOverView;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:16
    }


})


//----------------------------------------------
// passing data between the screens
//-----------------------------------------------


// navigate krte waqt  params define krny hain 


navigate("meals ", { params })


// params targeted component mn load route prop se krny hain

const catid = props.route.params.catagoryid


// Loading data into navigation

import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import { CATEGORIES } from "../data/dummy-data";
const CategoryScreen = (props) => {
    const onPressCategoryHandler = (mealsItem) => { // load the data in the navigation 
        props.navigation.navigate("Meals OverView", {
            categoryId:mealsItem.item.id
        })   // step 5
    }
  return (
    <View style={styles.Screen}>
      <FlatList
        style={styles.Screen}
        keyExtractor={(item, index) => item.id}
        data={CATEGORIES}
        renderItem={(mealsItem) => {
          return (
            <CategoryGridTile
              title={mealsItem.item.title}
              color={mealsItem.item.color}
              onPress={onPressCategoryHandler.bind(this,mealsItem)}  
            />
          );
        }}
        numColumns={2}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    color: "black",
  },
});

export default CategoryScreen;


// Extracting data using route


import { useNavigation } from "@react-navigation/native"; // step 1 
import React from "react";
import { Text, View, StyleSheet,Button } from "react-native";


const MealsOverView = (props) => {
    const catID = props.route.params.categoryId  // ye data extract krlia step 6
    const navigation = useNavigation()   // step 2 

    return(
        <View >
            <Text>Hello Ibrahim this is meals overview = { catID}</Text>
            <Button  title="dabao" onPress={()=>{navigation.navigate("Meals Categories")}}/>
        </View>
    )

}
export default MealsOverView;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:16
    }


})


//------------------------------------------------------------------------------
// Rendering the meals
//------------------------------------------------------------------------------

// Rendered
// and generated a component of meal item

//------------------------------------------------------------------------------
// Styling the background and header of navigation
//------------------------------------------------------------------------------

// WE can style the background and navigation using options of the stack navigator

// 2 main methods

// * 1  setting styles of header for a singular screens by defining only options in the component screen

import { NavigationContainer } from "@react-navigation/native"; // step 1
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CategoryScreen from "./screens/CategoryScreen";
import MealsOverView from "./screens/MealsOverView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

// step 2 wrap it with the container
export default function App() {
  const Stack = createNativeStackNavigator(); // step 3
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#043e47", "#62fffa"]} style={styles.screen}>
        <StatusBar style="light" />

        {/* Step 4 stack navigation setup   */}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Meals Categories"
              component={CategoryScreen}
              options={{
                // contentStyle: {backgroundColor:"#442503"},   // main screen ki styling 
                contentStyle: {backgroundColor:"#013031"},   // main screen ki styling 
                
                statusBarAnimation:"slide",  // status bar animation aur bht saray hain
                statusBarColor:"#000000",
                headerTintColor:"#ffffff",
                title: "All Categories",  // changes title
                headerStyle: {   //  changes the background of header
                  // backgroundColor: "#2a1600",  
                  backgroundColor: "#001c18",  
                },
              }}
            />
            <Stack.Screen name="Meals OverView" component={MealsOverView} />
          </Stack.Navigator>
        </NavigationContainer>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex:1
  },
  container: {
    flex: 1,
    // backgroundColor: '#48220bff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});






// * 2  setting styles of header for all screens at once in the screenOptions prop  of the
// of the stack navigator

import { NavigationContainer } from "@react-navigation/native"; // step 1
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CategoryScreen from "./screens/CategoryScreen";
import MealsOverView from "./screens/MealsOverView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

// step 2 wrap it with the container
export default function App() {
  const Stack = createNativeStackNavigator(); // step 3
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#043e47", "#62fffa"]} style={styles.screen}>
        <StatusBar style="light" />

        {/* Step 4 stack navigation setup   */}
        <NavigationContainer>
          <Stack.Navigator screenOptions={{  // qatam 1 
               headerTintColor:"#ffffff",
               contentStyle: {backgroundColor:"#013031"},   // main screen ki styling 
               headerStyle: {   //  changes the background of header
                 // backgroundColor: "#2a1600",  
                 backgroundColor: "#001c18",  
               },
            
          }}>
            <Stack.Screen
              name="Meals Categories"
              component={CategoryScreen}
              options={{  // qadam 2 
                title: "All Categories",  // changes title
                // contentStyle: {backgroundColor:"#442503"},   // main screen ki styling 
                statusBarAnimation:"slide",  // status bar animation aur bht saray hain
                statusBarColor:"#000000",
             
              }}
            />
            <Stack.Screen name="Meals OverView" component={MealsOverView} />
          </Stack.Navigator>
        </NavigationContainer>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex:1
  },
  container: {
    flex: 1,
    // backgroundColor: '#48220bff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});





//------------------------------------------------------------------------------
// Setting navigation options Dynamically
//------------------------------------------------------------------------------

// We can set naviagtions options dynamically wani kuch calculated values use krni hn in the form of consts etc like categories ka title hme db se le kr ana ha  instead of the STATIC DATA we want to use DYNAMIC DATA in the navigations

// * 1 can be achieved with a anyonymous function that receives routes and navigation as argument and calculate and persorm operations on the data that is in the route prop
// Like this on screen component ( stack.screen ) where below options is the prop of stack.screen

options = {(route, navigation)=> {
  
  const CatId= route.params.cid
  return {
    title:CatId
  }
}}
   
// * 2 by excessing the navigation.setOptions to set options with in the component dynamically but remember to wrap it in the useEffect or useLayoutEffect() to execute before the component mount

// code implemetation

import MealsItem from "../components/MealsItem";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native"; // step 1
import React from "react";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";
import { MEALS ,CATEGORIES} from "../data/dummy-data";
import Category from "../models/category";

const MealsOverView = (props) => {
  const catID = props.route.params.categoryId; // ye data extract krlia step 6
  const CategoryMeals = MEALS.filter(
    (meals) => meals.categoryIds.indexOf(catID) >= 0
  );
  const navigation = useNavigation(); // step 2

const CategoryTitle = CATEGORIES.find((category)=>category.id===catID).title  // qadam 1

  // qadam 2 ---
  useLayoutEffect(() => {
    navigation.setOptions({
      title:CategoryTitle
    })
  }

  ,[navigation,CategoryTitle])
  

  return (
    <View>
      <Text>{catID}</Text>
      <View>
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={CategoryMeals}
          renderItem={(mealitem) => {
            return (
              <MealsItem
                imageUrl={mealitem.item.imageUrl}
                title={mealitem.item.title}
                Duration={mealitem.item.duration}
                Complexity={mealitem.item.complexity}
                Affordibility={mealitem.item.affordability}
              />
            );
          }}
        ></FlatList>
        {/* {CategoryMeals} */}
      </View>
      <Button
        title="dabao"
        onPress={() => {
          navigation.navigate("Meals Categories");
        }}
      />
    </View>
  );
};
export default MealsOverView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});


//------------------------------------------------------------------------------
// Adding and configurong the meals details screen
//------------------------------------------------------------------------------


// Add a brand new page with navigation ann pass the data
// Screen added now we left with the styling
//


//---------------------------------------------------------------------------
// Adding a header button in the navigation header
//---------------------------------------------------------------------------

// We can add content on the header right and left by manipulating the header right and the header left properties that is available in the options

// * you can add any element . but you should provide a react component here (you should return a jsx )


// 1 Code implementation -- ( IF we want to define the button globally )

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CategoryScreen from "./screens/CategoryScreen";
import MealsOverView from "./screens/MealsOverView";
import MealsDetailsScreen from "./screens/MealsDetailsScreen";   // newsScr 1   
import { NavigationContainer } from "@react-navigation/native"; // step 1
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

// step 2 wrap it with the container
export default function App() {
  const Stack = createNativeStackNavigator(); // step 3
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#043e47", "#62fffa"]} style={styles.screen}>
        <StatusBar style="light" />

        {/* Step 4 stack navigation setup   */}
        <NavigationContainer>
          <Stack.Navigator screenOptions={{  // qatam 1 
               headerTintColor:"#ffffff",
               contentStyle: {backgroundColor:"#013031"},   // main screen ki styling 
               headerStyle: {   //  changes the background of header
                 // backgroundColor: "#2a1600",  
                 backgroundColor: "#001c18",  
               },
            
          }}>
            <Stack.Screen
              name="Meals Categories"
              component={CategoryScreen}
              options={{  // qadam 2 
                title: "All Categories",  // changes title
                // contentStyle: {backgroundColor:"#442503"},   // main screen ki styling 
                statusBarAnimation:"slide",  // status bar animation aur bht saray hain
                statusBarColor:"#000000",
             
              }}
            />
            <Stack.Screen name="Meals OverView" component={MealsOverView} />
            <Stack.Screen name="Meal details" component={MealsDetailsScreen} options={
              {
                headerRight: ()=><Text>hello</Text> // phaila qadam 1
              }
            }></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex:1
  },
  container: {
    flex: 1,
    // backgroundColor: '#48220bff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});


// 2  Code implementation if we only want the interation with only the component respossible

import React from "react";
import { Text, View, StyleSheet, Image, FlatList, Button } from "react-native";
import { useRoute } from "@react-navigation/native"; // newScr qadam 6
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";  // headerRight qadam 1
import { MEALS } from "../data/dummy-data";
import IconButton from "../components/IconButton";

const MealsDetailsScreen = (props) => {
  const route = useRoute(); // newScr qadam 8
  const mealId = route.params.mealId; // newScr qadam 7
  const navigation = useNavigation();
  const Meal = MEALS.find((meal) => meal.id === mealId);
  navigation.setOptions();


  const onFavourateHandler = () => {
    console.log("pressed")
  }


  // headerRight qadam 2
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        // return <Button onPress={onFavourateHandler} title="hello"></Button>;
        return <IconButton onPress={onFavourateHandler}></IconButton>;
      },
    });
  }, [navigation,onFavourateHandler]);

  return (
    <View style={styles.screen}>
      <Image style={styles.image} source={{ uri: Meal.imageUrl }}></Image>
      <Text>{Meal.title}</Text>
      <View style={styles.details}>
        <Text style={styles.text}> {Meal.duration} minutes </Text>
        <Text style={styles.text}> {Meal.complexity}</Text>
        <Text style={styles.text}> {Meal.affordability} </Text>
      </View>
      <View>
        <Text style={styles.text}>Ingredients</Text>
        <View>
          <View>
            <FlatList
              keyExtractor={(item) => item.id}
              data={Meal.ingredients}
              renderItem={(meal) => {
                return <Text>{meal.item}</Text>;
              }}
            ></FlatList>
          </View>

          <Text style={styles.text}>Steps</Text>
          <View>
            <FlatList
              keyExtractor={(item) => item.id}
              data={Meal.steps}
              renderItem={(meal) => {
                return <Text>{meal.item}</Text>;
              }}
            ></FlatList>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    backgroundColor: "#ececec",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#483202ff",
    marginHorizontal: 4,
    textAlign: "center",
  },
  image: {
    width: "80%",
    height: 200,
    // borderRadius: 7,
  },

  screen: {
    margin: 15,
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
});

export default MealsDetailsScreen;


//----------------------------------------------------------------------
//  Introduction to drawer navigation
//----------------------------------------------------------------------

// https://reactnavigation.org/docs/drawer-navigator

// Installation

// * npm install @react-navigation/drawer

// * npx expo install react-native-gesture-handler react-native-reanimated

// the creation of navigation => then drawer.navigator => then drawer.screen
// everything is same as the stack navigator but there are more drawer specific options

drawerLabel: "Welcolome screen" // jo screen/ ya component ha uska naam in the drawer
drawerActiveBackgroundColor:"#e4beff"   // selected drawer mn se selected ka bg
drawerActiveTintColor: "#250040"    // active walay ka color 
drawerStyle: { backgroundColor: "#cccccc" }  // jaisay stack mn content style tha

// Jis screen mn drawer ho ga us screen ka background change krne ke lia contentStyle ke baja a sceneContentStyle use ho ga like this 
sceneContainerStyle: { backgroundColor: '#3f2f25' },


drawerContentStyle: { backgroundColor: '#351401' },  // same as drawer style bs drawer style se hm drawer ki width bhi set kr skty hain 


// Bohot hi kamal ki cheez we can set icons for the drawers using

drawerIcon: ({ color, size, focused }) => <Ionicons name="home" size={size} color={color}></Ionicons>



// * You can basically do everything with that drawer you can also render a custom component in that drawer instead of items just go through the official docs to learn more

// * wo aik project download kia ha use daikhna



//----------------------------------------------------------------
// Introduction to tab navigators
//----------------------------------------------------------------


// same implementation as of the stack and drawer

// We can set the bottom tab icon using 
tabBarIcon: ({ color, size }) => (
  <Ionicons name="home" color={color} size={size} />
),
tabBarActiveTintColor
tabBarStyle    //   tab bar ka background etc set krny ke lia 


// * Go through the sameple example projects of tab and drawer navigators

// tabbar sample code 

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#3c0a6b' },
          headerTintColor: 'white',
          tabBarActiveTintColor: '#3c0a6b'
        }}
      >
        <BottomTab.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}


//-----------------------------------------------------------------
// Nesting navigators
//-----------------------------------------------------------------

// a lot of appp that requires the combination of navigators like


// You can add other navigator screens as also in others navigators screens


// Like this

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; // step 1
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer"; // nested 1
import {Ionicons} from "@expo/vector-icons"

import CategoryScreen from "./screens/CategoryScreen";
import MealsOverView from "./screens/MealsOverView";
import MealsDetailsScreen from "./screens/MealsDetailsScreen"; // newsScr 1
import FavourateScreen from "./screens/FavourateScreen";

const Stack = createNativeStackNavigator(); // step 3
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  // nested 2 ye aik component ha isko alag file mn bhi daal skty
  return (
    <Drawer.Navigator
      screenOptions={{
        // qatam 1
        headerTintColor: "#ffffff",

        sceneContainerStyle: { backgroundColor: "#000000'" },
        drawerActiveBackgroundColor: "#ffe4c8",
        drawerInactiveBackgroundColor: "#ffffff",
        drawerActiveTintColor: "#472400",
        drawerContentStyle: { backgroundColor: "#351401" },
        headerStyle: {
          //  changes the background of header
          backgroundColor: "#2a1600",
        },
      }}
    >
      <Drawer.Screen
        name=" All Categories"
        component={CategoryScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favourates"
        component={FavourateScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

// step 2 wrap it with the container
export default function App() {
  return (
    < >
      <StatusBar style="light" />

      {/* Step 4 stack navigation setup   */}
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={
            {  headerTintColor: "#ffffff",
            statusBarColor: "#000000",
            contentStyle: { backgroundColor: "#7d0000'" }, // main screen ki styling
            headerStyle: {
              //  changes the background of header
              backgroundColor: "#371a00",
            }}
          }
        >
          <Stack.Screen // nested 3 stack ke wo components drawer mn included jinme show krwana
            name="Drawer"
            component={DrawerNavigation}
            options={{
              // qadam 2
              // title: "All Categories",  // changes title
          
              // statusBarAnimation:"slide",  // status bar animation aur bht saray hain
              statusBarColor: "#000000",
              headerShown: false, // // nested 4 stack ka header gayab
            }}
          />
          <Stack.Screen name="Meals OverView" component={MealsOverView} />
          <Stack.Screen name="Meal details" component={MealsDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});




// GORAY KA CODE

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#351401' },
        headerTintColor: 'white',
        sceneContainerStyle: { backgroundColor: '#3f2f25' },
        drawerContentStyle: { backgroundColor: '#351401' },
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: '#351401',
        drawerActiveBackgroundColor: '#e4baa1',
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'All Categories',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#351401' },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: '#3f2f25' },
          }}
        >
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
          <Stack.Screen
            name="MealDetail"
            component={MealDetailScreen}
            options={{
              title: 'About the Meal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
        
//===========================================================================
/// options and setOption ka function syntax to extract navigation and route
//===========================================================================


options = {(route, navigation)=> {  // istarha extract 
  
  const CatId = route.params.cid
  return {
    title:CatId
  }
}}

//---------------------------------------------------
// Getting started with SQLITE 
//---------------------------------------------------
