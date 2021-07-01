import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import styleToCss from "style-object-to-css-string";

const AppContainer = styled.div`
  display: flex;
`;

const Input = styled.textarea`
  flex: 1;
  min-height: 500px;
  height: 100vh;
  border: dotted 1px black;
`;

const Wrapper = styled.div`
  flex: 1;
  min-height: 500px;
  border: solid 1px black;
`;

const MarkdownWrapper = ({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) => (
  <Wrapper className={className}>
    <ReactMarkdown>{children}</ReactMarkdown>
  </Wrapper>
);

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [result, setResult] = useState([]);
  console.log("🚀 ~ file: App.tsx ~ line 15 ~ App ~ result", result);
  return (
    <AppContainer>
      <Input
        onChange={(event) => {
          try {
            // eslint-disable-next-line no-eval
            eval(`
              var obj= ${event.target.value};
              setResult(Object.entries(obj));
            `);
          } catch (error) {
            return null;
          }
        }}
      />
      <MarkdownWrapper>
        {result
          .map(([key, styleObject]) => `.${key} { ${styleToCss(styleObject)} }\n`)
          .join("\n")}
      </MarkdownWrapper>
    </AppContainer>
  );
};

export default App;
