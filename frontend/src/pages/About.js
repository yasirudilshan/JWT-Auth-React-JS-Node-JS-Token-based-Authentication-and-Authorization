import React, { useEffect } from 'react'


const About = () => {

    async function authenticate(){
        const auth=await fetch('http://localhost:8000/api/about',{
            headers:{
                'x-access-token': localStorage.getItem('token'),
            }
        })

        const data=await auth.json()
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
            authenticate()
        }
        else{
            window.location.href='/login'
        }
    })
    return(
        <div>About</div>
    )

}

export default About
