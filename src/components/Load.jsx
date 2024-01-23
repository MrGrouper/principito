import React, { useState, useEffect } from "react";
import { ReactReader } from "react-reader";
import Convert from './Convert'


function LoadBook({ handleClick }) {
  const [location, setLocation] = useState(null);
  const [rendition, setRendition] = useState(null);
  const [selections, setSelections] = useState([]);

  const locationChanged = (epubcifi) => {
    setLocation(epubcifi);
  };

  const translationStyle = {
    padding: "5px",
    border: "solid",
    borderRadius: '5px',
    textAlign: "center",

  }

  useEffect(() => {
    if (rendition) {
      function setRenderSelection(cfiRange, contents) {
        if (rendition) {
          setSelections({
              text: rendition.getRange(cfiRange).toString(),
              cfiRange,
            })
        }
      }
      rendition.on("selected", setRenderSelection);
      return () => {
        rendition?.off("selected", setRenderSelection);
      };
    }   
    
  }, [setSelections, rendition]);




  return (
    <div>
      <div className = "book" style={{ height: "90vh" }}>
      <ReactReader
        url="../books/alice.epub"
        epubInitOptions={{
          openAs: "epub",
        }}
        location={location}
        locationChanged={locationChanged}
        getRendition={(_rendition) => {
          setRendition(_rendition);
        }}
      />
    </div>
    <div className="translation" style={translationStyle}>
        <Convert
        text = {selections.text}
        language = 'en'
        />
      </div>
    </div>
  );
}

export default LoadBook;
