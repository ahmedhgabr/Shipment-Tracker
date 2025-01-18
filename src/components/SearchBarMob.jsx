import { useState } from "react";
import styled from "styled-components";
import searchIcon from "../assets/search.svg";
import closeIcon from "../assets/close_24dp.svg";
import SearchBar from "./SearchBar";

const MobileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 80%;
  high: 60%;
`;

const IconBase = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const IconMobile = styled(IconBase)`
  transform: translateY(100%);
`;

const IconMobileI = styled(IconBase)`
  /* invert color */
  filter: invert(1);
`;

const Div = styled.div`
  display: flex;
  justify-content: right;
  width: 70%;
  hight: 60%;
  @media (min-width: 768px) {
    display: none;
  }
`;

function SearchBarMob({}) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <Div>
      {isSearchVisible ? (
        <MobileContainer>
          <IconMobile src={closeIcon} alt="close Icon" onClick={toggleSearch} />
          <SearchBar />
        </MobileContainer>
      ) : (
        <IconMobileI
          src={searchIcon}
          alt="Search Icon"
          onClick={toggleSearch}
        />
      )}
    </Div>
  );
}

export default SearchBarMob;
