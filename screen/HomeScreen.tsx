import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import WorkoutItem from "../components/WorkoutItem";
import { useWorkouts } from "../hooks/useWorkouts";
import { Workout } from "../types/data";

export default function HomeScreen({ navigation }: NativeStackHeaderProps) {
    const workouts: Workout[] = useWorkouts();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>New Workout</Text>
            <FlatList
                data={workouts}
                renderItem={({ item }) => {
                    return (
                        <Pressable onPress={() => navigation.navigate('WorkoutDetails', { slug: item.slug })}>
                            <WorkoutItem
                                item={item}
                            />
                        </Pressable>
                    )
                }}
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
        fontFamily: "montserrat-extrabold"
    },
});