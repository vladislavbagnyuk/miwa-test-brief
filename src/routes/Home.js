import styled from "styled-components";

import NavButton from "../components/NavButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Home = () => (
  <Container>
    <div>
      <h1>Star Wars</h1>
      <NavButton link="/vehicles">Vehicles</NavButton>
      <NavButton link="/characters">Characters</NavButton>
    </div>
  </Container>
);

export default Home;
