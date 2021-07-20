import React, { Component } from 'react'
import { Button, Modal, Row, Col, Container, Form } from "react-bootstrap"

export default class Basequiz extends Component {
    render() {
        return (
            <div>
              <div>{this.props.score}</div>
              {this.props.data.map((ques) => {
                return Object.keys(ques).map((key) => {
                  if (key === "question") {
                    return <div>{ques[key]}</div>
                  } else {
                    return (
                      <div>
                        {Object.keys(ques[key]).map((word) => {
                          // this.update(word[])
  
                          return (
                            <div>
                              <div
                                onClick={(e) => {
                                  this.props.aws.map((ques2) => {
                                    Object.values(ques2["options"]).map(
                                      (word2) => {
                                        const found = word2.find(function (
                                          element
                                        ) {
                                          return element === e.target.id
                                        })
                                        if (found) {
                                          word2[1] = !word2[1]
                                        } else {
                                          return
                                        }
                                      }
                                    )
                                  })
                                }}
                                key={"checkbox"}
                                className='mb-3'
                              >
                                <Form.Check
                                  type={"checkbox"}
                                  id={ques[key][word][2]}
                                  // id={ques[key][word][2]}
                                >
                                  <Form.Check.Input type={"checkbox"} />
                                  <Form.Check.Label>{`${ques[key][word][0]}`}</Form.Check.Label>
                                </Form.Check>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  }
                })
              })}
  
              <button
                onClick={async (e) => {
                  this.props.aws.map((ques) => {
                    const count = this.props.data.length
                    const ptval = 100 / count
                    Object.values(ques["options"]).map((opt) => {
                      this.props.data.map((allaws) => {
                        Object.values(allaws["options"]).map((check) => {
                          if (check[1] === opt[1] && check[2] === opt[2]) {
                            if (check[1] === false) {
                            } else {
                              this.props.len = 0
  
                              console.log("TRUE")
  
                              Object.values(allaws["options"]).map((len2) => {
                                if (len2[1] === true) {
                                  console.log(this.props.len, "before")
                                  this.props.len++
                                  console.log(this.props.len, "after")
                                }
                              })
  
                              const pt = ptval / this.props.len
                              console.log(pt)
                              this.props.score = this.props.score + pt
                              console.log(this.props.score)
                            }
                          } else {
                          }
                        })
                      })
                    })
                  })
                  this.setprops({ counter: this.props.counter + 1 })
                }}
                type='submit'
                className='mb-2'
              >
                Submit
              </button>
              <button
                onClick={(e) => {
                  window.location.reload(false)
                }}
                type='submit'
                className='mb-2'
              >
                Reset Quiz
              </button>
            </div>
          )
    }
}
