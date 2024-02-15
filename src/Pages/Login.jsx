import React, { useState } from 'react'
import {styled} from 'styled-components'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../redux/apiCalls';
import { maxiphone, minilap, tablet } from '../responsive';

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
width : 20%;
background-color : white;
border-radius : 15px;
padding : 20px 10px;
box-shadow : 0px 0px 18px 5px black;
opacity : 85%;
${minilap({
    width : "30%"
})}
${maxiphone({
    width : "50%"
})}
` 
const Title = styled.p`
    margin-top : 0px;
    font-size : 25px;
    font-weight : bold;
` 
const Form = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
` 
const Input = styled.input`
    width : 60%;
    padding : 5px 10px;
    border-radius : 6px;
    margin-bottom : 10px;
    border : 2px solid #560a30;
` 
const Agreement = styled.p`
    width : 90%;
    font-size : 15px;
    text-align : center;
    cursor : pointer;
` 
const Button = styled.button`
    background-color : #da0486;
    padding : 8px 10px;
    border : none;
    border-radius : 10px;
    color : white;
    font-weight : bold;
    width : 70%;
    cursor : pointer;
    text-align : center;
    transition : all 0.5s ease-out;
    &:hover{
        transform : scale(1.2);
        transition : all 0.3s ease-in;
    }
    &:disabled{
        cursor : not-allowed;
    }
` 
const Else = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    margin :15px 0px;
    
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
    color : ${(props) => props.color};
`

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [color, setColor] = useState("");
    const dispatch = useDispatch();
    const {isFetching, error,currentUser} = useSelector(state=>state.user);
    const [alert,setAlert] = useState("");

    const handleLogin = (e)=>{
        e.preventDefault();
        if(currentUser === null){
            if(!username || !password){
                setColor("red");
                setAlert("Please Enter Everything..");
                setTimeout(() => {
                    setAlert("");
                }, 3000);
            }
            else{
                login(dispatch, { username, password });
            }
        }
        if(error){
            setColor("red");
            setAlert("Something went wrong..")
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
            <Title>Login</Title>
            <Form>
            <Input placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
            <Input placeholder="password" type="password"  onChange={(e)=>setPassword(e.target.value)}/>
            <Error color={color} style={{width  : "70%"}}>{`${alert}`}</Error>
            <Agreement>
                Forget password?
            </Agreement>
            <Button onClick={handleLogin} disabled = {isFetching} >LOGIN</Button>
            <Else>
                <Or>Or</Or>
                <Link to="/register">
                <Login>REGISTER</Login>
                </Link>
            </Else>
            </Form>
        </Wrapper>
      </InfoContainer>
    </Container>
  )
}

export default LoginPage
