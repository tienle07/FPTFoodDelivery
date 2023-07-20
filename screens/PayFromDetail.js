import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fonts, colors} from '../constants/index.js'
import { AuthContext } from "../context/AuthContext.js";
import { useIsFocused } from '@react-navigation/native'
import {PayProduct} from "../components/index.js";
const { width } = Dimensions.get('screen');
const axios = require('axios').default;

function PayFromDetail({navigation, route }) {
    const [data, setData] = useState({})
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const isFocused = useIsFocused()
    const {token} = useContext(AuthContext)
    const {itemId} = route.params
    
    const orderProduct = (itemId) => {
        axios.post('http://10.0.2.2:8000/api/order/', 
            {
                product: itemId,
                user: 1,
                number: 1
            },
            {
                headers: {
                    Authorization: "Bearer " + token.access
                }
            }
        )
        .then(function (response) {
            navigation.navigate('Order')
        })
        .catch(function (error) {
            // handle error
            alert('Đặt hàng thất bại!')
        })
    }
    useEffect(()=>{
        
        //Sau khi có response lần đầu thì mới thực hiện tiếp việc call api
        axios.get('http://10.0.2.2:8000/api/food/'+itemId+'/')
        .then(function (response) {
            // handle success
            setData(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }, [isLoading,isFocused])

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.top}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
                    <TouchableOpacity style={{ paddingRight: 20 }} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-outline" size={25} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: fonts.h2, fontWeight: '400', color: 'black' }}>Thanh Toán</Text>
                        <View style={{ flex: 1 }} />
                    </View>
                </View>
                <View style={styles.mid}>
                    <View style={styles.listProduct}>
                        {
                            <PayProduct number={1} name={data.name} image={data.image} price={data.price} />
                        }
                    </View>
                    <View style={{marginTop: 15, marginHorizontal: 15, borderBottomColor: colors.inactive, borderBottomWidth: 1, paddingBottom: 15}}>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Text style={{fontSize: 13, color: 'gray'}}>Tạm tính: </Text>
                            <Text style={{fontSize: 13, color: 'gray'}}>{data.price * 1}.000đ</Text>
                        </View>
                        <View style={{paddingVertical: 5}} />
                        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Text style={{fontSize: 13, color: 'gray'}}>Phí giao hàng: </Text>
                            <Text style={{fontSize: 13, color: 'gray'}}>Miễn phí</Text>
                        </View>
                    </View>
                    <View style={{marginTop: 15, marginHorizontal: 15, paddingBottom: 15}}>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Text style={{fontSize: 13, color: 'black'}}>Tổng tiền: </Text>
                            <Text style={{fontSize: 13, color: 'black'}}>{data.price * 1}.000đ</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => orderProduct(data.id)} style={{backgroundColor: colors.primary, justifyContent: 'center', paddingVertical: 10, marginHorizontal: 10, borderRadius: 5}}>
                        <Text style={{alignSelf: 'center', color: 'white'}}>Giao Hàng</Text>
                    </TouchableOpacity>
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
        marginTop: 10,
        marginBottom: 10,
    },
    listProduct: {
        borderColor: colors.inactive,
        borderWidth: 1,
        marginHorizontal: 10,
        borderRadius: 0,
        paddingVertical: 5,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 1.1,
    },
})

export default PayFromDetail