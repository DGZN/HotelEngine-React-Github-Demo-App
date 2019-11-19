import React from 'react';
import logo from './react.svg';
import PullRequest from './PullRequest';
import GithubTokenModal from './GithubTokenModal'
import './PullRequests.css';

const token = () => {
  const token = localStorage.getItem('GITHUB_AUTHTOKEN');
  if (token && token.length) {
    console.log(`FOUND TOKEN: ${token}`)
    return token;
  } else {
    console.log(`NO TOKEN FOUND`)
    return false;
  }
}

const Octokit = require("@octokit/rest").plugin(
  require('@octokit/plugin-throttling')
);
const octokit = Octokit({
  auth() {
    return token();
  },
  userAgent: 'HE ReactApp v0.9',
  baseUrl: 'https://api.github.com',
  throttle: {
    onRateLimit: (retryAfter, options) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );
      if (options.request.retryCount === 0) {
        console.log(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onAbuseLimit: (retryAfter, options) => {
      octokit.log.warn(
        `Abuse detected for request ${options.method} ${options.url}`
      );
    }
  }
});


class PullRequests extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      typed: '',
      pulls: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.repo !== prevState.repo) {
      this.state.pulls.forEach(function(pr) {
        this.getComments(pr);
        this.getCommits(pr);
      }.bind(this));
    }
  }

  onChange(event) {
    this.search(event.target.value)
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.search(event.target.value)
    }
  }

  search(p) {
    if (p.indexOf('/') > -1) {
      let s = p.split('/').splice(-2)
      this.setState({
        typed: p,
        pulls: []
      });
      this.getPullRequest(...s);
    }
  }


  async getPullRequest(owner, repo) {
    if (!token()) {
      return this.checkForGithubToken()
    }
    octokit.pulls.list({
      owner,
      repo,
      state: 'open'
    }).then(function(res) {
      this.setState({
        owner,
        repo, 
        pulls: res.data || []
      });
    }.bind(this));
  }

  async getComments(pull) {
    let pulls = this.state.pulls
    octokit.pulls.listComments({
      owner: this.state.owner,
      repo: this.state.repo,
      pull_number: pull.number
    }).then(function(res) {
      this.setState({
        pulls: pulls.map(function(x) {
          return x.number !== pull.number ? x :
            Object.assign(pull, { comments: res.data });
        })
      });
    }.bind(this));
  }

  async getCommits(pull) {
    let pulls = this.state.pulls
    octokit.pulls.listCommits({
      owner: this.state.owner,
      repo: this.state.repo,
      pull_number: pull.number
    }).then(function (res) {
      this.setState({
        pulls: pulls.map(function (x) {
          return x.number !== pull.number ? x :
            Object.assign(pull, { commits: res.data });
        })
      });
    }.bind(this));
  }

  checkForGithubToken() {
    if (!token()) {
      console.log(`TOKEN: ${token()}`)
      return <GithubTokenModal />
    }
  }

  render() {
    let pulls = this.state.pulls;
    return (
      <div className="main">

        <div className="ui container">
          <div className="ui sizer vertical segment">
            <h1 className="ui center aligned icon header">
              <i className={"circular github icon " + (this.state.typed.length ? 'rotate-y' : '')}> </i>
              Hotel Engine Github Pull Request Demo App
            </h1>
            <p></p>
          </div>
        </div>

          <div className="ui container">
            
            <div className="ui fluid segment">

              <div className="fluid grid">  
                <div className="row">

                  <div className="column">
                    <div className="ui large form">
                      <div className="fluid field">
                        <div className="ui large left icon input">
                          <input className="search" autoFocus onBlur={this.onChange.bind(this)}  placeholder="username / repository" type="text" onKeyDown={this.handleKeyDown.bind(this)}></input>
                          <div className = "ui large blue button" > Search </div>
                          <i className = "github icon" > </i>
                        </div>
                      </div>
                    </div>
                  </div>  



                </div>
                
                </div>
              </div>
              <div className="fluid grid">
              <div className="column">
                <div className="raised text segment">
                  {pulls.map((pull, i) => {
                      return <PullRequest key={pull.id} pull={pull} i={(i+1)} total={pulls.length} />
                  })}
                </div>
              </div>
            </div>
        </div>
        {this.checkForGithubToken()}
      </div>
    );
  }
}

export default PullRequests;
