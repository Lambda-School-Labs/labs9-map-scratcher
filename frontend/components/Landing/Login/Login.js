import React, { Component } from 'react'
import { Button, Icon, Input } from 'semantic-ui-react'
import '.././landing.less'

const login =
  process.env.NODE_ENV === 'production'
    ? 'https://backpaca-yoga.herokuapp.com/auth'
    : 'http://localhost:4000/auth'

export default class Login extends Component {
  render() {
    return (
      <div className='login_loginButton'>
        <a href={`${login}/twitter`}>
          <Button color="twitter" className='login_twitterButton'>
            <Icon name="twitter" /> Login with Twitter
          </Button>
        </a>
        <a>
          <Button className='login_registerButton'>
            Register
          </Button>
        </a>
        </div>
    )
  }
}
