import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { score, assertions, history, gravatarEmail, name } = this.props;
    const minScore = 3;

    return (
      <div className="text-center h-full flex flex-col ">
        <Header />
        <main className="h-full flex flex-col ">
          <div className="h-4/6 bg-purple-200 md:w-2/6 mt-5 rounded-xl flex flex-col items-center justify-center self-center p-4">
            <img
              className="w-4/12 h-5/12 rounded-full self-center"
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
              alt={ `avatar-de-${name}` }
            />
            <span data-testid="feedback-text" className="text-xl text-slate-600 mt-2">
              {assertions < minScore ? 'Could be better...' : 'Well Done!'}
            </span>
            <div className="flex w-full justify-around mt-3 text-slate-600">
              <p data-testid="feedback-total-question">
                Acertos:
                {assertions}
              </p>
              <p data-testid="feedback-total-score">
                Pontuação:
                {score}
              </p>
            </div>
          </div>
          <div className="flex md:w-2/6 mx-auto mt-3 justify-around">
            <button
              className="bg-cyan-700 rounded-xl py-1 px-4 w-5/12 text-slate-100"
              data-testid="btn-play-again"
              type="button"
              onClick={ () => {
                history.push('/');
              } }
            >
              Jogar Novamente
            </button>
            <button
              className="bg-cyan-700 rounded-xl py-1 px-4 w-5/12 text-slate-100"
              data-testid="btn-ranking"
              type="button"
              onClick={ () => {
                history.push('/ranking');
              } }
            >
              Ranking
            </button>
          </div>

        </main>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Feedback);
