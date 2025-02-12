import React from 'react';

type CodeRunnerProps = {
    htmlCode: string;
    cssCode: string;
    jsCode: string;
}

export const CodeRunner: React.FC<CodeRunnerProps> = ({ htmlCode, cssCode, jsCode }) => {

  const completeCode = htmlCode
  .replace('</head>', `<style>${cssCode}</style></head>`)
  .replace('<script src="script.js"></script>', '') 
  .replace('</body>', `<script>${jsCode}</script></body>`);

  return (
    <iframe
      style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}
      sandbox="allow-scripts allow-same-origin"
      srcDoc={completeCode}
      title="Code Runner"
    />

  );
};

