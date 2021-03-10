import React, { useState, useEffect } from "react";

//include images into your bundle

export function Home() {
	const [Searched, setSearched] = useState(false);
	const [inputValue, fnInputValue] = useState("");
	const [addtoArray, fnAddtoArray] = useState([]);
	const [list, setList] = useState([]);

	///buscar TODOs
	SearchTodoList();
	async function SearchTodoList() {
		//console.log(inputSearch);

		var requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/aleguerrerom",
			requestOptions
		)
			.then(res => {
				return res.json();
			})
			.catch(error => console.log("error", error));
//aagit ad
		setList(response);
		setSearched(true);
		console.log(response);
	}
	////Actualizar todos
	async function UpdateTodo(newarray) {
		console.log(newarray);
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(newarray);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/aleguerrerom",
			requestOptions
		)
			.then(res => {
				if (res.status == 200) {
					SearchTodoList();
				}
			})
			.catch(error => console.log("error", error));
	}
	///ELIMIAR TO DOS
	async function DeleteTodo() {
		var requestOptions = {
			method: "DELETE",
			redirect: "follow"
		};

		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/aleguerrerom",
			requestOptions
		)
			.then(res => {
				if (res.status == 200) {
					setSearched(false);
					fnInputValue("");
					return res;
				}
			})
			.catch(error => console.log("error", error));

		fnInputValue("");
		console.log(response);
	}

	///Anadir TODOS
	const addTodo = e => {
		if (e.key == "Enter") {
			const todosnew = list.concat({
				label: inputValue,
				done: false
			});
			UpdateTodo(todosnew);
			fnInputValue("");
		}
	};

	///ELIMINAR TODOS
	function removeTodo(task) {
		const todosnew = addtoArray.filter(item => item !== task);
		if (todosnew.length == 0) {
			DeleteTodo();
		} else {
			fnAddtoArray(todosnew);
		}
	}

	//COMPONENETE TODO
	const TodoList = () => {
		return (
			<div>
				<ul>
					{list.map((item, id) => (
						<li className="lista" key={id}>
							{item.label}

							<i
								id="right"
								className="fas fa-trash-alt"
								onClick={() => removeTodo(item)}></i>
						</li>
					))}
				</ul>
				<p>{list.length} item left</p>
			</div>
		);
	};

	return (
		<div className="card">
			<h1>todos</h1>
			<div className="cartita">
				<input
					type="text"
					placeholder="What do you need?"
					value={inputValue}
					onChange={e => fnInputValue(e.target.value)}
					onKeyUp={addTodo}></input>
				<TodoList />
			</div>
		</div>
	);
}
//create your first component

// console.log(GET());

// function POST() {
// 	alert("LOL");
// }

// export function Home() {
// 	return (
// 		<div className="text-center mt-5">
// 			<h1>API</h1>
// 			<button onClick={POST}>POST</button>
// 			<button onClick={GET}>GET</button>
// 		</div>
// 	);
// }
