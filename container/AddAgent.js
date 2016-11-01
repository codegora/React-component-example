import { connect } from 'react-redux'
import { fetchAddAgent } from './modules/addAgent'
import AddAgent from '../component/AddAgent'

const mapActionCreators = {
  fetchAddAgent: (data, callback) => fetchAddAgent(data, callback)
}

const mapStateToProps = (state) => ({
  loading: state.addAgent.loading
})

export default connect(mapStateToProps, mapActionCreators)(AddAgent)
