import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions  } from 'react-native'
import {colors, fonts} from '../constants/index.js'
const {width} = Dimensions.get('screen');

function CategoryHome(props){
    return(
        <TouchableOpacity style={styles.product} onPress={props.onPress}>
                <Image source={{uri: "http://10.0.2.2:8000" + props.image}} style = {styles.cardImages}/>
                <Text style={{ fontSize: fonts.h5, alignSelf: 'center', fontWeight: 'bold', marginTop: 5}}>{props.name}</Text>
                <View style={{paddingBottom: 5, flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{color: colors.primary, alignSelf: 'center', }}>{props.price}</Text>
                </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    product: {
        height: 210,
        width: width / 2 - 20 ,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        paddingHorizontal: 2,
        borderWidth: 1,
        borderColor: colors.inactive
    },
    cardImages: {
        height: 140,
        borderRadius: 10,
        marginTop: 5,
        width: '100%',
    },
})

export default CategoryHome