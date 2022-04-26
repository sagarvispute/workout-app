import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, View } from "react-native";
import WorkoutItem from "../components/WorkoutItem";
import data from '../data.json';
import { Workout } from "../types/data";

export default function HomeScreen({ navigation }: NativeStackHeaderProps) {
    /* useEffect(() => {
        console.log("Home screen working");
    }, []); */

    return (
        <View style={styles.container}>
            <Text style={styles.header}>New Workout</Text>
            <Text style={styles.header2}>New Workout</Text>
            <FlatList
                data={data as Array<Workout>}
                renderItem={WorkoutItem}
                keyExtractor={item => item.slug}
            />
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
        fontFamily: "montserrat-bold"
    },
    header2: {
        fontSize: 20,
        marginBottom: 15,
        fontWeight: "bold"
    }
});