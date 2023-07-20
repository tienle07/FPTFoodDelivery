import MapView from 'react-native-maps';
import { StyleSheet, View, Text, Button } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js'
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import getDirections from 'react-native-google-maps-directions'

const axios = require('axios').default;

function MapDelivery({ navigation, route }) {
    const { itemId } = route.params
    const [data, setData] = useState({})
    const [coor, setCoor] = useState([])
    const { token } = useContext(AuthContext)
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
      
        let location = await Location.getCurrentPositionAsync({});
        await setLocation(location);
    }

    useEffect(()=>{
        axios.get('http://10.0.2.2:8000/api/user/?user='+itemId, {
            headers: {
                Authorization: "Bearer " + token.access,
            }
        })
        .then(function (response) {
            // handle success
            setData(response.data)
            // console.log(response.data)
            axios.get("http://api.positionstack.com/v1/forward?access_key=10f8b14400faccd03545a2584ba13249&query=Lê Độ, Thanh Khê District, Thanh Khê, thành phố Đà Nẵng")
            .then((res)=>{
                console.log(res)
            })
        })
        .catch(function (error) { 
            // handle error
            console.log(error);
        })

        getLocation()
        
    }, [coor])

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
        console.log(location.coords.latitude)
        console.log(location.coords.longitude)
    }

    handleGetDirections = () => {
        const data = {
            source: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            },
            destination: {
                latitude: 21.046613899354345, 
                longitude: 105.7856051177561
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"        // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate"       // this instantly initializes navigation using the given travel mode
                }
            ],
            // waypoints: [
            //     {
            //         latitude: -33.8600025,
            //         longitude: 18.697452
            //     },
            //     {
            //         latitude: -33.8600026,
            //         longitude: 18.697453
            //     },
            //     {
            //         latitude: -33.8600036,
            //         longitude: 18.697493
            //     }
            // ]
        }

        getDirections(data)
    }

    const origin = { latitude: 20.985710784811005, longitude: 105.83416174196871 };
    const destination = { latitude: 20.985710784811005, longitude: 105.83416174196871 };
    const GOOGLE_MAPS_APIKEY = 'AIzaSyCNJoFmXBz0GHSi1ugbMdu8hwCoa5Azups';

    return (
        
        <View style={styles.container}>
            <Button onPress={() => handleGetDirections() } title="Get Directions" />

            <Text style={styles.paragraph}>{text}</Text>
        </View>

  
        // <View style={styles.container}>
        //     <MapView style={styles.map} showsUserLocation initialRegion={{
        //         latitude: 20.985710784811005,
        //         longitude: 105.83416174196871,
        //         latitudeDelta: 0.0092,
        //         longitudeDelta: 0.0081,
        //     }}>
        //         <MapView.Marker coordinate={
        //             {
        //                 latitude: 20.985710784811005,
        //                 longitude: 105.83416174196871
        //             }} />
        //         <MapViewDirections
        //             origin={origin}
        //             destination={destination}
        //             apikey={GOOGLE_MAPS_APIKEY}
        //         />
        //     </MapView>
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default MapDelivery