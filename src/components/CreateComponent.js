import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addServer} from '../actions/index';
class CreateComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      port: ''
    }

    this.onChangeHostName = this.onChangeHostName.bind(this)
    this.onChangePort = this.onChangePort.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChangeHostName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangePort(e) {
    this.setState({
      port: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(`name is ${this.state.name} and port is ${this.state.port}`)
    this.props.addServer(this.state.name, this.state.port)
    this.props.history.push('/index')
  }

  render() {
    return (
      <div style={{marginTop: 50}}>
        <h3>Add New Server</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Add Host Name: </label>
            <input type="text" value={this.state.name} className="form-control" onChange={this.onChangeHostName}></input>
          </div>
          <div className="form-group">
            <label>Add Server Port: </label>
            <input type="text" value={this.state.port} className="form-control" onChange={this.onChangePort}></input>
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="Add Node Server"></input>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    servers: state.servers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addServer: (name, port) => {
      dispatch(addServer(name, port))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComponent)