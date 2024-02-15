import React, { useEffect, useState } from 'react'
import Announcement from '../Components/Announcement'
import Navbar from '../Components/Navbar'
import {createGlobalStyle, styled} from 'styled-components'
import Newsletter from '../Components/NewsLetter';
import Footer from '../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../Components/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { removeProducts } from '../redux/cartRedux';
import axios from "axios";
import StripeCheckout from 'react-stripe-checkout'
import { useNavigate } from 'react-router-dom';
import { maxilap, maximobile, maxiphone, minilap, minitablet, mobile, tablet } from '../responsive';


const Container = styled.div`

`
const CartContainer = styled.div`
  margin : 30px;
`
const Heading = styled.div`
  display : flex;
  align-items : center;
`

const Carts = styled.div`
  display : flex;
  overflow-y : ${props=>props.views};
  opacity : ${props=>props.display};
  flex-direction : column;
  align-items : center;
  ${mobile({
    marginLeft : "20px"
  })}
`
const PopScrollableContent = styled.div`
  overflow: auto;
  display : flex;
  align-items : center;
  flex-direction : column;
  ${maxilap({
    alignItems : "none",
    padding : "0px 30px"
  })}

`;
const Carts1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 78%;
  height: 80%;
  overflow-y: auto;
  margin-left: 10%;
  top: 100px;
  position: fixed;
  box-shadow: 0px 0px 10px 2px purple;
  border-radius: 20px;
  background-color: #E5E5E6;
  ${minitablet({
    marginLeft : "5%"
  })}
  ${maximobile({
    width : "90%",
    marginLeft : "-10px"
  })}
`;


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

const ProductContainer = styled.div`
width : 70%;
${maxiphone({
  width : "100%",
})}
${mobile({
  width : "120%",
})}
`
const PopProductContainer = styled.div`
width : 70%;
${maxilap({
  width : "100%"
})}
${mobile({
  width : "90%"
})}
`
const Product1 = styled.div`
box-shadow : 0px 0px 10px 0px purple;
width : 100%;
border-radius : 15px;
display : flex;
align-items : center;
${maxilap({
  flexDirection : "column",
  height : "580px",
})}
`
const PopProduct1 = styled.div`
box-shadow : 0px 0px 10px 0px purple;
width : 100%;
border-radius : 15px;
display : flex;
align-items : center;

${maxilap({
  flexDirection : "column",
  height : "550px",
  width : "100%",
})}
${maxiphone({
  fontSize : "11px",
})}
${mobile({
  fontSize : "10px",
  padding : "0px 0px"
})}
`

const ImageContainer = styled.div`
margin-right : 60px;
cursor : pointer;
${maxilap({
 marginRight : "0px",
 marginTop : "40px"
})}
`
const Image = styled.img`
  width : 230px;
  heigt : 230px;
  border-radius : 15px;
`
const InfoContainer = styled.div`
padding : 30px;
${mobile({
  padding : "0px 60px"
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
const CheckOutBox = styled.div`
background-color : #e5e5e5;
justify-content : center;
display : flex;
align-items : center;
flex-direction : column;
box-shadow : 0px 0px 10px 0px black;
border-radius : 15px;
width  : 500px;
margin-top : 20px;
padding  : 20px 0px;
${maxiphone({
  width : "350px"
})}
${mobile({
  width : "250px"
})}
`
const PopCheckOutBox = styled.div`
background-color : #e5e5e5;
justify-content : center;
display : flex;
align-items : center;
flex-direction : column;
box-shadow : 0px 0px 10px 0px black;
border-radius : 15px;
width  : 50%;
margin-top : 20px;
margin-bottom : 30px;
padding  : 20px 0px;
font-size : 30px;
${maxilap({
  width : "80%"
})}
${maxiphone({
  fontSize : "20px"
})}
${maximobile({
  width : "100%"
})}
`
const Heading1 = styled.p`
  text-align : center;
  font-size : 30px;
  font-weight : bold;
`
const Informations = styled.div`

`
const Type = styled.div`
  display : flex;
  line-height : 5px;
`
const Value = styled.p`

`
const Key = styled.p`
  margin-right : 20px;
  font-weight : bold;
`
const Total = styled.div`
  display : flex;
  background-color : white;
  width : 100%;
  margin-bottom : 10px;
  align-item : center;
  justify-content : center;
  ${tablet({
    flexDirection : "column",
    paddingBottom : "10px"
  })}
  ${mobile({
    flexDirection : "column",
    paddingBottom : "10px",
  })}
  
`
const Totalamount = styled.h2`
  font-weight : bold;
  margin-right : 20px;
  margin-left : 20px;
  text-align : center;
`
const AmountValue = styled.div`
font-size : 25px;
justify-content : center;
display : flex;
align-items : center;
`
const CheckOutButton = styled.button`
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
  }

`
const Tag = styled.p`
display : flex;
justify-content : center;
  align-items : center;
  margin-right : 10px;
  font-weight : bold;
`
const MoreButton = styled.div`
  display : flex;
  flex-direction : column;
`

const ViewCart = styled.button`
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

const DeleteCart = styled.button`
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

const Empty = styled.div`
  font-weight : bold;
  font-size : 20px;
  color : red;
`
const Head1 = styled.p`
font-size : 34px;
font-weight : bold;
`
const Head2 = styled.p`
font-size : 20px;
width : 60%;
margin-left : 20px;
`

const FinalCart = styled.h1`
  display : flex;
  font-size : 40px;
  text-align : center;
`
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

const CloseButton = styled.div`
margin-bottom : 200px;
margin-left: 90px;
padding : 10px;
cursor : pointer;
${maxilap({
  marginLeft : "0px",
})}
`

const Cart = () => {
  const cart = useSelector(state=>state.cart);
  const user = useSelector(state=>state.user);
  const [view, setView] = useState(false);
  const [alert,setAlert] = useState(null);  
  const [display, setDisplay] = useState("100%");
  const [cartProducts, setCartProducts] = useState([]);
  const [deleteView, setDeleteView] = useState(false);

  const showAlert = (message, text)=>{
    setAlert({
      msg : message,
      txt : text
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  const cart_send = async (user, total, quantity, product, Token)=>{
    try{
      await axios.post("http://localhost:5000/api/carts/create",{user,total,quantity,product},{headers:{token:"Bearer "+Token}});
      showAlert("Cart is added, Now you can proceed for payment.","Success! : ");
    }catch(err)
    {
      showAlert("You already have existence cart, remove it before adding new","ERROR! : ");
    }
  }

  const handleOnClick = ()=>{
    if(cart.quantity === 0){
      showAlert("Your cart is empty, add product before checkout.","Alert!!")
    }
    else{
      cart_send(user.currentUser._id, cart.total, cart.quantity ,cart.products, user.currentUser.accessToken)
    }
  }

  const dispatch = useDispatch();

  const handleRemove = (product)=>{
    dispatch(removeProducts(product));
  }

  const delete_cart = async(user, Token)=>{
    try{
      await axios.delete("http://localhost:5000/api/carts/deleteCart",{headers:{token:"Bearer "+Token},data : {user}})
      showAlert("Cart is deleted, Now you can add new cart.","Success! : ");
    }catch(err)
    {
      showAlert("Server problem","ERROR! : ");
    }
  }
  const find_cart = async(user, Token)=>{
    try{
      const res = await axios.get("http://localhost:5000/api/carts/findCart",{headers:{token:"Bearer "+Token}, params : {user : user}})
      setCartProducts(res.data);
    }catch(err)
    {
      console.log(err);
    }
  }
  const deleteProduct = ()=>{
    if(cartProducts.length !== 0){
      delete_cart(user.currentUser._id, user.currentUser.accessToken);
    }
    else{
      showAlert("Your cart is already empty.","ERROR! : ");
    }
  }

  const createOrder = async (user, total, quantity, product, Token)=>{
    try{
      await axios.post("http://localhost:5000/api/orders/create",{user,total,quantity,product},{headers:{token:"Bearer "+Token}})
    }catch(err)
    {
      console.log(err)
    }
  }

  const handleDelete = ()=>{
    if(deleteView){
      deleteProduct();
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
  find_cart(user.currentUser._id, user.currentUser.accessToken);  
  const handleView = ()=>{
    if(cartProducts.length === 0){
      showAlert("Your cart is empty, add to view.","ERROR! : ");
    }
    else{
      setView(!view);
      if(display === "100%"){
        setDisplay("20%");
      }
      else{
        setDisplay("100%");
      }
    }
    if(cartProducts.length !== 0)
      document.body.classList.remove('modal-open');
    else
      document.body.classList.add('modal-open');
  }

  const [stripeToken, setStripeToken] = useState(null);
  const history = useNavigate();

  const handleToken = (token) => {
    setStripeToken(token);
  };
  
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/stripes/checkout", {
          tokenId: stripeToken.id,
          amount: cartProducts[0].total*100,
        });
        history("/success", {
          stripeData: res.data,
        });
        createOrder(user.currentUser._id, cartProducts[0].total, cartProducts[0].quantity, cartProducts[0].Products, user.currentUser.accessToken);
        delete_cart(user.currentUser._id, user.currentUser.accessToken);
      } catch(err){console.log(err)};
    };
    if(stripeToken) {
      makeRequest();
    }
  }, [stripeToken, history, user]);
  return (
    <Container>
      <Announcement/>
      <Navbar/>
      <Alert alert = {alert}/>
      <CartContainer>
        <Heading>
          <Head1>Shopping Cart</Head1>
          <Head2><b style={{color : "red"}}>NOTE</b> : Make sure to click <b style={{color : "red",textDecoration : "underline"}}>"ADD TO FINAL CART"</b> before logout to save the cart.</Head2>
        </Heading>
        <Carts display = {display}>
        {(cart.quantity === 0) && <Empty>Your cart is empty, Add something to show....</Empty>}
        <ProductContainer>
          {cart.products.map(product=>(
            <>
            <Product1 key={product.id}>
            <ImageContainer>
              <Image src={product.image}/>
            </ImageContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <Price>Rs.{ (product.price) - product.price * 0.15}</Price>
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
            <CloseButton>
            <CloseIcon onClick={()=>handleRemove(product)}/></CloseButton>
          </Product1>
          <br />
          </>
          ))}
          
        </ProductContainer>
        <CheckOutBox>
          <Heading1>Check-Out-Box</Heading1>
          <Informations>
            <Type>
              <Key>Subtotal:</Key>
              <Value>Rs.{cart.total}</Value>
            </Type>
            <Type>
             <Key>Shipping:</Key>
              <Value>Rs.{cart.quantity * 40}</Value>
            </Type>
            <Type>
              <Key>Discount:</Key>
              <Value>Rs.-{cart.quantity * 40}</Value>
            </Type>
            <Type>
              <Key>Quantity:</Key>
              <Value>{cart.quantity}</Value>
            </Type>
          </Informations>
          <Total>
            <Totalamount>Total Amount:</Totalamount>
            <AmountValue>Rs.{cart.total}</AmountValue>
          </Total>
          <CheckOutButton onClick={handleOnClick}>ADD TO FINAL CART</CheckOutButton>
        <MoreButton>
          <ViewCart onClick={() => {
              handleView();
              document.body.classList.toggle('modal-open');
            }}>VIEW CART AND PAY</ViewCart>
          <DeleteCart onClick={() => {
              handleToggle();
              document.body.classList.toggle('modal-open');
            }}>DELETE PREVIOUS CART ITEMS</DeleteCart>
        </MoreButton>
        </CheckOutBox>
        </Carts>
        {cartProducts.map((cartItem) => ( 
          <div key={cartItem._id}>
          <GlobalStyle />
        <ModalContainer visible={view}>
        {(view || cartProducts.length > 0) && <Carts1>
        <PopScrollableContent>
        <FinalCart>Your Cart</FinalCart>
        <PopProductContainer>
          <br />
        <CloseIcon
            onClick={() => {
              handleView();
              document.body.classList.toggle('modal-open');
            }}
            style={{
              marginLeft: '95%',
              marginBottom : '5%',
              padding: '10px',
              cursor: 'pointer',
              backgroundColor: 'black',
              borderRadius: '50%',
              color: 'white',
            }}
          />
          
          {cartItem.Products.map((product)=>(
            <>
            <PopProduct1 key={product._id}>
            <ImageContainer>
              <Image src={product.image} style={{width : "270px" , height : "280px"}}/>
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
          </PopProduct1>
          <br />
          </>
          ))}
        </PopProductContainer>
        <PopCheckOutBox>
          <Heading1>Check-Out-Box</Heading1>
          <Informations>
            <Type>
              <Key>Subtotal:</Key>
              <Value>Rs.{cartItem.total}</Value>
            </Type>
            <Type>
             <Key>Shipping:</Key>
              <Value>Rs.{cartItem.quantity * 40}</Value>
            </Type>
            <Type>
              <Key>Discount:</Key>
              <Value>Rs.-{cartItem.quantity * 40}</Value>
            </Type>
            <Type>
              <Key>Quantity:</Key>
              <Value>{cartItem.quantity}</Value>
            </Type>
          </Informations>
          <Total>
            <Totalamount>Total Amount:</Totalamount>
            <AmountValue>Rs.{cartItem.total}</AmountValue>
          </Total>
          <StripeCheckout
              name="Sahil Shop"
              billingAddress
              shippingAddress
              description={`Your total is ${cartItem.total}`}
              amount={0}
              token={handleToken}
              stripeKey="pk_test_51NuTGVSJOmprMEItlIP8Ee7dsvECMwwlKh2PBFlG2vwQC0pZwzDVbuR3KnkBN6zNnhoJN8JwYf7Wdx7tt3jv0Ujw00uqHJA1Gi"
            >
              <CheckOutButton>PAY NOW</CheckOutButton>
            </StripeCheckout>
          
        </PopCheckOutBox>
          </PopScrollableContent>
          
        </Carts1>}
   
        </ModalContainer>
             </div>
             ))}
        <GlobalStyle />
        <ModalContainer visible={deleteView}>
        <ConfirmContainer>
          <Message>Are you sure? You want to <u style={{color : "red"}}>DELETE</u> your cart?</Message>
          <ButtonContainer>
            <CancelButton onClick={() => {
              handleToggle();
              document.body.classList.toggle('modal-open');
            }} >Cancel</CancelButton>
            <ConfirmButton onClick={() => {
              handleDelete();
              document.body.classList.toggle('modal-open');
            }}>Confirm</ConfirmButton>
          </ButtonContainer>
        </ConfirmContainer>
        </ModalContainer>
      </CartContainer>
      <br/><br/>
      <Newsletter/>
      <Footer/>
    </Container>
  )
}

export default Cart
