import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../reducers'
import promiseMiddleware from 'redux-promise-middleware'
import combineActionsMiddleware from 'redux-combine-actions'

const middleware = [
  promiseMiddleware({
    promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE']
  }),
  thunk
]

if (process.env.ENV === 'DEV') {
  const createLogger = require('redux-logger')
  const logger = createLogger()
  middleware.push(logger)
}

const store = createStore(reducers, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store
