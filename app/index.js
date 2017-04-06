import ReactDOM from 'react-dom'
import React from 'react'

import './main.css'
import './enums.js'
import Slider from './components/Slider'
import Controll from './components/Controll'


ReactDOM.render(
  <div className="content">
    <Controll></Controll>
    <div className="slider-wrapper">
      <Slider steps={10}></Slider>
    </div>
  </div>
    ,
  document.getElementById('root')
);
