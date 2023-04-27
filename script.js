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

let todos = [
	{ value: "read more", id: "a124423", isDone: false, edit: false },
	{ value: "not read more", id: "a1232435", isDone: false, edit: false },
	{ value: "Play Football", id: "a1235465", isDone: false, edit: false },
];

let status = "all";

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
	list.innerHTML = "";
	selectionFilter(todos, status).forEach((e, index) => {
		const checkbox = e.isDone;
		const edit = e.edit
		list.innerHTML += `
        <li class="todo" draggable="true" id = "${e.id}">
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
  if (index !== -1) {
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

/*
const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const clear = document.querySelector(".clear");
const input = document.querySelector(".input");
const select = document.querySelector(".select");



// STATE
let todos = [{value: "Reading book", id: "a11", isDone: false, edit: false}, 
            {value: "Play football", id: "a22", isDone: true, edit: true}];

let status = "all";

const filterTodosByStatus = (status, todos) => {
  switch (status) {
    case "complete": 
      return todos.filter((v) => v.isDone);
    case "proccess": 
      return todos.filter((v) => !v.isDone);
    default : 
      return todos;
  }
};

// RENDERING
const render = () => {
  list.innerHTML = "";
  filterTodosByStatus(status, todos).forEach((element) => {
    const checkbox = element.isDone;
    const edit = element.edit;

    list.innerHTML += `
      <li class="todo" id="${element.id}">
        <input onclick="onCheck('${element.id}');" ${checkbox == true ? "checked" : ""} type="checkbox" />
        <input value="${element.value}" ${edit == false ? "disabled" : ""} class="todo_input" type="text" />
        <div class="save">
          <i class="bx bx-sm bxs-save"></i>
        </div>
        <div class="cencel">
          <i onclick="onCencel('${element.id}');" class="bx bx-sm bx-x"></i>
        </div>
        <div class="edit">
          <i onclick="onEdit('${element.id}')" class="bx bx-sm bxs-pencil"></i>
        </div>
        <div class="delete">
          <i onclick="deleteTodo('${element.id}');" class="bx bx-sm bx-trash"></i>
        </div>
      </li>`;
  })

}; 

render();

// onCheck button 
function onCheck(id) {
  todos = todos.map((v) => (v.id == id ? {...v, isDone: !v.isDone} : v));
  render();
};

// click edit button
const onEdit = (id) => {

  const getButton = (id, className) => 
    document.querySelector(#${id} .${className});

  const saveButton = getButton(id, "save");
  const cencelButton = getButton(id, "cencel");
  const editButton = getButton(id, "edit");

  saveButton.style.display = "block";
  cencelButton.style.display = "block";
  editButton.style.display = "none";
};

// click cencel button
const onCencel = (id) => {
  
  const getButton = (id, className) => 
    document.querySelector(#${id} .${className});

  const saveButton = getButton(id, "save");
  const cencelButton = getButton(id, "cencel");
  const editButton = getButton(id, "edit");

  saveButton.style.display = "none";
  cencelButton.style.display = "none";
  editButton.style.display = "block";
};

// Edit button   
// let a = 0;
// function editing(id) {
//   if (a == 0) {
//     todos = todos.map((v) => (v.id == id ? {...v, edit: !v.edit} : v));
//     render();
//     ++a;
//   } else {
//     todos = todos.map((v) => (v.id == id ? {...v, edit: !v.edit} : v));
//     render();
//     --a;
//   }
// };

// Action Trash, delete to do list
function deleteTodo(id) {
  todos = todos.filter(v => v.id != id);
  render();
};

// Event  Clear all
clear.addEventListener("click", () => {
  todos = [];
  render();
});


// if input null
function inputHasNull() {
  input.style.transform = rotate(4deg);
  setTimeout(inputHasNull1, 30); 
};

function inputHasNull1() {
  input.style.transform = rotate(-3deg);
  setTimeout(inputHasNull2, 50); 
};

function inputHasNull2() {
  input.style.transform = rotate(2deg);
  setTimeout(inputHasNull3, 50); 
}

function inputHasNull3() {
  input.style.transform = rotate(-1deg);
  setTimeout(inputHasNull4, 50); 
}

function inputHasNull4() {
  input.style.transform = rotate(0deg);
}


// click submit then create lists
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target["todo"].value == "") {
    inputHasNull();
  } else {
    const inputValue = event.target["todo"].value;
    const newTodo = {value: inputValue, id: "a" + Date.now(), isDone: false, edit: false};
    todos.unshift(newTodo);
    event.target["todo"].value = null;
    render();
  }
});
*/