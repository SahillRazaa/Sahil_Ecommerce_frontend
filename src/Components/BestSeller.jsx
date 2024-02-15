import React, { useEffect, useRef, useState } from 'react'
import {css, keyframes, styled} from 'styled-components'
import { BestSell } from '../data'
import {mobile} from '../responsive'

const Container = styled.div`
  margin : 20px;
`
const Wrapper = styled.div`
  padding-top: 30px;
  margin : 30px;
  border : none;
  border-radius : 15px;
  background-color : gray;
  display : flex;
  align-items : center;
  justify-content : center;
  box-shadow: 0px 0px 10px 5px black;
  transition : all 0.2s ease-out;
  animation : ${props=>props.isVisible ? css`${AnimateSeller} 2s ease-in-out` : 'none'};
  &:hover{
    transform : scale(1.05);
    transition : all 0.2s ease-in;
    background-color : white;
  }
`
const Cate = styled.div`
  display : flex;
  ${mobile({
    flexDirection : "column",
  })}
  
  flex-wrap : wrap;
  justify-content : center;
`
const AnimateSeller = keyframes`
  from{ 
    opacity : 0;
  }
  to{
    opacity : 1;
  }
`

const Head = styled.div`
  font-size : 35px;
  font-weight : bold;
  margin-bottom : 30px;
  opacity : 80%;
`
const Categories = styled.div`
 display : flex;
  align-items : center;
  justify-content : center;
  flex-direction : column;
`
const CategoryImage = styled.img`
  width : 300px;
  height : 300px;
  ${mobile({
    width : "280px",
    height : "280px"
  })}
`
const GoButton = styled.button`
  margin  : 10px;
  padding : 8px 40px;
  background-color : black;
  border-radius : 10px;
  color : white;
  opacity : 70%;
  font-weight : bold;
  font-size : 15px;
  cursor : pointer;
`

const ChooseCategories = () => {

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
      <Head>OUR BEST SELLERS</Head>
      <Cate>
      {BestSell.slice(0,3).map(items=>(
        <Wrapper isVisible={isVisible} ref={myRef} key={items.id}>
        <Categories>
        <CategoryImage src={items.img}/>
        <GoButton>Shop Now</GoButton>
        </Categories>
        </Wrapper>
        ))}
        </Cate>
    </Container>
  )
}

export default ChooseCategories
