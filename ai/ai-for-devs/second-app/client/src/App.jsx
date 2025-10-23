import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './App.css'

function App() {
  const [question, setQuestion] = useState('');
  const [llmResponse, setLlmResponse] = useState('');

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  }

  const fetchData = async () => {
    setLlmResponse("Thank you for your patience, we understand that a local LLM may take longer than usual ...");

    const URL = 'http://localhost:8000'

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ question })
    });

    const reader = response.body.pipeThrough(new TextDecoderStream).getReader();

    setLlmResponse('');

    while(true) {
      const { done, value } = await reader.read();

      setLlmResponse(chatResponse => chatResponse + (value || ''));

      if(done) {
        return
      }
    }
  };

  return (
    <>
      <section>
        <h1>Chat with a local AI</h1>
      </section>
      <section>
        <label>
          <input type="textarea" name="question" value={question} onChange={handleInputChange} placeholder="Ask your question" />
        </label>
        <button onClick={fetchData}>
          Ask
        </button>
      </section>
      <section>
        <ReactMarkdown>
          {llmResponse}
        </ReactMarkdown>
      </section>
    </>
  )
}

export default App
