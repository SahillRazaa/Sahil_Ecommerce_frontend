import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Announcement from '../Components/Announcement'
import Navbar from '../Components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../redux/userRedux';
import { emptyProducts } from '../redux/cartRedux';
import AvatarMake from '../Components/Avatar_make'
import axios from 'axios'
import Footer from '../Components/Footer'
import { maxilap, maximobile, minilap, minitablet, tablet } from '../responsive'

const Container = styled.div`

`
const Wrapper = styled.div`

`
const Head = styled.h1`
  display : flex;
  justify-content : center;
  align-items : center;
  opacity : 70%;
`

const Body = styled.div`
  display  : flex;
  padding : 20px;
  opacity : ${props=>props.display};
  ${maxilap({
    flexDirection : "column",
  })}
`
const Left = styled.div`
flex : 1;
box-shadow : 0px 0px 10px 0px purple;
height : 100vh;
padding : 20px;
border-radius : 20px;
display : flex;
align-items : center;
flex-direction : column;
margin-right : 30px;
${maxilap({
  width : "90%",
  marginLeft : "2%",
})}
`
const Right = styled.div`
flex : 4;
padding : 20px;
margin-left : 10px;
${maxilap({
  width : "100vw"
})}
`
const Username = styled.div`
font-size : 25px;
`
const Subleft = styled.div`
  padding  : 10px 0px;
  font-weight : bold;
  border-bottom : 2px solid purple;
  margin-bottom : 10px;
  cursor : pointer;
  width : 100%;
  text-align : center;
  &:hover{
    background-color : purple;
    color : white;
    border-radius : 10px;
  }
`
const Logout = styled.button`
  margin-top : 30px;
  font-size : 20px;
  font-wegith : bolder;
  padding : 10px;
  border-radius : 10px;
  background-color : purple;
  color : white;
  border : none;
  cursor : pointer;
  translation : all 0.5s ease-out;
  &:hover{
    transform : scale(1.2);
    translation : all 0.5s ease-in;
    opacity : 80%;
  }
`
const ProductContainer = styled.div`
width : 83%;

`
const Product1 = styled.div`
box-shadow : 0px 0px 10px 0px purple;
width : 100%;
border-radius : 15px;
  display : flex;
  align-items : center;
  ${tablet({
    flexDirection : "column"
  })}
`

const ImageContainer = styled.div`
margin-right : 100px;
cursor : pointer;
${tablet({
  marginRight : "0px"
})}
${minitablet({
  margin : "30px"
})}
`
const Image1 = styled.img`
  width : 230px;
  heigt : 230px;
  border-radius : 15px;
`
const InfoContainer = styled.div`
${minitablet({
  margin : "30px"
})}
${maximobile({
  width : "80%"
})}

`
const Title = styled.h2`
  font-weight : bold;
  line-height  :0px;
  margin-top : 30px;
`
const Desc = styled.p`
  font-size : 13px;
`
const Price = styled.p`
font-weight : bold;
font-size : 20px;
margin-bottom : 0px;
`
const SelectionContainer = styled.div`
  display : flex;
  margin-top : 0px;
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
`
const Color1 = styled.p`
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
  }
`
const Tag = styled.p`
display : flex;
justify-content : center;
  align-items : center;
  margin-right : 10px;
  font-weight : bold;
`
const Orders = styled.h1`
${maxilap({
  margin : "20px",
})}
`

const GlobalStyle = createGlobalStyle`
  body.modal-open {
    overflow: hidden;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  z-index: 999;
`;
const ConfirmContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 30%;
height: 40%;
top : 35%;
left : 35%;
position: fixed;
box-shadow: 0px 0px 10px 2px purple;
border-radius: 20px;
background-color: #E5E5E6;
${minilap({
  width : "50%",
  left : "25%"
})}
${maximobile({
  width : "70%",
  left : "15%"
})}
`
const Message = styled.p`
    font-size : 20px;
    width  :70%;
    text-align : center;
    font-weight : bold;
`
const ButtonContainer = styled.div`
  display : flex;
  display : flex;
  ${minilap({
    flexDirection : "column"
  })}
`
const CancelButton = styled.button`
margin : 10px;
border : none;
  color : white;
  font-weight : bold;
  background-color : black;
  padding : 8px 40px;
  border-radius : 10px;
  transition : all 0.25s ease-out;
  &:hover{
    transform : scale(1.1);
    transition : all 0.25s ease-in;
    background-color : white;
    color : black;
    border : 2px solid black;
`
const ConfirmButton = styled.button`
margin : 10px;
border : none;
  color : white;
  font-weight : bold;
  background-color : black;
  padding : 8px 40px;
  border-radius : 10px;
  transition : all 0.25s ease-out;
  &:hover{
    transform : scale(1.1);
    transition : all 0.25s ease-in;
    background-color : white;
    color : black;
    border : 2px solid black;

`

const OrderDisplay = styled.div`
`
const OrderContainer = styled.div`
display : flex;
flex-direction : column;
flex : 4;

`
const EmptyOrder =styled.h3`
flex : 4;
font-size : 30px;
color : red;
`

const Profile = () => {
  const user = useSelector(state=>state.user);
  const [deleteView, setDeleteView] = useState(false);
  const [display, setDisplay] = useState("100%");
  const dispatch = useDispatch();
  const [orderProducts, setOrderProducts] = useState([]);
  const [orderview, setOrderView] = useState(false);

  const handleLogout = ()=>{
    dispatch(logOut());
    dispatch(emptyProducts());
  }
  const username = useSelector(state=>state.user);

  const Logouthandle = ()=>{
    if(deleteView){
      handleLogout();
    }
    handleToggle();
  }

  const handleToggle = ()=>{
    setDeleteView(!deleteView);
    if(display === "100%"){
      setDisplay("20%");
      document.body.classList.remove('modal-open');
    }
    else{
      setDisplay("100%");
      document.body.classList.add('modal-open');
    }
  }

  const find_order = async(user, Token)=>{
    try{
      const res = await axios.get("http://localhost:5000/api/orders/findOrder",{headers:{token:"Bearer "+Token}, params : {user : user}})
      setOrderProducts(res.data);
      if(res.data.length === 0){
        setOrderView(false);
      }
      else{
        setOrderView(true);
      }
      
    }catch(err)
    {
      console.log(err);
    }
  }
  find_order(user.currentUser._id, user.currentUser.accessToken);

  return (
    <Container>
      <Announcement/>
      <Navbar/>
        <Wrapper>
        <Head>My Account</Head>
        <Body display = {display}>
          <Left>
            <AvatarMake/>
            <Username>Username : <b>{`${username.currentUser.username}`}</b></Username>
            <br />
            <Subleft>Edit Profile</Subleft>
            <Subleft>Set Address</Subleft>
            <Subleft>Privacy</Subleft>
            <Subleft>Settings</Subleft>
            <Subleft>Terms, Policies & Licenses</Subleft>
            <Logout onClick={() => {
              Logouthandle();
              document.body.classList.toggle('modal-open');
            }}>LOGOUT</Logout>
          </Left>
          {orderview ?
          <OrderContainer>
          {orderProducts.map((orderItem)=>(
          <OrderDisplay>
          {orderItem.Products.map((product)=>(
            <Right key={product._id}>
            <Orders>Your Orders  done on {orderItem.createdAt.slice(0,10)}</Orders>
            <ProductContainer>
            <Product1>
            <ImageContainer>
              <Image1 src={product.image}/>
            </ImageContainer>
            <InfoContainer>
              <Title>{product.title.slice(0,15)}...</Title>
              <Desc>{product.description}</Desc>
              <Price>Rs.{product.price * product.quantity}</Price>
            <SelectionContainer>
            <Tag>Quantity : </Tag>
            <Quantity>
            <Number>{product.quantity}</Number>
            </Quantity>
            <Tag>Color : </Tag>
            <Colors>
            <Color1 color={product.color}></Color1>
            </Colors>
            </SelectionContainer>
            </InfoContainer>
          </Product1>
          <br />
          </ProductContainer>
          </Right>
          ))}
          </OrderDisplay>
          ))}
          </OrderContainer>: <EmptyOrder>Note : You do not have any orders currectly</EmptyOrder>} 
            </Body>
          <GlobalStyle />
        <ModalContainer visible={deleteView}>
        <ConfirmContainer>
          <Message>Are you sure? You want to <u style={{color : "red"}}>LOGOUT</u> your account?</Message>
          <ButtonContainer>
            <CancelButton onClick={() => {
              handleToggle();
              document.body.classList.toggle('modal-open');
            }} >Cancel</CancelButton>
            <ConfirmButton onClick={() => {
              handleLogout();
              document.body.classList.toggle('modal-open');
            }}>Confirm</ConfirmButton>
          </ButtonContainer>
        </ConfirmContainer>
        </ModalContainer>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default Profile