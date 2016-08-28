import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import IndexPage from './containers/IndexPage'
import AuthView from './components/AuthView'
import CoursesView from './components/CoursesView'
import QuestionsPage from './containers/QuestionsPage'
import AnswersPage from './containers/AnswersPage'
import configureStore from './redux/configureStore'


const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)


ReactDOM.render(

    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="auth" component={AuthView} >
            <Route name='auth.login' path="login" component={AuthView} />
            <Route name='auth.signup' path="signup" component={AuthView} />
          </Route>

          <IndexRedirect to="/courses" />
          <Route component={IndexPage}>
            <Route name='courses' path="courses" component={CoursesView} />
          </Route>

          <Route name='questions' path="courses/:courseId" component={QuestionsPage} />
          <Route name='answers' path="questions/:questionId" component={AnswersPage} />

        </Route>
      </Router>
    </Provider>,
  document.getElementById('root')
)
