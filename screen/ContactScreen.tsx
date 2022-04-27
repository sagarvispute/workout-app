import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Button, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { PermissionsAndroid } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import call from 'react-native-phone-call';

export default function ContactScreen({ navigation }: NativeStackHeaderProps) {
    const [contactPermission, setContactPermission] = useState<boolean>(false);
    const [ascOrder, setAscOrder] = useState<boolean>(false);
    const [searchStr, setSearchStr] = useState<string>('');
    const [contactList, setContactList] = useState<any[]>();

    useEffect(() => {
        getContacts();

        return () => {
            setContactList([]);
        }
    }, []);

    useEffect(() => {
        getContacts(searchStr);
    }, [ascOrder]);

    const getContacts = async (data?: string) => {
        setSearchStr(data ? data : '');
        try {
            const { status } = await Contacts.getPermissionsAsync();
            console.log(status)
            if (status === 'granted') {
                const { data: contacts } = await Contacts.getContactsAsync({ name: data ?? searchStr, });

                contacts.sort((a, b) => {
                    if (ascOrder && a.name > b.name) {
                        return 1;
                    }
                    if (!ascOrder && a.name < b.name) {
                        return -1;
                    }
                    return 0;
                });

                setContactList(contacts);
            }
        } catch (e: any) {
            console.log(e.message);
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
            <Text style={styles.header}>My Contacts</Text>
            <View style={styles.searchBox}>
                <TextInput
                    onChangeText={(search) => getContacts(search)}
                    style={styles.searchBar}
                    placeholder="Search contact"
                />
                <View>
                    {ascOrder &&
                        <FontAwesome name="sort-alpha-asc" size={24} color="black" onPress={() => setAscOrder(false)} />
                    }
                    {!ascOrder &&
                        <FontAwesome name="sort-alpha-desc" size={24} color="black" onPress={() => setAscOrder(true)} />
                    }
                </View>
            </View>
            <FlatList
                data={contactList}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.contactItem}>
                            <View style={styles.contactImg}>

                                {item.imageAvailable &&
                                    <Image source={{ uri: item?.image?.uri }} style={{ width: "80%", height: 40, borderRadius: 5 }} />}

                                {!item.imageAvailable &&
                                    <FontAwesome name="user-circle" size={24} color="black" />}

                            </View>
                            <View style={styles.contactInfo}>
                                <Pressable onPress={() => navigation.navigate('ViewContact', { contact: item })}>
                                    <Text style={styles.contactHeader}>{item.name}</Text>
                                    <Text> {item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].number}</Text>
                                </Pressable>
                            </View>
                            <View style={styles.contactControls}>
                                <Feather name="edit-3" size={24} color="black" onPress={() => navigation.navigate('EditContact', { contact: item })} />
                                <Ionicons name="call-outline" size={24} color="black" onPress={() => triggerCall(item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].number)} />
                            </View>
                        </View>
                    )
                }}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        marginTop: 30
    },
    searchBox: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchBar: {
        fontSize: 15,
        height: 45,
        marginRight: 15,
        borderRadius: 10,
        borderColor: "rgba(0,0,0,0.3)",
        borderWidth: 1,
        padding: 10,
        backgroundColor: "rgba(0,0,0,0.1)",
        flex: 1
    },
    itemText: {
        margin: 10,
        color: 'white',
        fontSize: 24,
        backgroundColor: 'blue',
        width: '100%',
        height: 50
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
    contactItem: {
        borderRadius: 10,
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        textAlignVertical: 'center',
        alignItems: 'center'
    },
    contactHeader: {
        fontWeight: "bold"
    },
    contactImg: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        flex: 1
    },
    contactInfo: {
        flex: 5
    },
    contactControls: {
        flex: 1.3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});