import React, { useEffect, useState } from "react";
import { BsYoutube, BsSearch } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function SearchHeader() {
  const { keyword } = useParams(); // 파라미터를 가져오기 위해 useParams()를 사용
  const navigate = useNavigate(); // 페이지를 이동하기 위한 useNavigate()함수
  const [text, setText] = useState(""); // text에 값을 저장하기 위한 useState()함수, 기본값은 빈 문자열("")이다
  const handleChange = (e) => setText(e.target.value); // input tag의 onChange 속성을 사용해서 값이 바뀔 때 text에 바뀐 값 저장
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지가 새로고침 되지 않기 위한 함수
    navigate(`/videos/${text}`); // input tag에 입력되어 저장된 text 값을 파라미터로 포함하는 url로 페이지 이동 함수 실행
  }; // 제출되면(작성 후 enter) 새로고침 하지 않고 페이지 이동
  useEffect(() => setText(keyword || ""), [keyword]); // []의 값의 변경될 때만 실행되는 useEffect()함수로 keyword가 변경될 때 마다 text를 업데이트
  return (
    <header className="w-full flex p-4 text-2xl border-b border-zinc-600 mb-4">
      <Link to="/" className="flex items-center">
        <BsYoutube className="text-4xl text-brand" />
        <h1 className="font-bold ml-2 text-3xl">YouTube</h1>
      </Link>
      <form onSubmit={handleSubmit} className="w-full flex justify-center">
        <input
          className="w-7/12 p-2 outline-none bg-black text-gray-50"
          type="text"
          placeholder="검색"
          value={text}
          onChange={handleChange}
        />
        <button className="bg-zinc-600 px-4">
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
// 파라미터=매개변수=입력변수
// 현재 페이지의 Pathname을 가져오려면 useLocation()을 사용해야 한다
