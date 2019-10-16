import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Информация о пользователях</h1>
      <Button label="Получить пользователей" />
    </div>
  );
}

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
    this.state = { loading: false };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    this.setState({ loading: true });
    let response = await fetch(
      "https://randomuser.me/api/?results=10&inc=gender,name,location,email,dob,phone,picture"
    );
    if (!response.ok) {
      alert("HTTP error: " + response.status);
      this.setState({ loaded: false });
    } else {
      let data = await response.text();
      this.setState({ users: data });
      this.setState({ loaded: true });
    }

    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading)
      return (
        <div className="Button">
          <Preloader />
        </div>
      );
    else if (this.state.loaded)
      return (
        <div className="Button">
          <button onClick={this.handleClick}>{this.props.label}</button>
          <br />
          <br />
          <UsersList users={this.state.users} />
        </div>
      );
    else
      return (
        <div className="Button">
          <button onClick={this.handleClick}>{this.props.label}</button>
        </div>
      );
  }
}

function Preloader(props) {
  return (
    <div className="Preloader">
      <h2>Идёт загрузка...</h2>
    </div>
  );
}

function UsersList(props) {
  var users = JSON.parse(props.users);
  var user_cards = [];
  for (var i = 0; i < users.results.length; i++) {
    user_cards.push(<UserCard user={users.results[i]} />);
  }

  return <div className="UsersList">{user_cards}</div>;
}

function UserCard(props) {
  return (
    <div className="UserCard">
      <UserAvatar
        src={props.user.picture.thumbnail}
        width="50px"
        height="50px"
      />

      <b>
        {props.user.name.first} {props.user.name.last}
      </b>
      <p>
        {props.user.location.city}, {props.user.location.state}
      </p>
      <p>
        {props.user.email}, {props.user.phone}
      </p>
      <p>
        {props.user.dob.date}, {props.user.dob.age}, {props.user.gender}
      </p>
      <br />
      <br />
    </div>
  );
}

function UserAvatar(props) {
  return (
    <div className="UserAvatar">
      <img
        src={props.src}
        width={props.width}
        height={props.height}
        alt="user avatar"
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
