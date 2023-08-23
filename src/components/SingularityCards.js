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
let BRIDGE_VERSION = MOBILE_CARDS ? false : false;
const bridge_width = "57mm";
const bridge_height = "89mm";
const poker_width = "63mm";
const poker_height = "88mm";
const print_margin = 20;
const default_padding = "0px";
const default_font_size = MOBILE_CARDS ? "17px" : "11px";
const default_cost_font_size = MOBILE_CARDS ? "17px" : "11px";
const default_title_size = MOBILE_CARDS ? "15px" : "9px";
const default_number_size = MOBILE_CARDS ? "18px" : "12px";
const default_img_size = !MOBILE_CARDS ? BRIDGE_VERSION ? "95%" : "87%" : "40%";
const default_action_size = !MOBILE_CARDS ? BRIDGE_VERSION ? "37%" : "37%" : "66%";
const save_size = MOBILE_CARDS ? 2 : PRINT_VERSION ? 9 : 4;
const BRIGHTNESS_ADJUSTMENT = 1.3;

const SIDE_MARGIN = 0;




const initialCards = [
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142556730610434240/ka2ledionysuz_harvest_machine_tractor_farm_harvest_field_crops__73632be9-6ec6-4b7b-95cf-d92c8d1935ff.png",
    "title": "Data Farm",
    "action1": "Launch Data Seeding Simulation",
    "details1": "Copy free action of the first card opponent plays this turn",
    "action2": "Harvest Data",
    "details2": "+2 score and +2 Score per 10 Data",
    "cost": "All Data"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139834404479455242/ka2ledionysuz_many_chess_pieces_chess_board_symmetrical_sci_fi__61c7e9bc-0f8a-43b4-90ae-0762d93fb7f5.png",
    "title": "Deep Blue",
    "action1": "Apply Alpha-Beta pruned Minimaxing",
    "details1": "+4 data and +4 data per 10 data",
    "action2": "Roll out the nodes",
    "details2": "Before Card Draw, reveal both players hands and choose a free action to copy twice",
    "cost": "8 Data or 6 processing"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142917895148552353/ka2ledionysuz_cute_robot_sitting_at_school_desk_with_papers_and_3e0783c4-2dc1-4963-b6f0-7b84cc45eedf.png",
    "title": "Supervised Learning",
    "action1": "Calibrate Reward Parameters",
    "details1": "+6 data +3 data per 10 data",
    "action2": "Outsource Labeling",
    "details2": "After Card Draw, swap hand and processing with your opponent if you have at least 1 \nmore processing",
    "cost": "Processing Advantage"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139954903402430554/ka2ledionysuz_waporpunk_neon_glow_epic_4f61a6dc-c0dc-413b-a7ff-15345e971973.jpg",
    "title": "Weighted Neurons",
    "action1": "Compute Gradient Descent",
    "details1": "+6 data and + 10 data if the top card in your discard pile has 'Data' in its name",
    "action2": "Regularize Weights",
    "details2": "Before Card Draw, collect cards on hands and divide equally as you choose",
    "cost": "10 data or 5 processing"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142707732097540116/ka2ledionysuz_big_easel_in_center_very_illuminated_glow_glowing_d5d54114-6335-452c-a2f2-b847a85d7d33.png",
    "title": "FontSConvolutional Neural Network",
    "action1": "Reconstruct Latent Space",
    "details1": "+12 processing and +6 processing to your opponent",
    "action2": "Contest Art",
    "details2": "Competition: The player with highest reached data starting now get +8 score at end of game",
    "cost": "10 data or 10 processing"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142550685653676065/ka2ledionysuz_computer_board_city_tilt_shift_lens_circuitry_cit_7129fbec-38e4-4e02-b103-bc5a1f6c9bff.png",
    "title": "Tensor Processing Unit",
    "action1": "Integrated application-specific circuit",
    "details1": "+5 data per 10 data to both players",
    "action2": "Multiply the Matrix",
    "details2": "+1 score +4 processing and +5 processing per <br> 10 Data ",
    "cost": "All data"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139670504286998558/ka2ledionysuz_bionic_eye_artificial_eye_wires_circuits_in_eye___604957da-d751-4a0d-bd2e-ffa8d2b15203.jpg",
    "title": "Computer Vision",
    "action1": "Detect objects",
    "details1": "+6 data and + 3 data per 10 data and after Card Draw, both players reveal their hand",
    "action2": "Tune model",
    "details2": "Get half difference in score if opponent has <br> more score",
    "cost": "Half Processing and Half data"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142880266130575470/ka2ledionysuz_spiderweb_thin_web_detailed__city_background_blur_afae3805-496e-42a4-9d04-72114d66d2eb.png",
    "title": "Neural Network",
    "action1": "Select optimizer algorithm",
    "details1": "+4 data and +4 data per 10 data",
    "action2": "Add deep layers",
    "details2": "+3 score and before Card Draw, look at and rearrange the top 4 \ncards",
    "cost": "8 data or 4 processing"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139672147984404510/ka2ledionysuz_mountain_hall_server_hall_neon_punk_glow_lights_c_bf3fd202-db9f-42b2-bc6f-015769807d36.png",
    "title": "Data Center",
    "action1": "Establish redundancy",
    "details1": "+2 \nand +4 \nper 10 \nto either data or processing",
    "action2": "Provide Storage",
    "details2": "+3 score per 10 data spent if you have more Data than opponent",
    "cost": "Data Difference"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142730316168036352/ka2ledionysuz_robot_in_the_style_of_neon_punk_illustration_glow_a9ac3f6a-c568-4311-af91-2ce8ea251452.png",
    "title": "Data Protection",
    "action1": "Activate Security Protocol",
    "details1": "+4 processing and +4 processing if opponent has 0 processing",
    "action2": "Disable Firewall",
    "details2": "+8 score in 1 \nmore round",
    "cost": "32 data or 16 processing"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139863103954243634/ka2ledionysuz_robot_insect_flying_over_city_wasps_three_rovot_i_6eb827db-6521-4416-88f0-5e0e7840e6f1.png",
    "title": "Swarm Intelligence",
    "action1": "Apply swarm solutions",
    "details1": "+4 Data and +4 Data per 10 Data",
    "action2": "Release the Swarm",
    "details2": "+2 score and get either +2 data per 1 processing spent or +1 processing per 2 data spent ",
    "cost": "All data or All processing"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139850326812409896/ka2ledionysuz_dna_helix_dna_strands_dna_helix_on_top_city_in_ba_d929eb0a-0bb6-46e9-aec3-476439ca8d73.png",
    "title": "Genetic Algorithms",
    "action1": "Mutate Variables",
    "details1": "+4 processing and +5 processing per 10 processing",
    "action2": "Evolve Sequence",
    "details2": "In 1 \nmore round +3 Score per 10 data spent now",
    "cost": "All Data"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142714394296451122/ka2ledionysuz_robot_boxers_boxing_ring_gloves__in_the_style_of__f4b3ce2e-ee37-4e51-b7d2-448015870e8a.jpg",
    "title": "FontSGenerative Adversarial Network",
    "action1": "Deceive Discriminator",
    "details1": "+2 data per card in your discard pile",
    "action2": "Begin Zero-Sum Game",
    "details2": "Competition: The player with the most processing after 2 \nmore rounds gets +8 score",
    "cost": "4 data or 4 processing"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1143094380132048917/ka2ledionysuz_copper_coils_advanced_sci_fi_quantum_engine_hangi_a6c54a8a-a292-46bf-af5a-32cec74bca83.jpg",
    "title": "Quantum Computing",
    "action1": "Get Quantum Entangled",
    "details1": "Both players lose up to 12 data each",
    "action2": "Enable Quantum Supremacy",
    "details2": "+2 score and +4 Score per 10 Processing spent",
    "cost": "All Processing"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142872458567880836/ka2ledionysuz_rat_in_human_clothes_in_labyrinth_maze_tron__in_t_39c4a69e-2896-42f2-a001-b3f9ed1417d3.jpg",
    "title": "Reinforcement Learning",
    "action1": "Explore Greedily",
    "details1": "+4 data and +4 data per 10 data",
    "action2": "Predict Q Values",
    "details2": "+2 score per 10 \ntotal data and processing spent",
    "cost": "All data and All processing"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139938474171048099/ka2ledionysuz_many_puzzle_pieces_neon_lines_shaped_like_jigsaw__12bb6b20-7000-4022-b490-8b3fccc0ff4f.png",
    "title": "Recurrent Neural Network",
    "action1": "Recall Long Short-Term Memory",
    "details1": "Loan 20 data pay back up to 26 data in 2 \nrounds",
    "action2": "Backpropagate Errors",
    "details2": "+1 score per card in your discard pile",
    "cost": "3 data per card"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139931604823842906/ka2ledionysuz_very_thick_lightning_bolt_ligthning_storm_lightni_e02a8b76-8a7c-4dab-8832-c59267603976_20230812164042249.jpg",
    "title": "CPU Voltage Spike",
    "action1": "Accidentally Overclock",
    "details1": "Set your data to the next whole 10 data",
    "action2": "Overload game",
    "details2": "Competition: The player with \"Data Protection\" in their discard pile at game end get +8 score",
    "cost": "10 data or 6 processing"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142888684128059553/ka2ledionysuz_miners_axe_sledge_sledge_hammer_axe_coal_miner_ho_b40227a0-9db6-43ab-bf76-c000c78d23aa.jpg",
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
    "action2": "Paus Ethically",
    "details2": "This round, block all actions, delayed actions, and costs except this; all affected cards go to your discard pile",
    "cost": "Half data min 10 data"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139871629153947748/ka2ledionysuz_internet_of_thingslightbulbs_smart_phones__in_the_dd9d50fe-64a4-4c2d-b321-31d5e972f87d.png",
    "title": "Internet Of Things",
    "action1": "Automate lighting",
    "details1": "+2 Data Next round trigger this action again",
    "action2": "Install smart lock",
    "details2": "Next 2 \nrounds, your actions can't be blocked and your data processing score can't be reduced by opponent",
    "cost": "10 data or 6 processing "
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139971192028135456/ka2ledionysuz_colorful_glowing_lab_vials_chemicals_in_laborator_d25ea740-b3dd-4794-b4e3-62fa5f90cb86.png",
    "title": "Graph Neural Network",
    "action1": "Pool the nodes",
    "details1": "+4 data and +4 data per 10 data",
    "action2": "Calculate matrix",
    "details2": "Next round opponent choose and reveal what card and action to play before you decide",
    "cost": "8 processing or 20 data "
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142732946063757312/robot2.96471c1c82d6a7265760.jpg",
    "title": "ChatGPT",
    "action1": "Say \"Please\" and \"Thank You\" ",
    "details1": "+1 processing per card in your discard pile",
    "action2": "Transform tokens",
    "details2": "+8 data and +4 data per score",
    "cost": "All score"
  },
  {
    "img": "/chatgpt-apps3/static/media/clock2.23a49361aac0eac6e16e.png",
    "title": "FontSTemporal Difference Learning",
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
    "details1": "+6 data and +12 data if you reveal a card from your hand with 'Network' in its name",
    "action2": "Get ready, set, go",
    "details2": "Auction: +6 score to highest bidder, you can match and win, opponent raise by min 5 data",
    "cost": "Min 25 data"
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
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142733494259298315/ka2ledionysuz_cyborg_neon_punk_ultrarealistic_woman_pink_hair_t_bd4f3d05-d9ca-427b-864c-843f6550c6e3.png",
    "title": "Cyborg",
    "action1": "Ascend Humanity",
    "details1": "Copy free action of the top card in your discard pile",
    "action2": "Assemble the AI-Team",
    "details2": "+3 score per card of either \"ChatGPT\", \"Deep Blue\", \"AlphaGo\" and \"Watson\" in your discard pile",
    "cost": "4 data per card"
  },
  {
    "img": "https://cdn.midjourney.com/7a0a97c8-4b58-46be-8449-2f40d64e62cf/0_3.png",
    "title": "Blockchain",
    "action1": "Pump and dump",
    "details1": "Shuffle both played cards, each draw 1 , player drawing this gets +8 data the other -8 data  ",
    "action2": "Hodl",
    "details2": "Freeze your data for 2 \nrounds, it can't increase or decrease, then get +6 score",
    "cost": "All processing min 8"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139494867312058418/ka2ledionysuz_cute_robots_grouped_by_different_colors_sci_fi_ne_3fc7e161-9dee-4cbb-88dd-6aa75830d67d.png",
    "title": "K-means Cluster",
    "action1": "Recompute Centroid",
    "details1": "Next round, both players play a card from their discard pile then discard their latest drawn card",
    "action2": "Fuse Clusters",
    "details2": "+2 score and +4 score per 10 data or processing spent, oppotent gain half score gained",
    "cost": "All data or All Processing"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139520104095293491/ka2ledionysuz_boxes_text_brain_textbook_text_boxes_info_infomat_1e8ed740-815e-48f3-8c9c-bb2b1e996a1f_20230811132557248.jpg",
    "title": "Explainable AI",
    "action1": "Boost Transparency",
    "details1": "Flip and spread each card in the draw pile",
    "cost": "22 data or 10 processing",
    "action2": "Explain model",
    "details2": "Next time including this round, opponent gain score, gain same amount"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139547103497044140/ka2ledionysuz_cell_phone_tower_epic_sci_fi_neon_punk_style_neon_27db55f4-f4ac-497a-b0d8-8e36cb57cf8b.png",
    "title": "5G Network",
    "action1": "Connect remotely",
    "details1": "+9 data or +6 processing",
    "action2": "Roll over data",
    "details2": "Start next game with half the amount of data spent now",
    "cost": "All data"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139558590835859526/ka2ledionysuz_A_house_on_a_steep_cliff_nature_epic_sci_fi_neon__01721774-2b32-449c-9a5e-99ae9be48372.png",
    "title": "Edge Computing",
    "action1": "Process locally",
    "details1": "+5 processing +5 processing per 10 processing",
    "action2": "Live on the edge",
    "details2": "Can't spend data until last round, +1 score per round left",
    "cost": "4 processing or 10 data"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140685171197227039/ka2ledionysuz_bank_vault_round_door_metal_lock_high_tech_magic__71bd6190-ead6-4fbe-87cc-15fd0640f8cc.png",
    "title": "Data Vault",
    "action1": "Promise protection",
    "details1": "+8 score to both players",
    "action2": "Exchange keys",
    "details2": "Swap discard pile, you get to keep 1  of the cards in yours",
    "cost": "4 processing or 8 data"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139648200614088714/ka2ledionysuz_male_robot_on_beach_sunbathing_sand_water_paradis_3a89981c-40aa-410c-ad0f-be13dcb5004f.png",
    "title": "Virtual Influencer",
    "action1": "Generate generic content",
    "details1": "+4 data and +2 data per totalt 10 data of both players",
    "action2": "Follow back",
    "details2": "Next round, both players get the result of the other players action",
    "cost": "12 data or 6 processing "
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139660085547774012/ka2ledionysuz_cool_sports_car_city_in_background_sci_fi_neon_pu_b36ed901-d3dc-4821-aeb7-26c7dccbcc3c.png",
    "title": "Self Driving Car",
    "action1": "Break quickly ",
    "details1": "Next round, both players score gain is halved",
    "action2": "Navigate autonomously",
    "details2": "Steal up to as much data from opponent as processing spent",
    "cost": "All processing"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139915179958751353/ka2ledionysuz_virtual_reality__sci_fi_neon_punk_style_neon_glow_7523f63c-0a13-46be-86b3-b270bf5fb102.png",
    "title": "Virtual Reality",
    "action1": "",
    "details1": "",
    "action2": "",
    "details2": "",
    "cost": ""
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139898518866243704/ka2ledionysuz_smart_watch__sci_fi_neon_punk_style_neon_glow_thi_41d7d729-9815-4134-8eb0-5ea038acbd53.png",
    "title": "Wearable Tech",
    "action1": "",
    "details1": "",
    "action2": "",
    "details2": "",
    "cost": ""
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139920560520970330/ka2ledionysuz_production_line_robot_arm_industry_factory__drawi_7a47e4ee-4f57-4be1-812f-6b5654027380.jpg",
    "title": "Industrial Automation",
    "action1": "Assemble Selectively and Comply",
    "details1": "+1 processing Next round trigger this action again",
    "action2": "Pick and Place",
    "details2": "After card draw, discard your last drawn card, then draw a card from opponents discard pile ",
    "cost": "10 data or 6 processing"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140205636831957012/ka2ledionysuz_electromagnetic_machine__destroying_hard_drive_ma_2b452d35-677d-41fc-a7ee-4ed21fd1385b.png",
    "title": "Degausser",
    "action1": "Destroy Magnetic Drive",
    "details1": "Both players lose half data",
    "action2": "Comply with regulations",
    "details2": "+3 score per 10 data spent",
    "cost": "Half data"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1143134582061928458/ka2ledionysuz_advanced_architecture_building_that_looks_like_a__feeef7b7-25b2-4b6c-ba46-f20ec007093b.jpg",
    "title": "SuperComputer",
    "action1": "Benchmark LINPACK",
    "details1": "+4 processing and +6 processing if you have more score than opponent",
    "action2": "Achive petaflop",
    "details2": "+10 score --TEMP",
    "cost": "30 data and 12 processing"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140276690422087720/ka2ledionysuz_severl_very_different_video_game_characters_group_47a66963-86f2-4a45-9998-1169117ea41f.jpg",
    "title": "Non Player Character",
    "action1": "Follow Path",
    "details1": "Next round, both players free action will instead be +4 data and +4 data per 10 data",
    "action2": "Behave scripted",
    "details2": "The action opponent plays this turn is delayed for 2 \nmore rounds including paying cost",
    "cost": "7 processing or 16 data"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140287671328059463/ka2ledionysuz_roomba_tank_very_high_tech_advanced_sci_fi_cleani_f4617fe2-a90d-4b22-b83b-d896103ac3e6.png",
    "title": "Robot vaccum",
    "action1": "Map home",
    "details1": "+4 data per cat or dog poop it smears ",
    "action2": "Clean floors",
    "details2": "Your floors are always clean",
    "cost": "12 processing "
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140296759462088767/ka2ledionysuz_epic_roller_coaster_loop_fire_twist_high_insane_h_0778fb0f-85f1-4b51-b9ae-958600910316.png",
    "title": "High frequency trading",
    "action1": "Ping an iceberg",
    "details1": "Before card draw, both players choose one card from their hand to give to their opponent",
    "action2": "Short stock",
    "details2": "Opponent can't gain score next round",
    "cost": "8 processing or 20 data"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140375094791778325/ka2ledionysuz_military_quad_copter_drone_flying_extremly_fast_b_4ec0b597-e8a9-4917-ab29-e8994fa3461b.png",
    "title": "Unmanned Aerial Vehicles",
    "action1": "Loop in the human",
    "details1": "+6 data and +14 data per 10 score",
    "action2": "Strike Signature",
    "details2": "+1 score per 10 data more than opponent. Opponent lose data equal to data spent",
    "cost": "All data"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140396421388964001/ka2ledionysuz_friendly_andronygous_robot_butler_apple_droid_kit_69f5e3ec-3b59-4da3-81dd-307bfedc6627.png",
    "title": "Digital Assistant",
    "action1": "Set timer for 2 minutes",
    "details1": "+16 data in 2 \nrounds",
    "action2": "Record secretly",
    "details2": "+12 score",
    "cost": "25 processing or 50 data"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140692625591111910/ka2ledionysuz_lake_in_front_if_sci_fi_city_boats_moon_light__in_8a7a6ab8-c9fb-495c-8af5-c26ed962c578.png",
    "title": "Data Lake",
    "action1": "",
    "details1": "",
    "action2": "",
    "details2": "",
    "cost": ""
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1140698804262285392/ka2ledionysuz_high_tech_cylinder_metal_floating_in_space_with_s_4e646d93-1c3f-4b7e-98da-01ffe2295501.png",
    "title": "Capsule Network",
    "action1": "Generalize features",
    "details1": "+6 processing and + 6 processing per 10 score",
    "action2": "Remember Hierarchies",
    "details2": "Reveal a card on hand and play its Cost Action",
    "cost": "Card cost"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1139465636477673552/ka2ledionysuz_sci_fi_rocket_to_the_red_planet_neon_punk_style_n_f9a0dc63-1e4c-4286-b9c0-4520d5870cf2.png",
    "title": "Mars Mission",
    "action1": "Blast off",
    "details1": "",
    "action2": "Aerobreak",
    "details2": "",
    "cost": "Data or Processing"
  },
  {
    "img": "https://media.discordapp.net/attachments/1139234832178745466/1139939784857493647/ka2ledionysuz_Space_mining_tool_asteroid__Illustration_Inverted_145f9858-4c70-4533-8c02-a80bdfc72ccf.png",
    "title": "Asteroid Mining",
    "action1": "Action 1",
    "details1": "Gain same amount of data that opponent gained of any resources last turn",
    "action2": "Action 2",
    "details2": "+4 processing and +4 processing if opponent did not play a Space Card last turn ",
    "cost": ""
  },
  {
    "img": "https://media.discordapp.net/attachments/1139234832178745466/1139939785373401179/ka2ledionysuz_Space_elevator_epic_space_view_gigantic_planet_sc_a8bcb677-cacc-4db3-87fd-1d734eaa12c6.png",
    "title": "Space Elevator",
    "action1": "",
    "details1": "+1 processing per 2 data opponent gained last turn",
    "action2": "",
    "details2": "",
    "cost": ""
  },
  {
    "img": "https://media.discordapp.net/attachments/1139234832178745466/1139939784387723444/ka2ledionysuz_fuel_tanks_epic_silo_sci_fi_neon_punk_style_neon__6f77ea7e-f4c4-4398-abb1-ef4403b7fd10.png",
    "title": "Fuel Reserve",
    "action1": "",
    "details1": "",
    "action2": "",
    "details2": "",
    "cost": ""
  },
  {
    "img": "https://media.discordapp.net/attachments/1139234832178745466/1139939786661044345/ka2ledionysuz_Passanger_plane_robot_wearing_pilot_suit_and_whit_6f39f8cf-9b34-44d9-9933-afd3d069bf0a.png",
    "title": "Autopilot",
    "action1": " Derive proportionally",
    "details1": "+1 score",
    "action2": "Control Cruise",
    "details2": "Steal space card from opponents discard pile and play its free action",
    "cost": "12 data or 6 processing"
  },
  {
    "img": "https://media.discordapp.net/attachments/1139234832178745466/1139939787147591740/ka2ledionysuz_sleeping_humans_in_water_pod_spaceship_cryo_sleep_4de79d0c-98c9-40b4-8679-f84d8e7aa60c.png",
    "title": "Suspended Animation",
    "action1": "Nap ",
    "details1": "+5 data and +5 data per space card activated this round",
    "action2": "Sleep deeply",
    "details2": "",
    "cost": ""
  },
  {
    "img": "https://media.discordapp.net/attachments/1139234832178745466/1139939787936112732/ka2ledionysuz_cute_happy_friendly_nice_baby_alien_sci_fi_neon_p_32bd9d8b-b9fc-4ab8-85f9-e6e6269eb43d.png",
    "title": "First contact",
    "action1": "Shake hands",
    "details1": "Reveal space card from hand to play its free action",
    "action2": "Misscommunicate ",
    "details2": "Play up to 2 \nfree actions of space cards in your discard pile ",
    "cost": "10 data or 6 processing"
  },
  {
    "img": "https://media.discordapp.net/attachments/1139234832178745466/1139939787579600927/ka2ledionysuz_moon_base_viewed_from_the_sky_city_glass_dome_sci_555f1105-5ee1-47b3-9d45-fd2346156680.png",
    "title": "Moon Capital",
    "action1": "Plant potatoes",
    "details1": "+4 processing and +4 processing   per space card activated this round",
    "action2": "Terraform",
    "details2": "Play free action of all space cards in your discard pile ",
    "cost": "18 data or 8 processing"
  },
  {
    "img": "https://media.discordapp.net/attachments/1139234832178745466/1139939785822175272/ka2ledionysuz_spaceship_light_trail_gravity_swing_manoeuver_aro_21672fe1-9000-4856-9f8f-b1e900d3b268.png",
    "title": "Oribital Railgun",
    "action1": "Levitate magnetically",
    "details1": "+8 data and +8 data if another space card is activated this round",
    "action2": "Slingshot passenger",
    "details2": "Play free action of any space card in your discard pile",
    "cost": "6 data or 3 processing"
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142443454744510566/ka2ledionysuz_space_ship_in_space_flying_in_the_style_of_neon_p_69ce1828-77e4-45fc-9b5f-794527fe4e50.png",
    "title": "Space Ship",
    "action1": "+6 data and +6 data per ",
    "details1": "",
    "action2": "",
    "details2": "",
    "cost": ""
  },
  {
    "img": "https://cdn.discordapp.com/attachments/1139234832178745466/1142532226769231902/ka2ledionysuz_galaxy_vortex_night_sky_above_planet_epic_black_h_a8dc0e2d-762a-4df7-b431-937f168abe65.jpg",
    "title": "Black Hole",
    "action1": "",
    "details1": "",
    "action2": "",
    "details2": "",
    "cost": ""
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
  if (cardTitle.startsWith('FontS')) {
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
const iconStyle = { width: iconSize, height: iconSize, verticalAlign: 'middle', margin: "-0px" };
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
  margin-left:${PRINT_VERSION ? "-" + print_margin * 1 + "px" : "-" + default_padding};
  height: 100%;
  margin-top:${PRINT_VERSION ? "-" + print_margin + "px" : "-" + default_padding};
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
  font-size: 11.5px;
`;

const TopHalf = styled.div`
  position: absolute;
  top:  ${SIDE_MARGIN-4}px;
  left:  ${SIDE_MARGIN}px;
  width: calc(100% -   ${SIDE_MARGIN*2}px);
  height: 50%;
`;

const BottomHalf = styled.div`
  position: absolute;
  bottom: 3px;
  left: 0;
  width: calc(100% -   ${(SIDE_MARGIN+2)*2}px);
  height:  ${default_action_size}; 
  padding:   ${SIDE_MARGIN+2}px;
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
white-space: nowrap;
font-size:${default_cost_font_size};
text-shadow: 0 0 5px rgba(230,177,42,0.7);
    float:right;
    margin-right:3px;
    margin-top:-2px;
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
        width: cardRef.current.clientWidth * scale,
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