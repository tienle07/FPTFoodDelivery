import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Welcome, Intro, Login, Register, Details, Cart, Product, Repassword, Pay, PayFromDetail, Order, DeliveryDetail, MapDelivery, AddFood, UpdateFood} from '../screens';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator();


function Navigator(props){
    const {token} = useContext(AuthContext)
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                {token.access ? (
                    <>
                        <Stack.Screen name="Tabs" component={Tabs} />
                        <Stack.Screen name="AddFood" component={AddFood}/>
                        <Stack.Screen name="UpdateFood" component={UpdateFood}/>
                        <Stack.Screen name="Details" component={Details}/>
                        <Stack.Screen name="Product" component={Product}/>
                        <Stack.Screen name="Cart" component={Cart}/>
                        <Stack.Screen name="Repassword" component={Repassword}/>
                        <Stack.Screen name="Pay" component={Pay}/>
                        <Stack.Screen name="PayFromDetail" component={PayFromDetail}/>
                        <Stack.Screen name="Order" component={Order}/>
                        <Stack.Screen name="DeliveryDetail" component={DeliveryDetail}/>
                        <Stack.Screen name="MapDelivery" component={MapDelivery}/>
                    </>
                    
                ) : (
                    <>
                        <Stack.Screen name="Welcome" component={Welcome}/>
                        <Stack.Screen name="Intro" component={Intro} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator