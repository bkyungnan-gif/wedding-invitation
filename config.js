/*
  초보자용 설정 파일입니다.
  아래 [수정하세요]라고 적힌 부분을 바꾸면 청첩장 내용이 바뀝니다.
  사진은 assets 폴더에 넣고 파일명을 아래와 똑같이 맞춰주세요.
*/
const WEDDING = {
  groom: "신랑 이름",                         // [수정하세요]
  bride: "신부 이름",                         // [수정하세요]
  date: "2028-10-21",                         // [수정하세요] YYYY-MM-DD 형식
  time: "오후 2시",                           // [수정하세요]
  venue: "예식장 이름",                       // [수정하세요]
  city: "서울",                               // [수정하세요]
  address: "서울특별시 ○○구 ○○로 00",        // [수정하세요]
  invitation: "서로 다른 길을 걸어온 두 사람이\\n이제 같은 방향을 바라보며\\n새로운 시작을 함께하려 합니다.\\n\\n소중한 분들을 모시고\\n저희의 첫걸음을 나누고 싶습니다.\\n따뜻한 마음으로 함께해 주시면 감사하겠습니다.",
  groomParents: "신랑 측 혼주 성함",           // 필요 없으면 ""로 비우세요
  brideParents: "신부 측 혼주 성함",           // 필요 없으면 ""로 비우세요
  naverMapUrl: "",                             // 네이버 지도 링크를 붙여넣으세요
  kakaoMapUrl: "",                             // 카카오맵 링크를 붙여넣으세요
  transport: "대중교통 안내를 입력해주세요.\\n주차 안내를 입력해주세요.", // [수정하세요]
  gallery: [
    "assets/gallery-01.jpg",
    "assets/gallery-02.jpg",
    "assets/gallery-03.jpg",
    "assets/gallery-04.jpg",
    "assets/gallery-05.jpg"
  ],
  accounts: [
    // 실제 사용할 때 계좌 정보를 입력하세요. 미사용 항목은 삭제하거나 빈 값으로 두세요.
    { group: "신랑 측", relation: "신랑", name: "", bank: "", number: "" },
    { group: "신부 측", relation: "신부", name: "", bank: "", number: "" }
  ],
  contacts: [
    // 전화번호를 입력하면 전화/문자 링크가 표시됩니다. 예: "010-1234-5678"
    { label: "신랑에게 연락하기", name: "신랑", phone: "" },
    { label: "신부에게 연락하기", name: "신부", phone: "" },
    { label: "신랑 측 혼주", name: "혼주", phone: "" },
    { label: "신부 측 혼주", name: "혼주", phone: "" }
  ]
};
