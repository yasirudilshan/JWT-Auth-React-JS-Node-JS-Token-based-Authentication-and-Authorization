import React from 'react'

function HomeComponent({ setIsValid }) {
    async function destroy(){
        localStorage.removeItem('token')
        setIsValid(false);
    }
  return (
    <div>
      This is home
      <br/>
      <button onClick={destroy}>Log out</button>
    </div>
  )
}

export default HomeComponent
