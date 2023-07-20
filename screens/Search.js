import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, ScrollView} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fonts, colors} from '../constants/index.js'
import {SearchProduct, SuggestedProduct } from '../components/index.js'
import { useState, useEffect, useContext  } from 'react'
import { AuthContext } from "../context/AuthContext.js";
import { useIsFocused } from '@react-navigation/native'
const axios = require('axios').default;
const { width } = Dimensions.get('screen');
let ScreenHeight = Dimensions.get("window").height;

function Search({ navigation }) {
    const [dataSearch, setDataSearch] = useState([])
    const [data, setData] = useState([])
    const {token} = useContext(AuthContext)
    const isFocused = useIsFocused()

    dataSearch.sort(function(){
        return 0.5 - Math.random()
    })  
    dataSearch.length = 6

    const Search = (name_food) => {
        axios.get('http://10.0.2.2:8000/api/food/?search='+name_food)
        .then(function (response) {
            // handle success
            setData(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        
    }

    const getSearchProduct = async () => {
        try{
            const response = await axios.get('http://10.0.2.2:8000/api/food/')
            await setDataSearch(response.data)
        }catch(ex){
            console.log(ex)
        }
    }

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

    useEffect(() => {
        getSearchProduct()
    }, [isFocused])


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.top}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
                        <Text style={{ fontSize: fonts.h2, fontWeight: '400', color: 'black' }}>Tìm Kiếm</Text>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity onPress={() => navigation.navigate('Order')}>
                            <Ionicons name="receipt-outline" size={22} style={{ paddingEnd: 5, }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                            <Ionicons name="cart-outline" size={22} style={{ paddingStart: 5, }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ backgroundColor: 'white', justifyContent: 'flex-start', flexDirection: 'row', paddingStart: 20, borderRadius: 30, borderWidth: 1, borderColor: colors.inactive, marginBottom: 10 }}>
                            <Ionicons name='search-outline' size={18} style={{ alignSelf: 'center', }} />
                            <TextInput onChangeText={(name_food) => Search(name_food)} style={{ borderRadius: 30, paddingStart: 5, fontSize: fonts.h4, fontWeight: '400', width: '100%', height: 50, }} placeholder='Tìm kiếm' />
                        </View>
                    </View>
                </View>
                <View style={styles.mid}>
                    <View style={{ alignSelf: 'center', width: '100%', top: 0, justifyContent: 'space-between', flexDirection: 'column' }}>
                        {
                            data.map((item, index) => {
                                return <TouchableOpacity key={index} onPress={()=>navigation.navigate('Details', {itemId: item.id,})}><SearchProduct key ={index} name={item.name} image={item.image} price={item.price} onPress={() => addProductToCart(item.id)}/></TouchableOpacity>
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
        backgroundColor: 'white',
    },
    top: {
        flex: 30,
        backgroundColor: colors.primary,
        paddingHorizontal: 20
    },
    mid: {
        flex: 70,
        paddingHorizontal: 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingVertical: 10
    },
})

export default Search