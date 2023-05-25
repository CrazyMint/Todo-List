import React from "react";
import "./App.css";
import List from "./components/List";
import { postTodo, getTodos, deleteTodo } from "./api";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			inputValue: "",
			listItems: [],
		};
		getTodos().then((data) => {
			this.setState({ ...this.state, listItems: data });
		});
	}

	getUpdatedTodos = () => {
		getTodos().then((data) => {
			this.setState({ inputValue: "", listItems: data });
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		console.log("click submit");
		const todoObj = { content: this.state.inputValue };
		postTodo(todoObj).then(this.getUpdatedTodos);
	};

	handleInput = (event) => {
		event.preventDefault();
		const value = event.target.value;
		this.setState({ inputValue: value });
	};

	handleDelete = (id) => {
		console.log("removing");
		deleteTodo(id).then(this.getUpdatedTodos);
	};

	render() {
		return (
			<div id="app">
				<form>
					<input value={this.state.inputValue} onChange={this.handleInput} />
					<button onClick={this.handleSubmit}>submit</button>
				</form>
				<List
					listItems={this.state.listItems}
					handleDelete={this.handleDelete}
				/>
			</div>
		);
	}
}

export default App;
