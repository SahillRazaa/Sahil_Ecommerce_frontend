import React, { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components';
import { Category } from '../data'
import { Link } from 'react-router-dom';
import {mobile} from '../responsive'

const AnimateCategory = keyframes`
  from{
    opacity : 0;
  }
  to{
    opacity : 1;
  }
`
const AnimateCateImage = keyframes`
  from{
    transform : scale(0.6);
  }
  to{
    transform : scale(1);
  }
`

const Container = styled.div`
  margin : 20px;
  animation: ${props => props.isVisible ? css`${AnimateCategory} 1s ease-in-out` : 'none'};
`
const Wrapper = styled.div`
  flex : 1;
  padding-top: 30px;
  margin-bottom : 40px;
  border : none;
  border-radius : 10px;
  display : flex;
  align-items : center;
  justify-content : center;
  
`
const Cate = styled.div`
  display : flex;
  ${mobile({
    flexDirection : "column"
  })}
  flex-wrap : wrap;
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
  width : 150px;
  height : 150px;
  justify-content : center;
  flex-direction : column;
  background-color : #c3c1c1bd;
  box-shadow: 0px 0px 10px 5px black;
  padding : 20px 30px;
  border-radius : 20px;
  cursor : pointer;
  transition : all 0.2s ease-out;
  &:hover{
    transform : scale(1.1);
    transition : all 0.2s ease-in;
    background-color : white;
  }
  animation : ${props=>props.isVisible ? css`${AnimateCateImage} 2s ease-in-out` : 'none'};
`
const CategoryImage = styled.img`
  width : 100px;
  height : 100px;
`
const Name = styled.h4`
  font-weight : bold;
  color : black;
  text-decoration : underline;
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
    <Container isVisible = {isVisible} ref = {myRef}>
      <Head>SHOP BY CATEGORIES</Head>
      <Cate>
      {Category.map(items=>(
        <Link style={{flex : "1"}} to={`/products/${items.name}`}>
        <Wrapper bg = {items.bg} key={items.id} bdr = {items.bdr}>
        <Categories isVisible = {isVisible}>
        <CategoryImage src={items.img}/>
        <Name>{items.name}</Name>
        </Categories>
        </Wrapper>
        </Link>
        ))}
        </Cate>
    </Container>
  )
}

export default ChooseCategories
