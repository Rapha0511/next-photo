import Link from 'next/link'
import React, { useContext } from 'react'
import UserContext from '@/context/UserContext'
export default function index() {
    const {userId} = useContext(UserContext)
  return (
    <div>
        <Link href="/btStRDwS9kZaCOSKeqxUBdVUiBr1/gallery">LA</Link>
    </div>
  )
}
