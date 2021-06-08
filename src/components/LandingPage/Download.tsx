import React, { Component } from 'react';

const Pdf = '../../assets/litepaper.pdf';

class Download extends Component {

  render() {

    return (
        <div className = "App">
          <a href = {Pdf} target = "_blank">Litepaper</a>
        </div>
    );
  }
}

export default Download;