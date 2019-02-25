import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {deleteServer} from '../actions/index';

class TableRow extends Component {

  constructor(props) {
    super(props)
    this.delete = this.delete.bind(this)
  }

  delete() {
    this.props.deleteServer(this.props.obj._id)
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.obj._id}
        </td>
        <td>
          {this.props.obj.name}
        </td>
        <td>
          {this.props.obj.port}
        </td>
        <td>
          <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">Delete</button>
        </td>
      </tr>

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
    deleteServer: (id) => {
      dispatch(deleteServer(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRow)
