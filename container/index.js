import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'agent/add',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const AddAgent = require('./AddAgent').default
      const reducer = require('./modules/addAgent').default
      injectReducer(store, { key: 'addAgent', reducer })
      cb(null, AddAgent)
    }, 'addAgent')
  }
})
