import Axios  from 'axios'
import Joi from 'joi'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({saveUserToken}) {
  let [error, setError] = useState('')
  let [rgxError, setRgxError] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
  let [user, setUser] = useState({
    phone_number:'',
    password:''
  })

  // get inputs values
  function getUserData(e){
    let myUser={...user}
    myUser[e.target.name] = e.target.value
    setUser(myUser)
  }

  // after logging in if he back using arrow ?
  useEffect(() => {
    if(localStorage.getItem('userToken')){
      navigate('/home')
    }
  }, []);

  async function LoginSubmit(e) {
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
          'https://anayty.pythonanywhere.com/api/v1/login/',
          user
        );
        if (response.status === 200) {
          // console.log(response.data)
          localStorage.setItem('userToken', response.data.access);
          saveUserToken()
          navigate('/')
          setIsLoading(false)
        } else {
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
      phone_number: Joi.number().integer().min(10000000000).max(999999999999999).required().messages({
        'number.base': 'phone number must be a number',
        'number.integer': 'phone number must be an integer',
        'number.min': 'phone number must be at least 11 digits',
        'number.max': 'phone number must be less than 15 digits',
        'number.unsafe': 'phone number must be less than 15 digits'
      }),
      password:Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)).required().messages({
        'string.pattern.base':'please enter correct password'
      }),
    })
    return schem.validate(user,{abortEarly:false})
  }

  return (
    <>
      <div className='w-75 mx-auto my-5'>
        <h2><span className='fst-italic fw-bold text-warning'>L</span>ogin Now</h2>
        {/* {rgxError.map((err,i)=><div key={i} className="alert alert-danger">{err.message}</div>)} */}
        {error && error.error && <div className="alert alert-danger">server Error == {error.error}</div>}        <form onSubmit={LoginSubmit}>
          <label htmlFor="Phone">Phone :</label>
          <input  type="text" onChange={getUserData} className='form-control mb-2' name='phone_number' id='Phone' />
          {/* if the error corresponds to phone_number */}
          {rgxError.find((err) => err.context.key === 'phone_number') && (
          <div className='alert alert-danger'>
            {rgxError.find((err) => err.context.key === 'phone_number').message}
          </div>
          )}

          <label htmlFor="password">password :</label>
          <input  type="password" onChange={getUserData} className='form-control mb-2' name='password' id='password' />

          {rgxError.find((err) => err.context.key === 'password') && (
          <div className='alert alert-danger'>
            {rgxError.find((err) => err.context.key === 'password').message}
          </div>
          )}

          <button className='btn btn-outline-info'>
            {isLoading?<i className='fas fa-spinner fa-spin'></i>:'Login'}
          </button>
        </form>
      </div>
    </>
  )
}
