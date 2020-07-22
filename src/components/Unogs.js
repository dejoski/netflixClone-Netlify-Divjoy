import React from 'react'

// Import styling libraries
import Card from 'react-bootstrap/Card'
import styled from 'styled-components'

// Import custom Fetch Hook
import useFetch from './useFetch'

export default function Unogs(){
  const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
    justify-content: center;
    padding: 0 20px 0 30px;
  `;

  const posts = useFetch('https://unogsng.p.rapidapi.com/search')
  console.log(posts)
  return (
    <Wrapper>
      {posts && posts.map((post, index) => (
        <Card key={index} style={{ 
          border: '2px solid lightGray', 
          width: "300px", 
          height: 'auto'
          }}>
          <img width='100%' src={post.img} alt="Movie thumbnail" />
          <h1>{post.title}</h1>
          <p> {post.synopsis}</p>
        </Card>
       ))}
      </Wrapper>
   );
  }