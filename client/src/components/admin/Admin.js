import React from 'react';
import {Route, Switch, NavLink} from 'react-router-dom';
import Menu from './AdminMenu';
import Orders from './AdminOrders';
import * as menuActions from '../../actions/menu';
import * as catActions from '../../actions/categories';
import * as addActiveOrder from '../../actions/orders';
import {connect} from 'react-redux';
import io from 'socket.io-client';

const actions = {...menuActions, ...catActions, ...addActiveOrder};

class Admin extends React.Component{

    constructor(props){
        super(props);
        const socket = io('http://localhost:9000');
        socket.on('connect', function(){
            console.log('connect to server');
        });
        socket.on('order', function (data) {
            console.log(data);
            props.addActiveOrder(data)
        })
    }

    componentDidMount(){
      this.props.fetchMenu();
      this.props.fetchCategories();
    }

    render(){
        return (
        <div className="admin">

          <aside>
            <NavLink to="/admin/orders" activeClassName="active">Orders</NavLink>
            <NavLink to="/admin/menu" activeClassName="active">Menu</NavLink>
          </aside>
          <Switch>
            <Route exact path="/admin/orders" component={Orders}/>
            <Route exact path="/admin/menu" component={Menu}/>
          </Switch>
        </div>
        );
    }
}
export default connect(null, actions)(Admin)