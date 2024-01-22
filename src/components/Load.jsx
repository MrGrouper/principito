import React, { useState, useEffect } from "react";
import { ReactReader } from "react-reader";
import Convert from './Convert.jsx'


function LoadBook({ handleClick }) {
  const [location, setLocation] = useState(null);
  const [rendition, setRendition] = useState(null);
  const [selections, setSelections] = useState([]);

  const locationChanged = (epubcifi) => {
    setLocation(epubcifi);
  };

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
    <div style={{ height: "100vh" }}>
      <div className="border border-stone-400 bg-white min-h-[100px] p-2 rounded">
        <h2 className="font-bold mb-1">Selections</h2>
        <Convert
        text = {selections.text}
        language = 'en'
        />
      </div>
      <ReactReader
        url="../books/Platero.epub"
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
  );
}

export default LoadBook;
