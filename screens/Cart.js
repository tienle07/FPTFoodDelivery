import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fonts, colors } from '../constants/index.js'
import {CartProduct } from '../components/index.js'
import { AuthContext } from "../context/AuthContext.js";
import { useIsFocused } from '@react-navigation/native'
const { width } = Dimensions.get('screen');
const axios = require('axios').default;

function Cart({navigation}) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const isFocused = useIsFocused()
    const {token} = useContext(AuthContext)

    const getDataFood = async () => {
        try{
            const response = await axios.get('http://10.0.2.2:8000/api/cart/',{headers: {Authorization: "Bearer " + token.access}})
            await setData(response.data)
        }catch(ex){
            console.log(ex)
        }
    }

    useEffect(()=>{
        getDataFood()
    }, [isLoading,isFocused])

    const deleteProductCart = async (itemId) => {
        try{
            const deleteFoodCart = await axios.delete('http://10.0.2.2:8000/api/cart/'+itemId, {headers: {Authorization: "Bearer " + token.access}})
            await setIsLoading(!isLoading)
        }catch (error) {
            await setIsLoading(!isLoading)
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.top}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
                        <Text style={{ fontSize: fonts.h2, fontWeight: '400', color: 'black' }}>Giỏ hàng</Text>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity onPress={() => navigation.navigate('Order')}>
                            <Ionicons name="receipt-outline" size={22} style={{ paddingEnd: 5, }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="cart-outline" size={22} style={{ paddingStart: 5, }} />
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={styles.mid}>
                    <View style={{ alignSelf: 'center', width: '100%', top: 0, justifyContent: 'space-between', flexDirection: 'column' }}>
                        { 
                            data.length  != 0 || data !== undefined ? 
                                data.map((item, index)=>{
                                    return <TouchableOpacity key={index} onPress={() => navigation.navigate('Details', {itemId: item.product,})}><CartProduct  onPress={() => deleteProductCart(item.id)} image={item.image} name={item.name} price={item.price} /></TouchableOpacity>
                                })
                            : null
                        }
                    </View>
                </View>           
                <View style={styles.bottom}>
                    {
                        data.length  == 0 || data === undefined ? 
                            <View style={{justifyContent: 'center'}}>
                                <Icon name="cart-plus" size={100} color={'#f1f1f1'} style={{alignSelf: 'center'}}/>
                                <View  style={{paddingVertical: 15}} />
                                <Text style={{alignSelf: 'center', color: 'gray' }}>Giỏ hàng của bạn hiện đang trống!</Text>
                            </View>
                        :
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => navigation.navigate('Pay')}>
                                <Text style={styles.order}>Thanh toán</Text>
                            </TouchableOpacity>
                    }
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
        flex: 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 30
    },
    bottom: {
        flex: 10,
    },
    order: {
        flex: 1,
        borderWidth: 1,
        color: 'white',
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 10,
        paddingHorizontal: 100,
        paddingVertical: 20,
        marginBottom: 20

    }
})

export default Cart