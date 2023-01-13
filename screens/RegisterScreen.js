import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppStateContext } from '../context/AppContext'
import { database } from '../firebase'
import { Dropdown } from 'react-native-element-dropdown';

const RegisterScreen = ({ navigation }) => {

    const { userId, setUserId } = useContext(AppStateContext);

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [section, setSection] = useState('')

    const data = [
        { label: 'Hasta Transfer Personeli', value: 'Hasta Transfer Personeli' },
        { label: 'Radyoloji Teknisyeni', value: 'Radyoloji Teknisyeni' },
        { label: 'Hemşire', value: 'Hemşire' },
        { label: 'Acil Hekimi', value: 'Acil Hekimi' },
        { label: 'Nörolog', value: 'Nörolog' },
        { label: 'Diğer', value: 'Diğer' },
    ];

    const handleSignUp = (name, surname, phone, section) => {
        if (
            name != '' &&
            surname != '' &&
            phone != '' &&
            section.length != ''
        ) {
            database
                .ref(`users/${userId}`)
                .set({
                    name: name,
                    surname: surname,
                    phone: phone,
                    section: section
                })
                .then(() => {
                    Alert.alert('Kayıt Başarılı','Yeni kullanıcı kaydı oluşturuldu.')
                    navigation.push('Home')
                })
                .catch(error => console.log(error))
        } else {
            alert("Boş Bırakılamaz!")
        }
    }

    const handleBarCodeScanned = () => {
        navigation.push("Camera", {
            type: 'USER_REGISTER',
            text : 'Kimlik barkodunuzu okutunuz.'
        })
    }

    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <View style={styles.title}>
                <Text style={styles.titleText}>Yeni Kullanıcı Kayıt</Text>
            </View>
            <View style={styles.inputContainer}>
                <TouchableOpacity
                    onPress={handleBarCodeScanned}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Kimlik Barkod Oku</Text>
                </TouchableOpacity>
                <TextInput
                    placeholder='Barkod No'
                    value={userId}
                    editable={false}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Adınız'
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}

                />
                <TextInput
                    placeholder='Soyadınız'
                    value={surname}
                    onChangeText={text => setSurname(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Telefon No: 5XXXXXXXXX'
                    value={phone}
                    onChangeText={text => setPhone(text)}
                    style={styles.input}
                />
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Bölümünüz"
                    value={section}
                    onChange={item => {
                        setSection(item.value);
                    }}
                    renderItem={renderItem}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => handleSignUp(name, surname, phone, section)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Kayıt Ol</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9C4B4'
    },
    title: {
        marginBottom: 100
    },
    titleText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 32,
        textAlign: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },

    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#5F697A',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    dropdown: {
        marginTop: 5,
        height: 50,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 14,
        color: 'gray'
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});