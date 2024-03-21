import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const AllEvents = ({ data }) => {
  return (
    <div className='events_page'>
        {data.map(
            (ev) => (
                <Link legacyBehavior key={ev.id} href={`/events/${ev.id}`} passHref>
                    <a className='card'>
                        <Image src={ev.image} alt={ev.title} width={500} height={500}/>
                        <h2>{ev.title}</h2>
                    </a>
                </Link>
            )
        )}
    </div>
  )
}

export default AllEvents;
