import React, { Component } from 'react'
import { Input, Button, Header, Image, Modal } from 'semantic-ui-react'
import './GithubTokenModal.css';

class GithubTokenModal extends Component {

  state = { open: true, token: null }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })
  
  save(token) { 
    process.env.GITHUB_AUTHTOKEN = token
    this.setState({
      token: token
    })
    this.pprops
    this.close()
  }

  setToken(event) {
    this.save(event.target.value)
  }
  

  render() {
    const { open ,dimmer } = this.state
    if (open) {
      this.show('blurring')
    }
    return (
      <div>
        <Modal size="small" dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>MISSING GITHUB ACCESS TOKEN</Modal.Header>
          <Modal.Content>
              <div className="ui fluid icon input">
                <input className="ui large input" type="text" placeholder="INPUT YOUR GITHUB ACCESS TOKEN" onBlur={this.setToken.bind(this)} />
                <i className="ui large github icon"></i>
              </div>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Cancel
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Save"
              onClick={this.save}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default GithubTokenModal