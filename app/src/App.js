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

function calculate(inputs){
  const operations = {
    '+': (a,b) => (a + b),
    '-': (a,b) => (a - b),
    '*': (a,b) => (a * b),
    '/': (a,b) => (a / b),
  }

  let numbers = []
  let operators = []

  inputs.forEach(element => {
    if(element.match(/[0-9]$/)){
      numbers.push(element)
      console.log('numbers ' + numbers)
    }else{
      if(element === ''){
        operators.pop()
        return
      }
      operators.push(element)
      console.log('operators ' + operators)
    }
  });

  while(numbers.length > 1){
    const a = Number(numbers.shift())
    const b = Number(numbers.shift())
    numbers.unshift(operations[operators.shift()](a,b))
    console.log('calculated numbers: '+ numbers)
  }
  return numbers[0]
}

function toArray(str){
  const operatorRegex = /([+*/]|(?<![+*/])-)/
  let inputs = []
  inputs = str.split(operatorRegex)
  console.log(`Numbers: ${inputs}`)
  return inputs;
}

function App() {
  const [ display, setDisplay ] = React.useState('0')
  const [ allowDecimal, setAllowDecimal ] = React.useState(true)
  
  const lastCharacter = () => {
    return display[display.length-1]
  }

  const handleClick = (value) => {
    if(value === '=') {
      const updatedValue = calculate(toArray(display))
      setDisplay(updatedValue)
      setAllowDecimal(true)
      console.log('display '+ display)
      console.log(allowDecimal)
      return
    }

    if(value === 'C') {
      setDisplay('0')
      setAllowDecimal(true)
      return
    }

    if(value.match(/[+\-*/]/) && !allowDecimal){
      setAllowDecimal(true)
    }

    if(value === '.'){
      console.log('point')
      if(allowDecimal === true){
        setDisplay(display + value)
        setAllowDecimal(false)
      }
      return
    }

    if(display === '0'){
      if( value.match(/[0-9]/)) return setDisplay(value)
      if( value.match(/[+\-*/]/)) return
      if( value === '.') return setDisplay('0.')
    }

    if(
      value.match(/[0-9]/)
      || (lastCharacter().match(/[0-9]/) && value.match(/[+\-*/]/)) 
      || (value.match(/[-]/) && display.slice(-2).match(/(?<=[0-9])[*/]/))
    )
    {
      setDisplay(display + value)
    }else if(
      (display.slice(-2).match(/[+-]/) && value.match(/[+\-*/]/))
      || (lastCharacter().match(/[+*/]/) && value.match(/[+*/]/))
    ){
      setDisplay(display.slice(0,-1) + value)
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
