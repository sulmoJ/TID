# GraphQL

2020.07.24

```cmd
yarn add graphql-yoga
```

- graphql yoga를 사용해 배움

- 서버를 간단히 `index.js파일`에 간단히 구축

  원래 `require()`함수로 불러와야하지만 babel-cli를 통해 아래와같은 최신(?)의 모습으로 활용한다고 함.

  ```javascript
  import { GraphQLServer } from "graphql-yoga";
  import resolvers from "[graphql 파일위치]";

  const server = new GraphQLServer({Query,resolvers})

  server.start(()=>console.log("Graphql Server Running"))
  ```

# graphQL이 작동하는 원리

1. express기반의 서버
2. graphql파일에서 쿼리의 형태구축
3. resolver.js에서 graphQL의 요청 쿼리를 자료로 정리해 반환(DB가 구축되어있는 지점)

## **Query** : graphQL에서 쿼리요청을 받아 반환하기

```
type Query {
  people: [person]!
  person(id: Int!): person!
}
```

위와같이 graphql파일에서 요청시resolvers에서 처리방법은

```javascript
const resolvers = {
  Query: {
    people: () => people,
    person: (_, { id }) => getbyId(id),
  },
};

export default resolvers;
```

이런 모양이된다.

사용자가 인자를 함께 보낸경우 인자를 받는방법은 위와 같은데 첫번째 인자로는 현재 Object를 반환하고 그 이후로 사용자가 보낸 인자를 받을수 있다.(_는 현재 Object, {id}가 사용자가 보낸 argument가된다)

## **Mutation** : graphQL에서 DB상태변화 시키기

### **add** 그리고 **delete**

```javascript
// db.js
export const deleteMoive = (id)=> {
  const cleanMovies = Movies.filter((movie) => id != movie.id);
  if (Movies.length > cleanMovies.length) {
    Movies = cleanMovies;
    return true;
}

export const addMovie = (name, score) => {
  const newMoive = {
    id: `${Movies.length + 1}`,
    name,
    score,
  };
```

---

- resolvers.js

```javascript
const resolvers = {
  Mutation: {
    addMovie: (_, { name, score }) => addMovie(name, score),
    deleteMovie: (_, { id }) => deleteMovie(id),
  },
};
```

---

- schema.graphql
  
```graphql

type Movie {
  id: Int!
  name: String!
  score: Int!
}
...
type Mutation {
  addMovie(name: String!, score: Int!): Movie!
  deleteMovie(id: Int!): Boolean!
}
```
