import React from 'react';
import GoogleMapReact from 'google-map-react';

export default function PlaceOnMap() {
    const defaultProps = {
        center: {
            lat: 10.99,
            lng: -79.99
        },
        zoom: 14
    };
    return (
    <GoogleMapReact 
    bootstrapURLKeys={{ key: "AIzaSyAU2itFwt_-FhqvznZrwaosSehtgQxv19M" }}
    defaultCenter={defaultProps.center}
    defaultZoom={defaultProps.zoom}
    center={defaultProps.center}
    zoom={defaultProps.zoom}
    // onChildClick={handleChildClick}
    // onchange={handleChange}
    />
    );
}