import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { fonts, colors, images } from '../constants/index.js'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext.js'


function Welcome({ navigation }) {
    const { isLogout, token } = useContext(AuthContext)

    useEffect(() => {
        isLogout == true && !token.access ? navigation.navigate('Login') : null
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={{ flex: 1 }} />
                <Text style={{ fontWeight: '500', fontSize: 26, textAlign: 'center', }}>
                    Welcome to <Text style={{ fontWeight: 'bold', color: colors.primary, fontSize: 30, }}>FPTFOOD</Text> <Icon name='food' size={40} color={colors.primary} />
                </Text>
            </View>
            <ImageBackground style={styles.mid} source={images.welcome_image2} resizeMode={'contain'}>
                <Image source={images.welcome_image} style={{ width: 250, height: 250, alignSelf: 'center', resizeMode: 'contain', }} />
            </ImageBackground>
            <View style={styles.bottom}>
                <View style={{ paddingStart: 40, paddingTop: 60, width: '70%' }}>
                    <Text style={{ fontSize: fonts.h4, fontWeight: '500', }}>ĐỒ ĂN NGON</Text>
                    <View style={{ height: 5 }} />
                    <Text style={{ fontSize: fonts.h5, fontWeight: '300' }}>Đăng nhập!</Text>
                </View>
                <View style={{ paddingTop: 60, width: '30%', alignItems: 'flex-end', }}>
                    <View style={{ width: '100%', height: 120, position: 'absolute', left: 60, borderTopLeftRadius: 150, borderBottomLeftRadius: 150, backgroundColor: colors.primary, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Intro')}>
                            <Icon name='arrow-right' style={{ textAlign: 'left', marginStart: '10%' }} size={30} color={'#f2f2f2'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <Octicons name="dot-fill" size={19} color={colors.primary} />
                <View style={{ flex: 1 }} />
                <Octicons name="dot" size={19} color={colors.inactive} />
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
        flex: 20,
    },
    mid: {
        flex: 40,
        marginHorizontal: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        flex: 30,
        flexDirection: 'row'
    },
    footer: {
        flex: 10,
        flexDirection: 'row',
        paddingHorizontal: '45%'
    }
})

export default Welcome

