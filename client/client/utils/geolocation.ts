let lat = 12.9716;
let lng = 77.5946;

export function getNextLocation() {
  lat += (Math.random() - 0.5) * 0.001;
  lng += (Math.random() - 0.5) * 0.001;
  return { lat, lng };
}
