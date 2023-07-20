import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fonts, colors} from '../constants/index.js'
import { AuthContext } from "../context/AuthContext.js";
import { useIsFocused } from '@react-navigation/native'
import {OrderProduct} from "../components/index.js";
import Spinner from 'react-native-loading-spinner-overlay';
const { width } = Dimensions.get('screen');
const axios = require('axios').default;

function Order({navigation}) {
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [isReceived, setIsReceived] = useState(false)
    const [isDelivery, setIsDelivery] = useState(true)
    const [isCancel, setIsCancel] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const isFocused = useIsFocused()
    const {token} = useContext(AuthContext)

    const cancelOrder = async (itemId) => {
        const res = await axios.put('http://10.0.2.2:8000/api/order/', {idOrder: itemId, user: 1}, {headers: {
            Authorization: "Bearer " + token.access,
        }})
        await getProductOrder(false)
    }

    const getProductOrder = (allowLoad) =>{
        setIsLoading(allowLoad)
        axios.get('http://10.0.2.2:8000/api/order/',{
            headers: {
                Authorization: "Bearer " + token.access,
            }
        })
        .then(function (response) {
            setIsLoading(false)
            // handle success
            setData(response.data)
            var total = 0
            response.data.map((item, index) => {
                total += parseInt(item.price * item.number)
            })

            var isReceivedCheck = false
            response.data.map((item, index) => {
                item.isReceived == true ? isReceivedCheck = true : null
            })

            var isDeliveryCheck = false
            response.data.map((item, index) => {
                item.isReceived == false && item.isCancel == false ? isDeliveryCheck = true : null
            })

            var isCancelCheck = false
            response.data.map((item, index) => {
                item.isCancel == true ? isCancelCheck = true : null
            })

            setIsDelivery(isDeliveryCheck)
            setIsReceived(isReceivedCheck)
            setIsCancel(isCancelCheck)
            setTotal(total)
        })
        .catch(function (error) {
            // handle error
            setIsLoading(false)
            console.log(error);
        })
    }
    useEffect(()=>{
        getProductOrder(true)
    }, [isFocused])

    return (
        <View style={styles.container}>
            { isLoading ? <Spinner visible={isLoading} /> :
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.top}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
                    <TouchableOpacity style={{ paddingRight: 20 }} onPress={() => navigation.navigate('Home')}>
                            <Ionicons name="arrow-back-outline" size={25} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: fonts.h2, fontWeight: '400', color: 'black' }}>Đơn Hàng</Text>
                        <View style={{ flex: 1 }} />
                    </View>
                </View>
                <View style={styles.mid}>
                    {
                        data.length == 0 || data == undefined ? 
                            <View style={{justifyContent: 'center', marginTop: 50}}>
                                <Ionicons name="receipt-outline" size={100} color={'#f1f1f1'} style={{alignSelf: 'center'}}/>
                                <View  style={{paddingVertical: 15}} />
                                <Text style={{alignSelf: 'center', color: 'gray' }}>Bạn chưa có đơn hàng nào!</Text>
                            </View>
                        :
                        <>
                            {
                                isDelivery == true ?
                                    <>
                                        <View>
                                            <Text style={{marginHorizontal: 10, fontSize: 16, marginBottom: 10}}>Đang giao hàng</Text>
                                            <View style={styles.listProduct}>
                                                {
                                                    data.map((item, index)=>{
                                                        return item.isReceived == false && item.isCancel == false ? <OrderProduct onPress={() => cancelOrder(item.id)} key={index} isReceived={item.isReceived} isCancel={item.isCancel} number={item.number} name={item.name} image={item.image} price={item.price} /> : null
                                                    })
                                                }
                                            </View>
                                        </View>
                                    </>
                                : null
                            }
                            
                            {
                                isReceived == true || isCancel == true?
                                    <> 
                                        <View style={{marginVertical: isDelivery == true ? 10 : 0}} />
                                        <View>
                                            <Text style={{marginHorizontal: 10, paddingBottom: 10, fontSize: 16, borderBottomWidth: 1, borderColor: colors.inactive, marginBottom: 10}}>Lịch sử đơn hàng</Text>
                                            <View style={styles.listProduct}>
                                                {
                                                    data.map((item, index)=>{
                                                        return item.isReceived == true || item.isCancel == true ? <OrderProduct key={index} isReceived={item.isReceived} isCancel={item.isCancel} number={item.number} name={item.name} image={item.image} price={item.price} /> : null
                                                    })
                                                }
                                            </View>
                                        </View>
                                    </>
                                :
                                null
                            }
                        </>
                    }
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

export default Order