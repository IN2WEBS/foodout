import React from 'react';
import axios from 'axios';

class HomePage extends React.Component {

  state={
    message:'',
    img:''
  };

  componentDidMount(){
    axios.get('/api/welcome').then((response)=>{
        console.log(response.data);
        this.setState({
          message:response.data.message,
          img:response.data.url
        })
    })
  }

  render() {

    return (
        <div className="home-page">
          <h1>McDonalds</h1>
          <h2>{this.state.message}</h2>
          {this.state.img &&
          <img src={this.state.img} alt=""/>
          }
        </div>
    );
  }
}
export default HomePage