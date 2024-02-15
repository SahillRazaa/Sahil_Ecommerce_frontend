import React, { useState } from 'react'
import Announcement from '../Components/Announcement'
import Navbar from '../Components/Navbar'
import Products from '../Components/Products'
import {styled} from 'styled-components'
import Newsletter from '../Components/NewsLetter'
import Footer from '../Components/Footer'
import { useLocation } from 'react-router-dom'
import { maxiphone } from '../responsive'

const Container = styled.div`

`
const Title = styled.p`
    margin-top : 15px;
    font-size : 40px;
    font-weight : 500;
`
const Wrapper = styled.div`
    margin : 0px 20px;
`
const FiltersContainer = styled.div`
  display : flex;
  justify-content : space-between;
`
const Left = styled.div`
  margin-left : 50px;  
  display : flex;
  justify-content : center;
  align-items : center;
  ${maxiphone({
    flexDirection : "column",
    marginLeft : "50px"
  })}
`
const Right = styled.div`
  margin-right : 60px;
`
const Select = styled.select`
  padding : 5px 10px;
  color : white;
  font-weight : bold;
  margin-left : 15px;
  border-radius : 10px;
  background-color : purple;
  ${maxiphone({
    margin : "5px 0px"
  })}
`
const Option = styled.option`
  text-align : center;
`


const ProductList = () => {

  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("")
  const handlechange = (e)=>{
    const value = e.target.value;
    setFilters({ ...filters,
    [e.target.name] : value}) 
  };

  return (
    <Container>
      <Announcement/>
      <Navbar/>
      <Wrapper>
      <Title>{cat}</Title>
      <FiltersContainer>
        <Left>
          <Select name = "Brand" onChange={handlechange}>
            <Option selected disabled>Brand</Option>
            <Option>Apple</Option>
            <Option>Samsung</Option>
            <Option>OnePlus</Option>
            <Option>Boat</Option>
            <Option>Canon</Option>
            <Option>Nikon</Option>
          </Select>
          {cat === "All-Products" ? <Select name = "categories" onChange={handlechange}>
            <Option selected disabled>categories</Option>
            <Option>Smartphones</Option>
            <Option>Smartwatch</Option>
            <Option>Speakers</Option>
            <Option>Laptop</Option>
            <Option>Camera</Option>
          </Select> : ""}
        </Left>
        <Right>
        <Select onChange={(e)=>setSort(e.target.value)}>
            <Option selected disabled>Sort</Option>
            <Option value = "h_to_l">High to low</Option>
            <Option value  = "l_to_h" >Low to high</Option>
          </Select>
        </Right>
      </FiltersContainer>
      </Wrapper>
      <Products cat = {cat} filters = {filters} sort = {sort}/>
      <Newsletter/>
      <Footer/>
    </Container>
  )
}
export default ProductList
