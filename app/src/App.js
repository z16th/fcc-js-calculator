import React from 'react';
import './App.css';

const buttons = [
  {
    value: '0',
    id: 'zero',
    type: 'number'
  },
  {
    value: '1',
    id: 'one',
    type: 'number'
  },
  {
    value: '2',
    id: 'two',
    type: 'number'
  },
  {
    value: '3',
    id: 'three',
    type: 'number'
  },
  {
    value: '4',
    id: 'four',
    type: 'number'
  },
  {
    value: '5',
    id: 'five',
    type: 'number'
  },
  {
    value: '6',
    id: 'six',
    type: 'number'
  },
  {
    value: '7',
    id: 'seven',
    type: 'number'
  },
  {
    value: '8',
    id: 'eight',
    type: 'number'
  },
  {
    value: '9',
    id: 'nine',
    type: 'number'
  },
  {
    value: '+',
    id: 'add',
    type: 'operator'
  },
  {
    value: '-',
    id: 'subtract',
    type: 'operator'
  },
  {
    value: '*',
    id: 'multiply',
    type: 'operator'
  },
  {
    value: '/',
    id: 'divide',
    type: 'operator'
  },
  {
    value: 'C',
    id: 'clear',
    type: 'ui'
  },
  {
    value: '=',
    id: 'equals',
    type: 'operator'
  },
  {
    value: '.',
    id: 'decimal',
    type: 'operator'
  },
]

function postfix(str){
  const operatorRegex = /([+*/]|(?<![+*/])-)/
  let inputs = []
  inputs = str.split(operatorRegex)
  console.log(`Numbers: ${inputs}`)
}

function App() {
  const [ display, setDisplay ] = React.useState('0')
  const [ allowDecimal, setAllowDecimal ] = React.useState(true)

  function handleClick(value){
    if( value === '0' && display === '0') return
    switch(value){
      case '+':
      case '-':
      case '*':
      case '/':
      case 'C':
      case '=':
      setAllowDecimal(true)
    }
    switch(value){
      case 'C':
        setDisplay('0')
      break;
      case '=':
        postfix(display)  
      // setDisplay('Calculating')
      break;
      case '.':
        if(display.slice(-1) === '.' || !allowDecimal) return
        setAllowDecimal(false)
      //fall
      default:
        if(display === '0' && value !== '.') setDisplay(value)
        else{
          setDisplay(display + value)
        }
    }
  }

  return (
    <div className="App">

      <div id='display'>{display}</div>

      <div id='pad'>
        {buttons.map( ({value, id, type}) => (
          <div key={id} id={id} className={`button ${type}`} onClick={() => handleClick(value)}>{value}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
