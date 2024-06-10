import React, { useState, useEffect } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';

const mapContainerStyle = {
  width: '467px',
  height: '470px'
};

const MapsWidget = ({ google, lat, lng, vendorName }) => {
  const [location, setLocation] = useState({
    lat: lat || 14.49778053610566,
    lng: lng || -19.258580543282804
  });

  const [selectedPlace, setSelectedPlace] = useState({});
  const [activeMarker, setActiveMarker] = useState(null);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

  useEffect(() => {
    setLocation({
      lat: lat || 14.49778053610566,
      lng: lng || -19.258580543282804
    });
  }, [lat, lng]);

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const onClose = () => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };

  return (
    <div>
      <Map 
        style={mapContainerStyle} 
        google={google} 
        initialCenter={location}
        center={location}
        zoom={14}
      >
        <Marker 
          onClick={onMarkerClick}
          position={location}
          name={vendorName} 
        />       
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={onClose}
        >
          <div>
            <h1>{selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

MapsWidget.propTypes = {
  google: PropTypes.object.isRequired,
  lat: PropTypes.number,
  lng: PropTypes.number,
  vendorName: PropTypes.string, // Ajoutez ceci pour valider la prop du nom du vendeur
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDhL7j8jYHGsuYU6HmOuAfvcJwDuU46dXs"
})(MapsWidget);
