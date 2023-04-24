const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const input = document.querySelector(".input");
const clearBtn = document.querySelector(".clear");
const trashBtn = document.querySelectorAll(".delete");
const updateBtn = document.querySelectorAll(".edit");
const checkboxBtn = document.querySelectorAll(".checkbox");
const todoInputBtn = document.querySelector(".todo_input");
const select = document.querySelector("filter_selection");

const todos = [
	{ value: "read more", id: "124423", isDone: false, edit: false},
	{ value: "not read more", id: "1232435", isDone: true, edit: true},
];

const status = "all";

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
		const checkbox = e.isDone
		list.innerHTML += `
        <li class="todo">
            <input type="checkbox" class="checkbox" ${checkbox == true ? "check" : ""} onclick = "onCheck(`${e.id}`)"/>
            <input value="${e.value}" class="todo_input" type="text" />
            <div class="edit">
                <i class="fa-solid fa-pen bx-sm"></i>
            </div>
            <div class="delete"> 
                <i onclick="deleteById('${index}')" class="fa-solid fa-trash bx-sm"></i>
            </div>
        </li>
        `;
	});
};
render();

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const inputValue = input.value;
	const newTodo = {
		value: inputValue,
		id: Date.now() + "#",
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

const onCheck = (id) => {
	todos = todos.map((v) => (v.id == id ? { ...v, isDone: !v.isDone } : v));
	render();
	console.log("check", todos);
};

// ClearAll Function
clearBtn.addEventListener("click", () => {
	todos.length = 0;
	list.innerHTML = todos;
});

//

// Delete by id
const deleteById = (index) => {
	todos.splice(index, 1);
	render();
};



// SELECTION 
select.addEventListener("change", (event)=>{
	status = event.target.value;
	render();
})

// CheckBox Function
// checkboxBtn.forEach((checkbox) => {
// 	checkbox.addEventListener("click", () => {
// 		todoInputBtn.classList.add("line");
// 		console.log(todoInputBtn);
// 	});
// });

updateBtn.forEach((u)=>{
	u.addEventListener("click", ()=>{
		console.log(u.target);
	})
})