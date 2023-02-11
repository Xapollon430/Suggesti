import styled from "styled-components";

export const LandingWrapper = styled.div`
  display: grid;
  height: 100vh;
  width: 60vw;
  margin: 0px auto;
  place-items: center;
`;

export const SecondWrapper = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  margin: 0px auto;
  place-items: center;
  grid-template-columns: 1fr 1fr;
`;

export const ChartWrapper = styled.div`
  height: 200px;
`;

export const ChartsWrapper = styled.div`
  height: 300px;
  width: 600px;
`;

export const Arrow = styled.img`
  margin: 0px auto;
  margin-top: 70px;
  height: 60px;
`;

export const FormWrapper = styled.div`
  width: 400px;
  border-radius: 10px;
  background-color: white;
  height: 400px;
  border: 2px solid grey;
  padding-top: 50px;
`;

export const CheckWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  margin-bottom: 20px;
`;

export const TextBox = styled.div`
  display: grid;

  margin: 0px 10px 10px 10px;
`;
