import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

export default function WorkoutDetailScreen({ navigation, route }: NativeStackHeaderProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Slug - {(route.params as any).slug}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
    },
    header: {
        fontSize: 20,
        marginBottom: 15,
        fontWeight: "bold",
        fontFamily: "montserrat-extrabold"
    },
});