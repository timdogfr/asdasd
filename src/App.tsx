import React from 'react';
import './App.css';

function App() {
  const [ranking, setRanking] = React.useState<number | null>(null);
  const [inputText, setInputText] = React.useState<string>("");
  const [hash, setHash] = React.useState<number | null>();

  const updateHash = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedHash = parseInt(e.target.value);
    if (isNaN(parsedHash)) {
      setInputText("");
      return
    }

    setInputText(e.target.value)
    setHash(parsedHash)
  }

  const updateRanking = async () => {
    if (inputText.length === 0) {
      return;
    }

    if (hash === null) {
      return;
    }
    const res = await fetch('https://cloudflare-ipfs.com/ipfs/QmZJijb1h7wpCYiEzG6vJgBYKAVbdfLZFz926d6S5QhEA4/', {
      method: 'POST',
      body: JSON.stringify({
        account: "naut",
        hash: [hash]
      }),
      headers: {
        'content-type': 'application/json'
      }
    });

    const data = await res.json();
    setInputText("")

    if (data.data.length < 1) {
      return
    }

    setRanking(data.data[0].rank)
  }

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundImage: `url(./bg.png)`, backgroundColor: '#000000', backgroundSize: 'cover', boxShadow: `inset 0 0 0 2000px rgba(0, 0, 0, 0.6)` }}>
        {ranking ? <div><p>Nearnaut <b>{'#' + hash}</b> is of rank...</p><h1>{ranking}</h1></div> : <h1>Enter the Nearnaut id # to get its ranking...</h1>}
        <input onChange={updateHash} value={inputText} style={{ width: '50%', height: '50px', fontSize: '1em' }} />
        <button style={{ marginTop: '50px', width: '25%' }} className='button' onClick={() => updateRanking()}><b>Check</b></button>
      </header>
    </div >
  );
}

export default App;
