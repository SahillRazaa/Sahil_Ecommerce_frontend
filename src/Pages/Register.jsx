import React, { useState } from 'react'
import {styled} from 'styled-components'
import { Link } from 'react-router-dom';
import { register } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator'
import { tablet } from '../responsive';



const Container = styled.div`
    width : 98.6vw;
    height : 100vh;
    display : flex;
    ${tablet({
        flexDirection : "column"
    })}
`
const InfoContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url("https://i.ibb.co/Yk7k5Qg/milena-trifonova-5-h5c-X1e11-I-unsplash.jpg");
    background-size: cover;
    background-repeat : no-repeat;
`;

const Wrapper = styled.div`
display : flex;
flex-direction : column;
align-items : center;
justify-content : center;
width : 30%;
background-color : white;
border-radius : 15px;
padding : 10px;
box-shadow : 0px 0px 18px 5px black;
opacity : 85%;
` 
const Title = styled.p`
    margin-top : 0px;
    font-size : 25px;
    font-weight : bold;
` 
const Form = styled.form`
display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
` 
const Input = styled.input`
    width : 40%;
    padding : 5px 10px;
    border-radius : 6px;
    margin-bottom : 10px;
    border : 2px solid #560a30;
` 
const Agreement = styled.p`
    width : 100%;
    font-size : 15px;
    text-align : center;
` 
const Button = styled.button`
    background-color : #da0486;
    width : 50%;
    text-align : center;
    padding : 8px 10px;
    border : none;
    border-radius : 10px;
    cursor : pointer;
    color : white;
    font-weight : bold;
    transition : all 0.5s ease-out;
    &:hover{
        transform : scale(1.2);
        transition : all 0.3s ease-in;
    }
` 
const Else = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    margin-top : 15px;
    
`
const Or = styled.div`
font-weight : bold;
margin-bottom : 15px;
`
const Login = styled.button`
background-color : #da0486;
padding : 8px 10px;
border : none;
border-radius : 10px;
color : white;
font-weight : bold;
cursor : pointer;
width : 100%;
text-align : center;
transition : all 0.5s ease-out;
    &:hover{
        transform : scale(1.2);
        transition : all 0.3s ease-in;
    }
`
const Center = styled.div`
  display : flex;
`
const Logo1 = styled.p`
font-size : 30px;
font-weight : 600;
color : black;
opacity : 70%;
cursor : pointer;
`
const Logo2 = styled.p`
font-size : 30px;
font-weight : 600;
color : #FF2D55;
opacity : 70%;
cursor : pointer;
`
const Logo3 = styled.p`
font-size : 30px;
font-weight : 600;
color : black;
opacity : 70%;
cursor : pointer;
`
const Error = styled.span`
    color : red;
    font-weight : bold;
    font-size : 15px;
`

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    let {isFetching, error} = useSelector(state=>state.user);
    const [alert,setAlert] = useState("");
    const handleRegister = (e)=>{
        e.preventDefault();
        if(password && password === confirmPassword){
            if(!username || !email){
            setAlert("Enter details before Register")
            setTimeout(() => {
                setAlert("");
            }, 3000);
            }
            register(dispatch, { username, email, password });
        }else if(password !== confirmPassword){
            setAlert("Password does not match..")
            setTimeout(() => {
                setAlert("");
            }, 3000);
        }
        else if(error === true){
            setAlert("Something went wrong..")
            setTimeout(() => {
                setAlert("");
            }, 3000);
        }
    }

    const validEMial = (e)=>{
        if(validator.isEmail(email)){
            handleRegister(e);
        }
        else{
            setAlert("Please enter a valid email")
            setTimeout(() => {
                setAlert("");
            }, 3000);
        }
    }


  return (
    <Container>
      <InfoContainer>
        <Wrapper>
            <Link to="/" style={{textDecoration : "none"}}>
            <Center>
            <Logo1>SA</Logo1>
            <Logo2>hi</Logo2>
            <Logo3>L.</Logo3>
            </Center>
            </Link>
            <Title>Register</Title>
            <Form>
            <Input placeholder="name" />
            <Input placeholder="last name" />
            <Input placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
            <Input placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
            <Input placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <Input placeholder="confirm password" type="password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <Agreement>
                By creating an account, I consent to the processing of my personal
                data in accordance with the <b>PRIVACY POLICY.</b>
            </Agreement>
            <Error>{`${alert}`}</Error>
            <br />
            <Button onClick={validEMial} disabled = {isFetching}>CREATE</Button>
            <Else>
                <Or>Or</Or>
                <Link to="/login">
                <Login>LOGIN</Login>
                </Link>
            </Else>
            </Form>
        </Wrapper>
      </InfoContainer>
    </Container>
  )
}

export default Register

