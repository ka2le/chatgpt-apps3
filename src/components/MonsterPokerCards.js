import React, { useState, useEffect } from "react";

// Constants and Default Settings
const FONT_SIZE = 80;
const MARGIN_SIZE = 35;
const CONTENT_PADDING = 10;
const CARD_WIDTH = 635;
const CARD_HEIGHT = 888;

const STAT_ICONS = [
    { name: "robot", icon: "https://ka2le.github.io/chatgpt-apps3/images/mp/robot.png" },
    { name: "rabbit", icon: "https://ka2le.github.io/chatgpt-apps3/images/mp/rabbit.png" },
    { name: "dragon", icon: "https://ka2le.github.io/chatgpt-apps3/images/mp/dragon.png" },
];

const DISPLAY_SETTINGS = {
    dmgIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/suit_hearts_broken.png",
    multiplierIcon: "*",
    cdIcon: "https://ka2le.github.io/chatgpt-apps3/images/mp/hourglass.png",
    defaultImage: "https://via.placeholder.com/635x888",
};

const DEFAULT_CARDS = [
    {
        cardName: "robot_stat_boost_base",
        copies: 5,
        cardType: "stat",
        stats: [0],
        images: ["https://cdn.midjourney.com/6d8979f0-5a43-4613-9b57-04caef84ca98/0_0.png"],
    },
    {
        cardName: "dragon_stat_boost",
        copies: 3,
        cardType: "stat",
        stats: [2],
        images: ["https://cdn.midjourney.com/680ffc3f-19f0-4c33-a8ef-9a9af8620f51/0_0.png"],
    },
    {
        cardName: "dragon_action",
        copies: 3,
        cardType: "action",
        effect: { dmg: 3, dmgType: 2 },
        cd: 3,
        images: ["https://cdn.midjourney.com/680ffc3f-19f0-4c33-a8ef-9a9af8620f51/0_0.png"],
    },
];


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
            gap: "20px",
            padding: "20px",
            justifyContent: "center",
            width: "100%",
            boxSizing: "border-box",
        },
        zoomControl: {
            marginBottom: "20px",
            textAlign: "center",
            padding: "10px",
        },
        wrapper: {
            overflow: "auto",
            flex: 1,
        }
    },
    editor: {
        container: {
            width: "400px",
            padding: "20px",
            borderRight: "1px solid #ddd",
            background: "#f9f9f9",
            overflow: "auto",
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
                padding: "15px",
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
            padding: "10px",
            background: "#f4f4f4",
            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between"
        }
    },
 
    footer: {
        container: {
            padding: "10px",
            background: "#f4f4f4",
            borderTop: "1px solid #ddd",
            textAlign: "center"
        }
    }
};

// Utility Components
const IconOrImage = ({ value, fontSize = FONT_SIZE }) => {
    if (value === "*") {
        return <span style={{ fontSize, fontFamily: "AdiosAmigosRegular" }}>*</span>;
    }
    
    if (typeof value === "string" && /^https?:\/\//.test(value)) {
        return (
            <img
                src={value}
                alt="icon"
                style={{
                    width: fontSize,
                    height: fontSize,
                    objectFit: "contain",
                    display: "inline-block",
                }}
                onError={(e) => {
                    e.currentTarget.outerHTML = `<span style="font-size: ${fontSize}px">X</span>`;
                }}
            />
        );
    }

    return <span style={{ fontSize }}>{value}</span>;
};

// Card Component
const Card = ({ card }) => {
    const getStatIconOrText = (index) => {
        const mapping = STAT_ICONS[index];
        if (!mapping) return null;
        return <IconOrImage value={mapping.icon} />;
    };

    const renderEffect = () => {
        if (!card.effect) return null;
        const { dmg = 0, dmgType } = card.effect;

        const dmgIcons = [...Array(dmg)].map((_, i) => (
            <IconOrImage key={`dmg-${i}`} value={DISPLAY_SETTINGS.dmgIcon} />
        ));

        const dmgTypeIcons = dmgType != null && (
            <>
                <IconOrImage value={DISPLAY_SETTINGS.multiplierIcon} />
                {getStatIconOrText(dmgType)}
            </>
        );

        return (
            <div style={styles.card.effect}>
                {dmgIcons}
                {dmgTypeIcons}
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
                    {card.cardType === "action" && card.cd && (
                        <div style={styles.card.verticalLock}>
                            {[...Array(card.cd)].map((_, i) => (
                                <IconOrImage
                                    key={`cd-${i}`}
                                    value={DISPLAY_SETTINGS.cdIcon}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Updated Gallery Component
const Gallery = ({ cards }) => {
    const [zoom, setZoom] = useState(0.5);
    
    // Calculate card width based on zoom level
    const cardWidth = CARD_WIDTH * zoom;
    
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
                }}
            >
                {cards.map((card) => (
                    <div 
                        key={card.cardName} 
                        style={{ 
                            transform: `scale(${zoom})`,
                            transformOrigin: "top left",
                            width: `${CARD_WIDTH}px`,
                            height: `${CARD_HEIGHT}px`,
                        }}
                    >
                        <Card card={card} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// New CardEdit Component
const CardEdit = ({ card, onUpdate, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleChange = (field, value) => {
        let parsedValue = value;
        
        // Parse arrays
        if (field === 'stats') {
            parsedValue = value.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
        }
        // Parse effect object
        else if (field === 'effect') {
            try {
                parsedValue = JSON.parse(value);
            } catch (e) {
                console.error('Invalid JSON for effect');
                return;
            }
        }
        // Parse images array
        else if (field === 'images') {
            parsedValue = value.split(',').map(url => url.trim());
        }
        // Parse numbers
        else if (field === 'copies' || field === 'cd') {
            parsedValue = parseInt(value);
        }

        onUpdate({ ...card, [field]: parsedValue });
    };

    return (
        <div style={styles.editor.cardEdit.container}>
            <div 
                style={styles.editor.cardEdit.header}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <span>{card.cardName || 'New Card'}</span>
                <div>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        onDelete(card);
                    }}>Delete</button>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                    }}>{isExpanded ? 'Collapse' : 'Expand'}</button>
                </div>
            </div>
            
            {isExpanded && (
                <div style={styles.editor.cardEdit.content}>
                    <div style={styles.editor.cardEdit.field}>
                        <label style={styles.editor.cardEdit.label}>Card Name</label>
                        <input
                            style={styles.editor.cardEdit.input}
                            value={card.cardName || ''}
                            onChange={(e) => handleChange('cardName', e.target.value)}
                        />
                    </div>

                    <div style={styles.editor.cardEdit.field}>
                        <label style={styles.editor.cardEdit.label}>Card Type</label>
                        <select
                            style={styles.editor.cardEdit.input}
                            value={card.cardType || 'stat'}
                            onChange={(e) => handleChange('cardType', e.target.value)}
                        >
                            <option value="stat">Stat</option>
                            <option value="action">Action</option>
                        </select>
                    </div>

                    <div style={styles.editor.cardEdit.field}>
                        <label style={styles.editor.cardEdit.label}>Copies</label>
                        <input
                            style={styles.editor.cardEdit.input}
                            type="number"
                            value={card.copies || 0}
                            onChange={(e) => handleChange('copies', e.target.value)}
                        />
                    </div>

                    <div style={styles.editor.cardEdit.field}>
                        <label style={styles.editor.cardEdit.label}>Stats (comma-separated indices)</label>
                        <input
                            style={styles.editor.cardEdit.input}
                            value={card.stats?.join(', ') || ''}
                            onChange={(e) => handleChange('stats', e.target.value)}
                        />
                    </div>

                    <div style={styles.editor.cardEdit.field}>
                        <label style={styles.editor.cardEdit.label}>Images (comma-separated URLs)</label>
                        <input
                            style={styles.editor.cardEdit.input}
                            value={card.images?.join(', ') || ''}
                            onChange={(e) => handleChange('images', e.target.value)}
                        />
                    </div>

                    {card.cardType === 'action' && (
                        <>
                            <div style={styles.editor.cardEdit.field}>
                                <label style={styles.editor.cardEdit.label}>Effect (JSON)</label>
                                <textarea
                                    style={styles.editor.cardEdit.textarea}
                                    value={JSON.stringify(card.effect || {}, null, 2)}
                                    onChange={(e) => handleChange('effect', e.target.value)}
                                />
                            </div>

                            <div style={styles.editor.cardEdit.field}>
                                <label style={styles.editor.cardEdit.label}>Cooldown</label>
                                <input
                                    style={styles.editor.cardEdit.input}
                                    type="number"
                                    value={card.cd || 0}
                                    onChange={(e) => handleChange('cd', e.target.value)}
                                />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

// Updated Editor Component
const Editor = ({ cards, setCards }) => {
    const [allExpanded, setAllExpanded] = useState(false);

    const handleUpdateCard = (updatedCard) => {
        setCards(cards.map(card => 
            card.cardName === updatedCard.cardName ? updatedCard : card
        ));
    };

    const handleDeleteCard = (cardToDelete) => {
        setCards(cards.filter(card => card.cardName !== cardToDelete.cardName));
    };

    const handleAddCard = () => {
        const newCard = {
            cardName: `new_card_${Date.now()}`,
            copies: 1,
            cardType: "stat",
            stats: [0],
            images: [],
        };
        setCards([...cards, newCard]);
    };

    return (
        <aside style={styles.editor.container}>
            <div style={styles.editor.controls}>
                <h2>Card Editor</h2>
                <div>
                    <button onClick={() => setAllExpanded(!allExpanded)}>
                        {allExpanded ? 'Collapse All' : 'Expand All'}
                    </button>
                    <button onClick={handleAddCard}>Add Card</button>
                </div>
            </div>
            
            {cards.map((card) => (
                <CardEdit
                    key={card.cardName}
                    card={card}
                    onUpdate={handleUpdateCard}
                    onDelete={handleDeleteCard}
                />
            ))}
        </aside>
    );
};
// Toolbar Component
const Toolbar = ({ cards }) => {
    const copyToClipboard = (data) => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        alert("Data copied to clipboard!");
    };

    return (
        <header style={styles.toolbar.container}>
            <h1>Monster Poker Cards</h1>
            <div>
                <button onClick={() => copyToClipboard(STAT_ICONS)}>Copy Icons</button>
                <button onClick={() => copyToClipboard(cards)}>Copy Cards</button>
                <button onClick={() => copyToClipboard(DISPLAY_SETTINGS)}>Copy Settings</button>
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

// Main Component
const MonsterPokerCards = () => {
    const [cards, setCards] = useState(DEFAULT_CARDS);

    useEffect(() => {
        const savedCards = localStorage.getItem("cards");
        if (savedCards) {
            setCards(JSON.parse(savedCards));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]);

    return (
        <div style={styles.container}>
            <Toolbar cards={cards} />
            <div style={styles.main}>
                <Editor cards={cards} setCards={setCards} />
                <Gallery cards={cards} />
            </div>
            <Footer cards={cards} />
        </div>
    );
};

export default MonsterPokerCards;