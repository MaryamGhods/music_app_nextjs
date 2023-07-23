import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const Search = () => {
  const [searchTerm , setSearchTerm] = useState('');
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/${searchTerm}`);
  }
  return (
    <div>      
      <form onSubmit={handleSubmit} autoComplete="off" className="sm:mt-4 mt-10 text-gray-300 z-30 focus-within:text-gray-200 w-[calc(100%-2rem)] mx-4">
        <label htmlFor="search-bar" className="sr-only">
          جستجو میان تمام آهنگ ها
        </label>
        <div className="flex flex-row justify-start items-center">
          <FiSearch className="w-6 h-6" />
          <input 
            id="search-bar"
            name="search-bar"
            placeholder="جستجوی آهنگ" 
            autoComplete="off"
            type="search"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            className="text-white placeholder-gray-300 bg-black/10 h-9 w-[calc(100%-8px)] border-none rounded-md text-xs outline-none p-4" 
            />
        </div>
      </form>
    </div>

  )
};
  
export default Search;