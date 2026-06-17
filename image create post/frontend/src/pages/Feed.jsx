import React ,{ useState, useEffect } from 'react'
import axios from "axios"

const Feed = () => {

    const [posts, setPosts] = useState([
        {
            _id: "1",
            image: "https://hips.hearstapps.com/hmg-prod/images/ferrari-e-suv-2-copy-680287cac36b2.jpg?crop=1.00xw:0.838xh;0,0.0673xh",
            caption: "car",
        }

    ])

    useEffect(() =>{
        axios.get("http://localhost:3000/posts")
        .then((res)=>{
            
            setPosts(res.data.posts)
            
        })
    })

    return (

        <section className='feed-section'>

            {
                posts.length > 0 ? (
                    posts.map( (post) => (
                        <div key={post._id} className='post-card'>
                            <img src={post.caption} alt={post.caption} />
                            <p>{post.caption}</p>
                        </div>
                    ))
                ):(
                    <h1>No post available</h1>
                )    
            }

        </section>
    )
}

export default Feed