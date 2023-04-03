# EVERYTIME - 소셜 네트워크 서비스 앱

## Description

<br/>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FUPOWT%2Fbtr7HfDGQTB%2FQyzRTalxzsJEBfxfrKnthk%2Fimg.png"/>

PlanetScale을 메인 DB로 NextJS를 사용하여 구현한 Serverless 웹 어플리케이션 입니다  
소셜 네트워크 서비스의 기능인 게시글 작성, 회원가입, 1:1채팅, 북마크, 댓글기능을 구현하였습니다.

## Deploy

> [everytime.vercel.app](everytime.vercel.app)

## Installation

**환경 변수를 사용하여 실행이 어려울 수 있습니다.**  
`npm install`  
`npm run dev`

## Main Feature

- Feed 작성 시 Drag&Drop 이미지 업로드
  - addEventListener를 활용하여 이미지를 업로드 할 수 있도록 하였습니다.
- 단발성 게시글들에 대한 Infinite Scroll
  - prisma의 cursor를 사용해 Cursor-based pagination을 구현하였습니다.
  - Client에서는 useInfinityQuery를 활용하였고, 마지막 게시물의 id를 param으로 이용하면서 게시글 탐색 중에 글이 추가되어도 중복되는 데이터가 표시되는 오류를 해결하였습니다.
- Auth.js를 이용한 로그인 및 회원가입, 소셜로그인
  - Auth.js를 Prisma와 연동하여 구글로그인 시 데이터가 Planet Scale에 저장되도록 하였습니다.
  - 소셜로그인 외에도 일반 로그인을 할때 토큰을 발행하도록 구현하였습니다.
- CloudFlare를 활용한 이미지 / 비디오 업로드
  - Direct Creator Upload 기능을 사용하여 사용자가 일회성 URL로 이미지를 업로드 할 수 있도록 하였습니다.
  - 이로 인해 API Key나 Token을 노출하지 않고 업로드를 할 수 있었습니다.
- 반응형 클라이언트 뷰 구현
  - 반응형 뷰를 구현하기에 장점이 있는 TailwindCSS를 채택하였습니다.
- Firebase를 활용한 1:1 채팅
  - onSnapshot 메서드를 활용하여 실시간으로 DB 정보를 불러올 수 있는 점을 활용해 채팅을 구현하였습니다.

## Architecture

<p align="center">
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbldD9i%2FbtrXn5RjKN4%2F8EtWODkyJjIQgl5cFoYvKK%2Fimg.png"/>
</p>

## Commit Message Prefix

- Feat: 새로운 기능 추가
- Fix: 버그 수정
- Docs: 문서 수정, 파일 추가 및 삭제, 파일명 변경
- Style: 스타일 관련 기능(코드 포맷팅, 세미콜론 누락 등)
- Refactor: 코드 리팩토링
- Test: 테스트 코드, 리펙토링 테스트 코드 추가
- Chore: 빌드 업무 수정, 패키지 매니저 수정(.gitignore 수정 등)
- Init: 초기셋팅 (esLint 적용 등)

## Skill Stack

- Front-end : Typescript, NextJS, TailwindCSS
- Serverless: Firebase(Chatting Server), NextJS
- Database: PlanetScale
- TypeORM : Prisma
- Deploy : Vercel
