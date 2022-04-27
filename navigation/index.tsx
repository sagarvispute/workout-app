import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screen/HomeScreen";
import PlannerScreen from "../screen/PlannerScreen";

import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import WorkoutDetailScreen from "../screen/WorkoutDetailScreen";
import ContactScreen from "../screen/ContactScreen";
import ViewContactScreen from "../screen/ViewContact";
import EditContactScreen from "../screen/EditContact";

export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    )
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="WorkoutDetails"
                component={WorkoutDetailScreen}
                options={{
                    headerBackTitle: "",
                    title: "Workout Info",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 18
                    }
                }}
            />
            <Stack.Screen
                name="ViewContact"
                component={ViewContactScreen}
                options={{
                    headerBackTitle: "",
                    title: "",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 18
                    }
                }}
            />
            <Stack.Screen
                name="EditContact"
                component={EditContactScreen}
                options={{
                    headerBackTitle: "",
                    title: "",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 18
                    }
                }}
            />
        </Stack.Navigator>
    )
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator initialRouteName="Home">
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => <FontAwesome name="home" color={color} size={24} />,

                }}
            />
            <BottomTab.Screen
                name="Planner"
                component={PlannerScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => <Entypo name="add-to-list" color={color} size={24} />
                }}
            />
            <BottomTab.Screen
                name="Contact"
                component={ContactScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => <AntDesign name="contacts" size={24} color={color} />,
                    headerShown: false
                }}
            />
        </BottomTab.Navigator>
    )
}