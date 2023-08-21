import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken'



const Dashboard = ()=>{

    async function destroy(){
        localStorage.removeItem('token')
    }

    const navigate = useNavigate();

    async function showDashboard(){
        const req=await fetch('http://localhost:8000/api/dashboard',{
            headers:{
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data=await req.json()
        console.log(data)

        if(data.status==='ok'){

        }
        else{
            window.location.href='/login'
        }
    }

    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(token){
            const user=jwt.decode(token)
            if(!user){
                localStorage.removeItem('token')
                window.location.href='/login'
            }
            else{
                showDashboard()
            }
        }
        else{
            window.location.href='/login'
        }
    },[])
    return <button onClick={destroy}>Click</button>
    
}

export default Dashboard
