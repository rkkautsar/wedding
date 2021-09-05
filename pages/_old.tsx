import * as React from "react";
import GoogleMapReact from "google-map-react";

const INITIAL_ZOOM = 12;

export default function Home() {
  return (
    <div className="full-screen-container overflow-hidden">
      <div className="map-bg-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCz22ZNNzlqjmlZOMrUoC6INUSJDy0-aXE" }}
          defaultCenter={{
            lat: -6.626632,
            lng: 106.863031,
          }}
          zoom={INITIAL_ZOOM}
          options={{ mapId: "819c06442ec43f18", disableDefaultUI: true }}
        >
          <Content lat={-6.626632} lng={106.863031} />
        </GoogleMapReact>
      </div>
    </div>
  );
}

function Content(props: { lat: number; lng: number }) {
  return (
    <div className="content-container">
      <div className="blob z-0 opacity-20" />
      <div className="z-10 text-center grid gap-2">
        <h1 className="text-gray-100 z-10">We're getting married soon!</h1>
        <h2 className="text-gray-400 z-10">
          <time dateTime="2021-09-18">18.09.21</time>
        </h2>
      </div>
    </div>
  );
}
