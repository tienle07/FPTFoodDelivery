import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fonts, colors } from '../constants/index.js'
import { AuthContext } from "../context/AuthContext.js";
import { useIsFocused } from '@react-navigation/native'
import { PayProduct } from "../components/index.js";
import Spinner from 'react-native-loading-spinner-overlay';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import getDirections from 'react-native-google-maps-directions'

const { width } = Dimensions.get('screen');
const axios = require('axios').default;

function DeliveryDetail({ navigation, route }) {
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [location, setLocation] = useState(null);
    const [userLocation, setUserLocation] = useState({})
    const [errorMsg, setErrorMsg] = useState(null);
    const isFocused = useIsFocused()
    const { token } = useContext(AuthContext)
    const { itemId } = route.params

    console.log(itemId)
    const orderProduct = async () => {
        for (var i = 0; i < data.length; i++) {
            axios.post('http://10.0.2.2:8000/api/order/',
                {
                    product: data[i].product,
                    number: data[i].number,
                    user: 1
                },
                {
                    headers: {
                        Authorization: "Bearer " + token.access,
                    }
                })
        }
        await navigation.navigate('Order')
    }

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        await setLocation(location);

    }

    const getDataDelivery = () => {
        setIsLoading(true)
        axios.get('http://10.0.2.2:8000/api/order/?user=' + itemId, {
            headers: {
                Authorization: "Bearer " + token.access,
            }
        })
            .then(function (response) {
                // handle success
                console.log()

                setData(response.data)
                var total = 0
                response.data.map((item, index) => {
                    total += parseInt(item.price * item.number)
                })
                setTotal(total)

                axios.get("http://api.positionstack.com/v1/forward?access_key=10f8b14400faccd03545a2584ba13249&query=" + response.data[0].addressOrder)
                    .then((res) => {
                        setUserLocation({
                            latitude: res.data.data[0].latitude,
                            longitude: res.data.data[0].longitude
                        })
                        setIsLoading(false)
                    })
                    .catch((err) => {
                        alert("Địa chỉ không hợp lệ, vui lòng liên hệ trực tiếp với khách hàng!")
                    })

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setIsLoading(false)
            })

    }



    useEffect(() => {
        getLocation()
        getDataDelivery()
    }, [isFocused])

    handleGetDirections = () => {
        const dataDelivery = {
            source: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            },
            destination: {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"        // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate"       // this instantly initializes navigation using the given travel mode
                }
            ],
        }
        getDirections(dataDelivery)
    }

    return (
        <View style={styles.container}>
            {isLoading ? <Spinner visible={isLoading} /> :
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View style={styles.top}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
                            <TouchableOpacity style={{ paddingRight: 20 }} onPress={() => navigation.goBack()}>
                                <Ionicons name="arrow-back-outline" size={25} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: fonts.h2, fontWeight: '400', color: 'black' }}>Đơn Giao Hàng</Text>
                            <View style={{ flex: 1 }} />
                        </View>
                    </View>
                    {
                        data.length == 0 || data == undefined ?
                            <>
                                <View style={{ justifyContent: 'center' }}>
                                    <Ionicons name="list-outline" size={150} color={'#f1f1f1'} style={{ alignSelf: 'center' }} />
                                    <View style={{ paddingVertical: 15 }} />
                                    <Text style={{ alignSelf: 'center', color: 'gray' }}>Đơn hàng đã được giao!</Text>
                                </View>
                            </>
                            :
                            <>
                                <View style={styles.mid}>
                                    <View style={styles.listProduct}>
                                        {data.map((item, index) => <PayProduct key={index} number={item.number} name={item.name} image={item.image} price={item.price} />)}
                                    </View>
                                    <View style={{ marginTop: 15, marginHorizontal: 15, borderBottomColor: colors.inactive, borderBottomWidth: 1, paddingBottom: 15 }}>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 13, color: 'gray' }}>Tạm tính: </Text>
                                            <Text style={{ fontSize: 13, color: 'gray' }}>{total}.000đ</Text>
                                        </View>
                                        <View style={{ paddingVertical: 5 }} />
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 13, color: 'gray' }}>Phí giao hàng: </Text>
                                            <Text style={{ fontSize: 13, color: 'gray' }}>Miễn phí</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 15, marginHorizontal: 15, paddingBottom: 15 }}>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 13, color: 'black' }}>Tổng tiền: </Text>
                                            <Text style={{ fontSize: 13, color: 'black' }}>{total}.000đ</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => handleGetDirections()} style={{ backgroundColor: colors.primary, justifyContent: 'center', paddingVertical: 10, marginHorizontal: 10, borderRadius: 5 }}>
                                        <Text style={{ alignSelf: 'center', color: 'white' }}>Xem Map</Text>
                                    </TouchableOpacity>
                                    <View style={{ marginVertical: 5 }} />
                                    <TouchableOpacity >
                                        <Text style={{ alignSelf: 'center', color: 'white' }}>Xác Nhận Đã Giao Hàng</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                    }
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

export default DeliveryDetail