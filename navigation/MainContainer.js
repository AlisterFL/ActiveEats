import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";

// Screens
import RecipeScreen from "./screens/RecipeScreen";
import CourseScreen from "./screens/CourseScreen";
import Journal from "./screens/JournalScreen";
import ReportScreen from "./screens/ReportScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdDetailsScreen from "./screens/AdDetailsScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LogInScreen from "./screens/LogInScreen";
import GeneralConditionsOfUse from "./screens/GeneralConditionsOfUse";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function MainContainer() {

  return (
    <SafeAreaView style={{ flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LogInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ animation: 'slide_from_left' }}/>
          <Stack.Screen name="AdDetailsScreen" component={AdDetailsScreen} />
          <Stack.Screen name="GeneralConditionsOfUse" component={GeneralConditionsOfUse} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

function MainTabs() {

  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="Recette"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Recette") {
            iconName = focused ? "restaurant" : "restaurant-outline";
          } else if (route.name === "Éducation") {
            iconName = focused ? "library" : "library-outline";
          } else if (route.name === "Journal") {
            iconName = focused ? "nutrition" : "nutrition-outline";
          } else if (route.name === "Rapport") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "Profil") {
            iconName = focused ? "person" : "person-outline";
          }
          

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#A3D288",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: { paddingBottom: 0, fontSize: 10 },
        tabBarStyle: { paddingTop: 10, height: 50, backgroundColor: "white"},
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Recette"
        component={RecipeScreen}
      />
      <Tab.Screen name="Éducation" component={CourseScreen} />
      <Tab.Screen
        name="Journal"
        component={Journal}
      />
      <Tab.Screen name="Rapport" component={ReportScreen} />
      <Tab.Screen name="Profil">
        {() => <ProfileScreen onLogout={() => navigation.navigate('Login')} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}