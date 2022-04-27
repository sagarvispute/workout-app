import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Contact } from 'expo-contacts';
import * as Contacts from 'expo-contacts';
import { FontAwesome } from '@expo/vector-icons';

type DetailParams = {
    route: {
        params: {
            contact: any
        }
    }
}

type Navigation = NativeStackHeaderProps & DetailParams;

export default function EditContactScreen({ navigation, route }: Navigation) {
    const [contact, setContact] = useState<Contact>();
    const [_updateContact, setUpdateContact] = useState<Contact>();
    useEffect(() => {
        setContact(route.params.contact);
        setUpdateContact(Object.assign(route.params.contact));
    }, [])

    useEffect(() => {
        console.log(contact);
    }, [contact])

    const updateContact = (field: any, data: string|number) => {
        let oldContact:any = _updateContact;
        oldContact[field] = data;
        setUpdateContact(oldContact);
    }

    const saveContact = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted' && _updateContact) {
            const response = await Contacts.updateContactAsync(_updateContact);
            console.log(response);
        }
    }

    //console.log(route.params.contact)
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.contactImg}>
                    {contact?.imageAvailable &&
                        <Image source={{ uri: contact?.image?.uri }} style={{ width: "100%", height: 200, left: 0, right: 0 }} resizeMode="contain" />}

                    {!contact?.imageAvailable &&
                        <FontAwesome name="user-circle" size={200} color="black" />}
                </View>
                <View style={styles.contactDetails}>
                    <View style={styles.textBoxWrapper}>
                        <Text style={styles.label}>Name Prefix</Text>
                        <TextInput
                            defaultValue={contact?.namePrefix}
                            onChangeText={(data) => updateContact('namePrefix', data)}
                            style={styles.textBox}
                            placeholder="Name Prefix"
                        />
                    </View>
                    <View style={styles.textBoxWrapper}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput
                            defaultValue={contact?.firstName}
                            onChangeText={(data) => updateContact('firstName', data)}
                            style={styles.textBox}
                            placeholder="First Name"
                        />
                    </View>
                    <View style={styles.textBoxWrapper}>
                        <Text style={styles.label}>Middle Name</Text>
                        <TextInput
                            defaultValue={contact?.middleName}
                            onChangeText={(data) => updateContact('middleName', data)}
                            style={styles.textBox}
                            placeholder="Middle Name"
                        />
                    </View>
                    <View style={styles.textBoxWrapper}>
                        <Text style={styles.label}>Last Name</Text>
                        <TextInput
                            defaultValue={contact?.lastName}
                            onChangeText={(data) => updateContact('lastName', data)}
                            style={styles.textBox}
                            placeholder="Last Name"
                        />
                    </View>
                    <View style={styles.textBoxWrapper}>
                        <Text style={styles.label}>Name Suffix</Text>
                        <TextInput
                            defaultValue={contact?.nameSuffix}
                            onChangeText={(data) => updateContact('nameSuffix', data)}
                            style={styles.textBox}
                            placeholder="Name Suffix"
                        />
                    </View>
                    {contact?.phoneNumbers?.map((data) =>
                        <View style={styles.textBoxWrapper} key={data.id}>
                            <Text style={styles.label}>{data.label}</Text>
                            <TextInput
                                defaultValue={data.number}
                                onChangeText={(_data) => data!.number=_data}
                                style={styles.textBox}
                                placeholder={data.label}
                            />
                        </View>
                    )}
                </View>
                <View style={{ marginTop: 30, alignSelf: 'stretch', flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignSelf: 'stretch', paddingRight: 10 }} ><Button title="Cancel" onPress={() => alert("cancel")} /></View>
                    <View style={{ flex: 1, alignSelf: 'stretch', paddingRight: 10 }} ><Button title="Save" onPress={saveContact} /></View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
    },
    label: {
        fontWeight: '700',
        marginBottom: 5
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
    textBox: {
        fontSize: 15,
        height: 50,
        marginRight: 15,
        borderRadius: 10,
        borderColor: "rgba(0,0,0,0.3)",
        borderWidth: 1,
        padding: 10,
        backgroundColor: "rgba(0,0,0,0.1)",
    },
    textBoxWrapper: {
        marginBottom: 10
    }
});