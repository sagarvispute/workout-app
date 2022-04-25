import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";

export default function PlannerScreen({ navigation }: NativeStackHeaderProps) {
    useEffect(() => {
        console.log("Planner screen working");
    }, []);

    return (
        <View>
            <Text>Planner Screen</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}