import {keyframes, styled} from "styled-components"
import React, { useEffect, useState } from 'react'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import axios from "axios";
import { Link } from "react-router-dom";
import {maxiphone, minilap, minitablet, mobile, tablet} from '../responsive'

const AminateSlider = keyframes`
    from{
        opacity : 0;
    }
    to{
        opacity : 1;
    }
`

const AminateImage = keyframes`
    from{
        width : 0%;
    }
    to{
        width : 43%;
    }
`

const Container = styled.div`
    width : 98.8vw;
    height : auto;
    position : relative;
    display:flex;
    overflow : hidden;
    ${minilap({
        height : "80vh"
    })}
    ${mobile({
        height : "90vh"
    })}
    animation : ${AminateSlider} 3s ease-in-out;
`
const Arrow = styled.div`
width : 50px;
height : 50px;
background-color : black;
border-radius : 50%;
display : flex;
align-items : center;
justify-content : center;
position : absolute;
top : 0;
opacity : 80%;
bottom : 0;
left : ${props => props.direction === "left" && "15px"};
right : ${props => props.direction === "right" && "15px"};
margin : auto;
cursor : pointer;
z-index = 2;
${mobile({
    marginTop : "100px"
 })}
`
const Wrapper = styled.div`
    height : 100%;
    display : flex;
    transition : all 1.5s ease;
    transform : translateX(${props=>props.slideIndex * -100}vw);
`
const Slide = styled.div`
    display : flex;
    align-items : center;
    width : 100vw;
    height : 100vh;
    background-color : ${props => props.bg};
    ${tablet({
        flexDirection : "column"
    })}
`
const ImageContainer = styled.div`
    margin-left : 80px;
    ${tablet({
        marginTop : "20px",
        marginLeft : "0px",
        display : "flex",
        justifyContent : "center"
    })}
    ${minitablet({
       marginTop : "20px",
       marginLeft : "0px",
       display :"flex",
       justifyContent : "center"
    })}
    ${mobile({
        marginTop : "20px"
     })}
     animation : ${AminateImage} 1s ease-in-out;
`
const Image = styled.img`
    width : 70%;
    border-radius : 20px;
    box-shadow : 0px 0px 15px 5px black;
`
const InfoConatainer = styled.div`
    
    margin-bottom : 200px;
`
const Sales = styled.h1`
    font-size : 50px;
    color : white;
    line-height : 60px;
    margin-right : 30px;
   
    ${tablet({
        marginLeft : "30px"
    })}
    ${minitablet({
        fontSize : "40px",
        lineHeight : "30px",
        textAlign : "center",
        marginLeft : "20px"
    })}
    ${maxiphone({
        lineHeight : "50px",
    })}
    ${mobile({
        fontSize : "30px",
        lineHeight : "30px",
        textAlign : "center"
    })}
`
const Description = styled.p`
    width : 65%;
    color : white;
    ${tablet({
        display : "none"
    })}
`
const Offer = styled.h2`
    color : white;
    width : 60%;
    margin-bottom : 40px;
    ${tablet({
        fontSize :"20px",
        textAlign : "center",
        marginLeft : "120px"
    })}
    ${minitablet({
        fontSize :"20px",
        textAlign : "center",
        marginLeft : "120px"
    })}
    ${maxiphone({
        fontSize :"20px",
        textAlign : "center",
        marginLeft : "85px"
    })}
    ${mobile({
        textAlign : "center",
        marginLeft : "60px"
    })}
    
`
const Button = styled.div`

${tablet({
    display : "flex",
    justifyContent : "center"
})}
${minitablet({
    fontSize :"20px",
    textAlign : "center",
})}
${mobile({
    textAlign : "center",
})}
`
const ButtonBuy = styled.button`
    border : none;
    padding : 15px;
    margin : 0px 20px;
    border-radius : 20px;
    background-color : black;
    opacity : 80%;
    font-weight : bold;
    color : white;
    cursor : pointer;
    transition : background-color 0.25s ease-out;
    &:hover{
        transform : scale(1.2);
        transition : transform 0.25s ease-in;
        background-color : transparent;
        border : 2px solid white;
    }
`


const Slider = () => {

    const [product, setProducts] = useState([]);
    const [color, setColor] = useState("teal");

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

    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = (direction)=> {
        if(direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        }
        else{
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
        if(slideIndex === 2){
            setColor("teal");
        }
        else if(slideIndex === 1){
            setColor("rgb(200, 181, 34)");
        }
        else{
            setColor("#4400a5d9");
        }
    }
    

  return (
    <Container>
        <Arrow style={{zIndex : "2"}} direction = "left" onClick={()=>handleClick("left")}>
            <ArrowLeftIcon style={{color:"white", fontSize:"40px"}}/>
        </Arrow>
        <Wrapper slideIndex = {slideIndex}>
            {product.slice(15,18).map(items=>(
            <Slide bg = {color} key={items.id}>
            <ImageContainer>
                <Image src={items.image}/>
            </ImageContainer>
            <InfoConatainer>
                <Sales>{items.title}</Sales>
                <Description>{items.description}</Description>
                <Offer>15% OFF - Rs.{items.price - (items.price*0.15)}/- Only.</Offer>
                <Button>
                    <Link to={`/product/${items._id}`}>
                    <ButtonBuy>View Now</ButtonBuy>
                    </Link>
                </Button>
            </InfoConatainer>
            </Slide>
            ))}
        </Wrapper>
        <Arrow direction = "right" onClick={()=>handleClick("right")}>
            <ArrowRightIcon style={{color:"white", fontSize:"40px"}}/>
        </Arrow>
    </Container>
  )
}

export default Slider
