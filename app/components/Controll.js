import React from 'react'

class Controll extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      inputValue: '',
      range: 100
    };
  }

  add(team) {
    if (this.state.inputValue) {
      window.addAction(this.state.inputValue, team);
    }
    // this.setState( { inputValue: '' } );
  }

  initialize(){
    if (this.state.range) {
      window.init(this.state.range);
    }
  }

  changeVal(event) {
    this.setState({inputValue: event.target.value});
  }

  changeRange(event) {
    this.setState({range: event.target.value});
  }

  render() {
    return (
      <div className="controll">
        <div>
          <input type="number" placeholder="seconds..." value={this.state.range} onChange={ this.changeRange.bind(this) }></input>
          <button onClick={ this.initialize.bind(this) }>Init</button>
        </div>
        <div>
          <input type="number" placeholder="seconds..." value={this.state.inputValue} onChange={ this.changeVal.bind(this) }></input>
          <button onClick={ this.add.bind(this, window.HOME) }>Add home</button>
          <button onClick={ this.add.bind(this, window.AWAY) }>Add away</button>
        </div>
      </div>
    )
  }
}

module.exports = Controll;