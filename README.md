# 배종범
## Nwitter 2022
>github.com/easysIT/nwiiter
### 04.06

<details>
<summary>Router.js에 IMPORT useState</summary>
   
```
import { useState } from "react";
...
const AppRouter = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  return ( ...
```

</details>

<details>
<summary>Router.js 코드 추가</summary>

```
<Router>
    <Swich>
        {isLoggedIn ? (
            <Route exact path="/">
                <Home />
            </Route>
            ) : (
            <Route exact path="/">
                <Auth />
            </Route>
        )}
    </Swich>
</Router>
```

- react-router-dom의 버전이 v6 이라면 Switch => Routes로 변경
```
react-router-dom 다운그레이드 시키기
npm react-router-dom@5.2.0
```
</details>

<details>
<summary>App.js 수정하기</summary>

```
return <AppRouter />
```

</details>

<details>
<summary>App.js 수정하기 - useState 추가</summary>

```
import {useState} from "react"
...
const [ isLoggedIn, setIsLoggedIn ] = useState(false);  return (
    <>
      <AppRouter isLoggedIn={ isLoggedIn }/>
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
) 
```

</details>

<details>
<summary>Router.js 수정하기</summary>

```
삭제
import {useState} from "react" 
const [ isLoggedIn, setIsLoggedIn ] = useState(false);  

변경
const AppRouter = ({isLoggedIn}) ...
return (
) 
```

</details>

<details>
<summary>jsconfig.json 생성</summary>

src
```
{
    "compilerOptions": {
        "baseUrl": "src"
    },
    "include": ["src"]
}
```

</details>

<details>
<summary>firebase.js -> fbase.js 파일명 변경</summary>

```
fbase.js

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
...
firebase.initializeApp(firebaseConfig);
export const authService = firebase.auth();

```

</details>

<details>
<summary>Router / App / index JS파일 수정</summary>

```
index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
...

App.js

import AppRouter from "components/Router";
import {useState} from "react"; 
import {authService} from "fbase";
...

Router.js

import Auth from "routes/Auth";
import Home from "routes/Home";
...

```

</details>

### 03.30
<details>
<summary>Firebase 프로젝트 생성 및 설정</summary>

- firebase 사이트 
1. 프로젝트 이름 : nwitter /
2. 생성 시 체크하는 것들은 다 해제
3. 웹 앱으로 설정

- firebase 설치
```
npm install firebase
```

- src/firebase.js 생성 후 붙여넣기
```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

...

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

- firebase Import 시키기
index.js
```
[Firebase 8버전 이하]
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

[Firebase 9버전 이하]
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
```

- env 파일 환경 변수 설정
1. root 경로에서 .env 생성
2. firebase.js -> Config 내용 삽입
```
REACT_APP_API_KEY = ... 
REACT_APP_AUTH_DOMAIN = ... 
REACT_APP_PROJECT_ID = ...
REACT_APP_STORAGE_BUCKET = ... 
REACT_APP_MESSAGING_SENDER_ID = ... 
REACT_APP_APP_ID = ...
```
- gitignore에 .env 추가

- firebase.js에서 firebaseConfig의 value 값 env으로 변경
```
  apiKey: process.env.REACT_APP_API_KEY,
  ...
```

- src/routes 폴더 생성
```
Auth / EditProfile / Home / Profile JS 파일 생성
각 파일에 아래 내용 추가

const 파일명 = () => <span>파일명</span>

export default 파일명
```
- src/components 폴더 생성
App.js 파일 이동

- react-router-dom 설치
```
Switch 사용하기위해 v5 버전 다운
npm react-router-dom@5.2.0
```

- components/Router.js 생성
```
import { HashRouter as Router, Route, Swich } from "react-router-dom";

const AppRouter = () => {
    return (
        <Router>
            <Swich>
                <Route />
            </Swich>
        </Router>
    )
}

export default AppRouter
```

</details>

### 03.23
nwitter 프로젝트 생성
```
npx create-react-app 프로젝트명
```
Git 명령어
```
git init // .git 파일 생성
git remote origin add [주소] // github 레포지토리와 연동
git add . // 작업한 파일 추가
git commit -m "커밋 메세지" // commit 진행
git push origin master // 푸시 진행
```

<details>
<summary>파일 수정</summary>

- package.json
- index.js
-	App.js 
</details>

<details>
<summary>파일 삭제</summary>

App.css / App.test.js / index.css / logo.svg / reportWebVitals.js / setupTest.js 
</details>
	