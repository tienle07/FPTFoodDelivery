import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Dimensions, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {colors} from '../constants/index.js'
import { AuthContext } from "../context/AuthContext.js";
import Spinner from 'react-native-loading-spinner-overlay';

const { width } = Dimensions.get('screen');
const axios = require('axios').default;

function Profile({ navigation }) {
    const [data, setData] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    const { token, logout } = useContext(AuthContext)
    const editInfo = (name, phone, email, address) => {

        setIsEdit(!isEdit)
        if (isEdit) {
            const first_name = name.split(" ")[0]
            const last_name = name.split(" ")[1] + " " + name.split(" ")[2]
            axios.put("http://10.0.2.2:8000/api/user/",
                {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone: phone,
                    address: address
                },
                {
                    headers: {
                        Authorization: "Bearer " + token.access,
                    }
                }
            )
                .then((response) => {
                    setIsLoading(true)
                    axios.get("http://10.0.2.2:8000/api/user/",
                        {
                            headers: {
                                Authorization: "Bearer " + token.access,
                            }
                        }
                    )
                        .then((response) => {
                            setIsLoading(false)
                            setData(response.data)
                            setName(response.data.first_name + " " + response.data.last_name)
                            setPhone(response.data.phone)
                            setEmail(response.data.email)
                            setAddress(response.data.address)
                        },
                            (error) => {
                                alert("Ket noi khong thanh cong!")
                            }
                        )
                },
                    (error) => {
                        alert("Vui lòng nhập đủ thông tin!")
                    }
                )
        }
    }
    useEffect(() => {
        setIsLoading(true)
        axios.get("http://10.0.2.2:8000/api/user/",
            {
                headers: {
                    Authorization: "Bearer " + token.access,
                }
            }
        )
            .then((response) => {
                setData(response.data)
                setName(response.data.first_name + " " + response.data.last_name)
                setPhone(response.data.phone)
                setEmail(response.data.email)
                setAddress(response.data.address)
                setIsLoading(false)
            },
                (error) => {
                    alert("Ket noi khong thanh cong!")
                }
            )
    }, [])

    return (

        <View style={styles.container}>
            { isLoading ? <Spinner visible={isLoading} /> :
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} >
                <View style={styles.top}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 20, backgroundColor: colors.primary, paddingVertical: 15 }}>
                        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Thông tin cá nhân</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingTop: '8%', marginHorizontal: 10 }}>
                        <Image source={{ uri: "http://10.0.2.2:8000" + data.avatar }} style={{ width: 80, height: 80, borderRadius: 40 }} />
                        <View>
                            <Text style={{ fontSize: 20, paddingHorizontal: 20, paddingTop: 25 }}>{ !data.first_name && !data.last_name ? 'Khách Hàng #'+data.id : data.first_name + " " + data.last_name}</Text>
                            <Text style={{ fontSize: 14, paddingHorizontal: 20, color: 'grey' }}>{ !data.email ? 'Chưa có email' : data.email}</Text>
                        </View>

                    </View>
                    <View style={{ borderBottomColor: '#F6F7FC', borderBottomWidth: 20, paddingVertical: 20 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: '8%', marginHorizontal: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Order')}>
                            <Ionicons name="receipt-outline" size={30} style={{ paddingHorizontal: 30, color: colors.primary, alignSelf: 'center' }} />
                            <Text style={{ paddingHorizontal: 15, fontSize: 16, paddingTop: 5 }}>Đơn hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                            <Ionicons name="cart-outline" size={30} style={{ paddingHorizontal: 30, color: colors.primary, alignSelf: 'center' }} />
                            <Text style={{ paddingHorizontal: 15, fontSize: 16, paddingTop: 5 }}>Giỏ hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => editInfo(name, phone, email, address)}>
                            <Icon name={isEdit ? "check-bold" : "account-edit"} size={30} style={{ paddingHorizontal: 30, color: colors.primary, alignSelf: 'center' }} />
                            <Text style={{ paddingHorizontal: 30, fontSize: 16, paddingTop: 5 }}>{isEdit ? "Cập Nhật" : "Chỉnh Sửa"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderBottomColor: '#F6F7FC', borderBottomWidth: 20, paddingVertical: 20 }} />
                </View>
                <View style={styles.mid}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, paddingVertical: 10 }}>
                        <View>
                            <Text style={{ paddingHorizontal: 15, fontSize: 16, color: 'grey' }}>Họ tên</Text>
                            <TextInput onChangeText={text => setName(text)} style={{ paddingHorizontal: 15, fontSize: 16, color: 'black' }} editable={isEdit} >{ !data.first_name && !data.last_name ? 'Khách Hàng #'+data.id : data.first_name + " " + data.last_name}</TextInput>
                        </View>
                    </View>
                    <View style={{ borderBottomColor: '#CCCCCC', borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 10 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, paddingVertical: 10 }}>
                        <View>
                            <Text style={{ paddingHorizontal: 15, fontSize: 16, color: 'grey' }}>Số điện thoại</Text>
                            <TextInput onChangeText={text => setPhone(text)} keyboardType='numeric' style={{ paddingHorizontal: 15, fontSize: 16, color: 'black' }} editable={isEdit}>{data.phone}</TextInput>
                        </View>
                    </View>
                    <View style={{ borderBottomColor: '#CCCCCC', borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 10 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, paddingVertical: 10 }}>
                        <View>
                            <Text style={{ paddingHorizontal: 15, fontSize: 16, color: 'grey' }}>Địa chỉ Email</Text>
                            <TextInput onChangeText={text => setEmail(text)} style={{ paddingHorizontal: 15, fontSize: 16, color: 'black' }} editable={isEdit}>{data.email}</TextInput>
                        </View>
                    </View>
                    <View style={{ borderBottomColor: '#CCCCCC', borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 10 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, paddingVertical: 10 }}>
                        <View>
                            <Text style={{ paddingHorizontal: 15, fontSize: 16, color: 'grey' }}>Địa chỉ</Text>
                            <TextInput onChangeText={text => setAddress(text)} style={{ paddingHorizontal: 15, fontSize: 16, color: 'black' }} editable={isEdit}>{data.address}</TextInput>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 10, backgroundColor: '#F6F7FC', height: 60 }}>
                        <Text style={{ paddingHorizontal: 10, color: 'grey' }}>Những thông tin trên chỉ hiển thị cho riêng bạn và không được chia sẻ cho bất cứ ai khác</Text>
                    </View>
                    <View >
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, paddingVertical: 10 }} onPress={() => navigation.navigate('Repassword')}>
                            <Text style={{ paddingHorizontal: 15, fontSize: 16, color: 'grey', paddingVertical: 10 }}>Đổi mật khẩu</Text>
                            <Ionicons name="chevron-forward-outline" size={30} style={{ paddingHorizontal: 10, paddingTop: 5, color: 'grey' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderBottomColor: '#F6F7FC', borderBottomWidth: 10 }} />
                    <TouchableOpacity style={{ backgroundColor: 'white', paddingVertical: 10 }} onPress={() => logout()}>
                        <Text style={{ paddingHorizontal: 15, fontSize: 18, color: 'black', paddingVertical: 10, alignSelf: 'center' }}>Đăng xuất</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})

export default Profile

