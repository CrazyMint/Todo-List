import React, { Component } from "react";
import { updateTodo } from "../../api";
import "./List.css";

export default class List extends Component {
	state = {
		editValue: "",
	};

	handleEditInput = (event) => {
		event.preventDefault();
		const value = event.target.value;
		this.setState({ editValue: value });
	};

	handleEdit = (todo, updateFn) => {
		console.log("Editing", todo);
		if (todo.editing === true) {
			const newTodo = {
				...todo,
				content: this.state.editValue,
				editing: !todo.editing,
			};
			updateTodo(newTodo).then(updateFn);
		} else {
			updateTodo({ ...todo, editing: !todo.editing })
				.then(updateFn)
				.then(() => {
					this.setState({ editValue: "" });
				});
		}
	};

	render() {
		const {
			listItems,
			handleDelete,
			handleComplete,
			listName,
			updateListState,
		} = this.props;
		const renderListItems = listItems.map((todo) => (
			<li item-id={todo.id} key={todo.id} className="list-item">
				{todo.completed === true && (
					<button
						className="btn-complete"
						onClick={(event) => {
							handleComplete(todo);
						}}
					>
						<i className="fa-solid fa-arrow-left"></i>
					</button>
				)}

				{todo.editing ? (
					<input
						value={this.state.editValue}
						onChange={this.handleEditInput}
					></input>
				) : (
					<span>{todo.content}</span>
				)}
				<button
					className="btn-edit"
					onClick={() => this.handleEdit(todo, updateListState)}
				>
					<i className="fa-solid fa-pen"></i>
				</button>
				<button
					className="btn-remove"
					onClick={(event) => {
						let target = event.target.parentNode.getAttribute("item-id");
						if (target === undefined || target === null) {
							target =
								event.target.parentNode.parentNode.getAttribute("item-id");
						}
						handleDelete(target);
					}}
				>
					<i className="fa-sharp fa-solid fa-trash"></i>
				</button>
				{todo.completed === false && (
					<button
						className="btn-complete"
						onClick={(event) => {
							handleComplete(todo);
						}}
					>
						<i className="fa-solid fa-arrow-right"></i>
					</button>
				)}
			</li>
		));
		return (
			<ul>
				<p>{listName}</p>
				{renderListItems}
			</ul>
		);
	}
}
