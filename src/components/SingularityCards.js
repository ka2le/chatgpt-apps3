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
import img11 from '../images/singularitySprint/rat.png';
import img12 from '../images/singularitySprint/art.png';
import img13 from '../images/singularitySprint/puzzle.png';
import img14 from '../images/singularitySprint/lightning.png';
import img15 from '../images/singularitySprint/brain.png';
import img16 from '../images/singularitySprint/drive.png';
import img17 from '../images/singularitySprint/chip.png';
import img18 from '../images/singularitySprint/vault.png';
import img19 from '../images/singularitySprint/bulb.png';
import img20 from '../images/singularitySprint/vr.png';
import img21 from '../images/singularitySprint/mining.png';
import img22 from '../images/singularitySprint/net.png';
import img23 from '../images/singularitySprint/server.png';
import img24 from '../images/singularitySprint/hacker.png';
import img25 from '../images/singularitySprint/vials.png';
import img26 from '../images/singularitySprint/vision.png';
import img27 from '../images/singularitySprint/computer.png';
import img28 from '../images/singularitySprint/microscope.png';
import img29 from '../images/singularitySprint/telescope.png';
import img30 from '../images/singularitySprint/stair.png';
import img31 from '../images/singularitySprint/scientist.jpg';
import img32 from '../images/singularitySprint/robot2.png';
import img33 from '../images/singularitySprint/clock2.png';
import img34 from '../images/singularitySprint/computer2.png';
import img35 from '../images/singularitySprint/cloud.png';
import img36 from '../images/singularitySprint/molecule.png';
import img37 from '../images/singularitySprint/tree.png';
import img38 from '../images/singularitySprint/enigma.png';
import img39 from '../images/singularitySprint/molecule3.png';
import img40 from '../images/singularitySprint/molecule2.png';
import img41 from '../images/singularitySprint/scientist2.png';
import img42 from '../images/singularitySprint/watson.png';
import img43 from '../images/singularitySprint/cyborg.png';
import img44 from '../images/singularitySprint/miner.png';
import img45 from '../images/singularitySprint/hacker2.png';
import img46 from '../images/singularitySprint/net2.png';
import img47 from '../images/singularitySprint/boxing.png';
import img48 from '../images/singularitySprint/rat2.png';
import img49 from '../images/singularitySprint/iot2.png';
import scoreIcon from '../images/singularitySprint/score.png';
import scoreIcon2 from '../images/singularitySprint/score2.png';
import dataIcon from '../images/singularitySprint/data.png';
import dataIcon2 from '../images/singularitySprint/data2.png';
import processingIcon from '../images/singularitySprint/processing.png';
import processingIcon2 from '../images/singularitySprint/processing_3.png';
import background2 from '../images/singularitySprint/sci-fi-background.svg';
import background from '../images/singularitySprint/background2.svg';
import background_backside from '../images/singularitySprint/Backside.png';
import background_backside2 from '../images/singularitySprint/backside2.png';
import background_backside_main from '../images/singularitySprint/BackSide_Main.png';
import background_backside3 from '../images/singularitySprint/backside3.png';
import processing_background from '../images/singularitySprint/processing_background.svg';
import score_background from '../images/singularitySprint/score_background.svg';
import data_background from '../images/singularitySprint/data_background.svg';
import RegularFont from '../fonts/TitilliumWeb-Regular.ttf';
import BoldFont from '../fonts/TitilliumWeb-Bold.ttf';
import RegularFont2 from '../fonts/Orbit-Regular.ttf';
import RegularFont3 from '../fonts/DIGITALDREAM.ttf';

let PRINT_VERSION = localStorage.getItem('PRINT_VERSION') === 'true';
let MOBILE_CARDS = localStorage.getItem('MOBILE_CARDS') === 'true';
let BRIDGE_VERSION = MOBILE_CARDS ? false : true;
const bridge_width = "57mm";
const bridge_height = "89mm";
const poker_width = "63mm";
const poker_height = "88mm";
const print_margin = 20;
const default_padding = "0px";
const default_font_size = MOBILE_CARDS ? "17px" : "9px";
const default_cost_font_size = MOBILE_CARDS ? "17px" : "8px";
const default_title_size = MOBILE_CARDS ? "15px" : "9px";
const default_number_size = MOBILE_CARDS ? "18px" : "12px";
const default_img_size = !MOBILE_CARDS ? BRIDGE_VERSION ? "95%" : "88%" : "40%";
const default_action_size = !MOBILE_CARDS ? BRIDGE_VERSION ? "37%" : "35%" : "66%";
const save_size = MOBILE_CARDS ? 2 : 8;





const initialCards =[
  {
    "img": "/chatgpt-apps3/static/media/data_harvest.805779d1d474568188ec.png",
    "title": "Data Farm",
    "action1": "Launch Data Seeding Simulation",
    "details1": "Copy free action of first card opponent plays this turn",
    "action2": "Harvest Data",
    "details2": "+2 score and +2 Score per 10 Data",
    "cost": "All Data"
  },
  {
    "img": "/chatgpt-apps3/static/media/chess.0d1354cf31bb0336f28a.png",
    "title": "Deep Blue",
    "action1": "Apply Alpha-Beta pruned Minimax algorithm",
    "details1": "+4 data and +4 data per 10 data",
    "action2": "Roll out the nodes",
    "details2": "Before Card Draw, reveal both players hands and choose a free action to copy twice",
    "cost": "8 Data or 6 processing"
  },
  {
    "img": "/chatgpt-apps3/static/media/supervised.50188772e009817d9169.png",
    "title": "Supervised Learning",
    "action1": "Calibrate Reward Parameters",
    "details1": "+6 data +3 data per 10 data",
    "action2": "Outsource Labeling",
    "details2": "After Card Draw, swap hand and processing with your opponent if you have at least 1 \nmore processing",
    "cost": "Processing Advantage"
  },
  {
    "img": "/chatgpt-apps3/static/media/balance.1cf18f4a9bb77ab8f425.png",
    "title": "Weighted Neurons",
    "action1": "Compute Gradient Descent",
    "details1": "+6 data and + 12 data if the top card in your discard pile has 'Data' in the name",
    "action2": "Regularize Weights",
    "details2": "Before Card Draw, collect cards on hands and divide equally as you choose",
    "cost": "10 data or 5 processing"
  },
  {
    "img": "/chatgpt-apps3/static/media/art.15524fc746520f7a5f51.png",
    "title": "FontSConvolutional Neural Network",
    "action1": "Reconstruct Latent Space",
    "details1": "+12 processing and +6 processing to your opponent",
    "action2": "Contest Art",
    "details2": "Competition: The player with highest reached data starting now get +8 score at end of game",
    "cost": "10 data or 10 processing"
  },
  {
    "img": "/chatgpt-apps3/static/media/chip.c3d7f23893543bc644df.png",
    "title": "Tensor Processing Unit",
    "action1": "Levrage application-specific integrated circuit",
    "details1": "+5 data per 10 data to both players",
    "action2": "Multiply the Matrix",
    "details2": "+1 score +4 processing and +5 processing per 10 Data ",
    "cost": "All data"
  },
  {
    "img": "/chatgpt-apps3/static/media/vr.494585699c4b95048dcf.png",
    "title": "Computer Vision",
    "action1": "Detect objects",
    "details1": "+6 data and + 3 data per 10 data and after Card Draw, both players reveal their hand",
    "action2": "Tune model",
    "details2": "Get half difference in score if opponent has more score",
    "cost": "Half Processing and Half data"
  },
  {
    "img": "/chatgpt-apps3/static/media/net2.3257ad3e3fd5db0fa05a.png",
    "title": "Neural Network",
    "action1": "Select optimizer algorithm",
    "details1": "+4 data and +4 data per 10 data",
    "action2": "Add deep layers",
    "details2": "+3 score and before Card Draw, look at and rearrange the top 4 \ncards",
    "cost": "8 data or 4 processing"
  },
  {
    "img": "/chatgpt-apps3/static/media/server.d91d74e9ef3fda3423b9.png",
    "title": "Data Center",
    "action1": "Establish redundancy",
    "details1": "+2 \nand +4 \nper 10 \nto either data or processing",
    "action2": "Provide Storage",
    "details2": "+3 score per 10 data spent if you have more Data than your opponent",
    "cost": "Data Difference"
  },
  {
    "img": "/chatgpt-apps3/static/media/defence_robot.f3f4b9cc5556489bfdca.png",
    "title": "Data Protection",
    "action1": "Activate Security Protocol",
    "details1": "+4 processing and +4 processing if your opponent has 0 processing",
    "action2": "Disable Firewall",
    "details2": "+8 score in 1 \nmore round",
    "cost": "32 data or 16 processing"
  },
  {
    "img": "/chatgpt-apps3/static/media/swarm_intelligence.a9455745f80438b00ea9.png",
    "title": "Swarm Intelligence",
    "action1": "Apply swarm solutions",
    "details1": "+4 Data and +4 Data per 10 Data",
    "action2": "Release the Swarm",
    "details2": "+2 score and get either +2 data per 1 processing spent or +1 processing per 2 data spent ",
    "cost": "All data or All processing"
  },
  {
    "img": "/chatgpt-apps3/static/media/genetic.b0f76ce73af7050b8a2e.png",
    "title": "Genetic Algorithms",
    "action1": "Mutate Variables",
    "details1": "+4 processing and +5 processing per 10 processing",
    "action2": "Evolve Sequence",
    "details2": "In 1 \nmore round +3 Score per 10 data spent now",
    "cost": "All Data"
  },
  {
    "img": "/chatgpt-apps3/static/media/boxing.268acce3c7c1337f6088.png",
    "title": "FontSGenerative Adversarial Network",
    "action1": "Deceive Discriminator",
    "details1": "+2 data per card in your discard pile",
    "action2": "Begin Zero-Sum Game",
    "details2": "Competition: The player with the most processing after 2 \nmore rounds gets +8 score",
    "cost": "4 data or 4 processing"
  },
  {
    "img": "/chatgpt-apps3/static/media/quantum.7bfe0eefa868e37309cc.png",
    "title": "Quantum Computing",
    "action1": "Get Quantum Entangled",
    "details1": "Both players lose up to 12 data each",
    "action2": "Enable Quantum Supremacy",
    "details2": "+2 score and +4 Score per 10 Processing spent",
    "cost": "All Processing"
  },
  {
    "img": "/chatgpt-apps3/static/media/rat2.96f3c86b649452a75064.png",
    "title": "Reinforcement Learning",
    "action1": "Explore Greedily",
    "details1": "+4 data and +4 data per 10 data",
    "action2": "Predict Q Values",
    "details2": "+2 score per 10 \ntotal data and processing spent",
    "cost": "All data and All processing"
  },
  {
    "img": "/chatgpt-apps3/static/media/puzzle.d7c371cc7f912c382961.png",
    "title": "Recurrent Neural Network",
    "action1": "Recall Long Short-Term Memory",
    "details1": "Loan 20 data pay back up to 26 data in 2 \nrounds",
    "action2": "Backpropagate Errors",
    "details2": "+1 score per card in your discard pile",
    "cost": "3 data per card"
  },
  {
    "img": "/chatgpt-apps3/static/media/lightning.713bd6ae7f297148207a.png",
    "title": "CPU Voltage Spike",
    "action1": "Accidentally Overclock",
    "details1": "Set your data to the next whole 10 data",
    "action2": "Overload game",
    "details2": "Competition: The player with \"Data Protection\" in their discard pile at game end get +8 score",
    "cost": "10 data or 6 processing"
  },
  {
    "img": "/chatgpt-apps3/static/media/miner.15f11d746f5d795e3244.png",
    "title": "Data Mining",
    "action1": "Test Linear Regression",
    "details1": "+6 data and +8 data if below 16 data",
    "action2": "Learn Deeply",
    "details2": "Take and play a card from any discard pile, paying its cost after this card's.",
    "cost": "Card and 8 processing or 14 data"
  },
  {
    "img": "/chatgpt-apps3/static/media/hacker2.fafe8a4e4e2ede9b6428.png",
    "title": "Hacker",
    "action1": "security by obscurity",
    "details1": "+3 Data +2 Processing +1 score",
    "action2": "Hire the hacker",
    "details2": "Steal up to 4 score from opponent",
    "cost": "14 processing"
  },
  {
    "img": "/chatgpt-apps3/static/media/scientist2.899cf2b08a566a681b4b.png",
    "title": "Data Scientist",
    "action1": "Produce Graphs",
    "details1": "+6 data +3 data per 10 data",
    "action2": "Raise Ethical Concerns",
    "details2": "This round, block all actions, delayed actions, and costs except this; all affected cards go to your discard pile",
    "cost": "14 data"
  },
  {
    "img": "/chatgpt-apps3/static/media/iot2.79f2e9e185a475204539.png",
    "title": "Internet Of Things",
    "action1": "Automate lighting",
    "details1": "+2 Data Next round trigger this entire action again",
    "action2": "Install smart lock",
    "details2": "Next 2 \nrounds, your actions can't be blocked and your data processing score can't be reduced by opponent",
    "cost": "10 data or 6 processing "
  },
  {
    "img": "/chatgpt-apps3/static/media/vials.a0f831bc14fc450118e8.png",
    "title": "Graph Neural Network",
    "action1": "Pool the nodes",
    "details1": "+4 data and +4 data per 10 data",
    "action2": "Calculate matrix",
    "details2": "Next round your opponent choose and reveal what card and action to play before you decide",
    "cost": "8 processing or 20 data"
  },
  {
    "img": "/chatgpt-apps3/static/media/robot2.96471c1c82d6a7265760.png",
    "title": "ChatGPT",
    "action1": "Say \"Please\" and \"Thank You\" ",
    "details1": "+1 processing per card in your discard pile",
    "action2": "Transform tokens",
    "details2": "+8 data and +4 data per score",
    "cost": "All score"
  },
  {
    "img": "/chatgpt-apps3/static/media/clock2.23a49361aac0eac6e16e.png",
    "title": "Temporal Difference Learning",
    "action1": "Synchronization Master-Slave",
    "details1": "Both players change up to 8 data closer to 20 data",
    "action2": "Design Reward",
    "details2": "+3 score per 10 data or processing spent, opponent get half the Data or processing spent",
    "cost": "All data or All processing"
  },
  {
    "img": "/chatgpt-apps3/static/media/computer2.0a31db4cc7086522fd6a.png",
    "title": "Personal Computer",
    "action1": "Pull from git",
    "details1": "+4 \nand +5 \nper 10 \nof lowest data or processing",
    "action2": "Reduce Scope",
    "details2": "Next round you get double score data processing from all actions affecting you",
    "cost": "Half Data and Half processing"
  },
  {
    "img": "/chatgpt-apps3/static/media/cloud.ed08c58a14eed5a82dcc.png",
    "title": "Cloud Computing",
    "action1": "Provide Service as a service",
    "details1": "+5 score opponent get +4 score",
    "action2": "Host Everyone",
    "details2": "+8 data and +4 data per totalt 10 data of both players ",
    "cost": "6 Processing"
  },
  {
    "img": "/chatgpt-apps3/static/media/enigma.e3e78ffabe8bec90f8cf.png",
    "title": "Data Encryption",
    "action1": "Reverse the Hash",
    "details1": "+4 data and +4 data to you per 10 data of opponent",
    "action2": "Imitate the game",
    "details2": "Comptetition: Player with most Score after 2 \nmore rounds get +36 data",
    "cost": "8 data or 4 processing"
  },
  {
    "img": "/chatgpt-apps3/static/media/molecule3.9cbc596b68aa5834a237.png",
    "title": "AlphaGo",
    "action1": "Fold protein",
    "details1": "+6 data and +12 data if you reveal a card from your hand with 'Network' in its the name",
    "action2": "Get ready, set, go",
    "details2": "Auction: +6 score to highest bidder, you can match and win, opponent raise by min 5 data",
    "cost": "Minimum 25 data"
  },
  {
    "img": "/chatgpt-apps3/static/media/watson.3075d1d7822ebbd71ad9.png",
    "title": "Watson",
    "action1": "Ask \"What is ...\"",
    "details1": "+4 processing and +5 processing per 10 processing",
    "action2": "Diagnose Patient",
    "details2": "Move top 3 \ncards from opponents discard pile to yours and rearrange your entire discard pile",
    "cost": "10 data or 6 processing"
  },
  {
    "img": "/chatgpt-apps3/static/media/cyborg.ff2f45d3ae860891beac.png",
    "title": "Cyborg",
    "action1": "Ascend Humanity",
    "details1": "Copy free action of the top card in your discard pile",
    "action2": "Assemble the AI-Team",
    "details2": "+3 score per card of either \"ChatGPT\", \"Deep Blue\", \"AlphaGo\" and \"Watson\" in your discard pile",
    "cost": "4 data per card"
  }
]

//   {
//     "img": "/chatgpt-apps3/static/media/vision.6b9a60803254c9d73cd9.png",
//     "title": "",
//     "action1": "",
//     "details1": "",
//     "action2": "",
//     "details2": "",
//     "cost": ""
//   },
//   {
//     "img": "/chatgpt-apps3/static/media/computer.45b4aa45ed512fe728d4.png",
//     "title": "",
//     "action1": "",
//     "details1": "",
//     "action2": "",
//     "details2": "",
//     "cost": ""
//   },
//   {
//     "img": "/chatgpt-apps3/static/media/microscope.40c4648469ebbc45e7c2.png",
//     "title": "",
//     "action1": "",
//     "details1": "",
//     "action2": "",
//     "details2": "",
//     "cost": ""
//   },
//   {
//     "img": "/chatgpt-apps3/static/media/telescope.5c48881f6a73fb4042ba.png",
//     "title": "",
//     "action1": "",
//     "details1": "",
//     "action2": "",
//     "details2": " ",
//     "cost": ""
//   },
//   {
//     "img": "/chatgpt-apps3/static/media/stair.740cb2efe884e577146b.png",
//     "title": "",
//     "action1": "",
//     "details1": "",
//     "action2": "",
//     "details2": "",
//     "cost": ""
//   },
//   {
//     "img": "/chatgpt-apps3/static/media/tree.69450eeee76c0f6b803a.png",
//     "title": "Tree Search",
//     "action1": "a",
//     "details1": "",
//     "action2": "",
//     "details2": "",
//     "cost": ""
//   },
//   {
//     "img": "/chatgpt-apps3/static/media/brain.3b36f28da467f35f299d.png",
//     "title": "",
//     "action1": "",
//     "details1": "",
//     "action2": "",
//     "details2": "",
//     "cost": ""
//   },
//   {
//     "img": "/chatgpt-apps3/static/media/drive.421e2754c85e33fe88de.png",
//     "title": "",
//     "action1": "",
//     "details1": "",
//     "action2": "",
//     "details2": "",
//     "cost": ""
//   },
//   {
//     "img": "/chatgpt-apps3/static/media/vault.690f8d1387cdd694fefc.png",
//     "title": "",
//     "action1": "",
//     "details1": "",
//     "action2": "",
//     "details2": "",
//     "cost": ""
//   },
//   {
//     "img": "/chatgpt-apps3/static/media/bulb.81e65dc1634dc531c62b.png",
//     "title": "",
//     "action1": "",
//     "details1": "",
//     "action2": "",
//     "details2": "",
//     "cost": ""
//   },
const SingularityCards = () => {


    const handleTextAreaChange = (event) => {
        setTextAreaValue(event.target.value);
        try {
            const newValue = JSON.parse(event.target.value);
            setCards(newValue);
            saveToLocalStorage(newValue);
        } catch (err) {
            console.error("Invalid JSON", err);
        }
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(textAreaValue);
        alert('Copied to clipboard');
    };

    const handlePaste = async () => {
        const pastedValue = await navigator.clipboard.readText();
        setTextAreaValue(pastedValue);
        try {
            const newValue = JSON.parse(pastedValue);
            setCards(newValue);

        } catch (err) {
            console.error("Invalid JSON", err);
        }
    };
    const handleReset = () => {
        localStorage.clear();
        setCards(initialCards);
        setTextAreaValue(JSON.stringify(initialCards, null, 2));
    };

    const handleAddCard = () => {
        const newCard = {
            img: "img1",
            title: "",
            action1: "",
            details1: "",
            action2: "",
            details2: "",
            cost: ""
        };
        const newCards = [...cards, newCard];
        setCards(newCards);

        setTextAreaValue(JSON.stringify(newCards, null, 2));
    };
    const saveToLocalStorage = (cards) => {
        localStorage.setItem('singularityCards', JSON.stringify(cards));
    };

    const loadFromLocalStorage = () => {
        const storedCards = localStorage.getItem('singularityCards');
        return storedCards ? JSON.parse(storedCards) : initialCards;
    };

    const [cards, setCards] = useState(loadFromLocalStorage);
    const [textAreaValue, setTextAreaValue] = useState(JSON.stringify(cards, null, 2));
    const [currentCard, nextCard, prevCard] = useCurrentCard(cards);
    const [card, setCard] = useState(cards[currentCard])
    const cardRefs = cards.map(() => React.createRef());
    const [cardRef, saveAsImage] = useSave(card.title);
    const [trackerRef1, saveTracker1] = useSave("Tracker1");
    const [trackerRef11, saveTracker11] = useSave("Tracker11");
    const [trackerRef2, saveTracker2] = useSave("Tracker2");
    const [trackerRef22, saveTracker22] = useSave("Tracker22");
    const [trackerRef3, saveTracker3] = useSave("Tracker3");
    const [trackerRef33, saveTracker33] = useSave("Tracker33");
    const [backsideRef, saveBackside] = useSave("Backside");
    const [shouldSave, setShouldSave] = useState(false);
    const [saveIndex, setSaveIndex] = useState(0);
    const [saveAll] = useSaveAll();



    useEffect(() => {
        setCard(cards[currentCard]);
    }, [currentCard]);
    useEffect(() => {
        setCard(cards[currentCard]);
    }, [cards])

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


            <Grid item xs={3} >

                <button onClick={nextCard}>Next Card</button>
                <button onClick={prevCard}>Prev Card</button>
                <br></br>
                <br></br>
                <button onClick={saveAsImage}>Save as Image</button>
                <button onClick={saveAllCards}>Save All Cards</button>
                <br></br>
                <br></br>
                <button onClick={saveTracker1}>Save Tracker1</button>
                <button onClick={saveTracker2}>Save Tracker2</button>
                <button onClick={saveTracker3}>Save Tracker3</button>
                <button onClick={saveTracker11}>Save Tracker11</button>
                <button onClick={saveTracker22}>Save Tracker22</button>
                <button onClick={saveTracker33}>Save Tracker33</button>
                <button onClick={saveBackside}>Save Backside</button>
                <br></br>
                <br></br>
                <DropdownComponent></DropdownComponent>
            </Grid>

            <Grid item xs={12} >
                <textarea
                    value={textAreaValue}
                    onChange={handleTextAreaChange}
                    rows="24"
                    cols="50"
                /><br></br>
                <button onClick={handleCopy}>Copy</button>
                <button onClick={handlePaste}>Paste</button>
                <button onClick={handleAddCard}>Add Card</button>
                <button onClick={handleReset}>Reset</button>



            </Grid> {/* Button to save all cards */}
            <BackCard ref={backsideRef}></BackCard>
            <TrackerCard ref={trackerRef1} iconType="processing" backgroundImg={processing_background} color="93,250,162" />
            <TrackerCard ref={trackerRef11} iconType="processing" backgroundImg={processing_background} color="93,250,162" hundred={true} />
            <TrackerCard ref={trackerRef2} iconType="score" backgroundImg={score_background} color="249,242,172" />
            <TrackerCard ref={trackerRef22} iconType="score" backgroundImg={score_background} color="249,242,172" hundred={true} />
            <TrackerCard ref={trackerRef3} iconType="data" backgroundImg={data_background} color="255,127,219" />
            <TrackerCard ref={trackerRef33} iconType="data" backgroundImg={data_background} color="255,127,219" hundred={true} />

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
            <Table data={cards} setData={setCards} setTextAreaValue={setTextAreaValue} />
        </Grid>

    );
};
export default SingularityCards;


function CardActions({ title, details, cost = null }) {
    const detailsComponents = textToComponents(details);
    const costComponents = cost ? textToComponents("Cost: " + cost) : null;

    return (
        <CardText height={cost == null ? "0px" : "52px"}>
            {!MOBILE_CARDS && <TextTitle>{"" + title}</TextTitle>}
            {cost && <Cost>{costComponents}</Cost>}
            <Details>{detailsComponents}</Details>
        </CardText>
    );
};


const Table = ({ data, setData, setTextAreaValue }) => {
    const onCellClick = useCellSwap();

    const handleUpdate = () => {
        const newJson = JSON.stringify(data, null, 2);
        setTextAreaValue(newJson);
    };

    return (
        <div>
            <button onClick={handleUpdate}>Update</button>
            <table style={{ width: "100%" }}>
                {data.map((item, i) => (
                    <tr key={i}>
                        <td>{item.title}</td>
                        <EditableCell
                            value={item.details1}
                            onChange={newValue => {
                                const newData = [...data];
                                newData[i].details1 = newValue;
                                setData(newData);
                            }}
                            onCellClick={onCellClick}
                        />
                        <EditableCell
                            value={item.details2}
                            onChange={newValue => {
                                const newData = [...data];
                                newData[i].details2 = newValue;
                                setData(newData);
                            }}
                            onCellClick={onCellClick}
                        />
                        <td>{item.cost}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

const EditableCell = ({ value, onChange, onCellClick }) => {
    const [cellContent, setCellContent] = useState(value);

    useEffect(() => {
        setCellContent(value);
    }, [value]);

    const handleClick = () => {
        onCellClick(cellContent, setCellContent);
    };

    useEffect(() => {
        onChange(cellContent);
    }, [cellContent]);

    return <td onClick={handleClick}>{cellContent}</td>;
};

const useCellSwap = () => {
    const [lastClickedCell, setLastClickedCell] = useState(null);

    const onCellClick = (cellContent, setCellContent) => {
        if (lastClickedCell && lastClickedCell.content !== cellContent) {
            setCellContent(lastClickedCell.content);
            lastClickedCell.setCellContent(cellContent);
            setLastClickedCell(null);
        } else {
            setLastClickedCell({ content: cellContent, setCellContent });
        }
    };

    return onCellClick;
};

const Card = React.forwardRef(({ imgUrl, cardTitle, action1, details1, action2, details2, cost }, ref) => {
  let isStyledTitle = false;
  let title = cardTitle;

  // check if cardTitle starts with 'FontS'
  if(cardTitle.startsWith('FontS')) {
      isStyledTitle = true;
      title = cardTitle.replace('FontS', ''); // remove 'FontS' from the beginning
  }

  return (
      <CardContainer ref={ref}>
          <FadeBackground>
              <InsideMargin>
                  <TopHalf>
                      <Border>
                          <ImageContainer>
                              {<Image src={imgUrl} />}
                              <TitleWrapper>
                                  {isStyledTitle ? <StyledTitle>{title}</StyledTitle> : <Title>{title}</Title>}
                              </TitleWrapper>
                          </ImageContainer>
                      </Border>
                  </TopHalf>
                  <BottomHalf>
                      <CardActions title={action1} details={details1}></CardActions>
                      <CardActions title={action2} details={details2} cost={cost}></CardActions>
                  </BottomHalf>
              </InsideMargin>
          </FadeBackground>
      </CardContainer>
  );
});




const iconSize = "20px";
const iconStyle = { width: iconSize, height: iconSize, verticalAlign: 'middle', margin:"-0px" };
const ScoreIcon = () => <img src={scoreIcon} alt="score" style={iconStyle} />
const DataIcon = () => <img src={dataIcon} alt="data" style={iconStyle} />
const ProcessingIcon = () => <img src={processingIcon} alt="processing" style={iconStyle} />
const CardContainer = styled.div`
  width: ${BRIDGE_VERSION ? bridge_width : poker_width};
  height:  ${BRIDGE_VERSION ? bridge_height : poker_height};
  padding: ${PRINT_VERSION ? print_margin * 1 + "px" : default_padding};
  position: relative;
  background-color: rgb(0, 0, 40);
  background-image: url('${background}');
`;


const FadeBackground = styled.div`
  width: 100%;
  padding: ${PRINT_VERSION ? print_margin * 1 + "px" : default_padding};
  margin-left:${PRINT_VERSION ? "-"+ print_margin * 1 + "px" : "-"+default_padding};
  height: 100%;
  margin-top:${PRINT_VERSION ? "-"+ print_margin + "px" : "-"+default_padding};
  background: linear-gradient(transparent, rgba(0,0,0,0.6));
    
`;
const InsideMargin = styled.div`
width: ${BRIDGE_VERSION ? bridge_width : poker_width};
height:  ${BRIDGE_VERSION ? bridge_height : poker_height};
  position: ${PRINT_VERSION ? "absolute" : "relative"};
    
`;

const Text = styled.p`
  color:aqua;
  font-size:${default_font_size};
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
  width: ${BRIDGE_VERSION ? bridge_width : poker_width};
  height: ${BRIDGE_VERSION ? bridge_height : poker_height};
  padding:  ${PRINT_VERSION ? print_margin * 1 + "px" : default_padding};
 
`;
const LeftColumn = styled.div`
  display: flex;
  margin-top:2%;
  flex-direction: column;
  flex: 1.2;
  //border-right: 1px dashed lime;
  align-items: flex-end;  // Add this line to right-align boxes
`;

const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.3;
  //border-right: 1px dashed lime;
  /* Additional styles here */
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:2%;
  flex:  1.2;
  /* Additional styles here */
`;

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
  padding-bottom: ${default_img_size}; 
  position: relative;
  
`;

const Image = styled.img`
  position: absolute;
  object-fit: unset;  
  width: 100%;
  height: 100%;
  
`;

const SideBorder = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(aqua, transparent);
`;
const LeftBorder = styled(SideBorder)`
    left: 0;
`;

const RightBorder = styled(SideBorder)`
    right: 0;
`;



const CardText = styled(Text)`
  position: relative;
  padding: 3px;
  margin: 4px 0;
  min-height:  ${props => props.height};
  border-left: 1px solid aqua;
  clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 25%, 95% 0);
  background: rgba(32,219,238,0.1);
  
`;
const NumberCardText = styled(Text)`
 font-family:"Digital Dream";
 display: inline;
 font-weight:bold;
 font-size: ${default_number_size};
`;
/*border-bottom: 2px double aqua;
border-right: 2px double aqua;*/
const Title = styled(Text)`
  font-size: 13px;
  text-shadow: 0 0 5px rgba(0,255,255,0.9);
  border-bottom: 1px solid aqua;
  border-right: 1px solid aqua;
  border-left: 1px solid aqua;
  background:rgba(0,0,0,0.6);
  position: absolute; 
  top: 0px; 
  left: 0%; 
  text-transform: uppercase;
  padding:2px;
  margin: 0;


  
`;

const StyledTitle = styled(Title)`
  font-size: 11px;
`;

const TopHalf = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: calc(100% - 10px);
  height: 50%;
`;

const BottomHalf = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 16px);
  height:  ${default_action_size}; 
  padding: 8px;
  //background: linear-gradient(transparent, rgba(0,0,0,0.5));
`;


const TextTitle = styled.b`
    margin-right: auto;
    margin-top:-2px;
    font-size:${default_title_size};
    text-transform: uppercase;
`;

const Details = styled.span`
    //margin-left: 10px;
    width:100%;
    display: inline-block;
    margin-top:-2px;
    margin-bottom:0px;
`;

const Cost = styled.b`
color:rgb(230,177,42);
font-size:${default_cost_font_size};
text-shadow: 0 0 5px rgba(230,177,42,0.7);
    float:right;
    margin-right:3px;
    margin-top:-2px;
`;





const useSave = (title) => {
    const cardRef = useRef(null);
    var scale = save_size;

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
            var scale = save_size;
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

const useCurrentCard = (cards) => {
    const max = cards.length - 1;
    const [currentCard, setCurrentCard] = useState(0)
    console.log(currentCard)
    const next = () => {
        setCurrentCard(currentCard < max ? (currentCard + 1) : 0);
    }
    const prev = () => {
        setCurrentCard(currentCard > 0 ? (currentCard - 1) : max);
    }
    return [currentCard, next, prev];
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
            case "<br>":
                return <br key={index} />;
            default:
                if (!isNaN(word)) {
                    return <NumberCardText key={index}>{word}</NumberCardText>;
                }
                return word + " ";
        }
    });
};





const iconSize2 = "23px";
const iconStyle2 = { width: iconSize2, height: iconSize2, verticalAlign: 'middle', opacity: "1" };


const marginX = PRINT_VERSION ? print_margin+20+"px" :"20px";
const marginY = PRINT_VERSION ? print_margin+10+"px" :"10px";
const iconSize3 = "45px";
const iconStyle3 = { width: iconSize3, height: iconSize3, verticalAlign: 'middle', position: "absolute", left:marginY, top: marginX };
const iconStyle4 = { width: iconSize3, height: iconSize3, verticalAlign: 'middle', position: "absolute", left: marginY, bottom: marginX };
const iconStyle5 = { width: iconSize3, height: iconSize3, verticalAlign: 'middle', position: "absolute", right: marginY, top: marginX };
const iconStyle6 = { width: iconSize3, height: iconSize3, verticalAlign: 'middle', position: "absolute", right: marginY, bottom: marginX };
const iconStyle7 = { width: "60px", height: "60px", verticalAlign: 'middle', opacity: "1" };
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

const TrackerCard = React.forwardRef(({ iconType, color, backgroundImg = processing_background, hundred = false }, ref) => {
    const formattedColor = convertColor(color);
    console.log(formattedColor)
    const darkenedColor = darken(0.63, formattedColor);
    console.log(darkenedColor)
    return (
        <TrackerContainer ref={ref} color={darkenedColor} backgroundImg={backgroundImg}>
 <FadeBackground>
            <Row>

                <LeftColumn>
                    <IconLarge type={iconType} style={iconStyle3}></IconLarge>
                    <IconLarge type={iconType} style={iconStyle4}></IconLarge>
                    <IconLarge type={iconType} style={iconStyle5}></IconLarge>
                    <IconLarge type={iconType} style={iconStyle6}></IconLarge>
                    {Array.from({ length: 10 }, (_, i) => (
                        <NumberBox key={i} color={color}>{i}</NumberBox>
                    ))}
                </LeftColumn>
                <CenterColumn>
                <br></br>
                <br></br>
                    <IconLarge type={iconType}></IconLarge>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <IconLarge type={iconType}></IconLarge>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <IconLarge type={iconType}></IconLarge>
                </CenterColumn>
                <RightColumn>
                    {Array.from({ length: 10 }, (_, i) => (
                        <NumberBox key={i} color={color}>{(hundred ? 100 + i * 10 : i * 10)}</NumberBox>
                    ))}
                </RightColumn>
            </Row>
            </FadeBackground>
        </TrackerContainer>
    );
});





const BacksideContainer = styled(CardContainer)`
background: url('${background_backside_main}') ;
background-size: 80% 80%;
background-origin: content-box;
background-repeat: round;
`;



const BackCard = React.forwardRef(({ }, ref) => {
    return (
        <BacksideContainer ref={ref} >


        </BacksideContainer>
    );
});

function DropdownComponent() {
    const [selectedOption, setSelectedOption] = useState('Default');
  
    useEffect(() => {
      if (!localStorage.getItem('PRINT_VERSION')) {
        localStorage.setItem('PRINT_VERSION', 'false');
      }
      if (!localStorage.getItem('MOBILE_CARDS')) {
        localStorage.setItem('MOBILE_CARDS', 'false');
      }
  
      const printVersion = localStorage.getItem('PRINT_VERSION') === 'true';
      const mobileCards = localStorage.getItem('MOBILE_CARDS') === 'true';
  
      if (printVersion) {
        setSelectedOption('Print');
      } else if (mobileCards) {
        setSelectedOption('Mobile');
      } else {
        setSelectedOption('Default');
      }
    }, []);
  
    const handleSelect = (event) => {
      setSelectedOption(event.target.value);
      
      switch (event.target.value) {
        case 'Default':
          localStorage.setItem('PRINT_VERSION', 'false');
          localStorage.setItem('MOBILE_CARDS', 'false');
          break;
        case 'Mobile':
          localStorage.setItem('PRINT_VERSION', 'false');
          localStorage.setItem('MOBILE_CARDS', 'true');
          break;
        case 'Print':
          localStorage.setItem('PRINT_VERSION', 'true');
          localStorage.setItem('MOBILE_CARDS', 'false');
          break;
        default:
          localStorage.setItem('PRINT_VERSION', 'false');
          localStorage.setItem('MOBILE_CARDS', 'false');
      }
      window.location.reload();
    };
  
    return (
      <select value={selectedOption} onChange={handleSelect}>
        <option value='Default'>Default</option>
        <option value='Mobile'>Mobile</option>
        <option value='Print'>Print</option>
      </select>
    );
  }