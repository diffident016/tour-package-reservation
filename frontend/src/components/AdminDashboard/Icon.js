import L from 'leaflet';

const locIcon = new L.Icon({
    iconUrl: require('./location-pin.png'),
    iconRetinaUrl: require('./location-pin.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(48, 50),
    className: 'leaflet-div-icon'
});

export { locIcon };