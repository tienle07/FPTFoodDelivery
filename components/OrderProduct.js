import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import { colors } from '../constants/index.js'

function OrderProduct(props) {
    return (
        <View style={styles.product}>
            <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Image source={{uri: "http://10.0.2.2:8000"+props.image }} style={{width: 40, height: 40}}  />
                <View style={{paddingLeft: 15, width: '55%'}}>
                    <Text style={{fontSize: 13}}>{props.name}</Text>
                    <View style={{paddingVertical: 1}}/>
                    <Text style={{color: 'gray', fontSize: 12}}>Số lượng x {props.number}</Text>
                    <View style={{paddingTop: 2, marginTop: 2, backgroundColor: '#FDD7E4', alignSelf: 'stretch', textAlign: 'center', width: props.isReceived == false && props.isCancel == false ? '55%' : props.isReceived == true && props.isCancel == false ? '50%' : '42%'}}>
                        <Text style={{color: 'gray', fontSize: 12, borderWidth: 1, borderColor: colors.inactive, borderRadius: 2, paddingLeft: props.isReceived == false ? 2 : 5}}>{props.isReceived == false && props.isCancel == false ? 'Đang giao hàng' : props.isReceived == true && props.isCancel == false ? 'Đã giao hàng' : 'Đã hủy đơn'}</Text>
                    </View>
                    
                </View>
                <View style={{flex: 1}}/>
                <View style={{width: '45%'}}>
                    <Text style={{alignSelf: 'flex-start', width: '45%', paddingLeft: 5, paddingRight:5, fontSize: 13}}>{props.price * props.number}.000đ</Text>
                    {
                        props.isReceived == false && props.isCancel == false? 
                            <TouchableOpacity onPress={props.onPress}>
                                <Text style={{width: '45%', paddingLeft: 5, paddingRight:5, fontSize: 13, marginTop: 7, color: colors.primary}}>Hủy Đơn</Text>
                            </TouchableOpacity>
                        :
                            null
                    }
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    product: {
        paddingHorizontal: 10, 
        flexDirection: 'row', 
        paddingVertical: 5, 
    }
})


export default OrderProduct