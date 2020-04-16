# SJ-TODO 기능정리

## 1. 등록 된 Todo 목록을 보여준다

![SJ%20TODO/Untitled.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/aabc4169-6571-4756-a4cc-c9aa3171ea8e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200416T121059Z&X-Amz-Expires=86400&X-Amz-Signature=4f527b174aaff6c609d46f2d24ad54df16b06bd0a134feba05a8b63b63c00da2&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

## 2. 할 일을 입력 후 엔터 혹은 + 버튼을 누르면 새 Todo가 TodoList에 추가 된다.

이 때 빈 값은 추가되지 않도록 유효성 체크를 한다

![SJ%20TODO/Untitled%201.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6f84cd6a-79c9-4480-8095-c87171360774/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200416T121143Z&X-Amz-Expires=86400&X-Amz-Signature=42a6868054118b8acb63174eb6547a2692deec15ccc32d310e2db08c087f2bde&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

## 3. 🗑 (removed) 상태가 될 수 있다

삭제시 목록에 표현되지 않는다

![SJ%20TODO/Untitled%202.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/61a94be6-6378-42d6-bf41-36e4e803e925/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200416T121211Z&X-Amz-Expires=86400&X-Amz-Signature=a6303faef889d47fd31c2a604a9f396032cf4fb71fd489deef75b28a0732760a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

## 4. ☆(star), ✔️(done) 상태가 될 수 있다

star 체크시 목록의 상단으로 위치가 변경 된다

![SJ%20TODO/Untitled%203.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/df28b62a-8c7d-4614-a761-34426b2693b8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200416T121225Z&X-Amz-Expires=86400&X-Amz-Signature=980adb0deefb8c71e24dc1fad4fb4ca0af9b37710a0eef8447b03835f1719fd1&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

## 5. 타이틀을 변경할 수 있다.

title과 setTitle을 props로 받으면 좋을 듯

![SJ%20TODO/Untitled%204.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/63e9c23e-294d-49a3-a5b2-a05a5ef52ac8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200416T121240Z&X-Amz-Expires=86400&X-Amz-Signature=a4a65dad986c433948ed2be727cf0bd10e3f13f52187e66a14538a12c10a74b7&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)
