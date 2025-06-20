import React from "react";
import VideoPlayer from "../components/VideoPlayer";
import Sidebar from "../components/Sidebar";
import Notifications from "../components/Notifications";

export default function Home() {
  return (
    <div>
      <div>
        <VideoPlayer />
        <Sidebar>
          <Notifications />
        </Sidebar>
      </div>
    </div>
  );
}
