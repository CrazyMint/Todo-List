import React, { Component } from "react";
import { postTodo, getTodos, deleteTodo, updateTodo } from "../../api";
import List from "../List/List";
import "./ListContainer.css";

export default class Todolist extends Component {
	state = {
		inputValue: "",
		listItems: [],
	};

	updateState = (data) => {
		this.setState({
			listItems: this.state.listItems.map((item) => {
				if (item.id === data.id) {
					return { ...data };
				} else {
					return item;
				}
			}),
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		console.log("click submit");
		const todoObj = {
			content: this.state.inputValue,
			completed: false,
			editing: false,
		};
		postTodo(todoObj).then((listItem) => {
			this.setState({
				inputValue: "",
				listItems: [...this.state.listItems, listItem],
			});
		});
	};

	handleInput = (event) => {
		event.preventDefault();
		const value = event.target.value;
		this.setState({ inputValue: value });
	};

	handleDelete = (id) => {
		console.log("removing");
		deleteTodo(id).then(() => {
			this.setState({
				listItems: [...this.state.listItems.filter((item) => item.id !== +id)],
			});
		});
	};

	handleComplete = (todo) => {
		console.log("completing");
		updateTodo({ ...todo, completed: !todo.completed }).then(this.updateState);
	};

	render() {
		const pendingItems = this.state.listItems.filter(
			(item) => item.completed === false
		);
		const completedItems = this.state.listItems.filter(
			(item) => item.completed === true
		);
		return (
			<div id="app">
				<form>
					<input value={this.state.inputValue} onChange={this.handleInput} />
					<button onClick={this.handleSubmit} className="btn-submit">
						submit
					</button>
				</form>
				<div className="container">
					<List
						listName={"Pending Tasks"}
						listItems={pendingItems}
						handleDelete={this.handleDelete}
						handleComplete={this.handleComplete}
						handleEdit={this.handleEdit}
						updateListState={this.updateState}
					/>
					<List
						listName={"Completed Tasks"}
						listItems={completedItems}
						handleDelete={this.handleDelete}
						handleComplete={this.handleComplete}
						handleEdit={this.handleEdit}
						updateListState={this.updateState}
					/>
				</div>
			</div>
		);
	}

	componentDidMount = () => {
		getTodos().then((data) => {
			this.setState({ listItems: data });
		});
	};
}
