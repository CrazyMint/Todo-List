import React from "react";
import "./App.css";
import ListContainer from "./components/ListContainer/ListContainer";
import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";

class App extends React.Component {
	state = {
		index: 0,
	};

	handleIndexChange = (index) => {
		this.setState({ index });
	};

	render() {
		let content = null;
		if (this.state.index === 0) {
			content = <Dashboard />;
		} else if (this.state.index === 1) {
			content = <ListContainer />;
		}
		return (
			<div className="app">
				<Layout onIndexChange={this.handleIndexChange}>{content}</Layout>
			</div>
		);
	}
}

export default App;
