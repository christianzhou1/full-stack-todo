export default function (endpointUrl = "http://localhost:3000/toDos") {
  // let index = toDoList.length + 1;
  return {
    createToDo,
    readToDoList,
    updateToDo,
    deleteToDo,
  };
  function createToDo(toDoText) {
    return fetch(endpointUrl, {
      method: "POST",
      body: JSON.stringify({
        text: toDoText,
        done: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async function readToDoList() {
    let rawData = await fetch(endpointUrl);
    return rawData.json();
  }
  function updateToDo(
    toDoId,
    payload = {
      done: true,
    }
  ) {
    return fetch(`${endpointUrl}/${toDoId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  function deleteToDo(toDoId) {
    return fetch(`${endpointUrl}/${toDoId}`, {
      method: "DELETE",
    });
  }
}
