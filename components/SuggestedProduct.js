import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, } from 'react-native'
import {colors} from '../constants/index.js'
const { width } = Dimensions.get('screen');
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

function SuggestedProduct(props) {



    return (
        <View style={styles.product} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={{uri: "http://10.0.2.2:8000"+props.image}} style={styles.cardImages} />
                <View style={{ paddingTop: 0, width: '50%', paddingLeft: 1, }}>
                    <Text style={{ fontSize: 14, overflow: 'hidden' }}>{props.name}</Text>
                    <Text style={{ color: colors.primary }}>{props.price}</Text>
                </View>
                <View style={{ alignSelf: 'center', paddingVertical: 5, marginBottom: 20, marginRight: 10, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={props.onPress1}>
                        <FontAwesome5 name="pen" size={14} style={{ paddingStart: 5, color: colors.primary}} />
                    </TouchableOpacity>
                    
                    <View style={{ marginRight: 10,}} />
                    
                    <TouchableOpacity onPress={props.onPress}>
                        <FontAwesome5 name="trash" size={14} style={{ paddingStart: 5, color: 'red'}} />
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardImages: {
        height: 50,
        width: 50,
    },
    product: {
        backgroundColor: 'white',
        margin: 5,
        paddingHorizontal: 5,
        marginHorizontal: 5,
        paddingBottom: 10, 
    },
})


export default SuggestedProduct