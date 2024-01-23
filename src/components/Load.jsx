import React, { useState, useEffect } from "react";
import { ReactReader } from "react-reader";
import Convert from "./Convert";

function LoadBook({ handleClick }) {
  const [location, setLocation] = useState(null);
  const [rendition, setRendition] = useState(null);
  const [selections, setSelections] = useState([]);

  const locationChanged = (epubcifi) => {
    setLocation(epubcifi);
  };

  const epubFilePath = import.meta.env.BASE_URL + "/books/alice.epub";


  const translationStyle = {
    padding: "5px",
    border: "solid",
    borderRadius: "5px",
    textAlign: "center",
  };

  useEffect(() => {
    if (rendition) {
      function setRenderSelection(cfiRange) {
        if (rendition) {
          setSelections({
            text: rendition.getRange(cfiRange).toString(),
            cfiRange,
          });
        }
      }

      // Handle touch events for text selection on mobile devices
      document.addEventListener("touchend", handleTouchEnd);

      rendition.on("selected", setRenderSelection);

      return () => {
        document.removeEventListener("touchend", handleTouchEnd);
        rendition?.off("selected", setRenderSelection);
      };
    }
  }, [setSelections, rendition]);

  const handleTouchEnd = () => {
    // Check if there is a selection
    const selection = window.getSelection();
    if (selection.toString().trim() !== "") {
      setSelections({
        text: selection.toString(),
        cfiRange: rendition?.getRange(selection.getRangeAt(0)),
      });
    }
  };

  return (
    <div>
      <div className="book" style={{ height: "90vh" }}>
        <ReactReader
          url={epubFilePath}
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
        <Convert text={selections.text} language="es" />
      </div>
    </div>
  );
}

export default LoadBook;
