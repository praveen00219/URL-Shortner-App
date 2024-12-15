import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortenUrl, setShortenUrl] = useState('');
  const [msg, setMsg] = useState('');
  const shortUrl = async() => {
    try {
      if(longUrl.trim()=='') {
        setMsg('Please enter a long URL');
        setTimeout(() => setMsg(''), 2000);
        return;
      }
      const url = new URL(longUrl);
      console.log(url);
      const response = await axios.post( `https://url-shortner-jrto.onrender.com/api/shorten-url`, {url: longUrl});
      setShortenUrl(response.data.shorturl);
    }
    catch (error) {
      if(error.message.includes("Invalid URL")) {
        setMsg('Invalid URL');
        setTimeout(() => setMsg(''), 2000);
        return;
      }
      setMsg(error.response.data.message);
      setTimeout(() => setMsg(''), 2000);
      console.error(error.message.includes("Invalid URL"));
    }
  }

  const copyUrl = async() => {
    try {
      await navigator.clipboard.writeText(shortenUrl);
      setMsg('URL copied to clipboard');
      setTimeout(() => setMsg(''), 2000);
    }
    catch (err) {
      console.error('Failed to copy text: ', err);
    }
  } 
  return (
    <>
    <nav>
      <p>urlShortner</p>
    </nav>
    <div className="url-cont">
      <p className="msg">{msg}</p>
      <div className="url-wrap">
        <div className="url-des">
          <img src="https://tinyurl.com/images/home/url.svg" alt="" />
          <p>Your Long URL</p>
        </div>
        <input onChange={(e)=>setLongUrl(e.target.value)} value={longUrl} type="text" placeholder="Enter your long URL" />
        <div className="url-des">
          <img src="	https://tinyurl.com/images/home/magic-wand.svg" alt="" />
          <p>Your Short URL</p>
        </div>
        <p className='shorten-url'>{shortenUrl}</p>
        <div className="btn-cont">
          <button onClick={shortUrl}>Shorten URL</button>
          <button onClick={copyUrl}>copy</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
