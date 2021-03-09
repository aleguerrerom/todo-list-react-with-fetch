import React, { useState } from "react";

//include images into your bundle
let requestOptions = {
	method: "GET",
	redirect: "follow"
};

const response = await fetch(
	"https://assets.breatheco.de/apis/fake/todos/user/aleguerrerom",
	requestOptions
).catch(error => console.log("error", error));

console.log(GET());
export function Home() {
	const [inputValue, fnInputValue] = useState("");
	const [addtoArray, fnAddtoArray] = useState(response);
	const addTodo = e => {
		if (e.key == "Enter") {
			if (inputValue !== "") {
				const todosnew = addtoArray.concat(inputValue);
				fnAddtoArray(todosnew);
				fnInputValue("");
			} else alert("");
		}
	};
	function removeTodo(task) {
		const todosnew = addtoArray.filter(item => item !== task);
		fnAddtoArray(todosnew);
	}
	const TodoList = () => {
		return (
			<div>
				<ul>
					{addtoArray.map(item => (
						<li className="lista" key={item}>
							{item}

							<i
								id="right"
								className="fas fa-trash-alt"
								onClick={() => removeTodo(item)}></i>
						</li>
					))}
				</ul>
				<p>{addtoArray.length} item left</p>
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
