import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  
  return (
    <header className='bg-gray-800 border-b-4 border-gray-700 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto'>
        <h1 className='font-bold text-xl flex flex-wrap text-gray-200'>
          <span>Blockchain</span>
          <span className='text-gray-400'>Estate</span>
        </h1>
        <form className='bg-gray-700 p-3 rounded-lg flex items-center'>
          <input 
            type='text' 
            placeholder='Search...' 
            className='bg-transparent focus:outline-none w-24 sm:w-64 text-gray-300'
          />
          <FaSearch className='text-gray-400' />
        </form>
        <ul className='flex gap-4'>
          <Link to='/' className='text-gray-300 hover:underline'>
            <li>Home</li>
          </Link>
          <Link to='/about' className='text-gray-300 hover:underline'>
            <li>About</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img 
                className='rounded-full h-7 w-7 object-cover' 
                src={currentUser.avatar} 
                alt='profile'
              />
            ) : (
              <li className='text-gray-300 hover:underline'>Sign in</li>   
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
