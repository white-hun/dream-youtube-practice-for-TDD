import React from "react";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "./VideoCard";

export default function RelatedVideos({ id }) {
  const { youtube } = useYoutubeApi(); // youtube api를 사용하기 위해 불러온다
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["related", id], () => youtube.relatedVideos(id)); // youtube api의 relatedVideos에서 규칙에 맞는 데이터를 가져와 사용한다
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong.</p>}
      {videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} type="list" />
          ))}
        </ul>
      )}
    </>
  );
}
