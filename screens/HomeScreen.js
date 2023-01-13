import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { database } from '../firebase'
import { AppStateContext } from '../context/AppContext'
import { Dropdown } from 'react-native-element-dropdown';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HomeScreen = ({ navigation }) => {

  const [activeWork, setActiveWork] = useState('')
  const [user, setUser] = useState({})
  const [clockState, setClockState] = useState('')
  const [dateState, setDateState] = useState('')
  const [disabled, setDisabled] = useState(true)

  const { patientId, userId, setPatientId } = useContext(AppStateContext)

  const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Kasim', 'Aralik']

  useEffect(() => {
    database
      .ref(`users/${userId}`)
      .on('value', (snapshot) => {
        const data = snapshot.val()
        const user = {
          name: data.name,
          surname: data.surname,
          phone: data.phone,
          section: data.section
        }
        setUser(user)
      })

    setInterval(() => {
      const date = new Date()
      setClockState(date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes())
      setDateState(date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear())
    }, 1000)
  }, [])

  useEffect(() => {
    setDisabled(!(activeWork.length > 0 && patientId.length > 0))
  }, [activeWork, patientId])

  const userImageVerify = (user) => {
    let pic;
    switch (user.section) {
      case 'Acil Hekimi':
        return pic = require('../assets/stethoscope(2).png')
      case 'Hemşire':
        return pic = require('../assets/nurse.png')
      case 'Hasta Transfer Personeli':
        return pic = require('../assets/stretcher.png')
      case 'Radyoloji Teknisyeni':
        return pic = require('../assets/ct-scan.png')
      case 'Nörolog':
        return pic = require('../assets/stethoscope(1).png')
      case 'Diğer':
        return pic = require('../assets/stethoscope(1).png')
      default:
        return pic = require('../assets/stethoscope(1).png')

    }
  }

  const userSectionVerify = (user) => {

    let data;
    switch (user.section) {
      case 'Acil Hekimi':
        data = [
          { label: '3- Kan Alma', value: 'Kan Alma' },
          { label: '2- Acil Hekimi Muayene', value: 'Acil Hekimi Muayene' },
          { label: '1- Acile Kabul', value: 'Acile Kabul' },]
        return data
      case 'Hemşire':
        return data = [
          { label: '3- Kan Alma', value: 'Kan Alma' },
          { label: '2- Acil Hekimi Muayene', value: 'Acil Hekimi Muayene' },
          { label: '1- Acile Kabul', value: 'Acile Kabul' },]
      case 'Hasta Transfer Personeli':
        return data = [
          { label: '4- Acil - Görüntüleme Transfer', value: 'Acil - Görüntüleme Transfer' }]
      case 'Radyoloji Teknisyeni':
        return data = [
          { label: '5- BT Kabul', value: 'BT Kabul' }]
      case 'Nörolog':
        return data = [
          { label: '8- İnme Merkezine Yatış', value: 'İnme Merkezine Yatış' },
          { label: '7- Anjiyografi Kabul', value: 'Anjiyografi Kabul' },
          { label: '6- Trombolitik Tedavisi', value: 'Trombolitik Tedavisi' },
          { label: '5- BT Kabul', value: 'BT Kabul' },
          { label: '4- Acil - Görüntüleme Transfer', value: 'Acil - Görüntüleme Transfer' },
          { label: '2- Acil Hekimi Muayene', value: 'Acil Hekimi Muayene' },]
      case 'Diğer':
        return data = [
          { label: '8- İnme Merkezine Yatış', value: 'İnme Merkezine Yatış' },
          { label: '7- Anjiyografi Kabul', value: 'Anjiyografi Kabul' },
          { label: '6- Trombolitik Tedavisi', value: 'Trombolitik Tedavisi' },
          { label: '5- BT Kabul', value: 'BT Kabul' },
          { label: '4- Acil - Görüntüleme Transfer', value: 'Acil - Görüntüleme Transfer' },
          { label: '3- Kan Alma', value: 'Kan Alma' },
          { label: '2- Acil Hekimi Muayene', value: 'Acil Hekimi Muayene' },
          { label: '1- Acile Kabul', value: 'Acile Kabul' },]
      default:
        return data = [
          { label: '8- İnme Merkezine Yatış', value: 'İnme Merkezine Yatış' },
          { label: '7- Anjiyografi Kabul', value: 'Anjiyografi Kabul' },
          { label: '6- Trombolitik Tedavisi', value: 'Trombolitik Tedavisi' },
          { label: '5- BT Kabul', value: 'BT Kabul' },
          { label: '4- Acil - Görüntüleme Transfer', value: 'Acil - Görüntüleme Transfer' },
          { label: '3- Kan Alma', value: 'Kan Alma' },
          { label: '2- Acil Hekimi Muayene', value: 'Acil Hekimi Muayene' },
          { label: '1- Acile Kabul', value: 'Acile Kabul' },]

    }
  }


  const patientBarcodeScan = () => {
    return (
      navigation.push('Camera', {
        type: 'PATIENT_SAVE',
        text: 'Hasta barkodunu okutunuz.'
      })
    )
  }

  const savePatientToDatabase = (activeWork) => {
    const date = new Date()
    Alert.alert(
      "Kayıt Onayla",
      ` Aşağıdaki işlem kaydedilecek: \n
      İstasyon: \t\t${activeWork}\n
      Hasta No: \t${patientId}
      `,
      [
        {
          text: 'Onayla',
          onPress: () => {
            database
              .ref(`patients/${patientId}`)
              .child(`/${userId}`)
              .child(`${activeWork}`)
              .set({
                date: date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear(),
                time: date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ':' + date.getSeconds()
              })
              .then(() => {
                Alert.alert(
                  "Kayıt Başarılı",
                  `${user.name + ' ' + user.surname + '\n' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear() + ',\t\t' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}\n
İstasyon : \t${activeWork}\n
Hasta No: \t${patientId}
      `,
                )
                setPatientId('')
              })
              .catch(error => console.log(error))
          }
        },
        {
          text: 'İptal',
          style: 'cancel'
        }
      ]
    )
  }

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.title}>
        <Text style={styles.titleText}>{dateState + '\t\t\t\t\t\t\t\t\t\t\t\t\t' + clockState}</Text>

      </View>
      <View style={styles.info}>
        <Image
          style={styles.img}
          source={user ? userImageVerify(user) : require('../assets/brain.png')} />
        <Text style={styles.infoText}>{user ? user.name + ' ' + user.surname : "Yükleniyor..."}</Text>
        <Text style={styles.infoTextSection}>{user.section}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.label}>
          <Text style={styles.labelText}>Hasta No:</Text>
        </View>
        <TextInput
          placeholder='Hasta Barkod No'
          value={patientId}
          editable={false}
          style={styles.input}

        />
        <TouchableOpacity
          onPress={patientBarcodeScan}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Hasta Barkod Oku</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.inputContainer}>
        <View style={styles.labelText}>
          <Text style={[styles.labelText, { marginBottom: 5 }]}>İstasyon:</Text>
        </View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={user ? userSectionVerify(user) : []}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="İstasyon seçiniz..."
          value={activeWork}
          onChange={item => {
            setActiveWork(item.value);
          }}
          renderItem={renderItem}
        />

      </View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => savePatientToDatabase(activeWork)}
          style={disabled ? [styles.button, { opacity: 0.3, backgroundColor: 'green', marginTop: hp('2%') }] : [styles.button, { backgroundColor: 'green', marginTop: hp('2%') }]}
        >
          <Text style={[styles.buttonText, { color: 'white' }]}>Kaydet</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F9C4B4',
  },
  title: {
    marginTop: hp('2%'),
  },
  titleText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 22,
    textAlign: 'center',
  },
  label: {

  },
  labelText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
  },
  inputContainer: {
    width: wp('80%'),
    marginTop: hp('2%')
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: hp('1%'),
    marginTop: hp('0.5%')
  },
  img: {
    width: wp('25%'),
    height: hp('15%'),
  },
  info: {
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    borderWidth: 3,
    borderColor: '#5F697A',
    padding: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('80%'),
    borderRadius: 15,
  },
  infoText: {
    color: '#3F495A',
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center'
  },
  infoTextSection: {
    color: 'black',
    fontWeight: '700',
    fontSize: 22,
    textAlign: 'center'
  },

  buttonContainer: {
    width: wp('80%'),
    marginTop: hp('1%'),
  },
  button: {
    backgroundColor: '#5F697A',
    width: '100%',
    padding: '4%',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 32,
    textAlign: 'center',
  },
  dropdown: {
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
    fontSize: 16,
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