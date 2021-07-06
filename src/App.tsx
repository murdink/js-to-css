import React, { useState } from "react";
import { pascalCase } from "change-case";
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

const Label = styled.label`
  padding-bottom: 20px;
  cursor: pointer;
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
    borderWidth: '5px'
  }
}`;

const App = () => {
  const [evalResult, setResult] = useState<[string, string][]>([]);
  const [content, setContent] = useState<string>("");
  const [shouldUsePascal, setShouldUsePascal] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (evalResult.every(([_, value]) => typeof value !== "object")) {
        setContent(styleToCss(Object.fromEntries(evalResult)));
      } else {
        setContent(
          evalResult
            .map(
              ([key, styleObject]) =>
                `.${shouldUsePascal ? pascalCase(key) : key} { ${styleToCss(styleObject)} }`
            )
            .join("")
        );
      }
    } catch (error) {
      setContent("");
    }
  }, [evalResult, shouldUsePascal]);
  const handleChange = (value: string) => {
    try {
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
          setOptions={{ useWorker: false }}
        />
      </Wrapper>
      <Wrapper>
        <Title>CSS</Title>
        <Label htmlFor="usePascal">
          Use pascal case for class names:{" "}
          <input
            type="checkbox"
            id="usePascal"
            onChange={(e) => setShouldUsePascal(e.target.checked)}
            checked={shouldUsePascal}
          ></input>
        </Label>
        <Result valid={Boolean(content)}>{cssbeautify(content)}</Result>
      </Wrapper>
    </AppContainer>
  );
};

export default App;
