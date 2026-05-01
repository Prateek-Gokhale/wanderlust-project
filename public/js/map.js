const hasUsableMapToken = mapToken && mapToken.startsWith("pk.") && !mapToken.includes("local");
const coordinates = listing.geometry && listing.geometry.coordinates;

if (hasUsableMapToken && window.mapboxgl && coordinates) {
  mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: coordinates,
    zoom: 11,
  });

  new mapboxgl.Marker({ color: "#fe424d" })
    .setLngLat(coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h4>${listing.location}</h4><p>Exact location provided after booking</p>`)
    )
    .addTo(map);
}
