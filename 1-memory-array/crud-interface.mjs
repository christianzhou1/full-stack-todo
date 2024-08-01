export default function (toDoList = []) {
  console.log("Function called with toDoList:", toDoList);
  var index = toDoList.length + 1;
  return {
    createToDo,
    readToDoList,
    updateToDo,
    deleteToDo,
  };
  function createToDo(toDoText) {
    toDoList.push({
      text: toDoText,
      id: `${index++}`,
      done: false,
    });
    console.log("ToDo list after adding:", toDoList);
  }
  function readToDoList() {
    return structuredClone(toDoList);
  }
  function updateToDo(toDoId) {
    var toDo = toDoList.find((toDo) => toDo.id === toDoId);
    toDo.done = !toDo.done;
  }
  function deleteToDo(toDoId) {
    toDoList = toDoList.filter((toDo) => toDo.id != toDoId);
  }
}
