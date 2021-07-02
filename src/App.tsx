import React, { useState } from "react";
import cssbeautify from "cssbeautify";
import styled from "styled-components";
import styleToCss from "style-object-to-css-string";
import AceEditor from "react-ace";
import safeEval from "safe-eval";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import { useEffect } from "react";

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

const defaultValue = `{
  foo: {
    width: '15px',
    border: 'none'
  }
}`;

const App = () => {
  const [evalResult, setResult] = useState<[string, string][]>([]);
  const [content, setContent] = useState<string>("");
  useEffect(() => {
    try {
      if (evalResult.every(([_, value]) => typeof value !== "object")) {
        setContent(styleToCss(Object.fromEntries(evalResult)));
      } else {
        setContent(
          evalResult
            .map(
              ([key, styleObject]) => `.${key} { ${styleToCss(styleObject)} }`
            )
            .join("")
        );
      }
    } catch (error) {
      setContent("");
    }
  }, [evalResult]);
  const handleChange = (value: string) => {
    try {
      // eslint-disable-next-line no-eval
      const obj = safeEval(value);
      if (typeof obj === "object") {
        setResult(Object.entries(obj));
      }
    } catch (error) {
      setResult([]);
    }
  };
  useEffect(() => {
    handleChange(defaultValue);
  }, []);

  return (
    <AppContainer>
      <Wrapper>
        <Title>JS</Title>
        <AceEditor
          defaultValue={defaultValue}
          mode="javascript"
          theme="github"
          style={{
            height: "100%",
            width: "100%",
          }}
          onChange={handleChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
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
