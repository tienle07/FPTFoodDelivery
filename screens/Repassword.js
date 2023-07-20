import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fonts, colors} from '../constants/index.js'
import { AuthContext } from "../context/AuthContext.js";
import Spinner from 'react-native-loading-spinner-overlay'

const axios = require('axios').default

function Repassword({ navigation }) {
    const [password, setPassword] = React.useState("");
    const [rePassword, setRePassword] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)

    const {token} = useContext(AuthContext)

    const changePassword = (password, rePassword) => {
        if (password == '' || password == undefined || password == null) {
            alert('Vui lòng nhập mật khẩu mới!')
        } else {
            if (rePassword == '' || rePassword == undefined || rePassword == null) {
                alert('Vui lòng nhập lại mật khẩu!')
            } else if (password.length < 8 || password.length > 32) {
                alert('Vui lòng nhập mật khẩu từ 8 đến 32 ký tự!')
            } else if (password !== rePassword) {
                alert('Mật khẩu nhập lại không trùng khớp!')
            } else {
                setIsLoading(true)
                axios.put('http://10.0.2.2:8000/api/user/password/',
                    {
                        password: password,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + token.access,
                        }
                    })
                    .then(function (response) {
                        setIsLoading(false)
                        alert("Bạn đã đổi mật khẩu thành công!")
                    })
                    .catch(function (error) {
                        setIsLoading(false)
                        alert("Đổi mật khẩu thất bại! Vui lòng kiểm tra lại!")
                    });
            }
        }
    }

    return (
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.top}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
                        <TouchableOpacity style={{ paddingRight: 20 }} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-outline" size={25} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: fonts.h2, fontWeight: '400', color: 'black' }}>Đổi mật khẩu</Text>
                        <View style={{ flex: 1 }} />
                    </View>
                </View>
                <View style={styles.mid}>
                    <View style={{ alignSelf: 'center', width: '100%', top: 0, justifyContent: 'space-between', flexDirection: 'column' }}>
                        <SafeAreaView>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.input}
                                onChangeText={setPassword}
                                value={password}
                                placeholder="Nhập mật khẩu mới.."
                            />
                            <TextInput
                                secureTextEntry={true}
                                style={styles.input}
                                onChangeText={setRePassword}
                                value={rePassword}
                                placeholder="Nhập lại mật khẩu..."
                            />
                            <TouchableOpacity onPress={() => changePassword(password, rePassword)} style={{ marginHorizontal: 20, marginTop: 20, borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, paddingVertical: 10, borderColor: colors.primary, backgroundColor: colors.primary }}>
                                <Text style={{ fontSize: fonts.h5, color: 'white', alignSelf: 'center', fontWeight: 'bold' }}>THAY ĐỔI MẬT KHẨU</Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    top: {
        flex: 30,
        backgroundColor: colors.primary,
        paddingHorizontal: 20
    },
    mid: {
        flex: 70,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 30
    },
    input: {
        height: 45,
        margin: 12,
        borderWidth: 1,
        padding: 0,
        borderColor: 'white',
        borderBottomColor: colors.inactive,
        marginHorizontal: 20,
        fontSize: 15
    },
})

export default Repassword