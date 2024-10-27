// src/components/LanguageSwitcher.js

const LanguageSwitcher = ({ setLanguage }) => {
    return (
      <div>
        <h3>Select Lyrics Language:</h3>
        <button onClick={() => setLanguage('english')}>English</button>
        <button onClick={() => setLanguage('hebrew')}>Hebrew</button>
        <button onClick={() => setLanguage('thai')}>Thai</button>
        <button onClick={() => setLanguage('korean')}>Korean</button>
        <button onClick={() => setLanguage('chinese')}>Chinese</button>
      </div>
    );
  };
  
  export default LanguageSwitcher;
  