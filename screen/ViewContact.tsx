import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Button, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { PermissionsAndroid } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Contact } from 'expo-contacts';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import call from 'react-native-phone-call';

type DetailParams = {
    route: {
        params: {
            contact: any
        }
    }
}
type Navigation = NativeStackHeaderProps & DetailParams;

export default function ViewContactScreen({ navigation, route }: Navigation) {
    const [contact, setContact] = useState<Contact>();
    useEffect(() => {
        setContact(route.params.contact);
        console.log(contact);
    }, [])

    useEffect(() => {
        console.log(contact);
    }, [contact])

    const removeContact = async (id: any) => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const data = await Contacts.removeContactAsync(id);

            console.log(data);
        }
    }

    const triggerCall = (contactNumber: any) => {
        if (contactNumber.toString().length < 10) {
            alert('Please insert correct contact number');
            return;
        }

        const args = {
            number: contactNumber.toString(),
            prompt: true,
        };
        // Make a call
        call(args).catch(console.error);
    };

    return (
        <View style={styles.container}>
            <View style={styles.contactImg}>
                {contact?.imageAvailable &&
                    <Image source={{ uri: contact?.image?.uri }} style={{ width: "100%", height: 200, left: 0, right: 0 }} resizeMode="contain" />}

                {!contact?.imageAvailable &&
                    <FontAwesome name="user-circle" size={200} color="black" />}
            </View>
            <View style={styles.contactDetails}>
                {contact?.namePrefix &&
                    <View style={styles.tableRow}>
                        <View style={styles.tableLabel} ><Text style={styles.label}>Prefix</Text></View>
                        <View style={styles.tableLabelData} ><Text>{contact?.namePrefix}</Text></View>
                    </View>
                }

                <View style={styles.tableRow}>
                    <View style={styles.tableLabel} ><Text style={styles.label}>First Name</Text></View>
                    <View style={styles.tableLabelData} ><Text>{contact?.firstName}</Text></View>
                </View>

                {contact?.middleName &&
                    <View style={styles.tableRow}>
                        <View style={styles.tableLabel} ><Text style={styles.label}>Middle Name</Text></View>
                        <View style={styles.tableLabelData} ><Text>{contact?.middleName}</Text></View>
                    </View>
                }

                <View style={styles.tableRow}>
                    <View style={styles.tableLabel} ><Text style={styles.label}>Last Name</Text></View>
                    <View style={styles.tableLabelData} ><Text>{contact?.lastName}</Text></View>
                </View>

                {contact?.nameSuffix &&
                    <View style={styles.tableRow}>
                        <View style={styles.tableLabel} ><Text style={styles.label}>Suffix</Text></View>
                        <View style={styles.tableLabelData} ><Text>{contact?.nameSuffix}</Text></View>
                    </View>
                }

                <Text style={styles.label}>Contacts </Text>

                {contact?.phoneNumbers?.map((data) => <>
                    <View key={data.id} style={{ alignSelf: 'stretch', flexDirection: 'row', paddingLeft: 20 }}>
                        <View style={styles.tableLabel} ><Text style={styles.label}>{data.label}</Text></View>
                        <View style={{ flex: 3.7, alignSelf: 'stretch' }} ><Text>{data.number}</Text></View>
                    </View>
                </>)}
            </View>

            <View style={{ marginTop: 50, alignSelf: 'stretch', flexDirection: 'row' }}>
                <View style={{ flex: 1, alignSelf: 'stretch', paddingRight: 10 }} ><Button title="Edit" onPress={() => alert("edit")} /></View>
                <View style={{ flex: 1, alignSelf: 'stretch', paddingRight: 10, paddingLeft: 10 }} ><Button title="Delete" onPress={() => removeContact(contact?.id)} /></View>
                <View style={{ flex: 1, alignSelf: 'stretch', paddingLeft: 10 }} ><Button title="Call" onPress={() => triggerCall(contact?.phoneNumbers && contact?.phoneNumbers[0] && contact?.phoneNumbers[0].number)} /></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
    },
    label: {
        fontWeight: '700'
    },
    contactImg: {
        fontSize: 100,
        alignContent: 'center',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    contactDetails: {
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        paddingTop: 20
    },
    tableRow: {
        alignSelf: 'stretch',
        flexDirection: 'row'
    },
    tableLabel: {
        flex: 1.3,
        alignSelf: 'stretch'
    },
    tableLabelData: {
        flex: 3,
        alignSelf: 'stretch'
    }
});