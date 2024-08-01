import CrudInterface from "./crud-interface.mjs";
import testData from "../db.json";
describe("CRUD Interface", () => {
  it("can support adding a new to-do item", () => {
    const toDoStore = structuredClone(testData.toDos);
    const crudInterface = CrudInterface(toDoStore);
    expect(toDoStore.length).toBe(2);
    crudInterface.createToDo("task 3");
    expect(toDoStore.length).toBe(3);
    expect(toDoStore[2].id).toBe("3");
    expect(toDoStore[2].text).toBe("task 3");
    expect(toDoStore[2].done).toStrictEqual(false);
  });
});
