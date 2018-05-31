import React from 'react';
import {connect} from 'react-redux';
import * as actionsCat from '../../actions/categories';
import * as actionsMenu from '../../actions/menu';
import {Field, reduxForm} from 'redux-form'
import axios from 'axios'
const actions = {...actionsCat, ...actionsMenu};

class AdminMenu extends React.Component {

  state = {
    message: '',
    item: []
  };

  addProduct = (values) => {
    values.category = this.props.active;

    console.log(values);
    axios.post('/api/admin/additem', values).then((res) => {

      console.log(res.data);
      this.setState({message: res.data.message});

      //itraukiam nauja item i reduceri pagal gauta response
      const {name, price, category} = res.data;
      this.props.addItem({name,price,category})
    })
  };

  componentDidMount() {
    // darot axios.get uzklausa i serveri pasirinktu route
    // serveryje padarom route.get pasirinktu adresu
    // response grazinam is db gautus irasus
  }

  render() {

    const categories = this.props.categories.map((item, i) => {
      return (
          <li
              className={this.props.active === item.name ? 'active-cat' : null}
              onClick={() => this.props.switchCategory(item.name)}
              key={i}>
            {item.name}
          </li>
      )

    });

    const items = this.props.menu.filter(item => {
      return item.category === this.props.active
    }).map((item, i) => {
      return (
          <div key={i} className="menu-item">
            <h3>{item.name}</h3>
            <img src={item.img} alt=""/>
            <h4>{item.price}</h4>
            <h5>remove</h5>
          </div>
      )
    });

    return (
        <div className="admin-menu">
          <ul>
            {categories}
          </ul>
          {this.props.active &&
          <form onSubmit={this.props.handleSubmit(this.addProduct)}>
            <Field name="name" component="input" type="text" placeholder="name"/>
            <Field name="price" component="input" type="number" placeholder="price"/>
            <button type="submit">Add</button>
          </form>
          }
          <h2>{this.state.message}</h2>
          <div className="menu-list">
            {items}
          </div>
        </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    menu: state.menu,
    active: state.active
  }
};

AdminMenu = reduxForm({
  // a unique name for the form
  form: 'menu'
})(AdminMenu);

export default connect(mapStateToProps, actions)(AdminMenu)