import React, { Fragment } from 'react';
import { Slide } from 'react-slideshow-image';
import { connect } from 'react-redux';
import { showLessonActions } from '../../actions/showLesson.actions';
import { Link } from 'react-router-dom';

class ShowLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideshowCompleted: false
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    this.props.dispatch(showLessonActions.fetchLesson(5));
  }

  properties = {
    duration: 20000,
    transitionDuration: 500,
    indicators: true,
    arrows: true,
    autoplay: false,
    onChange: (oldIndex, newIndex) => {
      console.log(`slide transition from ${oldIndex} to ${newIndex}`);
      if (newIndex === 0) {
        console.log('completed');
        this.setState({ slideshowCompleted: true });
      }
    }
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { isLoading, isLoaded, lessonData } = this.props;
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <div className="title-block">
          <div className="container">
            <div className="row">
              {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
              <div className="col-sm-12">
                {/* TODO: dynamic lesson numbers */}
                <h3>Lesson 1</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="showLesson">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                {/* eslint-disable-next-line react/prop-types */}
                <h3>{lessonData.word}</h3>
                <div className="slideshow">
                  <div className="slide-container">
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <Slide {...this.properties}>
                      {/* eslint-disable-next-line react/prop-types */}
                      {lessonData.slideImages.map(slides => (
                        <div className="each-slide">
                          <div
                            style={{
                              // eslint-disable-next-line react/prop-types
                              backgroundImage: `url(assets/images/${lessonData.word}/${slides})`
                            }}
                          />
                        </div>
                      ))}
                    </Slide>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grouped-button-bottom-bar">
            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <Link className="btn btn-primary" to="/">
                    Complete
                  </Link>
                  {/* eslint-disable-next-line react/destructuring-assignment */}
                  {this.state.slideshowCompleted && (
                    <Link className="btn btn-default" to="/quiz">
                      Go to Quiz
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.lessonData.isLoading,
  isLoaded: state.lessonData.isLoaded,
  lessonData: state.lessonData.data
});
export default connect(mapStateToProps)(ShowLesson);
