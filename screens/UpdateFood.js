import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, ScrollView, Button, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { fonts, colors } from '../constants/index.js'
import { SearchProduct, SuggestedProduct } from '../components/index.js'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../context/AuthContext.js";
import { useIsFocused } from '@react-navigation/native'
import SelectDropdown from 'react-native-select-dropdown'
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';

const axios = require('axios').default;
const { width } = Dimensions.get('screen');
let ScreenHeight = Dimensions.get("window").height;

function UpdateFood({ navigation, route }) {
    const { itemId } = route.params
    const [data, setData] = useState([])
    const { token } = useContext(AuthContext)
    const isFocused = useIsFocused()
    const [isLoading, setIsLoading] = useState(false)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(null)
    const [priceSale, setPriceSale] = useState(null)
    const [cate, setCate] = useState(1)
    const [defaultSelect, setdeFaultSelect] = useState(1)

    const category = ["Hoa Hồng", "Trà Sữa Đặc Biệt", "Trà Sữa Thường", "Trân Châu Đường Đen"]

    const [image, setImage] = useState(null)
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)

    const makeid = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    useEffect(() => {
        setIsLoading(true)
        axios.get('http://10.0.2.2:8000/api/food/' + itemId + '/')
            .then(function (response) {
                // handle success
                setData(response.data)
                setName(response.data.name)
                setDescription(response.data.description)
                setPrice(response.data.price)
                setPriceSale(response.data.price_sale)
                setdeFaultSelect(response.data.category == 1 ? 0 : response.data.category - 1)

                setImage({
                    uri: "http://10.0.2.2:8000" + response.data.image
                })

                setImage1({
                    uri: "http://10.0.2.2:8000" + response.data.image1
                })

                setImage2({
                    uri: "http://10.0.2.2:8000" + response.data.image2
                })

                setImage3({
                    uri: "http://10.0.2.2:8000" + response.data.image3
                })
                setIsLoading(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setIsLoading(false)
            })
    }, [isFocused])

    const add = () => {
        setIsLoading(true)
        var formData = new FormData();
        formData.append("pk", itemId);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("price_sale", priceSale);
        formData.append("category", cate);

        fetch('http://10.0.2.2:8000/api/food/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
            .then((responseJson) => {
                setIsLoading(false)
                alert("Thành công!")
            })
            .catch(error => {
                setIsLoading(false)
                console.log(error);
            })
    }

    return (
        <View style={styles.container}>
            {isLoading ? <Spinner visible={isLoading} /> :
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View style={styles.top}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
                            <Text style={{ fontSize: fonts.h2, fontWeight: '400', color: 'black' }}>Thông Tin Đồ Ăn</Text>
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity onPress={() => navigation.navigate('Order')}>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => add()}>
                                <Text style={{ marginTop: 4 }}>SỬA</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={styles.mid}>
                        <View>
                            <TextInput
                                style={styles.input}
                                onChangeText={setName}
                                placeholder="Tên đồ ăn"
                                value={name}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Mô tả đồ ăn"
                                onChangeText={text => setDescription(text)}
                                value={description}
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={setPriceSale}
                                placeholder="Giá gốc"
                                value={priceSale}
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={setPrice}
                                placeholder="Giá bán"
                                value={price}
                            />
                            <SelectDropdown
                                data={category}
                                onSelect={(selectedItem, index) => {
                                    setCate(index + 1)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                                defaultValueByIndex={defaultSelect}
                                buttonStyle={{
                                    height: 40,
                                    margin: 10,
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    padding: 10,
                                    borderRadius: 5,
                                    width: '94%',
                                    backgroundColor: 'white'
                                }}

                                buttonTextStyle={{
                                    fontSize: 13,
                                }}
                            />

                            <View style={styles.col}>
                                {image &&

                                    <View style={styles.item}>
                                        <Image source={{ uri: image.uri }} style={{ width: 120, height: 100, marginBottom: 15, alignSelf: 'center' }} />
                                    </View>

                                }

                                {image1 &&
                                    <View style={styles.item}>
                                        <Image source={{ uri: image1.uri }} style={{ width: 120, height: 100, marginBottom: 15, alignSelf: 'center' }} />
                                    </View>
                                }

                                {image2 &&
                                    <View style={styles.item}>
                                        <Image source={{ uri: image2.uri }} style={{ width: 120, height: 100, marginBottom: 15, alignSelf: 'center' }} />
                                    </View>
                                }

                                {image3 &&
                                    <View style={styles.item}>
                                        <Image source={{ uri: image3.uri }} style={{ width: 120, height: 100, marginBottom: 15, alignSelf: 'center' }} />
                                    </View>
                                }
                            </View>
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
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
    item: {
        width: '50%' // is 50% of container width
    },
    col: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
})

export default UpdateFood