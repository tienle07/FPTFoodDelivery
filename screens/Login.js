import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { fonts, colors, images } from '../constants/index.js'
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js'
import Spinner from 'react-native-loading-spinner-overlay';

const axios = require('axios').default;

function Login({ navigation }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { login, error, isLoading } = useContext(AuthContext)
    return (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
                <Spinner visible={isLoading} />
                <View style={styles.container}>
                    <View style={styles.top}>
                        <View style={{marginTop: 10}}>
                            <Image source={images.logo_food} style={{ width: 100, height: 100, alignSelf: 'center' }} resizeMode={'contain'} />
                        </View>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <Text style={{ fontWeight: '600', fontSize: fonts.h1, color: 'white', paddingTop: 10, paddingBottom: 10 }}><Icon name='login' size={17} /> Đăng Nhập</Text>
                        </View>
                    </View>

                    <View style={styles.mid}>
                        <View style={{ paddingTop: 25 }}>
                            <View style={styles.searchSection}>
                                <FontAwesome name='user' size={18} color={'#9c9c9c'} style={{ paddingStart: 15 }} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Tài khoản"
                                    value={username}
                                    onChangeText={setUsername}
                                />
                            </View>
                            <View style={{ paddingTop: 25 }} />
                            <View style={styles.searchSection}>
                                <Icon name='key' size={18} color={'#9c9c9c'} style={{ paddingStart: 15 }} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Mật khẩu"
                                    secureTextEntry={true}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>
                        </View>
                        <View style={{ paddingTop: 25, alignSelf: 'flex-end' }}>
                            <Text style={{ color: '#9c9c9c', fontSize: fonts.h5, fontWeight: '400' }}>Quên mật khẩu ?</Text>
                        </View>
                        <View style={{ paddingTop: 25 }}>
                            <TouchableOpacity onPress={() => login(username, password)} style={{ backgroundColor: colors.primary, height: 50, borderRadius: 35, justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: fonts.h2, fontWeight: 'bold', alignSelf: 'center' }} >ĐĂNG NHẬP</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 25 }} />
                        <View style={{ alignSelf: 'center', paddingBottom: 10 }}>
                            <Text style={{ color: '#9c9c9c', fontSize: fonts.h5, fontWeight: '400' }}>Bạn chưa có tài khoản?
                                <Text style={{ color: colors.primary, fontWeight: 'bold' }} onPress={() => navigation.navigate('Register')}> Đăng ký ngay!</Text>
                            </Text>
                        </View>
                    </View>
                </View>

        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    top: {
        flex: 50,
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 100,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    mid: {
        flex: 50,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 40,
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
        color: '#9c9c9c',
    },
})

export default Login

