import React from 'react';
import moment from 'moment';

class PullRequest extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activePanel: 'commits',
      displayLabel: true,
      displayMore: false,
      pull: { 
        title: '',
        body: '',
        created_at: '',
        user: {
          login: '',
          avatar_url: ''
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.pull !== this.props.pull) {
      this.setState({
        i: this.props.i,
        total: this.props.total,
        pull: this.props.pull
      })
    }
  }

  togglePanel(panel) {
    if ( ! this.state.pull[panel].length )
      return;
    this.setState({
      activePanel: panel,
      displayLabel: panel == 'comments' ? false : true,
      pull: {
        title: '',
        body: '',
        created_at: '',
        user: {
          login: '',
          avatar_url: ''
        }
      }
    })
  }

  displayMore() {
    this.setState({
      displayMore: true
    })
  }

  render() {
    let pull = this.state.pull;
    let commits = pull.commits || [];
    let comments = pull.comments || [];
    return (
      <div>
        <div className={"ui raised segment " + (pull.id ? '' : 'masked')}>
          <div className="ui one column grid">
            <div className="column">
              <div className="ui divided items">
                <div className="item">
                  <div className="ui tiny image">
                    <img src={pull.user.avatar_url}></img>
                  </div>
                  <div className="middle aligned content">
                    <div className="header">{pull.title}</div>
                    <div className={"description " + (this.state.displayMore ? '' : 'hide-overflow')}>
                      {pull.body}
                      <br></br>
                    </div>
                    <div className="ui top attached tabular menu">
                      <div className={"item "+(this.state.activePanel == 'commits' ? 'active' : '') + (commits.length ? '' : 'disabled')} onClick={()=>{this.togglePanel('commits')}}>
                        COMMITS
                      </div>
                      <div className={"item " + (this.state.activePanel == 'comments' ? 'active' : '') + (comments.length ? '' : 'disabled')} onClick={()=>{this.togglePanel('comments')}}>
                        { (comments.length > 0 ? (<div className={"floating ui green label " + (this.state.displayLabel ? '' : 'hidden') }>{comments.length}</div>) : '')}
                        COMMENTS
                      </div>
                    </div>
                    <div className="ui bottom attached active tab segment">   
                      <div className={this.state.activePanel == 'commits' ? 'column' : 'hidden'}>
                      <div className="ui middle aligned items">
                        {commits.map((c,i) => {
                          return (
                            <div key={c.node_id} className="item">
                              <div className="middle aligned content">
                                <a className="header">{c.commit.author.name}</a>
                                <div className="description">
                                {c.commit.message}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                  </div>

                      <div className={this.state.activePanel == 'comments' ? 'column' : 'hidden'}>
                    <div className="ui text segment">
                      <div className="ui divided items">
                        {comments.map((c,i) => {
                          return (
                            <div key={c.id} className="item">
                              <div className="ui tiny image">
                                <img src={c.user.avatar_url}></img>
                              </div>
                              <div className="content">
                                <a className="header">{c.user.login}</a>
                                <div className="description hide-overflow">
                                {c.body}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                      
                    </div>
                      <div className="ui top right attached blue basic label">
                          <span className="price">{moment(pull.created_at).fromNow()} by {pull.user.login}</span>
                        </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        
        </div>
        <div className="ui horizontal divider">
          {this.state.i} / {this.state.total}
        </div>
      </div>
    );
  }
}

export default PullRequest;
