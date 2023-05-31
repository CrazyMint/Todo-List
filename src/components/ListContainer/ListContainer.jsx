import React, { Component } from "react";
import { postTodo } from "../../api";
import List from "../List/List";
import "./ListContainer.css";
import { withTodos } from "../hoc/withTodos";

class ListContainer extends Component {
	state = {
		inputValue: "",
		// todos: [],
	};

	handleInput = (event) => {
		event.preventDefault();
		const value = event.target.value;
		this.setState({ inputValue: value });
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
			});
			this.props.addToList(listItem);
		});
	};

	render() {
		const { todos, handleDelete, handleComplete, handleEdit, updateListState } =
			this.props;
		const pendingItems = todos.filter((item) => item.completed === false);
		const completedItems = todos.filter((item) => item.completed === true);
		return (
			<div id="container-all">
				<form>
					<input value={this.state.inputValue} onChange={this.handleInput} />
					<button onClick={this.handleSubmit} className="btn-submit">
						submit
					</button>
				</form>
				<div className="container">
					<List
						listName={"Pending Tasks"}
						todos={pendingItems}
						handleDelete={handleDelete}
						handleComplete={handleComplete}
						handleEdit={handleEdit}
						updateListState={updateListState}
					/>
					<List
						listName={"Completed Tasks"}
						todos={completedItems}
						handleDelete={handleDelete}
						handleComplete={handleComplete}
						handleEdit={handleEdit}
						updateListState={updateListState}
					/>
				</div>
			</div>
		);
	}
}

export default withTodos(ListContainer);
