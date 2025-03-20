"use client";
import React, { useEffect, useRef, useState } from "react";

const SlideViewer: React.FC = () => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [dziUrl, setDziUrl] = useState("/clinic/clinic.png");
  useEffect(() => {
    const response = async () => {
      const res = await fetch("/api/convertToDZI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imagePath: "/clinic/clinic.png" }),
      });
      const data = await res.json();
      if (data.success) {
        console.log(data.dziPath);
        setDziUrl(data.dziPath);
      }
      console.log(data);
    };
    response();
  }, []);
  useEffect(() => {
    if (!viewerRef.current || !dziUrl) return;
    let viewerInstance: OpenSeadragon.Viewer 
    const initViewer = () => {
      import("openseadragon").then((module) => {
        const OpenSeadragon = module.default;
        if (viewerRef.current && dziUrl) {
          
          viewerInstance = OpenSeadragon({
            id: "openseadragon-viewer",
            prefixUrl: "/openseadragon-images/",
            tileSources: {
              type: "image",
              url: dziUrl,
            },
            showNavigator: true,
            navigatorId: "navigator",
            zoomInButton: "zoom-in",
            zoomOutButton: "zoom-out",
            homeButton: "home",
            fullPageButton: "full-page",
            maxZoomPixelRatio:10
          });
          document.getElementById("zoom-in")?.addEventListener("click", () => {
            viewerInstance.viewport.zoomBy(1.1); // Zoom in by 10%
          });
          document.getElementById("zoom-out")?.addEventListener("click", () => {
            viewerInstance.viewport.zoomBy(0.9); // Zoom out by 10%
          });
          document.getElementById("home")?.addEventListener("click", () => {
            viewerInstance.viewport.goHome(); // Reset to the home view
          });
          document.getElementById("full-page")?.addEventListener("click", () => {
            viewerInstance.setFullScreen(true); // Enable full-screen mode
          });
        }
      });
    };

    /*  viewer.addHandler('open', () => {
        viewer.addOverlay({
          element: document.createElement('div'),
          location: new OpenSeadragon.Rect(0.4, 0.4, 0.2, 0.2),
          placement: OpenSeadragon.Placement.CENTER
        });
      }); */
      setTimeout(initViewer,0)
    return () => {
      if (viewerInstance) {
        viewerInstance.destroy();
      }
    };
  }, [dziUrl]);

  return (
    <div className="relative">
      <div
        id="openseadragon-viewer"
        ref={viewerRef}
        className="w-full h-[600px] border border-gray-300"
      ></div>
      <div
        id="navigator"
        className="w-[200px] h-[150px] absolute top-2 right-2"
      ></div>
      <div className="mt-2">
        <button id="zoom-in" className="bg-blue-500 text-white px-4 py-2 mr-2">
          Zoom In
        </button>
        <button id="zoom-out" className="bg-blue-500 text-white px-4 py-2 mr-2">
          Zoom Out
        </button>
        <button id="home" className="bg-blue-500 text-white px-4 py-2 mr-2">
          Home
        </button>
        <button id="full-page" className="bg-blue-500 text-white px-4 py-2">
          Full Page
        </button>
      </div>
    </div>
  );
};

export default SlideViewer;
