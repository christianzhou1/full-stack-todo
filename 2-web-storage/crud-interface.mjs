export default function (webStore = window.sessionStorage) {
  let toDoList = JSON.parse(webStore.getItem("toDoList")) || [];
  console.log("Function called with toDoList:", toDoList);
  let index = toDoList.length + 1;
  return {
    createToDo,
    readToDoList,
    updateToDo,
    deleteToDo,
    deleteToDo2,
  };
  function createToDo(toDoText) {
    toDoList.push({
      text: toDoText,
      id: `${index++}`,
      done: false,
    });
    webStore.setItem("toDoList", JSON.stringify(toDoList));
    console.log("ToDo list after adding:", toDoList);
  }
  function readToDoList() {
    return structuredClone(toDoList);
  }
  function updateToDo(toDoId) {
    var toDo = toDoList.find((toDo) => toDo.id === toDoId);
    if (toDo) {
      toDo.done = !toDo.done;
    }
    webStore.setItem("toDoList", JSON.stringify(toDoList));
    console.log("ToDo list after updating:", toDoList);
  }
  function deleteToDo(toDoId) {
    const toDoItemIndex = toDoList.findIndex((toDo) => toDo.id === toDoId);
    if (toDoItemIndex > -1) {
      toDoList.splice(toDoItemIndex, 1);
    }
    webStore.setItem("toDoList", JSON.stringify(toDoList));
    console.log("ToDo list after deleting:", toDoList);
  }
}
