import React, { useEffect, useRef, useState } from 'react'
import {css, keyframes, styled} from 'styled-components'
import { Testimony } from '../data'
import {maxiphone, minilap, mobile} from '../responsive'

const Container = styled.div`
    width : 95vw;
    height : auto;
    background-color : white;
    margin : 30px;
    border-radius : 15px;
    box-shadow : 0px 0px 10px 5px gray;
    padding : 10px 0px;
    flex-wrap : wrap;
    ${mobile({
        width : "82vw",
        height : "auto",
    })}
    ${minilap({
        margin : "20px"
    })}
    ${maxiphone({
        margin : "10px"
    })}
    
`

const Title = styled.h2`
    color : black;
    opacity : 90%;
    width : 50%;
    text-align : center;
    font-size : 40px;
    ${mobile({
        fontSize : "30px",
        width : "80%"
    })}
`
const Wrapper = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    position : relative;
`
const Desccription = styled.h4`
    width : 60%;
    text-align : center;
    opacity : 70%;
    ${mobile({
        fontSize : "20px"
    })}
`
const CommentContainer = styled.div`
    display : flex;
    width : 90%;
    align-items : center;
    justify-content : center;
    flex : 1;
    flex-wrap : wrap;
    ${mobile({
        flexDirection : "column"
    })}
`
const Comment = styled.div`
    margin-top : 20px;
    padding : 10px;
    border-radius : 15px;
    background-color : #804c80;
    margin-left : 10px;
    margin-right : 10px;
    box-shadow : 0px 0px 10px 3px black;
    transition : all 0.2s ease-out;
    animation : ${props=>props.isVisible ? css`${AnimateSeller} 3s ease-in-out` : 'none'};
  &:hover{
    transform : scale(1.05);
    transition : all 0.2s ease-in;
    color : white;
  }
`
const MessageConatiner = styled.div`

`
const ProfileConatiner = styled.div`
    display : flex;
    align-items : center;
`
const Coma = styled.h1`
    font-size : 60px;
    margin-bottom : 0px;
    margin-top : 0px;
`
const Message = styled.div`
    width : 80%;
    color : white;
`
const Image = styled.img`
    width : 40px;
    height : 40px;
    margin-top : 20px;
    border-radius : 50%;
  
`
const Name = styled.div`
    margin-top : 10px;
    font-weight : bold;
    margin-left : 15px;
`

const AnimateSeller = keyframes`
  from{
    opacity : 0;
  }
  to{
    opacity : 1;
  }
`
const AnimateTitle = keyframes`
    from{
      width : 50%;
    }
    to{
      width : 0%;
    }
`

const HideTitle1 = styled.div`
  width : 0%;
  height : 15%;
  background-color : black;
  border-radius : 20px;
  position : absolute;
  top : 0%;
  left : 25%;
  animation : ${props=>props.isVisible ? css`${AnimateTitle} 2s ease-in-out` : 'none'};
`

const Testimonial = () => {

    const [isVisible, setIsVisible] = useState(false);

    const myRef = useRef();
    useEffect(() => {
    const observer = new IntersectionObserver((entries)=>{
      const entry = entries[0];
      setIsVisible(entry.isIntersecting)
    })
    observer.observe(myRef.current);
    }, []);

  return (
    <Container>
    <Wrapper >
      <Title ref={myRef}>Capturing the Essence of Excellence: OUR TESTIMONIAL</Title>
      <Desccription>Experience the heartfelt emotions, the transformative moments, and the resounding echoes of success that are interwoven into our testimonial.</Desccription>
      <CommentContainer>
        {Testimony.map(items=>(
            <Comment isVisible={isVisible} key={items.id}>
            <MessageConatiner>
                <Coma>``</Coma>
                <Message>{items.message}</Message>
            </MessageConatiner>
            <ProfileConatiner>
                <Image src={items.img}/>
                <Name>{items.name}</Name>
            </ProfileConatiner>
            </Comment>
        ))}
      </CommentContainer>
      <HideTitle1 isVisible = {isVisible}></HideTitle1>
    </Wrapper>
    </Container>
  )
}

export default Testimonial
