import React, { useEffect, useRef, useState } from 'react'
import './SearchBar.scss'
import UserSearchrow from '../../atoms/UserSearchRow'

const SearchBar = ({ placeholder, data }) => {
  const [query, setQuery] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const resultRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  })

  const handleOutsideClick = e => {
    if (resultRef.current && !resultRef.current.contains(e.target)) {
      setFilteredData([])
    }
  }

  const handleChange = e => {
    setQuery(e.target.value.toLowerCase())

    // this is for testing puproses:
    const queryResult = data?.filter(value => {
      return value && value.username.toLowerCase().includes(query)
    })
    if (query?.length < 2) {
      setFilteredData([])
    } else {
      setFilteredData(queryResult)
    }
    // the values (if it's length is >= 3 will be sent to backend and then it'll return the filtered data)
  }

  return (
    <div className='userSearchBar'>
      <div className='searchInput'>
        <input
          ref={inputRef}
          type='text'
          value={query}
          placeholder={placeholder}
          onChange={handleChange}
        />
        <div className='iconContainer'>
          {query?.length === 0 ? (
            <div className='searchIcon'>
              <svg
                className='icon'
                width='18'
                height='18'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
                <path d='M21 21l-6 -6' />
              </svg>
            </div>
          ) : (
            <div onClick={() => setQuery('')} className='closeButton'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-x'
                width='18'
                height='18'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M18 6l-12 12' />
                <path d='M6 6l12 12' />
              </svg>
            </div>
          )}
        </div>
      </div>

      {filteredData?.length !== 0 && (
        <div ref={resultRef} className='searchResult'>
          {filteredData?.slice(0, 10).map((value, key) => {
            return (
              <UserSearchrow
                key={key}
                id={value?.id}
                username={value?.username}
                name={value?.firstName}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBar
