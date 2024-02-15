import React, { useEffect, useState } from 'react'
import {styled} from 'styled-components'
import Announcement from '../Components/Announcement'
import Navbar from '../Components/Navbar'
import Newsletter from '../Components/NewsLetter'
import Footer from '../Components/Footer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { maxiphone, minilap, mobile } from '../responsive'


const Container = styled.div`

`
const Title = styled.div`
margin : 10px;
display : flex;
align-items : center;
`
const One = styled.h1`

`
const Two = styled.p`
    margin-left : 270px;
    color : purple;
    font-weight : bold;
    ${maxiphone({
        display : "none"
    })}
`
const MainBody = styled.div`
background-color : black;
`
const Wrapper = styled.div`

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
const ImageConatinerUpper = styled.div`
   margin-right : 30px;
   ${minilap({
        marginRight : "0px",
    })}
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
const Deal = styled.p`
background-color: red;
color : white;
width : 20%;
text-align : center;
margin-top : 20px;
padding : 5px 10px;
font-weight : bold;
border-radius : 6px;
`
const OldPrice = styled.div`
display : flex;
margin : 0px;
line-height : 0px;
`
const Mrp = styled.p`
color : white;
`
const Amount = styled.p`
color : white;
text-decoration : line-through;
`
const NewPrice = styled.p`
color: white;
font-size : 30px;
line-height : 0px;
margin-right : 100px;
font-weight : 500;
`
const New = styled.div`
    display : flex;
    align-items : center;
    ${maxiphone({
       flexDirection : "column",
       justifyContent : "center"
    })}
`
const View = styled.button`
color : black;
box-shadow : 0px 0px 10px 2px white;
padding : 4px 20px;
border : none;
border-radius : 5px;
font-size : 17px;
font-weight : bold;
tansition : all 0.25s ease-out;
&:hover{
    transform : scale(1.1);
    tansition : all 1s ease-in;
    opacity : 80%;
}
${maxiphone({
    marginRight : "70px"
 })}
`
const Image = styled.img`
    border-radius : 20px;
    margin-left : 100px;
    width : 400px;  
    ${minilap({
        marginLeft : "0px",
        marginRight : "50px",
    })}
    ${maxiphone({
        width : "300px"
    })}
    ${mobile({
        width : "200px"
    })}
`

const BestDeal = () => {

    const [product, setProducts] = useState([]);

    useEffect(() => {
      const getProducts = async ()=>{
        try{
            const res = await axios.get("http://localhost:5000/api/products");
            setProducts(res.data);
        }catch(err)
        {
            console.log(err);
        }
      };
      getProducts();
    }, [])
    

  return (
    <Container>
    <Announcement/>
    <Navbar/>
    <Wrapper>
    <Title>
        <One>BEST DEALS</One>
        <Two>"All the Offers are valid only for next 10days only, Shop Now"</Two>
    </Title>
    <MainBody>
    {product.slice(4,9).map(item=>(
        <Upper key={item.id}>
        <InfoConatinerUpper>
            <TitleUpper>{item.title}</TitleUpper>
            <DescUpper>{item.description}</DescUpper>
            <Deal>Deal - 15%OFF</Deal>
            <OldPrice>
            <Mrp>M.R.P:</Mrp>
            <Amount>Rs.{item.price}</Amount>
            </OldPrice>
            <New>
            <NewPrice>Rs.{item.price - (item.price * 0.15)} </NewPrice>
            <Link to={`/product/${item._id}`}>
            <View>VIEW</View>
            </Link>
            </New>
        </InfoConatinerUpper>
        <ImageConatinerUpper>
            <Image src={item.image}/>
        </ImageConatinerUpper>
      </Upper>
        ))}
    </MainBody>
    </Wrapper>
    <br />
    <Newsletter/>
    <Footer/>
    </Container>
  )
}

export default BestDeal
