import React from "react";
import styled from "styled-components";
import logo from "../assets/Bosta_ar.png";
import headImage from "../assets/location.png";
import SearchBar from "./SearchBar";
// localisation library
import { useTranslation, Trans } from "react-i18next";
const lngs = {
  en: { nativeName: "English" },
  ar: { nativeName: "عربي" },
};

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f3fafb;
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
  const { t, i18n } = useTranslation();
  return (
    <HeaderContainer>
      <TopRow>
        {Object.keys(lngs).map((lng) => (
          <button
            key={lng}
            style={{
              fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
            }}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </button>
        ))}
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
