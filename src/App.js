import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list:[
        {name: 'apple',  id:1, dueDate: 'Monday'},
        {name: 'pasta',  id:2, dueDate: 'Monday'},
        {name: 'orange', id:3, dueDate: 'Monday'}
      ],
      currentItem: "",
      nextId: 4,
      currentDate: "Monday"
    }
  }

  displayList = () => {
    if (this.state.list.length === 0) {
      return (<h2>No Todos!</h2>)
    }
    return this.state.list.map(
      item => { 
         console.log(item)     
        return (<li>
        <button name={item.name} type="submit" onClick={() => this.removeItem(item.id)}>Delete</button>
        <input name={item.name} placeholder={item.name} id={item.id} onChange={this.newCharacterHandler}></input>
        <button for={item.id} onClick={() => this.myUpdateHandler(item.id)} type="submit">Submit</button>       
        <input name={item.name} id={item.id} placeholder={item.dueDate} onChange={this.newCharacterHandler}></input>
        <button for={item.id} onClick={() => this.updateDate(item.id)} type="submit">Submit</button>
      </li>)
    });
  }

  dateSelection = (event) => {
    this.setState({currentDate: event.target.value})
    console.log(this.state)
  }

  dayOfTheWeek = () => {
    // const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'All']
    return (<div>
      <label for="days">Select Day</label>
      <select name="days" id="days" onChange={this.dateSelection}>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
        <option value="All">All</option>
      </select>
      {this.displayListForDay()}      
    </div>
    )
  }
  
  displayListForDay = () => {
    return this.state.list.map(
      item => { 
        //  console.log(item)     
        if (item.dueDate === this.state.currentDate || this.state.currentDate === "All") {
          return (
          <li>
            <button name={item.name} type="submit" onClick={() => this.removeItem(item.id)}>Delete</button>
            <input name={item.name} placeholder={item.name} id={item.id} onChange={this.newCharacterHandler}></input>
            <button for={item.id} onClick={() => this.myUpdateHandler(item.id)} type="submit">Submit</button>       
            <input name={item.name} id={item.id} placeholder={item.dueDate} onChange={this.newCharacterHandler}></input>
            <button for={item.id} onClick={() => this.updateDate(item.id)} type="submit">Submit</button>
          </li>
        )
        }

    });
  }

  updateDate = (id) => {
    this.setState({
      list: this.state.list.map(item => {
        if (item.id === id) {
          item.dueDate = this.state.currentItem
        }
        return item
      })
    })
  }

  removeItem = (id) => {
    let newState = this.state.list;
    newState = newState.filter(item => id !== item.id);
    this.setState({list: newState});

  }

  newCharacterHandler = (event) => {
    event.preventDefault();
    this.setState({currentItem: event.target.value})
  }

  displayInputForm = () => {
    return (
      <div>
        <input name="new-input" id="new-input" placeholder="Add New Item" onChange={this.newCharacterHandler}></input>
        <button for="new-input" onClick={this.myChangeHandler} type="submit">Submit</button>
      </div>      
    )
  }
  
  myUpdateHandler = (id) => {
    this.setState({
      list: this.state.list.map(item => {
        if (item.id === id) {
          item.name = this.state.currentItem
        }
        return item
      })
    })
  }

  myChangeHandler = (event) => {
    event.preventDefault();
    let val = {name: this.state.currentItem, id:this.state.nextId, dueDate: "Monday"};
    let newState = this.state.list;
    newState.push(val);
    this.setState({list: newState, nextId: this.state.nextId+1});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>To Do List</h1>
          <ul>{this.displayList()}</ul> 
          <ul>{this.displayInputForm()}</ul>
          <ul>{this.dayOfTheWeek()}</ul>


      
        </header>
      </div>
    );
  }

}
