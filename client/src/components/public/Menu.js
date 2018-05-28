import React from 'react';
import {connect} from 'react-redux';

const Menu = (props) => {

  const items = props.menu.filter(item => {
    // return item.category === props.active || !props.active
    return item.category === props.active
  }).map((item, i) => {
    return (
        <div key={i} className="menu-item">
          <h3>{item.name}</h3>
          <img src={item.img} alt=""/>
          <h4>{item.price}</h4>
        </div>
    )
  });
  return (
      <div className="menu">
        <h1>Menu</h1>
        <h2>{props.active}</h2>
        <div className="menu-list">
          {items}
        </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    menu: state.menu,
    active: state.active
  }
};

export default connect(mapStateToProps)(Menu)