import React, { useEffect, useRef, useState } from "react";
import ReactMapboxGl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Grid } from "@mui/material";

ReactMapboxGl.accessToken = process.env.REACT_APP_MAPBOX_API_TOKEN;

function LocationsMap({
    label,     
    initialZoom,           
    locations,              
    sidebar = false              
}) {
    const mapContainer = useRef(null);
    const map = useRef(null);

    const [lng, setLng] = useState(locations[0]?.coordinates?.longitude || 0);
    const [lat, setLat] = useState(locations[0]?.coordinates?.latitude || 0);
    const [zoom, setZoom] = useState(initialZoom);

    useEffect(() => {
        // Check if there's an existing map and remove it
        if (map.current) {
            map.current.remove();
        }

        // Create a new map if there are locations
        if (locations?.length > 0) {
            map.current = new ReactMapboxGl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/intutecio/clmbwv14801ay01pf80c7hkm6',
                projection: 'globe',
                center: [locations[0]?.coordinates?.longitude || 0, locations[0]?.coordinates?.latitude || 0],
                zoom: zoom,
                attributionControl: true,
                scrollZoom: true,
            });

            if (label === true) {
                locations.forEach((location) => {
                    if (location?.coordinates) {
                        const marker = new ReactMapboxGl.Marker({
                            color: '#A8C957',
                            width: '5rem',
                            height: '5rem',
                            borderRadius: '50%',
                            cursor: 'pointer',
                        })
                            .setLngLat({ lng: location.coordinates.longitude, lat: location.coordinates.latitude });

                        if (label === true) {
                            marker.setPopup(
                                new ReactMapboxGl.Popup({ offset: 25 })
                                    .setHTML(
                                        `<h3>${location?.name}</h3><p>${location.content}</p>`
                                    )
                            );
                        }

                        marker.addTo(map.current);
                    }
                });
            }
        }
    }, [locations]);

    useEffect(() => {
        if (!map.current) return;
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    }, [lng, lat]);

    return (
        <Grid item xs={12} className="intu__divider">
            {sidebar && 
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat}
            </div>
            }
            <div ref={mapContainer} className="map-container" />
        </Grid>
    );
}

export default LocationsMap;
