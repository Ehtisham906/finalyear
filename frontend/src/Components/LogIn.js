import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import OAuth from '../components/OAuth';
import {
  signInStart,
  signInSuccess,
  signInFailure
} from '../redux/user/userSlice';


export default function LogIn() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      dispatch(signInStart());
      const res = await fetch('http://localhost:4000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex gap-2'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" color="#262626" fill="none">
              <path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
              <path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
            </svg>
          </div>
          <div className='w-full'>
            <input type="email" placeholder='Email' className='border p-3 w-full rounded-lg' id='email' onChange={handleChange} />
          </div>
        </div>
        <div className='flex gap-2'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" color="#262626" fill="none">
              <path d="M13.4998 13.5C15.1242 14.1962 15.9365 14.5443 16.7554 14.4351C16.8478 14.4227 16.9396 14.4061 17.0305 14.3852C17.8357 14.2003 18.4742 13.5894 19.7513 12.3676L19.9012 12.2242C20.8695 11.2559 21.3537 10.7717 21.4713 9.78342C21.5889 8.79514 21.3365 8.38218 20.8317 7.55626C20.3833 6.82247 19.7571 5.98593 18.8855 5.11433C18.0139 4.24272 17.1773 3.61654 16.4435 3.16808C15.6176 2.66332 15.2047 2.41094 14.2164 2.52851C13.2281 2.64609 12.7439 3.13027 11.7756 4.09863L11.6322 4.24843C10.4105 5.52557 9.7996 6.16413 9.61466 6.96941C9.59382 7.0602 9.57721 7.1519 9.56489 7.24423C9.45564 8.06322 9.80375 8.87548 10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M10.5002 10.499L2.50021 18.4997V21.4997H5.50021V19.4997H7.50021V17.4997H9.50021L13.5002 13.4997" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17.0002 7L16.0002 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div className='w-full '>
            <input type="password" placeholder='Password' className='border p-3 w-full rounded-lg' id='password' onChange={handleChange} />
          </div>
        </div>

        <button disabled={loading} className='bg-primary text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        {/* <OAuth /> */}
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Dont Have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5 font-bold">{error}</p>}
    </div>
  );
}