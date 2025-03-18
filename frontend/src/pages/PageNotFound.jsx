import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div style={{ marginTop: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h1>Page Not Found</h1>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Link
          to="/"
          style={{ color: 'blue', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#8d92ff'}
          onMouseLeave={(e) => e.target.style.color = 'blue'}
        >
          Go To Home Page
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound
