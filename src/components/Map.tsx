import { TileLayer } from "react-leaflet/TileLayer";
import { MapContainer, Marker } from "react-leaflet";

export default function Map() {
  return (
    <MapContainer
      className="z-0"
      center={[53.56, 10]}
      zoom={10}
      scrollWheelZoom={false}
      style={{
        marginRight: "1.25rem",
        borderRadius: "0.75rem",
        height: "20rem",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[53.56, 10]}>
      </Marker>
    </MapContainer>
  );
}
