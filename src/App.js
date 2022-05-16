import './App.css';
import { saveAs } from 'file-saver';
import React, { useState } from 'react';

function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeName, setMemeName] = useState('');

  let template;

  function memeDownload() {
    saveAs(template, 'meme.png');
  }

  // make sure that the link doesn`t break when there is an input missing

  if (topText && bottomText) {
    template = `https://api.memegen.link/images/${memeName}/${topText}/${bottomText}.png`;
  } else if (topText) {
    template = `https://api.memegen.link/images/${memeName}/${topText}.png`;
  } else if (bottomText) {
    template = `https://api.memegen.link/images/${memeName}/${bottomText}.png`;
  } else {
    template = 'https://api.memegen.link/images/ants.png';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // pick the name and top, bottom texts placeholders

  return (
    <div className="meme-template-selector">
      <form onSubmit={handleSubmit}>
        <br />
        <label>
          Meme template
          <input
            name="memeName"
            placeholder="Add Meme Name"
            value={memeName}
            onChange={(event) => {
              setMemeName(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <label>
          Top text
          <input
            name="topText"
            placeholder="Add Top Text"
            value={topText}
            onChange={(event) => {
              setTopText(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <label>
          Bottom text
          <input
            name="bottomText"
            placeholder="Add Bottom Text"
            value={bottomText}
            onChange={(event) => {
              setBottomText(event.currentTarget.value);
            }}
          />
        </label>
      </form>

      <div className="Buttons">
        <h1> Update meme template</h1>
        <button
          onClick={() => {
            setMemeName('');
            setTopText('');
            setBottomText('');
          }}
        >
          New meme
        </button>
        <h1> Download meme template</h1>
        <button
          onClick={() => {
            memeDownload();
          }}
        >
          Download
        </button>
      </div>

      <div className="meme">
        <img src={template} alt="meme" data-test-id="meme-image" />
      </div>
    </div>
  );
}
// setup reset button and download button

export default App;
