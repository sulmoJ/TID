// const person = {
//   name: "정성모",
//   getName: () => {
//     console.log(this);
//     return this.name;
//   },
// };

// // 실행 컨택스트 : 아래와같이 getName을 person이라는 연결을 확인
// console.log(person.getName());

// //껍대기가 사라지면
// // const man = person.getName();
// // console.log(man());

// console.log(person.getName.bind(person)());
// // this를 person으로 고정시켜줌 (껍데기가 뭔지 알려준다.)

const person = {
  name: "정성모",
  getName: function () {
    return this.name;
  },
};

// 실행 컨택스트 : 아래와같이 getName을 person이라는 연결을 확인
console.log(person.getName());

//껍대기가 사라지면

const man = person.getName;

console.log(man());

console.log(person.getName.bind(person)());
// this를 person으로 고정시켜줌 (껍데기가 뭔지 알려준다.)

console.log(person.getName.call(person)); // this가 person이됨: 첫번째 인자
console.log(person.getName.apply(person));
