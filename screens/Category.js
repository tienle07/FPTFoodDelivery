import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fonts, colors} from '../constants/index.js'
import {CategoryProduct} from '../components/index.js'
import { AuthContext } from "../context/AuthContext.js";
const { width } = Dimensions.get('screen');
const axios = require('axios').default;

function Category({ navigation }) {
    const [data, setData] = useState([])
    const {isAdmin} = useContext(AuthContext)

    console.log(isAdmin)
    useEffect(()=>{
        axios.get('http://10.0.2.2:8000/api/food/category/')
        .then(function (response) {
            // handle success
            setData(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }, [])
    return (

        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.top}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
                        <Text style={{ fontSize: fonts.h2, fontWeight: '400', color: 'black' }}>Danh Mục</Text>
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
                            data.map((item, index) => {
                                return <CategoryProduct key={index} image={item.image} name={item.name} onPress={() => navigation.navigate('Product', {itemId: item.id, titleCate: item.name})} />
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
    }
})

export default Category

