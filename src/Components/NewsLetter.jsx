import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'; // Correct the import
import emailjs from 'emailjs-com';
import validator from 'validator';
import {mobile} from '../responsive'

const Container = styled.div`
  height: 60vh;
  background-color: #4a004a;
  display: flex;
  opacity: 70%;
  align-items: center;
  color: white;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({
    fontSize : "50px"
  })}
`;

const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({
    textAlign : "center",
    width : "80%"
  })}
`;

const InputContainer = styled.div`
  width: 45%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  ${mobile({
    justifyContent : "center"
  })}
`;

const Input = styled.input`
  flex: 8;
  padding-left: 20px;
  border: 1px solid black;
  
`;

const Button = styled.button`
  cursor: pointer;
  flex: 0.7;
  border: none;
  background-color: purple;
  color: white;
  border: 2px solid white;
  transition: all 0.1s ease-out;
  &:hover {
    background-color: white;
    color: purple;
    border: none;
    transition: all 0.1s ease-in;
  }
`;

const Error = styled.span`
  color: #ccf281;
  font-weight: bold;
  font-size: 25px;
`;

const Newsletter = () => {
  const emailInputRef = useRef(null);
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState('');

  emailjs.init('9se214kBr0ctDiO14');

  const validEmail = () => {
    if (validator.isEmail(email)) {
      sendEmail();
    } else {
      setAlert('ERROR!, Not valid');
      setTimeout(() => {
        setAlert('');
      }, 2000);
    }
  };

  const sendEmail = () => {
    emailjs
      .send('service_t153zy7', 'template_w2u24la', {
        customer_email: email,
      })
      .then(
        () => {
          setAlert('Success!, Your message has been forwarded to the team');
          setEmail('');
          emailInputRef.current.value = '';
          setTimeout(() => {
          setAlert('');
        }, 2000);
        },
        () => {
          setAlert('ERROR!, Server problem');
          setTimeout(() => {
            setAlert('');
          }, 3000);
        }
      );
  };

  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products</Description>
      <Error>{`${alert}`}</Error>
      <br />
      <InputContainer>
        <Input ref={emailInputRef} placeholder="Your email" onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={validEmail}>
          <SendOutlinedIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
