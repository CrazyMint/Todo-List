import React from "react";
import { getTodos, updateTodo, deleteTodo } from "../../api";

export const withTodos = (Component) => {
	return class newComponent extends React.Component {
		state = {
			todos: [],
		};

		updateState = (data) => {
			this.setState({
				todos: this.state.todos.map((item) => {
					if (item.id === data.id) {
						return { ...data };
					} else {
						return item;
					}
				}),
			});
		};

		addToList = (todo) => {
			console.log("adding to list...", todo);
			this.setState({
				todos: [...this.state.todos, todo],
			});
		};

		handleDelete = (id) => {
			console.log("removing");
			deleteTodo(id).then(() => {
				this.setState({
					todos: [...this.state.todos.filter((item) => item.id !== +id)],
				});
			});
		};

		handleComplete = (todo) => {
			console.log("completing");
			updateTodo({ ...todo, completed: !todo.completed }).then(
				this.updateState
			);
		};

		render() {
			return (
				<Component
					{...this.props}
					todos={this.state.todos}
					addToList={this.addToList}
					handleDelete={this.handleDelete}
					handleComplete={this.handleComplete}
					handleEdit={this.handleEdit}
					updateListState={this.updateState}
				/>
			);
		}

		componentDidMount = () => {
			getTodos().then((data) => {
				this.setState({ todos: data });
			});
		};
	};
};
