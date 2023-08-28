import { styled } from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const TekstContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Container>{children}</Container>;
};

export default TekstContainer;
