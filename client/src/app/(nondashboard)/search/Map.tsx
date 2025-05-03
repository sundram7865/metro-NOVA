"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAppSelector } from "@/state/redux";
import { useGetPropertiesQuery } from "@/state/api";
import { Property } from "@/types/prismaTypes";

// Set Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

const isValidCoordinate = (coords: any): coords is [number, number] => {
  return (
    Array.isArray(coords) &&
    coords.length === 2 &&
    typeof coords[0] === "number" &&
    typeof coords[1] === "number" &&
    coords[1] >= -90 &&
    coords[1] <= 90 &&
    coords[0] >= -180 &&
    coords[0] <= 180
  );
};

const isValidLatLng = (lat: any, lng: any) => {
  return (
    typeof lat === "number" &&
    typeof lng === "number" &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
};

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const filters = useAppSelector((state) => state.global.filters);

  const {
    data: properties,
    isLoading,
    isError,
  } = useGetPropertiesQuery(filters);

  useEffect(() => {
    if (isLoading || isError || !properties || !mapContainerRef.current) return;

    // Determine valid center coordinates
    const centerCoords: [number, number] = isValidCoordinate(filters.coordinates)
      ? filters.coordinates
      : [-74.5, 40]; // fallback

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/sundrammishra56pj/cma71ap8k00fi01sgarj4400s",
      center: centerCoords,
      zoom: 9,
    });

    properties.forEach((property) => {
      const lat = property.location.coordinates.latitude;
      const lng = property.location.coordinates.longitude;

      if (isValidLatLng(lat, lng)) {
        const marker = createPropertyMarker(property, map);
        const markerElement = marker.getElement();
        const path = markerElement.querySelector("path[fill='#3FB1CE']");
        if (path) path.setAttribute("fill", "#000000");
      } else {
        console.error(`Invalid coordinates for property ${property.id}:`, lat, lng);
      }
    });

    const resizeMap = () => {
      setTimeout(() => map.resize(), 700);
    };
    resizeMap();

    return () => map.remove();
  }, [isLoading, isError, properties, filters.coordinates]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !properties) return <div>Failed to fetch properties</div>;

  return (
    <div className="basis-5/12 grow relative rounded-xl">
      <div
        className="map-container rounded-xl"
        ref={mapContainerRef}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
};

const createPropertyMarker = (property: Property, map: mapboxgl.Map) => {
  return new mapboxgl.Marker()
    .setLngLat([
      property.location.coordinates.longitude,
      property.location.coordinates.latitude,
    ])
    .setPopup(
      new mapboxgl.Popup().setHTML(
        `
        <div class="marker-popup">
          <div class="marker-popup-image"></div>
          <div>
            <a href="/search/${property.id}" target="_blank" class="marker-popup-title">${property.name}</a>
            <p class="marker-popup-price">
              $${property.pricePerMonth}
              <span class="marker-popup-price-unit"> / month</span>
            </p>
          </div>
        </div>
        `
      )
    )
    .addTo(map);
};

export default Map;
