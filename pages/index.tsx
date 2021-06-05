import * as React from "react";
import GoogleMapReact from "google-map-react";
import debounce from "lodash/debounce";

const INITIAL_ZOOM = 12;

export default function Home() {
  const [zoom, setZoom] = React.useState(INITIAL_ZOOM);

  const debouncedOnChange = React.useCallback(
    debounce(({ zoom }) => setZoom(zoom), 300),
    [setZoom]
  );

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
          onChange={debouncedOnChange}
          options={{ mapId: "819c06442ec43f18", disableDefaultUI: true }}
        >
          <Content lat={-6.626632} lng={106.863031} zoom={zoom} />
        </GoogleMapReact>
      </div>
    </div>
  );
}

function Content(props: { lat: number; lng: number; zoom: number }) {
  const { zoom } = props;
  let scale = Math.floor(100 * (zoom / INITIAL_ZOOM));
  return (
    <div
      className="content-container"
      style={{
        transform: `scale(${scale}%) translate(-50%, -50%)`,
        transformOrigin: "center",
      }}
    >
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
