import React, { useState, useEffect, useCallback, useRef } from "react";
import Papa from "papaparse";
import { FixedSizeList } from "react-window";
import "./style/CsvTable.css";

const CsvTable = ({ csvFile }) => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const scrollContainerRef = useRef(null);
  const headerRef = useRef(null);
  const bodyRef = useRef(null);
  const listRef = useRef(null);


  useEffect(() => {
    const parseCsv = async () => {
      Papa.parse(csvFile, {
        complete: (result) => {
          if (result.data.length > 0) {
            setHeaders(result.data[0]);
            setData(result.data.slice(1));
            
            const initialWidths = {};
            result.data[0].forEach((header, index) => {
              initialWidths[index] = Math.max(150, header.length * 8 + 20);
            });
            setColumnWidths(initialWidths);
          }
        },
        header: false,
        skipEmptyLines: true,
      });
    };

    parseCsv();
  }, [csvFile]);

  
  const totalWidth = headers.reduce((sum, _, index) => {
    return sum + (columnWidths[index] || 150);
  }, 0);

  
  useEffect(() => {
    const bodyElement = bodyRef.current;
    const headerElement = headerRef.current;

    if (!bodyElement || !headerElement) return;

    const handleScroll = (e) => {
      if (e.target === bodyElement) {
        headerElement.scrollLeft = bodyElement.scrollLeft;
      } else if (e.target === headerElement) {
        bodyElement.scrollLeft = headerElement.scrollLeft;
      }
    };

    bodyElement.addEventListener('scroll', handleScroll);
    headerElement.addEventListener('scroll', handleScroll);

    return () => {
      bodyElement.removeEventListener('scroll', handleScroll);
      headerElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const Row = useCallback(({ index, style }) => {
    return (
      <div 
        className="row" 
        style={{
          ...style,
          width: totalWidth,
          display: 'flex',
        }}
      >
        {data[index].map((cell, colIndex) => (
          <div
            key={colIndex}
            className="cell"
            title={cell}
            style={{
              width: columnWidths[colIndex] || 150,
              minWidth: columnWidths[colIndex] || 150,
            }}
          >
            {cell}
          </div>
        ))}
      </div>
    );
  }, [data, columnWidths, totalWidth]);

  return (
    <div className="table-container" ref={scrollContainerRef}>
      <div 
        className="header-wrapper"
        ref={headerRef}
      >
        <div 
          className="header-row" 
          style={{ width: totalWidth }}
        >
          {headers.map((header, index) => (
            <div 
              key={index} 
              className="header-cell"
              style={{
                width: columnWidths[index] || 150,
                minWidth: columnWidths[index] || 150,
              }}
            >
              {header}
            </div>
          ))}
        </div>
      </div>

      
      <div className="body-container" ref={bodyRef}>
        <FixedSizeList
          height={600}
          width={totalWidth}
          itemCount={data.length}
          itemSize={35}
          outerRef={bodyRef}
          ref={listRef}
        >
          {Row}
        </FixedSizeList>
      </div>
    </div>
  );
};

export default CsvTable;