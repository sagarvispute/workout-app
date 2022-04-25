import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";

export default function HomeScreen({navigation}: NativeStackHeaderProps) {
    useEffect(() => {
        console.log("Home screen working");
    }, []);

    return (
        <View>
            <Text>Home Screen</Text>
            <Button title="Go to Planner" onPress={() => navigation.navigate('Planner')} />
            <Button title="Go to Test" onPress={() => navigation.push('Test')} />
        </View>
    )
}