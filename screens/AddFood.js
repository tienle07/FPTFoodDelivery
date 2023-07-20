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

const axios = require('axios').default;
const { width } = Dimensions.get('screen');
let ScreenHeight = Dimensions.get("window").height;

function AddFood({ navigation }) {
    const [data, setData] = useState([])
    const { token } = useContext(AuthContext)
    const isFocused = useIsFocused()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(null)
    const [priceSale, setPriceSale] = useState(null)
    const [cate, setCate] = useState(1)

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

    const add = () => {
        var formData = new FormData();
        formData.append("image", { uri: image.uri, name: makeid(10) + '.jpg', type: 'image/jpg' });
        formData.append("image1", { uri: image1.uri, name: makeid(11) + '.jpg', type: 'image/jpg' });
        formData.append("image2", { uri: image2.uri, name: makeid(12) + '.jpg', type: 'image/jpg' });
        formData.append("image3", { uri: image3.uri, name: makeid(13) + '.jpg', type: 'image/jpg' });
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("price_sale", priceSale);
        formData.append("category", cate);



        console.log(formData)

        fetch('http://10.0.2.2:8000/api/food/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
            .then((responseJson) => {
                alert("Thành công!")
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {

    }, [isFocused])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result);
        }
    };

    const pickImage1 = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage1(result);
        }
    };

    const pickImage2 = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage2(result);
        }
    };

    const pickImage3 = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {
            setImage3(result);
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.top}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
                        <Text style={{ fontSize: fonts.h2, fontWeight: '400', color: 'black' }}>Thêm Sản Phẩm</Text>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity onPress={() => navigation.navigate('Order')}>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('AddFood')} onPress={() => add()}>
                            <Text style={{ marginTop: 3 }}>THÊM</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.mid}>
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={setName}
                            placeholder="Tên sản phẩm"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mô tả sản phẩm"
                            onChangeText={text => setDescription(text)}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setPriceSale}
                            placeholder="Giá gốc"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setPrice}
                            placeholder="Giá bán"
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
                            defaultValueByIndex={0}
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
                        <View style={{ marginBottom: 10 }} />
                        {image && <Image source={{ uri: image.uri }} style={{ width: 100, height: 100, marginBottom: 15, alignSelf: 'center' }} />}
                        <Button title="Ảnh chính" onPress={pickImage} />

                        <View style={{ marginBottom: 10 }} />
                        {image1 && <Image source={{ uri: image1.uri }} style={{ width: 100, height: 100, marginBottom: 15, alignSelf: 'center' }} />}
                        <Button title="Ảnh phụ 1" onPress={pickImage1} />

                        <View style={{ marginBottom: 10 }} />
                        {image2 && <Image source={{ uri: image2.uri }} style={{ width: 100, height: 100, marginBottom: 15, alignSelf: 'center' }} />}
                        <Button title="Ảnh phụ 2" onPress={pickImage2} />

                        <View style={{ marginBottom: 10 }} />
                        {image3 && <Image source={{ uri: image3.uri }} style={{ width: 100, height: 100, marginBottom: 15, alignSelf: 'center' }} />}
                        <Button title="Ảnh phụ 3" onPress={pickImage3} />
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
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
})

export default AddFood