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
  border: dashed 1px black;
  resize: none;
  overflow-y: auto;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.2);
`;

const Result = styled.pre<{ valid: Boolean }>`
  height: 100%;
  border-radius: 20px;
  overflow-y: auto;
  padding: 20px;
  margin: 0;
  background: white;
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.2);
  border: solid 2px ${({ valid }) => (valid ? "#75B56E" : "#E1E2E4")};
`;

const Title = styled.h1`
  margin-top: 0;
`;

const placeholder = `{
  border: 'none'
}

OR

{
  foo: {
    width: '15px',
    border: 'none'
  }
}`;

const App = () => {
  const [result, setResult] = useState([]);
  const content = result.every(([_, value]) => typeof value !== "object")
    ? styleToCss(Object.fromEntries(result))
    : result
        .map(([key, styleObject]) => `.${key} { ${styleToCss(styleObject)} }`)
        .join("");

  return (
    <AppContainer>
      <Wrapper>
        <Title>JS</Title>
        <Input
          placeholder={placeholder}
          onChange={(event) => {
            try {
              // eslint-disable-next-line no-eval
              eval(`
              var obj= ${event.target.value};
              setResult(Object.entries(obj));
            `);
            } catch (error) {
              setResult([]);
            }
          }}
        />
      </Wrapper>
      <Wrapper>
        <Title>CSS</Title>
        <Result valid={Boolean(content)}>{cssbeautify(content)}</Result>
      </Wrapper>
    </AppContainer>
  );
};

export default App;
