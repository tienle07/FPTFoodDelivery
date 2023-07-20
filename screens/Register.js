import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {fonts, colors} from '../constants/index.js'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext.js'


function Register({navigation}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")

    const {register} = useContext(AuthContext)

    return(
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{flex:1}}>
        <View style={styles.container} >
            <View style={styles.header}>
                <View style={{flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%'}}>
                    <TouchableOpacity onPress={()=> navigation.goBack() }>
                        <Icon name='arrow-left'  size={27} />
                    </TouchableOpacity>
                    <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold', alignSelf: 'center'}}>Tạo Tài Khoản</Text>
                <View/>
            </View>
            </View>
            <View style={styles.body}>
                    <View style={{justifyContent: 'center', paddingTop: 50}}>
                        <View style={styles.searchSection}>
                                <FontAwesome name='phone' size={18} color={'black'} style={{paddingStart: 15}}/>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập số điện thoại"
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType = 'number-pad'
                                />
                        </View>
                        <View style={styles.searchSection}>
                                <FontAwesome name='user' size={18} color={'black'} style={{paddingStart: 15}}/>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập tài khoản"
                                    value={username}
                                    onChangeText={setUsername}
                                />
                        </View><View style={styles.searchSection}>
                                <FontAwesome name='key' size={18} color={'black'} style={{paddingStart: 15}}/>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChangeText={setPassword}
                                />
                        </View>
                        <View>
                            <View style={{flexDirection: 'row', justifyContent:'flex-end', paddingVertical: 20}}>
                                <Text style={{alignSelf: 'center', marginEnd: 10, fontSize: fonts.h1, fontWeight: 'bold', color: 'black'}}>Đăng Ký</Text>
                                <TouchableOpacity style={{alignSelf: 'flex-end', backgroundColor: 'black', width: 50, height: 35, borderRadius: 50, justifyContent: 'center'}} onPress={() => register(username, password, phone)}>
                                    <Icon name='arrow-right' style={{textAlign: 'center', alignSelf: 'center' }} size={25} color={'#f2f2f2'}/>
                                </TouchableOpacity>
                            </View>
                        </View>     
                    </View>   
            </View>
        </View>
        </KeyboardAwareScrollView>    
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
        height: '10%',
        backgroundColor: colors.primary,
    },
    body: {
        height: '90%',
        paddingHorizontal: 25,
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 30, 
        marginBottom: 20,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#f2f2f2',
        color: '#424242',
    },
})

export default Register
  
