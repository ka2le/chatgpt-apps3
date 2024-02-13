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



const initialCards = [
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142730316168036352/ka2ledionysuz_robot_in_the_style_of_neon_punk_illustration_glow_a9ac3f6a-c568-4311-af91-2ce8ea251452.png",
    "title": "Data Protection",
    "action1": "Activate Security Protocol",
    "details1": "+12 data if below 18 data",
    "action2": "Disable Firewall",
    "details2": "Competition: The player with the most processing after 2 \nmore rounds gets +8 score",
    "cost": "",
    "id": "1",
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142888684128059553/ka2ledionysuz_miners_axe_sledge_sledge_hammer_axe_coal_miner_ho_b40227a0-9db6-43ab-bf76-c000c78d23aa.jpg",
    "title": "Data Mining",
    "action1": "Test Linear Regression",
    "details1": "+16 data if the top card in your discard pile has 'Data' in its name",
    "action2": "Learn Deeply",
    "details2": "Reveal 1 card change all data and processing to the other on both actions and cost, for rest of game",
    "cost": "",
    "id": "2",
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142872458567880836/ka2ledionysuz_rat_in_human_clothes_in_labyrinth_maze_tron__in_t_39c4a69e-2896-42f2-a001-b3f9ed1417d3.jpg",
    "title": "Reinforcement Learning",
    "action1": "Explore Greedily",
    "details1": "Both players lose up to 12 data each\n",
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
    "details1": "Loan 20 data pay back up to 26 data in 2 \nrounds\n",
    "action2": "Outsource Labeling",
    "details2": "Take any discarded card and immediatly play its cost action, paying that cost without refund ",
    "cost": "Card cost\n",
    "id": 4,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1143094380132048917/ka2ledionysuz_copper_coils_advanced_sci_fi_quantum_engine_hangi_a6c54a8a-a292-46bf-af5a-32cec74bca83.jpg",
    "title": "Quantum Computing",
    "action1": "Get Quantum Entangled",
    "details1": "+6 processing and after Card Draw, both players reveal their hand",
    "action2": "Enable Quantum Supremacy",
    "details2": "Get half difference in score if opponent has <br> more score",
    "cost": "",
    "id": 5,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139863103954243634/ka2ledionysuz_robot_insect_flying_over_city_wasps_three_rovot_i_6eb827db-6521-4416-88f0-5e0e7840e6f1.png",
    "title": "Swarm Intelligence",
    "action1": "Apply swarm solutions",
    "details1": "+12 processing and +6 processing to your opponent",
    "action2": "Release the Swarm",
    "details2": "Steal up to as much data from opponent as processing spent",
    "cost": "",
    "id": 6,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142550685653676065/ka2ledionysuz_computer_board_city_tilt_shift_lens_circuitry_cit_7129fbec-38e4-4e02-b103-bc5a1f6c9bff.png",
    "title": "Tensor Processing Unit",
    "action1": "Select optimizer algorithm",
    "details1": "+4 data and then set your data to the next whole 10 data",
    "action2": "Multiply the Matrix",
    "details2": "Competition: Player with most Score after 2 \nmore rounds get +40 data",
    "cost": "",
    "id": 7,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142714394296451122/ka2ledionysuz_robot_boxers_boxing_ring_gloves__in_the_style_of__f4b3ce2e-ee37-4e51-b7d2-448015870e8a.jpg",
    "title": "FontSGenerative Adversarial Network",
    "action1": "Deceive Discriminator",
    "details1": "Both players get +6 data per 10 data",
    "action2": "Begin Zero-Sum Game",
    "details2": "+8 score in 1 \nmore round",
    "cost": "",
    "id": 8,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139670504286998558/ka2ledionysuz_bionic_eye_artificial_eye_wires_circuits_in_eye___604957da-d751-4a0d-bd2e-ffa8d2b15203.jpg",
    "title": "Computer Vision",
    "action1": "Detect objects",
    "details1": "+4 processing and +6 processing per 10 processing",
    "action2": "Tune model",
    "details2": "Competition: The player with highest reached data starting now get +8 score at end of game",
    "cost": "",
    "id": "9",
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139938474171048099/ka2ledionysuz_many_puzzle_pieces_neon_lines_shaped_like_jigsaw__12bb6b20-7000-4022-b490-8b3fccc0ff4f.png",
    "title": "Recurrent Neural Network",
    "action1": "Recall Long Short-Term Memory",
    "details1": "+2 Data Next round trigger this action again",
    "action2": "Backpropagate errors",
    "details2": "Reveal 1 \ncard from hand and play the free action of that card 2\ntimes\n",
    "cost": "",
    "id": "10",
    "type": "base"
  },
  {
    "img": "/chatgpt-apps3/static/media/hacker2.fafe8a4e4e2ede9b6428.png",
    "title": "Hacker",
    "action1": "security by obscurity",
    "details1": "Both players change 8 data closer to 24 data",
    "action2": "Hire the hacker",
    "details2": "Steal up to 4 score from opponent",
    "cost": "All data or All processing",
    "id": 11,
    "type": "base"
  },
  {
    "img": "/chatgpt-apps3/static/media/scientist2.899cf2b08a566a681b4b.png",
    "title": "Data Scientist",
    "action1": "Produce Graphs",
    "details1": "Copy free action of the top card in your discard pile",
    "action2": "Paus Ethically",
    "details2": "From now, get an additional +3 processing each time an action is played that give you processing ",
    "cost": "",
    "id": 12,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139672147984404510/ka2ledionysuz_mountain_hall_server_hall_neon_punk_glow_lights_c_bf3fd202-db9f-42b2-bc6f-015769807d36.png",
    "title": "Data Center",
    "action1": "Establish redundancy",
    "details1": "Shuffle played cards each draw 1 , player drawing this gets +8 processing the other -8 data",
    "action2": "Provide Storage",
    "details2": "From now, get an additional +6 data each time an action is played that give you data",
    "cost": "",
    "id": 15,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139931604823842906/ka2ledionysuz_very_thick_lightning_bolt_ligthning_storm_lightni_e02a8b76-8a7c-4dab-8832-c59267603976_20230812164042249.jpg",
    "title": "CPU Voltage Spike",
    "action1": "Accidentally Overclock",
    "details1": "Next round, both players play a card from their discard pile then discard their latest drawn card",
    "action2": "Overload game",
    "details2": "Competition: Player with lowest score after last round, before end game bonuses, get +8 score",
    "cost": "",
    "id": 17,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142880266130575470/ka2ledionysuz_spiderweb_thin_web_detailed__city_background_blur_afae3805-496e-42a4-9d04-72114d66d2eb.png",
    "title": "Neural Network",
    "action1": "Select optimizer algorithm",
    "details1": "+3 data per total 10 data of both players",
    "action2": "Add deep layers",
    "details2": "After Card Draw, discard 1 card then draw a card from any discard pile ",
    "cost": "",
    "id": 18,
    "type": "base"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139850326812409896/ka2ledionysuz_dna_helix_dna_strands_dna_helix_on_top_city_in_ba_d929eb0a-0bb6-46e9-aec3-476439ca8d73.png",
    "title": "Genetic Algorithms",
    "action1": "Mutate Variables",
    "details1": "+18 data if you have 0 data",
    "action2": "Evolve Sequence",
    "details2": "+12 score",
    "cost": "processing",
    "id": 20,
    "type": "base"
  },
  {
    "img": "/chatgpt-apps3/static/media/cloud.ed08c58a14eed5a82dcc.png",
    "title": "Cloud Computing",
    "action1": "Provide Service as a service",
    "details1": "Next round, also copy the free action of the card you play",
    "action2": "Host Everyone",
    "details2": "After Card Draw, swap hand and processing with your opponent if you have at least 1 \nmore processing",
    "cost": "",
    "id": "26",
    "type": "v2"
  },
  {
    "img": "/chatgpt-apps3/static/media/enigma.e3e78ffabe8bec90f8cf.png",
    "title": "Data Encryption",
    "action1": "Reverse the Hash",
    "details1": "+1 processing Next round trigger this action again\n",
    "action2": "Imitate the game",
    "details2": "Next round, both players also get the result of their opponents action ",
    "cost": "",
    "id": "27",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142733494259298315/ka2ledionysuz_cyborg_neon_punk_ultrarealistic_woman_pink_hair_t_bd4f3d05-d9ca-427b-864c-843f6550c6e3.png",
    "title": "Cyborg",
    "action1": "Ascend Humanity",
    "details1": "",
    "action2": "Assemble the AI-Team",
    "details2": "",
    "cost": "",
    "id": "30",
    "type": "v2"
  },
  {
    "img": "https://cdn.midjourney.com/7a0a97c8-4b58-46be-8449-2f40d64e62cf/0_3.png",
    "title": "Blockchain",
    "action1": "Pump and dump",
    "details1": "After card draw both players reveal hands and take 1 \ncard from their opponents hand",
    "action2": "Hodl",
    "details2": "+14 processing ",
    "cost": "",
    "id": "31",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139547103497044140/ka2ledionysuz_cell_phone_tower_epic_sci_fi_neon_punk_style_neon_27db55f4-f4ac-497a-b0d8-8e36cb57cf8b.png",
    "title": "5G Network",
    "action1": "Connect remotely",
    "details1": "+16 data in 2 \nrounds",
    "action2": "Roll over data",
    "details2": "+1 score per card in your discard pile",
    "cost": "",
    "id": "34",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139660085547774012/ka2ledionysuz_cool_sports_car_city_in_background_sci_fi_neon_pu_b36ed901-d3dc-4821-aeb7-26c7dccbcc3c.png",
    "title": "Self Driving Car",
    "action1": "Break for bag",
    "details1": "",
    "action2": "Navigate autonomously",
    "details2": "",
    "cost": "",
    "id": "38",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1144297444658659430/ka2ledionysuz_virtual_reality__in_the_style_of_cloudpunk_realis_1448d4d7-e0fc-4ddc-a187-881c7c5fe43b.png",
    "title": "Virtual Reality",
    "action1": "Ready Player One",
    "details1": "Copy free action of the bottom card of your discard pile",
    "action2": "Enter Matrix ",
    "details2": "Competition: The player or players with data closest to 26 data after last round win +8 score",
    "cost": "",
    "id": "39",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1144921400365297704/ka2ledionysuz_smart_watch_with_galaxy_and_planets_on_the_clock__0f21bdb4-66d8-4ab3-b961-2ce81b6d53c9.png",
    "title": "Wearable Tech",
    "action1": "Forget to charge",
    "details1": "Next round, no card can affect the opponent",
    "action2": "Track steps",
    "details2": "In 2 \nrounds, pick one of +50 data <br> or +25 processing or +10 score",
    "cost": "",
    "id": "40",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1148900580589322240/ka2ledionysuz_industrial_robot_arm_factory_line_with_factory_ro_0c750faf-9785-4fac-bf17-dd6877bdf73f.jpg",
    "title": "Industrial Automation",
    "action1": "Assemble Selectively and Comply",
    "details1": "Swap 1 card from your hand with 1 card from your discard pile",
    "action2": "Pick and Place",
    "details2": "Next round you get double score data processing from all actions affecting you",
    "cost": "",
    "id": "41",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1143134582061928458/ka2ledionysuz_advanced_architecture_building_that_looks_like_a__feeef7b7-25b2-4b6c-ba46-f20ec007093b.jpg",
    "title": "SuperComputer",
    "action1": "Benchmark LINPACK",
    "details1": "+20 data and in 2 \nrounds opponent also <br> gain +20 data",
    "action2": "Achieve petaflop",
    "details2": "In 2 \nmore rounds, opponent lose 28 data",
    "cost": "",
    "id": "43",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140375094791778325/ka2ledionysuz_military_quad_copter_drone_flying_extremly_fast_b_4ec0b597-e8a9-4917-ab29-e8994fa3461b.png",
    "title": "Unmanned Aerial Vehicles",
    "action1": "Loop in the human",
    "details1": "",
    "action2": "Strike Signature",
    "details2": "",
    "cost": "",
    "id": "46",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140396421388964001/ka2ledionysuz_friendly_andronygous_robot_butler_apple_droid_kit_69f5e3ec-3b59-4da3-81dd-307bfedc6627.png",
    "title": "Digital Assistant",
    "action1": "Set timer for 2 minutes",
    "details1": "Next time, including this round, that opponent gain data gain same amount  of data",
    "action2": "Record secretly",
    "details2": "Auction: +8 score to highest bidder, you can match and win, opponent raise by min 5 data",
    "cost": "Min 25 data",
    "id": "47",
    "type": "v2"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140287671328059463/ka2ledionysuz_roomba_tank_very_high_tech_advanced_sci_fi_cleani_f4617fe2-a90d-4b22-b83b-d896103ac3e6.png",
    "title": "Robot vacuum",
    "action1": "Map home",
    "details1": "",
    "action2": "Clean floors",
    "details2": "",
    "cost": "",
    "id": "49",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140276690422087720/ka2ledionysuz_severl_very_different_video_game_characters_group_47a66963-86f2-4a45-9998-1169117ea41f.jpg",
    "title": "Non Player Character",
    "action1": "Follow Path",
    "details1": "+16 data if you have less data than opponent \n",
    "action2": "Adjust difficulty",
    "details2": "Before Card Draw, collect cards on hands and divide equally as you choose",
    "cost": "",
    "id": "50",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1147100135713685514/ka2ledionysuz_neon_punk_style_high_speed_train_tunnel_tron_bf0aed32-07b0-4af6-8463-cb50cb94d486.png",
    "title": "Virtual Private Network ",
    "action1": "Tunnel TV",
    "details1": "",
    "action2": "Trick tyrant",
    "details2": "",
    "cost": "",
    "id": "51",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1147155155020689492/ka2ledionysuz_realistic_blue_fire_blue_flames_sci_fi_computer_m_0e6538a8-020e-4ea8-b129-523b89e4eb4f_20230901150455211.jpg",
    "title": "Firewall",
    "action1": "Block incoming traffic ",
    "details1": "+1 score and +3 score if you have less score than opponent",
    "action2": "Disable \"temporarily\"",
    "details2": "Competition: The player with \"Data Protection\" in their discard pile at game end get +8 score",
    "cost": "20 data or 8 processing",
    "id": "53",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1147175809128349736/ka2ledionysuz_Glowing_neon_lamps_high_tech_sci_fi_background_oa_fb8918ad-6a93-4476-9c47-3396e35d0763.png",
    "title": "Decision Tree",
    "action1": "Plant root node",
    "details1": "Take 1 \nrandom card from opponent's hand and then give 1 card of your choice",
    "action2": "Prune leaf",
    "details2": "+2 Data per 1 Processing or +1 processing per 2 data spent",
    "cost": "",
    "id": "54",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1147233621837623447/ka2ledionysuz_sound_waves_visual_sound_waves_coming_from_sci_fi_1013556e-c83b-42a7-8744-75427947ca80.png",
    "title": "Natural Language Processing",
    "action1": "Pre-train generative transformer",
    "details1": "+4 processing and +4 processing if you have more score than opponent\n",
    "action2": "Tokenize world",
    "details2": "Move top 3 cards from opponents discard pile to yours and rearrange your entire discard pile",
    "cost": "",
    "id": "55",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1147610006393462884/ka2ledionysuz_adorable_robot_neon_punk_style_background_sci_fi__1b69ad00-cf16-49ae-a2b2-07d4d7467f62.png",
    "title": "Recommender System",
    "action1": "Continue watching and don't ask again",
    "details1": "+6 data and +12 data per 10 score",
    "action2": "Filter presidents ",
    "details2": "Merge discard piles, all cards go in the same pile and it counts as both yours and your opponents",
    "cost": "",
    "id": "58",
    "type": "v3"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1143446062678413342/ka2ledionysuz_very_cute_robot_dog_happy_cute_puppy_robot_neon_g_41fb5ed3-a31e-4419-862c-6b8edd1b1c3f.png",
    "title": "Robot dog - K9",
    "action1": "Fetch Algorithm",
    "details1": "",
    "action2": "Bite Encryption",
    "details2": "",
    "cost": "",
    "id": "76",
    "type": "animals"
  },
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
  const [baseActionsRef, saveBaseActions] = useSave("BaseActions");
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
        <button onClick={saveBaseActions}>Save Base Rules</button>
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
  const index = Math.floor(Math.random() * 100000000);
  return (
    <CardText key={index} height={cost == null ? "0px" : "52px"}>
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
                <Image id={`img-${id}`} src={imgUrl} /> {/* Original Image */}
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
                <Title>Base Actions</Title>
            </TitleWrapper>
          </ImageContainerRules>
        </Border>
        <br></br>
        <br></br>
        <CardActions key={id + "111"} title={"Data Accumulation"} details={"+4 Data and +4 Data per 10 Data"} ></CardActions>
        <CardActions key={id + "222"} title={"Processing Optimization"} details={"+1 Processing per card in your discard pile and hand"}></CardActions>
        <br></br>
        <CardActions key={id + "222"} title={"Data Conversion"} details={"+2 Score per 10 Data spent"} cost={"All Data"}></CardActions>
        <CardActions key={id + "222"} title={"Processing Leveraging"} details={"+4 Score per 10 Processing spent"} cost={"All Processing"}></CardActions>
        <br></br>
        <CardActions key={id + "111"} title={"ROI"} details={"Any Cost action returns: 16 data or 8 processing"} ></CardActions>
      </FadeBackground>

    </CardContainer>
  );
});



const iconSize = "20px";
const iconStyle = { width: iconSize, height: iconSize, verticalAlign: 'middle', margin: "-2px -2px -2px 0px" };
const iconStyleCard = { width: "12.3px", height: "18px", border: "1px solid #005555", verticalAlign: 'middle', margin: "-2px -2px -2px 0px" };
const iconStyleCards = { width: "12.3px", height: "18px", border: "1px solid #005555", verticalAlign: 'middle', margin: "-2px -2px -4px -9px" };
const iconStyleSpace = { width: "26px", height: "26px", verticalAlign: 'middle', margin: "-4px -9px -2px -5px", transform: "rotate(45deg)" };
const ScoreIcon = () => <img src={scoreIcon} alt="score" style={iconStyle} />
const DataIcon = () => <img src={dataIcon} alt="data" style={iconStyle} />
const CardIcon = () => <img src={back_v3} alt="card" style={iconStyleCard} />
const CardsIcon = () => <><img src={back_v3} alt="card" style={iconStyleCard} /><img src={back_v3} alt="card" style={iconStyleCards} /></>
const ProcessingIcon = () => <img src={processingIcon} alt="processing" style={iconStyle} />
const SpaceIcon = () => <img src={space2} alt="space" style={iconStyleSpace} />


const ImageContainerRules = styled.div`

  width: 100%;
	  	
  `;

const ImageRules = styled(Image)`

  width: 100%;
  height: 100%;	
  object-fit: cover;
  filter: brightness(10%);
  margin: -20px;
  `;
const DuplicateImageRules = styled.img`
height: calc(100% );
filter: brightness(10%);
width: calc(100% );
left: 0;
top: 0;
margin: 0px;
position: absolute;
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