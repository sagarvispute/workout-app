import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screen/HomeScreen";
import PlannerScreen from "../screen/PlannerScreen";
import TestScreen from "../screen/TestScreen";

import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Text, TouchableHighlight } from "react-native";
import WorkoutDetailScreen from "../screen/WorkoutDetailScreen";

export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    )
}

const Stack = createNativeStackNavigator();

const Left = ({ onPress }: any) => (
    <TouchableHighlight onPress={onPress}>
        <Text>Back</Text>
    </TouchableHighlight>
);

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
        </BottomTab.Navigator>
    )
}