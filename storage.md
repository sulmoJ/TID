### 2020.10.29

#### innerHtml vs dangerouslySetInnerHTML

innerHtml은 js webAPI의 기능으로 그냥알고있었으나 react에서 dangerouslySetInnerHTML을 처음봤다 그래서 잠깐 알아본 결과

출력은 똑같이 돔에 넣을 수 있다.
**차이**는 innerHTML을 사용하면 리액트는 내용이 변한지 사실을 알 수 없어 그냥 덮어 쓰기 때문에 이를 비교하려면 dangerouslySetInnerHTML을 사용해야한다.

[자세한건 이분이](https://stackoverflow.com/questions/37337289/react-js-set-innerhtml-vs-dangerouslysetinnerhtml)

