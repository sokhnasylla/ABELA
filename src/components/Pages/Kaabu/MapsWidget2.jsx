import React, { Component } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import mapicon from '../../../assets/info.jpg';

const libraries = ['places'];
const mapContainerStyle = {
  width: '467px',
  height: '470px'
};


const MapsWidget2 = ({ lat, lng }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDhL7j8jYHGsuYU6HmOuAfvcJwDuU46dXs',
    libraries,
  });

  const center = {
    lat: lat || 14.49778053610566, // default latitude 
    lng: lng || -19.258580543282804, // default longitude
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  console.log("--------------LOC-------", lat, lng);
  console.log("Marker Icon Path:", mapicon); // Log the path to verify
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={17}
        center={center}
      >
        {/* {lat && lng && <Marker title="Vendeur" position={{ lat: lat, lng: lng }} icon="/assets/default-device.jpg" />} */}
        {lat && lng && (
          <Marker
            title="Vendeur"
            position={center}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapsWidget2;