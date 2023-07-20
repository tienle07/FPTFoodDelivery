import { StyleSheet, View, Image, Dimensions } from 'react-native'
const { width } = Dimensions.get('screen');

function CategoryDetails(props) {
    return (

            <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={props.image} style={styles.cardImages} />
            </View>
    )
}

const styles = StyleSheet.create({
    cardImages: {
        height: 230,
        width: 300,
        borderRadius: 5,
        marginHorizontal: 10,
        
    }

})

export default CategoryDetails