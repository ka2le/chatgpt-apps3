import React, { useState, useEffect } from "react";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import { DisplaySettings } from "@mui/icons-material";


const PRINT = true
const ONLINE = !PRINT;

const NO_EXTRA_CARDS = true;

// Constants and Default Settings
const FONT_SIZE = ONLINE ? 120 : 85;
const MULTIPLIER_ICON_SIZE = ONLINE ? 50 : 35;
const CD_ICON_ENLRAGEMENT = 20;
const MARGIN_SIZE = ONLINE ? 20 : 55;
const CONTENT_PADDING = ONLINE ? 10 : 30;
const CARD_WIDTH = 635;
const CARD_HEIGHT = 888;
const SAVE_SCALE = ONLINE ? 0.4 : 4;
const INNER_SIZE_PERCENT = ONLINE ? 100 : 95;

const STAT_ICONS = [
    { name: "robot", icon: "https://ka2le.github.io/chatgpt-apps3/images/mp/robot_sharp.png" },
    { name: "rabbit", icon: "https://ka2le.github.io/chatgpt-apps3/images/mp/rabbit.png" },
    { name: "dragon", icon: "https://ka2le.github.io/chatgpt-apps3/images/mp/dragon.png" },
    { name: "monster", icon: "https://ka2le.github.io/chatgpt-apps3/images/mp/monster2.png" },
];

const DISPLAY_SETTINGS = {
    dmgIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/suit_hearts_broken.png",
    multiplierIcon: "*",
    cdIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/hourglass.png",
    cdMaybeIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/hourglass_question.png",
    arrowIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/arrow2.png",
    // startIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/timer_100.png",
    //startIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/play.png",
    startIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/extra_icons/card_lift.png",
    starIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/star.png",
    fastIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/fastforward.png",
    cardAddIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/card_add.png",
    copyCardIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/cards_fan_outline.png",
    reuseCardIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/reuse_card.png",
    shieldIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/shield.png",
    defaultImage: "https://via.placeholder.com/635x888",
    noCardIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/extra_icons/card_target.png",
};

const DEFAULT_CARDS1 = [
    {
        "cardName": "no_stats_to_2",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/98e1b5b8-4db0-4bc7-b345-ccaa8d52e2af/0_0.png"
        ],
        "cardType": "action",
        "stats": [],
        "effect": {},
        "customEffect": [
            "0",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/arrow2.png",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/star.png",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/star.png",
        ],
        "cd": 1
    },
    {
        "cardName": "draw_all_new_1",
        "copies": 1,
        "images": [
           // "https://cdn.midjourney.com/33a35721-2c77-46b5-8773-00fc44b89f68/0_0.png",
           // "https://cdn.midjourney.com/0443e82b-62c3-4332-a365-05a124946525/0_1.png",
            "https://cdn.midjourney.com/42b797a2-1802-4598-bdf6-84e186613322/0_0.png",
            //"https://cdn.midjourney.com/258f05ea-fbbd-43f8-9031-7b8204e1ca99/0_0.png",
           // "https://cdn.midjourney.com/55e3b4b8-70fb-4527-bd77-0a2cfdfde70d/0_2.png",
            

        ],
        "cardType": "action",
        "stats": [],
        "effect": {},
        "customEffect": [
            //"https://ka2le.github.io/chatgpt-apps3/images/mp/extra_icons/cards_under.png",
            //"https://ka2le.github.io/chatgpt-apps3/images/mp/extra_icons/cards_take.png",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/extra_icons/arrow_rotate.png",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/card_add.png"
        ],
        "cd": -1
    },
    
    {
        "cardName": "extra_turn",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/0a82e853-f51e-49b2-b54d-32c30661901c/0_0.png",
            "https://cdn.midjourney.com/dec471f7-cce7-40e0-95b3-797091b9971b/0_3.png",
        ],
        "cardType": "action",
        "stats": [],
        "effect": {},
        "customEffect": [
            "https://ka2le.github.io/chatgpt-apps3/images/mp/fastforward.png",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/hourglass.png"
        ],
        "cd": -1
    },
    {
        "cardName": "Shield2",
        "copies": 3,
        "images": [
            //"https://cdn.midjourney.com/1617f771-5d18-4091-bbbe-97f2652171f9/0_0.png",
            "https://cdn.midjourney.com/100679fa-50af-4fad-9a8b-8ad4623f9e65/0_0.png",
            "https://cdn.midjourney.com/07af1083-7432-4477-b298-3c0089e8afba/0_0.png",
            "https://cdn.midjourney.com/50b2849d-0a6f-42f0-b581-7a6070c6b179/0_0.png"
        ],
        "cardType": "action",
        "effect": {},
        "customEffect": [
            "https://ka2le.github.io/chatgpt-apps3/images/mp/shield.png",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/shield.png"
        ],
        "cd": 1
    },
   
    {
        "cardName": "one_off_each",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/b2b1124c-3085-45bd-a454-d4dbaabad1bf/0_0.png"
        ],
        "cardType": "action",
        "stats": [],
        "effect": {},
        "customEffect": [
            "https://ka2le.github.io/chatgpt-apps3/images/mp/rabbit.png",
            "*",
            "<br>",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/robot_sharp.png",
            "*",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/dragon.png",
            "*",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/suit_hearts_broken.png"
        ],
        "cd": 1
    },
    {
        "cardName": "any_off_each",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/31fa9c34-7edb-42e7-a9f4-3de673bd9844/0_0.png"
        ],
        "cardType": "action",
        "stats": [],
        "effect": {},
        "customEffect": [
            "https://ka2le.github.io/chatgpt-apps3/images/mp/rabbit.png",
            "+",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/robot_sharp.png",
            "+",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/dragon.png",
            "*",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/suit_hearts_broken.png"
        ],
        "cd": 2
    },
    {
        "cardName": "bite",
        "copies": 2,
        "images": [
            "https://cdn.midjourney.com/bd44326e-0b71-4fe8-827d-ef99ea675fb7/0_0.png",
            "https://cdn.midjourney.com/e8f58207-584b-4ffa-bca7-8dd3858c9271/0_0.png"
        ],
        "cardType": "action",
        "stats": [],
        "effect": {},
        "customEffect": [
            "https://ka2le.github.io/chatgpt-apps3/images/mp/suit_hearts_broken.png",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/suit_hearts_broken.png",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/suit_hearts_broken.png"
        ],
        "cd": 2
    },
    {
        "cardName": "draw_2_extra",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/7bcc8fdb-056e-485f-87d5-110aba1c6208/0_0.png"
        ],
        "cardType": "action",
        "stats": [],
        "effect": {},
        "customEffect": [
            "https://ka2le.github.io/chatgpt-apps3/images/mp/card_add.png",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/card_add.png"
        ],
        "cd": -1
    },
    {
        "cardName": "copy_card_in_hand",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/6dc58787-784e-4e6a-801f-4464d12124a2/0_0.png"
        ],
        "cardType": "action",
        "stats": [],
        "effect": {},
        "customEffect": [
            "https://ka2le.github.io/chatgpt-apps3/images/mp/cards_fan_outline.png"
        ],
        "cd": -1
    },
    {
        "cardName": "recycle_card",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/fefd7e39-251e-45e3-b30f-fb2cbd476ba7/0_0.png"
        ],
        "cardType": "action",
        "stats": [],
        "effect": {},
        "customEffect": [
            "https://ka2le.github.io/chatgpt-apps3/images/mp/reuse_card.png"
        ],
        "cd": -1
    },
    {
        "cardName": "shield_is_dmg",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/cbdf1866-c272-43e7-b926-e8baa6337461/0_0.png",
        ],
        "cardType": "action",
        "stats": [],
        "effect": {},
        "customEffect": [
            "https://ka2le.github.io/chatgpt-apps3/images/mp/shield.png",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/arrow2.png",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/suit_hearts_broken.png"
        ],
        "cd": 1
    },
    {
        "cardName": "double_dmg",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/ed1dd946-8847-493f-9590-a863e7d345bb/0_0.png"
        ],
        "cardType": "action",
        "stats": [],
        "effect": {},
        "customEffect": [
            "2x",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/suit_hearts_broken.png"
        ],
        "cd": 2
    },

    {
        "cardName": "joker",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/d2a12c61-595d-4ddd-a7f8-766bc41848ba/0_0.png"
        ],
        "cardType": "stat",
        "stats": [
            
            1,
            0,
            2
        ]
    },
    {
        "cardName": "backside",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/210b3cd1-dec8-453e-8d1a-d967cea6e283/0_0.png",
            //"https://cdn.midjourney.com/d2fb4b75-21b6-409b-91db-b0c810bed5b8/0_0.png"
        ],
        "cardType": "action",
        "stats": [],
        "effect": {},
        "customEffect": []
    },
    {
        "cardName": "robot_dragon",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/7b6f6976-1fdc-40b1-9008-bea313ba61df/0_0.png",
            //"https://cdn.midjourney.com/2f6c7377-acb9-48ab-beaf-26684c3f8e08/0_0.png"
        ],
        "cardType": "stat",
        "stats": [
            0,
            2
        ]
    },
    {
        "cardName": "robot_critter",
        "copies": 2,
        "images": [
            "https://cdn.midjourney.com/28aa84fd-008d-49f1-9038-4b37ef1488f7/0_0.png",
            "https://cdn.midjourney.com/261245f8-c25c-40c5-a8bc-2b2f6f9f186e/0_0.png"
        ],
        "cardType": "stat",
        "stats": [
            
            1,
            0,
        ]
    },
    {
        "cardName": "dragon_rabbit",
        "copies": 2,
        "images": [
            "https://cdn.midjourney.com/b1d57fdb-32c9-4191-92fb-c9323975a3ab/0_0.png",
            "https://cdn.midjourney.com/159c2eb9-4fc6-45ca-b02a-4a3b4f81766c/0_0.png"
        ],
        "cardType": "stat",
        "stats": [
            1,
            2
        ]
    },
    {
        "cardName": "dragon_rabbit_damage",
        "copies": 0,
        "images": [
            "https://cdn.midjourney.com/0559553f-0283-4122-935f-2e372da50e70/0_0.png"
        ],
        "cardType": "action",
        "stats": [],
        "effect": {},
        "customEffect": [
            "https://ka2le.github.io/chatgpt-apps3/images/mp/rabbit.png",
            "+",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/dragon.png",
            "*",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/suit_hearts_broken.png",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/suit_hearts_broken.png",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/suit_hearts_broken.png"
        ],
        "cd": 3
    },
    {
        "cardName": "Dragon Ulti",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/c7a44b73-5293-44f6-8b2b-c394b99b223e/0_0.png",
            "https://cdn.midjourney.com/8260e31b-2fdc-4a51-80f2-33f0802abcd1/0_0.png"
        ],
        "cardType": "action",
        "effect": {
            "dmg": 6,
            "dmgType": 2
        },
        "cd": 3
    },
    {
        "cardName": "Devour",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/fb1b75c0-6c43-4113-ac31-609460817987/0_0.png"
        ],
        "cardType": "action",
        "effect": {
            "dmg": 6,
            "dmgType": 2
        },
        "cd": 4
    },
    {
        "cardName": "Murder rabbit",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/c5692cc1-a3e0-43d6-ab00-123c97cd9e53/0_0.png"
        ],
        "cardType": "action",
        "effect": {
            "dmg": 2,
            "dmgType": 1
        },
        "cd": 1
    },
    {
        "cardName": "robot_ulti",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/36577eb0-fedd-4f63-ad88-24e5e3689486/0_0.png"
        ],
        "cardType": "action",
        "stats": [],
        "effect": {
            "dmg": 4,
            "dmgType": 0
        },
        "cd": 2
    },
    {
        "cardName": "dragon2",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/2d265f52-fece-4a21-9b7f-c932985c95b9/0_0.png"
        ],
        "cardType": "stat",
        "stats": [
            2,
            2
        ]
    },
    {
        "cardName": "rabbit2",
        "copies": 2,
        "images": [
            "https://cdn.midjourney.com/a87f3c12-4ef4-4f14-852b-1e886c2eedb3/0_0.png",
            "https://cdn.midjourney.com/681540f1-2696-4ca5-8e9e-7c6c9b1bcda5/0_3.png",
            //"https://cdn.midjourney.com/b3e2bdf9-16da-428a-8abc-12ed54ccf22b/0_0.png",
            //"https://cdn.midjourney.com/137f73d9-117c-4d8c-a5ba-3d3549d8a673/0_2.png"
        ],
        "cardType": "stat",
        "stats": [
            1,
            1
        ]
    },
    {
        "cardName": "robot2",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/12d9b18b-fa7d-4777-b58d-7e14fe0c5b74/0_0.png",
            "https://cdn.midjourney.com/67d516be-005c-477a-9897-a52504e7f94b/0_0.png"
        ],
        "cardType": "stat",
        "stats": [
            0,
            0
        ]
    },
    {
        "cardName": "critter1",
        "copies": 7,
        "images": [
            "https://cdn.midjourney.com/97d565dc-a15d-4fef-bd18-327048b9f248/0_0.png",
            "https://cdn.midjourney.com/3f6180de-f6a2-4001-bca5-a3b7230a6276/0_0.png",
            "https://cdn.midjourney.com/daa83228-5295-4c1d-bc58-c330c9a9c025/0_0.png",
            "https://cdn.midjourney.com/2dd9dd8e-43a7-4521-b1c2-357667510a5a/0_0.png",
            "https://cdn.midjourney.com/b1bee978-52b7-40ec-9294-95e4f1f67f39/0_0.png",
            "https://cdn.midjourney.com/69a33373-caed-4ef4-b207-e1233851459a/0_0.png",
            
            "https://cdn.midjourney.com/af704f54-9547-4b2d-8374-29702ce3e3eb/0_0.png",
            
        ],
        "cardType": "stat",
        "stats": [
            1
        ]
    },
    {
        "cardName": "Swarm",
        "copies":8,
        "images": [
            "https://cdn.midjourney.com/8cb5923f-3c09-4600-ae07-a7194fa19483/0_0.png",
            "https://cdn.midjourney.com/3d3b5799-b82c-47a3-a055-c01281b796db/0_0.png",
            "https://cdn.midjourney.com/f507df3e-9ff8-4f5a-9e5a-15d642933060/0_0.png",
            "https://cdn.midjourney.com/2be48f0b-ec75-4f71-96ba-af841c62f337/0_0.png",
            "https://cdn.midjourney.com/18e6a0a5-1134-4351-b020-7a0b57162756/0_3.png",
            "https://cdn.midjourney.com/ace6742e-f77e-42cd-b31a-811ebef29bc9/0_0.png",
            "https://cdn.midjourney.com/39ed468e-94a3-45b6-ada0-285d7d0e11ba/0_0.png",
            "https://cdn.midjourney.com/bf1e13ea-254c-41e4-aa2c-d02d8812427a/0_0.png",
        ],
        "cardType": "action",
        "effect": {
            "dmg": 1,
            "dmgType": 1
        },
        "cd": 1
    },
    {
        "cardName": "robot1",
        "copies": 8,
        "images": [
            //"https://cdn.midjourney.com/7714408d-861c-449a-b26d-57059940c9c5/0_0.png",Pirate
            "https://cdn.midjourney.com/72580de6-343e-425e-a28c-00efaceabc7b/0_1.png",
            //"https://cdn.midjourney.com/0784c063-7ae5-4964-a34c-7ca6f7104299/0_0.png",monkey
            "https://cdn.midjourney.com/637926a6-2461-49dc-ac73-25cf4084b9fe/0_0.png",
            "https://cdn.midjourney.com/f4e841f1-5185-4990-9f81-4b2fb4a35f4e/0_0.png",
            "https://cdn.midjourney.com/86e89b45-c8fe-4bb1-a43c-79e185a984c4/0_0.png",
            "https://cdn.midjourney.com/0f6b62df-2da4-4c0e-88cf-4c22fe5ba643/0_0.png",
            "https://cdn.midjourney.com/effe1b79-f800-464a-9846-21c4be535d9b/0_0.png",
            "https://cdn.midjourney.com/6d8979f0-5a43-4613-9b57-04caef84ca98/0_0.png",
            "https://cdn.midjourney.com/188098a7-2428-428e-b646-7975f0a636c3/0_0.png",
        ],
        "cardType": "stat",
        "stats": [
            0
        ]
    },
    {
        "cardName": "robot_attack",
        "copies": 6,
        "images": [
            "https://cdn.midjourney.com/5413367d-1f71-4247-b4e7-7b808a88805f/0_0.png",
            //"https://cdn.midjourney.com/65e34e07-6ce4-4f65-9c9d-c3289b1ce3ec/0_0.png",
            
            "https://cdn.midjourney.com/0ec87e14-9306-4bdb-abaf-bd560731cc43/0_0.png",
            "https://cdn.midjourney.com/8a1748d0-d30f-43d6-9f73-c6c3c491edd2/0_0.png",
            "https://cdn.midjourney.com/ef1a2d8f-b2b9-4e80-9dff-390439a77d73/0_0.png",
            "https://cdn.midjourney.com/d0ab3f46-1a6d-4292-8fdd-bcf7863fb886/0_0.png",
            "https://cdn.midjourney.com/2f1865c9-4a26-49a4-84a6-578ec5c7d011/0_0.png",
            
        ],
        "cardType": "action",
        "stats": [],
        "effect": {
            "dmg": 2,
            "dmgType": 0
        },
        "cd": 2
    },
    {
        "cardName": "dragon1",
        "copies": 6,
        "images": [
            "https://cdn.midjourney.com/e53502ec-0a1e-4e34-b2e9-21e3f2bf5f16/0_0.png",
            "https://cdn.midjourney.com/164bb496-ef9f-4b75-8994-65997ec5d065/0_0.png",
            "https://cdn.midjourney.com/d1b236ca-0ad5-4fbc-9917-d06818ede597/0_0.png",
            "https://cdn.midjourney.com/a1b1aa22-bcbe-45a9-9c5f-cf78d32c8a4f/0_0.png",
            "https://cdn.midjourney.com/5b66642d-859a-4c30-8476-e58449aeffce/0_0.png",
            "https://cdn.midjourney.com/19857464-af32-4f3d-b87a-9a287e90fefe/0_0.png"
        ],
        "cardType": "stat",
        "stats": [
            2
        ]
    },
    {
        "cardName": "Dragons Breath",
        "copies": 8,
        "images": [
            "https://cdn.midjourney.com/8989a9f5-da33-4bdd-bc2b-ef7a681ea095/0_0.png",
            "https://cdn.midjourney.com/8d7b2bc0-ad87-4493-9825-bd659602d026/0_0.png",
            "https://cdn.midjourney.com/9e0945dd-5fa1-4cb0-8a2f-cce1d576118b/0_0.png",
            "https://cdn.midjourney.com/dfc0db36-5761-4335-bb64-c4c10215177a/0_0.png",
            "https://cdn.midjourney.com/421982d3-be47-4b1b-b968-e92206303b35/0_0.png",
            "https://cdn.midjourney.com/de6abac3-eaf0-4da7-ad7b-71ef82c04ca9/0_0.png",
            "https://cdn.midjourney.com/2d51cedb-b24f-436b-947e-cba3b41e34c4/0_0.png",
            "https://cdn.midjourney.com/b4253bcb-a82e-44c5-bc40-55dd03fdf8fa/0_0.png"
        ],
        "cardType": "action",
        "effect": {
            "dmg": 3,
            "dmgType": 2
        },
        "cd": 3
    },
   

]


const EXTRA_CARDS = [
    {
        "cardName": "monster_dragon",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/c4f59636-b45e-4347-b5f5-d6b58a895717/0_0.png"
        ],
        "cardType": "stat",
        "stats": [
            2,
            3
        ]
    },
    {
        "cardName": "double_shield",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/62e55752-145c-4112-b327-34f744ad6c8f/0_0.png"
        ],
        "cardType": "action",
        "stats": [],
        "effect": {},
        "customEffect": [
            "2x",
            "https://ka2le.github.io/chatgpt-apps3/images/mp/shield.png"
        ],
        "cd": 1
    },
    {
        "cardName": "monster2",
        "copies": 3,
        "images": [
            "https://cdn.midjourney.com/2700d206-2c42-49f9-b35b-d09aaff2fc47/0_1.png",
            "https://cdn.midjourney.com/7faf5453-6a64-4efa-91d9-9a0d5971b4b7/0_0.png",
            "https://cdn.midjourney.com/058a91ce-92ad-49b9-9b21-161976e6ecea/0_0.png"
        ],
        "cardType": "stat",
        "stats": [
            3,
            3
        ]
    },
    {
        "cardName": "monster3",
        "copies": 1,
        "images": [
            "https://cdn.midjourney.com/2cb5ccaf-2c08-4878-a7bb-ef553cc56527/0_0.png"
        ],
        "cardType": "stat",
        "stats": [
            3,
            3,
            3
        ]
    },
    {
        "cardName": "monster_test",
        "copies": 25,
        "images": [
            "https://cdn.midjourney.com/4b0905bf-3033-4882-a3ba-476e91dfb0b8/0_0.png",
            "https://cdn.midjourney.com/f965723e-8787-44d8-8989-8fbb968a0ea4/0_0.png",
            "https://cdn.midjourney.com/683a3cba-9a15-4207-9e42-c75850b847cc/0_0.png",
            "https://cdn.midjourney.com/d8913ad5-7cc7-49fc-906b-9c329bcc4bb9/0_0.png",
            "https://cdn.midjourney.com/de58c5aa-2fa9-4695-af17-7091204d0b63/0_0.png",
            "https://cdn.midjourney.com/6a9622c7-fa63-48ac-88e7-3b89d2d926a5/0_0.png",
            "https://cdn.midjourney.com/f2f40a23-d352-40f8-b712-24e1e6b7223a/0_0.png",
            "https://cdn.midjourney.com/8c4f738b-a2f8-4741-949c-f944120a9dd7/0_0.png",
            "https://cdn.midjourney.com/6a169f35-1379-42a9-ac1a-d85530bc620c/0_0.png",
            "https://cdn.midjourney.com/05bf2359-92cd-43c6-a4e6-8f6d74d11cbe/0_0.png",
            "https://cdn.midjourney.com/9519d277-16cb-41d7-8ec8-356ee6228295/0_0.png",
            "https://cdn.midjourney.com/16d11a34-1f9c-45a3-9a8a-9c4c0599e7d3/0_0.png",
            "https://cdn.midjourney.com/f163e3a5-ff3d-47c9-92e6-e218f1313909/0_0.png",
            "https://cdn.midjourney.com/368f5e41-b923-4904-8bfc-8fc4d914b6a9/0_0.png",
            "https://cdn.midjourney.com/6d684b63-120a-4323-9906-35c98629475c/0_0.png",
            "https://cdn.midjourney.com/749b8b3a-0523-442c-90c0-8c08c106afb7/0_0.png",
            "https://cdn.midjourney.com/01d0aeeb-2277-4a7d-9e78-f6f970fc7c7b/0_0.png",
            "https://cdn.midjourney.com/71e26fcd-beda-489e-b64e-c8a897af684e/0_0.png",
            "https://cdn.midjourney.com/d13983d8-6975-4861-85ea-cb51deae5c55/0_0.png",
            "https://cdn.midjourney.com/0a24056d-2bad-4821-a06e-bdfb02825384/0_0.png",
            "https://cdn.midjourney.com/109fd2ac-24c4-424b-b0e0-91f978ebf30a/0_0.png",
            "https://cdn.midjourney.com/795d3abb-ea88-4f4a-8feb-470191f7f2b9/0_0.png",
            "https://cdn.midjourney.com/c93d5335-1b63-4150-8c9a-3d0b57603f74/0_0.png",
            "https://cdn.midjourney.com/c1cc4066-8ba5-46f7-904f-45fc21582c5a/0_0.png",
            "https://cdn.midjourney.com/61795f45-a536-4176-ab48-9f8e713cef85/0_0.png"
        ],
        "cardType": "action",
        "stats": [],
        "effect": {
            "dmg": 4,
            "dmgType": 3
        },
        "cd": 4
    }
]

const DEFAULT_CARDS = [...DEFAULT_CARDS1, ...(NO_EXTRA_CARDS ? [] : EXTRA_CARDS)];


// Styles
const styles = {
    container: {
        width: "100vw",
        height: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
    },
    main: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        "@media (min-width: 768px)": {
            flexDirection: "row",
        },
        overflow: "hidden", // Prevent double scrollbars
    },
    
    card: {
        outer: {
            width: `${CARD_WIDTH}px`,
            height: `${CARD_HEIGHT}px`,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
        },
        innerMargin: {
            width: `calc(100% - ${MARGIN_SIZE}px)`,
            height: `calc(100% - ${MARGIN_SIZE}px)`,
            background: "rgba(255, 255, 255, 0.0)",
            display: "flex",
            flexDirection: "column",
            fontFamily: "AdiosAmigosRegular",
            justifyContent: "center",
        },
        contentContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: CONTENT_PADDING,
            height: "100%",
            width: "100%",
            boxSizing: "border-box",
        },
        effect: {
            fontSize: `${FONT_SIZE}px`,
            textAlign: "left", // Change from "center" to "left"
            fontWeight: "bold",
            display: "flex", // For flexible positioning
            alignItems: "center",
            gap: "0px",

        },
        verticalLock: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
        }
    },
    gallery: {
        container: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, var(--card-width))",
            gap: "5px",
            padding: "0px",
            justifyContent: "center",
            width: "100%",
            boxSizing: "border-box",
            color: "white",
        },
        zoomControl: {
            marginBottom: "20px",
            textAlign: "center",
            padding: "10px",
        },
        wrapper: {
            overflow: "auto",
            flex: 1,
            height: "100%",
            minHeight: "300px", // Ensure gallery is visible on mobile
        }
    },
    editor: {
        container: {
            width: "100%", // Full width on mobile
            height: "auto",

            padding: "0px",
            borderBottom: "1px solid #ddd",
            background: "#f9f9f9",
            overflow: "auto",
            "@media (min-width: 768px)": {
                width: "400px",
                //maxHeight: "50vh", // Limit height on mobile
                height: "100%",
                borderRight: "1px solid #ddd",
                borderBottom: "none",
            },
        },
        controls: {
            marginBottom: "20px",
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
        },
        cardEdit: {
            container: {
                border: "1px solid #ddd",
                borderRadius: "4px",
                margin: "10px 0",
                background: "white",
            },
            header: {
                padding: "10px",
                background: "#f0f0f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
            },
            content: {
                padding: "0px",
            },
            field: {
                marginBottom: "15px",
            },
            label: {
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
            },
            input: {
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                border: "1px solid #ddd",
                borderRadius: "4px",
            },
            textarea: {
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                border: "1px solid #ddd",
                borderRadius: "4px",
                minHeight: "100px",
            }
        }
    },
    toolbar: {
        container: {
            padding: "0px",
            background: "#f4f4f4",
            borderBottom: "1px solid #ddd",
            display: "flex",
            height: "40px",
            fontSize: "14px !important",
            justifyContent: "space-between"
        },
        h1: {
            fontSize: "24px",
        }

    },

    footer: {
        container: {
            padding: "0px",
            background: "#f4f4f4",
            borderTop: "1px solid #ddd",
            textAlign: "center",
            height: "40px",
            fontSize: "14px !important"
        }
    }
};

// Utility Components
// New constant for text adjustment
const regularTextAdjustment = "10px";

// Utility Components
const IconOrImage = ({ value, fontSize = FONT_SIZE }) => {
    const backgroundEffect ="";// "radial-gradient(rgba(0,0,0,0.2), rgba(0, 0, 0, 0) 70%)";
    const iconStyle = {
        position: 'relative',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: fontSize,
        height: fontSize,
        background: backgroundEffect,
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        position: 'relative',
        background: backgroundEffect,
        filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.5))',
    };

    // Style for the shadow/outline effect
    const shadowStyle = {
        position: 'absolute',
        top: "12px", // Adjust shadow position for text
        left: '4px',
        width: '100%',
        height: '100%',
        filter: 'invert(1) opacity(1)',
        transform: ONLINE ? 'scale(1.12)' : 'scale(1.0)',
    };

    // Extract image name from URL
    const extractImageName = (url) => {
        const parts = url.split('/');
        const fileName = parts[parts.length - 1].split('.')[0];
        return fileName;
    };

    if (value === "*" || value === "+" || value === ">") {
        const newSize = value === "*" ? MULTIPLIER_ICON_SIZE + "px" : "60px";
        const topAdjustment = value === "*" ? "20px" : "15px";
        return (
            <div className={`iconName_${value}`} style={{
                ...iconStyle,
                marginLeft: value == "*" ? "-10px" : "0px",
                marginRight: value == "*" ? "-30px" : "-20px",
            }}>
                <span style={{
                    ...shadowStyle,
                    fontFamily: "AdiosAmigosRegular",
                    fontSize: newSize,
                    width: newSize,
                    height: newSize,
                    left: "calc(50% - 20px)",
                    filter: 'blur(2px) brightness(0)',
                    top: ONLINE ? "40px" : topAdjustment, // Adjust text position
                }}>
                    {value}
                </span>
                <span style={{
                    position: 'relative',
                    fontFamily: "AdiosAmigosRegular",
                    fontSize: newSize,
                    color: 'white',
                    width: newSize,
                    height: newSize,
                    filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))',
                    top: "0px", // Adjust text position
                }}>
                    {value}
                </span>
            </div>
        );
    }
    if (value === "<br>") {
        return <br />;
    }

    if (typeof value === "string" && /^https?:\/\//.test(value)) {
        const imageName = extractImageName(value);
        let extraMargin = 0;
        let extraMarginShadow = 0;
        if(imageName == "cards_take")   {
            extraMargin = "15px";
            extraMarginShadow = "7px";
        }
        return (
            <div className={`iconName_${imageName}`} style={iconStyle}>
                {/* Shadow/outline layer */}
                <img
                    src={value}
                    alt={imageName}
                    style={{
                        ...imageStyle,
                        ...shadowStyle,
                        marginLeft: extraMarginShadow,
                        top: "1px", // Reset shadow adjustment for images
                    }}
                    onError={(e) => {
                        e.currentTarget.outerHTML = `<span style="font-size: ${fontSize}px">X</span>`;
                    }}
                />
                {/* Main icon layer */}
                <img
                    src={value}
                    alt={imageName}
                    style={{
                        ...imageStyle,
                        marginLeft: extraMargin,
                        position: 'relative',
                        filter: 'brightness(1) drop-shadow(0px 2px 4px rgba(0,0,0,1))',
                    }}
                    onError={(e) => {
                        e.currentTarget.outerHTML = `<span style="font-size: ${fontSize}px">X</span>`;
                    }}
                />
            </div>
        );
    }
    const leftAdjustment = (value == "0" || value == "2") ? "30px" : "10px";
    return (
        <div className={`iconName_${value}`} style={iconStyle}>
            <span style={{
                ...shadowStyle,
                fontSize,
                left: leftAdjustment,
                filter: 'blur(2px) brightness(0)',
            }}>
                {value}
            </span>
            <span style={{
                position: 'relative',
                fontSize,
                color: 'white',
                filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))',
                top: regularTextAdjustment, // Adjust text position
            }}>
                {value}
            </span>
        </div>
    );
};


// Card Component

const Card = ({ card, index }) => {
    const getStatIconOrText = (index) => {
        const mapping = STAT_ICONS[index];
        if (!mapping) return null;
        return <IconOrImage value={mapping.icon} />;
    };

    const renderEffect = () => {
        if (!card.effect) return null;
        const { dmg = 0, dmgType, shield = 0 } = card.effect;

        const dmgTypeIcons = dmgType != null && (
            <>
                {getStatIconOrText(dmgType)}
                <IconOrImage value={DISPLAY_SETTINGS.multiplierIcon} />
            </>
        );

        const dmgIcons = [...Array(dmg)].map((_, i) => (
            <React.Fragment key={`dmg-${i}`}>
                <IconOrImage value={DISPLAY_SETTINGS.dmgIcon} />
            </React.Fragment>
        ));

        const shieldIcons = [...Array(shield)].map((_, i) => (
            <IconOrImage key={`shield-${i}`} value={DISPLAY_SETTINGS.shieldIcon} />
        ));

        const customEffectIcons = (card.customEffect || []).map((effect, i) => (
            <IconOrImage key={`custom-effect-${i}`} value={effect} />
        ));

        return (
            <div style={styles.card.effect}>
                {dmgTypeIcons}
                {dmgIcons}
                {shieldIcons}
                {customEffectIcons}
            </div>
        );
    };

    return (
        <div style={{
            ...styles.card.outer,
            position: 'relative',
        }}>
            <img
                src={card.images?.[0] || DISPLAY_SETTINGS.defaultImage}
                alt="card-background"
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'blur(8px)',
                    zIndex: -1,
                }}
            />
            <div style={{
                ...styles.card.innerMargin,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                width: `${INNER_SIZE_PERCENT}%`,
                height: `${INNER_SIZE_PERCENT}%`,
            }}>
                <img
                    src={card.images?.[0] || DISPLAY_SETTINGS.defaultImage}
                    alt="card"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                />
            </div>
            <div style={styles.card.innerMargin}>
                <div style={styles.card.contentContainer}>
                    {card.cardType === "action" && renderEffect()}
                    {card.cardType === "stat" && (
                        <div style={styles.card.verticalLock}>
                            {card.stats.map((stat, index) => (
                                <div key={`stat-${index}`}>
                                    {getStatIconOrText(stat)}
                                </div>
                            ))}
                        </div>
                    )}
                     {card.cardType === "action" && card.cd !== undefined && (
                        <div style={{ ...styles.card.verticalLock, marginLeft: "-10px" }}>
                            {card.cd === -1 ? (
                                <IconOrImage value={DISPLAY_SETTINGS.startIcon} fontSize={FONT_SIZE + 10} />

                            ) :
                                (card.cd === -2 ?
                                    (<>


                                        <IconOrImage key={`cd-${2}`} value={DISPLAY_SETTINGS.cdMaybeIcon} fontSize={FONT_SIZE + 30} />
                                        <IconOrImage key={`cd-${3}`} value={DISPLAY_SETTINGS.cdMaybeIcon} fontSize={FONT_SIZE + 30} />
                                        <IconOrImage key={`cd-${3}`} value={DISPLAY_SETTINGS.cdMaybeIcon} fontSize={FONT_SIZE + 30} />
                                        <IconOrImage key={`cd-${1}`} value={DISPLAY_SETTINGS.startIcon} fontSize={FONT_SIZE + 10} />
                                    </>
                                    )
                                    :
                                    (
                                        [...Array(card.cd)].map((_, i) => (
                                            <IconOrImage key={`cd-${i}`} value={DISPLAY_SETTINGS.cdIcon} fontSize={FONT_SIZE + CD_ICON_ENLRAGEMENT} />
                                        ))
                                    ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Card Number Display (Bottom-Right) */}
            {/* <div style={{
                position: 'absolute',
                bottom: '17px',
                right: '5px',
                color: 'white',
                textShadow: "4px 2px 2px black",
                fontSize: '17px',
                fontWeight: 'bold',
                padding: '3px 6px',
                borderRadius: '4px',
            }}>
                {index + 1}
            </div> */}
        </div>
    );
};




// Updated Gallery Component


// Updated Gallery Component with click handling

// Card Dialog Component
const CardImageDialog = ({ isOpen, onClose, card, copyIndex, onSave }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (isOpen && card) {
            setImageUrl(card.images[copyIndex] || '');
        }
    }, [isOpen, card, copyIndex]);

    const handleSave = () => {
        const newImages = [...(card.images || [])];

        if (!imageUrl && copyIndex === newImages.length - 1) {
            newImages.pop();
        } else {
            while (newImages.length <= copyIndex) {
                newImages.push('');
            }
            newImages[copyIndex] = imageUrl;
        }

        onSave(newImages);
        onClose();
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(imageUrl);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setImageUrl(text);
        } catch (err) {
            console.error('Failed to paste:', err);
        }
    };

    const handleSaveCard = () => {
        // Get the index of this card within the full expanded list
        const expandedIndex = getExpandedCardIndex(card, copyIndex);

        const cardElement = document.getElementById(`card-${card.cardName}-${expandedIndex}`);
        if (cardElement) {
            saveCard(cardElement, `${card.cardName}-copy-${copyIndex + 1}`);
        } else {
            console.warn(`Card element with ID card-${card.cardName}-${expandedIndex} not found.`);
        }
    };

    // Helper function to get the correct expanded index
    const getExpandedCardIndex = (selectedCard, copyIndex) => {
        let expandedIndex = 0;

        for (const card of DEFAULT_CARDS) {
            if (card === selectedCard) {
                return expandedIndex + copyIndex; // Found the right card, add the copyIndex
            }
            expandedIndex += card.copies; // Move the index forward by the number of copies
        }

        return -1; // Fallback (should not happen)
    };


    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Card Image</DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {card?.cardName} - Copy {copyIndex + 1}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Enter image URL"
                        variant="outlined"
                        size="medium"
                    />
                    <IconButton onClick={handleCopy} title="Copy URL">
                        <ContentCopyIcon />
                    </IconButton>
                    <IconButton onClick={handlePaste} title="Paste URL">
                        <ContentPasteIcon />
                    </IconButton>
                    <IconButton onClick={handleSaveCard} title="Save Card">
                        <SaveIcon />
                    </IconButton>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};




// Updated Gallery Component with correct copy index handling
const Gallery = ({ cards, setCards }) => {
    const [zoom, setZoom] = useState(0.5);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCopyIndex, setSelectedCopyIndex] = useState(null);

    const cardWidth = CARD_WIDTH * zoom;
    const cardHeight = CARD_HEIGHT * zoom;
    const gapSize = Math.max(2, Math.round(5 * zoom));

    // Calculate the starting index for each card in the expanded view
    const getCardStartIndex = (cardIndex) => {
        return cards.slice(0, cardIndex).reduce((sum, card) => sum + card.copies, 0);
    };

    // Get the specific copy number for a card based on its position in the expanded view
    const getCopyIndex = (expandedIndex, cardIndex) => {
        const startIndex = getCardStartIndex(cardIndex);
        return expandedIndex - startIndex;
    };

    const handleCardClick = (expandedIndex, card) => {
        // Find the original card index
        const cardIndex = cards.findIndex(c => c.cardName === card.cardName);
        const copyIndex = getCopyIndex(expandedIndex, cardIndex);

        setSelectedCard(cards[cardIndex]);
        setSelectedCopyIndex(copyIndex);
    };

    const handleDialogClose = () => {
        setSelectedCard(null);
        setSelectedCopyIndex(null);
    };

    const handleSaveImage = (newImages) => {
        const updatedCards = cards.map(card =>
            card === selectedCard ? { ...card, images: newImages } : card
        );
        setCards(updatedCards);
    };

    // Expand cards based on copies and loop through the images
    const expandedCards = cards.flatMap((card, cardIndex) => {
        const images = card.images.length > 0 ? card.images : [DISPLAY_SETTINGS.defaultImage];
        return Array.from({ length: card.copies }, (_, index) => ({
            ...card,
            displayImage: images[index % images.length], // Loop through images
        }));
    });

    return (
        <div style={styles.gallery.wrapper}>
            <div style={styles.gallery.zoomControl}>
                <label>Zoom: </label>
                <input
                    type="range"
                    min="0.2"
                    max="1"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                />
                <span>{Math.round(zoom * 100)}%</span>
            </div>
            <div
                style={{
                    ...styles.gallery.container,
                    ["--card-width"]: `${cardWidth}px`,
                    gap: `${gapSize}px`,
                    gridAutoRows: `${cardHeight}px`,
                }}
            >



                {expandedCards.map((card, expandedIndex) => (
                    <div
                        key={`${card.cardName}-${expandedIndex}`}
                        id={`card-${card.cardName}-${expandedIndex}`}
                        style={{
                            transform: `scale(${zoom})`,
                            transformOrigin: 'top left',
                            width: `${CARD_WIDTH}px`,
                            height: `${CARD_HEIGHT}px`,
                            cursor: 'pointer',
                        }}
                        onClick={() => handleCardClick(expandedIndex, card)}
                    >
                        <Card card={{ ...card, images: [card.displayImage] }} index={expandedIndex} />
                    </div>
                ))}

                {/* Add IconExplanationCard at the end of the gallery */}
                <div
                    key="icon-explanation_base"
                    style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: 'top left',
                        width: `${CARD_WIDTH}px`,
                        height: `${CARD_HEIGHT}px`,
                    }}
                >
                    <IconExplanationCard {...{ ICON_EXPLANATIONS: ICON_EXPLANATIONS_BASE }} />
                </div>

                {/* Add IconExplanationCard at the end of the gallery */}
                <div
                    key="icon-explanation_special"
                    style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: 'top left',
                        width: `${CARD_WIDTH}px`,
                        height: `${CARD_HEIGHT}px`,
                    }}
                >
                    <IconExplanationCard {...{ ICON_EXPLANATIONS: ICON_EXPLANATIONS_SPECIAL }} />
                </div>

            </div>

            <CardImageDialog
                isOpen={selectedCard !== null}
                onClose={handleDialogClose}
                card={selectedCard}
                copyIndex={selectedCopyIndex}
                onSave={handleSaveImage}
            />
        </div>
    );
};


// Main Component
const MonsterPokerCards = () => {
    const [cards, setCards] = useState(DEFAULT_CARDS);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    const totalCopies = cards.reduce((sum, card) => sum + card.copies, 0);
    console.error(totalCopies, cards, cards?.length);
    // Apply styles with media queries
    const mainStyle = {
        ...styles.main,
        ...(isMobile ? {} : styles.main["@media (min-width: 768px)"]),
    };

    const editorStyle = {
        ...styles.editor.container,
        ...(isMobile ? {} : styles.editor.container["@media (min-width: 768px)"]),
    };

    return (
        <div style={styles.container}>
            <Toolbar cards={cards} setCards={setCards} />
            <div style={mainStyle}>
                <Gallery cards={cards} setCards={setCards} />
            </div>
        </div>
    );
};


// Toolbar Component
const Toolbar = ({ cards, setCards }) => {
    const copyToClipboard = (data) => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        alert("Data copied to clipboard!");
    };

    const clearLocalStorage = () => {
        if (window.confirm("Are you sure you want to clear the local storage?")) {
            localStorage.removeItem("cards");
            setCards(DEFAULT_CARDS); // Reset state to defaults
            alert("Local storage cleared!");
        }
    };
    const handleSaveFirstCard = () => {
        const firstCardElement = document.getElementById(`card-${cards[0]?.cardName}-0`);
        if (firstCardElement) {
            saveCard(firstCardElement, cards[0]?.cardName);
        } else {
            alert('No cards to save!');
        }
    };

    const handleSaveAllCards = () => {
        if (cards.length === 0) {
            alert('No cards to save!');
            return;
        }
        saveAllCards(cards);
    };

    return (
        <header style={styles.toolbar.container}>
            <h5>Monster Poker Cards</h5>
            <div>

                <button onClick={() => copyToClipboard(cards)}>Copy Cards</button>
                <button onClick={handleSaveFirstCard}>Save First Card</button>
                <button onClick={handleSaveAllCards}>Save All Cards</button>
                <button onClick={clearLocalStorage} style={{ color: "red" }}>Clear Local Storage</button>
            </div>
        </header>
    );
};


// Footer Component
const Footer = ({ cards }) => {
    const totalCards = cards.reduce((sum, card) => sum + card.copies, 0);
    const uniqueCards = cards.length;

    return (
        <footer style={styles.footer.container}>
            <p>Total Cards: {totalCards}</p>
            <p>Unique Cards: {uniqueCards}</p>
        </footer>
    );
};


export default MonsterPokerCards;


// Utility to save a single card as an image
const saveCard = (cardElement, title) => {
    const scale = SAVE_SCALE; // Adjust for higher resolution
    return domtoimage
        .toBlob(cardElement, {
            width: cardElement.clientWidth * scale,
            height: cardElement.clientHeight * scale,
            style: {
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
            },
        })
        .then((blob) => {
            saveAs(blob, `${title}.png`);
        })
        .catch((error) => {
            console.error('Error saving card:', error);
        });
};

// Utility to save all cards as images
const saveAllCards = async (cards) => {
    let expandedIndex = 0; // Tracks the current expanded card index
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        for (let copyIndex = 0; copyIndex < card.copies; copyIndex++) {
            const cardElement = document.getElementById(`card-${card.cardName}-${expandedIndex}`);
            if (cardElement) {
                await saveCard(cardElement, `${card.cardName}-copy-${copyIndex + 1}`);
            } else {
                console.warn(`Card element with ID card-${card.cardName}-${expandedIndex} not found.`);
            }
            expandedIndex++; // Increment the expanded index
            await new Promise((resolve) => setTimeout(resolve, 50)); // Small delay
        }
    }
};


// {
//     "cardName": "Shield3",
//     "copies": 2,
//     "images": [
//       "https://cdn.midjourney.com/1617f771-5d18-4091-bbbe-97f2652171f9/0_0.png",
//       "https://cdn.midjourney.com/f1903368-97e8-4371-8a4d-e1ed7ac6a6c3/0_0.png"
//     ],
//     "cardType": "action",
//     "effect": {
//       "shield": 6
//     },
//     "cd": 3
//   },
//   {
//       "cardName": "Shield2",
//       "copies": 1,
//       "images": [
//         "https://cdn.midjourney.com/e2dd6213-0b79-4492-b7d4-d10c4c02507f/0_0.png"
//       ],
//       "cardType": "action",
//       "effect": {
//         "shield": 4
//       },
//       "cd": 2
//     },
//   {
//     "cardName": "Shield1",
//     "copies": 1,
//     "images": [
//       "https://cdn.midjourney.com/07af1083-7432-4477-b298-3c0089e8afba/0_0.png"
//     ],
//     "cardType": "action",
//     "effect": {
//       "shield": 2
//     },
//     "cd": 1
//   },

// {
//     "cardName": "tester",
//     "copies": 1,
//     "images": [
//       "https://cdn.midjourney.com/0a82e853-f51e-49b2-b54d-32c30661901c/0_0.png"
//     ],
//     "cardType": "action",
//     "stats": [],
//     "effect": {},
//     "customEffect": [
//         "https://ka2le.github.io/chatgpt-apps3/images/mp/shield.png",
//         "*",
//         "https://ka2le.github.io/chatgpt-apps3/images/mp/hourglass.png",
//     ],
//     "cd": -2
//   },


// {
//     "cardName": "Shield_select_turn",
//     "copies": 4,
//     "images": [
//       "https://cdn.midjourney.com/1617f771-5d18-4091-bbbe-97f2652171f9/0_0.png",
//       "https://cdn.midjourney.com/f1903368-97e8-4371-8a4d-e1ed7ac6a6c3/0_0.png",
//       "https://cdn.midjourney.com/07af1083-7432-4477-b298-3c0089e8afba/0_0.png",
//       "https://cdn.midjourney.com/e2dd6213-0b79-4492-b7d4-d10c4c02507f/0_0.png"
//     ],
//     "cardType": "action",
//     "effect": {
//     },
//     "customEffect": [
//         "https://ka2le.github.io/chatgpt-apps3/images/mp/hourglass_question.png",
//         "*",
//         "https://ka2le.github.io/chatgpt-apps3/images/mp/shield.png",
//         "https://ka2le.github.io/chatgpt-apps3/images/mp/shield.png",

//     ],
//     "cd": -2
//   },




const ICON_EXPLANATIONS_BASE = [
    {
        icons: [],
        explanation: [
            "Each game consist of two phases. Building a hand and simulating a battle. Each player start with 5 card, they can discard any amount and draw until they have 5 cards again. After dicarding and drawing twice the battle starts"
        ]
    },
    {
        icons: [],
        explanation: ["After drawing cards the players reveal their cards and round 1 start. Based on stat cards and action cards, the player both deal their damage each turn."]
    },
    {
        icons: [],
        explanation: ["Winning! The first player to deal 21 damage wins, if both players reach 21 damage in the same round, the player with the most damage wins"]
    },
    {
        icons: [STAT_ICONS[0].icon, STAT_ICONS[1].icon, STAT_ICONS[2].icon],
        explanation: [
            "The three stats. Robots, Critters, and Dragons. Stat Cards give these. Action Cards use them to deal damage."
        ]
    },
    {
        icons: [DISPLAY_SETTINGS.cdIcon],
        explanation: [
            "Action speed: 1 means every round from round 1. 2 means every other round from round 2 and so on"
        ]
    },
    {
        icons: [DISPLAY_SETTINGS.dmgIcon],
        explanation: ["Damage dealt to opponent"]
    },
    {
        icons: [],
        explanation: [
            "A player have 2 cards with 1 ",
            STAT_ICONS[1].icon,
            " each for a total of 2 Critter stats. They also have 1 cards with ",
            STAT_ICONS[1].icon,
            DISPLAY_SETTINGS.multiplierIcon,
            DISPLAY_SETTINGS.dmgIcon,
            DISPLAY_SETTINGS.dmgIcon,
            "and a speed of ",
            DISPLAY_SETTINGS.cdIcon,
            DISPLAY_SETTINGS.cdIcon,
            "They will deal 4 damage on round 2,4,6 and so on because 2 stats times 2 damage, 2*2=4-."
        ]
    },



];
const ICON_EXPLANATIONS_SPECIAL = [

    {
        icons: [DISPLAY_SETTINGS.shieldIcon],
        explanation: [
            "Block 1 ",
            DISPLAY_SETTINGS.dmgIcon,
            " per ",
            DISPLAY_SETTINGS.shieldIcon
        ]
    },
    {
        icons: [DISPLAY_SETTINGS.startIcon],
        explanation: ["Card played before battle start and card reveal. Multiple cards can be played in any order"]
    },
    {
        icons: [DISPLAY_SETTINGS.fastIcon, DISPLAY_SETTINGS.cdIcon],
        explanation: ["Take first turn before battle, then on round 1 take second turn, staying 1 turn ahead"]
    },
    {
        icons: [DISPLAY_SETTINGS.reuseCardIcon],
        explanation: ["Draw 1 discarded card from any player's discard pile"]
    },
    {
        icons: [DISPLAY_SETTINGS.copyCardIcon],
        explanation: ["Copy 1 card in your hand"]
    },
    {
        icons: [DISPLAY_SETTINGS.cardAddIcon, DISPLAY_SETTINGS.cardAddIcon],
        explanation: ["Draw 2 cards from draw pile"]
    },
    {
        icons: [DISPLAY_SETTINGS.shieldIcon, DISPLAY_SETTINGS.arrowIcon, DISPLAY_SETTINGS.dmgIcon],
        explanation: [
            "For each ",
            DISPLAY_SETTINGS.shieldIcon,
            " also deal 1 ",
            DISPLAY_SETTINGS.dmgIcon
        ]
    },
    {
        icons: ["2x", DISPLAY_SETTINGS.dmgIcon],
        explanation: ["Deal double damage"]
    },
    {
        icons: ["0", DISPLAY_SETTINGS.arrowIcon, DISPLAY_SETTINGS.starIcon, DISPLAY_SETTINGS.starIcon],
        explanation: ["If you have 0 stats, and only then, get 2 to all stats"]
    },
];

const ICON_EXPLANATIONS_ALL = ICON_EXPLANATIONS_BASE.concat(ICON_EXPLANATIONS_SPECIAL);

const IconExplanationCard = ({ ICON_EXPLANATIONS = ICON_EXPLANATIONS_ALL }) => {
    const ICON_SIZE_LARGE = 55; // Larger for main icons
    const MIN_WIDTH_LARGE_ICON = ICON_SIZE_LARGE * 2.7; // Prevent icons from shrinking
    const SMALLER_LARGE_ICON_SIZE = "45px";
    const ICON_SIZE_SMALL = 30;  // Smaller for explanation icons
    const FONT_SIZE_LARGE = 34;
    const FONT_SIZE_SMALL = 28;
    const TEXT_SHADOW = "2px 2px 4px black";
    const OVERLAY_COLOR = "rgba(0, 0, 0, 0.8)";
    const PADDING_OUTLINE = 40;

    const styles = {
        card: {
            position: "relative",
            width: `${CARD_WIDTH}px`,
            height: `${CARD_HEIGHT}px`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: PADDING_OUTLINE + "px",
            overflow: "hidden",
            fontWeight: "100",
            color: "RGB(238, 237, 229)",
            fontFamily: "Garamond",
        },
        background: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `url('https://cdn.midjourney.com/fdca1154-29a1-4f64-b37c-35efbac47990/0_1.png') no-repeat center center`,
            backgroundSize: "cover",
        },
        overlay: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: OVERLAY_COLOR,
        },
        content: {
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
        },
        row: {
            display: "flex",
            alignItems: "center", // Ensures everything in a row is aligned properly
            gap: "5px",
            width: "calc(100% - " + PADDING_OUTLINE + "px)",
            marginBottom: "20px",
            lineHeight: "0.9",
        },
        iconContainer: {
            display: "flex",
            flexWrap: "nowrap", // Keep all large icons in a single row
            gap: "5px",
            minWidth: ` ${MIN_WIDTH_LARGE_ICON}px `, // Prevent icons from shrinking
            flexShrink: 0, // Prevent icons from shrinking
            alignItems: "center",
        },
        textLarge: {
            fontSize: `${FONT_SIZE_LARGE}px`,

            textShadow: TEXT_SHADOW,
            fontWeight: "bold",
            display: "inline", // Helps align with images
            alignItems: "center",
            position: "relative",
            top: "-5px", // Adjust this value to move text slightly higher
        },
        textSmall: {
            fontSize: `${FONT_SIZE_SMALL}px`,
            textShadow: TEXT_SHADOW,
            fontWeight: "bold",
            display: "inline",
            alignItems: "center",
            position: "relative",
        },
        iconImageLarge: {
            width: `${ICON_SIZE_LARGE}px`,
            height: `${ICON_SIZE_LARGE}px`,
            objectFit: "contain",
            display: "inline-block",
            verticalAlign: "middle",

        },
        iconImageSmall: {
            width: `${ICON_SIZE_SMALL}px`,
            height: `${ICON_SIZE_SMALL}px`,
            objectFit: "contain",
            display: "inline-block",
            marginTop: "-3px", // Adjust this value to move image slightly lower
            marginBottom: "-3px",
            verticalAlign: "middle",
        }
    };

    const renderTextOrImage = (value, isLarge) => {
        if (typeof value === "string" && /^https?:\/\//.test(value)) {
            return (
                <img
                    src={value}
                    alt="icon"
                    style={isLarge ? styles.iconImageLarge : styles.iconImageSmall}
                    onError={(e) => e.target.src = DISPLAY_SETTINGS.defaultImage}
                />
            );
        }
        return <span style={isLarge ? styles.textLarge : styles.textSmall}>{value}</span>;
    };
    const renderTextOrImage2 = (value, isLarge, newSize = SMALLER_LARGE_ICON_SIZE) => {
        // Clone the styles to local scope to prevent global mutation
        const imgStyle = { ...styles.iconImageLarge, width: newSize, height: newSize, margin: "0px -5px" };
        const textStyle = { ...isLarge ? styles.textLarge : styles.textSmall, fontSize: newSize };

        if (typeof value === "string" && /^https?:\/\//.test(value)) {
            return (
                <img
                    src={value}
                    alt="icon"
                    style={imgStyle}
                    onError={(e) => e.target.src = DISPLAY_SETTINGS.defaultImage}
                />
            );
        }
        return <span style={textStyle}>{value}</span>;
    };


    return (
        <div style={styles.card}>
            <div style={styles.background} />
            <div style={styles.overlay} />
            <div style={styles.content}>
                {ICON_EXPLANATIONS.map((entry, index) => (
                    <div style={styles.row} key={index}>
                        {/* Render larger main icons + text */}
                        {entry.icons?.length > 0 ? (
                            <div style={styles.iconContainer}>

                                {entry.icons.map((item, i) => renderTextOrImage2(item, true))}
                            </div>
                        ) :

                            <></>
                        }

                        {/* Render explanation text with mixed small icons */}
                        <div>
                            {entry.explanation.map((item, i) => renderTextOrImage(item, false))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
