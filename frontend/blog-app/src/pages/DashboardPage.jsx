import React , {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function DashboardPage() {
const navigate = useNavigate()

const [posts, setPost] = useState([])
    useEffect(()=>{
        postHandler()
    },[])

    const postHandler = async () => {
        try {
            const res =  await axios.get('http://localhost:4000/api/token')
            console.log(res);
            
            const resPost = await axios.get('http://localhost:4000/api/postUser',{
              headers : {
                Authorization : 'Bearer ' + res.data.token
              }
            })
            console.log(resPost);
            setPost(resPost.data.data)

        } catch (error) {
            console.log(error.response.data);
            navigate('/signin')
            
        }
 
    }
  return (
    <section>

    <div>
      <h1>Dashboard</h1>

      {posts.length > 0 ? (posts.map((post, index)=>(
        <h3>{post.title} -{'>'} {post.user.name}</h3>
      ))) :(
        <h1>no data</h1>
      )}
    </div>
    </section>

  )
}

export default DashboardPage
