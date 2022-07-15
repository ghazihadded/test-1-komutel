import React, { useState,forwardRef } from 'react'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios"


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

export default function HomePage() {
   
    const [verif,setVerif]=useState(true)
    const [year,setYear]=useState("")
    const [open, setOpen] = useState(false);
    const [status,setStatus]=useState(null)
    const [message,setMessage]=useState("")
   
    const handleChange=(e)=>{
        setYear(e.target.value)
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(year.length<4 || year.length>4){
            setVerif(false)
            return;
        }else{
          setVerif(true) 

          try {

            const {data}=await axios.post('http://localhost:8000/api/user',{year})
           if(data?.status){
            setOpen(true)
            setStatus('success')
            setMessage(data.message)

           }else{
            setOpen(true)
            setStatus('error')
            setMessage(data.message)
           }
            
          } catch (err) {
            setOpen(true)
            setStatus('error')
            setMessage("server error")
          }
        
        }
    }
   
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
   


  return (
    <div className='homepage'>
         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
        <h1>WELCOME</h1>
        <form onSubmit={handleSubmit}>
         <label>L'année de naissance:</label>   
        <input type="number"  placeholder='entrez votre année' value={year} onChange={handleChange}/>
        <span className={!verif?"error":"done"}>année incorrecte</span>
        <button>envoyer</button>
        </form>

    </div>
  )
}
