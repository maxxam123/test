import "./home.css"
import { Link } from 'react-router-dom';
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function Home() {

  return (
    <div>
    <div className="home">
      <div className="hometitle">HomePage</div>
      </div>
    </div>
  )
}
