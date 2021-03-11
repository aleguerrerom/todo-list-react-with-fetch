import React, { useState, useEffect } from "react";

//include images into your bundle

export function Home() {
	const [inputValue, fnInputValue] = useState("");
	const [addtoArray, fnAddtoArray] = useState([]);
	const [list, setList] = useState([]);

	/// USE EFFEECT PARA LLAMAR SOLO UNA VEZ EL SEARCH
	useEffect(() => {
		BuscarTodoList();
	}, []);

	async function CrearArray() {
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let raw = JSON.stringify([]);
		let requestOptions = {
			method: "POST",
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
					BuscarTodoList();
				}
			})
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	}
	///buscar TODOs
	async function BuscarTodoList() {
		let requestOptions = {
			method: "GET"
		};

		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/aleguerrerom",
			requestOptions
		)
			.then(res => {
				if (res.status == 404) {
					CrearArray();
				} else {
					return res.json();
				}
			})
			.catch(error => console.log("error", error));
		//aagit ad
		setList(response);
		console.log(response);
	}
	////Actualizar todos
	async function ActualizarTodo(newarray) {
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
					BuscarTodoList();
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
					fnInputValue("");
					return res;
				}
			})
			.catch(error => console.log("error", error));
		fnInputValue("");
	}

	///Anadir TODOS
	const addTodo = e => {
		if (e.key == "Enter") {
			const todosnew = list.concat({
				label: inputValue,
				done: false
			});
			ActualizarTodo(todosnew);
			fnInputValue("");
		}
	};

	///ELIMINAR TODOS
	function quitarTodo(task) {
		const todosnew = list.filter(item => item !== task);
		if (todosnew.length == 0) {
			DeleteTodo();
		} else {
			ActualizarTodo(todosnew);
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
								onClick={() => quitarTodo(item)}></i>
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
			<div className="cartita ">
				<input
					type="text"
					placeholder="What do you need?"
					value={inputValue}
					onChange={e => fnInputValue(e.target.value)}
					onKeyUp={addTodo}></input>
				<TodoList />
				<div className="text-center">
					<button
						type="button"
						className="btn btn-secondary"
						onClick={() => DeleteTodo()}>
						DELETE
					</button>
				</div>
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
