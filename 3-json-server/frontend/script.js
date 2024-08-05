import CrudInterface from "./crud-interface.mjs";
const crudInterface = new CrudInterface();
console.log("fetch data from json-server:", await crudInterface.readToDoList());

async function getToDoList() {
  const toDos = await crudInterface.readToDoList();
  console.log("readToDoList", toDos);
  showToDoList(toDos);
}

const showToDoList = (toDos) =>
  (toDoList.innerHTML = toDos.map(showToDoItem).join(""));

const showToDoItem = (toDo) =>
  toDoItem.innerHTML
    .replace("toDoAction", toDo.done ? "Del" : "Done")
    .replace("{toDoTitle}", toDo.text)
    .replaceAll("{toDoId}", toDo.id);

txtToDoTitle.addEventListener("input", (evt) => {
  btnAddToDo.disabled = !evt.target.value;
});

btnAddToDo.disabled = true;

toDoForm.addEventListener("click", async (evt) => {
  if (evt.target.nodeName === "BUTTON") {
    if (evt.target.textContent === "Add") {
      await crudInterface.createToDo(txtToDoTitle.value);
      console.log("added todo item", txtToDoTitle.value);
      txtToDoTitle.value = "";
    }
    if (evt.target.textContent === "Done") {
      await crudInterface.updateToDo(evt.target.dataset.todo);
      console.log("updated todo item", evt.target.dataset.todo);
    }
    if (evt.target.textContent === "Del") {
      await crudInterface.deleteToDo(evt.target.dataset.todo);
      console.log("Deleted todo item", evt.target.dataset.todo);
    }
  }
  getToDoList();
});

getToDoList();
