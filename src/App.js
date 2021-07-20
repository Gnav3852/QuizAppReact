import React, { Component, Fragment } from "react"
import logo from "./logo.svg"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Modal, Row, Col, Container, Form } from "react-bootstrap"
import axios from "axios"
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider"
import { observable } from "mobx"
import { observer } from "mobx-react"
import Basequiz from "./components/basequiz"
import Score from "./components/score"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      aws: [],
      basekey: [],
      counter: 0,
      score: 0,
      len: 0,
      retake: 0,
    }
  }

  componentWillMount() {
    axios.get(`/data.json`).then(async (res) => {
      this.setState({ data: res.data.quiz })

      this.setState({ aws: res.data.aws })
    })
  }

  render() {
    if (this.state.data) {
      if (this.state.counter === 0) {
        return (
          <div>
            <Score score={this.state.score} ind={0} />
            {/* <Basequiz data={this.state.data} aws={this.state.aws} counter={this.state.counter}score={this.state.score} len={this.state.len}/> */}

            {this.state.data.map((ques) => {
              return Object.keys(ques).map((key) => {
                if (key === "question") {
                  return (
                    <div>
                      <Row>
                        <Col>‎ ‎‎‎‎‎ ‎</Col>
                      </Row>
                      <Button variant='dark' disabled>
                        {ques[key]}
                      </Button>
                      <Row>
                        <Col>‎ ‎‎‎‎‎ ‎</Col>
                      </Row>
                    </div>
                  )
                } else {
                  return (
                    <div>
                      {Object.keys(ques[key]).map((word) => {
                        // this.update(word[])

                        return (
                          <div>
                            <div
                              onClick={(e) => {
                                this.state.aws.map((ques2) => {
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
                                <Form.Check.Label>
                                  <Button variant='outline-dark' disabled>
                                    {`${ques[key][word][0]}`}{" "}
                                  </Button>
                                </Form.Check.Label>
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
                this.state.aws.map((ques) => {
                  const count = this.state.data.length
                  const ptval = 100 / count
                  Object.values(ques["options"]).map((opt) => {
                    this.state.data.map((allaws) => {
                      Object.values(allaws["options"]).map((check) => {
                        if (check[1] === opt[1] && check[2] === opt[2]) {
                          if (check[1] === false) {
                          } else {
                            this.state.len = 0

                            Object.values(allaws["options"]).map((len2) => {
                              if (len2[1] === true) {
                                this.state.len++
                              }
                            })

                            const pt = ptval / this.state.len

                            this.state.score = this.state.score + pt
                          }
                        } else {
                        }
                      })
                    })
                  })
                })
                this.setState({ counter: this.state.counter + 1 })
              }}
              type='submit'
              className='mb-2'
            >
              Submit
            </button>
            <button
              onClick={(e) => {
                this.setState({
                  data: [],
                  aws: [],
                  counter: 0,
                  score: 0,
                  len: 0,
                })
                axios.get(`/data.json`).then(async (res) => {
                  this.setState({ data: res.data.quiz })

                  this.setState({ aws: res.data.aws })
                })
              }}
              type='submit'
              className='mb-2'
            >
              Reset Quiz
            </button>
          </div>
        )
      } else {
        return (
          <div>
            <Score score={this.state.score} ind={1} />
            {this.state.data.map((ques) => {
              return Object.keys(ques).map((key) => {
                if (key === "question") {
                  return <div>{ques[key]}</div>
                } else {
                  return (
                    <div>
                      {Object.keys(ques[key]).map((word) => {
                        if (ques[key][word][1] === true) {
                          return (
                            <div>
                              <div
                                onClick={(e) => {
                                  this.state.aws.map((ques2) => {
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
                                >
                                  <Form.Check.Input type={"checkbox"} isValid />
                                  <Form.Check.Label>
                                    {" "}
                                    <Button variant='outline-dark' disabled>
                                      {`${ques[key][word][0]}`}{" "}
                                    </Button>
                                  </Form.Check.Label>
                                  <Form.Control.Feedback type='valid'>
                                    This is the correct answer
                                  </Form.Control.Feedback>
                                </Form.Check>
                              </div>
                            </div>
                          )
                        } else {
                          return (
                            <div>
                              <div
                                onClick={(e) => {
                                  this.state.aws.map((ques2) => {
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
                                >
                                  <Form.Check.Input
                                    type={"checkbox"}
                                    isInvalid
                                  />
                                  <Form.Check.Label>
                                    {" "}
                                    <Button variant='outline-dark' disabled>
                                      {`${ques[key][word][0]}`}{" "}
                                    </Button>
                                  </Form.Check.Label>
                                  <Form.Control.Feedback type='invalid'>
                                    This is incorrect
                                  </Form.Control.Feedback>
                                </Form.Check>
                              </div>
                            </div>
                          )
                        }
                      })}
                    </div>
                  )
                }
              })
            })}

            <button
              onClick={(e) => {
                this.setState({
                  data: [],
                  aws: [],
                  counter: 0,
                  score: 0,
                  len: 0,
                })
                axios.get(`/data.json`).then(async (res) => {
                  this.setState({ data: res.data.quiz })

                  this.setState({ aws: res.data.aws })
                })
              }}
              type='submit'
              className='mb-2'
            >
              Retake Quiz
            </button>
          </div>
        )
      }
    } else {
      return <div>dsa</div>
    }
  }
}

export default App
