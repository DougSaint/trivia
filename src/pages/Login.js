import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import getToken from '../services/getToken';
import '../App.css';
import logo from '../trivia.png';
import { enviaDadosLogin, resetaQuestoes, resetaScore } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    name: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const { email, name } = this.state;
    const token = await getToken();
    const emailConvertido = md5(email).toString();
    localStorage.setItem('token', token);
    const payload = {
      name,
      gravatarEmail: emailConvertido,
    };
    dispatch(enviaDadosLogin(payload));
    dispatch(resetaQuestoes());
    dispatch(resetaScore());
    history.push('/game');
  };

  render() {
    const { history } = this.props;
    const { email, name } = this.state;
    const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    const lengthName = 0;
    return (
      <main className="h-full w-full flex flex-col items-center ">
        <img src={ logo } className="w-4/6 mt-12 md:w-3/6" alt="logo" />
        <div className="flex flex-col mt-10">
          <label htmlFor="email" className="mt-5">
            <input
              className="rounded-md p-1"
              data-testid="input-gravatar-email"
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="name" className="my-5">
            <input
              className="rounded-md p-1"
              data-testid="input-player-name"
              id="name"
              name="name"
              type="text"
              placeholder="Nome"
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="mb-3 bg-cyan-500 text-white rounded-md py-1 cursor-pointer active:scale-95 disabled:bg-slate-600 disabled:text-slate-500"
            data-testid="btn-play"
            type="button"
            disabled={ !(emailPattern.test(email) && name.length > lengthName) }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
          <button
            className="rounded-md py-1 bg-slate-400 text-white"
            data-testid="btn-settings"
            type="button"
            onClick={ () => {
              history.push('/settings');
            } }
          >
            Configurações
          </button>
        </div>

      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default connect()(Login);
