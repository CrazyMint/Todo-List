import React, { Component } from "react";

export default class Layout extends Component {
	render() {
		const { onIndexChange, children } = this.props;
		return (
			<>
				<header>
					<ul
						style={{
							backgroundColor: "bisque",
							display: "flex",
							"flex-direction": "row",
							alignItems: "center",
							height: "30px",
							gap: "20px",
							listStyle: "none",
							cursor: "pointer",
						}}
					>
						<li onClick={() => onIndexChange(0)}>Dashboard</li>
						<li onClick={() => onIndexChange(1)}>Todolist</li>
					</ul>
				</header>
				<main>{children}</main>
			</>
		);
	}
}
