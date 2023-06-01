import React, { Component } from 'react';
import {
    TileLayer,
    Polyline,
    MapContainer,
    Marker
} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet'
import home from "../../assets/hotel02.svg";
import marker from "../../assets/marker.svg";
import scooter from "../../assets/scooter.svg";

const markIcon = new Icon({
    iconUrl: marker,
    iconSize: [25, 25]
})

const homeIcon = new Icon({
    iconUrl: home,
    iconSize: [55, 55]
})

const scooterIcon = new Icon({
    iconUrl: scooter,
    iconSize: [25, 25]
})

const position = [13.117267, 77.682499]

class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getMarkers = (dt, ind) => {
        return (
            <Marker
                key={ind}
                position={dt}
                icon={markIcon} >
            </Marker>
        )
    }

    render() {
        console.log("##########=======>", this.props.teamOrder);
        const MAPDETAILS = this.props.teamOrder;
        return (
            <MapContainer
                className="markercluster-map"
                center={position}
                zoom={15}
                style={{ width: "100%", height: "280px" }}
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    position={[13.112767, 77.680499]}
                    icon={homeIcon} >
                </Marker>


                <Polyline color='#1858DB' weight={4} positions={MAPDETAILS.polyline1} />
                <Polyline color='#403F3F' weight={4} positions={MAPDETAILS.polyline2} />
                {MAPDETAILS.markers.length > 0 &&
                    MAPDETAILS.markers.map((dt, ind) => this.getMarkers(dt, ind))}
                <Marker
                    position={MAPDETAILS.polyline2[0]}
                    icon={scooterIcon} >
                </Marker>
            </MapContainer>
        );
    }
}

export default MapView;