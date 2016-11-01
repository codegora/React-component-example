import React, { Component, PropTypes } from 'react'
import { validation, BasicForm, InputField } from 'react-serial-forms'
import classes from './AddAgent.scss'
import RightArrow from 'static/img/right-arrow.svg'

validation.registerValidator({
  name: 'confirm-password',
  determine: function(value, pass, fail) {
    if (document.getElementById('password').value != value) {
      fail()
    } else {
      pass()
    }
  },
  message: 'Password does not match the confirm password'
})

class AddAgent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
    this.handleChange = ::this.handleChange
  }

  handleChange(field, value) {
    this.setState({
      [field]: value
    })
  }

  onSubmit(event) {
    const { fetchAddAgent } = this.props
    const that = this
    const refs = this.refs.myForm
    const resetForm = () => {
      this.setState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: ''
      })
    }

    event.persist()
    refs.validate(function(errs) {
      if (errs) {
        return
      }

      const data = refs.serialize()
      fetchAddAgent(data, resetForm)
    })
    event.preventDefault()
  }

  componentWillMount() {
    localStorage.isAdmin != 'true' &&
     this.context.router.replace({
      pathname: '/agent/profile'
    })
  }

   render() {
     const { loading } = this.props

     return (
      <div>
        <h3 className='account__subtitle'>Add Agent</h3>
        <BasicForm id='myForm' noValidate ref='myForm' onSubmit={::this.onSubmit}>
          <InputField name='agency_id' type='hidden' value={localStorage.agencyId} />
          <div className='clear-fix'>
            <div className='row half'>
              <label htmlFor='agent-name' className='account__label'>Agent First Name</label>
              <InputField
              value={this.state.firstname}
              onChange={(e) => {this.handleChange('firstname', e.target.value)}}
              id='agent-name'
              className='field field--blue'
              type='text'
              name='firstname'
              validation='required' />
            </div>
            <div className='row half'>
              <label htmlFor='agent-surname' className='account__label'>Agent Surname</label>
              <InputField
              value={this.state.lastname}
              onChange={(e) => {this.handleChange('lastname', e.target.value)}}
              id='agent-surname'
              className='field field--blue'
              type='text'
              name='lastname'
              validation='required' />
            </div>
          </div>
          <div className='clear-fix'>
            <div className='row half'>
              <label htmlFor='agent-tel' className='account__label'>Agent Telephone</label>
              <InputField
              value={this.state.phone}
              onChange={(e) => {this.handleChange('phone', e.target.value)}}
              id='agent-tel'
              className='field field--blue'
              type='tel'
              name='phone'
              validation='required' />
            </div>
            <div className='row half'>
              <label htmlFor='agent-email' className='account__label'>Agent Email</label>
              <InputField
              value={this.state.email}
              onChange={(e) => {this.handleChange('email', e.target.value)}}
              id='agent-email'
              className='field field--blue'
              type='email'
              name='email'
              validation='required, email' />
            </div>
          </div>
          <div className='clear-fix'>
            <div className='row half'>
              <label htmlFor='password' className='account__label'>Password</label>
              <InputField
              value={this.state.password}
              onChange={(e) => {this.handleChange('password', e.target.value)}}
              id='password'
              className='field field--blue'
              type='password'
              name='password'
              validation='required' />
            </div>
            <div className='row half'>
              <label htmlFor='confirm-password' className='account__label'>Confirm Password</label>
              <InputField
              value={this.state.password_confirmation}
              onChange={(e) => {this.handleChange('password_confirmation', e.target.value)}}
              id='confirm-password'
              className='field field--blue'
              type='password'
              name='password_confirmation'
              validation='required, confirm-password' />
            </div>
          </div>
          <div className='text-right row'>
            {loading &&
              <div className='preloader preloader--button'></div>
            }
            <button
            disabled={loading}
            className={loading ? 'btn btn--red disabled' : 'btn btn--red'}>
              {loading ?
                <span>Saving...</span> :
                <span>Save New Agent <img src={RightArrow} alt='arrow' /></span>
              }
            </button>
          </div>
        </BasicForm>
      </div>
     )
   }
}

AddAgent.contextTypes = {
  router: React.PropTypes.object.isRequired
}

AddAgent.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  fetchAddAgent: React.PropTypes.func.isRequired
}

export default AddAgent
