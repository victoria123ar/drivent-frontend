import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';

export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <CardContent>
        <div id="PaymentForm">
          <Cards
            cvc={this.state.cvc}
            expiry={this.state.expiry}
            focused={this.state.focus}
            name={this.state.name}
            number={this.state.number}
          />
        </div>
        <form>
          <input
            type="number"
            name="number"
            placeholder="Card Number"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <Jorge>E.g.: 49..., 51..., 36..., 37...</Jorge>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <input
            type="number"
            name="expiry"
            placeholder="Valid Thru"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            className="validThru"
          />
          <input
            type="number"
            name="cvc"
            placeholder="CVC"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            className="cvc"
          />
        </form>
      </CardContent>
    );
  }
}

const CardContent = styled.div`
  display: flex;
  form {
    display: flex;
    justify-content: space-between;
    width: 350px;
    flex-wrap: wrap;
    margin-left: 30px;

    input {
      width: 100%;
      height: 48px;
      background: #ffffff;
      border: 2px solid #d5d5d5;
      border-radius: 5px;
      box-sizing: border-box;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      padding-left: 20px;
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      &:placeholder-shown {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        padding-left: 10px;
        color: #dbdbdb;
      }
    }
    .validThru {
      width: 210px;
      margin-top: 15px;
    }
    .cvc {
      width: 120px;
      margin-top: 15px;
    }
  }
`;
const Jorge = styled.h5`
  margin-bottom: 15px;
  padding-left: 5px;
  color: gray;
`;
