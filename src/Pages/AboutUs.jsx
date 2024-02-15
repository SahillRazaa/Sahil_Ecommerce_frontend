import React from 'react'
import {styled} from 'styled-components'
import Announcement from '../Components/Announcement'
import Navbar from '../Components/Navbar'
import Newsletter from '../Components/NewsLetter'
import Footer from '../Components/Footer'
import { mobile } from '../responsive'

const Container = styled.div`

`
const Wrapper = styled.div`
  margin : 30px;
`
const Title = styled.p`
  font-size : 30px;
  font-weight : bold;
  margin-bottom : 0px;
  display : flex;
  justify-content : center;
  opacity : 80%;
`
const About = styled.p`
  width : 60%;
  text-align : center;
  font-size : 20px;
  font-weight : 500;
  color : purple;
`
const AboutContainer = styled.div`
display : flex;
justify-content : center;
`
const Comasleft = styled.h2`
margin-top : 0px;
font-size : 50px;
color : purple;
`
const Comasright = styled.h2`

font-size : 50px;
color : purple;
margin-top : 70px;
`
const Imagecontainer = styled.div`
  display : flex;
  flex-wrap : wrap;
`
const Image1 = styled.img`
width : 33.33%;
height : 33.33%;
margin:2px;
flex:1;
`
const Image2 = styled.img`
flex : 1;
margin:2px;
width : 33.33%;
`
const Image3 = styled.img`
flex : 1;
width : 33.33%;
height : 33.33%;
margin:2px;
`
const SpecialContainer = styled.div`
display : flex;
justify-content : center;
flex-direction : column;
align-items : center;
flex-wrap : wrap;
`
const Type = styled.div`
  display  : flex;
  flex-direction : column;
`
const Key = styled.div`
  width : 100px;
  height : 80px;
  margin-right : 100px;
  font-weight : bold;
  font-size : 17px;
  border-bottom : 2px solid black;
  color: purple;
`
const Value = styled.div`
width : 400px;
font-weight : 400;
color : gray;
height : 100px;
${mobile({
  width: "250px"
})}
`

const AboutUs = () => {
  return (
    <Container>
    <Announcement/>
    <Navbar/>
    <Wrapper>
      <Title>ABOUT US</Title>
      <hr style={{width : "20%", height : "3px", backgroundColor : "black", opacity : "50%"}}/>
      <br/>
      <AboutContainer>
      <Comasleft>"</Comasleft>
      <About>Welcome to <u>SAhiL</u>, your premier ecommerce platform dedicated exclusively to electronic devices. We pride ourselves on being your one-stop shop for all things tech, providing you with a vast array of electronic gadgets, accessories, and solutions.</About>
      <Comasright>"</Comasright>
      </AboutContainer>
      <Title>OUR VISION</Title>
      <hr style={{width : "20%", height : "3px", backgroundColor : "black", opacity : "50%"}}/>
      <br/>
      <AboutContainer>
      <Comasleft>"</Comasleft>
      <About>Our vision is to be your go-to electronic marketplace, offering a vast and diverse selection of electronic products from trusted brands and sellers. We aim to connect tech enthusiasts, professionals, and everyday consumers with the latest and greatest electronic devices, all in one place.</About>
      <Comasright>"</Comasright>
      </AboutContainer>
      <Imagecontainer>
        <Image1 src="https://i.ibb.co/Fb0h9Qv/mario-gogh-VBLHICVh-l-I-unsplash.jpg"/>
        <Image2 src="https://i.ibb.co/c1Lf5K4/ant-rozetsky-HXOll-TSwrp-M-unsplash.jpg"/>
        <Image3 src="https://i.ibb.co/x88FMtr/campaign-creators-g-Msn-Xq-ILjp4-unsplash.jpg"/>
      </Imagecontainer>
      <Title>WHY SAhiL??</Title>
      <hr style={{width : "20%", height : "3px", backgroundColor : "black", opacity : "50%"}}/>
      <br/>
      <SpecialContainer>
        <Type>
          <Key>Vast Product Selection</Key>
          <Value>Explore a wide range of electronic devices, accessories, and more, all carefully curated to meet your diverse needs.</Value>
        </Type>
        <Type>
          <Key>Trusted Sellers</Key>
          <Value>We partner with reputable sellers and vendors to ensure that every purchase you make on our platform is a reliable one.</Value>
        </Type>
        <Type>
          <Key>Secure Transactions</Key>
          <Value>We prioritize your online security and offer secure payment options to protect your financial information.</Value>
        </Type>
        <Type>
          <Key>User-Friendly Interface</Key>
          <Value>Our intuitive website design and user-friendly features make it easy for you to find and purchase the electronic products you desire.</Value>
        </Type>
        <Type>
          <Key>24/7 Customer Support</Key>
          <Value>Have questions or need assistance? Our dedicated customer support team is available round the clock to assist you.</Value>
        </Type>
      </SpecialContainer>
    </Wrapper>
    <Newsletter/>
    <Footer/>
    </Container>
  )
}
export default AboutUs
