import React from "react";
import data from "./data";

import Header from './Header';
import List from './List';
import ItemForm from './ItemForm';

console.log(data);

class UIManager extends React.Component {
	constructor() {
		super();
		this.state = {
			listName: "The list",
			list: data.music,
			searchTerm: '',
			formFields: {
				id: '',
				title: '',
				artist: '',
				album: '',
			},
		}
	}

	// data API - CRUD methods
	createItem() {
		// debugger;
		console.log("[UIManager] Create ");

		// get Item data from state
		var item = this.state.formFields;
		// copy list values, not reference, using ES6 spread operator
		var currentListItems = [...this.state.list];
		// add new item
		currentListItems.push(item);
		// apply change to state
		this.setState({
			list: currentListItems
		});

		// empty fields for next round
		this.setState({
			formFields: {
				id: '',
				title: '',
				artist: '',
				album: ''
			}
		});
	}

	deleteItem(item_id) {
		console.log("[UIManager]: delete ", item_id);
	}

	editItem(item_id) {
		console.log("[UIManager]: edit ", item_id);
	}

  // end of CRUD methods

	searchList(event) {
		var searchTerm = event.target.value;
		// debugger;
		console.log(`${this.state.searchTerm} ->  ${searchTerm}`);

		this.setState({
			searchTerm: searchTerm
		});
	}

	onChangeFormInput(event) {
		// copy values (not reference) using ES6 spread
		var currentListFields = { ...this.state.formFields };    
		// e.g. current_list_fields['artist'] = 'Artist1'
		currentListFields[event.target.name] = event.target.value;
		// apply new value to state
		this.setState({
			formFields: currentListFields
		});
	}

	showForm() {
		var modal = document.querySelector('.modal');
		modal.style.display = "block";
	}

	render() {
		// filter list based on current user input -> searchTerm
		var list = this.state.list;
		var searchTerm = this.state.searchTerm;
		var filteredList;

		if (!searchTerm) {
			filteredList = list;
		} else {
			filteredList = list.filter(function (item) {
				return item.title.toLowerCase().includes(searchTerm.toLowerCase());
			});
		}

		return (
			<div>
				<Header />
				<div className="options">
					<input type="text"
						placeholder="Filter..."
						onChange={(event) => this.searchList(event)} />
					<span className="add" onClick={this.showForm}>[➕]</span>
				</div>
				<List list={filteredList} 
						deleteItem={(item_id) => this.deleteItem(item_id) }
						editItem={(item_id) => this.editItem(item_id) } />
				<ItemForm item={this.state.formFields}
							onChangeFormInput={(event) => this.onChangeFormInput(event)} 
							createItem={() => this.createItem() } />
			</div>

		);
	}
}

export default UIManager;
