import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fonts, colors, images } from '../constants/index.js'

function Intro({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={{ flex: 1 }} />
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={{ fontSize: fonts.h1, fontWeight: '500', color: 'black' }}>Xin Chào!</Text>
                        <Text style={{ fontSize: fonts.h4, fontWeight: '400', color: 'black' }}>Đăng nhập để tiếp tục</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <View>
                        <Image source={images.fast_food} style={{ width: 70, height: 70 }} />
                    </View>
                </View>
            </View>
            <View style={styles.mid}>
                <View style={{ alignSelf: 'center', width: '100%' }}>
                    <TouchableOpacity style={{ backgroundColor: 'white', width: '100%', height: 50, borderRadius: 30, justifyContent: 'center', alignSelf: 'center' }} onPress={() => navigation.navigate('Login')}>
                        <Text style={{ paddingStart: 15, fontSize: fonts.h5, fontWeight: '400' }}><Ionicons name='person-outline' size={18} /> Đăng Nhập</Text>
                    </TouchableOpacity>
                    <View style={{ marginVertical: 15 }} />
                    <TouchableOpacity style={{ backgroundColor: 'white', width: '100%', height: 50, borderRadius: 30, justifyContent: 'center', alignSelf: 'center' }} onPress={() => navigation.navigate('Register')}>
                        <Text style={{ paddingStart: 15, fontSize: fonts.h5, fontWeight: '400' }}><Ionicons name='person-add-outline' size={18} /> Đăng Ký</Text>
                    </TouchableOpacity>
                    <View style={{ marginVertical: 25 }} />
                    <TouchableOpacity style={{ backgroundColor: 'white', width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'black' }}>
                        <Icon name='arrow-right' size={18} color={'white'} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Octicons name="dot" size={19} color={colors.inactive} />
                    <Octicons name="dot-fill" size={19} color={colors.primary} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    top: {
        flex: 30,
        backgroundColor: colors.primary,
        paddingHorizontal: 30,
    },
    mid: {
        flex: 50,
        paddingHorizontal: 30,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        borderBottomLeftRadius: 100,
    },
    footer: {
        flex: 20,
        justifyContent: 'center',
        marginHorizontal: '45%',
    },
})

export default Intro

