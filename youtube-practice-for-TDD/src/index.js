import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import NotFound from "./pages/NotFound";
import Videos from "./pages/Videos";
import VideoDetail from "./pages/VideoDetail";

// createBrowserRouter로 경로 지정
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <App />,
    children: [
      { index: true, path: "/", element: <Videos /> },
      { path: "/videos", element: <Videos /> },
      { path: "/videos/:keyword", element: <Videos /> },
      { path: "/videos/watch/:videoId", element: <VideoDetail /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")); // virtual DOM의 시작점 id="root"에 render(index.html)
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} /> // RouterProvider를 이용해서 구성요소들을 전달하고 활성화한다.
  // </React.StrictMode>
);

reportWebVitals();
