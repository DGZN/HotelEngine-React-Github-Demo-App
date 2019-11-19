
![repo-banner](https://user-images.githubusercontent.com/4060187/28923990-050a32d4-782e-11e7-9da7-574ce5a8b455.png)

Universal JavaScript applications are tough to setup. Either you buy into a framework like [Next.js](https://github.com/zeit/next.js) or [react-server](https://github.com/redfin/react-server), fork a boilerplate, or set things up yourself. Aiming to fill this void, Razzle is a tool that abstracts all complex configuration needed for SSR into a single dependency--giving you the awesome developer experience of [create-react-app](https://github.com/facebookincubator/create-react-app), but then leaving the rest of your app's architectural decisions about frameworks, routing, and data fetching up to you. With this approach, Razzle not only works with React, but also Reason, Elm, Vue, Angular, and most importantly......whatever comes next.

**Razzle comes with the "battery-pack included"**:

* :fire: Universal Hot Module Replacement, so both the client and server update whenever you make edits. No annoying restarts necessary
* Comes with your favorite ES6 JavaScript goodies (through `babel-preset-razzle`)
* Comes with the same CSS setup as [create-react-app](https://github.com/facebookincubator/create-react-app)
* Works with [React](https://github.com/facebook/react), [Preact](https://github.com/developit/preact), [Elm](http://elm-lang.org/), [Reason-React](https://github.com/jaredpalmer/razzle/tree/master/examples/with-reason-react), [Inferno](https://github.com/infernojs), and [Rax](https://github.com/alibaba/rax) as well as [Angular](https://github.com/angular/angular) and [Vue](https://github.com/vuejs/vue) if that's your thing
* Escape hatches for customization via `.babelrc` and `razzle.config.js`
* [Jest](https://github.com/facebook/jest) test runner setup with sensible defaults via `razzle test`

## Quick Start

##### Generate Github Access Token

Login to Github and in the upper-right corner of any page, click your profile photo, then click Settings.

![](https://help.github.com/assets/images/help/settings/userbar-account-settings.png)

In the left sidebar, click Developer settings.

![](https://help.github.com/assets/images/help/settings/developer-settings.png)



In the left sidebar, click Personal access tokens.

![](https://help.github.com/assets/images/help/settings/personal_access_tokens_tab.png)

Click Generate new token.

![](https://help.github.com/assets/images/help/settings/generate_new_token.png)

Give your token a descriptive name.

![](https://help.github.com/assets/images/help/settings/token_description.png)

Select the scopes, or permissions, you'd like to grant this token. To use your token to access repositories from the command line, select repo.

![](https://help.github.com/assets/images/help/settings/token_scopes.gif)

Click Generate token.



> Set your GitHub API Access Token as an environment variable <code>GITHUB_AUTHTOKEN</code>

```sh
echo "export GITHUB_ACCESS_TOKEN={TOKEN-HERE}" >> ~/.bash_profile && source ~/.bash_profile
```

##### Run Demo App

```bash
yarn
yarn start
```

Then open http://localhost:3000/ to see your app. Your console should look like this:

<img src="https://cloud.githubusercontent.com/assets/4060187/26324663/b31788c4-3f01-11e7-8e6f-ffa48533af54.png" width="500px" alt="Razzle Development Mode"/>

**That's it**. You don't need to worry about setting up multiple webpack configs or other build tools. Just start editing `src/App.js` and go!


