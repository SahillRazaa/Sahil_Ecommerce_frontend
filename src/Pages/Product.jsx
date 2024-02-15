import React, { useEffect, useState } from 'react'
import {styled} from 'styled-components'
import Announcement from '../Components/Announcement'
import Navbar from '../Components/Navbar'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BestSeller from '../Components/BestSeller';
import Newsletter from '../Components/NewsLetter';
import Footer from '../Components/Footer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts } from '../redux/cartRedux';
import Alert from '../Components/Alert';
import { maximobile, miniminilap } from '../responsive';

const Container = styled.div`

`

const Wrapper = styled.div`
  display : flex;
  margin : 30px;
  ${miniminilap({
    flexDirection : "column"
  })}
  
`

const ImageContainer = styled.div`
  box-shadow : 0px 0px 10px 2px purple;
  margin-right : 200px;
  border-radius : 50%;
  ${miniminilap({
    width : "48%",
    marginRight : "0px",
    marginLeft : "25%"
  })}
`

const Image = styled.img`
  width : 100%;
  height : 100%;
  border-radius : 50%;
`

const InfoContainer = styled.div`
  margin-top : 0px;
  ${miniminilap({
    display : "flex",
    flexDirection : "column",
    alignItems : "center"
  })}
`

const Title = styled.h2`
  width : 80%;
`

const Specifications = styled.div`
  display : flex;
  flex-direction : column;
`

const Feature = styled.div`
  display : flex;
  ${miniminilap({
    flexDirection : "column",
    alignItems : "center"
  })}
`

const Type = styled.div`
  font-weight : bold;
  margin-right : 10px;
`

const Value = styled.div`

`

const Deal = styled.button`
  border-radius : 6px;
  margin-top : 10px;
  padding : 5px 10px;
  border : none;
  background-color : #bb0000;
  color :white;
  font-weight : 700;
`

const PriceContainer = styled.div`
  display : flex;
  align-items : center;
`

const PrePrice = styled.p`
  font-size : 13px;
  text-decoration: line-through;
  margin-top : 20px;
`

const CurrPrice = styled.h2`
  margin-right : 10px;
`

const Msg = styled.p`
  font-size : 13px;
  margin-top : 20px;
`

const SelectionContainer = styled.div`
  display : flex;
  margin-top : 0px;
  ${maximobile({
    flexDirection : "column",
    alignItems : "center"
  })}
`

const Quantity = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  margin-right : 60px;
  
`

const Number = styled.h4`
  margin-left : 10px;
  margin-right : 10px;
  padding : 1px 7px;
  border-radius : 4px;
  box-shadow : 0px 0px 10px 2px black;
  
`

const Colors = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  margin-right : 60px;
  ${maximobile({
    marginRight : "0px"
  })}
`

const Color = styled.p`
  width : 20px;
  height : 20px;
  border-radius : 5px;
  background-color: ${(props) => props.color};
  margin-right : 10px;
  cursor : pointer;
  transition : all 0.25s ease-out;
  &:hover{
    transform : scale(1.1);
    transition : all 0.25s ease-in;
    opacity : 80%;
    box-shadow : 0px 0px 10px 1px black;
  }
  ${maximobile({
    marginRight : "0px"
  })}
`

const Buy = styled.button`
  margin-top : 15px;
  border : none;
  box-shadow : 0px 0px 10px 2px purple;
  height : 30px;
  border-radius : 8px;
  display : flex;
  font-weight : bold;
  align-items : center;
  justify-content : center;
  padding :10px 15px;
  transition : all 0.25s ease-out;
  cursor : pointer;
  &:hover{
    transform : scale(1.1);
    transition : all 0.25s ease-in;
    background-color : purple;
    color : white;
  }
`

const Tag = styled.p`
  display : flex;
  justify-content : center;
  align-items : center;
  margin-right : 10px;
  font-weight : bold;
`

const Product = () => {
  const user = useSelector(state=>state.user);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product,setProduct] = useState({});
  const [quantity,setQuantity] = useState(1);
  const [color,setColor] = useState(null);
  const [alert,setAlert] = useState("");
  const dispatch = useDispatch();

  useEffect(()=>{
    const getProducts = async ()=>{
      try{
        const res = await axios.get("http://localhost:5000/api/products/find/"+id);
        setProduct(res.data);
      }catch(err)
      {
        console.log(err);
      }
    }
    getProducts();
  },[id])

  let newPrice = product.price;
  newPrice = newPrice - (0.15*newPrice);

  const handleQuantity = (type)=>{
    if(type === "dec" && quantity !== 1){
      setQuantity(quantity-1);
    }
    else if(type === "inc"){
      setQuantity(quantity+1);
    }
  }

  const handleClick = ()=>{
    if(user.currentUser !== null){
      if(color === null){
        showAlert("Please select color before adding the product to cart","Error! : ")
      }
      else{
        dispatch(
          addProducts({...product, quantity, color})
        );
      }
    }else{
      showAlert("Please login/Register to add products in cart","ERROR! :");
    }
  };

  const handleColor = (c)=>{
    setColor(c);
  }

  const showAlert = (message, text)=>{
    setAlert({
      msg : message,
      txt : text
    })
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  }

  return (
    <Container>
      <Announcement/>
      <Navbar/>
      <Alert alert={alert}/>
      <Wrapper>
        <ImageContainer>
          <Image src={product.image}/>
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title} | {product.description}</Title>
          <hr/>
          <Specifications>
            <Feature>
            <Type>Brand</Type>
            <Value>{product.Brand}</Value>
            </Feature>
            <Feature>
            <Type>Type</Type>
            <Value>{product.categories}</Value>
            </Feature>
            <Feature>
            <Type>Special features</Type>
            <Value>{product.description}</Value>
            </Feature>
          </Specifications>
          <Deal>Deals - 15%OFF</Deal>
          <PriceContainer>
            <CurrPrice>{`Rs.${newPrice}`}</CurrPrice>
            <Msg>M.R.P:</Msg>
            <PrePrice>Rs.{product.price}</PrePrice>
          </PriceContainer>
          <SelectionContainer>
            <Quantity>
            <Tag>Quantities : </Tag>
            <RemoveIcon onClick = {()=>handleQuantity("dec")} style={{cursor : "pointer"}}/>
            <Number>{quantity}</Number>
            <AddIcon onClick = {()=>handleQuantity("inc")} style={{cursor : "pointer"}}/>
            </Quantity>
            <Tag>Colors : </Tag>
            <Colors>
            {product.color?.map((c) => (
              <Color id="color" color = {c} key = {c} onClick={()=>handleColor(c)}/>
              ))}
            </Colors>
          </SelectionContainer>
          <Buy onClick={()=>handleClick()}>Add to cart</Buy>
        </InfoContainer>
      </Wrapper>
      <br/>
      <BestSeller/>
      <Newsletter/>
      <Footer/>
    </Container>
  )
}

export default Product
