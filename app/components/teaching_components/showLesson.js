/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { Slide } from 'react-slideshow-image';
import { connect } from 'react-redux';
import { showLessonActions } from '../../actions/showLesson.actions';

class ShowLesson extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    this.props.dispatch(showLessonActions.fetchLesson(1));
  }

  properties = {
    duration: 5000,
    transitionDuration: 500,
    indicators: true,
    arrows: true,
    onChange: (oldIndex, newIndex) => {
      console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { isLoading, isLoaded, lessonData } = this.props;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <>
        {console.log('comp')}
        {console.log(lessonData)};
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
                <h3>{lessonData.wordName}</h3>
                <div className="slideshow">
                  <div className="slide-container">
                    {/* <Slide {...this.properties}> */}
                    {/* eslint-disable-next-line react/prop-types */}
                    {/* {lessonData.slideImages.map(slides => (
                        <div className="each-slide">
                          <div
                            style={{
                              // eslint-disable-next-line react/prop-types
                              backgroundImage: `url(assets/images/${lessonData.wordName}/${slides})`
                            }}
                          />
                        </div>
                      ))} */}
                    {/* </Slide> */}
                  </div>
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
