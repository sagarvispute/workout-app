import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";

export default function TestScreen({ navigation }: NativeStackHeaderProps) {
    useEffect(() => {
        console.log("Test screen working");
    }, []);

    return (
        <View>
            <Text>Test Screen</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}