import React, { useEffect, useRef, useState } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { Grid, Paper, TextField, Button, Divider } from '@mui/material';
import styled from 'styled-components';
import useMediaQuery from '@mui/material/useMediaQuery';

import space2 from '../images/singularitySprint/space1.png';
import scoreIcon from '../images/singularitySprint/score.png';
import dataIcon from '../images/singularitySprint/data.png';
import processingIcon from '../images/singularitySprint/processing.png';
import background from '../images/singularitySprint/scorekeeper_background.svg';
import RegularFont from '../fonts/TitilliumWeb-Regular.ttf';
import BoldFont from '../fonts/TitilliumWeb-Bold.ttf';
import RegularFont2 from '../fonts/Orbit-Regular.ttf';
import RegularFont3 from '../fonts/DIGITALDREAM.ttf';

const NUMBER_OF_ROWS = 7;
const ROW_HEIGHT = "calc(" + 100 / NUMBER_OF_ROWS + "%)";
const NUMBER_FONT_SIZE = "7.2vh";
const BUTTON_FONT_SIZE = "18px";


const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    margin: '0',
    padding: '10px',
    boxSizing: 'border-box',
  },
  paper: {
    padding: '2px',
    textAlign: 'center',
    color: '#fff',
    fontSize: "14px",
    background: '#3f51b5',
  },
};

const ScoreKeeper = () => {
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const rowInfo = [
    { label: 'P1 Score', type: 'score' },
    { label: 'P1 Data', type: 'data' },
    { label: 'P1 Processing', type: 'processing' },
    { label: 'Round', type: 'round' },
    { label: 'P2 Score', type: 'score' },
    { label: 'P2 Data', type: 'data' },
    { label: 'P2 Processing', type: 'processing' },

  ];

  if (!isLandscape) {
    const roundIndex = rowInfo.findIndex(item => item.label === 'Round');
    if (roundIndex !== -1) {
      const [roundItem] = rowInfo.splice(roundIndex, 1);
      rowInfo.push(roundItem);
    }
  }
  const [history, setHistory] = useState({});
  // This state will hold the current state of each row
  const [currentRowsState, setCurrentRowsState] = useState({});

  // This will update the current state of a specific row
  const updateRowState = (label, value) => {
    setCurrentRowsState({
      ...currentRowsState,
      [label]: value
    });
  };
  useEffect(() => {
    // Initialize currentRowsState and history for the first round
    const initialRowsState = {};
    rowInfo.forEach((row) => {
      initialRowsState[row.label] = row.type === 'data' ? 10 : row.type === 'round' ? 1 : 0;
    });
    setCurrentRowsState(initialRowsState);
    setHistory({ 0: { ...initialRowsState } });
  }, []);

  const updateRound = (newRound) => {
    let newHistory = { ...history, [newRound]: { ...currentRowsState } };
    console.log(newHistory);
    setHistory(newHistory);
  };

  return (
    <TrackerContainer color={"rgb(0, 0, 40)"} backgroundImg={background}>
      <div style={styles.container}>
        <Grid container spacing={1} style={{ height: 'calc(100%)', width: '100%' }}>
          {rowInfo.map((row, rowIndex) => (
            <>
              <ScoreRow key={rowIndex} label={row.label} isLandscape={isLandscape} type={row.type} updateRound={updateRound} updateRowState={updateRowState} history={history} />
              {((rowIndex === 2 || rowIndex === 5) && !isLandscape) && (
                <Grid item xs={12} style={{
                  height: '0px', paddingTop: 0,
                  margin: "0px 0px -4px 6px",
                }}>
                  <Divider style={{
                    backgroundColor: " rgb(0 237 255 / 28%)",
                    height: "2px",
                  }} />
                </Grid>
              )}
            </>
          ))}
        </Grid>
      </div>
    </TrackerContainer>
  );
};

export default ScoreKeeper;




const ScoreRow = ({ label, type, updateRound, updateRowState, history, isLandscape }) => {
  const [text, setText] = useState(type == "data" ? 10 : type == "round" ? 1 : 0);

  const handleButtonClick = (value) => {
    if (value === 'half') {
      setText((prevText) => Math.floor(Number(prevText) / 2));
    }
    else if (value === 'reset') {
      setText(0);
    }
    else if (type === "round") {
      setText(Number(text) + 1);
      updateRound(text);
    }
    else {
      const newValue = (Number(text) + value) >= 0 ? Number(text) + value : 0;
      setText(newValue);
    }
  };
  useEffect(() => {
    updateRowState(label, text);
  }, [text]);
  useEffect(() => {
    updateRowState(label, text);
  }, []);
  const textColor = type == "score" ? "rgb(248 255 153)" : type == "data" ? "rgb(253 126 189)" : type == "round" ? "rgb(126 228 253)" : "rgb(146 255 181)";
  const backgroundColor = convertRgbToRgba(textColor, 0.1);
  return (
    <React.Fragment>
      <Grid item xs={isLandscape ? 3 : 6} style={{ height: ROW_HEIGHT }}>
        <ScoreValue label={label} type={type} text={text} setText={setText} history={history} />

      </Grid>
      <Grid item xs={isLandscape ? 3 : 6} style={{ height: ROW_HEIGHT, paddingLeft: "10px" }}>
        {type != "round" &&
          <Grid container direction="row" style={{ justifyContent: 'space-around', height: "100%",  borderRadius:"5px", padding:"0 3px" }}>

            {/* First row of buttons */}
            <Grid container spacing={1} style={{ alignItems: 'flex-end' }}>
              {[-1, -10, -100].map((value, colIndex) => (
                <Grid item xs={4} key={colIndex}>
                  <CustomButton
                    label={value === 'reset' ? '-All' : value.toString()}
                    onClick={() => handleButtonClick(value)}
                    color={textColor}
                    
                  />
                </Grid>
              ))}
            </Grid>
            {/* Second row of buttons */}
            <Grid container spacing={1 } style={{ alignItems: 'flex-start' }} >
              {[1, 10, "half"].map((value, colIndex) => (
                <Grid item xs={4} key={colIndex}>
                  <CustomButton
                    label={value === 'half' ? '/2' : "+" + value.toString()}
                    onClick={() => handleButtonClick(value)}
                    color={textColor}
                   
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        }
        {type == "round" &&
          <>{["round"].map((value, colIndex) => (
            <Grid item xs={12} key={colIndex} style={{ height: "100%" }} >
              <NextRoundButton
                label={"Next Round"}
                onClick={() => handleButtonClick(value)}
              />
            </Grid>
          ))}</>
        }

      </Grid>
    </React.Fragment>
  );
};

const CustomButton = ({ label, onClick, color = "#aaffff"}) => {
  // Split the label into the sign and the number
  const sign = label[0];
  const number = label.slice(1);
  const backgroundColor = sign != "+" ? convertRgbToRgba(color, 0.07) :convertRgbToRgba(color, 0.14);
  return (
    <Button 
      variant="outlined" 
      style={{ padding: "4px 0", margin: "0px 0", fontSize: BUTTON_FONT_SIZE, minWidth: "100%", fontFamily: "Titillium Web", color:color , backgroundColor:backgroundColor}} 
      onClick={onClick}
    >
      {/* Inline elements for the sign and the number */}
      <span style={{ fontSize: "28px" , lineHeight:"90%", marginTop:"-6px"}}>{sign}</span>
      <span>{number}</span>
    </Button>
  );
};
const NextRoundButton = ({ label, onClick }) => {
  return (
    <Button variant="outlined" style={{ padding: "4px 0", margin: "2px 0", fontSize: "21px", minWidth: "100%", height: "90%", fontFamily: "Titillium Web" }} onClick={onClick}>
      {label}
    </Button>
  );
};



const ScoreValue = ({ label, type, text, setText, history }) => {

  const textColor = type == "score" ? "rgb(248 255 153)" : type == "data" ? "rgb(253 126 189)" : type == "round" ? "rgb(126 228 253)" : "rgb(146 255 181)";
  const backgroundColor = convertRgbToRgba(textColor, 0.12);
  const currentIcon = type == "score" ? <ScoreIcon></ScoreIcon> : type == "data" ? <DataIcon></DataIcon> : type == "round" ? <></> : <ProcessingIcon></ProcessingIcon>;
  return (
    <CardText color={textColor} bgColor={backgroundColor} >
      {currentIcon}

      <TextField
        label={label}  // Use the label passed as a prop
        value={text}
        type='number'
        onChange={(e) => setText(e.target.value)}
        InputProps={{
          style: {
            color: textColor,
            border: 'none',
            padding: "4px",
          },
        }}
        inputProps={{
          style: { padding: '4px', fontSize: type == "round" ? "9vh" : NUMBER_FONT_SIZE, letterSpacing: "-5px", margin: "-20px -6px", fontFamily: "Titillium Web" },  // Apply padding directly to the input element
        }}

        InputLabelProps={{
          style: {
            color: textColor,
            margin: "0px -10px",
            fontSize: "20px",
            overflow: "visible",
          },
        }}
      />
      {(history && type != "round") && (<div style={{ marginLeft: "3px", fontSize: "12px", height: "100%", maxHeight: "24px", lineHeight: "12px" }}>
        {Object.keys(history).map((round) => (
          <div style={{ display: "inline-block", marginRight: "2px" }} key={round}>
            {round > 0 && (history[round][label] == 0 ? "-" : history[round][label])}
          </div>
        ))}
      </div>
      )}
    </CardText>
  );
};





function convertRgbToRgba(rgb, alpha) {
  // Remove 'rgb(' and ')', then split by space or comma
  const [r, g, b] = rgb.replace(/rgb\(|\)/g, "").split(/[\s,]+/).map(Number);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}




const iconStyle = {
  height: " 50%",
  verticalAlign: "middle",
  opacity: "0.12",
  position: "absolute",
  top: "25%",
  left: "40%"
};
const ScoreIcon = () => <img src={scoreIcon} alt="score" style={iconStyle} />
const DataIcon = () => <img src={dataIcon} alt="data" style={iconStyle} />
const ProcessingIcon = () => <img src={processingIcon} alt="processing" style={iconStyle} />


const Text = styled.p`
  color:#99FFFF;
  font-size:13px;
  letter-spacing: -1px;
  font-family: ${props => props.font || 'Titillium Web'};
  text-shadow: 0 0 5px rgba(0,255,255,0.2);

  @font-face {
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 400;
    src: url(${RegularFont}) format('woff2');
  }
  @font-face {
    font-family: 'Orbit';
    font-style: normal;
    font-weight: 400;
    src: url(${RegularFont2}) format('woff2');
  }
  @font-face {
    font-family: 'Digital Dream';
    font-style: normal;
    font-weight: 400;
    src: url(${RegularFont3}) format('woff2');
  }

  @font-face {
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 700;
    src: url(${BoldFont}) format('woff2');
  }
`;

const TrackerContainer = styled.div`
width: 100vw;
background-color: rgb(0, 0, 40);
  background-image: url('${background}');
color: #99FFFF;
padding: 0;
height: 100vh;
background-color: ${props => props.color};
    background-image: url('${props => props.backgroundImg}');
`;



const CardText = styled(Text)`
  position: relative;
  font-family:"Titillium Web";
  padding: 10px 10px 6px 0;
  margin: 0;
  color:${props => props.color};
  min-height:  ${props => props.height};
  border-left: 2px solid ${props => props.color};
  clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 20%, 85% 0);
  background: ${props => props.bgColor};
  
`;