import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Layout from '../Components/Layout';
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';

const LandingPage = () => {
  const img = "Images/airplane.jpg"
  const navigate = useNavigate()
  const [alertBox,setAlert] = useState(false);

  useEffect(()=>{
    let timer;
    if (alertBox){
      timer = setTimeout(()=>{
        setAlert(false)
      },2000)
    }

    return ()=>clearTimeout(timer)
  },[alertBox])

  const handleSearchFlight = ()=>{
    if (localStorage.getItem("token")){
      navigate("/searchFlight")
    }else{
      setAlert(true)
    }
  }
  return (
    <>
      <Header />
      <Layout style = {{backgroundImage: `url(${img})`}}>
          {
            alertBox && <Alert severity="info">Kindly login to book your flights</Alert>
          }
        <div style={{
          marginTop: "25%",
          marginLeft: "5%",
          marginRight: "65%"
        }}>
          <h1 className="text-white font-bold text-4xl mb-6">Discover Your Next Adventure</h1>
          <input type="button" value="Fly Now" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline text-lg"
          onClick={handleSearchFlight}/>

        </div>
        </Layout>

    </>
  )
}

export default LandingPage