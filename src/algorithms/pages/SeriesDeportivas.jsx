import React from 'react'
import './rutaCortaStyle.css'
import { Link } from "react-router-dom";

export const SeriesDeportivas = () => {
  return (
    <div className='body'>
      <div className='bg-image'> dsd</div>
      <div className='bg-text'>
        <h1>Algoritmo en construccion</h1>
        <Link to={'/inicio'}>
        <button className='btn btn-light'>vuelva pronto</button>
        </Link>
      </div>
    </div>
  )
}
