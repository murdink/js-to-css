import React, { useState } from "react";
import cssbeautify from "cssbeautify";
import styled from "styled-components";
import styleToCss from "style-object-to-css-string";

const AppContainer = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  flex: 1;
  min-height: 500px;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.textarea`
  height: 100%;
  width: 100%;
  border: solid 2px gray;
  overflow-y: auto;
  border-radius: 20px;
  padding: 20px;
`;

const Result = styled.pre`
  flex: 1;
  height: 100%;
  border-radius: 20px;
  border: solid 2px gray;
  padding: 0;
  overflow-y: auto;
  padding: 20px;
  margin: 0;
  background: white;
`;

const Title = styled.h1`
  margin-top: 0;
`;

const App = () => {
  const [result, setResult] = useState([]);
  const content = 
    result.every(([_, value]) => typeof value !== "object")
      ? styleToCss(Object.fromEntries(result))
      : result
          .map(([key, styleObject]) => `.${key} { ${styleToCss(styleObject)} }`)
          .join("")
 

  return (
    <AppContainer>
      <Wrapper>
        <Title>JS</Title>
        <Input
          onChange={(event) => {
            try {
              // eslint-disable-next-line no-eval
              eval(`
              var obj= ${event.target.value};
              setResult(Object.entries(obj));
            `);
            } catch (error) {
              setResult([])
            }
          }}
        />
      </Wrapper>
      <Wrapper>
        <Title>CSS</Title>
        <Result>{cssbeautify(content)}</Result>
      </Wrapper>
    </AppContainer>
  );
};

export default App;
