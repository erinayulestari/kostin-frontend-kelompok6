import React, { useState, useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { MapPin, LocateFixed } from "lucide-react";

// Fix Leaflet default marker icon path issue with Vite bundler
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom red marker icon for owner picker
const redIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "leaflet-marker-red",
});

// Sub-component: Click handler on the map
function ClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
  return null;
}

// Sub-component: Draggable Marker
function DraggableMarker({ position, onDragEnd }) {
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker) {
          const latlng = marker.getLatLng();
          onDragEnd(latlng);
        }
      },
    }),
    [onDragEnd]
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={redIcon}
    />
  );
}

/**
 * MapPicker Component
 * @param {{ value: { lat: number|string, lng: number|string }, onChange: (coords: { lat: number, lng: number }) => void }} props
 */
export default function MapPicker({ value, onChange }) {
  const defaultLat = -5.1477;
  const defaultLng = 119.4327;

  const lat = value?.lat && !isNaN(Number(value.lat)) ? Number(value.lat) : null;
  const lng = value?.lng && !isNaN(Number(value.lng)) ? Number(value.lng) : null;

  const hasPosition = lat !== null && lng !== null;
  const position = hasPosition ? [lat, lng] : [defaultLat, defaultLng];

  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState("");
  const mapRef = useRef(null);

  const handleMapClick = (latlng) => {
    onChange({ lat: latlng.lat, lng: latlng.lng });
  };

  const handleDragEnd = (latlng) => {
    onChange({ lat: latlng.lat, lng: latlng.lng });
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolokasi tidak didukung oleh browser Anda.");
      return;
    }

    setGeoLoading(true);
    setGeoError("");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        onChange(coords);
        setGeoLoading(false);

        // Pan the map to the new location
        if (mapRef.current) {
          mapRef.current.setView([coords.lat, coords.lng], 16);
        }
      },
      (err) => {
        setGeoLoading(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setGeoError("Akses lokasi ditolak. Izinkan akses lokasi di browser Anda.");
            break;
          case err.POSITION_UNAVAILABLE:
            setGeoError("Informasi lokasi tidak tersedia.");
            break;
          case err.TIMEOUT:
            setGeoError("Waktu permintaan lokasi habis.");
            break;
          default:
            setGeoError("Gagal mendapatkan lokasi.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="map-picker-container">
      <div className="map-picker-header">
        <MapPin size={16} color="#0066ff" />
        <span>Klik pada peta atau geser marker untuk menentukan lokasi kos</span>
      </div>

      <MapContainer
        center={position}
        zoom={hasPosition ? 16 : 13}
        scrollWheelZoom={true}
        style={{ height: "300px", width: "100%", borderRadius: "10px" }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <ClickHandler onClick={handleMapClick} />
        {hasPosition && (
          <DraggableMarker position={[lat, lng]} onDragEnd={handleDragEnd} />
        )}
      </MapContainer>

      <div className="map-picker-footer">
        <button
          type="button"
          className="btn-use-location"
          onClick={handleUseMyLocation}
          disabled={geoLoading}
        >
          <LocateFixed size={16} />
          {geoLoading ? "Mendeteksi lokasi..." : "Gunakan Lokasi Saya Saat Ini"}
        </button>

        {hasPosition && (
          <div className="map-picker-coords">
            <span>Lat: <strong>{lat.toFixed(6)}</strong></span>
            <span>Lng: <strong>{lng.toFixed(6)}</strong></span>
          </div>
        )}
      </div>

      {geoError && (
        <div className="map-picker-error">
          {geoError}
        </div>
      )}
    </div>
  );
}
