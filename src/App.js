import React, { Component } from 'react';
import update from 'immutability-helper';
import math from 'mathjs';
import './App.scss';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: ['0'],
    }
  this.handleClick = this.handleClick.bind(this);
  this.calculateOperations = this.calculateOperations.bind(this);
}

calculateOperations() {
  let result = this.state.operations.join('')
  if (result) {
    result = math.eval(result);
    result = math.format(result, {precision: 14})
    result = String(result)
    this.setState({
      operations: [result]
    })
  }
}

handleClick(event) {
    const value = event.target.getAttribute('data-value')
    switch (value) {
      case "clear":
      this.setState({
        operations: ['0']
      });
      break;

      case "=":
      this.calculateOperations();
      break;

      default:
      const newOperations = update(this.state.operations, {
        $push : [value]
      });
      this.setState({
        operations: newOperations
      });
      break;
    }
  }

  render () {
    return ( 
    <div className="container text-center">
          <h1 className="header">JAVASCRIPT CALCULATOR</h1>
      <div className="calculator">
        <Display data={this.state.operations} />
        <Buttons>
          <div className="row">
            <Button onClick={this.handleClick} label="1" id="one" value="1" />
            <Button onClick={this.handleClick} label="2" id="two" value="2" />
            <Button onClick={this.handleClick} label="3" id="three" value="3" />
            <Operator onClick={this.handleClick} label="+" id="add" value="+" />
          </div>  

          <div className="row">
            <Button onClick={this.handleClick} label="4" id="four" value="4" />
            <Button onClick={this.handleClick} label="5" id="five" value="5" />
            <Button onClick={this.handleClick} label="6" id="six" value="6" />
            <Operator onClick={this.handleClick} label="-" id="subtract" value="-" />
          </div>

          <div className="row">
            <Button onClick={this.handleClick} label="7" id="seven" value="7" />
            <Button onClick={this.handleClick} label="8" id="eight" value="8" />
            <Button onClick={this.handleClick} label="9" id="nine" value="9" />
            <Operator onClick={this.handleClick} label="*" id="multiply" value="*" />
          </div>

          <div className="row">  
            <Blank label="" id="" value="" />
            <Button onClick={this.handleClick} label="0" id="zero" value="0" />
            <Button onClick={this.handleClick} label="." id="decimal" value="." />
            <Operator onClick={this.handleClick} label="/" id="divide" value="/" />
          </div>

          <div className="row">
            <Clear onClick={this.handleClick} label="C" id="clear" value="clear" />
            <Equals onClick={this.handleClick} label="=" id="equals" value="=" />
          </div>
        </Buttons>
      </div>
    </div>
    );
  }
}

class Button extends Component {
  render() {
    return (
      <div className="Button btn btn-primary col-2" onClick={this.props.onClick} data-size={this.props.size} data-value={this.props.value}>
      {this.props.label}
      </div>
    );
  }
}

class Blank extends Component {
  render() {
    return (
      <div className="Blank btn btn-secondary col-2" onClick={this.props.onClick} data-size={this.props.size} data-value={this.props.value}>
      {this.props.label}
      </div>
    );
  }
}

class Operator extends Component {
  render() {
    return (
      <div className="Operator btn btn-warning col-3" onClick={this.props.onClick} data-size={this.props.size} data-value={this.props.value}>
      {this.props.label}
      </div>
    );
  }
}

class Clear extends Component {
  render() {
    return (
      <div className="Clear btn btn-danger col-5" onClick={this.props.onClick} data-size={this.props.size} data-value={this.props.value}>
      {this.props.label}
      </div>
    );
  }
}

class Equals extends Component {
  render() {
    return (
      <div className="Equals btn btn-success col-5" onClick={this.props.onClick} data-size={this.props.size} data-value={this.props.value}>
      {this.props.label}
      </div>
    );
  }
}

class Buttons extends Component {
  render() {
    return <div className="Buttons"> {this.props.children} </div>
  }
}

class Display extends Component {
  render() {
    const string = this.props.data.join('')
    return <div className="Display"> {string} </div>
  }
}

export default Calculator;
