const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const input = document.querySelector(".input");
const select = document.querySelector(".filter_selection");
const modal = document.querySelector(".validation");
const yesButton = document.querySelector(".yes");
const noButton = document.querySelector(".no");
const nothingImge = document.querySelector(".nothing-image");

// LocalStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let status = "all";

// Taking buttons
const setButtonDisplay = (id, className, value) => {
	const button = document.querySelector(`#${id} .${className}`);
	button.style.display = value;
};

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

	selectionFilter(todos, status).forEach((e) => {
		const checkbox = e.isDone;
		const edit = e.edit;
		list.innerHTML += `
        <li class="todo" draggable= true id = "${e.id}">
			<div class="todo_date">
				<span class="date">${e.date}</span>
				<span class ="time">${e.time}<span>
			</div>
			<div class="todo_header">
				<input type="checkbox" class="checkbox" ${checkbox == true ? "checked" : ""}/>
				<input value="${e.value}" class="todo_input" type="text" disabled />
				<div class="save">
					<i class="fa-solid fa-floppy-disk"></i>
				</div>	
				<div class="cancel">
					<i class="fa-solid fa-xmark"></i>
				</div>
				<div class="edit ${e.isDone == true ? "d" : ""}">
					<i class="fa-solid fa-pen bx-sm"></i>
				</div>
				<div class="delete"> 
					<i class="fa-solid fa-trash bx-sm"></i>
				</div>
				</div>
				</li>
				`;
	});
	todos == ""
		? (nothingImge.style.display = "flex")
		: (nothingImge.style.display = "none");

	// Drag and Drop
	let startIndex;
	let dropIndex;
	const dragElement = document.getElementsByClassName("todo");
	for (let el of dragElement) {
		el.addEventListener("dragstart", (e) => {
			let startId = el.id;
			startIndex = todos.findIndex((v) => startId == v.id);
		});

		el.addEventListener("dragover", (e) => {
			e.preventDefault();
		});

		el.addEventListener("dragleave", (e) => {
			e.preventDefault();
		});

		el.addEventListener("drop", (e) => {
			e.preventDefault();
			let dropId = el.id;
			dropIndex = todos.findIndex((v) => dropId == v.id);
		});

		el.addEventListener("dragend", (e) => {
			e.preventDefault();

			let a = todos.splice(startIndex, 1);

			todos.splice(dropIndex, 0, a[0]);

			render();
		});
	}
};

render();

////////////////////Click All buttons function////////////////
const parentBlock = document.querySelector("#block");

parentBlock.addEventListener("click", (e) => {
	const id = e.target.closest(".todo")?.id;
	// const checkbox = e.target.closest(".checkbox");
	if (e.target.closest(".delete")) {
		modal.style.display = "block";
		yesButton.addEventListener("click", () => {
			todos = todos.filter((todo) => todo.id !== id);
			render();
			modal.style.display = "none";
		});
		noButton.addEventListener("click", () => (modal.style.display = "none"));
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
		console.log("checkbox", id);
		todos = todos.map((v) => (v.id == id ? { ...v, isDone: !v.isDone } : v));
		render();

		// console.log(checkbox);
	}
	if (e.target.closest(".clear")) {
		console.log("clear");
		todos = [];
		render();
	}
});

////////////////////// Submit Button //////////////////////////
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const inputValue = input.value;
	const newTodo = {
		value: inputValue,
		id: "a" + Date.now(),
		isDone: false,
		// edit: false,
		date: new Date().toLocaleDateString(),
		time: new Date().toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		}),
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
	setButtonDisplay(id, "save", "block");
	setButtonDisplay(id, "cancel", "block");
	setButtonDisplay(id, "edit", "none");

	const todoItem = document.querySelector(`#${id} .todo_input`);
	todoItem.removeAttribute("disabled");
	// todoItem.edit = true;

	todoItem.focus();
	const inputElem = todoItem.value;
	todoItem.value = "";
	todoItem.value = inputElem;
};

/////////////////////Cancel Function///////////////////////////
const Cancel = (id) => {
	setButtonDisplay(id, "save", "none");
	setButtonDisplay(id, "cancel", "none");
	setButtonDisplay(id, "edit", "block");

	const todoItem = document.querySelector(`#${id} .todo_input`);
	todoItem.setAttribute("disabled", "");
	render();
};

// Save Function
const Save = (id) => {
	const inputEl = document.querySelector(`#${id} .todo_input`);
	const index = todos.findIndex((todo) => todo.id === id);
	if (index !== true) {
		todos[index].value = inputEl.value;
		render();
	}
};

// // SELECTION
select.addEventListener("change", (event) => {
	status = event.target.value;
	render();
	// console.log(event.target.value);
});
