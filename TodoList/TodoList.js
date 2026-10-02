//초기 데이터
let mockData = [
  { id: 0, isDone: false, content: "React study", date: new Date().getTime() },
  { id: 1, isDone: true, content: "친구만나기", date: new Date().getTime() },
  { id: 2, isDone: false, content: "낮잠자기", date: new Date().getTime() },
];
// 요일 출력을 위한 배열
let day = ["일", "월", "화", "수", "목", "금", "토"];

onload = () => {
  document.querySelector(".today").innerHTML = new Date().toDateString();
  initData(mockData);
};

const initData = (printData) => {
  const todosWrapper = document.querySelector(".todos_wrapper");
  todosWrapper.innerHTML = ""; //기존에 있던 데이터를 초기화

  printData.forEach((todo) => {
    let todoItem = document.createElement("div");
    todoItem.classList.add("TodoItem");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "isDone";
    checkbox.value = todo.id;
    if (todo.isDone) {
      checkbox.checked = true;
    }
    checkbox.setAttribute("onchange", `onUpdate(${todo.id})`);

    let content = document.createElement("div");
    content.classList.add("content");
    content.innerHTML = todo.content;

    let date = document.createElement("div");
    date.classList.add("date");
    date.innerHTML = new Date(todo.date).toLocaleString();

    let button = document.createElement("button");
    button.name = "delete";
    button.value = todo.id;
    button.innerHTML = "삭제";
    button.setAttribute("onclick", `todoDel(this)`);

    todoItem.appendChild(checkbox);
    todoItem.appendChild(content);
    todoItem.appendChild(date);
    todoItem.appendChild(button);

    document.querySelector(".todos_wrapper").appendChild(todoItem);
  });
};

let idIndex = 3; // id의 값을 증가 시킬 변수(초기데이터가 2까지 있으므로 3부터 시작)
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); //전송기능 막음
  //id는 idIndex, isDone은 기본 false, content는 입력한 내용, date는 new Date().getTime()

  const input = document.querySelector(".Editor > input");
  const content = input.value.trim(); //입력한 내용
  if (content === "") {
    alert("내용을 입력해주세요.");
    return; // 내용이 비어있으면 추가하지 않고 종료
  }

  const newTodo = {
    id: idIndex,
    isDone: false,
    content: content,
    date: new Date().getTime(),
  };

  mockData.push(newTodo);
  idIndex++; //idIndex를 1 증가시킨다.

  // 준비된 하나의 레코드를 mokData에 push()함수를 이용해서 추가한다.
  input.value = ""; //입력한 내용을 초기화
  initData(mockData); //호출한다.(다시 화면 랜더링)
});

const onUpdate = (targetId) => {
  mockData = mockData.map((todo) =>
    todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo,
  );

  initData(mockData); //호출한다.(다시 화면 랜더링)
};

const todoDel = (th) => {
  //filter()함수를 이용해서 삭제하려는 대상이외의 todo만 추출해서 mockData에 담든다.
  mockData = mockData.filter((todo) => todo.id !== parseInt(th.value));

  initData(mockData); //호출한다.(다시 화면 랜더링)
};

document.querySelector("#keyword").addEventListener("keyup", () => {
  let searchedTodos = getFilterData(event.target.value);
  initData(searchedTodos);
});

const getFilterData = (search) => {
  //검색어가 없으면 mockData를 리턴한다.
  if (search === "") {
    return mockData;
  }
  //filter함수를 이용해서 search(검색어)를 포함하고 있는 todo들를 받는다
  todoList = mockData.filter((todo) =>
    todo.content.toLowerCase().includes(search.toLowerCase()),
  );

  //filter의 결과를 리턴 한다.
  return todoList;
};
