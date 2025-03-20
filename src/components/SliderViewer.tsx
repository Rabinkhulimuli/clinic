"use client"
import React, { useEffect, useRef } from 'react';
import OpenSeadragon from 'openseadragon';

const SlideViewer: React.FC = () => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewerRef.current) {
      const viewer = OpenSeadragon({
        id: "openseadragon-viewer",
        prefixUrl: "/openseadragon-images/",
        tileSources: {
          type: 'image',
          url: '/clinic/clinic.png'
        },
        showNavigator: true,
        navigatorId: "navigator",
        zoomInButton: "zoom-in",
        zoomOutButton: "zoom-out",
        homeButton: "home",
        fullPageButton: "full-page"
      });

      viewer.addHandler('open', () => {
        viewer.addOverlay({
          element: document.createElement('div'),
          location: new OpenSeadragon.Rect(0.4, 0.4, 0.2, 0.2),
          placement: OpenSeadragon.Placement.CENTER
        });
      });
    }
  }, []);

  return (
    <div className="relative">
      <div id="openseadragon-viewer" ref={viewerRef} className="w-full h-[600px] border border-gray-300"></div>
      <div id="navigator" className="w-[200px] h-[150px] absolute top-2 right-2"></div>
      <div className="mt-2">
        <button id="zoom-in" className="bg-blue-500 text-white px-4 py-2 mr-2">Zoom In</button>
        <button id="zoom-out" className="bg-blue-500 text-white px-4 py-2 mr-2">Zoom Out</button>
        <button id="home" className="bg-blue-500 text-white px-4 py-2 mr-2">Home</button>
        <button id="full-page" className="bg-blue-500 text-white px-4 py-2">Full Page</button>
      </div>
    </div>
  );
};

export default SlideViewer;