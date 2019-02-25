import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getServers} from '../actions/index';
import TableRow from './TableRow'

class IndexComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {serverports: []}
  }

  componentDidMount() {
    this.props.getServers()
  }

  tableRow() {
    return this.props.servers.map(function(object, i) {
      return <TableRow obj={object} key={i} />;
    })
  }

  render() {
    return (
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Port</td>
            </tr>
          </thead>
          <tbody>
            {this.tableRow()}
          </tbody>
        </table>
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
    getServers: () => {
      dispatch(getServers())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexComponent)
