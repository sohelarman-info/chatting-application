import React, { useEffect, useState } from "react";
import "./style.css";

const InternetConnection = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  console.log("online status");
  return (
    <div className="online-area">
      {isOnline ? (
        <p>You are online.</p>
      ) : (
        <p>You are offline. Please check your internet connection.</p>
      )}
    </div>
  );
};

export default InternetConnection;
