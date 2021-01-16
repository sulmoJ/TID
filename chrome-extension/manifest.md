## manifest.json

크롬 익스텐션에 전체적인 정보를 담고있다. 크롬 익스텐션을 구성할때 manifest를 기준으로 html, css, js기반으로 작업이 가능하다.


### 구성요소

```json
{
  "name": "Getting Started Example",
  "version": "1.0",
  "description": "Build an Extension!",
  "manifest_version": 3
}
```

- name : 익스텐션 이름
- version : 현재 개발 버전
- description : 설명
- manifest_version : 해당 manifest버전 [(MDN)](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/manifest_version) [(공식사이트)](https://developer.chrome.com/docs/extensions/mv2/manifestVersion/)
