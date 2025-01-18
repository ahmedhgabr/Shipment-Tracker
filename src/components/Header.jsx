import React from "react";
import styled from "styled-components";
import logo from "../assets/Bosta_ar.png";
import headImage from "../assets/location1.png";
import SearchBar from "./SearchBar";
import SearchBarMob from "./SearchBarMob";
// localisation library
import { useTranslation, Trans } from "react-i18next";
const lngs = {
  en: { nativeName: "English" },
  ar: { nativeName: "عربي" },
};

const HeaderContainer = styled.header`
  direction: ltr;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f3fafb;

  @media (max-width: 768px) {
    direction: rtl;
    padding: 10px;
  }
`;

const TopRow = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 30px;
  cursor: pointer;
`;

const CenterContent = styled.div`
  text-align: center;
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const HeadImage = styled.img`
  width: 88px;
  height: 127px;
`;

const HeadText = styled.h1`
  font-family: "Cairo", serif;
  font-size: 40px;
  font-weight: 700;
  line-height: 56px;
  letter-spacing: -0.02em;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  gap: 0px;
  opacity: 0px;
`;

const SubHeadText = styled.h2`
  font-family: "Cairo", serif;
  color: #111619;
  font-size: 25px;
  font-weight: 400;
  line-height: 56px;
  letter-spacing: -0.02em;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  @media (min-width: 768px) {
    display: none;
  }
`;

const LanguageSelect = styled.select`
  background: none;
  border: none;
  width: 80px;
  font-weight: bold;
  cursor: pointer;
  appearance: none;
  padding-left: 20px;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNEw4IDExTDE1IDQiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K);
  background-repeat: no-repeat;
  background-position: left 5px center;
  background-size: 10px 10px;
`;

const LanguageOption = styled.option`
  font-weight: normal;
`;

const SearchBarContainer = styled.div`
  position: absolute;
  top: 100%; /* Adjust this value to move the search bar down */
  width: 40%;

  @media (max-width: 768px) {
    /* not rendering the search bar on mobile */
    display: none;
  }
`;

const Header = ({ headText }) => {
  const { t, i18n } = useTranslation();
  return (
    <HeaderContainer>
      <TopRow>
        <LanguageSelect
          value={i18n.resolvedLanguage}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          {Object.keys(lngs).map((lng) => (
            <LanguageOption key={lng} value={lng}>
              {lngs[lng].nativeName}
            </LanguageOption>
          ))}
        </LanguageSelect>
        <SearchBarMob />
        <Logo src={logo} alt="Logo" />
      </TopRow>
      <CenterContent>
        <HeadImage src={headImage} alt="Header Image" />
        <HeadText>{headText}</HeadText>
        <SubHeadText>{t('subHead')}</SubHeadText>
        <SearchBarContainer>
          <SearchBar />
        </SearchBarContainer>
      </CenterContent>
    </HeaderContainer>
  );
};

export default Header;
