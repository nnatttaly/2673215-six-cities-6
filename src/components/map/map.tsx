import { useRef, useEffect, useMemo } from 'react';
import leaflet from 'leaflet';
import useMap from '@hooks/use-map';
import { City, Offer, Offers } from 'types';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from 'consts';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offers;
  selectedOffer?: Offer | null;
  className: string;
};

function Map({
  city,
  offers,
  selectedOffer,
  className,
}: MapProps): JSX.Element {
  const defaultCustomIcon = useMemo(() => leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  }), []);

  const currentCustomIcon = useMemo(() => leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  }), []);

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = leaflet.layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = leaflet.marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedOffer && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, selectedOffer?.id, defaultCustomIcon, currentCustomIcon]);

  return <div className={`${className}__map map`} ref={mapRef} />;
}

export default Map;
