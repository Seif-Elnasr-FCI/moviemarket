import Axios  from 'axios'
import Joi from 'joi'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  let [error, setError] = useState('')
  let [rgxError, setRgxError] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
  let [user, setUser] = useState({
    phone_number:'',
    email:'',
    country:'',
    password:'',
    password2:'',
    role:''
  })

  // get inputs values
  function getUserData(e){
    let myUser={...user}
    myUser[e.target.name] = e.target.value
    setUser(myUser)
  }

  async function registerSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    let response
    let validationResult =validateRegistration()
    if(validationResult.error){
      setRgxError(validationResult.error.details)
      setIsLoading(false)
    }else{
      try {
         response = await Axios.post(
          'https://anayty.pythonanywhere.com/api/v1/register/',
          user
        );
        if (response.status === 201) {
          navigate('/login')
          setIsLoading(false)
        } else {
          // if the API request fails with a status code other than 201 (created)
          setError('Something went wrong');
          setIsLoading(false)
        }
      } catch (error) {
        const messageError= error.response.data
        setError(messageError);
        setIsLoading(false)
      }
      
    }
  }

  function validateRegistration(){
    let schem = Joi.object({
      // messages to set custom error , number.max , unsafe is the msg type
      phone_number: Joi.number().integer().min(10000000000).max(999999999999999).required().messages({
        'number.base': 'phone number must be a number and can not be empty',
        'number.integer': 'phone number must be an integer',
        'number.min': 'phone number must be at least 11 digits',
        'number.max': 'phone number must be less than 15 digits',
        'number.unsafe': 'phone number must be less than 15 digits'
      }),
      // minDomainSegments => @yahoo yahoo is the domain segment
      email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
      // pattern => to write pattern in my way
      country:Joi.string().pattern(new RegExp(/^[A-Za-z]+$/)).required(),
      role:Joi.string().required(),
      password:Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)).required().messages({
        'string.pattern.base':'password must contain capital and small letters and numbers'
      }),
      password2:Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)).required().messages({
        'string.pattern.base':'password must contain capital and small letters and numbers'
      }),

    })
    // abortEarly default is true that stop at phone number
    return schem.validate(user,{abortEarly:false})
  }

  return (
    <>
      <div className='w-75 mx-auto my-5'>
        <h2><span className='fst-italic fw-bold text-warning'>R</span>egister Now</h2>
        {/* {rgxError.map((err,i)=><div key={i} className="alert alert-danger">{err.message}</div>)} */}
        {error? <div className="alert alert-danger">server Error == {error}</div>:''}
        <form onSubmit={registerSubmit}>
          <label htmlFor="Phone">Phone :</label>
          <input  type="text" onChange={getUserData} className='form-control mb-2' name='phone_number' id='Phone' />
          {rgxError.find((err) => err.context.key === 'phone_number') && (
          <div className='alert alert-danger'>
            {rgxError.find((err) => err.context.key === 'phone_number').message}
          </div>
          )}

          <label htmlFor="email">email :</label>
          <input  type="email" onChange={getUserData} className='form-control mb-2' name='email' id='email' />
          {rgxError.find((err) => err.context.key === 'email') && (
          <div className='alert alert-danger'>
            {rgxError.find((err) => err.context.key === 'email').message}
          </div>
          )}

          <label htmlFor="country">country :</label>
          <input  type="text" onChange={getUserData} className='form-control mb-2' name='country' id='country' />
          {rgxError.find((err) => err.context.key === 'country') && (
          <div className='alert alert-danger'>
            {rgxError.find((err) => err.context.key === 'country').message}
          </div>
          )}

          <label htmlFor="password">password :</label>
          <input  type="password" onChange={getUserData} className='form-control mb-2' name='password' id='password' />
          {rgxError.find((err) => err.context.key === 'password') && (
          <div className='alert alert-danger'>
            {rgxError.find((err) => err.context.key === 'password').message}
          </div>
          )}

          <label htmlFor="password2">confirm password :</label>
          <input  type="password" onChange={getUserData} className='form-control mb-2' name='password2' id='password2' />
          {rgxError.find((err) => err.context.key === 'password2') && (
          <div className='alert alert-danger'>
            {rgxError.find((err) => err.context.key === 'password2').message}
          </div>
          )}

          <label htmlFor="role">role :</label>
          <select name="role" onChange={getUserData} id='role' class="form-select bg-dark text-light mb-3" aria-label="Default select example">
            <option selected disabled>Select role</option>
            <option value="customer">customer</option>
          </select>
          {rgxError.find((err) => err.context.key === 'role') && (
          <div className='alert alert-danger'>
            {rgxError.find((err) => err.context.key === 'role').message}
          </div>
          )}

          <button className='btn btn-outline-info'>
            {isLoading?<i className='fas fa-spinner fa-spin'></i>:'Register'}
          </button>
        </form>
      </div>
    </>
  )
}
