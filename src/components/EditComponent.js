import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {updateServer} from '../actions/index';

class EditComponent extends Component {
  constructor(props) {
    super(props);
      this.onChangeHostName = this.onChangeHostName.bind(this);
      this.onChangePort = this.onChangePort.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        name: '',
        port: ''
      }
  }

  componentDidMount() {
    axios.get('http://localhost:4200/serverport/edit/'+this.props.match.params.id)
    .then(response => {
      this.setState({ name: response.data.name, port:response.data.port})
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  onChangeHostName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangePort(e) {
    this.setState({
      port: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()
    const serverport = {
      name: this.state.name,
      port: this.state.port
    }
    this.props.updateServer(this.props.match.params.id, serverport)
    this.setState({
      name: '',
      port: ''
    })
    this.props.history.push('/index');
  }

  render() {
    return (
      <div style={{marginTop: 50}}>
        <h3>Edit New Server</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>
              Edit host name:
            </label>
            <input type="text" value={this.state.name} className="form-control" onChange={this.onChangeHostName}/>
          </div>
          <div className="form-group">
            <label>
              Edit server port:
            </label>
            <input type="text" value={this.state.port} className="form-control" onChange={this.onChangePort}/>
          </div>
          <div className="form-group">
            <input type="submit" value="Update server" className="btn btn-primary"></input>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    servers: state.servers.servers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateServer: (id, server) => {
      dispatch(updateServer(id, server))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComponent)
