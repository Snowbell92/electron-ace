import React from 'react';
import Quiz from 'react-quiz-component';

import { Link } from 'react-router-dom';

class QuizChoiceComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
     // word: this.props.location.state.name
     str:""
    }
  }
  quiz = {
    quizTitle: 'Pick the picture that matches the word',
    quizSynopsis:
      'in the next page, you will be given 4 choices. pick the image that goes with the word',
    questions: [
      {
        question: 'Which is a car?',
        questionType: 'photo',
        answerSelectionType: 'single',
        answers: [
          'https://dummyimage.com/600x400/000/fff&text=A',
          'https://dummyimage.com/600x400/000/fff&text=B',
          'https://dummyimage.com/600x400/000/fff&text=C',
          'https://dummyimage.com/600x400/000/fff&text=D'
        ],
        correctAnswer: '1',
        messageForCorrectAnswer: 'Correct answer. Good job.',
        messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
        explanation: '',
        point: '20'
      },
      {
        question: 'Which is an animal?',
        questionType: 'photo',
        answerSelectionType: 'single',
        answers: [
          'https://dummyimage.com/600x400/000/fff&text=A',
          'https://dummyimage.com/600x400/000/fff&text=B',
          'https://dummyimage.com/600x400/000/fff&text=C',
          'https://dummyimage.com/600x400/000/fff&text=D'
        ],
        correctAnswer: '2',
        messageForCorrectAnswer: 'Correct answer. Good job.',
        messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
        explanation: '',
        point: '20'
      }
    ]
  };

  onCompleteAction = obj => {
    console.log(obj);
    return (
      <div>
        <h2>You answered {obj.numberOfCorrectAnswers} questions correctly!</h2>
        <Link to="/" className="btn btn-default">
          Back to home
        </Link>
      </div>
    );
  };

  render() {
    return (
      <div className="quiz-component">
        <div className="title-block">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h3>Quiz</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="showLesson">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Quiz
                  quiz={this.quiz}
                  shuffle
                  onComplete={this.onCompleteAction}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuizChoiceComponent;
