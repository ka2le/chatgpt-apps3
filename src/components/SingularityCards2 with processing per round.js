import React, { useEffect, useRef, useState } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { Grid, Paper, TextField, Button } from '@mui/material';
import styled from 'styled-components';
import { darken } from 'polished';
import img1 from '../images/singularitySprint/defence_robot.png';
import img2 from '../images/singularitySprint/v3/miner.jpg';
import img3 from '../images/singularitySprint/v3/gan.jpg';
import img4 from '../images/singularitySprint/v3/blixt.jpg';
import img5 from '../images/singularitySprint/v3/tower.png';
import img6 from '../images/singularitySprint/v3/drone.png';
import img7 from '../images/singularitySprint/v3/siri.png';
import img8 from '../images/singularitySprint/v3/vaccum.png';
import img9 from '../images/singularitySprint/v3/vpn.png';
import img10 from '../images/singularitySprint/v3/tree.png';
import img11 from '../images/singularitySprint/v3/wave.png';
import img12 from '../images/singularitySprint/v3/seer.png';
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
import space_black from '../images/singularitySprint/space_black.jpg';
import base_icon from '../images/singularitySprint/base_icon.png';
import base2 from '../images/singularitySprint/base2.png';
import base4 from '../images/singularitySprint/base4.png';
import base5 from '../images/singularitySprint/base5.png';
import base3 from '../images/singularitySprint/base3.png';
import animals from '../images/singularitySprint/animals.png';
import expansion2 from '../images/singularitySprint/expansion2.png';
import expansion_droid2 from '../images/singularitySprint/droid3.png';
import expansion_mix3 from '../images/singularitySprint/mix3.png';
import space2 from '../images/singularitySprint/space1.png';
import scoreIcon from '../images/singularitySprint/v3/score.png';
import scoreIcon2 from '../images/singularitySprint/score2.png';
import dataIcon from '../images/singularitySprint/v3/data.png';
import dataIcon2 from '../images/singularitySprint/data2.png';
import processingIcon from '../images/singularitySprint/v3/processing.png';
import processingIcon2 from '../images/singularitySprint/processing_3.png';
import background2 from '../images/singularitySprint/sci-fi-background.svg';
import background from '../images/singularitySprint/background2.svg';
import background_backside from '../images/singularitySprint/Backside.png';
import back_v3 from '../images/singularitySprint/back_v3_2.png';
import background_backside2 from '../images/singularitySprint/backside2.png';
import background_backside_main from '../images/singularitySprint/BackSide_Main.png';
import background_backside3 from '../images/singularitySprint/backside3.png';
import background_backside4 from '../images/singularitySprint/Backside4.jpeg';
import processing_background from '../images/singularitySprint/processing_background.svg';
import score_background from '../images/singularitySprint/score_background.svg';
import data_background from '../images/singularitySprint/data_background.svg';
import RegularFont from '../fonts/TitilliumWeb-Regular.ttf';
import BoldFont from '../fonts/TitilliumWeb-Bold.ttf';
import RegularFont2 from '../fonts/Orbit-Regular.ttf';
import RegularFont3 from '../fonts/DIGITALDREAM.ttf';


const version = "";
let PRINT_VERSION = localStorage.getItem('PRINT_VERSION') === 'true';
let MOBILE_CARDS = localStorage.getItem('MOBILE_CARDS') === 'true';
let BRIDGE_VERSION = MOBILE_CARDS ? false : false;
const bridge_width = "57mm";
const bridge_height = "89mm";
const poker_width = "63mm";
const poker_height = MOBILE_CARDS ? "63mm" : "88mm";
const print_margin = 18;
const default_padding = "0px";
const default_font_size = MOBILE_CARDS ? "17px" : "12px";
const default_cost_font_size = MOBILE_CARDS ? "17px" : "11px";
const default_title_size = MOBILE_CARDS ? "15px" : "9px";
const default_number_size = MOBILE_CARDS ? "18px" : "13px";
const default_img_size = !MOBILE_CARDS ? BRIDGE_VERSION ? "95%" : "98%" : "60%";
const default_action_size = !MOBILE_CARDS ? BRIDGE_VERSION ? "37%" : "36%" : "66%";
const base_save_size = 2;
const save_size = MOBILE_CARDS ? base_save_size : PRINT_VERSION ? base_save_size : base_save_size;
const HIGH_CONTRAST_PERCENTAGE = "108%";
const BRIGHTNESS_ADJUSTMENT = 1.3;

const SIDE_MARGIN = 8;
const DEFAULT_LINE_HEIGHT = "14px";
const DEFAULT_FONT_WEIGHT = "400";
const BIRGHTER_FONT_COLOR = "#99ffff";


const Image = styled.img`
  position: absolute;
  object-fit: unset;  
  width: ${MOBILE_CARDS ? "74%" : "100%"} ;
  left: ${MOBILE_CARDS ? "13%" : "0%"};
  height: 100%;
  -webkit-mask-image: linear-gradient( to bottom, black 0%, black calc(100% - 40px), rgba(0,0,0,0.95) calc(100% - 32px), rgba(0,0,0,0.25) calc(100% - 22px), rgba(0,0,0,0.1) calc(100% - 10px),transparent 100%);
  
`;
const DuplicateImage = styled(Image)`
  position: absolute;
  width: calc(100% + 22px); 
  height: calc(100% + 10px); 
  z-index: 0; 
  opacity: 1; 
  top: -8px; 
  left: -11px; 
  filter: blur(2px); 
  -webkit-mask-image: linear-gradient( to bottom, black 0%, black calc(100% - 40px), rgba(0,0,0,0.4) calc(100% - 32px), rgba(0,0,0,0.1) calc(100% - 22px), rgba(0,0,0,0.0) calc(100% - 10px),transparent 100%);
`;

const baseActions = [{
  "title": "Data Accumulation",
  "details": "+10 Data per 20 \ntotal data and score",
},
{
  "title": "Create Synthetic Data",
  "details": "+1 Data per Score"
}, {
  "title": "Processing Optimization",
  "details": "+10 processing per current Round number "
},

{
  "title": "Data Conversion",
  "details": "+10 Score per 20 Data spent",
  "cost": "All Data  min 20"
}, {
  "title": "Processing Leveraging",
  "details": "+10 Data per 10 Processing spent",
  "cost": "All Processing min 10"
}, {
  "title": "Cost actions give Score",
  "details": "Any Cost action also gives +4 Score"
},
{
  "title": "Mulligan",
  "details": "Once per game, at the start of any round, discard hand and draw the same amount of cards"
},
];

const roundEvents = [
  {
    "title": "Start of Round 2, 3 and 4",
    "details": "Players may discard 1 card to opponents <br> discard pile and draw 1 new card"
  },

  {
    "title": "Start of Round 5",
    "details": "Both players get +30 processing"
  },
  {
    "title": "Start of Round 6",
    "details": "Both players reveal their hands"
  },
  {
    "title": "Start of Round 7",
    "details": "Both players may discard 1 card to the opponent's pile to take 1 card from their own discard pile",
    
  },
  {
    "title": "Start of Round 8",
    "details": "No more Card Draws from now on"
  },
  {
    "title": "Start of Round 10",
    "details": "Both players may give +8 score to opponent to take 1 card from opponents discard pile"
  },
  {
    "title": "Start of Round 10",
    "details": "Both players may give +8 score to opponent to take 1 card from opponents discard pile"
  },
  {
    "title": "Start of Round 9",
    "details": "One player may Declare Swap: Opponent gains +8 score both players exchange cards no take-backs"
  },
];

const rules = [
  {
    "title": "Winning",
    "details": "After 10 \nrounds, the player with the highest score wins"
  },
  {
    "title": "Setup",
    "details": "Players start with 20 data 0 processing and 0 score <br>  Shuffle cards draw 4 cards each"

  },

  {
    "title": "How To Play",
    "details": `Both players play 10 \nsimultaneous rounds. For details see "Round Order" <br> 
    To play a Cost action you must be able to pay, "All" costs always cost all even if they have "per 10" in the actions. <br>  <br> After playing a cost action always +10 score <br> 
    
    `
  },

];


const roundRules = [
  {
    "title": "1",
    "details": "Round Events Trigger"
  },
  {
    "title": "2",
    "details": `Players place one card face down <br>  Declare chosen "Free", "Cost" or "Base" action and reveal cards simultaneously`

  },
  {
    "title": "3",
    "details": "Resolve played Cards Actions based on state before actions"

  },
  {
    "title": "4",
    "details": "Place discaded cards in separate rows, one for each player, in order played. Discaded cards for base actions goes to opponents discard pile"

  },
  {
    "title": "5",
    "details": "Resolve any Costs payments and then their Refunds"
  },
  {
    "title": "6",
    "details": "Resolve any Delayed Actions"
  },
  {
    "title": "7",
    "details": "Draw 1 new card"
  }

  // {
  //   "title": "Round order",
  //   "details": `1 . Round Events trigger <br> 
  //   2 . Both players place one card face down. <br> 
  //   3 . Declare action and reveal cards simultaneously <br>   
  //   4 . Resolve in order  ACTIONS > COST > REFUND > DELAYED ACTIONS <br> 
  //   5 . Draw 1 new card  `
  // },

];

const initialCards =[
  {
    "img": "https://cdn.midjourney.com/c2691f20-d825-4d17-9c7a-785a0a993622/0_0.png",
    "title": "Data Protection",
    "action1": "Activate Security Protocol",
    "details1": "For the next 2 \nrounds, no players card can affect their opponent",
    "action2": "Disable Firewall",
    "details2": "+30 score in 2 \nmore round",
    "cost": "50 data",
    "id": "1",
    "type": "hc"
  },
  {
    "img": "/chatgpt-apps3/static/media/miner.420d71acefb95e6f2e83.jpg",
    "title": "Data Mining",
    "action1": "Test Linear Regression",
    "details1": "Loan 30 data pay back up to 30 data in 3 \nrounds\n",
    "action2": "Learn Deeply",
    "details2": "Move top 5 cards from opponents discard pile to yours ",
    "cost": "20 data or 30 processing",
    "id": "2",
    "type": "base"
  },
  {
    "img": "https://cdn.midjourney.com/8591cbcc-d583-486a-b096-cbb54c34b841/0_0.png",
    "title": "Reinforcement Learning",
    "action1": "Explore Greedily",
    "details1": "Both players lose up to 20 data each\n",
    "action2": "Predict Q Values",
    "details2": "+10 score per card in your discard pile",
    "cost": "100 processing",
    "id": "3",
    "type": "base"
  },
  {
    "img": "https://cdn.midjourney.com/e02d4399-92d4-4780-ab6a-a4e69691ffd7/0_0.png",
    "title": "Supervised Learning",
    "action1": "Calibrate Reward Parameters",
    "details1": "+20 data per card in your discard pile with \"Data\" in its name",
    "action2": "Outsource Labeling",
    "details2": "Competition: Player with most Score after 3 \nmore rounds get +30 score",
    "cost": "10 Data or 10 processing",
    "id": 4,
    "type": "base"
  },
  {
    "img": "https://cdn.midjourney.com/a67a7f7f-c762-4af6-83f5-0fc64f267eb2/0_0.webp",
    "title": "Quantum Computing",
    "action1": "Get Quantum Entangled",
    "details1": "Next time opponent gain data gain same amount of data as opponent during that round",
    "action2": "Enable Quantum Supremacy",
    "details2": "Copy any cost action in your discard pile",
    "cost": "Card cost",
    "id": 5,
    "type": "hc"
  },
  {
    "img": "https://cdn.midjourney.com/09392dd9-7fd8-4882-8904-f9854f98e0ed/0_0.webp",
    "title": "Swarm Intelligence",
    "action1": "Apply swarm solutions",
    "details1": "+20 processing per card difference between discard piles",
    "action2": "Release the Swarm",
    "details2": "For each of your Delayed cards you may Delay or Advance them 1 , 2 or 3 rounds",
    "cost": "20 data or 10 processing",
    "id": 6,
    "type": "hc"
  },
  {
    "img": "https://cdn.midjourney.com/d22dba27-cc34-49ee-bc4a-a29cbc66142f/0_0.png",
    "title": "Tensor Processing Unit",
    "action1": "Select optimizer algorithm",
    "details1": "For each of you Delayed cards you may Delay or Advance them 1 round",
    "action2": "Multiply the Matrix",
    "details2": "Steal up to as much data from opponent as processing spent",
    "cost": "All processing",
    "id": 7,
    "type": "base"
  },
  {
    "img": "/chatgpt-apps3/static/media/gan.c7a1131628c7e0ddca44.jpg",
    "title": "FontSGenerative Adversarial Network",
    "action1": "Deceive Discriminator",
    "details1": "Steal 10 data from opponent",
    "action2": "Begin Zero-Sum Game",
    "details2": "Competition: The player with the most processing after 3 \nmore rounds gets +30 score",
    "cost": "10 Data or 20 processing",
    "id": 8,
    "type": "hc"
  },
  {
    "img": "https://cdn.midjourney.com/f58a0612-0df7-428d-ab04-48509b54bc4f/0_0.webp",
    "title": "Computer Vision",
    "action1": "Detect objects",
    "details1": "Next round you get double processing from all actions affecting you",
    "action2": "Tune model",
    "details2": "Competition: The player with highest reached data starting now get +30 score at end of game",
    "cost": "20 Data  or 30 processing",
    "id": "9",
    "type": "base"
  },
  {
    "img": "https://cdn.midjourney.com/fa3f2293-32d8-497c-8e6d-6750afb5e420/0_2.png",
    "title": "Recurrent Neural Network",
    "action1": "Recall Long Short-Term Memory",
    "details1": "Copy any free action in your discard pile",
    "action2": "Backpropagate errors",
    "details2": "Reveal a card from your hand and play its cost action",
    "cost": "Card Cost",
    "id": "10",
    "type": "base"
  },
  {
    "img": "https://cdn.midjourney.com/1fb7c52f-7c2d-4447-84c0-dfce4bc36fe4/0_0.webp",
    "title": "Hacker",
    "action1": "security by obscurity",
    "details1": "Take all data gained by opponent this round ",
    "action2": "Hire the hacker",
    "details2": "Steal up to 20 score from opponent",
    "cost": "40 data or 50 processing",
    "id": 11,
    "type": "hc"
  },
  {
    "img": "https://cdn.midjourney.com/fd140395-3f76-4f12-9a4c-2e272b6c4c64/0_0.webp",
    "title": "Data Scientist",
    "action1": "Paus Ethically",
    "details1": "In 2 \nrounds, no score can be gained for either player",
    "action2": "Apply for Grant",
    "details2": "Your next cost action played is free, as if all costs were paid ",
    "cost": "30 data or 30 processing",
    "id": 12,
    "type": "base"
  },
  {
    "img": "https://cdn.midjourney.com/8d6d4227-7f21-4296-b0a6-30af2190686e/0_0.webp",
    "title": "Data Center",
    "action1": "Establish redundancy",
    "details1": "Play any base action but put this card in your discard pile",
    "action2": "Provide Storage",
    "details2": "+20 score per 30 Data spent",
    "cost": "All data",
    "id": 15,
    "type": "base"
  },
  {
    "img": "/chatgpt-apps3/static/media/blixt.1e43ccc8de62f427e69b.jpg",
    "title": "CPU Voltage Spike",
    "action1": "Accidentally Overclock",
    "details1": "Both players change 20 data closer to 40 data",
    "action2": "Overload game",
    "details2": "Both players put their hand back in the draw pile, reshuffle before drawing",
    "cost": "20 data or 20 processing",
    "id": 17,
    "type": "base"
  },
  {
    "img": "https://cdn.midjourney.com/7da199d0-a7e6-4710-a110-187fab80a489/0_1.webp",
    "title": "Neural Network",
    "action1": "Select optimizer algorithm",
    "details1": "+10 data per total 20 data of both players",
    "action2": "Add deep layers",
    "details2": "+20 score per 30 Data spent",
    "cost": "All data",
    "id": 18,
    "type": "base"
  },
  {
    "img": "https://cdn.midjourney.com/2094539a-a581-4086-9e5a-3c1ddd89a1ce/0_3.webp",
    "title": "Genetic Algorithms",
    "action1": "Mutate Variables",
    "details1": "+10 score but next round you have to play a basic action",
    "action2": "Evolve Sequence",
    "details2": "+10 score per 20 processing spent",
    "cost": "All processing",
    "id": 20,
    "type": "hc"
  },
  {
    "img": "https://cdn.midjourney.com/94ec55fb-027b-4184-a96c-c16f0ea6a258/0_3.png",
    "title": "Cloud Computing",
    "action1": "Provide Service as a service",
    "details1": "",
    "action2": "Host Everyone",
    "details2": "",
    "cost": "",
    "id": "26",
    "type": "v2"
  },
  {
    "img": "https://cdn.midjourney.com/1089bf1f-e0ee-4f00-b9c4-73301f0d99d3/0_2.webp",
    "title": "Data Encryption",
    "action1": "Reverse the Hash",
    "details1": "Trigger all delayed Cards this round",
    "action2": "Imitate the game",
    "details2": "Next round, both players also get the result of their opponents action ",
    "cost": "30 data or 30 processing",
    "id": "27",
    "type": "v2"
  },
  {
    "img": "https://cdn.midjourney.com/ce7a068b-e03e-4893-82e7-378a5116ee19/0_1.webp",
    "title": "Cyborg",
    "action1": "Ascend Humanity",
    "details1": "+10 processing per 10 processing you have more than opponent",
    "action2": "Assemble the AI-Team",
    "details2": "All delayed cards in opponents discard move to yours and their targets flipped",
    "cost": "40 data or 40 processing",
    "id": "30",
    "type": "hc"
  },
  {
    "img": "https://cdn.midjourney.com/7a0a97c8-4b58-46be-8449-2f40d64e62cf/0_3.png",
    "title": "Blockchain",
    "action1": "Pump and dump",
    "details1": "Delay all delayed Cards another 2 \nrounds ",
    "action2": "Hodl",
    "details2": "No player can spend data or processing during the next 2 \nrounds",
    "cost": "30 data",
    "id": "31",
    "type": "v2"
  },
  {
    "img": "/chatgpt-apps3/static/media/tower.5c61c3eeabffa5daa77b.png",
    "title": "5G Network",
    "action1": "Connect remotely",
    "details1": "Next round all Data gain is doubled for both players",
    "action2": "Roll over data",
    "details2": "+30 score per 40 Data spent ",
    "cost": "All Data",
    "id": "34",
    "type": "v2"
  },
  {
    "img": "https://cdn.midjourney.com/22d4754f-4c13-497d-a8fb-dad9d8523cb3/0_2.png",
    "title": "Self Driving Car",
    "action1": "Break for bag",
    "details1": "No processing can be gained this round",
    "action2": "Navigate autonomously",
    "details2": "For each of your Delayed cards you may Delay or Advance them 1 , 2 or 3 rounds",
    "cost": "20 data or 10 processing",
    "id": "38",
    "type": "hc"
  },
  {
    "img": "https://cdn.midjourney.com/553dcd0f-4029-4a32-9b8e-4b57f1c186f3/0_1.png",
    "title": "Virtual Reality",
    "action1": "Ready Player One",
    "details1": "+20 processing In 3 \nrounds trigger this action again",
    "action2": "Enter Matrix ",
    "details2": "Swap 1 card in hand with 1 card in any discard pile, blocking delayed actions on that card",
    "cost": "10 data or 10 processing",
    "id": "39",
    "type": "v2"
  },
  {
    "img": "https://cdn.midjourney.com/2ee5ec12-694f-469d-bb7f-0f4e9fccfc57/0_1.webp",
    "title": "Industrial Automation",
    "action1": "Assemble Selectively and Comply",
    "details1": "+20 data if you have less data than opponent \n",
    "action2": "Pick and Place",
    "details2": "Competition: +30 score to player with most cards in their discard pile after last round",
    "cost": "20 data",
    "id": "41",
    "type": "hc"
  },
  {
    "img": "https://cdn.midjourney.com/93e53cee-c8c9-4eea-98c3-bd22211979db/0_1.webp",
    "title": "SuperComputer",
    "action1": "Benchmark LINPACK",
    "details1": "Set your data to 30",
    "action2": "Achieve petaflop",
    "details2": "60 score",
    "cost": "90 data",
    "id": "43",
    "type": "hc"
  },
  {
    "img": "/chatgpt-apps3/static/media/drone.d6866ec281a2e31b7d4d.png",
    "title": "Unmanned Aerial Vehicles",
    "action1": "Loop in the human",
    "details1": "Next round, also copy the free action of the card you play",
    "action2": "Strike Signature",
    "details2": "Both players loose half their data",
    "cost": "",
    "id": "46",
    "type": "v2"
  },
  {
    "img": "/chatgpt-apps3/static/media/siri.294b839874cae4456ae2.png",
    "title": "Digital Assistant",
    "action1": "Set timer",
    "details1": "+30 processing per card in your discard pile with \"Data\" in its name",
    "action2": "Record secretly",
    "details2": "Set your totalt data to the same amount that your opponent have",
    "cost": "40 data or 40 processing",
    "id": "47",
    "type": "v2"
  },
  {
    "img": "/chatgpt-apps3/static/media/vaccum.501d3a55ab7c826d6a7e.png",
    "title": "Robot vacuum",
    "action1": "Map home",
    "details1": "For each of you Delayed cards you may Delay or Advance them 1 round",
    "action2": "Clean floors",
    "details2": "Reveal 1 card change all data and processing to the other on both actions and cost, for rest of game",
    "cost": "20 data",
    "id": "49",
    "type": "v3"
  },
  {
    "img": "https://cdn.midjourney.com/d286efee-1e5d-49be-a0d4-96a09fed0a37/0_0.png",
    "title": "Non Player Character",
    "action1": "Follow Path",
    "details1": "+30 data if you have more cards in your discard pile ",
    "action2": "Adjust difficulty",
    "details2": "Next round you get double data and processing from all actions affecting you",
    "cost": "30 data or 30 processing",
    "id": "50",
    "type": "v3"
  },
  {
    "img": "/chatgpt-apps3/static/media/vpn.d72c4efcc9f1c885ce2d.png",
    "title": "Virtual Private Network ",
    "action1": "Tunnel TV",
    "details1": "+30 processing",
    "action2": "Trick tyrant",
    "details2": "In 3 \nrounds, pick one of +80 data <br> or +30 score",
    "cost": "50 data",
    "id": "51",
    "type": "v3"
  },
  {
    "img": "https://cdn.midjourney.com/0b858164-a9eb-4590-9daf-d2a945f56404/0_1.png",
    "title": "Firewall",
    "action1": "Block incoming traffic ",
    "details1": "+10 score if you have more score than opponent",
    "action2": "Disable \"temporarily\"",
    "details2": "Competition: Any player with \"Data Protection\" in their discard pile at game end get +30 score",
    "cost": "20 data",
    "id": "53",
    "type": "v3"
  },
  {
    "img": "/chatgpt-apps3/static/media/tree.57ad537fdab3bf9b9019.png",
    "title": "Decision Tree",
    "action1": "Plant root node",
    "details1": "Decide now: delay your next rounds action by 1 or 2 rounds",
    "action2": "Prune leaf",
    "details2": "Reveal 1 \ncard from hand and play the free action of that card 2\ntimes\n",
    "cost": "20 data",
    "id": "54",
    "type": "v3"
  },
  {
    "img": "/chatgpt-apps3/static/media/wave.faa8981834be144fedec.png",
    "title": "Natural Language Processing",
    "action1": "Pre-train generative transformer",
    "details1": "Block all delayed cards that trigger this round, blocked cards go to your discard pile",
    "action2": "Tokenize world",
    "details2": "+30 processing per 20 data spent",
    "cost": "All data",
    "id": "55",
    "type": "v3"
  },
  {
    "img": "/chatgpt-apps3/static/media/seer.0f5038bfff94f4cffd5a.png",
    "title": "Recommender System",
    "action1": "Continue watching and don't ask again",
    "details1": "+30 data and in 3 \nrounds opponent also <br> gain +30 data",
    "action2": "Filter presidents ",
    "details2": "Swap Data with opponent",
    "cost": "60 processing",
    "id": "58",
    "type": "v3"
  },
  {
    "img": "https://cdn.midjourney.com/450d6cf6-4d08-4c12-b762-d7fc493ac25d/0_0.png",
    "title": "Robot dog - Sparky",
    "action1": "Fetch Algorithm",
    "details1": "",
    "action2": "Bite Encryption",
    "details2": "",
    "cost": "",
    "id": "76",
    "type": "animals"
  }
]

const mergeArrayObjects = (ids, fullArray, detailsArray) => {
  return ids.map((id, index) => {
    console.warn(id, index)

    const fullObject = fullArray.find(item => item.id == id);
    const detailsObject = detailsArray[index];
    console.warn("fullObject", fullObject, "detailsObject", detailsObject)
    // Assuming detailsArray has a straightforward structure to extract 'details1', 'details2', and 'cost'
    // If the structure is different, adjust the extraction logic accordingly
    if (fullObject && detailsObject) {
      return {
        ...fullObject,
        details1: detailsObject.details1,
        details2: detailsObject.details2,
        cost: detailsObject.cost
      };
    }
    // Return null or any suitable value if no matching id is found or if detailsObject does not exist

  }).filter(item => item !== null); // This will filter out any null values if a match wasn't found
};


const TextAreaWithDynamicHeight = ({ title, keyProp, value, onChange, onBlur }) => {
  const [localValue, setLocalValue] = useState(value);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      const currentElement = textareaRef.current;
      currentElement.style.height = 'auto';
      currentElement.style.height = `${currentElement.scrollHeight}px`;
    }
  }, [localValue]);

  return (
    <textarea
      ref={textareaRef}
      onBlur={() => onBlur(title, keyProp, localValue)}
      style={{ fontSize: '10px', overflowY: 'hidden', resize: 'none', width: '96%' }}
      value={localValue}
      onChange={(e) => {
        setLocalValue(e.target.value);
        onChange(title, keyProp, e);
      }}
    />
  );
};

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


  const handleBlur = (title, key, updatedValue) => {
    setCards(prevCards => {
      const newCards = [...prevCards];
      const cardIndex = newCards.findIndex(card => card.title === title);
      if (cardIndex !== -1) {
        newCards[cardIndex][key] = updatedValue;
      }
      return newCards;
    });
    setTextAreaValue(JSON.stringify(cards, null, 2));  // Update main textarea value
    saveToLocalStorage(cards);
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
      cost: "",
      type: "v3",
      id: initialCards.lenght,
    };
    const newCards = [...cards, newCard];
    setCards(newCards);

    setTextAreaValue(JSON.stringify(newCards, null, 2));
  };
  const saveToLocalStorage = (cards) => {
    localStorage.setItem('singularityCards2', JSON.stringify(cards));
  };

  const loadFromLocalStorage = () => {
    const storedCards = localStorage.getItem('singularityCards2');
    return storedCards ? JSON.parse(storedCards) : initialCards;
  };

  const [cards, setCards] = useState(loadFromLocalStorage);
  const [textAreaValue, setTextAreaValue] = useState(JSON.stringify(cards, null, 2));
  const [currentCard, nextCard, prevCard] = useCurrentCard(cards);

  const [showCardTextAreas, setShowCardTextAreas] = useState(localStorage.getItem('showCardTextAreas') !== null ? JSON.parse(localStorage.getItem('showCardTextAreas')) : true);
  const [card, setCard] = useState(cards[currentCard])
  const cardRefs = cards.map(() => React.createRef());
  const [cardRef, saveAsImage] = useSave(card.title);
  const [baseActionsRef, saveBaseActions] = useSave("BaseActions");
  const [RoundEventRef, saveRoundEvents] = useSave("RoundEvents");
  const [RoundNumberCardRef, saveRoundNumberCard] = useSave("RoundNumberCard");
  const [GeneralRulesRef, saveGeneralRulesRef] = useSave("GeneralRules");
  const [RoundOrderRef, saveRoundOrderRef] = useSave("RoundOrder");
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
      await saveAll(cards[i].id, cards[i].title);  // Assuming cards[i].id is unique
      // Giving some time for the card change to take effect
      await new Promise((resolve) => setTimeout(resolve, 1));
    }
  };


  const toggleCardTextAreas = () => {
    setShowCardTextAreas(prevState => {
      const newState = !prevState;
      localStorage.setItem('showCardTextAreas', JSON.stringify(newState));
      return newState;
    });
  };


  // Step 1: Extract unique types
  const uniqueTypes = [...new Set(cards.map(card => card.type))];

  // Step 2: Maintain state
  const [checkedTypes, setCheckedTypes] = useState({});

  // Step 5: Load from LocalStorage
  useEffect(() => {
    const storedChecks = localStorage.getItem('checkedTypes');
    console.log(checkedTypes)
    const parsedChecks = storedChecks ? JSON.parse(storedChecks) : {};
    const initialChecks = {};

    uniqueTypes.forEach(type => {
      initialChecks[type] = parsedChecks.hasOwnProperty(type) ? parsedChecks[type] : true;
    });

    setCheckedTypes(initialChecks);
  }, []);
  // Step 5: Save to LocalStorage whenever state changes
  const handleCheckboxChange = (type) => {
    const newCheckedTypes = {
      ...checkedTypes,
      [type]: !checkedTypes[type]
    };

    // Save to LocalStorage here
    localStorage.setItem('checkedTypes', JSON.stringify(newCheckedTypes));

    setCheckedTypes(newCheckedTypes);
  };



  return (
    <Grid container spacing={0} style={{ height: '100%', margin: 0, padding: 0 }}>



      <Grid container item xs={12} spacing={2}>
        {/* Row 1 */}
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <label><b>Types: </b></label>
            {uniqueTypes.map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  style={{ "textTransform": "capitalize" }}
                  checked={checkedTypes[type] || false}
                  onChange={() => handleCheckboxChange(type)}
                />
                {type}
              </label>
            ))}
          </Grid>
        </Grid>

        <Grid container item xs={12}>

          <Grid item xs={12}>
            <label><b>Card Format: </b></label>
            <DropdownComponent />
          </Grid>
        </Grid>

        {/* Row 2 */}
        <Grid container item xs={12}>
          <label><b>Save: </b></label>
          <Grid item xs={4}>
            <button onClick={saveAsImage}>Save as Image</button>
          </Grid>
          <Grid item xs={4}>
            <button onClick={saveAllCards}>Save All Cards</button>
          </Grid>
          <Grid item xs={4}>
            <DownloadCSVButton dataArray={initialCards} fileName="ss_import.csv" />
          </Grid>

        </Grid>

        {/* Row 3 */}
        <Grid container item xs={12} spacing={1}>
          <button onClick={saveBaseActions}>Save Base Rules</button>
          <button onClick={saveRoundEvents}>Save Round Events</button>
          <button onClick={saveRoundNumberCard}>Save Round Number Card</button>
          <button onClick={saveGeneralRulesRef}>Save General Rules</button>
          <button onClick={saveRoundOrderRef}>Save Round Order</button>
          {['1', '2', '3', '11', '22', '33'].map((tracker, index) => (
            <Grid item xs={4} sm={2} key={index}>
              <button onClick={() => window[`saveTracker${tracker}`]}>Save Tracker{tracker}</button>
            </Grid>
          ))}
          <Grid item xs={12} sm={4}>
            <button onClick={saveBackside}>Save Backside</button>
          </Grid>
        </Grid>

        {/* Row 4 */}
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <label><b>Single Card Edits: </b></label>
            <button onClick={toggleCardTextAreas}>
              {showCardTextAreas ? "Hide Card Edit" : "Show Card Edit"}
            </button>
          </Grid>

        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            <button onClick={handleCopy}>Copy</button>
          </Grid>
          <Grid item xs={3}>
            <button onClick={handlePaste}>Paste</button>
          </Grid>
          <Grid item xs={3}>
            <button onClick={handleAddCard}>Add Card</button>
          </Grid>
          <Grid item xs={3}>
            <button onClick={handleReset}>Reset</button>
          </Grid>
        </Grid>
        <br></br>
        <br></br>
        <br></br>
      </Grid>
      <br></br>
      <br></br>


      <BaseRulesCard ref={baseActionsRef}></BaseRulesCard>
      <RoundEventCard ref={RoundEventRef}></RoundEventCard>
      <RulesCard ref={GeneralRulesRef}></RulesCard>
      <RoundRulesCard ref={RoundOrderRef}></RoundRulesCard>
      <RoundNumberCard ></RoundNumberCard>
      {cards.map((card, index) => (
        checkedTypes[card.type] ? (
          <div key={index}>
            <Card
              ref={cardRefs[index]}
              imgUrl={card.img}
              cardTitle={card.title}
              action1={card.action1}
              details1={card.details1}
              action2={card.action2}
              details2={card.details2}
              cost={card.cost}
              type={card.type}
              id={card.id}
            />

            {showCardTextAreas && (

              <div>

                <br></br>
                {Object.entries(card).map(([key, value]) => (
                  <div key={key} style={{ fontSize: '10px' }}>
                    <label style={{ textTransform: 'capitalize', display: 'block' }}>{key}:</label>
                    <TextAreaWithDynamicHeight
                      title={card.title}
                      keyProp={key}
                      value={value}
                      onChange={() => { }}
                      onBlur={handleBlur}
                    />
                  </div>
                ))}
                <br></br>
              </div>

            )}
          </div>
        ) : null
      ))}

      <Grid container item xs={12}>
        <Grid item xs={3}>
          <button onClick={handleCopy}>Copy</button>
        </Grid>
        <Grid item xs={3}>
          <button onClick={handlePaste}>Paste</button>
        </Grid>
        <Grid item xs={3}>
          <button onClick={handleAddCard}>Add Card</button>
        </Grid>
        <Grid item xs={3}>
          <button onClick={handleReset}>Reset</button>
        </Grid>
      </Grid>
      <Grid item xs={12} >
        <textarea
          value={textAreaValue}
          onChange={handleTextAreaChange}
          rows="24"
          cols="50"
        /><br></br>



      </Grid> {/* Button to save all cards */}
      <Grid item xs={12} >
        <Card
          ref={cardRef}
          imgUrl={card.img}
          cardTitle={card.title}
          action1={card.action1}
          details1={card.details1}
          action2={card.action2}
          details2={card.details2}
          cost={card.cost}
          type={card.type}
          id={card.id}
        ></Card>
        <Grid container item xs={12}>
          <Grid item xs={6}>
            <button onClick={nextCard}>Next Card</button>
          </Grid>
          <Grid item xs={6}>
            <button onClick={prevCard}>Prev Card</button>
          </Grid>
        </Grid>
      </Grid>
      <BackCard ref={backsideRef}></BackCard>

      <TrackerCard ref={trackerRef1} iconType="processing" backgroundImg={processing_background} color="93,250,162" />
      <TrackerCard ref={trackerRef11} iconType="processing" backgroundImg={processing_background} color="93,250,162" hundred={true} />
      <TrackerCard ref={trackerRef2} iconType="score" backgroundImg={score_background} color="249,242,172" />
      <TrackerCard ref={trackerRef22} iconType="score" backgroundImg={score_background} color="249,242,172" hundred={true} />
      <TrackerCard ref={trackerRef3} iconType="data" backgroundImg={data_background} color="255,127,219" />
      <TrackerCard ref={trackerRef33} iconType="data" backgroundImg={data_background} color="255,127,219" hundred={true} />
      <Table data={cards} setData={setCards} setTextAreaValue={setTextAreaValue} />
    </Grid>

  );
};
export default SingularityCards;

function CardActions({ title, details, cost = null, thin = false }) {
  const detailsComponents = textToComponents(details);
  const costComponents = cost ? textToComponents("Cost: " + cost) : null;
  const index = Math.floor(Math.random() * 100000000);
  return (
    <CardText key={index} height={(cost == null || thin) ? "0px" : "52px"}>
      {!MOBILE_CARDS && <TextTitle>{"" + title}</TextTitle>}
      {(cost) && <><Cost>{costComponents}</Cost>
        <Details2>{detailsComponents}</Details2></>
      }
      {(!cost) && <>
        <Details>{detailsComponents}</Details></>
      }

    </CardText>
  );
};
const Table = ({ data, setData, setTextAreaValue }) => {
  const onCellClick = useCellSwap();
  const onIdClick = useIdSwap();

  const handleUpdate = () => {
    const newJson = JSON.stringify(data, null, 2);
    setTextAreaValue(newJson);
    setData(data);
  };

  useEffect(() => {
    // Reorder based on ID whenever data changes
    const sortedData = [...data].sort((a, b) => parseInt(a.id) - parseInt(b.id));
    const newJson = JSON.stringify(sortedData, null, 2);
    //setTextAreaValue(newJson);
    // setData(sortedData);
  }, [data]);

  return (
    <div>
      <button onClick={handleUpdate}>Update</button>
      <table style={{ width: "100%" }}>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Details 1</th>
          <th>Details 2</th>
          <th>Cost</th>
        </tr>
        {data.map((item, i) => (
          <tr key={i}>
            <EditableCell
              value={item.id}
              onChange={newValue => {
                const newData = [...data];
                newData[i].id = newValue;
                setData(newData);
              }}
              onCellClick={onIdClick}
            />
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
            <EditableCell
              value={item.cost}
              onChange={newValue => {
                const newData = [...data];
                newData[i].cost = newValue;
                setData(newData);
              }}
              onCellClick={onCellClick}
            />
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

const useIdSwap = () => {
  const [lastClickedId, setLastClickedId] = useState(null);

  const onIdClick = (cellContent, setCellContent) => {
    if (lastClickedId && lastClickedId.content !== cellContent) {
      setCellContent(lastClickedId.content);
      lastClickedId.setCellContent(cellContent);
      setLastClickedId(null);
    } else {
      setLastClickedId({ content: cellContent, setCellContent });
    }
  };

  return onIdClick;
};




const Card = React.forwardRef(({ imgUrl, cardTitle, action1, details1, action2, details2, cost, id = 1, type = "base" }, ref) => {
  let isStyledTitle = false;
  let title = cardTitle;
  const hideTitleIcon = true;
  const hideTypeImage = false;
  // check if cardTitle starts with 'FontS'
  if (cardTitle.startsWith('FontS')) {
    isStyledTitle = true;
    title = cardTitle.replace('FontS', ''); // remove 'FontS' from the beginning
  }
  useEffect(() => {
    // applyStretchEffect(`img-${id}`, 252,251,8,100)


  }, []);
  const iconImage = type == "base" ? base5 : type == "space" ? space2 : type == "animals" ? animals : type == "v2" ? expansion_droid2 : expansion_mix3;
  const colorcorrection =
    type == "base" ? "hue-rotate(165deg) saturate(4.9) brightness(2)" :
      type == "space" ? "hue-rotate(165deg) saturate(3.5) brightness(1)" :
        type == "animals" ? "hue-rotate(165deg) saturate(3.9) brightness(2)"
          : "hue-rotate(165deg) saturate(4.5) brightness(2.5)";
  return (
    <CardContainer id={`card-${id}`} ref={ref}>
      <FadeBackground>
        <InsideMargin>
          <TopHalf>
            <Border>
              <ImageContainer>
                <DuplicateImage src={imgUrl} />
                <Image style={{ filter: (type == "hc") ? "contrast(" + HIGH_CONTRAST_PERCENTAGE + ")" : null }} id={`img-${id}`} src={imgUrl} /> {/* Original Image */}
                <TitleWrapper>
                  {isStyledTitle ?
                    (<StyledTitle>{title}
                      {hideTitleIcon ? null : <TypeIconTitle colorcorrection={colorcorrection} src={iconImage}></TypeIconTitle>}
                    </StyledTitle>)
                    :
                    (<Title>{title}
                      {hideTitleIcon ? null : <TypeIconTitle colorcorrection={colorcorrection} src={iconImage}></TypeIconTitle>}
                    </Title>)}

                </TitleWrapper>
              </ImageContainer>
            </Border>
          </TopHalf>
          <BottomHalf>
            <CardActions key={id + "111"} title={action1} details={details1}></CardActions>
            <CardActions key={id + "222"} title={action2} details={details2} cost={cost}></CardActions>
          </BottomHalf>
          {hideTypeImage ? null : <TypeIcon colorcorrection={colorcorrection} src={expansion_mix3}></TypeIcon>}
          <CardId>#{id}</CardId>
        </InsideMargin>
      </FadeBackground>

    </CardContainer>
  );
});



const BaseRulesCard = React.forwardRef(({ id = -1, type = "base" }, ref) => {
  let isStyledTitle = false;
  let title = "Base Actions";
  const hideTitleIcon = true;
  const hideTypeImage = false;
  const baseImgUrl = "https://cdn.midjourney.com/6eae8834-ddee-419d-b39d-f5e461a52407/0_0.webp"
  const iconImage = type == "base" ? base5 : type == "space" ? space2 : type == "animals" ? animals : type == "v2" ? expansion_droid2 : expansion_mix3;
  const colorcorrection =
    type == "base" ? "hue-rotate(165deg) saturate(4.9) brightness(2)" :
      type == "space" ? "hue-rotate(165deg) saturate(3.5) brightness(1)" :
        type == "animals" ? "hue-rotate(165deg) saturate(3.9) brightness(2)"
          : "hue-rotate(165deg) saturate(4.5) brightness(2.5)";
  return (
    <CardContainer id={`card-${id}`} ref={ref}>
      <FadeBackground>

        <Border>
          <ImageContainerRules>
            <DuplicateImageRules src={baseImgUrl} />
            <ImageRules id={`img-${id}`} src={baseImgUrl} /> {/* Original Image */}
            <TitleWrapper>
              <TitleRules>Base Actions</TitleRules>
            </TitleWrapper>
          </ImageContainerRules>
        </Border>
        <br></br>
        <br></br>
        <CardActions key={id + "111"} title={baseActions[0].title} details={baseActions[0].details} ></CardActions>
        {/* <CardActions key={id + "222"} title={baseActions[1].title} details={baseActions[1].details}></CardActions> */}
        <CardActions key={id + "333"} thin={true} title={baseActions[2].title} details={baseActions[2].details} ></CardActions>
        <br></br>
        <CardActions key={id + "444"} thin={true} title={baseActions[3].title} details={baseActions[3].details} cost={baseActions[3].cost}></CardActions>
        <CardActions key={id + "555"} thin={true} title={baseActions[4].title} details={baseActions[4].details} cost={baseActions[4].cost}></CardActions>
        <br></br>

        {/* {<CardActions key={id + "5555"} title={baseActions[5].title} details={baseActions[5].details} ></CardActions>} */}
        <br></br>
      </FadeBackground>

    </CardContainer>
  );
});

const RoundEventCard = React.forwardRef(({ id = -1, type = "base" }, ref) => {
  let isStyledTitle = false;
  let title = "Base Actions";
  const hideTitleIcon = true;
  const hideTypeImage = false;
  const baseImgUrl = "https://cdn.midjourney.com/6eae8834-ddee-419d-b39d-f5e461a52407/0_0.webp"
  const iconImage = type == "base" ? base5 : type == "space" ? space2 : type == "animals" ? animals : type == "v2" ? expansion_droid2 : expansion_mix3;
  const colorcorrection =
    type == "base" ? "hue-rotate(165deg) saturate(4.9) brightness(2)" :
      type == "space" ? "hue-rotate(165deg) saturate(3.5) brightness(1)" :
        type == "animals" ? "hue-rotate(165deg) saturate(3.9) brightness(2)"
          : "hue-rotate(165deg) saturate(4.5) brightness(2.5)";
  return (
    <CardContainer id={`card-${id}`} ref={ref}>
      <FadeBackground>

        <Border>
          <ImageContainerRules>
            <DuplicateImageRules src={baseImgUrl} />
            <ImageRules id={`img-${id}`} src={baseImgUrl} /> {/* Original Image */}
            <TitleWrapper>
              <TitleRules>Round Events</TitleRules>
            </TitleWrapper>
          </ImageContainerRules>
        </Border>
        <br></br>
        <br></br>
        <CardActions key={id + "111"} title={roundEvents[0].title} details={roundEvents[0].details} ></CardActions>
        {/* <CardActions key={id + "222"} title={roundEvents[1].title} details={roundEvents[1].details}></CardActions> */}
        <br></br>
        <CardActions key={id + "332"} title={roundEvents[1].title} details={roundEvents[1].details}></CardActions>
        <CardActions key={id + "333"} title={roundEvents[2].title} details={roundEvents[2].details}></CardActions>
        <CardActions key={id + "444"} title={roundEvents[3].title} details={roundEvents[3].details} ></CardActions>
         <CardActions key={id + "555"} title={roundEvents[4].title} details={roundEvents[4].details} ></CardActions>
        {/* {<CardActions key={id + "555"} title={roundEvents[5].title} details={roundEvents[5].details} ></CardActions>}  */}
      </FadeBackground>

    </CardContainer>
  );
});


const RulesCard = React.forwardRef(({ id = -1, type = "base" }, ref) => {
  const baseImgUrl = "https://cdn.midjourney.com/6eae8834-ddee-419d-b39d-f5e461a52407/0_0.webp"
  return (
    <CardContainer id={`card-${id}`} ref={ref}>
      <FadeBackground>

        <Border>
          <ImageContainerRules>
            <DuplicateImageRules src={baseImgUrl} />
            <ImageRules id={`img-${id}`} src={baseImgUrl} /> {/* Original Image */}
            <TitleWrapper>
              <TitleRules>Rules</TitleRules>
            </TitleWrapper>
          </ImageContainerRules>
        </Border>
        <br></br>
        <br></br>
        <CardActions key={id + "111"} title={rules[0].title} details={rules[0].details} ></CardActions>
        <CardActions key={id + "222"} title={rules[1].title} details={rules[1].details}></CardActions>
        <br></br>
        <CardActions key={id + "333"} title={rules[2]?.title} details={rules[2]?.details}></CardActions>

        {/* <CardActions key={id + "555"} title={roundEvents[5].title} details={roundEvents[5].details} ></CardActions> */}
      </FadeBackground>

    </CardContainer>
  );
});

const RoundRulesCard = React.forwardRef(({ id = -1, type = "base" }, ref) => {
  const baseImgUrl = "https://cdn.midjourney.com/6eae8834-ddee-419d-b39d-f5e461a52407/0_0.webp"
  return (
    <CardContainer id={`card-${id}`} ref={ref}>
      <FadeBackground>

        <Border>
          <ImageContainerRules>
            <DuplicateImageRules src={baseImgUrl} />
            <ImageRules id={`img-${id}`} src={baseImgUrl} /> {/* Original Image */}
            <TitleWrapper>
              <TitleRules>Round Order</TitleRules>
            </TitleWrapper>
          </ImageContainerRules>
        </Border>
        <br></br>
        <br></br>
        <CardActions key={id + "111"} title={roundRules[0]?.title} details={roundRules[0].details} ></CardActions>
        <CardActions key={id + "222"} title={roundRules[1]?.title} details={roundRules[1].details}></CardActions>
        <CardActions key={id + "333"} title={roundRules[2]?.title} details={roundRules[2]?.details}></CardActions>
        <CardActions key={id + "333"} title={roundRules[3]?.title} details={roundRules[3]?.details}></CardActions>
        <CardActions key={id + "333"} title={roundRules[4]?.title} details={roundRules[4]?.details}></CardActions>
        <CardActions key={id + "333"} title={roundRules[5]?.title} details={roundRules[5]?.details}></CardActions>
        <CardActions key={id + "333"} title={roundRules[6]?.title} details={roundRules[6]?.details}></CardActions>

        {/* <CardActions key={id + "555"} title={roundEvents[5].title} details={roundEvents[5].details} ></CardActions> */}
      </FadeBackground>

    </CardContainer>
  );
});


const RoundNumberCard = React.forwardRef(({ id = -1, type = "base" }, ref) => {
  const baseImgUrl = "https://cdn.midjourney.com/904d2a5d-b514-4de1-8ce4-c6d5266758f6/0_0.webp"
  return (
    <CardContainer id={`card-${id}`} ref={ref}>

      <Border>
        <ImageContainerRules>
          <DuplicateRoundNumberImage src={baseImgUrl} />
          <RoundNumberImage id={`img-${id}`} src={baseImgUrl} />
          <RoundNumber>1</RoundNumber>
        </ImageContainerRules>
      </Border>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <CardActions key={id + "111"} title={""} details={roundEvents[0].details} ></CardActions>

    </CardContainer>
  );
});



const iconSize = "20px";
const iconStyle = { width: iconSize, height: iconSize, verticalAlign: 'middle', margin: "-2px -2px -2px 0px" };
const iconStyleCard = { filter: "brightness(140%)", width: "11.3px", height: "17px", border: "1px solid rgb(6 198 198)", verticalAlign: 'middle', margin: "-2px -2px -2px 1px" };
const iconStyleCards = { filter: "brightness(140%)", width: "11.3px", height: "17px", border: "1px solid rgb(6 198 198)", verticalAlign: 'middle', margin: "-2px -2px -4px -9px" };
const iconStyleSpace = { width: "26px", height: "26px", verticalAlign: 'middle', margin: "-5px -9px -2px -5px", transform: "rotate(45deg)" };
const ScoreIcon = () => <img src={scoreIcon} alt="score" style={{ transform: "rotate(0deg)", backgroundImage: "radial-gradient(circle at center, rgba(255,255,0,0.4) 0%, transparent 50%)", width: "22px", height: "22px", verticalAlign: 'middle', margin: "-3px -3px -2px -2px", filter: "brightness(125%) hue-rotate(9deg)" }} />
const DataIcon = () => <img src={dataIcon} alt="data" style={{ ...iconStyle, filter: "brightness(160%) hue-rotate(-9deg)", backgroundImage: "radial-gradient(circle at center, rgba(255,105,180,0.8) 0%, transparent 50%)" }} />
const CardIcon = () => <img src={back_v3} alt="card" style={iconStyleCard} />
const CardsIcon = () => <><img src={back_v3} alt="card" style={iconStyleCard} /><img src={back_v3} alt="card" style={iconStyleCards} /></>
const ProcessingIcon = () => <img src={processingIcon} alt="processing" style={{ ...iconStyle, filter: "brightness(160%) hue-rotate(-15deg)", backgroundImage: "radial-gradient(circle at center, rgba(0,255,0,0.7) 0%, transparent 50%)" }} />
const SpaceIcon = () => <img src={space2} alt="space" style={iconStyleSpace} />


const Text = styled.p`
  color:${BIRGHTER_FONT_COLOR};
  font-size:${default_font_size};
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
const ImageContainerRules = styled.div`

  width: 100%;
	  	
  `;

const ImageRules = styled(Image)`

  width: 100%;
  height: 100%;	
  object-fit: cover;
  filter: brightness(30%);
  margin: -20px;
  `;

const DuplicateImageRules = styled.img`
height: calc(100% );
filter: brightness(25%);
width: calc(100% );
left: 0;
top: 0;
margin: 0px;
position: absolute;
  `;

const RoundNumber = styled(Text)`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  font-family: "Digital Dream";
  color: #9ff;
  text-shadow: 0 0 5px rgba(153,255,255,0.8);
  `;

const RoundNumberImage = styled(ImageRules)`
  filter: brightness(100%);
  width: calc(100% + 36px);
  `;
const DuplicateRoundNumberImage = styled(DuplicateImageRules)`
  filter: brightness(100%);
  `;

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
  margin-left:${PRINT_VERSION ? "-" + print_margin * 1 + "px" : "-" + default_padding};
  height: 100%;
  margin-top:${PRINT_VERSION ? "-" + print_margin + "px" : "-" + default_padding};
  background:  rgba(0,0,0,0.5);
    
`;
const InsideMargin = styled.div`
width: ${BRIDGE_VERSION ? bridge_width : poker_width};
height:  ${BRIDGE_VERSION ? bridge_height : poker_height};
  position: ${PRINT_VERSION ? "absolute" : "relative"};
    
`;


const TrackerContainer = styled(CardContainer)`
background-color: ${props => props.color};
    //background-image: url('${props => props?.backgroundImg}');
`;


const TypeIcon = styled.img`
position: absolute;
bottom: 0px;
width: 120px;
height: 120px;
left: 24%;
transform: rotate(45deg);
margin: auto;
opacity: 0.13;

background-size: contain;
  filter: sepia(1) ${props => props.colorcorrection};
`;


const TypeIconTitle = styled.img`
display: inline-table;
width: 26px;
transform: rotate(45deg);
height: 26px;
margin: -9px 0px;
filter: sepia(1) ${props => props.colorcorrection};
`;
const NumberBox = styled(Text)``;

const CardId = styled(Text)`

position: absolute;
right: 6px;
font-size:8px;
bottom: 3px;
margin:0;
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

const Column = styled.div`
display: flex;
margin-top:4%;
height: 94%;

`;
const LeftColumn = styled(Column)`
  flex-direction: column;
  flex: 1.2;
  align-items: flex-end;  
`;

const CenterColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  flex: 0.3;
`;

const RightColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  flex:  1.2;
  /* Additional styles here */
`;

const TitleWrapper = styled.div``;

const Border = styled.div`
  margin: 0px 1px;
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-bottom: ${default_img_size}; 
  position: relative;
  
`;

const CardText = styled(Text)`
  position: relative;
  padding: 3px;
  margin: 4px 0;
  min-height:  ${props => props.height};
  border-left: 1px solid aqua;
  clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 10px, 95% 0);
  background: linear-gradient(to bottom, rgb(4 232 255 / 52%), rgb(0 231 255 / 22%) 30%, rgb(32 234 255 / 12%))
  
`;
const NumberCardText = styled(Text)`
 font-family:"Digital Dream";
 display: inline;
 font-weight:bold;
 color:${BIRGHTER_FONT_COLOR};
 font-size: ${default_number_size};
`;
const CostNumberText = styled(NumberCardText)`
  font-size:  ${default_cost_font_size};
  color:rgb(230,177,42);
`;

const Title = styled(Text)`
  font-size: 13px;
  text-shadow: 0 0 5px rgb(0 0 0 / 90%)
 // border: 1px solid aqua;

  background:rgba(0,0,0,0.6);
  position: absolute; 
  top: ${SIDE_MARGIN + 4}px; 
  left: ${SIDE_MARGIN + 2}px; 
  text-transform: uppercase;
  padding:1px 6px 2px 6px;
  margin: 0;
  font-weight: bold;
  color:#95ffff;
  clip-path: polygon(8px 0, 100% 0, 100% 65%, calc(100% - 8px) 100%, 0 100%, 0 35%);
  background: linear-gradient(to bottom, 
    rgb(7 180 198 / 82%), 
    rgb(0 150 165 / 32%) 16%, 
    rgb(0 0 1 / 84%) 50%, 
    rgb(0 150 165 / 32%) 84%, 
    rgb(7 180 198 / 82%));
  
`;
const TitleRules = styled(Title)`
   margin: 10px;
   
  `;
const StyledTitle = styled(Title)`
  font-size: 12px;
`;

const TopHalf = styled.div`
  position: absolute;
  top:  -${SIDE_MARGIN + 2}px;
  left:  -${SIDE_MARGIN}px;
  width: calc(100% +   ${SIDE_MARGIN * 2}px);
  height: 50%;
`;

const BottomHalf = styled.div`
  position: absolute;
  bottom: 2px;
  z-index:2;
  left: 0;
  width: calc(100% -   ${(0 + 2) * 2}px);
  height:  ${MOBILE_CARDS ? "unset" : default_action_size}; 
  padding:   ${0 + 2}px;
  //background: linear-gradient(transparent, rgba(0,0,0,0.5));
`;


const TextTitle = styled.b`
    margin-right: auto;
    margin-top:-3px;
    position:absolute;
    font-size:${default_title_size};
    text-transform: uppercase;
    color: #66ffff;
    text-shadow:0 0 5px rgb(0 141 141 / 40%)
`;

const Details = styled.span`
    //margin-left: 10px;
    width:100%;
    display: inline-block;
    color:${BIRGHTER_FONT_COLOR};
    margin-top:12px;
    letter-spacing: -0.5px;
    word-spacing: 1.3px;
    font-weight: ${DEFAULT_FONT_WEIGHT};
    text-shadow: none;
    margin-bottom:0px;
    line-height:${DEFAULT_LINE_HEIGHT};
`;

const Details2 = styled(Details)`
    margin-top:16px;

`;

const Cost = styled.b`
color:rgb(230,177,42);
white-space: nowrap;
font-size:${default_cost_font_size};
text-shadow: 0 0 3px rgba(230,177,42,0.7);
position: absolute;

    right: 9px;
    top: -1px;
`;



const adjustGamma = (blob, gamma = BRIGHTNESS_ADJUSTMENT) => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('This function can only be run on the client-side.'));
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new window.Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 * Math.pow(data[i] / 255, 1 / gamma);     // Red
        data[i + 1] = 255 * Math.pow(data[i + 1] / 255, 1 / gamma); // Green
        data[i + 2] = 255 * Math.pow(data[i + 2] / 255, 1 / gamma); // Blue
      }

      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob(resolve);
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(blob);
  });
}

const useSave = (title) => {
  const cardRef = useRef(null);
  var scale = save_size;




  const saveAsImage = () => {
    return new Promise((resolve, reject) => {
      domtoimage.toBlob(cardRef.current, {
        width: cardRef.current?.clientWidth * scale,
        height: cardRef.current.clientHeight * scale,
        style: {
          transform: 'scale(' + scale + ')',
          transformOrigin: 'top left'
        }
      })
        .then(blob => adjustGamma(blob))
        .then((brighterBlob) => {
          saveAs(brighterBlob, title + version + '.png');
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
  const saveAsImage = (cardId, title) => {
    return new Promise((resolve, reject) => {
      const cardElement = document.getElementById(`card-${cardId}`);
      if (!cardElement) {
        console.error(`Element with id card-${cardId} not found`);
        reject(`Element with id card-${cardId} not found`);
        return;
      }

      var scale = save_size;
      domtoimage.toBlob(cardElement, {
        width: cardElement.clientWidth * scale,
        height: cardElement.clientHeight * scale,
        style: {
          transform: 'scale(' + scale + ')',
          transformOrigin: 'top left',
        },
      })
        .then(blob => adjustGamma(blob))
        .then((brighterBlob) => {
          saveAs(brighterBlob, title + version + '.png');
          resolve();
        })
        .catch((error) => {
          console.error('oops, something went wrong!', error);
          reject(error);
        });
    });
  };

  return [saveAsImage];
};


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
  const isCost = text.includes("Cost:");
  return words.map((word, index) => {
    switch (word.toLowerCase()) {
      case "score":
        return <><ScoreIcon key={index} />{" "}</>;
      case "data":
        return <><DataIcon key={index} />{" "}</>;

      case "card":
        return <><CardIcon key={index} />{" "}</>;
      case "cards":
        return <><CardsIcon key={index} />{" "}</>;
      case "processing":
        return <><ProcessingIcon key={index} />{" "}</>;
      case "space":
        return <><SpaceIcon key={index} />{" "}</>;
      case "<br>":
        return <br key={index} />;
      default:
        if (!isNaN(word)) {
          return isCost ? <CostNumberText key={index}>{word}</CostNumberText> : <NumberCardText key={index}>{word}</NumberCardText>;
        }
        return word + " ";
    }
  });
};





const iconSize2 = "23px";
const iconStyle2 = { width: iconSize2, height: iconSize2, verticalAlign: 'middle', opacity: "1" };


const marginX = PRINT_VERSION ? print_margin + 20 + "px" : "20px";
const marginY = PRINT_VERSION ? print_margin + 10 + "px" : "10px";
const iconSize3 = "45px";
const iconStyle3 = { width: iconSize3, height: iconSize3, verticalAlign: 'middle', position: "absolute", left: marginY, top: marginX };
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
background: url('${back_v3}') ;
background-size: 100% 100%;
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


const DownloadCSVButton = ({ dataArray }) => {
  const headers = ['image', 'label', 'item-count', 'item-key'];

  const downloadCSV = () => {
    const csvRows = [];

    // Adding headers
    csvRows.push(headers.join(','));

    // Adding row for each item in dataArray
    dataArray.forEach(data => {
      const title = data.title; // Extract title for each object
      const row = [`https://ka2le.github.io/chatgpt-apps3/images/ss_cards/${title + version}.png`, title, (data?.details1 == "" || data?.details2 == "") ? 0 : 1, title];
      csvRows.push(row.join(','));
    });

    // Creating CSV string
    const csvString = csvRows.join('\n');

    // Triggering download
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cards_import_' + version + '.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={downloadCSV}>Download CSV</button>
  );
};
