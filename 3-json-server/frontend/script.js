import CrudInterface from "./crud-interface.mjs";

async function main() {
  fetch("http://localhost:3000/toDos")
    .then((response) => response.json())
    .then((response) => console.log(response));

  const crudInterface = new CrudInterface();
  console.log(
    "fetch data from json-server:",
    await crudInterface.readToDoList()
  );
}
main();
