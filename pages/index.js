import { getServerSession } from "next-auth";
import { getSession, signOut, useSession } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils";

export default function Home() {

  const signout =  async ()=>{
    const data = await signOut({callbackUrl:'http://localhost:3000/login'});
  }

  const { data: session } = useSession()
  console.log(session)
  return (
    <>
      
      {session ? session.user.name: null} welcome to Dashboard
      {session ?  <img src={session.user.image} className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt=""/>: null}
     
      <button type="button" className="btn btn-warning" onClick={signout}>
        Signout
      </button>
    </>
    
  )
}

export async function getServerSideProps({req}){
 
  const session = await getSession({req})
  if (!session) {
    return {
      redirect:{
        destination:'/login',
        permanent:false
      }
    }
  }

  return {
    props:session
  }
}
