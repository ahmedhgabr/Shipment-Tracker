import React from 'react';
import styled from 'styled-components';
import logo from '../assets/Bosta.png';
import headImage from '../assets/location.png';
import SearchBar from './SearchBar';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #F3FAFB;
`;

const TopRow = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 50px;
  cursor: pointer;
`;

const LanguageButton = styled.button`
  padding: 8px 16px;
  font-size: 1em;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #009688;
  color: #fff;
  &:hover {
    background-color: #00796b;
  }
`;

const CenterContent = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const HeadImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const HeadText = styled.h1`
  margin-top: 10px;
  font-size: 2em;
  font-weight: bold;
`;


const Header = ({ headText, onLanguageChange }) => {
  return (
    <HeaderContainer>
      <TopRow>
        <LanguageButton onClick={onLanguageChange}>Change Language</LanguageButton>
        <Logo src={logo} alt="Logo" />
      </TopRow>
      <CenterContent>
        <HeadImage src={headImage} alt="Header Image" />
        <HeadText>{headText}</HeadText>
        <SearchBar />
      </CenterContent>
    </HeaderContainer>
  );
};

export default Header;
