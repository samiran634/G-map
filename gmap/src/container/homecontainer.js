 
 
 
import styled from "styled-components";
import LandingText from '../components/landingtext';
const Box = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, silver, gray);
`;
const HomeContainer = () => {
   
    return (
        <LandingText props={Box} />
    );
 
}

export default HomeContainer;
