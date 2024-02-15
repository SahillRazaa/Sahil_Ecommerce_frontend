import React, { useEffect, useRef, useState } from 'react'
import {css, keyframes, styled} from 'styled-components'
import {minilap, mobile, tablet} from '../responsive'

const Container = styled.div`
    width : 98.8vw;
    height : auto;
    background-color : black;
    position : relative;
    ${mobile({
      display : "none"
    })}
`
const Upper = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
    padding-left : 80px;
    ${minilap({
      flexDirection : "column"
    })}
`

const InfoConatinerUpper = styled.div`
    flex :1;
    margin-bottom : 100px;
`
const ImageConatinerUpper = styled.img`
    flex :1;
    width : 80%;
`

const AnimateTitle = keyframes`
    from{
      width : 43%;
    }
    to{
      width : 0%;
    }
`

const TitleUpper = styled.h1`
    font-size : 50px;
    color : white;
`
const DescUpper = styled.div`
width : 80%;
color : gray;
font-size : 20px;
`
const Lower = styled.div`
margin-top : -100px;
padding : 30px;
display : flex;
align-items : center;
justify-content : center;
${minilap({
  display : "none"
})}
`
const InfoConatinerLower = styled.div`
    flex : 1;
`
const ImageConatinerLower = styled.img`
    flex : 1;
`
const TitleLower = styled.h1`
    font-size : 50px;
    color : white;
    
`
const DescLower = styled.div`
color : gray;
font-size : 20px;
width : 80%;
font-style : underline;
`

const HideTitle1 = styled.div`
  width : 0%;
  height : 15%;
  background-color : white;
  border-radius : 20px;
  position : absolute;
  top : 8%;
  left : 5%;
  animation : ${props=>props.isVisible ? css`${AnimateTitle} 2s ease-in-out` : 'none'};
`
const HideTitle2 = styled.div`
  width : 0%;
  height : 15%;
  background-color : white;
  border-radius : 20px;
  position : absolute;
  top : 55%;
  left : 50%;
  animation : ${props=>props.isVisible1 ? css`${AnimateTitle} 2s ease-in-out` : 'none'};
`

const BestProduct = () => {

  const [isVisible, setIsVisible] = useState(false);

  const myRef = useRef();
  useEffect(() => {
  const observer = new IntersectionObserver((entries)=>{
    const entry = entries[0];
    setIsVisible(entry.isIntersecting)
  })
  observer.observe(myRef.current);
  }, []);
  
  const [isVisible1, setIsVisible1] = useState(false);

  const myRef1 = useRef();
  useEffect(() => {
  const observer1 = new IntersectionObserver((entries)=>{
    const entry1 = entries[0];
    setIsVisible1(entry1.isIntersecting)
  })
  observer1.observe(myRef1.current);
  }, []);
  

  return (
    <Container>
      <Upper>
        <InfoConatinerUpper>
            <TitleUpper ref={myRef}>LAPTOP LUXE: POWER IN YOUR PALMS</TitleUpper>
            <DescUpper>Discover the perfect blend of performance and aesthetics Laptops. These exceptional Laptops are meticulously crafted to cater to your every computing need, whether you're a creative professional, a student, a gamer, or simply seeking a reliable companion for your daily tasks.</DescUpper>
        </InfoConatinerUpper>
        <ImageConatinerUpper src="https://i.ibb.co/QHvt2Q7/ales-nesetril-Im7l-Zjxe-Lhg-unsplash.jpg"/>
      </Upper>
      <Lower>
        <ImageConatinerLower src="https://i.ibb.co/6JzHr83/ervo-rocks-Zam8-Tv-Eg-N5o-unsplash-removebg-preview.png" />
        <InfoConatinerLower>
            <TitleLower ref={myRef1}>PURE SOUND: PREMIUM HEADPHONES FOR YOU</TitleLower>
            <DescLower>Step into a world of unparalleled audio with Apple headphones. These headphones redefine your listening experience, offering a symphony of high-quality sound, comfort, and style. Whether you're a music enthusiast, a gamer, or someone who loves to enjoy podcasts and movies, these headphones are your gateway to audio nirvana.</DescLower>
        </InfoConatinerLower>
      </Lower>
      <HideTitle1 isVisible = {isVisible}></HideTitle1>
      <HideTitle2 isVisible1 = {isVisible1}></HideTitle2>
    </Container>
  )
}

export default BestProduct
