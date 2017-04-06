import React from 'react'
import $ from 'jquery'

import Utils from '../utils.js'

class Slider extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      array: [...Array(this.props.steps).keys()],
      lengthOfPeriodInSeconds: 100,
      times: []
    };
    window.init = this.init.bind(this);
    window.addAction = this.addAction.bind(this);
    // window.addEventListener('resize', this.renderCollisions.bind(this, true), true);
    // function resizedw(){
    //   // Haven't resized in 100ms!
    // }

    let doit;
    self = this;
    window.onresize = ()=> {
      clearTimeout(doit);
      doit = setTimeout(self.renderCollisions.bind(self, true), 100);
    };
  }

  componentDidMount(){
    this.renderCollisions();
  }

  init(lengthOfPeriodInSeconds = 100){
    this.setState({
      times: [],
      lengthOfPeriodInSeconds: lengthOfPeriodInSeconds
    });
  }

  addAction(timeInSeconds, team = window.HOME){
    let newTimes = this.state.times;
    newTimes.push({team: team, val: timeInSeconds});
    this.setState({
      times: newTimes
    }, this.renderCollisions);
  }

  renderCollisions(isResize){
    if (isResize) this.resetVisibility();
    if (this.state.times && this.state.times.length) {
      let newTimes = this.state.times;
      newTimes.forEach((elem, i) => {
        if (!newTimes[i].invisible){
          let collisionsCount = 0;

          newTimes[i].collisions = null;
          newTimes[i].invisible = false;

          for (let ii = i + 1; ii < newTimes.length; ii++){
            if (Utils.areColidedElements(this.refs[`valElem${i}`], this.refs[`valElem${ii}`])){
              newTimes[ii].invisible = true;
              newTimes[ii].collisions = null;
              collisionsCount++;
            }
          }

          if (collisionsCount > 0){
            newTimes[i].collisions = collisionsCount + 1;
          }
        }

      });
      this.setState(newTimes);
    }
  }

  resetVisibility() {
    let resetTimes = this.state.times.map(
      (item) => {
        item.invisible = false
        return item
      }
    );
    this.setState( { times: resetTimes } );
  }

  render() {
    return (
      <div className="slider">
        <div className="timeline">
          {this.state.array.map((val, i)=>
            <div
              key={i}
              className="step"
              style={ { left: `calc(${ (100 / this.state.array.length) * (i + 1)}% - 2px)` } }
            ></div>
          )}

        </div>
        <div className="values">
          {this.state.times.map((item, i)=>
            <div
              key={i}
              ref={`valElem${i}`}
              className={`value ${ item.team } ${ item.collisions ? 'with-collisions' : ''} ${!!item.invisible ? 'invisible' : ''}`}
              style={ { left: `calc(${ (100 / this.state.lengthOfPeriodInSeconds) * item.val }% - ${item.collisions ? "8" : "3"}px)` } }
            >
              { item.collisions > 9 ? "9+" : item.collisions }
            </div>
          )}
        </div>

      </div>
    )
  }
}

module.exports = Slider;