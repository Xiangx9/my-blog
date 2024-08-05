import React, { Suspense, useState } from "react";
import { useRoutes, Link } from "react-router-dom";
import Router from "@/router/routes";
import "./index.scss";
import dayjs from "dayjs";
import { useRequest } from "ahooks";

function App() {
  // 实时获取时间
  const [time, setAnswer] = useState("");
  function getTime() {
    let time = dayjs().format("YYYY-MM-DD HH:mm:ss");
    setAnswer(time);
  }
  useRequest(getTime, {
    pollingInterval: 1000,
    pollingWhenHidden: false,
  });
  
  return (
    <div>
      <Suspense fallback="Loading...">
        <div>{useRoutes(Router)}</div>
        <div className="posiTion">{time}</div>
      </Suspense>
    </div>
  );
}

export default App;
