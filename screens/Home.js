import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fonts, colors, images } from '../constants/index.js'
import { CategoryHome } from '../components/index.js'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext.js'
import Spinner from 'react-native-loading-spinner-overlay';

const { width } = Dimensions.get('screen');
const axios = require('axios').default;

function Home({ navigation }) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { token } = useContext(AuthContext)
    const { isAdmin } = useContext(AuthContext)

    const getDataFood = () => {
        setIsLoading(true)
        axios.get('http://10.0.2.2:8000/api/food/') //lấy ra tất cả đồ ăn
            .then(function (response) {
                // handle success
                setData(response.data)
                setIsLoading(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setIsLoading(false)
            })
    }

    const getPopularFood = () => {
        axios.get('http://10.0.2.2:8000/api/food/popular/')
            .then(function (response) {
                // handle success
                setData(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    const getUserInfo = () => {
        axios.get('http://10.0.2.2:8000/api/user/', {
            headers: {
                Authorization: "Bearer " + token.access,
            }
        })
            .then(function (response) {
                if (!response.data.first_name || !response.data.last_name || !response.data.address || !response.data.email) {
                    alert("Vui lòng cập nhật thêm thông tin của bạn!")
                    navigation.navigate('Profile')
                }
            })
    }

    useEffect(() => {
        getUserInfo()
        getPopularFood()
        getDataFood()
    }, [])


    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} >
            <View style={styles.container}>
                {isLoading ? <Spinner visible={isLoading} /> :
                    <>
                        <View style={styles.top}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
                                <Text style={{ fontSize: fonts.h2, fontWeight: '400', color: 'black' }}>Trang Chủ</Text>
                                <View style={{ flex: 1 }} />
                                {
                                    isAdmin == false ?
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
                            <Image source={images.banner} style={{ width: '100%', height: 200, borderRadius: 10, marginBottom: 10 }} />
                            <View>
                                <Text style={{ fontSize: fonts.h3, top: 10 }}> Sản phẩm nổi bật</Text>
                                <View style={{ alignSelf: 'center', width: '100%', paddingTop: 30, justifyContent: 'space-between', flexDirection: 'row', }}>
                                    <ScrollView horizontal showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                                        {
                                            data.map((item, index) => item.popular == true ? <CategoryHome key={index} image={item.image} name={item.name} price={item.price} onPress={() => navigation.navigate('Details', { itemId: item.id, })} /> : null)
                                        }
                                    </ScrollView>
                                </View>
                                <Text style={{ fontSize: fonts.h3, top: 10 }}> Thức ăn nhanh</Text>
                                <View style={{ alignSelf: 'center', width: '100%', paddingTop: 30, justifyContent: 'space-between', flexDirection: 'row', }}>
                                    <ScrollView horizontal showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                                        {
                                            data.map((item, index) => item.category == 1 ? <CategoryHome key={index} image={item.image} name={item.name} price={item.price} onPress={() => navigation.navigate('Details', { itemId: item.id, })} /> : null)
                                        }
                                    </ScrollView>
                                </View>
                                <Text style={{ fontSize: fonts.h3, top: 10 }}>Cơm và bún </Text>
                                <View style={{ alignSelf: 'center', width: '100%', paddingTop: 30, justifyContent: 'space-between', flexDirection: 'row', }}>
                                    <ScrollView horizontal showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                                        {
                                            data.map((item, index) => item.category == 3 ? <CategoryHome key={index} image={item.image} name={item.name} price={item.price} onPress={() => navigation.navigate('Details', { itemId: item.id, })} /> : null)
                                        }
                                    </ScrollView>
                                </View>
                                <Text style={{ fontSize: fonts.h3, top: 10 }}> Nước ngọt</Text>
                                <View style={{ alignSelf: 'center', width: '100%', paddingTop: 30, justifyContent: 'space-between', flexDirection: 'row', }}>
                                    <ScrollView horizontal showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                                        {
                                            data.map((item, index) => item.category == 4 ? <CategoryHome key={index} image={item.image} name={item.name} price={item.price} onPress={() => navigation.navigate('Details', { itemId: item.id, })} /> : null)
                                        }
                                    </ScrollView>
                                </View>
                                <Text style={{ fontSize: fonts.h3, top: 10 }}> Tráng miệng</Text>
                                <View style={{ alignSelf: 'center', width: '100%', paddingTop: 30, justifyContent: 'space-between', flexDirection: 'row', }}>
                                    <ScrollView horizontal showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                                        {
                                            data.map((item, index) => item.category == 2 ? <CategoryHome key={index} image={item.image} name={item.name} price={item.price} onPress={() => navigation.navigate('Details', { itemId: item.id, })} /> : null)
                                        }
                                    </ScrollView>
                                </View>

                            </View>
                        </View>
                    </>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mid: {
        flex: 70,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 50
    },
    top: {
        flex: 30,
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
    },
})

export default Home

