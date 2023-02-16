import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <header 
      className="w-100 flex justify-between p-4 bg-gray-800 border-b-2 border-white-900">
        <img src={ logo } className="w-3/12" />

        <div className="flex md:w-2/6 justify-around items-center">
          <div className="w-6/12 flex items-center justify-center">
            <img
              className="w-2/12 h-4/6 rounded-full self-center"
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
              alt={ `avatar-de-${name}` }
            />
            <h2 data-testid="header-player-name" className="text-white px-2 self-center md:text-xl">{ name }</h2>
          </div>

          <h2 data-testid="header-score" className="  md:text-xl text-white">
            Pontuação :{' '}
            { score }
          </h2>
        </div>

      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
