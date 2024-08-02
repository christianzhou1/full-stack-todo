export default function (webStore = window.sessionStorage) {
  console.log("Raw data from sessionStorage:", webStore.getItem("toDoList"));

  let toDoList = JSON.parse(webStore.getItem("toDoList") || "[]");
  console.log(
    "Function called with toDoList:",
    JSON.stringify(toDoList, null, 2)
  );

  let index = toDoList.length + 1;
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
    webStore.setItem("toDoList", toDoList);
    console.log("ToDo list after adding:", JSON.stringify(toDoList, null, 2));
  }
  function readToDoList() {
    toDoList = JSON.parse(webStore.getItem("toDoList") || "[]");
  }
  function updateToDo(toDoId) {
    var toDo = toDoList.find((toDo) => toDo.id === toDoId);
    if (toDo) {
      toDo.done = !toDo.done;
    }
    webStore.setItem("toDoList", JSON.stringify(toDoList));
    console.log("ToDo list after updating:", JSON.stringify(toDoList, null, 2));
  }
  function deleteToDo(toDoId) {
    const toDoItemIndex = toDoList.findIndex((toDo) => toDo.id === toDoId);
    if (toDoItemIndex > -1) {
      toDoList.splice(toDoItemIndex, 1);
      console.log(
        `ToDo list after deleting id ${toDoId}:`,
        JSON.stringify(toDoList, null, 2)
      );
      webStore.setItem("toDoList", JSON.stringify(toDoList));
    } else {
      console.log(`ToDo with id ${toDoId} not found`);
    }
  }
}
