import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, TextInput, Dimensions, FlatList, ScrollView, Keyboard } from 'react-native'
import { colors } from '../constants/index.js'
const { width } = Dimensions.get('screen');

function DeliveryPerson(props) {
    return (
        <View style={styles.product}>
            <View style={{flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ paddingTop: 5, width: '100%' }}>
                    <Text style={{ fontSize: 14,  }}>{props.name}</Text>
                    <Text style={{ fontSize: 10, color: 'gray' }}>Địa Chỉ: {props.addressOrder}</Text>
                    <Text style={{ fontSize: 10, color: 'gray' }}>Đặt Hàng Lúc: {props.timeOrder.split("T")[0] + " " +  props.timeOrder.split("T")[1].split(".")[0]}</Text>
                    <Text style={{ fontSize: 10, color: 'gray' }}>Điện Thoại: {props.phoneOrder}</Text>
                </View>
                <TouchableOpacity onPress={props.onPress} style={{alignSelf: 'flex-end', borderWidth: 1, borderRadius: 20, borderColor: colors.primary, paddingHorizontal: 20, paddingVertical: 1, backgroundColor: colors.primary}}>
                    <Text style={{ color: 'black', fontSize: 12 }}>Xem Đơn</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardImages: {
        height: 70,
        width: 70,
        borderRadius: 10

    },
    product: {
        height: 120,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: colors.inactive
    },
})

export default DeliveryPerson