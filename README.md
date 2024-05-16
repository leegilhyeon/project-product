1. 프로젝트 : 나만의 내배캠 장터 백엔드 서버 만들기


2. 프로젝트 설명
   => Node.js와 Express.js를 활용하여 웹 서버 만들기
  1) 필수사항 :  장터에 등록할 상품 생성 API와 상품목록 조회, 상품 상세정보 조회, 상품 수정, 상품 삭제 API 구현하기
  2) 선택사항 : 에러처리 미들웨어 사용과 유효성 검증(Joi)

3. 기술스택
   1) 웹 프레임워크: Node.js에서 가장 대표적인 웹 프레임워크인 Express.js를 사용
   2) 패키지 매니저: 대형 코드의 일관성, 보안, 성능 문제 해결에 적합한 yarn 패키지 매니저를 사용
   3) 모듈 시스템: 최신 JS 문법을 지원하는 ESM(ES6 모듈 시스템)을 사용
   4) 데이터베이스: 대표적인 NoSQL 중 하나인 MongoDB를 직접 설치하지 않고, Cloud 서비스인 MongoDB Atlas에서 대여해 사용
   5) ODM: MongoDB의 데이터를 쉽게 읽고 쓰게 해주는 mongoose ODM을 사용

4. 순서
   1) API 명세서 확인
     ![image](https://github.com/leegilhyeon/project-product/assets/164996803/2235959a-27bf-46c8-a48c-3cb6a03dca1c)

   3) 개발 환경 세팅
      - .env 파일을 이용해서 민감한 정보(DB 계정 정보 등)를 관리
      -  .gitignore 파일을 생성하여 .env ,node_modules 등 불필요하거나 민감한 정보가 Github에 올라가지 않도록 설정
      -  .prettierrc 파일을 생성하여 일정한 코드 형태를 유지할 수 있도록 설정
      -  package.json 파일의 scripts 항목에 dev 라는 이름을 추가하여 nodemon을 이용해서 서버를 실행할 수 있도록 합
      -  mongoDB 계정 만들고 서버대여하기
      -  mongoose 설치
      -  구현한 API가 정상적이로 동작하는지 확인하기위한 Insomnia Client 설치
   5) 필수 개발 API 구현
      -상품 생성 API
      -상품 목록 조회 API
      -상품 상세 조회 API
      -상품 수정 API
      -상품 삭제 API
   7) 테스트
      - Insomnia를 이용하여 api 테스트
   9) 배포
  

