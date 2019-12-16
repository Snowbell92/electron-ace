import React from 'react';

class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          {this.props.element}
          <button type="button" onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}

export default Popup;
