import React from 'react';
import './App.css';



class App extends React.Component {
  constructor(props = { c: 2 }) {
    super(props)
    this.state = {
      a: 1,
      count: 0,
    }
  }
  componentDidMount() {
    // this.setState({ count: this.state.count + 1 })
    // this.setState({ count: this.state.count + 1 })
    // console.log(this.state.count, 'a') // 2 ==> 0
    // this.setState(state => ({ count: state.count + 1 }))
    // this.setState(state => ({ count: state.count + 1 }))
    // console.log(this.state.count, 'b') // 3 ==> 0
    // setTimeout(() => {
    //   this.setState({ count: this.state.count + 1 })
    //   console.log('timeout', this.state.count) // 10 ==> 6
    //   this.setState({ count: this.state.count + 1 })
    //   console.log('timeout', this.state.count) // 12 ==> 7
    // }, 0)
    // Promise.resolve().then(value => {
    //   this.setState({ count: this.state.count + 1 })
    //   console.log('promise', this.state.count)  // 6 ==>4
    //   this.setState({ count: this.state.count + 1 })
    //   console.log('promise', this.state.count) // 8 ==> 5
    // })
  }
  // shouldComponentUpdate(b, a) {
  // console.log(1, b, a);
  // return false
  // }
  // componentWillUpdate(b, a) {
  //   console.log(2, b, a);
  // }
  componentDidUpdate(b, a) {
    console.log(3, b, a);

  }
  // increment = () => {
  //   this.setState({
  //     a: this.state.a + 1
  //   })
  // this.setState(pre => {
  //   return { a: pre.a + 1 }
  // })
  // }
  click = () => {
    console.log(this.state);
    this.setState(
      pre => { return { count: pre.count + 1 } }
    )
    // this.setState(
    //   pre => { return { count: pre.count + 1 } }
    // )
    // this.setState(
    //   pre => { return { count: pre.count + 1 } }
    // )
  }
  render() {
    return (
      <div onClick={() => { this.click() }}>
        changeState{this.state.count}
      </div>
    )
  }
}



export default App;
