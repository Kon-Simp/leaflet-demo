import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react';
import axios from 'axios'

export default function Map(){

    function LocationMarker(){
        const [position, setPosition] = useState(null);
        const [bbox, setBbox] = useState([]);
        const map = useMap();
    
        useEffect(() => {
            map.locate().on("locationfound", function (e) {
              setPosition(e.latlng);
              map.flyTo(e.latlng, map.getZoom());
            });
          }, [map]);

          return(
              <>
                {position != null ?
                    <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                : ''}
              </>
          )
    }

    return(
        <div>
            <MapContainer style={{height:'100vh'}} center={[13.736717, 100.523186]} zoom={6}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </div>

    )
}