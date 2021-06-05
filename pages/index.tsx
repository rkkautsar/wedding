import GoogleMapReact from "google-map-react";

export default function Home() {
  return (
    <div className="full-screen-container">
      <div className="map-bg-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCz22ZNNzlqjmlZOMrUoC6INUSJDy0-aXE" }}
          defaultCenter={{
            lat: -6.6264221,
            lng: 106.8612671,
          }}
          zoom={12}
          options={{ mapId: "28cabfb041e8e28d", disableDefaultUI: true }}
        ></GoogleMapReact>
      </div>
      <div className="content-container">
        <h1 className="text-gray-900">We're getting married soon!</h1>
        <h2 className="text-gray-600">
          <time dateTime="2021-09-18">18.09.21</time>
        </h2>
      </div>
    </div>
  );
}
