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
import background_backside4 from '../images/singularitySprint/Backside4.jpeg';
import processing_background from '../images/singularitySprint/processing_background.svg';
import score_background from '../images/singularitySprint/score_background.svg';
import data_background from '../images/singularitySprint/data_background.svg';
import RegularFont from '../fonts/TitilliumWeb-Regular.ttf';
import BoldFont from '../fonts/TitilliumWeb-Bold.ttf';
import RegularFont2 from '../fonts/Orbit-Regular.ttf';
import RegularFont3 from '../fonts/DIGITALDREAM.ttf';

let PRINT_VERSION = localStorage.getItem('PRINT_VERSION') === 'true';
let MOBILE_CARDS = localStorage.getItem('MOBILE_CARDS') === 'true';
let BRIDGE_VERSION = MOBILE_CARDS ? false : false;
const bridge_width = "57mm";
const bridge_height = "89mm";
const poker_width = "63mm";
const poker_height = "88mm";
const print_margin = 18;
const default_padding = "0px";
const default_font_size = MOBILE_CARDS ? "17px" : "12px";
const default_cost_font_size = MOBILE_CARDS ? "17px" : "11px";
const default_title_size = MOBILE_CARDS ? "15px" : "9px";
const default_number_size = MOBILE_CARDS ? "18px" : "13px";
const default_img_size = !MOBILE_CARDS ? BRIDGE_VERSION ? "95%" : "98%" : "40%";
const default_action_size = !MOBILE_CARDS ? BRIDGE_VERSION ? "37%" : "36%" : "66%";
const save_size = MOBILE_CARDS ? 2 : PRINT_VERSION ? 9 : 4;
const BRIGHTNESS_ADJUSTMENT = 1.4;

const SIDE_MARGIN = 8;
const DEFAULT_LINE_HEIGHT = "14px";
const DEFAULT_FONT_WEIGHT = "400";
const BIRGHTER_FONT_COLOR = "#99ffff";


const Image = styled.img`
  position: absolute;
  object-fit: unset;  
  width: 100%;
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



const initialCards =[
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142730316168036352/ka2ledionysuz_robot_in_the_style_of_neon_punk_illustration_glow_a9ac3f6a-c568-4311-af91-2ce8ea251452.png",
    "title": "Data Protection",
    "action1": "Activate Security Protocol",
    "details1": "+4 processing and +4 processing if opponent has 0 processing",
    "action2": "Disable Firewall",
    "details2": "+8 score in 1 \nmore round",
    "cost": "30 data or 14 processing",
    "id": "1",
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142888684128059553/ka2ledionysuz_miners_axe_sledge_sledge_hammer_axe_coal_miner_ho_b40227a0-9db6-43ab-bf76-c000c78d23aa.jpg",
    "title": "Data Mining",
    "action1": "Test Linear Regression",
    "details1": "+4 data and +4 data per 10 data",
    "action2": "Learn Deeply",
    "details2": "Take and play a card from any discard pile, paying its cost after this card's.",
    "cost": "Card and 8 processing or 14 data",
    "id": "2",
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142872458567880836/ka2ledionysuz_rat_in_human_clothes_in_labyrinth_maze_tron__in_t_39c4a69e-2896-42f2-a001-b3f9ed1417d3.jpg",
    "title": "Reinforcement Learning",
    "action1": "Explore Greedily",
    "details1": "+6 data and +6 data if below 16 data",
    "action2": "Predict Q Values",
    "details2": "+2 score per 10 \ntotal data and processing spent",
    "cost": "All data and All processing",
    "id": "3",
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142917895148552353/ka2ledionysuz_cute_robot_sitting_at_school_desk_with_papers_and_3e0783c4-2dc1-4963-b6f0-7b84cc45eedf.png",
    "title": "Supervised Learning",
    "action1": "Calibrate Reward Parameters",
    "details1": "+6 data and +10 data if the top card in your discard pile has 'Data' in its name",
    "action2": "Outsource Labeling",
    "details2": "Before Card Draw, collect cards on hands and divide equally as you choose",
    "cost": "4 processing or 10 data",
    "id": 4,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1143094380132048917/ka2ledionysuz_copper_coils_advanced_sci_fi_quantum_engine_hangi_a6c54a8a-a292-46bf-af5a-32cec74bca83.jpg",
    "title": "Quantum Computing",
    "action1": "Get Quantum Entangled",
    "details1": "Both players lose up to 12 data each",
    "action2": "Enable Quantum Supremacy",
    "details2": "+2 score and +4 Score per 10 Processing spent",
    "cost": "All Processing",
    "id": 5,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139863103954243634/ka2ledionysuz_robot_insect_flying_over_city_wasps_three_rovot_i_6eb827db-6521-4416-88f0-5e0e7840e6f1.png",
    "title": "Swarm Intelligence",
    "action1": "Apply swarm solutions",
    "details1": "+4 Data and +4 Data per 10 Data",
    "action2": "Release the Swarm",
    "details2": "+2 score and get either +2 data per 1 processing spent or +1 processing per 2 data spent ",
    "cost": "All data or All processing",
    "id": 6,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142550685653676065/ka2ledionysuz_computer_board_city_tilt_shift_lens_circuitry_cit_7129fbec-38e4-4e02-b103-bc5a1f6c9bff.png",
    "title": "Tensor Processing Unit",
    "action1": "Select optimizer algorithm",
    "details1": "+4 data and +4 data per 10 data",
    "action2": "Multiply the Matrix",
    "details2": "Before Card Draw, look at and rearrange the top 6 \ncards",
    "cost": "8 data or 4 processing ",
    "id": 7,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142714394296451122/ka2ledionysuz_robot_boxers_boxing_ring_gloves__in_the_style_of__f4b3ce2e-ee37-4e51-b7d2-448015870e8a.jpg",
    "title": "FontSGenerative Adversarial Network",
    "action1": "Deceive Discriminator",
    "details1": "+2 data per card in your discard pile",
    "action2": "Begin Zero-Sum Game",
    "details2": "Competition: The player with the most processing after 2 \nmore rounds gets +8 score",
    "cost": "4 data or 4 processing",
    "id": 8,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139670504286998558/ka2ledionysuz_bionic_eye_artificial_eye_wires_circuits_in_eye___604957da-d751-4a0d-bd2e-ffa8d2b15203.jpg",
    "title": "Computer Vision",
    "action1": "Detect objects",
    "details1": "+2 \nand +4 \nper 10 \nto either data or processing",
    "action2": "Tune model",
    "details2": "If you have more Data than opponent get <br> +3 score and +2 score per 10 data spent ",
    "cost": "Half Processing and Half data",
    "id": "9",
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139938474171048099/ka2ledionysuz_many_puzzle_pieces_neon_lines_shaped_like_jigsaw__12bb6b20-7000-4022-b490-8b3fccc0ff4f.png",
    "title": "Recurrent Neural Network",
    "action1": "Recall Long Short-Term Memory",
    "details1": "Loan 20 data pay back up to 26 data in 2 \nrounds",
    "action2": "Backpropagate errors",
    "details2": "+1 score per card in your discard pile",
    "cost": "3 data per card",
    "id": "10",
    "type": "base"
  },
  {
    "img": "/chatgpt-apps3/static/media/hacker2.fafe8a4e4e2ede9b6428.png",
    "title": "Hacker",
    "action1": "security by obscurity",
    "details1": "+3 Data and +2 Processing and +1 score",
    "action2": "Hire the hacker",
    "details2": "Steal up to 4 score from opponent",
    "cost": "14 processing",
    "id": 11,
    "type": "base"
  },
  {
    "img": "/chatgpt-apps3/static/media/scientist2.899cf2b08a566a681b4b.png",
    "title": "Data Scientist",
    "action1": "Produce Graphs",
    "details1": "+6 data and +3 data per 10 data",
    "action2": "Paus Ethically",
    "details2": "This round, block all actions, delayed actions, and costs except this; all affected cards go to your discard pile",
    "cost": "Half data min 10 data",
    "id": 12,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142707732097540116/ka2ledionysuz_big_easel_in_center_very_illuminated_glow_glowing_d5d54114-6335-452c-a2f2-b847a85d7d33.png",
    "title": "FontSConvolutional Neural Network",
    "action1": "Reconstruct Latent Space",
    "details1": "+6 data and + 3 data per 10 data and after Card Draw, both players reveal their hand",
    "action2": "Contest Art",
    "details2": "Get half difference in score if opponent has <br> more score",
    "cost": "Half data and half processing ",
    "id": 13,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1147968605082877962/ka2ledionysuz_harvest_machine_in_the_style_of_neon_punk_sci_fi__981de58e-ad0a-4e9d-ad55-a47401bf4aeb.png",
    "title": "Data Farm",
    "action1": "Launch Data Seeding Simulation",
    "details1": "+12 processing and +6 processing to your opponent",
    "action2": "Harvest Data ",
    "details2": "Competition: The player with highest reached data starting now get +8 score at end of game",
    "cost": "10 data or 6 processing ",
    "id": 14,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139672147984404510/ka2ledionysuz_mountain_hall_server_hall_neon_punk_glow_lights_c_bf3fd202-db9f-42b2-bc6f-015769807d36.png",
    "title": "Data Center",
    "action1": "Establish redundancy",
    "details1": "Copy free action of the first card opponent plays this turn",
    "action2": "Provide Storage",
    "details2": "+2 score and +2 Score per 10 Data",
    "cost": "All data",
    "id": 15,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1147981655462641694/ka2ledionysuz_chess_chess_pieces_neon_glow_sci_fi_futuristic_la_b5cb2d1d-8c13-4e41-a01f-881b89bb16ee.png",
    "title": "Deep Blue",
    "action1": "Apply Alpha-Beta pruned Minimaxing",
    "details1": "+6 data and +3 data per 10 data",
    "action2": "Roll out the nodes",
    "details2": "After Card Draw, swap hand and processing with your opponent if you have at least 1 \nmore processing",
    "cost": "Processing advantage ",
    "id": 16,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139931604823842906/ka2ledionysuz_very_thick_lightning_bolt_ligthning_storm_lightni_e02a8b76-8a7c-4dab-8832-c59267603976_20230812164042249.jpg",
    "title": "CPU Voltage Spike",
    "action1": "Accidentally Overclock",
    "details1": "+4 data and then set your data to the next whole 10 data",
    "action2": "Overload game",
    "details2": "Competition: The player with \"Data Protection\" in their discard pile at game end get +8 score",
    "cost": "10 data or 6 processing",
    "id": 17,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142880266130575470/ka2ledionysuz_spiderweb_thin_web_detailed__city_background_blur_afae3805-496e-42a4-9d04-72114d66d2eb.png",
    "title": "Neural Network",
    "action1": "Select optimizer algorithm",
    "details1": "+4 data and +4 data per 10 data",
    "action2": "Add deep layers",
    "details2": "Before Card Draw, reveal both players hands and choose a free action to copy twice",
    "cost": "8 data or 6 processing ",
    "id": 18,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139954903402430554/ka2ledionysuz_waporpunk_neon_glow_epic_4f61a6dc-c0dc-413b-a7ff-15345e971973.jpg",
    "title": "Weighted Neurons",
    "action1": "Compute Gradient Descent",
    "details1": "+5 data per 10 data to both players",
    "action2": "Regularize Weights",
    "details2": "+4 processing and +5 processing per 10 Data ",
    "cost": "10 data or 5 processing",
    "id": 19,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139850326812409896/ka2ledionysuz_dna_helix_dna_strands_dna_helix_on_top_city_in_ba_d929eb0a-0bb6-46e9-aec3-476439ca8d73.png",
    "title": "Genetic Algorithms",
    "action1": "Mutate Variables",
    "details1": "+4 processing and +5 processing per 10 processing",
    "action2": "Evolve Sequence",
    "details2": "In 5 \nmore rounds get +3 Score per 10 data  or processing spent now",
    "cost": "All Data or All processing ",
    "id": 20,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139871629153947748/ka2ledionysuz_internet_of_thingslightbulbs_smart_phones__in_the_dd9d50fe-64a4-4c2d-b321-31d5e972f87d.png",
    "title": "Internet Of Things",
    "action1": "Automate lighting",
    "details1": "+2 Data Next round trigger this action again",
    "action2": "Install smart lock",
    "details2": "Next 2 \nrounds, your actions can't be blocked and your data processing score can't be reduced by opponent",
    "cost": "10 data or 6 processing ",
    "id": "21",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139971192028135456/ka2ledionysuz_colorful_glowing_lab_vials_chemicals_in_laborator_d25ea740-b3dd-4794-b4e3-62fa5f90cb86.png",
    "title": "Graph Neural Network",
    "action1": "Pool the nodes",
    "details1": "+4 data and +4 data per 10 data",
    "action2": "Calculate matrix",
    "details2": "Next round opponent choose and reveal what card and action to play before you decide",
    "cost": "6 processing or 12 data ",
    "id": "22",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142732946063757312/robot2.96471c1c82d6a7265760.jpg",
    "title": "ChatGPT",
    "action1": "Say \"Please\" and \"Thank You\" ",
    "details1": "+1 processing per card in your discard pile",
    "action2": "Transform tokens",
    "details2": "+8 data and +4 data per 1 score",
    "cost": "All score",
    "id": "23",
    "type": "v2"
  },
  {
    "img": "/chatgpt-apps3/static/media/clock2.23a49361aac0eac6e16e.png",
    "title": "FontSTemporal Difference Learning",
    "action1": "Synchronization Master-Slave",
    "details1": "Both players change up to 8 data closer to 20 data",
    "action2": "Design Reward",
    "details2": "Next round get +3 score per 10 data or processing spent, opponent get half Data or processing spent now",
    "cost": "All data or All processing",
    "id": "24",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1147151382525259816/ka2ledionysuz_a_gaming_rig_surrounded_by_blue_fire_pink_and_aqu_fbfedd42-f59d-43a4-9878-659e0af60df7.png",
    "title": "Personal Computer",
    "action1": "Pull from git",
    "details1": "+4 \nand +5 \nper 10 \nof lowest data or processing",
    "action2": "Reduce Scope",
    "details2": "Next round you get double score data processing from all actions affecting you",
    "cost": "Half Data and Half processing",
    "id": "25",
    "type": "v2"
  },
  {
    "img": "/chatgpt-apps3/static/media/cloud.ed08c58a14eed5a82dcc.png",
    "title": "Cloud Computing",
    "action1": "Provide Service as a service",
    "details1": "Copy free action of the top card in your discard pile",
    "action2": "Host Everyone",
    "details2": "+8 data and +4 data per total 10 data of both players ",
    "cost": "6 Processing or 3 score",
    "id": "26",
    "type": "v2"
  },
  {
    "img": "/chatgpt-apps3/static/media/enigma.e3e78ffabe8bec90f8cf.png",
    "title": "Data Encryption",
    "action1": "Reverse the Hash",
    "details1": "+4 data and +4 data to you per 10 data of opponent",
    "action2": "Imitate the game",
    "details2": "Competition: Player with most Score after 2 \nmore rounds get +40 data",
    "cost": "8 data or 4 processing",
    "id": "27",
    "type": "v2"
  },
  {
    "img": "/chatgpt-apps3/static/media/molecule3.9cbc596b68aa5834a237.png",
    "title": "AlphaGo",
    "action1": "Fold protein",
    "details1": "+6 data and +10 data if you reveal a card from your hand with 'Network' in its name",
    "action2": "Get ready, set, go",
    "details2": "Auction: +6 score to highest bidder, you can match and win, opponent raise by min 5 data",
    "cost": "Min 25 data",
    "id": "28",
    "type": "v2"
  },
  {
    "img": "/chatgpt-apps3/static/media/watson.3075d1d7822ebbd71ad9.png",
    "title": "Watson",
    "action1": "Ask \"What is ...\"",
    "details1": "+5 processing and +5 processing per 10 processing",
    "action2": "Diagnose Patient",
    "details2": "Move top 3 \ncards from opponents discard pile to yours and rearrange your entire discard pile",
    "cost": "10 data or 6 processing",
    "id": "29",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142733494259298315/ka2ledionysuz_cyborg_neon_punk_ultrarealistic_woman_pink_hair_t_bd4f3d05-d9ca-427b-864c-843f6550c6e3.png",
    "title": "Cyborg",
    "action1": "Ascend Humanity",
    "details1": "+4 data and +4 data per 10 data",
    "action2": "Assemble the AI-Team",
    "details2": "+3 score per card of either \"ChatGPT\", \"Deep Blue\", \"AlphaGo\" and \"Watson\" in your discard pile",
    "cost": "5 data per card",
    "id": "30",
    "type": "v2"
  },
  {
    "img": "https://cdn.midjourney.com/7a0a97c8-4b58-46be-8449-2f40d64e62cf/0_3.png",
    "title": "Blockchain",
    "action1": "Pump and dump",
    "details1": "Shuffle played cards, each draw 1 , player drawing this gets +8 data the other -8 data  ",
    "action2": "Hodl",
    "details2": "In 4 \nrounds, get double data or processing spent, or get +1 score per 10 data or 10 processing spent",
    "cost": "All data or All processing",
    "id": "31",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139494867312058418/ka2ledionysuz_cute_robots_grouped_by_different_colors_sci_fi_ne_3fc7e161-9dee-4cbb-88dd-6aa75830d67d.png",
    "title": "K-means Cluster",
    "action1": "Recompute Centroid",
    "details1": "Next round, both players play a card from their discard pile then discard their latest drawn card",
    "action2": "Fuse Clusters",
    "details2": "+2 score per 10 data spent or <br> +4 score per 10 processing spent ",
    "cost": "All data or All Processing",
    "id": "32",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139520104095293491/ka2ledionysuz_boxes_text_brain_textbook_text_boxes_info_infomat_1e8ed740-815e-48f3-8c9c-bb2b1e996a1f_20230811132557248.jpg",
    "title": "Explainable AI",
    "action1": "Boost Transparency",
    "details1": "Flip and spread each card in the draw pile",
    "cost": "18 data or 8 processing or 4 score ",
    "action2": "Explain model",
    "details2": "Next time including this round, opponent gain score gain same amount of score",
    "id": "33",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139547103497044140/ka2ledionysuz_cell_phone_tower_epic_sci_fi_neon_punk_style_neon_27db55f4-f4ac-497a-b0d8-8e36cb57cf8b.png",
    "title": "5G Network",
    "action1": "Connect remotely",
    "details1": "+10 data or +6 processing",
    "action2": "Roll over data",
    "details2": "Start next game with half the amount of data spent now",
    "cost": "All data",
    "id": "34",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139558590835859526/ka2ledionysuz_A_house_on_a_steep_cliff_nature_epic_sci_fi_neon__01721774-2b32-449c-9a5e-99ae9be48372.png",
    "title": "Edge Computing",
    "action1": "Process locally",
    "details1": "+5 processing and +5 processing per 10 processing",
    "action2": "Live on the edge",
    "details2": "Can't spend data until last round, +1 score per rounds left",
    "cost": "4 processing or 8 data",
    "id": "35",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140685171197227039/ka2ledionysuz_bank_vault_round_door_metal_lock_high_tech_magic__71bd6190-ead6-4fbe-87cc-15fd0640f8cc.png",
    "title": "Data Vault",
    "action1": "Promise protection",
    "details1": "Borrow up to 3 score from opponent, pay back that score in 2 \nmore rounds if possible ",
    "action2": "Exchange keys",
    "details2": "Swap discard pile, you get to keep 1  of the cards in yours",
    "cost": "4 processing or 8 data",
    "id": "36",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139648200614088714/ka2ledionysuz_male_robot_on_beach_sunbathing_sand_water_paradis_3a89981c-40aa-410c-ad0f-be13dcb5004f.png",
    "title": "Virtual Influencer",
    "action1": "Generate generic content",
    "details1": "+4 data and +2 data per total 10 data of both players",
    "action2": "Follow back",
    "details2": "Next round, both players also get the result of their opponents action ",
    "cost": "10 data or 6 processing ",
    "id": "37",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139660085547774012/ka2ledionysuz_cool_sports_car_city_in_background_sci_fi_neon_pu_b36ed901-d3dc-4821-aeb7-26c7dccbcc3c.png",
    "title": "Self Driving Car",
    "action1": "Break for bag",
    "details1": "Next round all data gain is halved",
    "action2": "Navigate autonomously",
    "details2": "Steal up to as much data from opponent as processing spent",
    "cost": "All processing",
    "id": "38",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1144297444658659430/ka2ledionysuz_virtual_reality__in_the_style_of_cloudpunk_realis_1448d4d7-e0fc-4ddc-a187-881c7c5fe43b.png",
    "title": "Virtual Reality",
    "action1": "Ready Player One",
    "details1": "10 data or 6 processing or 2 score",
    "action2": "Enter Matrix ",
    "details2": "20 data or 12 processing or 4 score",
    "cost": "8 data or 4 processing or 2 score",
    "id": "39",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1144921400365297704/ka2ledionysuz_smart_watch_with_galaxy_and_planets_on_the_clock__0f21bdb4-66d8-4ab3-b961-2ce81b6d53c9.png",
    "title": "Wearable Tech",
    "action1": "Forget to charge",
    "details1": "+8 data and +8 data if you have 0 data",
    "action2": "Track steps",
    "details2": "Competition: First player spending data or processing starting next round lose, winner get +8 score split if tied",
    "cost": "14 data or 8 processing ",
    "id": "40",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1148900580589322240/ka2ledionysuz_industrial_robot_arm_factory_line_with_factory_ro_0c750faf-9785-4fac-bf17-dd6877bdf73f.jpg",
    "title": "Industrial Automation",
    "action1": "Assemble Selectively and Comply",
    "details1": "+1 processing Next round trigger this action again",
    "action2": "Pick and Place",
    "details2": "After Card Draw, discard your last drawn card, then draw a card from any discard pile ",
    "cost": "10 data or 6 processing",
    "id": "41",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140205636831957012/ka2ledionysuz_electromagnetic_machine__destroying_hard_drive_ma_2b452d35-677d-41fc-a7ee-4ed21fd1385b.png",
    "title": "Degausser",
    "action1": "Destroy Magnetic Drive",
    "details1": "Opponent lose up to 8 data",
    "action2": "Trash torrents",
    "details2": "+1 score and +2 score per 10 \nof data or processing spent",
    "cost": "Half data or Half processing ",
    "id": "42",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1143134582061928458/ka2ledionysuz_advanced_architecture_building_that_looks_like_a__feeef7b7-25b2-4b6c-ba46-f20ec007093b.jpg",
    "title": "SuperComputer",
    "action1": "Benchmark LINPACK",
    "details1": "+4 processing and +4 processing if you have more score than opponent",
    "action2": "Achieve petaflop",
    "details2": "+11 score",
    "cost": "30 data and 10 processing",
    "id": "43",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140698804262285392/ka2ledionysuz_high_tech_cylinder_metal_floating_in_space_with_s_4e646d93-1c3f-4b7e-98da-01ffe2295501.png",
    "title": "Capsule Network",
    "action1": "Generalize features",
    "details1": "+4 processing and +4 processing per 10 score",
    "action2": "Remember Hierarchies",
    "details2": "Reveal a card on hand and play its Cost Action",
    "cost": "Card cost",
    "id": "44",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140296759462088767/ka2ledionysuz_epic_roller_coaster_loop_fire_twist_high_insane_h_0778fb0f-85f1-4b51-b9ae-958600910316.png",
    "title": "High frequency trading",
    "action1": "Ping an iceberg",
    "details1": "After card draw both players reveal hands and take 1 \ncard from their opponents hand",
    "action2": "Short stock",
    "details2": "Competition: Player with lowest score after last round, before end game bonuses, get +8 score ",
    "cost": "18 data or 10 processing",
    "id": "45",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140375094791778325/ka2ledionysuz_military_quad_copter_drone_flying_extremly_fast_b_4ec0b597-e8a9-4917-ab29-e8994fa3461b.png",
    "title": "Unmanned Aerial Vehicles",
    "action1": "Loop in the human",
    "details1": "+6 data and +10 data per 10 score",
    "action2": "Strike Signature",
    "details2": "+1 score per 10 data more than opponent has and opponent lose data equal to data spent",
    "cost": "All data",
    "id": "46",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140396421388964001/ka2ledionysuz_friendly_andronygous_robot_butler_apple_droid_kit_69f5e3ec-3b59-4da3-81dd-307bfedc6627.png",
    "title": "Digital Assistant",
    "action1": "Set timer for 2 minutes",
    "details1": "+16 data in 2 \nrounds",
    "action2": "Record secretly",
    "details2": "+12 score",
    "cost": "25 processing or 50 data",
    "id": "47",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140692625591111910/ka2ledionysuz_lake_in_front_if_sci_fi_city_boats_moon_light__in_8a7a6ab8-c9fb-495c-8af5-c26ed962c578.png",
    "title": "Data Lake",
    "action1": "Stream data",
    "details1": "+4 data per times you have taken this action, including this time",
    "action2": "Store metadata",
    "details2": "Next round, you can discard 1 card to trigger both actions on this if it's in your discard pile",
    "cost": "18 data or 8 processing or 4 score",
    "id": "48",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140287671328059463/ka2ledionysuz_roomba_tank_very_high_tech_advanced_sci_fi_cleani_f4617fe2-a90d-4b22-b83b-d896103ac3e6.png",
    "title": "Robot vacuum",
    "action1": "Map home",
    "details1": "+4 processing and +5 processing per 10 processing ",
    "action2": "Clean floors",
    "details2": "Reveal 1 \ncard from hand and play the free action of that card 3 \ntimes ",
    "cost": "14 data or 8 processing or 3 score",
    "id": "49",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140276690422087720/ka2ledionysuz_severl_very_different_video_game_characters_group_47a66963-86f2-4a45-9998-1169117ea41f.jpg",
    "title": "Non Player Character",
    "action1": "Follow Path",
    "details1": "Next round, also copy the free action of the card you play",
    "action2": "Adjust difficulty",
    "details2": "At game end, get +2 score per 10 \ntotal data and processing you have left then",
    "cost": "6 processing or 12 data",
    "id": "50",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1147100135713685514/ka2ledionysuz_neon_punk_style_high_speed_train_tunnel_tron_bf0aed32-07b0-4af6-8463-cb50cb94d486.png",
    "title": "Virtual Private Network ",
    "action1": "Tunnel TV",
    "details1": "Copy free action of the bottom card of your discard pile",
    "action2": "Trick tyrant",
    "details2": "In 2 \nrounds, pick one of +50 data <br> or +25 processing or +10 score",
    "cost": "30 data or 15 processing or 5 score",
    "id": "51",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1147470074257625148/ka2ledionysuz_Pink_and_aqua_neon_city_lights_female_secret_agen_0b0e450b-9e38-4c79-9cc0-19e25aa2b321.png",
    "title": "Devops Engineer ",
    "action1": "Integrate continuously ",
    "details1": "+4 data and +4 data per 10 data",
    "action2": "Deploy continuously ",
    "details2": "After Card Draw, reveal up to 3 \ncards and declare actions. Play all as stated for +4 score each, cards count as in hand.",
    "cost": "22 data or 10 processing ",
    "id": "52",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1147155155020689492/ka2ledionysuz_realistic_blue_fire_blue_flames_sci_fi_computer_m_0e6538a8-020e-4ea8-b129-523b89e4eb4f_20230901150455211.jpg",
    "title": "Firewall",
    "action1": "Block incoming traffic ",
    "details1": "Next round, no player can affect their opponent",
    "action2": "Disable \"temporarily\"",
    "details2": "Merge discard piles, all cards go in the same pile and it counts as both yours and your opponents",
    "cost": "12 data or 6 processing ",
    "id": "53",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1147175809128349736/ka2ledionysuz_Glowing_neon_lamps_high_tech_sci_fi_background_oa_fb8918ad-6a93-4476-9c47-3396e35d0763.png",
    "title": "Decision Tree",
    "action1": "Plant root node",
    "details1": "+4 processing and +5 processing per 10 processing ",
    "action2": "Prune leaf",
    "details2": "From now, get an additional +4 data each time an action is played that give you data",
    "cost": "16 data or 8 processing or 4 score",
    "id": "54",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1147233621837623447/ka2ledionysuz_sound_waves_visual_sound_waves_coming_from_sci_fi_1013556e-c83b-42a7-8744-75427947ca80.png",
    "title": "Natural Language Processing",
    "action1": "Pre-train generative transformer",
    "details1": "+6 data and +3 data per 10 data",
    "action2": "Tokenize world",
    "details2": "Switch up to 4 \ncards you will draw with 4 \ncards\nfrom your discard pile",
    "cost": "10 data or 4 processing",
    "id": "55",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1147250001693646969/ka2ledionysuz_man_looking_into_digital_mirror_tron_computer_mir_59743a57-f130-41da-b441-3c35731db537.png",
    "title": "Digital Twin ",
    "action1": "Sync clone",
    "details1": "Swap 1 card from your hand with 1 card from your discard pile",
    "action2": "Simulate Building ",
    "details2": "Reveal 1 card, change all data and processing to the other on both actions and cost, for rest of game",
    "cost": "18 data or 8 processing ",
    "id": "56",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1147448112479211611/ka2ledionysuz_data_architect_in_the_style_of_neon_punk_pink_and_bf4cb9a1-0f39-4386-8877-ba74895505e6.png",
    "title": "Data Architect",
    "action1": "Join outer left ",
    "details1": "+20 data and in 2 \nrounds opponent also <br> gain +20 data",
    "action2": "Constrain keys",
    "details2": "From now, get an additional +2 processing each time an action is played that give you processing ",
    "cost": "8 processing or 16 data or 4 score",
    "id": "57",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1147610006393462884/ka2ledionysuz_adorable_robot_neon_punk_style_background_sci_fi__1b69ad00-cf16-49ae-a2b2-07d4d7467f62.png",
    "title": "Recommender System",
    "action1": "Continue watching and don't ask again",
    "details1": "+4 data and +4 data per 10 data",
    "action2": "Filter presidents ",
    "details2": "Next round  before playing a card, look at the next card you will draw, also trigger this action again",
    "cost": "10 data or 4 processing ",
    "id": "58",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142532226769231902/ka2ledionysuz_galaxy_vortex_night_sky_above_planet_epic_black_h_a8dc0e2d-762a-4df7-b431-937f168abe65.jpg",
    "title": "Black Hole",
    "action1": "Consume gravitationally",
    "details1": "Both players lose up to -2 data per activated space card this round",
    "action2": "Radiate Hawkingly",
    "details2": "Become immune to the effect of this cards free action",
    "cost": "12 data or 6 processing",
    "id": "59",
    "type": "space"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139465636477673552/ka2ledionysuz_sci_fi_rocket_to_the_red_planet_neon_punk_style_n_f9a0dc63-1e4c-4286-b9c0-4520d5870cf2.png",
    "title": "Mars Mission",
    "action1": "Aerobrake",
    "details1": "+4 data per space card activated this round",
    "action2": "Race to space",
    "details2": "Competition: Most space cards in their discard pile after 2 more round win +6 score ",
    "cost": "8 Data or 4 Processing ",
    "id": "60",
    "type": "space"
  },
  {
    "img": "https://media.discordapp.net/attachments/1139234832178745466/1139939784857493647/ka2ledionysuz_Space_mining_tool_asteroid__Illustration_Inverted_145f9858-4c70-4533-8c02-a80bdfc72ccf.png",
    "title": "Asteroid Mining",
    "action1": "Prospect",
    "details1": "Before Card Draw, reveal top 2 \ncards. If yours isn't a space card, switch after other reorders   ",
    "action2": "Crash the market",
    "details2": "Both players play all free actions on space cards in their discard pile",
    "cost": "8 data or 4 processing",
    "id": "61",
    "type": "space"
  },
  {
    "img": "https://media.discordapp.net/attachments/1139234832178745466/1139939785373401179/ka2ledionysuz_Space_elevator_epic_space_view_gigantic_planet_sc_a8bcb677-cacc-4db3-87fd-1d734eaa12c6.png",
    "title": "Space Elevator",
    "action1": "Listen to elevator music marathon",
    "details1": "+4 data per space card activated this round",
    "action2": "Press floor 2",
    "details2": "Play free action of all but 1 space card in your discard pile",
    "cost": "12 data or 6 processing",
    "id": "62",
    "type": "space"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1147098963439272077/ka2ledionysuz_space_pod_home_Flying_in_space_in_stratosphere_fl_3b76e0d6-70c5-4345-a05e-b8a52d11d32c.png",
    "title": "space station",
    "action1": "",
    "details1": "+2 processing per space card activated this round",
    "action2": "",
    "details2": "Play up to 2 \nfree actions of space cards in your discard pile ",
    "cost": "4 processing or 10 data",
    "id": "63",
    "type": "space"
  },
  {
    "img": "https://media.discordapp.net/attachments/1139234832178745466/1139939786661044345/ka2ledionysuz_Passanger_plane_robot_wearing_pilot_suit_and_whit_6f39f8cf-9b34-44d9-9933-afd3d069bf0a.png",
    "title": "Autopilot",
    "action1": " Derive proportionally",
    "details1": "+1 score",
    "action2": "Control Cruise",
    "details2": "Steal 1 space card from opponent's discard pile",
    "cost": "10 data or 6 processing",
    "id": "64",
    "type": "space"
  },
  {
    "img": "https://media.discordapp.net/attachments/1139234832178745466/1139939787147591740/ka2ledionysuz_sleeping_humans_in_water_pod_spaceship_cryo_sleep_4de79d0c-98c9-40b4-8679-f84d8e7aa60c.png",
    "title": "Suspended Animation",
    "action1": "Nap ",
    "details1": "+4 data per space card in your discard pile",
    "action2": "Sleep deeply",
    "details2": "Next round, all space card actions are blocked",
    "cost": "10 data or 4 processing",
    "id": "65",
    "type": "space"
  },
  {
    "img": "https://media.discordapp.net/attachments/1139234832178745466/1139939787936112732/ka2ledionysuz_cute_happy_friendly_nice_baby_alien_sci_fi_neon_p_32bd9d8b-b9fc-4ab8-85f9-e6e6269eb43d.png",
    "title": "First contact",
    "action1": "Join the hive",
    "details1": "Reveal space card from hand to play it's free action",
    "action2": "Identify flying object",
    "details2": "Play up to 2 \nfree actions of space cards in your discard pile ",
    "cost": "8 data or 4 processing",
    "id": "66",
    "type": "space"
  },
  {
    "img": "https://media.discordapp.net/attachments/1139234832178745466/1139939787579600927/ka2ledionysuz_moon_base_viewed_from_the_sky_city_glass_dome_sci_555f1105-5ee1-47b3-9d45-fd2346156680.png",
    "title": "Moon Capital",
    "action1": "Plant potatoes",
    "details1": "+2 processing  per space card activated this round",
    "action2": "Host olympics",
    "details2": "Play free action of all space cards in your discard pile ",
    "cost": "16 data or 8 processing",
    "id": "67",
    "type": "space"
  },
  {
    "img": "https://media.discordapp.net/attachments/1139234832178745466/1139939785822175272/ka2ledionysuz_spaceship_light_trail_gravity_swing_manoeuver_aro_21672fe1-9000-4856-9f8f-b1e900d3b268.png",
    "title": "Mass Driver",
    "action1": "Levitate magnetically",
    "details1": "+4 data and +8 data if another space card is activated this round",
    "action2": "Launch coil",
    "details2": "Play free action of any space card in your discard pile",
    "cost": "6 data or 3 processing",
    "id": "68",
    "type": "space"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142443454744510566/ka2ledionysuz_space_ship_in_space_flying_in_the_style_of_neon_p_69ce1828-77e4-45fc-9b5f-794527fe4e50.png",
    "title": "Spaceship",
    "action1": "Book last minute flight",
    "details1": "+4 data per space card activated this round",
    "action2": "Applaud landing",
    "details2": "+2 score per space card in your discard pile",
    "cost": "6 data per card",
    "id": "69",
    "type": "space"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1146782885211295814/ka2ledionysuz_very_cute_raccoon_baby_sci_fi_space_ship_interior_558985ba-6af1-4cb5-975d-dd2e31639093.png",
    "title": "Raccoon",
    "action1": "Guard Galaxy ",
    "details1": "+10 data or +6 processing or +2 score",
    "action2": "Befriend Wall-E",
    "details2": "+6 score or activate all free actions of space cards in your discard pile",
    "cost": "12 processing or 22 data",
    "id": "70",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1143442607100416061/ka2ledionysuz_very_cute_baby_wholly_mammoth_hairy_amd_very_fluf_54081d77-78b2-43ef-a80e-5e451f4b0ddf.png",
    "title": "Woolly Mammoth",
    "action1": "Pose for cave portrait",
    "details1": "+10 data or +6 processing  or 2 score",
    "action2": "Clone from Ice",
    "details2": "Secret Auction: Both players reveal a data offer, highest win +6 score now and have to pay the data in 2 \nrounds or lose All data and -8 score",
    "cost": "4 processing or 8 data",
    "id": "71",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1143442953373745172/ka2ledionysuz_sabertooth_saberteeth_long_saber_tooth_teeth_on_s_ecf9e3a9-cb59-4c64-a06d-4a9cb8902efe.jpg",
    "title": "Saber Toothed tiger",
    "action1": "Wear braces",
    "details1": "Next time, including this round, that opponent gain data gain same amount  of data",
    "action2": "Puncture and Retreat",
    "details2": "In 2 \nmore rounds, opponent lose 24 data",
    "cost": "8 data",
    "id": "72",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1143443161146986506/ka2ledionysuz_wrinkled_pink_paper_tardigrade_dad7624b-9220-40c8-83e9-a4da3f886a70.png",
    "title": "Tardigrade",
    "action1": "Enter Cryptobiosis",
    "details1": "+1 data per card in Draw pile",
    "action2": "Survive extremes",
    "details2": "Including this round, whenever opponent gain score you gain half that score",
    "cost": "All score min 6",
    "id": "73",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1146523828311314583/ka2ledionysuz_cute_and_adorable_robot_chow_chow_robot_dog_neon__94ab9a82-2543-436d-b20a-4ee7aa4e45a1.png",
    "title": "Robot Dog - Sparky",
    "action1": "Dig for bones",
    "details1": "Steal 1 Robot Dog from an opponent's discard pile, and first card on top of it, if available.",
    "action2": "Howl-to-Text",
    "details2": "+4 score and +12 processing ",
    "cost": "34 data",
    "id": "74",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1143446026976497674/ka2ledionysuz_very_cute_robot_dog_happy_cute_puppy_robot_neon_g_ff249c54-5ea2-4d09-9252-b69807a7bca6.png",
    "title": "Robot Dog - D.O.G",
    "action1": "Pee on tree",
    "details1": "+4 processing and +4 processing if you reveal another Robot Dog in hand",
    "action2": "Fetch algorithm ",
    "details2": "Swap data with opponent",
    "cost": "All processing min 8 processing",
    "id": "75",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1143446062678413342/ka2ledionysuz_very_cute_robot_dog_happy_cute_puppy_robot_neon_g_41fb5ed3-a31e-4419-862c-6b8edd1b1c3f.png",
    "title": "Robot dog - K9",
    "action1": "Howl at moon",
    "details1": "Trade 1 \ncard from your hand with a Robot Dog in opponents hand if they have any",
    "action2": "Bite Encryption",
    "details2": "+14 processing ",
    "cost": "18 data",
    "id": "76",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1143446113593065532/ka2ledionysuz_very_cute_robot_dog_happy_cute_puppy_robot_neon_g_ccb4a33e-797a-416c-9ca8-2f2641c30b67.png",
    "title": "Robot Dog - Spot",
    "action1": "Bark Recognition",
    "details1": "+5 data and +10 data if you reveal another Robot Dog in hand",
    "action2": "Smell butts",
    "details2": "If you have 3 \nRobot Dog cards in your discard pile +8 score",
    "cost": "8 data or 4 processing ",
    "id": "77",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1143472950201303050/ka2ledionysuz_6_legs_six_legs_on_bug_very_cute_beetle_bug_in_th_fc401d1a-1d5f-4943-abee-17ebde88fd5b.png",
    "title": "Computer Bug",
    "action1": "Fix 1 bug, create 2",
    "details1": "+8 data and +8 data if you have less data than opponent ",
    "action2": "Reboot",
    "details2": "+8 score",
    "cost": "14 processing",
    "id": "78",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1143554942213292132/ka2ledionysuz_very_cute_Tyrannosaurus_rex_baby_adorable_so_cute_619dfbb8-ef42-4ad2-9bd1-6da63d8a3d59.jpg",
    "title": "Tyrannosaurus Rex",
    "action1": "Rest in Tar Pit",
    "details1": "+4 processing and +4 processing if opponent have more than 10 processing ",
    "action2": "Dodge meteors",
    "details2": "+6 score and set data to 10",
    "cost": "All data min 30 data",
    "id": "79",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1143811889399332895/ka2ledionysuz_Under_water_light_under_water_effect_sci_fi_neon__a727db74-2365-4173-9097-4db1e111d315.png",
    "title": "Shark",
    "action1": "Settle for sea bass",
    "details1": "+1 score and +3 score if you have less score than opponent",
    "action2": "Sing the song ",
    "details2": "Shuffle played cards, each draw 1 , player drawing this gets +4 score the other -4 score",
    "cost": "4 processing or 8 data",
    "id": "80",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1145372566043754666/ka2ledionysuz_High_tech_laboratorium_underwater_in_background_c_dcc0ac2b-7dda-4ce3-ba30-013e409e2e41.jpg",
    "title": "Octopus",
    "action1": "Short-Circuit Lights",
    "details1": "+8 data and +8 data if you have less data than opponent ",
    "action2": "Camouflage",
    "details2": "+4 score per 10 processing spent ",
    "cost": "10 , 20 or 30 processing ",
    "id": "81",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1146745557122035843/ka2ledionysuz_hexagons_hexagon_beehive_sci_fi_room_in_backgroun_06529af3-9efa-4bf3-9cbd-5298fc424796.png",
    "title": "Bee",
    "action1": "Join hive mind and drink pesticides ",
    "details1": "+8 data and +10 data if you have <br> at least 30 data",
    "action2": "Praise hexagons",
    "details2": "Competition: Next turn, +6 score to the player playing a card which name is first alphabetically",
    "cost": "10 data or 4 processing ",
    "id": "82",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1145410952142016622/ka2ledionysuz_Macro_photo_with_epic_lights_in_blurred_backgroun_e3ecf657-ee36-4c6b-99c0-634a02659bc3.png",
    "title": "Robot fly",
    "action1": "Replace extinct pollinators",
    "details1": "+8 data and +10 data if you have <br> at least 30 data",
    "action2": "Spy and fly",
    "details2": "Look at the final 4 \ncards in the Draw Pile and rearrange as you want",
    "cost": "8 data or 4 processing or 2 score ",
    "id": "83",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1146028950137610271/ka2ledionysuz_very_cute_baby_guinea_pig_in_a_sci_fi_laboratory__bf2c8b8c-9738-4bba-bebc-ece51d5161a3.png",
    "title": "Guinea Pig",
    "action1": "Put on lipstick and test drugs",
    "details1": "+8 data and +8 data if you have under 21 data",
    "action2": "Multiply",
    "details2": "+6 score and 6 data and 6 processing ",
    "cost": "36 data or 18 processing ",
    "id": "84",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1146508646017159309/ka2ledionysuz_a_very_cute_kitten_sci_fi_futuristic_laboratory_i_f8251bb0-888d-49a3-802a-d5ad0cf10e65.png",
    "title": "Cat - Snowball iX",
    "action1": "Display mouse trophy",
    "details1": "+8 data and +4 processing if you have more data than opponent ",
    "action2": "Control humans",
    "details2": "Copy any action from a card in your discard pile, paying that cost if action has cost",
    "cost": "Card cost",
    "id": "85",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1146508523858055218/ka2ledionysuz_a_very_cute_sphynx_kitten_sci_fi_futuristic_room__07103e95-3c1a-4c06-ae8b-7e471d571a48.png",
    "title": "Cat - Bastet",
    "action1": "Teach Architecture ",
    "details1": "+8 data and +10 data if you have <br> at least 30 data",
    "action2": "Bless worshippers",
    "details2": "+3 score per Cat card played before this by both players",
    "cost": "5 data per card",
    "id": "86",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1146508604590002185/ka2ledionysuz_a_very_cute_kitten_black_fur_sci_fi_futuristic_ho_bd379f6d-84ea-492d-9124-4cea425ccc37.png",
    "title": "Cat - Maru",
    "action1": "Scratch furniture ",
    "details1": "+10 data or +6 processing or +2 score",
    "action2": "Phone home ",
    "details2": "Competition: The player or players with data closest to 26 data after last round win +8 score",
    "cost": "4 processing or 8 data",
    "id": "87",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1146526785169801348/ka2ledionysuz_a_very_cute_bombay_kitten_black_fur_kitten_sci_fi_6deefe2b-1742-47ec-96b1-2bd3d99f6820.png",
    "title": "Cat - Orion",
    "action1": "Transmit bad luck",
    "details1": "Take 1 \nrandom card from opponent and then give 1 card of your choice",
    "action2": "Flash memory",
    "details2": "Very quickly reveal each card in the draw pile, you flip up, opponent flip back ",
    "id": "88",
    "type": "animals",
    "cost": "4 processing or 6 data"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1145387829208289382/ka2ledionysuz_very_cute_happy_baby_ape_in_the_style_of_cyberpun_c59b6c2a-a7d5-4060-baae-2386041a4c37.png",
    "title": "chimpanzee - Milo",
    "action1": "Rise upliftingly",
    "details1": "+4 processing and +6 processing if you have <br> at least 18 processing ",
    "action2": "Claim planet",
    "details2": "+4 score per 20 data spent",
    "cost": "20 , 40 \nor 60 data",
    "id": "89",
    "type": "animals"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1146771748130410616/ka2ledionysuz_planet_of_the_baby_apes_very_cute_apes_in_the_sty_f0b129b3-1bc7-4115-9c80-1c0b3accd823.png",
    "title": "Chimpanzee - Albert ii",
    "action1": "Climb out of gravity well",
    "details1": "+8 data and +10 data if you have <br> at least 30 data",
    "action2": "Rehydrate banan ",
    "details2": "+4 score per 20 data spent",
    "cost": "20 , 40 \nor 60 data",
    "id": "90",
    "type": "animals"
  }
]






function applyStretchEffect(elementId, originalWidth, originalHeight, extraSpace, stretchFactor) {
  const imgElement = document.getElementById(elementId);
  const src = imgElement.src;

  // Create container
  const container = document.createElement('div');
  container.className = 'image-container';
  container.style.width = `${originalWidth + 2 * extraSpace}px`;
  container.style.height = `${originalHeight + 2 * extraSpace}px`;
  container.style.position = 'relative';
  container.style.overflow = 'hidden';

  // Create central image
  const centralImage = imgElement.cloneNode();
  centralImage.className = 'central-image';
  centralImage.style.width = `${originalWidth}px`;
  centralImage.style.height = `${originalHeight}px`;
  centralImage.style.top = `${extraSpace}px`;
  centralImage.style.left = `${extraSpace}px`;
  centralImage.style.position = 'absolute';
  centralImage.style.zIndex = '2';
  centralImage.style.objectFit = 'cover';
  centralImage.style.objectPosition = 'center';

  // Create and style side images
  const createSideImage = (className, width, height, top, left, right, clipPath, flip) => {
    const sideImage = imgElement.cloneNode();
    sideImage.className = `side-image ${className}`;
    sideImage.style.width = `${width}px`;
    sideImage.style.height = `${height}px`;
    sideImage.style.top = `${top}px`;
    sideImage.style.left = `${left}px`;
    sideImage.style.right = `${right}px`;
    sideImage.style.position = 'absolute';
    sideImage.style.zIndex = '1';
    sideImage.style.clipPath = clipPath;
    sideImage.style.objectFit = 'cover';
    if (flip) {
      sideImage.style.transform = 'scaleX(-1)';
    }
    return sideImage;
  };

  const topImage = createSideImage('top-side', originalWidth, originalHeight * stretchFactor, 0, extraSpace, null, 'polygon(0 0, 100% 0, 100% 1%, 0 1%)');
  const leftImage = createSideImage('left-side', originalWidth * stretchFactor, originalHeight, extraSpace, 0, null, 'polygon(0 0, 1% 0, 1% 100%, 0 100%)');
  const rightImage = createSideImage('right-side', originalWidth * stretchFactor, originalHeight, extraSpace, null, 0, 'polygon(99% 0, 100% 0, 100% 100%, 99% 100%)', true);

  // Append elements to the container
  container.appendChild(centralImage);
  container.appendChild(topImage);
  container.appendChild(leftImage);
  container.appendChild(rightImage);

  // Replace original image with the container
  imgElement.parentNode.replaceChild(container, imgElement);
}




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
    localStorage.setItem('singularityCards', JSON.stringify(cards));
  };

  const loadFromLocalStorage = () => {
    const storedCards = localStorage.getItem('singularityCards');
    return storedCards ? JSON.parse(storedCards) : initialCards;
  };

  const [cards, setCards] = useState(loadFromLocalStorage);
  const [textAreaValue, setTextAreaValue] = useState(JSON.stringify(cards, null, 2));
  const [currentCard, nextCard, prevCard] = useCurrentCard(cards);

  const [showCardTextAreas, setShowCardTextAreas] = useState(localStorage.getItem('showCardTextAreas') !== null ? JSON.parse(localStorage.getItem('showCardTextAreas')) : true);
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
        </Grid>

        {/* Row 3 */}
        <Grid container item xs={12} spacing={1}>
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


function CardActions({ title, details, cost = null }) {
  const detailsComponents = textToComponents(details);
  const costComponents = cost ? textToComponents("Cost: " + cost) : null;

  return (
    <CardText height={cost == null ? "0px" : "52px"}>
      {!MOBILE_CARDS && <TextTitle>{"" + title}</TextTitle>}
      {cost && <><Cost>{costComponents}</Cost>
        <Details2>{detailsComponents}</Details2></>
      }
      {!cost && <>
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
    setTextAreaValue(newJson);
    setData(sortedData);
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
  // check if cardTitle starts with 'FontS'
  if (cardTitle.startsWith('FontS')) {
    isStyledTitle = true;
    title = cardTitle.replace('FontS', ''); // remove 'FontS' from the beginning
  }
  useEffect(()=>{
   // applyStretchEffect(`img-${id}`, 252,251,8,100)


  },[]);
  const iconImage = type == "base" ? base5 : type == "space" ? space2 : type == "animals" ? animals : type == "v2" ? expansion_droid2 : expansion_mix3;
  const colorCorrection =
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
                <Image  id={`img-${id}`} src={imgUrl} /> {/* Original Image */}
                <TitleWrapper>
                  {isStyledTitle ? <StyledTitle>{title}<TypeIconTitle colorCorrection={colorCorrection} src={iconImage}></TypeIconTitle></StyledTitle> : <Title>{title}<TypeIconTitle colorCorrection={colorCorrection} src={iconImage}></TypeIconTitle></Title>}

                </TitleWrapper>
              </ImageContainer>
            </Border>
          </TopHalf>
          <BottomHalf>
            <CardActions title={action1} details={details1}></CardActions>
            <CardActions title={action2} details={details2} cost={cost}></CardActions>
          </BottomHalf>
          <TypeIcon colorCorrection={colorCorrection} src={iconImage}></TypeIcon>
          <CardId>#{id}</CardId>
        </InsideMargin>
      </FadeBackground>

    </CardContainer>
  );
});




const iconSize = "20px";
const iconStyle = { width: iconSize, height: iconSize, verticalAlign: 'middle', margin: "-2px -2px -2px 0px" };
const iconStyleSpace = { width: "26px", height: "26px", verticalAlign: 'middle', margin: "-4px -9px -2px -5px", transform: "rotate(45deg)" };
const ScoreIcon = () => <img src={scoreIcon} alt="score" style={iconStyle} />
const DataIcon = () => <img src={dataIcon} alt="data" style={iconStyle} />
const ProcessingIcon = () => <img src={processingIcon} alt="processing" style={iconStyle} />
const SpaceIcon = () => <img src={space2} alt="space" style={iconStyleSpace} />
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
  background:  rgba(0,0,0,0.7);
    
`;
const InsideMargin = styled.div`
width: ${BRIDGE_VERSION ? bridge_width : poker_width};
height:  ${BRIDGE_VERSION ? bridge_height : poker_height};
  position: ${PRINT_VERSION ? "absolute" : "relative"};
    
`;

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

const TrackerContainer = styled(CardContainer)`
background-color: ${props => props.color};
    background-image: url('${props => props.backgroundImg}');
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
  filter: sepia(1) ${props => props.colorCorrection};
`;


const TypeIconTitle = styled.img`
display: inline-table;
width: 26px;
transform: rotate(45deg);
height: 26px;
margin: -9px 0px;
filter: sepia(1) ${props => props.colorCorrection};
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
  //border-right: 1px dashed lime;
  align-items: flex-end;  // Add this line to right-align boxes
`;

const CenterColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  flex: 0.3;
  //border-right: 1px dashed lime;
  /* Additional styles here */
`;

const RightColumn = styled(Column)`
  display: flex;
  flex-direction: column;
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
 // border-bottom: 1px solid aqua;
  
  margin: 0px 1px;
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-bottom: ${default_img_size}; 
  position: relative;
  
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
  background: linear-gradient(to bottom, rgba(32,219,238,0.22), rgba(32,219,238,0.12) 19%, rgba(32,219,238,0.12));
  
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


/*border-bottom: 2px double aqua;
border-right: 2px double aqua;*/
const Title = styled(Text)`
  font-size: 13px;
  text-shadow: 0 0 5px rgba(0,255,255,0.9);
  border: 1px solid aqua;

  background:rgba(0,0,0,0.6);
  position: absolute; 
  top: ${SIDE_MARGIN+4}px; 
  left: ${SIDE_MARGIN+2}px; 
  text-transform: uppercase;
  padding:1px 2px 2px 2px;
  margin: 0;
  font-weight: bold;
  color:#44ffff;


  
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
  height:  ${default_action_size}; 
  padding:   ${0 + 2}px;
  //background: linear-gradient(transparent, rgba(0,0,0,0.5));
`;


const TextTitle = styled.b`
    margin-right: auto;
    margin-top:-3px;
    position:absolute;
    font-size:${default_title_size};
    text-transform: uppercase;
    color: aqua;
    text-shadow: 0 0 5px rgba(0,255,255,0.4);
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
          saveAs(brighterBlob, title + '.png');
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
          saveAs(brighterBlob, title + '.png');
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
background: url('${background_backside4}') ;
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