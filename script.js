const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const input = document.querySelector(".input");
const select = document.querySelector(".filter_selection");

// LocalStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

let status = "all";

const getButton = (id, className) =>
	document.querySelector(`#${id} .${className}`);

let saveButton, editButton, editBtn;

let showButtons = (show) => {};

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

//////////////////////// Rendering /////////////////////////////
const render = () => {
	localStorage.setItem("todos", JSON.stringify(todos));
	list.innerHTML = "";
	selectionFilter(todos, status).forEach((e, index) => {
		const checkbox = e.isDone;
		const edit = e.edit;
		list.innerHTML += `
        <li class="todo" draggable= true id = "${e.id}">
			<div class="todo_date">
				<span class="date">${new Date().toLocaleDateString()}</span>
				<span class="time">${new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				})}</span></div>
			<div class="todo_header">
				<input type="checkbox" class="checkbox" ${checkbox == true ? "checked" : ""}/>
				<input value="${e.value}" class="todo_input" type="text" ${
			edit == false ? "disabled" : ""
		} />
				<div class="save">
					<i class="fa-solid fa-floppy-disk"></i>
				</div>	
				<div class="cancel">
					<i class="fa-solid fa-xmark"></i>
				</div>
				<div class="edit">
					<i class="fa-solid fa-pen bx-sm"></i>
				</div>
				<div class="delete"> 
					<i class="fa-solid fa-trash bx-sm"></i>
				</div>
			</div>
        </li>
        `;
	});
};
render();

////////////////////Click All buttons function////////////////
const parentBlock = document.querySelector(".block");

parentBlock.addEventListener("click", (e, index) => {
	const id = e.target.closest(".todo").getAttribute("id");

	if (e.target.closest(".clear")) {
		console.log("clear");
		todos = [];
		render;
	}
	if (e.target.closest(".delete")) {
		console.log("delete");
		todos.splice(index, 1);
		render();
	}
	if (e.target.closest(".edit")) {
		console.log("edit", id);
		Edit(id);
	}
	if (e.target.closest(".cancel")) {
		console.log("cancel");
		Cancel(id);
	}
	if (e.target.closest(".save")) {
		console.log("save");
		Save(id);
	}
	if (e.target.closest(".checkbox")) {
		console.log("chackbox", id);
		todos = todos.map((v) => (v.id == id ? { ...v, isDone: !v.isDone } : v));
		render();
	}
});

////////////////// Checking input ////////////////////////////
// function Check(id) {

// 	// 	const inputEl = document.querySelector(`#${id} .todo_input`);
//     // // const getButton = (id, className) =>
// 	// 	// 	document.querySelector(`#${id} .${className}`);
//     // // const editButton = getButton(id, "edit");

// 	// 	if (todos.find((v) => v.id == id).isDone) {
// 	// 		inputEl.classList.add("done");
//     //   // editButton.style.display = "none";
// 	// 	} else {
// 	// 		inputEl.classList.remove("done");
//     //   // editButton.style.display = "block"
// 	// 	}
// };

////////////////////// Submit Button //////////////////////////
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
const Edit = (id) => {
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
	todoInput.value = "";
	todoInput.value = inputElem;
};

/////////////////////Cancel Function///////////////////////////
const Cancel = (id) => {
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
	render();
};

// Save Function
const Save = (id) => {
	const inputEl = document.querySelector(`#${id} .todo_input`);
	const index = todos.findIndex((todo) => todo.id === id);
	if (index !== true) {
		todos[index].value = inputEl.value;
		todos[index].edit = false;
		render();
	}
};

// // SELECTION
select.addEventListener("change", (event) => {
	status = event.target.value;
	render();
	console.log(event.target.value);
});

// // ClearAll Function
// clearBtn.addEventListener("click", () => {
//
// });

// // Delete by id
// const deleteById = (index) => {
// 	todos.splice(index, 1);
// 	render();
// };

const updateDateTime = () => {
	const now = new Date();
	const dateElem = document.getElementById("date");
	const timeElem = document.getElementById("time");
	dateElem.textContent = now.toLocaleDateString();
	timeElem.textContent = now.toLocaleTimeString();
};
setInterval(updateDateTime, 1000);

const listElems = document.getElementsByClassName("todo");

for (let listElem of listElems) {
	listElem.addEventListener("dragstart", (event) => {
		event.dataTransfer.setData("text/plain", event.target.id);
		console.log("start");
	});
	listElem.addEventListener("dragover", (event) => {
		event.preventDefault();
	});
	listElem.addEventListener("drop", (event) => {
		event.preventDefault();
		const id = event.dataTransfer.getData("text/plain");
		const element = document.getElementById(id);
		const target = event.target.closest(".todo");
		const list = target.parentNode;
		const targetIndex = Array.from(list.children).indexOf(target);
		const elementIndex = Array.from(list.children).indexOf(element);
		if (targetIndex < elementIndex) {
			list.insertBefore(element, target.nextSibling);
		} else {
			list.insertBefore(element, target);
		}
		console.log("drop");
	});
}
