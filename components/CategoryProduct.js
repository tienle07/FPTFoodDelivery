import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { colors } from '../constants/index.js'
import Ionicons from 'react-native-vector-icons/Ionicons'
const { width } = Dimensions.get('screen');

function CategoryProduct(props) {
    return (
        <TouchableOpacity style={styles.product} onPress={props.onPress}>
            <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={{uri: "http://10.0.2.2:8000"+props.image}} style={styles.cardImages} />
                <Text style={{ fontSize: 20, paddingVertical: 30}}>{props.name}</Text>
                <TouchableOpacity style={{ alignSelf: 'center', marginBottom: 20, marginRight: 10, paddingTop: 15 }}>
                    <Ionicons name="arrow-forward-outline" size={25} style={{color: colors.primary}} />
                </TouchableOpacity>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardImages: {
        height: 100,
        width: 100,
        borderRadius: 10
    },
    product: {
        height: 120,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        paddingHorizontal: 5,
        borderWidth: 1,
        marginHorizontal: 10,
        borderColor: colors.inactive
    },
})

export default CategoryProduct