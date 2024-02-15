import {styled} from 'styled-components'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { maxiphone, mobile } from '../responsive';

const Container = styled.div`
  width : 90vw;
  height : auto;
  margin-bottom : 100px;
`
const Prod = styled.div`
  display : flex;
  flex-wrap : wrap;
  width: 100%;
  height : 100%;
  margin : 0px;
  justify-content : center;
  align-items : center;
  ${mobile({
    width : "80%",
    height : "80%",
  })}
`

const Wrapper = styled.div`
  margin : 100px;
  box-shadow : 0px 0px 15px 2px purple;
  
  ${maxiphone({
    marginLeft : "50px"
  })}
  ${mobile({
    marginLeft : "80px"
  })}
`
const ImageConatainer = styled.div`
background-color : white;
padding : 15px;
display : flex;
justify-content : center;
align-items : center;
position : absolute;
border-radius : 15px;
transition : all 0.5s ease-out;
cursor : pointer;
&:hover{
  transform : scale(1.1);
  tansition : all 0.5s ease-in;
}
`
const Image = styled.img`
width : 190px;
border-radius : 15px;
height : 190px;
`
const Info = styled.p`
background-color : black;
color : white;
width : 150px;
height : 130px;
position : relative;
top : 150px;
left : 150px;
border-radius : 15px;
display : flex;
justify-content : center;
text-align : center; 
align-items : center;
flex-direction : column;
opacity : 70%;
font-weight : bold;
transition : all 0.5s ease-out;
&:hover{
  transform : scale(1.1);
  tansition : all 0.5s ease-in;
  opacity : 100%;
}
`

const Name = styled.div`

`
const Price = styled.div`
margin-bottom : 10px;
`

const Products = ({cat, filters, sort}) => {

  const [products, setProducts] = useState([]);
  const [filteredproducts, setFilteredProducts] = useState([]);

  useEffect(() => {
  const getProducts = async ()=>{
  try{
    const res = await axios.get(cat !== "All-Products"
      ? `http://localhost:5000/api/products/?category=${cat}`
      : "http://localhost:5000/api/products");
    setProducts(res.data);
  }catch(err)
  {
    console.log(err);
  }
  };
  getProducts();
   
  }, [cat])
  useEffect(() => {
    if(cat){
      setFilteredProducts(
        products.filter(item=> Object.entries(filters).every(([key,value])=>
        item[key]?.includes(value)
        ))
      );
    }
    else{
      setFilteredProducts(products);
    }
  }, [products,cat, filters])

  useEffect(() => {
    if(sort==="l_to_h"){
      setFilteredProducts(prev=>
      [...prev].sort((a,b)=>a.price - b.price)  
      );
    }
    else{
      setFilteredProducts(prev=>
      [...prev].sort((a,b)=>b.price - a.price)  
      );
    }
  }, [sort]);

  return (
    <Container>
      <Prod>
      {filteredproducts.map(item=>(
        <Wrapper key={item.id}>
      <Link to={`/product/${item._id}`}>
      <ImageConatainer>
        <Image src={item.image}/>
      </ImageConatainer>
      </Link>
      <Info>
        <Name>{item.title}</Name>
        <br />
        <Price>Rs.{item.price}</Price>
      </Info>
    </Wrapper>
    ))}
    </Prod>
    </Container>
  )
}

export default Products
