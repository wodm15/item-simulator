 아이템 시뮬레이터 서비스 백엔드 입니다.

기능:
1. 캐릭터 생성 api : api/characters  (post) req.body => {"name": "닉네임1",}
 
2. 캐릭터 삭제 api : api/characters:characters_id    (delete)

3. 캐릭터 상세조회 api : api/characters:characters_id (get)


4. 아이템 생성 API : api/items/2 (post)  req.body =>  { "item_code": 4, "item_name": "파멸의 반지4", "item_stat": { "health": 20, "power": 2 }}


5. 아이템 수정 API :api/items/2 (patch)   req.body =>  {"item_name": "파멸의 반지_리뉴얼", "item_stat": { "health": 30 }}

6. 아이템 목록 조회 API :/api/items/ (get)

7. 아이템 상세 조회 API :3000/api/items/2 (get)
 





 기타 함수 관련
 .env : 데이터베이스 패스
 .prettier : 코드 설정
 