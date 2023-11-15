import React from "react";
import { formatAgo } from "../util/date";
import { useNavigate } from "react-router-dom";

export default function VideoCard({ video, type }) {
  const { title, channelTitle, thumbnails, publishedAt } = video.snippet; // video에 대한 구조 분해 할당
  const decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }; // 데이터에 있는 추가적인 text 정보를 간략하게 만들어주는 기능을하는 구문(HTML 문자열 디코딩)
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate() 함수
  const handleClick = () => {
    navigate(`/videos/watch/${video.id}`, { state: { video } }); // useNavigate() 함수로 이동할 페이지의 url, 그 페이지에서 사용될 데이터 video객체를 state로 전달
  }; // tag의 속성 중에서 onClick이 발생할 때 실행될 함수
  // MY: navigate 두번째 인자에 객체를 전달할 수 있다 state라는 key를 사용한다
  const isList = type === "list"; // props로 받아온 type이 list 일 때 와 아닐 때에 따라서 css가 바꾸기 위해서 list를 정의 하는 구문..???

  return (
    <li className={isList ? "flex gap-1 m-2" : ""} onClick={handleClick}>
      <img className={isList ? "w-60 mr-2" : "w-full"} src={thumbnails.medium.url} alt={title} />
      <div className="">
        <p className="font-semibold my-2 line-clamp-2">{decodeHtml(title)}</p>
        <p className="text-sm opacity-80">{channelTitle}</p>
        <p className="text-sm opacity-80">{formatAgo(publishedAt)}</p>
      </div>
    </li>
  );
}
