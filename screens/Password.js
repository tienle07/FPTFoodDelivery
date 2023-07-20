import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fonts, colors} from '../constants/index.js'
const { width } = Dimensions.get('screen');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function Password(props) {

    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
                <View style={styles.top}>
                    <TouchableOpacity style={{ paddingHorizontal: 10}}>
                        <Ionicons name="arrow-back-outline" size={30} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center',}}>
                        <Text style={{ fontSize: 30, alignSelf: 'center', paddingBottom: 5}}>Đổi mật khẩu</Text>
                        <Text style={{ fontSize: 16, alignSelf: 'center', color: 'grey', }}>Vui lòng nhập mật khẩu mới</Text>
                    </View>

                </View>
                <View style={styles.mid}>
                    <Text style={{ paddingLeft: 30, fontSize: 14, color: 'black' }}>Mật khẩu mới</Text>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 10, alignItems: 'center' }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Mật khẩu mới"
                        />
                        <TouchableOpacity>
                            <Ionicons name="eye-outline" size={30} style={{ paddingLeft: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ paddingLeft: 30, fontSize: 14, color: 'black' }}>Nhập lại mật khẩu</Text>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 10, alignItems: 'center' }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Mật khẩu mới"
                        />
                        <TouchableOpacity>
                            <Ionicons name="eye-outline" size={30} style={{ paddingLeft: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ alignSelf: 'center', paddingTop: 20, backgroundColor: 'white' }}>
                        <Text style={styles.button}>Đổi mật khẩu</Text>
                    </TouchableOpacity>

                </View>
            
        </View>
        </KeyboardAwareScrollView>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    top: {
        flex: 20,
        justifyContent: 'center'
    },
    mid: {
        flex: 80,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 16,
        fontSize: fonts.h4,
        paddingLeft: 20
    },
    button: {
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        color: 'white',
        fontSize: 20
    }
})

export default Password

