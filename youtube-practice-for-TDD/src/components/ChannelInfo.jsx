import React from "react";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import { useQuery } from "@tanstack/react-query";

export default function ChannelInfo({ id, name }) {
  const { youtube } = useYoutubeApi();
  const { data: url } = useQuery(["channel", id], () => youtube.channelImageURL(id), {
    staleTime: 1000 * 60 * 5,
  }); // youtube api의 channelImageURL에서 url을 가져와 사용한다.
  return (
    <div className="flex my-4 mb-8 items-center">
      {url && <img className="w-10 h-10 rounded-full" src={url} alt={name} />}
      <p className="text-lg font-medium ml-2">{name}</p>
    </div>
  );
}

// useQuery
// 서버로부터 데이터를 조회해올 때(<=> 데이터 조회가아닌 데이터 변경 작업을 할 때는 useMutation 사용)
// queryKey와 queryFn을 포함한다.
// queryKey: React Query가 캐싱을 관리 할 수 잇도록 도와준다.
// queryKey의 형태
// ex1)const res = useQuery('example', queryFn); // 문자열로 작성된 경우는 자동으로 길이가 1인 배열로 인식한다, 따라서 ex2와 동일한 코드
// ex2)const res = useQuery(['example'], queryFn);
// ex3)const res = useQuery(['example', 'add Id'], queryFn); // queryKey가 할당될 때 배열에 입력되는 순서도 보장해주기 때문에 ex4와 다른 queryKey를 가진다
// ex4)const res = useQuery(['add Id', 'example'], queryFn);
// ex5)const res = useQuery(['example', {type: 'add', name: 'Id'}], queryFn);

// queryFn: promise 처리가 이루어지는 함수(axios를 이용해 서버에 API 요청하는 코드)
// queryFn의 형태
// ex1)
//const res = useQuery(['example'], () => axios.get('http://localhost:3000/example'));

// ex2)
//const res = useQuery({
//    queryKey: ['example'],
//    queryFn: () => axios.get('http://localhost:3000/example')
//});

// staleTime의 default 값은 0초 이기 때문에 서버로부터 fresh한 데이터를 전달 받기 위해 refetch가 이루어진다.
// React Query는 stale한 데이터를 사용자에게 보여주는 것을 무의미하다고 판단한다.
// 데이터를 한번 조회한 순간부터 해당 데이터는 stale한 데이터이다.
// cacheTime staleTime과 유사한 역할을 수행하며, default값은 5분이다.
// useQuery에는 staleTime, cacheTime 두 개념이 모두 존재하기 때문에 둘 중 하나라도 만족되지 않으면 서버에 다시 데이터를 요청하게 된다.
// 두 개념을 모두 고려하여 코드를 구현
// staleTime, cacheTime 작성 형태
// ex1)
// const res = useQuery(['example'], () => axios.get('http://localhost:3000/example'), {
//     staleTime: 5000, // 5초
//     cacheTime: Infinity, // 제한 없음
// });

// ex2)
// const res = useQuery({
//     queryKey: ['example'],
//     queryFn: () => axios.get('http://localhost:3000/example'),
//     staleTime: 5000, // 5초
//     cacheTime: Infinity // 제한 없음
// });
