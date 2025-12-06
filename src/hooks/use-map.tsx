import { useEffect, useState, MutableRefObject, useRef } from 'react';
import leaflet from 'leaflet';
import { City } from 'types';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City
): leaflet.Map | null {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  const { latitude, longitude, zoom } = city.location;

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          }
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, latitude, longitude, zoom]);

  useEffect(() => {
    if (map) {
      map.setView([latitude, longitude], zoom);
    }
  }, [map, latitude, longitude, zoom]);

  return map;
}

export default useMap;
