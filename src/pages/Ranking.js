import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortRanking = ranking.sort((x, y) => y.score - x.score);

    return (
      <div>
        <h1 data-testid="ranking-title" className="text-center text-3xl text-purple-200 mt-10">Ranking</h1>
        <div className="flex flex-col justify-center items-center">
          <ol className="md:w-2/6">
            {sortRanking.map((player, index) => (
              <li key={ player.name } className="bg-purple-200 flex my-3 items-center w-6/6 justify-around rounded-2xl py-2">
                <img src={ player.picture } alt={ player.name } className="rounded-full" />
                <p data-testid={ `player-name-${index}` } className="text-xl text-slate-600">
                  {player.name}
                </p>
                <p data-testid={ `player-score-${index}` } className="text-xl text-slate-600">
                  Pontos:
                  {' '}
                  {player.score}
                </p>
              </li>
            ))}
          </ol>
          <button
            className="bg-cyan-700 rounded-xl py-1 px-4 w-4/12 text-slate-100 self-center"
            data-testid="btn-go-home"
            type="button"
            onClick={ () => {
              history.push('/');
            } }
          >
            Início
          </button>
        </div>

      </div>

    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func.isRequired,
};
