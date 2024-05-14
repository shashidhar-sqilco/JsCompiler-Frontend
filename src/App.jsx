/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useCallback, useState } from 'react';
import './App.css';
import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { basicDark, basicDarkInit } from '@uiw/codemirror-theme-basic/dark';


const state = EditorState.create({
  doc: 'my source code',
  extensions: [basicDark, javascript({ jsx: true })],
});
function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleExecuteCode = async () => {
    try {
      const response = await axios.post('http://localhost:3000/execute', { code });
      setOutput(response.data.output);
    } catch (error) {
      setOutput(`Error: ${error.response.data.error}`);
    }
  };

 const onChange = useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setCode(val);
  }, []);
  return (
    <div className="flex flex-col w-screen h-screen bg-gray-100">
      <div className="flex-1 w-full p-6 flex">
        <div className="w-1/2 mr-4">
          <div className="bg-white rounded-md shadow-md p-4">
            <CodeMirror
              value={code}
    theme={basicDarkInit({
    settings: {
      caret: '#c6c6c6',
      fontFamily: 'monospace',
    }
  })}
              onChange={onChange}
              height="90vh" extensions={[javascript({ jsx: true })]}
   
       
              showLineNumbers={true}
              className="rounded-md"
            />
          </div>
        </div>
        <div className="w-1/2">
          <div className="bg-black text-green-500 rounded-md shadow-md p-4 h-full overflow-auto font-mono">
            <pre>{output}</pre>
          </div>
        </div>
      </div>
      <div className="flex justify-center p-4">
        <button
          onClick={handleExecuteCode}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Execute Code
        </button>
      </div>
    </div>
  );
}

export default App;