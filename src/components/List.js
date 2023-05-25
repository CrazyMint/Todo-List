import React, { Component } from "react";

export default class List extends Component {
	render() {
		const { listItems, handleDelete } = this.props;
		const renderListItems = listItems.map((value, index) => (
			<li item-id={value.id} key={index}>
				<span>{value.content}</span>
				<button
					onClick={(event) => {
						handleDelete(event.target.parentNode.getAttribute("item-id"));
					}}
				>
					remove
				</button>
			</li>
		));
		return <ul>{renderListItems}</ul>;
	}
}
