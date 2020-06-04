import React from 'react';
import './App.css';

function App() {
  const [ display, setDisplay ] = React.useState('0')
  return (
    <div className="App">

      <div id='display'>{display}</div>

      <div id='zero'>0</div>
      <div id='one'>1</div>
      <div id='two'>2</div>
      <div id='three'>3</div>
      <div id='four'>4</div>
      <div id='five'>5</div>
      <div id='six'>6</div>
      <div id='seven'>7</div>
      <div id='eight'>8</div>
      <div id='nine'>9</div>

      <div onClick={() => console.log('clicked')} id='add'>+</div>
      <div onClick={() => console.log('clicked')} id='subtract'>-</div>
      <div onClick={() => console.log('clicked')} id='multiply'>*</div>
      <div onClick={() => console.log('clicked')} id='divide'>/</div>

      <div id='clear'>C</div>
      <div id='equals'>=</div>
      <div id='decimal'>.</div>


    </div>
  );
}

export default App;
