import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../services/api';
import Question from '../components/Question';
import Header from '../components/Header';

class Game extends Component {
  state = {
    questions: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');

    if (!token) {
      history.push('/');
    }

    const result = await getQuestions(token);
    const questions = result.results;

    if (questions && questions.length < 1) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState({
      questions,
    });
  }

  onClickNext = () => {
    const { history } = this.props;
    history.push('/feedback');
  };

  render() {
    const { questions } = this.state;
    const { indexQuestion } = this.props;
    return (
      <div className="h-10/12">
        <Header />
        <div className="h-full">
          {questions.map((info, i) => (
            i === indexQuestion
          && <Question
            { ...info }
            key={ info.question }
            correctAnswer={ info.correct_answer }
            incorrectAnswers={ info.incorrect_answers }
            onClickNext={ this.onClickNext }
          />
          ))}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  indexQuestion: state.question.indexQuestion,
});

export default connect(mapStateToProps)(Game);
