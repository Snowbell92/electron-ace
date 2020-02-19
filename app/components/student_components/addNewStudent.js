import React, { Fragment } from 'react';
import Select from '../common_components/SelectInput';
import FormInput from '../common_components/FormInput';
import PreviewInput from '../common_components/PreviewInput';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';

class AddNewStudent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <div className="newStudent-component">
          <div className="title-block">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <h3>Add a new student</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="add-new-student">
            <form name="new-student-form" onSubmit={console.log('submit')}>
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <FormInput
                      label="Class ID"
                      labelClassName="col-sm-2 col-form-label"
                      name="class_id"
                      type="text"
                      onChange={console.log('change')}
                      placeholder="Enter class ID"
                      required
                      className="form-control"
                      inputContainerClassName="col-sm-10"
                    />
                    <FormInput
                      label="Name"
                      labelClassName="col-sm-2 col-form-label"
                      name="student_name"
                      type="text"
                      onChange={console.log('change')}
                      placeholder="Enter class ID"
                      required
                      className="form-control"
                      inputContainerClassName="col-sm-10"
                    />
                    <FormInput
                      label="Comments"
                      labelClassName="col-sm-2 col-form-label"
                      name="comments"
                      type="textarea"
                      onChange={console.log('change')}
                      placeholder="Enter class ID"
                      required
                      className="form-control"
                      inputContainerClassName="col-sm-10"
                    />
                    {/*<PreviewInput
                      name="files"
                      label="Picture"
                      onChange={this.uploadMultipleFiles}
                      files={this.fileArray}
                      error={errors.fileError}
                    />*/}
                  </div>
                </div>
              </div>
              <div className="grouped-button-bottom-bar">
                <div className="container">
                  <div className="row">
                    <div className="col-sm">
                      <Popup
                        trigger={
                          <button className="btn btn-default" type="button">
                            Cancel
                          </button>
                        }
                        modal
                      >
                        {close => (
                          <div className="warning-modal">
                            <div>
                              <h4>Are you Sure?</h4>
                              <p>
                                No changes will be saved. please click confirm to
                                discard all information
                              </p>
                              <Link to="/" className="btn btn-default">
                                Confirm
                              </Link>
                              <button
                                className="btn btn-light"
                                type="button"
                                onClick={() => {
                                  console.log('modal closed ');
                                  close();
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </Popup>
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AddNewStudent;
