import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container } from "reactstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minute: 0,
      second: 0,
      symbol: " ",
      singleRow: [{ o: 0 }, { h: 0 }, { l: 0 }, { c: 0 }, { pc: 0 }, { t: 0 }],
      rowsToAdd: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callAPI() {
    const url = `https://finnhub.io/api/v1/quote?symbol=${this.state.symbol}&token=brhid0nrh5ra2pui5s9g`;

    const min = 60 * parseInt(this.state.minute);
    const sec = parseInt(this.state.second);
    const time = 1000 * (min + sec);

    console.log("Time is ", time, min, sec);
    var refresh = setInterval(() => {
      var today = new Date();
      var timeStamp =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          var oneRow = this.state.singleRow;
          oneRow = {
            o: json.o,
            h: json.h,
            l: json.l,
            c: json.c,
            pc: json.pc,
            t: timeStamp,
          };

          this.setState({ singleRow: oneRow });
          this.setState({ rowsToAdd: [...this.state.rowsToAdd, oneRow] });
          //const index = this.state.rowsToAdd.length;
        });
      console.log(this.state.rowsToAdd);
    }, time);
    return () => clearInterval(refresh);
  }

  componentDidMount() {}
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    // console.log(this.state.minute);
    // console.log(this.state.second);
    // console.log(this.state.symbol);
  }

  handleSubmit(event) {
    // console.log(this.state.minute);
    // console.log(this.state.second);
    // console.log(this.state.symbol);
    event.preventDefault();
    this.callAPI();
  }

  render() {
    return (
      <React.Fragment>
        <Container style={{ display: "inline-block"}}>
          <label>
            MINUTE
            <input type="text" name="minute" onChange={this.handleChange} />
          </label>
          <label>
            SECOND
            <input type="text" name="second" onChange={this.handleChange} />
          </label>
          <label>
            SYMBOL
            <input type="text" name="symbol" onChange={this.handleChange} />
          </label>
          <button onClick={this.handleSubmit}>SUBMIT</button>
        </Container>
        <br />
        <br />
        <table>
          <tbody>
            <tr>
              <th>Open price</th>
              <th>High price</th>
              <th>Low price</th>
              <th>Current price</th>
              <th>Previous close price</th>
              <th>Time</th>
            </tr>

            {this.state.rowsToAdd.map((row, key) => (
              <tr key={key}>
                <th>{row.o}</th>
                <th>{row.h}</th>
                <th>{row.l}</th>
                <th>{row.c}</th>
                <th>{row.pc}</th>
                <th>{row.t}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
