import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { colors } from '../constants/index.js'
const { width } = Dimensions.get('screen');

function CategoryDetailsProduct(props) {
    return (
        <View style={styles.product} onPress={props.onPress}>
            <View>
                <View style={{ paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={{uri: "http://10.0.2.2:8000"+props.image}} style={styles.cardImages} />
                    <View style={{ paddingTop: 10, textAlign: 'left', alignSelf: 'flex-start'}}>
                        <Text style={{ fontSize: 16, overflow: 'hidden',}}>{props.name}</Text>
                        <Text style={{ color: colors.primary }}>{props.price}</Text>
                    </View>
                    <TouchableOpacity onPress={props.onPress} style={{borderWidth: 1, borderRadius: 10, borderColor: colors.primary, alignSelf: 'center', padding: 5, marginEnd: 5}} >
                        <Text style={{ color: colors.primary }}>Thêm</Text>
                    </TouchableOpacity>
                </View>
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

export default CategoryDetailsProduct