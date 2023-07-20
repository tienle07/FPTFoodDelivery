import { StyleSheet, Text, View, Image } from 'react-native'
function PayProduct(props) {
    return (
        <View style={styles.product}>
            <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Image source={{uri: "http://10.0.2.2:8000"+props.image }} style={{width: 40, height: 40}}  />
                <View style={{paddingLeft: 15, width: '55%'}}>
                    <Text style={{fontSize: 13}}>{props.name}</Text>
                    <View style={{paddingVertical: 1}}/>
                    <Text style={{color: 'gray', fontSize: 12}}>Số lượng x {props.number}</Text>
                </View>
                <View style={{flex: 1}}/>
                <Text style={{alignSelf: 'center', width: '45%', paddingLeft: 5, paddingRight:5, fontSize: 13}}>{props.price * props.number}.000đ</Text>
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


export default PayProduct