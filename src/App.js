import './App.css';
import React, { useState } from 'react';


//Функциональные и классовые компоненты
/***************************************************************************** */
const App = (props) => <>HALLO</>

function App_0(props) {
  return (
    <>HALLO functional {props.name}</>
  );
}

class App_1 extends React.Component {
  constructor(props) {
    super(props)
    console.info('creare app')
  }

  render() {
    return <>HALLO class {this.props.name}</>
  }
}
/***************************************************************************** */

//Композиция компонентов
/***************************************************************************** */

function App_3() {
  return (
    <>
      <Layer name={'name1'}>HALLO</Layer>
      <Layer name={'name2'}>HALLO1</Layer>
    </>
  );
}

function Layer(props) {
  return <>
    <div>Layer {props.name}</div>
    {props.children}
  </>
}

//внутреннее состояние и методы жизненного цикла
/***************************************************************************** */
class App_4 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 'value1': 'Значение ' + new Date().getTime() }
  }

  componentDidMount() {
    console.info('did mount')
    window.interval = window.setInterval(() => this.setState(prevState  => { return { 'value1': 'Значение ' + new Date().getTime() }}), 1000)
  }

  componentDidUpdate() {
    console.info('did update')
  }

  componentWillUnmount() {
    console.info('will unmount')
    window.interval && window.clearInterval(window.interval)
  }

  render() {
    return <>{this.state.value1}</>
  }
}

// Обработка событий
/***************************************************************************** */

class App_5 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 'value1': 'Значение ' + new Date().getTime() }
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    this.setState({ 'value1': 'Значение ' + new Date().getTime() })
  }

  render() {

    return <>
      <div>{this.state.value1}</div>

      <div>
        <button onClick={this.handleClick}>PRESS 1</button>
      </div>
      <div>
        <button onClick={() => this.handleClick()}>PRESS 2</button>
      </div>
      <div>
        <button onClick={() => this.setState({ 'value1': 'Значение ' + new Date().getTime() })}>PRESS 3</button>
      </div>
    </>
  }
}

//setState, onChange, передача значений между компонентами
/***************************************************************************** */

class App_6 extends React.PureComponent {

  constructor(props) {
    super(props)

    this.state = { 'value1': 'Значение 1', 'value2': 'Значение 2' }
  }

  render() {

    const handleChange1 = (event) => this.setState({ 'value1': event.target.value })

    const handleChange2 = (event) => this.setState({ 'value2': event.target.value })

    return <>
      <div style={{ 'height': '20px' }} />
      <div style={{ 'border': '1px solid black', 'height': '400px', 'textAlign': 'center' }}>

        <div>
          <input type="text" value={this.state.value1} style={{ 'backgroundColor': 'aqua' }} onChange={handleChange1} />
          <span style={{ 'paddingLeft': '20px' }}></span>
          <button>press 1</button>
        </div>
        <span>{this.state.value1}</span>
        <span> - </span>
        <span>{this.state.value2}</span>

        <hr />

        <Layer1>
          <Layer2>
            <Layer3 callback={handleChange2}></Layer3>
          </Layer2>
        </Layer1>

        <hr/>

        <Layer4/>
        
      </div>
    </>
  }
}

function Layer1(props) {

  return (<>
    <div>Layer1</div>
    {props.children}
  </>)
}


function Layer2(props) {

  return <>
    <div>Layer2</div>
    {props.children}
  </>
}


function Layer3(props) {

  const [value2, setValue2] = useState("Значение 2")

  const handleChange2 = (event) => setValue2(event.target.value)

  const handle2AppValue2 = () => props.callback({ target: { value: value2 } })

  return <>
    <div>Layer3</div>
    <div>.</div>
    <div>
      <input type="text" value={value2} onChange={handleChange2} style={{ 'backgroundColor': 'yellow' }} />
      <span style={{ 'paddingLeft': '20px' }}></span>
      <button onClick={handle2AppValue2}>press 2</button>
    </div>
    <span>{value2}</span>
    <div>.</div>
  </>
}


function Layer4() {

  return <>
    <div>Layer4</div>
  </>
}

export default App;
