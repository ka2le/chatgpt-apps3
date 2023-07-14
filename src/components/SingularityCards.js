import React, { useEffect, useRef, useState } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { Grid, Paper, TextField, Button } from '@mui/material';
import styled from 'styled-components';
import { darken } from 'polished';
import img1 from '../images/singularitySprint/defence_robot.png';
import img2 from '../images/singularitySprint/swarm_intelligence.png';
import img3 from '../images/singularitySprint/genetic.png';
import img4 from '../images/singularitySprint/data_harvest.png';
import img5 from '../images/singularitySprint/adversarial.png';
import img6 from '../images/singularitySprint/chess.png';
import img7 from '../images/singularitySprint/supervised.png';
import img8 from '../images/singularitySprint/balance.png';
import img9 from '../images/singularitySprint/quantum.png';
import img10 from '../images/singularitySprint/iot.png';
import scoreIcon from '../images/singularitySprint/score.png';
import scoreIcon2 from '../images/singularitySprint/score2.png';
import dataIcon from '../images/singularitySprint/data.png';
import dataIcon2 from '../images/singularitySprint/data2.png';
import processingIcon from '../images/singularitySprint/processing.png';
import processingIcon2 from '../images/singularitySprint/processing_3.png';
import background2 from '../images/singularitySprint/sci-fi-background.svg';
import background from '../images/singularitySprint/background2.svg';
import processing_background from '../images/singularitySprint/processing_background.svg';
import score_background from '../images/singularitySprint/score_background.svg';
import data_background from '../images/singularitySprint/data_background.svg';
import RegularFont from '../fonts/TitilliumWeb-Regular.ttf';
import BoldFont from '../fonts/TitilliumWeb-Bold.ttf';
import RegularFont2 from '../fonts/Orbit-Regular.ttf';
import RegularFont3 from '../fonts/DIGITALDREAM.ttf';



const cards = [
    {
        img: img1,
        title: "Digital Defence",
        action1: "Activate Security Protocol",
        details1: "+1 Data per 2 Data",
        action2: "Disable Firewall",
        details2: "+15 Score",
        cost: "30 Data"
    },
    {
        img: img2,
        title: "Swarm Intelligence",
        action1: "Apply swarm solutions",
        details1: "+4 Processing and +4 Processing per 10 Processing",
        action2: "Release the Swarm",
        details2: "+15 Data and + 10 Processing",
        cost: "10 Score"
    },
    {
        img: img3,
        title: "Genetic Algorithms",
        action1: "Mutate Variables",
        details1: "+4 Processing +2 Processing for every 10 Processing ",
        action2: "Initiate Evolutionary Sequence",
        details2: "+3 Score for every 10 Score",
        cost: "15 Processing"
    },
    {
        img: img4,
        title: "Data Farm",
        action1: "Launch Harvesting Protocol",
        details1: "+12 Data",
        action2: "Reaping time",
        details2: "+2 Score for every 10 Data",
        cost: "All Data"
    },
    {
        img: img5,
        title: "Generative Adversarial Network",
        action1: "Deceive Discriminator",
        details1: "+8 Processing",
        action2: "Initiate Zero-Sum Game",
        details2: "The player with the most Processing after 2 more rounds played get + Processing equal to the opponents Processing",
        cost: "8 Data"
    },
    // {
    //     img: img3,
    //     title: "",
    //     action1: "",
    //     details1: "",
    //     action2: "",
    //     details2: "",
    //     cost: ""
    // },


]

function CardActions({ title, details, cost = null }) {
    const detailsComponents = textToComponents(details);
    const costComponents = cost ? textToComponents("Cost: " + cost) : null;

    return (
        <CardText>
            <TextTitle>{"" + title}:</TextTitle>
            {cost && <Cost>{costComponents}</Cost>}
            <Details>{detailsComponents}</Details>
        </CardText>
    );
};

const iconSize2 = "84px";
const iconStyle2 = { width: iconSize2, height: iconSize2, verticalAlign: 'middle', opacity: "1" };
const iconStyle3 = { width: "20px", height: "20px", verticalAlign: 'middle', position: "absolute", left: "10px", top: "20px" };
const iconStyle4 = { width: "20px", height: "20px", verticalAlign: 'middle', position: "absolute", left: "10px", bottom: "20px" };
const iconStyle5 = { width: "20px", height: "20px", verticalAlign: 'middle', position: "absolute", right: "10px", top: "20px" };
const iconStyle6 = { width: "20px", height: "20px", verticalAlign: 'middle', position: "absolute", right: "10px", bottom: "20px" };
const IconLarge = ({ type, style = iconStyle2 }) => {
    let iconSrc = '';
    switch (type) {
        case 'score':
            iconSrc = scoreIcon;
            break;
        case 'data':
            iconSrc = dataIcon;
            break;
        default:  // For 'processing' or any other value
            iconSrc = processingIcon2;
            break;
    }
    return <img src={iconSrc} alt={type} style={style} />;
};

const convertColor = (rgbString) => {
    const [r, g, b] = rgbString.split(',');
    return `rgb(${r.trim()}, ${g.trim()}, ${b.trim()})`;
};

const TrackerCard = React.forwardRef(({ iconType, color,backgroundImg=processing_background }, ref) => {
    const formattedColor = convertColor(color);
    console.log(formattedColor)
    const darkenedColor = darken(0.7, formattedColor);
    console.log(darkenedColor)
    return (
        <TrackerContainer ref={ref} color={darkenedColor} backgroundImg={backgroundImg}>

            <Row>

                <LeftColumn>
                    <IconLarge type={iconType} style={iconStyle3}></IconLarge>
                    <IconLarge type={iconType} style={iconStyle4}></IconLarge>
                    <IconLarge type={iconType} style={iconStyle5}></IconLarge>
                    <IconLarge type={iconType} style={iconStyle6}></IconLarge>
                    {Array.from({ length: 10 }, (_, i) => (
                        <NumberBox  key={i} color={color}>{i}</NumberBox>
                    ))}
                </LeftColumn>
                <CenterColumn>
                    <IconLarge type={iconType}></IconLarge>
                    <br></br>
                    <br></br>
                    <IconLarge type={iconType}></IconLarge>
                    <br></br>
                    <br></br>
                    <IconLarge type={iconType}></IconLarge>
                </CenterColumn>
                <RightColumn>
                    {Array.from({ length: 10 }, (_, i) => (
                        <NumberBox key={i} color={color}>{i * 10}</NumberBox>
                    ))}
                </RightColumn>
            </Row>
        </TrackerContainer>
    );
});

const CardContainer = styled.div`
  width: 63mm;
  height: 88mm;
  position: relative;
  background-color: rgb(0, 0, 40);
  background-image: url('${background}');
`;


const Text = styled.p`
  color:aqua;
  font-size:9px;
  font-family: ${props => props.font || 'Titillium Web'};
  text-shadow: 0 0 5px rgba(0,255,255,0.5);

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

const TrackerContainer = styled(CardContainer)`
background-color: ${props => props.color};
    background-image: url('${props => props.backgroundImg}');
`;

const NumberBox = styled(Text)`
    color: ${props => `rgb(${props.color})`};
    display: flex;
    justify-content: center;
    align-items: center;
    clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 25%, 75% 0);
    width: 30px;
    margin: 4%;
    height: 10%;
    font-family: "Digital Dream";
    background: ${props => `rgba(${props.color}, 0.2)`};
    border-left: 1px solid ${props => `rgb(${props.color})`};
`;
const Row = styled.div`
  display: flex;  // Add this line to create a row of columns
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 6px);
  height: 100%;
  padding: 3px;
  background: linear-gradient(transparent, rgba(0,0,0,0.5));
`;
const LeftColumn = styled.div`
  display: flex;
  margin-top:2%;
  flex-direction: column;
  flex: 1;
  //border-right: 1px dashed lime;
  align-items: flex-end;  // Add this line to right-align boxes
`;

const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  //border-right: 1px dashed lime;
  /* Additional styles here */
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:2%;
  flex: 1;
  /* Additional styles here */
`;


const Card = React.forwardRef(({ imgUrl, cardTitle, action1, details1, action2, details2, cost }, ref) => {
    return (
        <CardContainer ref={ref}>
            <TopHalf>
                <Border>
                    <ImageContainer>
                        <Image src={imgUrl} />
                        <TitleWrapper>
                            <Title >{cardTitle}</Title>
                        </TitleWrapper>
                    </ImageContainer>
                </Border>
            </TopHalf>
            <BottomHalf>
                <CardActions title={action1} details={details1}></CardActions>
                <CardActions title={action2} details={details2} cost={cost}></CardActions>
            </BottomHalf>
        </CardContainer>
    );
});


const SingularityCards = () => {

    const [currentCard, nextCard] = useCurrentCard();
    const [card, setCard] = useState(cards[currentCard])
    const cardRefs = cards.map(() => React.createRef());
    const [cardRef, saveAsImage] = useSave(card.title);
    const [trackerRef1, saveTracker1] = useSave("Tracker");
    const [trackerRef2, saveTracker2] = useSave("Tracker");
    const [trackerRef3, saveTracker3] = useSave("Tracker");
    const [shouldSave, setShouldSave] = useState(false);
    const [saveIndex, setSaveIndex] = useState(0);
    const [saveAll] = useSaveAll();

    useEffect(() => {
        setCard(cards[currentCard]);
    }, [currentCard]);

    const saveAllCards = async () => {
        for (let i = 0; i < cards.length; i++) {
            await saveAll(cardRefs[i], cards[i].title);
            // Giving some time for the card change to take effect
            await new Promise((resolve) => setTimeout(resolve, 1));
        }
    };

    return (
        <Grid container spacing={0} style={{ height: '100%', margin: 0, padding: 0 }}>
            <Card
                ref={cardRef}
                imgUrl={card.img}
                cardTitle={card.title}
                action1={card.action1}
                details1={card.details1}
                action2={card.action2}
                details2={card.details2}
                cost={card.cost}
            ></Card>


            <Grid item xs={1} ><button onClick={saveAsImage}>Save as Image</button><button onClick={nextCard}>Next Card</button></Grid>
            <Grid item xs={1} ><button onClick={saveTracker1}>Save Tracker1</button><button onClick={saveTracker2}>Save Tracker2</button><button onClick={saveTracker3}>Save Tracker3</button></Grid>
            <Grid item xs={1} ><button onClick={saveAllCards}>Save All Cards</button></Grid> {/* Button to save all cards */}
            <TrackerCard ref={trackerRef1} iconType="processing" backgroundImg={processing_background} color="83,200,152" />
            <TrackerCard ref={trackerRef2} iconType="score"  backgroundImg={score_background} color="249,242,172" />
            <TrackerCard ref={trackerRef3} iconType="data"  backgroundImg={data_background} color="255,127,219" />
            {cards.map((card, index) => (
                <Card
                    key={index}
                    ref={cardRefs[index]}
                    imgUrl={card.img}
                    cardTitle={card.title}
                    action1={card.action1}
                    details1={card.details1}
                    action2={card.action2}
                    details2={card.details2}
                    cost={card.cost}
                />
            ))}
        </Grid>
    );
};
export default SingularityCards;




const iconSize = "14px";
const iconStyle = { width: iconSize, height: iconSize, verticalAlign: 'middle' };
const ScoreIcon = () => <img src={scoreIcon} alt="score" style={iconStyle} />
const DataIcon = () => <img src={dataIcon} alt="data" style={iconStyle} />
const ProcessingIcon = () => <img src={processingIcon} alt="processing" style={iconStyle} />


const TitleWrapper = styled.div`
  position: relative;
  padding: 2px; // This is to avoid the title text being hidden by the border
  ::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    border-top: 2px solid aqua;
    border-left: 2px solid transparent;
    width: 50%;
    height: 100%;
  }
  ::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    border-bottom: 2px solid aqua;
    border-right: 2px solid transparent;
    width: 50%;
    height: 100%;
  }
`;

const Border = styled.div`
  border: 1px solid aqua;
  
  margin: 3px;
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-bottom: 95%; 
  position: relative;
`;

const Image = styled.img`
  position: absolute;
  object-fit: cover;  
  width: 100%;
  height: 100%;
  
`;



const CardText = styled(Text)`
  position: relative;
  padding: 3px;
  margin: 4px 0;
  border-left: 1px solid aqua;
  clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 25%, 95% 0);
  background: rgba(32,219,238,0.1);
  
`;
const NumberCardText = styled(Text)`
 font-family:"Digital Dream";
 display: inline;
`;
/*border-bottom: 2px double aqua;
border-right: 2px double aqua;*/
const Title = styled(Text)`
  font-size: 10px;
  text-shadow: 0 0 5px rgba(0,255,255,0.9);
  border-bottom: 1px solid aqua;
  border-right: 1px solid aqua;
  border-left: 1px solid aqua;
  background:rgba(0,0,0,0.4);
  position: absolute; 
  top: 0px; 
  left: 0%; 
  text-transform: uppercase;
  padding:2px;
  margin: 0;


  
`;
const TopHalf = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
`;

const BottomHalf = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 6px);
  height: 31%;
  padding: 3px;
  background: linear-gradient(transparent, rgba(0,0,0,0.5));
`;


const TextTitle = styled.b`
    margin-right: auto;
    text-transform: uppercase;
`;

const Details = styled.span`
    //margin-left: 10px;
    width:100%;
    display: inline-block;
    margin-top:1px;
    margin-bottom:1px;
`;

const Cost = styled.b`
color:rgb(230,177,42);
text-shadow: 0 0 5px rgba(230,177,42,0.7);
    float:right;
    margin-right:3px;
`;





const useSave = (title) => {
    const cardRef = useRef(null);
    var scale = 4;

    const saveAsImage = () => {
        return new Promise((resolve, reject) => {
            domtoimage.toBlob(cardRef.current, {
                width: cardRef.current.clientWidth * scale,
                height: cardRef.current.clientHeight * scale,
                style: {
                    transform: 'scale(' + scale + ')',
                    transformOrigin: 'top left'
                }
            })
                .then((blob) => {
                    saveAs(blob, title + '.png');
                    resolve();
                })
                .catch((error) => {
                    console.error('oops, something went wrong!', error);
                    reject(error);
                });
        });
    };
    return [cardRef, saveAsImage];
}

const useSaveAll = () => {
    const saveAsImage = (cardRef, title) => {
        return new Promise((resolve, reject) => {
            var scale = 3;
            domtoimage.toBlob(cardRef.current, {
                width: cardRef.current.clientWidth * scale,
                height: cardRef.current.clientHeight * scale,
                style: {
                    transform: 'scale(' + scale + ')',
                    transformOrigin: 'top left'
                }
            })
                .then((blob) => {
                    saveAs(blob, title + '.png');
                    resolve();
                })
                .catch((error) => {
                    console.error('oops, something went wrong!', error);
                    reject(error);
                });
        });
    };
    return [saveAsImage];
}

const useCurrentCard = () => {
    const max = cards.length - 1;
    const [currentCard, setCurrentCard] = useState(0)
    console.log(currentCard)
    const next = () => {
        setCurrentCard(currentCard < max ? (currentCard + 1) : 0);
    }
    return [currentCard, next];
}




const textToComponents = (text) => {
    const words = text.split(" ");
    return words.map((word, index) => {
        switch (word.toLowerCase()) {
            case "score":
                return <><ScoreIcon key={index} />{" "}</>;
            case "data":
                return <><DataIcon key={index} />{" "}</>;
            case "processing":
                return <><ProcessingIcon key={index} />{" "}</>;
            default:
                if (!isNaN(word)) {
                    return <NumberCardText key={index}>{word}</NumberCardText>;
                }
                return word + " ";
        }
    });
};