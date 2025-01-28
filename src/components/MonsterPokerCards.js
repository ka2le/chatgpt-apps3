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
import Box from '@mui/material/Box';

const ONLINE = true;

// Constants and Default Settings
const FONT_SIZE =  ONLINE ? 90 : 85;
const MARGIN_SIZE = ONLINE ? 20 : 55;
const CONTENT_PADDING = ONLINE ? 10 : 30;
const CARD_WIDTH = 635;
const CARD_HEIGHT = 888;
const SAVE_SCALE = ONLINE ? 0.4 : 1;

const STAT_ICONS = [
    { name: "robot", icon: "https://ka2le.github.io/chatgpt-apps3/images/mp/robot.png" },
    { name: "rabbit", icon: "https://ka2le.github.io/chatgpt-apps3/images/mp/rabbit.png" },
    { name: "dragon", icon: "https://ka2le.github.io/chatgpt-apps3/images/mp/dragon.png" },
];

const DISPLAY_SETTINGS = {
    dmgIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/suit_hearts_broken.png",
    multiplierIcon: "*",
    cdIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/hourglass.png",
    arrowIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/arrow_right.png",
   // startIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/timer_100.png",
    startIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/play.png",
    cardAddIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/card_add.png",
    copyCardIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/cards_fan_outline.png",
    reuseCardIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/reuse_card.png",
    shieldIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/shield.png",
    defaultImage: "https://via.placeholder.com/635x888",
};

const DEFAULT_CARDS = [
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
        "https://ka2le.github.io/chatgpt-apps3/images/mp/suit_hearts_broken.png",
        "*",
        "https://ka2le.github.io/chatgpt-apps3/images/mp/robot.png",
        "*",
         "<br>",
        "https://ka2le.github.io/chatgpt-apps3/images/mp/rabbit.png",
        "*",
        "https://ka2le.github.io/chatgpt-apps3/images/mp/dragon.png"
      ],
      "cd": 1
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
        "https://cdn.midjourney.com/aa533a09-6415-4a28-9981-5aee847fcfab/0_0.png"
      ],
      "cardType": "action",
      "stats": [],
      "effect": {},
      "customEffect": [
        "https://ka2le.github.io/chatgpt-apps3/images/mp/shield.png",
        "https://ka2le.github.io/chatgpt-apps3/images/mp/arrow_right.png",
        "https://ka2le.github.io/chatgpt-apps3/images/mp/suit_hearts_broken.png"
      ],
      "cd": 1
    },
    {
      "cardName": "double_dmg",
      "copies": 1,
      "images": [
        "https://cdn.midjourney.com/a8f69b4e-679c-4834-b616-39fdee5e5201/0_0.png"
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
        "cardName": "Murder rabbit",
        "copies": 1,
        "images": [
          "https://cdn.midjourney.com/c5692cc1-a3e0-43d6-ab00-123c97cd9e53/0_0.png"
        ],
        "cardType": "action",
        "effect": {
          "dmg": 4,
          "dmgType": 1
        },
        "cd": 2
      },
     
      {
        "cardName": "joker",
        "copies": 1,
        "images": [
          "https://cdn.midjourney.com/007b3fdb-da8a-4283-83d4-7baedb96b390/0_0.png"
        ],
        "cardType": "stat",
        "stats": [
          0,
          1,
          2
        ]
      },
      {
        "cardName": "robot_dragon",
        "copies": 2,
        "images": [
          "https://cdn.midjourney.com/7b6f6976-1fdc-40b1-9008-bea313ba61df/0_0.png",
          "https://cdn.midjourney.com/2f6c7377-acb9-48ab-beaf-26684c3f8e08/0_0.png"
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
          "https://cdn.midjourney.com/632efef5-4d03-40ac-a69c-52bb789a72b3/0_0.png",
          "https://cdn.midjourney.com/261245f8-c25c-40c5-a8bc-2b2f6f9f186e/0_0.png"
        ],
        "cardType": "stat",
        "stats": [
          0,
          1
        ]
      },
      {
        "cardName": "dragon_rabbit",
        "copies": 2,
        "images": [
          "https://cdn.midjourney.com/d5297d39-ddb0-4e18-a2f9-93ff4cacf522/0_0.png",
          "https://cdn.midjourney.com/b78b6a36-5f3b-434b-9e64-174987189c81/0_0.png"
        ],
        "cardType": "stat",
        "stats": [
          1,
          2
        ]
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
          "dmg": 4,
          "dmgType": 2
        },
        "cd": 4
      },
      {
        "cardName": "Shield3",
        "copies": 2,
        "images": [
          "https://cdn.midjourney.com/1617f771-5d18-4091-bbbe-97f2652171f9/0_0.png",
          "https://cdn.midjourney.com/e2dd6213-0b79-4492-b7d4-d10c4c02507f/0_0.png"
        ],
        "cardType": "action",
        "effect": {
          "shield": 6
        },
        "cd": 3
      },
      {
        "cardName": "Shield1",
        "copies": 1,
        "images": [
          "https://cdn.midjourney.com/07af1083-7432-4477-b298-3c0089e8afba/0_0.png"
        ],
        "cardType": "action",
        "effect": {
          "shield": 2
        },
        "cd": 1
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
      "copies": 1,
      "images": [
        "https://cdn.midjourney.com/a0efb9fb-7b20-4c09-a45a-d977c3ae3f93/0_0.png"
      ],
      "cardType": "stat",
      "stats": [
        1,
        1
      ]
    },
    {
      "cardName": "robot2",
      "copies": 2,
      "images": [
        "https://cdn.midjourney.com/487a8f0b-684d-4dcc-8af6-1e5618174be1/0_0.png",
        "https://cdn.midjourney.com/67d516be-005c-477a-9897-a52504e7f94b/0_0.png"
      ],
      "cardType": "stat",
      "stats": [
        0,
        0
      ]
    },
    {
        "cardName": "robot1",
        "copies": 7,
        "images": [
          "https://cdn.midjourney.com/7714408d-861c-449a-b26d-57059940c9c5/0_0.png",
          "https://cdn.midjourney.com/65e34e07-6ce4-4f65-9c9d-c3289b1ce3ec/0_0.png",
          "https://cdn.midjourney.com/2f5e90ad-d7d3-46be-9f06-14afccc44046/0_0.png",
          "https://cdn.midjourney.com/86e89b45-c8fe-4bb1-a43c-79e185a984c4/0_0.png",
          "https://cdn.midjourney.com/a602b362-8454-43de-aac3-70d51cccb548/0_0.png",
          "https://cdn.midjourney.com/d2dd60ef-3fc1-4f18-a3c7-bb5d25020b50/0_0.png",
          "https://cdn.midjourney.com/6d8979f0-5a43-4613-9b57-04caef84ca98/0_0.png"
        ],
        "cardType": "stat",
        "stats": [
          0
        ]
      },
    {
      "cardName": "robot_attack",
      "copies": 7,
      "images": [
        "https://cdn.midjourney.com/5413367d-1f71-4247-b4e7-7b808a88805f/0_0.png",
        "https://cdn.midjourney.com/a152fbf5-1254-4044-970c-e1537435c2c7/0_0.png",
        "https://cdn.midjourney.com/36577eb0-fedd-4f63-ad88-24e5e3689486/0_0.png",
        "https://cdn.midjourney.com/8a8fa84e-4239-4520-a12e-c516ff47272a/0_0.png",
        "https://cdn.midjourney.com/ef1a2d8f-b2b9-4e80-9dff-390439a77d73/0_0.png",
        "https://cdn.midjourney.com/d0ab3f46-1a6d-4292-8fdd-bcf7863fb886/0_0.png",
        "https://cdn.midjourney.com/4b27a7b9-bde7-4a0f-8d24-8496fc8730ed/0_0.png"
      ],
      "cardType": "action",
      "stats": [],
      "effect": {
        "dmg": 1,
        "dmgType": 0
      }
    },
    
    {
      "cardName": "dragon1",
      "copies": 7,
      "images": [
        "https://cdn.midjourney.com/7cad2b17-1b09-43be-b4f6-8f1ca883d109/0_0.png",
        "https://cdn.midjourney.com/8260e31b-2fdc-4a51-80f2-33f0802abcd1/0_0.png",
        "https://cdn.midjourney.com/d4646dbf-1b18-437f-9c38-4d7bd2c6aa77/0_0.png",
        "https://cdn.midjourney.com/a6189387-9033-440d-94b7-4633aa6f9b05/0_0.png",
        "https://cdn.midjourney.com/8b0c23f3-ce49-42d7-b71c-7dc4ecebe156/0_0.png",
        "https://cdn.midjourney.com/1b337ee8-f342-4170-b9b3-d4e00c50abaf/0_0.png",
        "https://cdn.midjourney.com/7428b967-9ad6-494f-bbf2-fb06542137da/0_0.png"
      ],
      "cardType": "stat",
      "stats": [
        2
      ]
    },
    {
        "cardName": "Dragons Breath",
        "copies": 7,
        "images": [
          "https://cdn.midjourney.com/8989a9f5-da33-4bdd-bc2b-ef7a681ea095/0_0.png",
          "https://cdn.midjourney.com/8d7b2bc0-ad87-4493-9825-bd659602d026/0_0.png",
          "https://cdn.midjourney.com/9e0945dd-5fa1-4cb0-8a2f-cce1d576118b/0_0.png",
          "https://cdn.midjourney.com/c35d8958-bb38-481b-8dab-977661ae916a/0_0.png",
          "https://cdn.midjourney.com/421982d3-be47-4b1b-b968-e92206303b35/0_0.png",
          "https://cdn.midjourney.com/de6abac3-eaf0-4da7-ad7b-71ef82c04ca9/0_0.png",
          "https://cdn.midjourney.com/0b85e656-d611-4403-ab22-d7268a593c39/0_0.png"
        ],
        "cardType": "action",
        "effect": {
          "dmg": 3,
          "dmgType": 2
        },
        "cd": 3
      },
    {
      "cardName": "critter1",
      "copies": 7,
      "images": [
        "https://cdn.midjourney.com/97d565dc-a15d-4fef-bd18-327048b9f248/0_0.png",
        "https://cdn.midjourney.com/853d3da1-e05b-477a-873c-454b4ce72c34/0_0.png",
        "https://cdn.midjourney.com/f08172ee-b115-4c6b-b05f-b92ae4f45e25/0_0.png",
        "https://cdn.midjourney.com/2dd9dd8e-43a7-4521-b1c2-357667510a5a/0_0.png",
        "https://cdn.midjourney.com/36bb09f1-e5af-4f2e-a28b-653cb4751b16/0_0.png",
        "https://cdn.midjourney.com/69a33373-caed-4ef4-b207-e1233851459a/0_0.png",
        "https://cdn.midjourney.com/affa9cf2-a9eb-4995-b8ec-8fdc22e71535/0_0.png"
      ],
      "cardType": "stat",
      "stats": [
        1
      ]
    },
  
    
    {
      "cardName": "Swarm",
      "copies": 7,
      "images": [
        "https://cdn.midjourney.com/8cb5923f-3c09-4600-ae07-a7194fa19483/0_0.png",
        "https://cdn.midjourney.com/60e654ff-5892-4a8c-bde0-e7d2ac14f64b/0_0.png",
        "https://cdn.midjourney.com/8891ed87-7ce3-4b32-abc0-6d8fee705dee/0_0.png",
        "https://cdn.midjourney.com/2be48f0b-ec75-4f71-96ba-af841c62f337/0_0.png",
        "https://cdn.midjourney.com/83e3cdc6-a447-4684-a707-53f1ddf91a91/0_0.png",
        "https://cdn.midjourney.com/140e918b-31f8-4e9f-b19b-6eadd7a8efa0/0_0.png",
        "https://cdn.midjourney.com/35c85bc8-8e8b-439f-8c69-a3c7575b33cf/0_0.png"
      ],
      "cardType": "action",
      "effect": {
        "dmg": 2,
        "dmgType": 1
      },
      "cd": 2
    },
    
  ]
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
            textAlign: "center",

            fontWeight: "bold",
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
const regularTextAdjustment = "-15px";

// Utility Components
const IconOrImage = ({ value, fontSize = FONT_SIZE }) => {
    const iconStyle = {
        position: 'relative',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: fontSize,
        height: fontSize,
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        position: 'relative',
        filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))',
    };

    // Style for the shadow/outline effect
    const shadowStyle = {
        position: 'absolute',
        top: regularTextAdjustment, // Adjust shadow position for text
        left: '1px',
        width: '100%',
        height: '100%',
        filter: 'invert(1) opacity(0.6)',
        transform: 'scale(1.1)',
    };

    if (value === "*") {
        return (
            <div style={iconStyle}>
                <span style={{
                    ...shadowStyle,
                    fontFamily: "AdiosAmigosRegular",
                    fontSize: "55px",
                    filter: 'blur(2px) brightness(0)',
                    top: "-13px", // Adjust text position

                }}>
                    *
                </span>
                <span style={{
                    position: 'relative',
                    fontFamily: "AdiosAmigosRegular",
                    fontSize: "55px",
                    color: 'white',
                    filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))',
                    top: "-25px", // Adjust text position
                }}>
                    *
                </span>
            </div>
        );
    }
    if (value === "<br>") {
        return <br />;
    }

    if (typeof value === "string" && /^https?:\/\//.test(value)) {
        return (
            <div style={iconStyle}>
                {/* Shadow/outline layer */}
                <img
                    src={value}
                    alt="icon-shadow"
                    style={{
                        ...imageStyle,
                        ...shadowStyle,
                        top: "1px", // Reset shadow adjustment for images
                    }}
                    onError={(e) => {
                        e.currentTarget.outerHTML = `<span style="font-size: ${fontSize}px">X</span>`;
                    }}
                />
                {/* Main icon layer */}
                <img
                    src={value}
                    alt="icon"
                    style={{
                        ...imageStyle,
                        position: 'relative',
                        filter: 'brightness(1) drop-shadow(0px 2px 4px rgba(0,0,0,0.5))',
                    }}
                    onError={(e) => {
                        e.currentTarget.outerHTML = `<span style="font-size: ${fontSize}px">X</span>`;
                    }}
                />
            </div>
        );
    }

    return (
        <div style={iconStyle}>
            <span style={{
                ...shadowStyle,
                fontSize,
                filter: 'blur(2px) brightness(0)',
                top: regularTextAdjustment, // Adjust shadow position for text
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
const Card = ({ card }) => {
    const getStatIconOrText = (index) => {
        const mapping = STAT_ICONS[index];
        if (!mapping) return null;
        return <IconOrImage value={mapping.icon} />;
    };


    // Updated renderEffect function in the Card component
    const renderEffect = () => {
        if (!card.effect) return null;
        const { dmg = 0, dmgType, shield = 0 } = card.effect;
    
        // Render damage icons with a line break after the 3rd icon if dmg > 5
        const dmgIcons = [...Array(dmg)].map((_, i) => {
            const isLineBreak = dmg > 5 && i === 3; // Add line break after the 3rd icon if dmg > 5
            return (
                <React.Fragment key={`dmg-${i}`}>
                    <IconOrImage value={DISPLAY_SETTINGS.dmgIcon} />
                    {isLineBreak && <br />}
                </React.Fragment>
            );
        });
    
        // Render damage type icons
        const dmgTypeIcons = dmgType != null && (
            <>
                <IconOrImage value={DISPLAY_SETTINGS.multiplierIcon} />
                {getStatIconOrText(dmgType)}
            </>
        );
    
        // Render shield icons
        const shieldIcons = [...Array(shield)].map((_, i) => (
            <IconOrImage key={`shield-${i}`} value={DISPLAY_SETTINGS.shieldIcon} />
        ));
    
        // Render custom effects
        const customEffectIcons = (card.customEffect || []).map((effect, i) => (
            <IconOrImage key={`custom-effect-${i}`} value={effect} />
        ));
    
        return (
            <div style={styles.card.effect}>
                {dmgIcons}
                {dmgTypeIcons}
                {shieldIcons}
                {customEffectIcons}
            </div>
        );
    };
    

    return (
        <div style={{ ...styles.card.outer, backgroundImage: `url(${card.images?.[0] || DISPLAY_SETTINGS.defaultImage})` }}>
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
                        <div style={styles.card.verticalLock}>
                            {card.cd === -1 ? (
                                <IconOrImage value={DISPLAY_SETTINGS.startIcon} />
                            ) : (
                                [...Array(card.cd)].map((_, i) => (
                                    <IconOrImage key={`cd-${i}`} value={DISPLAY_SETTINGS.cdIcon} />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
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
  
    return (
      <Dialog 
        open={isOpen} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
      >
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
              <Card card={{ ...card, images: [card.displayImage] }} />
            </div>
          ))}
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
    console.error(totalCopies,cards,cards?.length);
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
