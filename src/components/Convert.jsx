import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Convert = ({ text, language }) => {

  const [convertedText, setConvertedText] = useState('');

  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY


  
  
  
  useEffect(() => {
    const response = axios
      .post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: text,
            target: language,
            key: apiKey
          }
        }
      )
      .then((response) => {
        setConvertedText(response.data.data.translations[0].translatedText);
      })
      .catch((err) => {
        console.log('rest api error', err);
      });
  }, [text, language]);

  return <div>{convertedText}</div>;
};

export default Convert;