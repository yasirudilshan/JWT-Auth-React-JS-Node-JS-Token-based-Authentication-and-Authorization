
import React, { useEffect, useState  } from 'react'
import HomeComponent from '../components/HomeComponent'

const Home=()=> {
    

    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    async function authenticate(){
        const auth=await fetch('http://localhost:8000/api/home',{
            headers:{
                'x-access-token': localStorage.getItem('token'),
            }
        })

        const data=await auth.json()
        console.log(data)

        if(data.status==='ok'){
            setIsLoading(false)
            setIsValid(true)
            console.log("loading component")
            
        }
        else{
            setIsLoading(false)
            setIsValid(false)
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
    },[isValid])
    if (isLoading) {
        return <div>Loading...</div>;
     }
     if (isValid) {
        return <div>
            <HomeComponent setIsValid={setIsValid}/>
        </div>
     }
     return <div>Not a valid user</div>;
    
}

// function Home(){
//     return(
//         <div>
//             <HomeComponent/>
//         </div>
//     )
// }

export default Home
