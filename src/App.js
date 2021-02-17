import './App.scss';
import React from 'react'

class App extends React.Component {
  state = {
    plaseholder:"hello calendar",
  }
  render() {

   return (
     <>
       <h1>{this.state.plaseholder}</h1>

     </>

   )
  }
}

export default App;
