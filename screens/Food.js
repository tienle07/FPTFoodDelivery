import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, ScrollView, Alert} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { fonts, colors} from '../constants/index.js'
import {SearchProduct, SuggestedProduct } from '../components/index.js'
import { useState, useEffect, useContext  } from 'react'
import { AuthContext } from "../context/AuthContext.js";
import { useIsFocused } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay';
const axios = require('axios').default;
const { width } = Dimensions.get('screen');
let ScreenHeight = Dimensions.get("window").height;

function Food({ navigation }) {
    const [data, setData] = useState([])
    const {token} = useContext(AuthContext)
    const isFocused = useIsFocused()
    const [isLoading, setIsLoading] = useState(false)

    const deleteFood = (id) => {
        Alert.alert(
            'Thông Báo!',
            'Xóa sản phẩm này?', // <- this part is optional, you can pass an empty string
            [
              {text: 'Xóa', onPress: () => {
                axios.delete('http://10.0.2.2:8000/api/food/', { data: {
                    pk: id
                }} )
                let filterData = data.filter(item => item.id != id)
                setData(filterData)
              }},
            ],
            {cancelable: true},
          );
    }

    const getSearchProduct = async () => {
        setIsLoading(true)
        try{
            const response = await axios.get('http://10.0.2.2:8000/api/food/')
            await setData(response.data)
            setIsLoading(false)
        }catch(ex){
            console.log(ex)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getSearchProduct()
    }, [isFocused])


    return (
        <View style={styles.container}>
            {isLoading ? <Spinner visible={isLoading} /> :
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.top}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
                        <Text style={{ fontSize: fonts.h2, fontWeight: '400', color: 'black' }}>Quản Lý Sản Phẩm</Text>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity onPress={() => navigation.navigate('Order')}>
                            
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('AddFood')}>
                            <AntDesign name="pluscircleo" size={22} style={{ paddingStart: 5, }} onPress={() => navigation.navigate('AddFood')} />
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={styles.mid}>
                    <View>
                        <ScrollView vertical showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            {
                                data.map((item, index) => {
                                    return <TouchableOpacity key={index} onPress={()=>navigation.navigate('Details', {itemId: item.id,})}><SuggestedProduct key={index} image={item.image} name={item.name} price={item.price} onPress={() => deleteFood(item.id) } onPress1={() => navigation.navigate('UpdateFood', {itemId: item.id,})} /></TouchableOpacity>
                                })
                            }
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            }
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

export default Food