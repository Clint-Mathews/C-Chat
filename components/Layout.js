import styled from "styled-components";
import Sidebar from "../components/Sidebar";
function Layout({ children }) {
  return (
    <Wrapper>
      <Container>
        <Sidebar />
        {children}
      </Container>
    </Wrapper>
  );
}

export default Layout;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
`;
