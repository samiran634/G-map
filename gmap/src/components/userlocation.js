
import React, { useState, useEffect } from 'react';

const UserLocation = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                setError('Unable to retrieve your location');
                console.error('Error getting location:', error);
            }
        );
    }, []);

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : !location ? (
                <p>Loading location...</p>
            ) : (
                <div>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            )}
        </div>
    );
};

export default UserLocation;


 