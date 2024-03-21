import React from 'react'
import Image from 'next/image';


const SingleEvent = ({ data }) => {
  return (
    <div>
        <h1>{data.title}</h1>
        <Image src ={data.image} width={1000} height={500} alt={data.title} />
        <p>{data.description}</p>

        <input type="email" /> <button>Submit</button>
    </div>
  )
}

export default SingleEvent