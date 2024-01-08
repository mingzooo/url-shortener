## URL shortener 프로젝트 소개

biy.ly(비틀리)처럼 긴 url을 입력하면 짧은 url을 반환해주는 URL 단축기

- URL 입력폼 제공
- 단축 후 결과출력
- 동일한 URL을 입력 할 경우 항상 동일한 shortening 결과 값이 나와야 함
- shortening 의 결과 값은 8문자 이내로 생성
- 브라우저에서 shortening URL을 입력하면 원래 URL로 리다이렉트
- 도메인은 localhost 로 처리

https://github.com/sgdevcamp2023/sgwannabe/assets/62490238/8514cad1-837f-4915-a9cc-1fb6f49ab74c

### 기술

- Next.js
- Prisma
- MySQL
- tailwind CSS

### 설계

![image](https://github.com/sgdevcamp2023/sgwannabe/assets/62490238/4b75bd65-3694-4836-a5cd-b849c6e3c550)

### 데이터 저장

Input으로 부터 제출된 원본 URL이 DB에 존재하는 지 비교해 검증한다.  
원본 URL이 DB에 속하지 않았다면 URL shortener를 통해 단축URL을 생성하고 DB에 저장합니다. 만약 중복된 URL이라면 이미 변환된 URL을 반환

![image](https://github.com/sgdevcamp2023/sgwannabe/assets/62490238/3b3f3180-3b1d-46da-b4a8-1fffaace6b2b)
