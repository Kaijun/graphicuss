import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import IndexView from './containers/IndexView'
import SearchView from './components/SearchView'
import AuthView from './components/AuthView'
import CoursesView from './components/CoursesView'
import QuestionsView from './components/QuestionsView'
import AnswersView from './components/AnswersView'
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
          <Route component={IndexView}>
            <Route name='search' path="search" component={SearchView} />
            <Route name='courses' path="courses" component={CoursesView} />
          </Route>

          <Route name='questions' path="courses/:courseId" component={QuestionsView} />
          <Route name='answers' path="questions/:questionId" component={AnswersView} />

        </Route>
      </Router>
    </Provider>,
  document.getElementById('root')
)
