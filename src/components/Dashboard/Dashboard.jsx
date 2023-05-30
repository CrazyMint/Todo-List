import React, { Component } from "react";
import { withTodos } from "../hoc/withTodos";

class Dashboard extends Component {
	render() {
		const { todos } = this.props;
		const totalTodo = todos.length;
		const totalCompletedTodo = todos.filter(
			(todo) => todo.completed === true
		).length;

		return (
			<div>
				<p>Total number of todos: {totalTodo}</p>
				<p>Total number of completed todos: {totalCompletedTodo}</p>
			</div>
		);
	}

	// componentDidMount() {
	// 	getTodos().then((todos) => {
	// 		this.setState({
	// 			totalTodo: todos.length,
	// 			totalCompletedTodo: todos.filter((todo) => todo.completed === true)
	// 				.length,
	// 		});
	// 	});
	// }
}

export default withTodos(Dashboard);
