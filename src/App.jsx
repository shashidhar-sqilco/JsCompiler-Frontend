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
  doc: 'my sourcecode',
  extensions: [basicDark, javascript({ jsx: true })],
});
function App() {
  const [code, setCode] = useState('console.log("Hello World!")');
  const [output, setOutput] = useState({output:"",textColor:""});

  const handleExecuteCode = async () => {
    try {
          setOutput({output:'Compiling your code...',textColor:"text-orange-500"});
      const response = await axios.post('https://jscompiler.onrender.com/execute', { code });
      setOutput({output:response.data.output,textColor:"text-green-500"});
    } catch (error) {
      setOutput({output:`Error: ${error.response.data.error}`,textColor:"text-red-500"});
    }
  };

 const onChange = useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setCode(val);
  }, []);
  return (
    <div className="flex flex-col w-screen min-h-screen bg-[#181818]">
      <div className="flex justify-end p-4">
        <button
          onClick={handleExecuteCode}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Run
        </button>
      </div>
      <div className="flex-1 w-full flex flex-col md:flex-row">
        <div className="md:w-1/2 md:mr-4">
          <div className="bg-white rounded-md h-[50vh] shadow-md">
            <CodeMirror
              value={code}
    theme={basicDarkInit({
    settings: {
      caret: '#c6c6c6',
      fontFamily: 'monospace',
    }
  })}
              onChange={onChange}
               extensions={[javascript({ jsx: true })]}
   
       
              showLineNumbers={true}
              className="rounded-md"
            />
            
          </div>
        </div>
        <div className="md:w-1/2 h-[50vh] md:h-[90vh] max-h-screen  ">
          <div className={`bg-black ${output.textColor} rounded-md shadow-md p-4 h-full overflow-scroll font-mono no-scrollbar`}>
            <pre>{output.output}</pre>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;