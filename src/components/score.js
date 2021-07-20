import React, { Component } from "react"

export default class Score extends Component {
  render() {
    if(this.props.ind===1){
        return <div>{this.props.score}</div>
    } else{
        return <div></div>
    }
     
    
  }
}
