// utils/fixLeafletIcon.ts
"use client"
import L from 'leaflet';

delete (L.Icon.Default as any).prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
});
