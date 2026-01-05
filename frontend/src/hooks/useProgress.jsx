import React, { useEffect, useState } from 'react'
import { API_PATH, Base_URL } from '../utils/ApiPath'
import { useSelector } from 'react-redux'


export const useProgress = () => {  // A custom hook to track the progress
     const {tab}=useSelector(res=>res?.Tab)
      const [status, setstatus] = useState("Uploading")
      const [progress, setprogress] = useState(0)
     useEffect(() => {
  if (!tab) return;

  const events = new EventSource(Base_URL + tab);
  events.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
console.log(data);

      if (data.progress !== undefined) setprogress(data.progress);
      if (data.status) setstatus(data.status);
    } catch (err) {
      console.log("Invalid SSE data", err);
    }
  };

  events.onerror = () => {
    console.log("SSE connection closed");
    events.close();
  };

  return () => events.close();
}, [tab]); // ✅ tab added

 return {progress,status}
}
