import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import leaflet from 'leaflet';
import useMap from './use-map';
import { City } from 'types';
import { makeFakeCity } from '@utils/mocks';

vi.mock('leaflet', () => ({
  default: {
    map: vi.fn(),
    tileLayer: vi.fn(() => ({
      addTo: vi.fn().mockReturnThis(),
    })),
  },
}));

const mockCity = makeFakeCity();

describe('Хук: useMap', () => {
  const mockedMap = vi.mocked(leaflet.map);

  beforeEach(() => {
    vi.clearAllMocks();

    mockedMap.mockReturnValue({
      setView: vi.fn().mockReturnThis(),
    } as unknown as leaflet.Map);
  });

  it('должен возвращать экземпляр Map, когда передан ref', () => {
    const mapRef = { current: document.createElement('div') };

    const { result } = renderHook(() => useMap(mapRef, mockCity));

    expect(result.current).not.toBeNull();
    expect(mockedMap).toHaveBeenCalledWith(mapRef.current, expect.objectContaining({
      zoom: mockCity.location.zoom,
    }));
  });

  it('должен вызывать setView при обновлении координат', () => {
    const mapRef = { current: document.createElement('div') };
    const { rerender, result } = renderHook(
      ({ city }) => useMap(mapRef, city),
      { initialProps: { city: mockCity } }
    );

    const updatedCity: City = {
      ...mockCity,
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
    };

    rerender({ city: updatedCity });

    const mapInstance = result.current;

    if (mapInstance) {
      expect(mapInstance.setView).toHaveBeenCalledWith(
        [updatedCity.location.latitude, updatedCity.location.longitude],
        updatedCity.location.zoom
      );
    }
  });
});
