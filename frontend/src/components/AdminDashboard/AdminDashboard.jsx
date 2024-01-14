import React, { useEffect, useReducer, useState } from 'react'
import "./AdminDashboardStyles.css";
import swal from "sweetalert";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, Marker } from "react-leaflet";
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import { locIcon } from './Icon';

function AdminDashboard() {

    const [position, setPosition] = useState([8.300719, 124.956809]);
    const [map, setMap] = useState(null);

    const [details, setDetails] = useReducer((prev, next) => {
        return { ...prev, ...next }
    },
        {
            fetchState: 0,
            temp: 0,
            humidity: 0,
            realfeel: 0,
            code: "",
            town: "",
            address: "",
            weather: ""
        });

    function errors(err) {
        swal("Error!", `ERROR(${err.code}): ${err.message}`, "error");
    }

    const getDetails = (crd) => {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${crd[0]}&lon=${crd[1]}`)
            .then((res) => res.json())
            .then((val) => {
                setDetails({
                    town: val['address']['town'],
                    address: val['display_name']
                })
            }).catch((err) => {
                console.log(err);
            })

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${crd[0]}&lon=${crd[1]}&units=metric&exclude=minutely,hourly,daily,alerts&appid=304632c6956ee7ae78f1181efb1890f5`)
            .then((res) => res.json())
            .then((val) => {
                setDetails({
                    temp: val['main']['temp'],
                    humidity: val['main']['humidity'],
                    realfeel: val['main']['feels_like'],
                    code: val['weather'][0]['icon'],
                    weather: val['weather'][0]['main']
                })
            })
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    console.log(result);
                    if (result.state === "granted") {
                        navigator.geolocation.getCurrentPosition((pos) => {
                            var crd = pos.coords;
                            setPosition([crd.latitude, crd.longitude]);
                            getDetails([crd.latitude, crd.longitude]);
                        }, errors, {
                            enableHighAccuracy: true,
                            timeout: 5000,
                            maximumAge: 0,
                        });
                    } else if (result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition((pos) => {
                            var crd = pos.coords;
                            setPosition([crd.latitude, crd.longitude]);
                            getDetails([crd.latitude, crd.longitude]);
                        }, errors, {
                            enableHighAccuracy: true,
                            timeout: 5000,
                            maximumAge: 0,
                        });
                    } else if (result.state === "denied") {
                        return swal("Error!", "Please allow location access.", "error");
                    }
                });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <div className='container'>

            <div className='dashboard-panel'>
                <div className='weather-panel'>
                    <h1 className='panel-title'>Today's Weather</h1>
                    <div className='temp-container'>
                        <div className='icon-container'>
                            <img src={`https://openweathermap.org/img/wn/${details['code']}@4x.png`} />
                            <p className='weather'>{details['weather']}</p>
                        </div>
                        <div className='temp-details'>
                            <p className='address'>{details['town']}</p>
                            <p>Real-Feel: {details['realfeel']}&deg;C</p>
                            <h1 className='temp'>{details['temp']}&deg;C</h1>
                            <p>Humidity: {details['humidity']}%</p>
                        </div>
                    </div>
                    <h1 className='location-label'>Current Location</h1>
                    <p>{details['address']}</p>
                </div>
                <div className='map-panel'>
                    <MapContainer
                        key={`${position}`}
                        style={{ width: '100v', height: '100vh', position: 'relative' }}
                        center={position}
                        zoom={13}
                        scrollWheelZoom={false}
                        ref={map}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            icon={locIcon}
                            position={position}>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard