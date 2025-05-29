"use client"
import { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { io, Socket } from 'socket.io-client';
import api, { setAuthToken } from '@/utils/api';
import '@/utils/fixLeafletIcon';

// Component to update map center when position changes
const MapUpdater = ({ position }: { position: LatLngExpression }) => {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);
  
  return null;
};

const CustomerTrackPage = () => {
  const [position, setPosition] = useState<LatLngExpression | null | any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  
  // Get orderId from URL params with better error handling
  const orderId = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search).get('orderId') 
    : null;

  const fetchLocation = useCallback(async () => {
    if (!orderId) {
      setError('Order ID is required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('Fetching location for order:', orderId);
      const res = await api.get(`/location/${orderId}`);
      console.log(res.data)
      console.log('API Response:', res);
      
      if (res.data && res.data.lat && res.data.lng) {
        setPosition([res.data.lat, res.data.lng]);
        setError(null);
        console.log('Initial location set:', [res.data.lat, res.data.lng]);
      } else {
        console.log('Invalid location data received:', res.data);
        setError('Location data not available');
      }
    } catch (err:any) {
      console.error('API Error Details:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      
      // Don't show error if we're getting real-time updates
      if (position) {
        console.log('Ignoring API error since we have real-time position');
        setError(null);
      } else {
        setError(`Failed to fetch delivery location: ${err.response?.status || 'Network error'}`);
      }
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    setAuthToken(localStorage.getItem("token")!)
    if (!orderId) {
      setError('Order ID is required');
      setLoading(false);
      return;
    }

    // Initial fetch
    fetchLocation();

    // Initialize socket connection
    const socket = io('http://localhost:3001', {
      transports: ['websocket'],
      timeout: 20000,
    });

    socket.on('connect', () => {
      console.log('Connected to tracking server');
      setConnectionStatus('connected');
      socket.emit('joinOrderRoom', orderId);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from tracking server');
      setConnectionStatus('disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setConnectionStatus('disconnected');
      setError('Unable to connect to tracking server');
    });

    socket.on('locationUpdate', ({ lat, lng, timestamp }) => {
      if (typeof lat === 'number' && typeof lng === 'number') {
        const newPosition: LatLngExpression = [lat, lng];
        setPosition(newPosition);
        setLastUpdated(timestamp || new Date().toISOString());
        
        // Clear any API errors since we're getting real-time data
        if (error && error.includes('Failed to fetch delivery location')) {
          setError(null);
          setLoading(false);
        }
        
        console.log('Location updated:', { lat, lng, timestamp });
      }
    });

    socketRef.current = socket;

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [orderId]);

  // Retry connection function
  const retryConnection = () => {
    setError(null);
    fetchLocation();
  };

  if (!orderId) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Track Your Delivery</h1>
          <p className="text-red-500">Order ID is required to track your delivery</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white shadow-sm border-b">
        <h1 className="text-center text-2xl font-semibold py-4">Track Your Delivery</h1>
        <div className="px-4 pb-2">
          <p className="text-sm text-gray-600">Order ID: {orderId}</p>
          <div className="flex items-center gap-2 text-sm">
            <span>Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              connectionStatus === 'connected' 
                ? 'bg-green-100 text-green-800' 
                : connectionStatus === 'connecting'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {connectionStatus === 'connected' ? '🟢 Live Tracking' : 
               connectionStatus === 'connecting' ? '🟡 Connecting...' : 
               '🔴 Disconnected'}
            </span>
            {lastUpdated && (
              <span className="text-xs text-gray-500 ml-2">
                Last updated: {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p>Loading delivery location...</p>
            </div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={retryConnection}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : position ? (
          <>
            {/* Debug info - remove in production */}
            <div className="absolute top-4 right-4 bg-white p-2 rounded shadow-lg text-xs z-10 max-w-xs">
              <div><strong>Debug Info:</strong></div>
              <div>Order ID: {orderId}</div>
              <div>Position: {position[0].toFixed(6)}, {position[1].toFixed(6)}</div>
              <div>Socket: {connectionStatus}</div>
              <div>API Status: {error ? 'Failed' : 'Success'}</div>
            </div>
            
            <MapContainer 
              center={position} 
              zoom={15} 
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position} />
              <MapUpdater position={position} />
            </MapContainer>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <p>No location data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerTrackPage;