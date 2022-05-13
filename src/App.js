import './App.css';
import { saveAs } from 'file-saver';
import React, { useState } from 'react';

// import { Meme } from './Meme.js';

// const objectToQueryParameter = (obj) => {
//   const links = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
//   return '?' + links.join('&');
// };

// function App() {
//   const [templates, setTemplates] = useState([]);
//   const [template, setTemplate] = useState(null);
//   const [topText, setTopText] = useState('');
//   const [bottomText, setBottomText] = useState('');
//   const [meme, setMeme] = useState(null);

//   useEffect(() => {
//     fetch('https://api.memegen.link/templates/').then((x) =>
//       x.json().then((response) => setTemplates(response.id.name)),
//     );
//   }, []);

//   if (meme) {
//     return (
//       <div>
//         <img src={meme} alt="custom meme" />
//       </div>
//     );
//   }

//   return (
//     <div style={{ textAlight: 'center' }}>
//       {template && (
//         <form
//           onSubmit={async (e) => {
//             e.preventDefault();
//             const parameters = {
//               templateName: template.name,
//               text1: topText,
//               text2: bottomText,
//             };
//             const response = await fetch(
//               `https://api.memegen.link/templates/${objectToQueryParameter(
//                 parameters,
//               )}`,
//             );
//             const json = await response.json();
//             setMeme(json.data.url);
//           }}
//         >
//           <Meme template={template} />
//           <input
//             placeholder="top text"
//             value={topText}
//             onChange={(e) => setTopText(e.target.value)}
//           />
//           <input
//             placeholder="bottom text"
//             value={bottomText}
//             onChange={(e) => setBottomText(e.target.value)}
//           />
//           <button>create meme</button>
//         </form>
//       )}
//       {!template && (
//         <>
//           <h1>Pick a template</h1>
//           {templates.map((template) => {
//             return (
//               <Meme
//                 template={template}
//                 onClick={() => {
//                   setTemplate(template);
//                 }}
//               />
//             );
//           })}
//         </>
//       )}
//     </div>
//   );
// }

// Last working v
// function App() {
//   const [inputText, setInputText] = useState({
//     topText: '',
//     bottomText: '',
//     memeName: '',
//   });

//   const [memeName, setMemeName] = useState();
//   // const [template, setTemplate] = useState([]);

//   const [randomImage, setRandomImage] = useState(
//     `https://api.memegen.link/images/${memeName}.gif`,
//   );

//   const [allMemeImgs, setAllMemeImgs] = useState([]);

//   const handleChange = (e) => {
//     setInputText({
//       ...inputText,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const randNum = Math.floor(Math.random() * allMemeImgs.len);
//     const randMemeImgUrl = allMemeImgs[randNum].url;
//     setRandomImage(randMemeImgUrl);
//   };

//   useEffect(() => {
//     fetch('https://api.memegen.link/images')
//       .then((response) => response.json())
//       .then((response) => setAllMemeImgs(response.id.url))
//       .catch(() => {
//         'return error';
//       });
//   });
//   return (
//     <div className="meme-container">
//       <form onSubmit={handleSubmit}>
//         <input
//           name="memeName"
//           placeholder="Add Meme Name"
//           value={inputText.memeName}
//           onChange={handleChange}
//         />
//         <input
//           name="topText"
//           placeholder="Add Top Text"
//           value={inputText.topText}
//           onChange={handleChange}
//         />
//         <input
//           name="bottomText"
//           placeholder="Add Bottom Text"
//           value={inputText.bottomText}
//           onChange={handleChange}
//         />
//       </form>
//       <button>Generate</button>
//       <div className="meme">
//         <img src={randomImage} alt="" />
//         {/* data-test-id="meme-image" */}
//         <h2 className="top"> {inputText.topText}</h2>
//         <h2 className="bottom"> {inputText.bottomText}</h2>
//         <h2 className="name"> {inputText.memeName}</h2>
//       </div>
//     </div>
//   );
// }

// export default App;

function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeName, setMemeName] = useState('');

  let template;

  function memeDownload() {
    saveAs(template, 'meme.png');
  }

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

  return (
    <div className="meme-template-selector">
      <form onSubmit={handleSubmit}>
        <input
          name="memeName"
          placeholder="Add Meme Name"
          value={memeName}
          onChange={(event) => {
            setMemeName(event.currentTarget.value);
          }}
        />
        <input
          name="topText"
          placeholder="Add Top Text"
          value={topText}
          onChange={(event) => {
            setTopText(event.currentTarget.value);
          }}
        />
        <input
          name="bottomText"
          placeholder="Add Bottom Text"
          value={bottomText}
          onChange={(event) => {
            setBottomText(event.currentTarget.value);
          }}
        />
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

export default App;
