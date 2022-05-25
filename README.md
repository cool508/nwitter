# 배종범
## Nwitter 2022
>github.com/easysIT/nwitter
### 05.18
<details>
<summary>트윗 목록 출력</summary>

- Home.js
```js
// 트윗 목록 출력
// 코드 추가
<>
    <div>
        {nweets.map((nweet) => (
            <div key={nweet.id}>
                <h4>{nweet.text}</h4>
            </div>    
        ))}
    </div>
</>
```
- 작성자 표시하기 : [관련 코드](https://github.com/hyeongjuSung/nwitter/commit/72e7125d5e646ce05bb8a87f4c919b070f32f3f1)

- Home.js
```js
//getNweets 함수 삭제
// 코드 삭제
const getNweets = async () => {
        const dbNweets = await dbService.collection("nweets").get();

        dbNweets.forEach((document) => {
            const nweetObject = { ...document.data(), id: document.id };
            setNweets((prev) => [nweetObject, ...prev])
        });
};

getNweets();

// onSnapShot 함수 적용
// 코드 추가
useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNweets(newArray);
        });    
    }, []);
```

- Nweet.js
```js
// 트윗 컴포넌트 분리
// components/Nweet.js 생성
// 코드 추가

const Nweet = ({ nweetObj }) => {
    return (
        <div>
            <h4>{nweetObj.text}</h4>
        </div>
    );
};

export default Nweet;
```
- Home.js
```js
// 코드 추가
import Nweet from "components/Nweet";
// 코드 수정
{nweets.map((nweet) => (
    <Nweet key={nweet.id} nweetObj={nweet}/>    
))}
```
</details>
<details>
<summary>수정, 삭제 버튼</summary>

- Nweet.js
```js
// 수정, 삭제 버튼 추가
<button>Delete Nweet</button>
<button>Edit Nweet</button>
```
- Home.js
```js
// 본인이 쓴 트윗만 관리
// 코드 추가
isOwner={nweet.creatorId === userObj.uid}
```
- Nweet.js
```js
// 코드 수정
{isOwner && (
    <>
        <button>Delete Nweet</button>
        <button>Edit Nweet</button>
    </>
)}
// 버튼에 삭제 기능 추가
// 코드 추가
const oneDeleteClick = () => {
    const ok = window.confirm("삭제하시겠습니까?");
    console.log(ok);
}
<button onClick={oneDeleteClick}>Delete Nweet</button>

import { dbService } from "fbase";
if (ok) {
            console.log(nweetObj.id);
            const data = await dbService.doc(`nweets/${nweetObj.id}`).delete();
            console.log(data);
        }  
```
</details>

### 05.11

<details>
<summary>샘플 데이터 저장</summary>

- Cloud Firestore -> 컬렉션 시작 -> 컬렉션 ID: nwitter -> 자동 ID, 필드, 유형, 값 입력 후 저장
- fbase.js
```js
// React에서 firebase DB 사용
// 코드 추가
import "firebase/firestore";

export const dbService = firebase.firestore();

// 오류 발생 시
import "firebase/compat/firestore";
```
- Home.js
```js
// Firestore에 데이터 저장 : Create
// 코드 추가
import { dbService } from "fbase";

const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
        });
        setNweet("");
    };
// Firestore에서 문서 읽어오기 : Read
// 코드 추가
import { useEffect, useState } from "react"

const getNweets = async () => {
        const dbNweets = await dbService.collection("nweets").get();
        console.log(dbNweets);
    };

    useEffect(() => {
        getNweets();
    }, []);
// 스냅샷 확인
// 코드 삭제
console.log(dbNweets);
// 코드 수정
dbNweets.forEach((document) => console.log(document.data()));

// 받은 데이터 게시물 목록 만들기
// 코드 수정
const [nweets, setNweets] = useState([]);

 dbNweets.forEach((document) => 
            setNweets((prev) => [document.data(), ...prev])
        );

// 트윗 아이디 저장
// 코드 수정
dbNweets.forEach((document) => {
            const nweetObject = { ...document.data(), id: document.id };
            setNweets((prev) => [nweetObject, ...prev])
        });
```
</details>

### 05.04

<details>
<summary>firebase로 로그인과 회원가입 처리2</summary>

- Auth.js
```js 
// provider 적용
// 코드 수정
import { authService, firebaseInstance } from "fbase";

const onSocialClick = (event) => {
        const {
            target: {name},
        } = event;
        let provider;
        if(name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
    };
...
}
```

- Auth.js
```js
// 소셜로그인 완성
// 코드 수정
const onSocialClick = async (event) => {
        const {
            target: {name},
        } = event;
        let provider;
        if(name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };
```
- 네비게이션 컴포넌트 만들기
```js
// components 폴더에 Navigation.js 생성
// 코드 추가
const Navigation = () => {
    return <nav>This is Navigation</nav>
};

export default Navigation;
```
- Router.js
```js
// 네비게이션 컴포넌트 Router.js에 추가
import Navigation from "./Navigation";

{isLoggedIn && <Navigation />}
```

- Navigation.js
```js
// 링크 추가
// 코드 추가
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">My Profile</Link>
                </li>
            </ul>
        </nav>
    );
};
```

- Router.js
```js
// 링크 추가
// 코드 추가
import Profile from "routes/Profile";

<Route exact path="/profile">
   <Profile />
</Route>
```

- profile.js
```js
// 로그아웃 버튼
// 코드 추가
import { authService } from "fbase"

const onLogOutClick = () => authService.signOut();

    return (
        <>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    );
```
- Router.js
```js
// 로그아웃 후 주소 이동
// 코드 추가
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

<Redirect from="*" to="/" />

// useHistory로 로그아웃
// 코드 삭제
import {  Redirect } from "react-router-dom";

<Redirect from="*" to="/" />
```
- Profile.js
```js
// useHistory로 로그아웃 후 주소 이동
// 코드 추가
import { useHistory } from "react-router-dom";

const history = useHistory();

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
```
- Home.js
```js
// 트윗을 위한 폼
// 코드 추가
import { useState } from "react"

const Home = () => {
    const [nweet, setNweet] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: {value},
        } = event;
        setNweet(value);
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
            />
            <input type="submit" value="Nweet" />    
        </form>
    );
};
```
- 트윗을 위한 firebaseDb 생성 : Firebase 접속 -> Firebase Database -> 데이터베이스 만들기 -> 테스트 모드에서 시작 -> 위치설정

</details>

### 04.27

<details>
<summary>firebase로 로그인과 회원가입 처리</summary>

- Auth.js 
```js
# 코드 추가 후 Create Account로 회원가입 정상 동작 확인
import { authService } from "fbase";

const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if(newAccount) {
                //create newAccount
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch(error) {
            console.log(error);
        }
    }
```
- 로그인 지속 setPersistence : 파이어베이스 로그인 상태 지속 방법, 웹 브라우저 종료 시에도 로그인 유지(local 옵션 사용, 기본값)
- IndexedDB : local 옵션, 저장한 사용자 로그인 정보 담는 DB (개발자도구 -> Application -> Storage -> IndexedDB -> firebaseLocalStorageDB 확인 가능), IndexedDB clear시 수동 로그아웃O
- App.js 
```js
// setInterval로 딜레이 확인
setInterval(() => console.log(authService.currentUser), 2000);

// useEffect firebase 초기화되는 시점, 로그인 완료 후 보여줄 화면 렌더링
import { useEffect, useState } from "react";

useEffect(() => {
    authService.onAuthStateChanged((user) => console.log(user));
  }, []);

  const [ init, setInit ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => console.log(user));
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      <AppRouter iaLoggedIn={isLoggedIn} />
      {init ? <AppRouter iaLoggedIn={isLoggedIn} /> : "initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );  
```
- Auth.js 에러 및 에러 메세지 처리
```js
// 코드 수정
const [error, setError] = useState("");

catch(error) {
  setError(error.message);
}
// 로그인 / 로그아웃 토글 버튼
// 코드 추가
const toggleAccount = () => setNewAccount((prev) => !prev);

 <span onClick={toggleAccount}>
    {newAccount ? "Sign In" : "Create Account"}
</span>

// 소셜 로그인 구별
// 코드 추가
const onSocialClick = (event) => {
  console.log(event.target.name);
};

<button onClick={onSocialClick} name="google">Continue with Google</button>
<button onClick={onSocialClick} name="github">Continue with Github</button>
```
- fbase.js
```js
// firebaseInstance 추가
export const firebaseInstance = firebase;
```

</details>

### 04.13

<details>
<summary>firebase 로그인 추가</summary>

- 이메일 사용설정 O
- 구글 사용설정 O, 프로젝트 지원 이메일 -> 자기 이메일 
- Github 
```
1. 하단 주소 복사
2. github 로그인 -> 우측 상단 아이콘 클릭 setting -> developer setting
3. OAuth app -> callbackURL에 주소 복사한거 붙여넣기
4. HomePage URL : firebase 페이지 -> http:// + 승인된 도메인 2번째 내용 복붙
5. 생성
6. Github 사용 설정-> Client secrets 생성 후 ID 와 password 입력 후 저장
```
</details>

<details>
<summary>Auth.js 수정</summary>
   
```
const Auth = () => {
    return (
        <div>
            <form>
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <input type="submit" value="Log In" />
            </form>
            <div>
                <button>Continue with Goolge</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
};
export default Auth

```

</details>
<details>
<summary>Auth.js 수정 2</summary>
   
```
import { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const onChange = (event) => {
        const {
            target: {name, value},
        } = event;
        if ( name === "email") {
            setEmail(value);
        } else if ( name === "password") {
            setPassword(value);
        }
    }
    
    const onSubmit = (event) => {
        event.preventDefault();
        if (newAccount) {
            // create newAccount
        } else {
            // Log in
        }
    }

    return (
        <div>
            <form>
                <input type="email" name="email" placeholder="Email" required  value={ email } onChange={ onChange } />
                <input type="password" placeholder="Password" required value={ password } onChange={ onChange } />
                <input type="submit" value={ newAccount ? "Create Account" : "Log In" }  />
            </form>
            ...

```

</details>

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
	