import React, { Component } from 'react';
import { connect } from 'react-redux';

export class SignUpPhonePreferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: null,
      minute: null,
      ampm: null
    };

    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  onHourChange(hour) {
    this.setState({
      hour: hour
    });
  }

  onMinuteChange(minute) {
    this.setState({
      minute: minute
    });
  }

  onAmPmChange(ampm) {
    this.setState({
      ampm: ampm
    });
  }

  onClickSubmit() {
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <form className="ui form">
          <h4 className="ui dividing header">Call Preferences</h4>
          <div className="field">
            <label>Scheduled Call Time</label>
            <div className=" three fields">
              <div className="two wide field">
                <select className="ui fluid search dropdown"
                  onChange={(e) => {this.onHourChange(e.target.value)}}>
                  <option value="">Hour</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              :
              <div className="two wide field">
                <select className="ui fluid search dropdown"
                  onChange={(e) => {this.onMinuteChange(e.target.value)}}>
                  <option value="">Minute</option>
                  <option value="00">00</option>
                  <option value="05">05</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="35">35</option>
                  <option value="40">40</option>
                  <option value="45">45</option>
                  <option value="50">50</option>
                  <option value="55">55</option>
                </select>
              </div>
              <div className="two wide field">
                <select className="ui fluid search dropdown"
                  onChange={(e) => {this.onAmPmChange(e.target.value)}}>
                  <option value="">Select</option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        <div className="ui right floated submit button"
          onClick={this.onClickSubmit}>
          Submit
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(SignUpPhonePreferences);