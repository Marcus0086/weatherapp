import styled, { createGlobalStyle } from "styled-components";
import React from "react";
import Head from 'next/head';
import Main from './components/newmain';
const Index = ({ data }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Weather APP</title>
      </Head>
      <GlobalStyles />
      <Container>
        <Main data={data} id={'Main'} />
      </Container>
    </React.Fragment>
  )
}

export default Index;
const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    text-size-adjust: 100%;
    scroll-behavior: smooth;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    user-select: none;
    background-color:#e5f0f1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    ::-webkit-scrollbar {
      width: .5em;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #d6dee1;;
      border-radius: .5rem;
      border: 6px solid transparent;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: #a8bbbf;
    }
  }

  a {
    color: inherit;
  }

  * {
    box-sizing: border-box;
  }

`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
`;


export async function getServerSideProps(context) {
  const data = await fetch('https://samples.openweathermap.org/data/2.5/forecast/hourly?q=London,us&appid=b6907d289e10d714a6e88b30761fae22');
  const res = await data.json();
  const { list } = res;
  return {
    props: {
      data: [...list]
    }
  };
}