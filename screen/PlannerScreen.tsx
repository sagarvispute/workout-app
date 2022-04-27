import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

export default function PlannerScreen({ navigation }: NativeStackHeaderProps) {
    return (
        <View style={styles.container}>
            <Text>Planner screen</Text>
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
    sequenceItem: {
        alignItems: "center"
    },
    centerView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20
    },
});