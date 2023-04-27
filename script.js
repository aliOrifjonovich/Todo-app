const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const input = document.querySelector(".input");
const clearBtn = document.querySelector(".clear");
const trashBtn = document.querySelector(".delete");
const updateBtn = document.querySelector(".edit");
const cancelBtn = document.querySelector(".cancel");
const todoInputBtn = document.querySelector(".todo_input");
const select = document.querySelector(".filter_selection");
const checkboxes = document.querySelectorAll(".checkbox")

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let status = "all";
// let saveButton, editButton, updateBtn;

// let showButtons = (show)=>{

// }

// Selection Filter
const selectionFilter = (todos, status) => {
	switch (status) {
		case "completed":
			return todos.filter((v) => v.isDone);
		case "proccess":
			return todos.filter((v) => !v.isDone);
		default:
			return todos;
	}
};

const render = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
	list.innerHTML = "";
	selectionFilter(todos, status).forEach((e, index) => {
		const checkbox = e.isDone;
		const edit = e.edit
		list.innerHTML += `
        <li class="todo" draggable= true id = "${e.id}">
            <input type="checkbox" class="checkbox" <input onclick="onCheck('${
							e.id
						}');" ${checkbox == true ? "checked" : ""} type="checkbox""/>
            <input value="${e.value}" class="todo_input" type="text" ${
			edit == false ? "disabled" : ""
		} />
			<div class="save">
                <i onclick = "onSave('${e.id}')" class="fa-solid fa-floppy-disk"></i>
            </div>
            <div class="cancel">
				<i  onclick = "onCancel('${e.id}')" class="fa-solid fa-xmark"></i>
            </div>
            <div class="edit">
                <i  onclick = "onEdit('${
									e.id
								}')" class="fa-solid fa-pen bx-sm"></i>
            </div>
            <div class="delete"> 
                <i onclick="deleteById('${index}')" class="fa-solid fa-trash bx-sm"></i>
            </div>
        </li>
        `;
	});
};
render();

// Checking input
function onCheck(id) {
   todos = todos.map((v) => (v.id == id ? { ...v, isDone: !v.isDone } : v));
		render();
		const inputEl = document.querySelector(`#${id} .todo_input`);
    // const getButton = (id, className) =>
		// 	document.querySelector(`#${id} .${className}`);
    // const editButton = getButton(id, "edit");

		if (todos.find((v) => v.id == id).isDone) {
			inputEl.classList.add("done");
      // editButton.style.display = "none";
		} else {
			inputEl.classList.remove("done");
      // editButton.style.display = "block"
		}
};

// Submit Button
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const inputValue = input.value;
	const newTodo = {
		value: inputValue,
		id: "a" + Date.now(),
		isDone: false,
		edit: false,
	};
	if (inputValue == "") {
		input.classList.add("active");
		alert("Please add new thing!");
	} else {
		input.classList.remove("active");
		todos.unshift(newTodo);
		input.value = "";
	}
	render();
});

// Edit funtion
const onEdit = (id) => {

  const getButton = (id, className) =>
		document.querySelector(`#${id} .${className}`);

  const saveButton = getButton(id, "save");
  const cancelButton = getButton(id, "cancel");
  const editButton = getButton(id, "edit");

  saveButton.style.display = "block";
  cancelButton.style.display = "block";
  editButton.style.display = "none";

  const todoItem = document.querySelector(`#${id}`);
  const todoInput = todoItem.querySelector(".todo_input");
  todoInput.removeAttribute("disabled");
  
  todoInput.focus();
  const inputElem = todoInput.value;
  todoInput.value=""
  todoInput.value = inputElem;



};
// Cancel Function
const onCancel = (id) => {
	
  const getButton = (id, className) =>
		document.querySelector(`#${id} .${className}`);

	const saveButton = getButton(id, "save");
	const cancelButton = getButton(id, "cancel");
	const editButton = getButton(id, "edit");

	saveButton.style.display = "none";
	cancelButton.style.display = "none";
	editButton.style.display = "block";

	const todoItem = document.querySelector(`#${id}`);
	const todoInput = todoItem.querySelector(".todo_input");
	todoInput.setAttribute("disabled", "");
  render()
};

// Save Function
const onSave = (id) => {
  const inputEl = document.querySelector(`#${id} .todo_input`);
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== true) {
    todos[index].value = inputEl.value;
    todos[index].edit = false;
    render();
  }
}

// ClearAll Function
clearBtn.addEventListener("click", () => {
	todos.length = 0;
	list.innerHTML = todos;
});

// Delete by id
const deleteById = (index) => {
	todos.splice(index, 1);
	render();
};

// // SELECTION
select.addEventListener("change", (event) => {
	console.log(event.target.value);
	status = event.target.value;  
	render();
});

const listElems = document.getElementsByClassName("todo");

for(let listElem of listElems){
   listElem.addEventListener(
			"dragstart",
			(event)=>{ console.log("start")}
		);
		listElem.addEventListener(
			"dragover",
			((event) => {
				event.preventDefault();
			})
		);
		listElem.addEventListener("drop", (event)=>{console.log("drop")});
}
