import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Profile, Search, Cart, Category, Delivery, Food } from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../constants';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
const Tab = createBottomTabNavigator()

function Tabs() {
  const { isAdmin } = useContext(AuthContext)
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,

    }}
    >
      <Tab.Screen name="Category" component={Category}
        options={{
          tabBarLabel: 'Chuyên Mục',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube-sharp" color={color} size={size} />
          ),
        }} />
      {
        isAdmin == true ?
          <Tab.Screen name="Food" component={Food}
            options={{
              tabBarLabel: 'Đồ Ăn',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="fast-food" color={color} size={size} />
              ),
            }} />
          :
          <Tab.Screen name="Search" component={Search}
            options={{
              tabBarLabel: 'Tìm Kiếm',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="search" color={color} size={size} />
              ),
            }} />
      }
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Trang Chủ',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }} />
      {
        isAdmin == true ?
          <Tab.Screen name="Delivery" component={Delivery}
            options={{
              tabBarLabel: 'Giao Hàng',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="navigate" color={color} size={size} />
              ),
            }} />
          :
          <Tab.Screen name="Cart" component={Cart}
            options={{
              tabBarLabel: 'Giỏ Hàng',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-cart" color={color} size={size} />
              ),
            }} />
      }
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarLabel: 'Cá Nhân',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-circle-sharp" color={color} size={size} />
        ),
      }} />
    </Tab.Navigator>
  );
}

export default Tabs