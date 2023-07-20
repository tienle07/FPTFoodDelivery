import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fonts, colors} from '../constants/index.js'
import {CategoryDetailsProduct } from '../components/index.js'
import { AuthContext } from "../context/AuthContext.js";
const axios = require('axios').default;
const { width } = Dimensions.get('screen');

function Product({ navigation, route }) {
    const {itemId, titleCate} = route.params
    const [data, setData] = useState([])
    const {token} = useContext(AuthContext)
    const {isAdmin} = useContext(AuthContext)


    useEffect(()=>{
        axios.get('http://10.0.2.2:8000/api/food/category/'+itemId+'/')
        .then(function (response) {
            // handle success
            setData(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }, [])

    const addProductToCart = (id) => {
        axios.post('http://10.0.2.2:8000/api/cart/',
        {
            product: id,
        },
        {
            headers: {
                Authorization: "Bearer " + token.access,
            }
        })
        .then(function (response) {
            alert("Đã thêm sản phẩm vào giỏ hàng!")
         })
         .catch(function (error) {
           console.log(error);
         });
    }
    

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.top}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
                        <TouchableOpacity style={{ paddingRight: 20 }} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-outline" size={25} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: fonts.h2, fontWeight: '400', color: 'black' }}>{titleCate}</Text>
                        <View style={{ flex: 1 }} />
                        {
                            isAdmin == false? 
                                <>
                                    <TouchableOpacity onPress={() => navigation.navigate('Order')}>
                                        <Ionicons name="receipt-outline" size={22} style={{ paddingEnd: 5, }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                                        <Ionicons name="cart-outline" size={22} style={{ paddingStart: 5, }} />
                                    </TouchableOpacity>
                                </>
                            :
                            null
                        }
                        
                    </View>
                </View>
                <View style={styles.mid}>
                    <View style={{ alignSelf: 'center', width: '100%', top: 0, justifyContent: 'space-between', flexDirection: 'column' }}>
                        {
                            data.map((item, index)=>{
                                return <TouchableOpacity key={index} onPress={()=>navigation.navigate('Details', {itemId: item.id,})}><CategoryDetailsProduct key={index} image={item.image} name={item.name} price={item.price} onPress={() => addProductToCart(item.id)} /></TouchableOpacity>
                            })
                        }
                        
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
        marginBottom: 100

    }
})

export default Product

