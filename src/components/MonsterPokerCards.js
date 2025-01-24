import React, { useEffect, useState } from 'react';


// Main Component
const MonsterPokerCards = () => {
    const [mappings, setMappings] = useState([
        { name: "robot", icon: "⚙️", defaultImage: "https://example.com/robot_default.png" },
        { name: "dragon", icon: "🐉", defaultImage: "https://cdn.midjourney.com/680ffc3f-19f0-4c33-a8ef-9a9af8620f51/0_0.png" }
    ]);
    const [cards, setCards] = useState([
        {
            cardName: "robot_stat_boost_base",
            copies: 5,
            cardType: "stat",
            stats: [1, 0],
            images: ["https://cdn.midjourney.com/6d8979f0-5a43-4613-9b57-04caef84ca98/0_0.png"]
        },
        {
            cardName: "dragon_stat_boost",
            copies: 3,
            cardType: "stat",
            stats: [0, 1],
            images: ["https://cdn.midjourney.com/680ffc3f-19f0-4c33-a8ef-9a9af8620f51/0_0.png"]
        },
        {
            cardName: "dragon_action",
            copies: 3,
            cardType: "action",
            dmg:3,
            cd:3,
            stats: [0, 0],
            images: ["https://cdn.midjourney.com/680ffc3f-19f0-4c33-a8ef-9a9af8620f51/0_0.png"]
        }
    ]);
    const [settings, setSettings] = useState({ fontSize: 14, layout: "default" });

    return (
        <div style={{ width: "100vw", height: "100vh", background: "rgb(255,255,255)", display: "flex", flexDirection: "column" }}>
            <Toolbar mappings={mappings} cards={cards} settings={settings} />
            <div style={{ flex: 1, display: "flex" }}>
                <SettingsEditor settings={settings} setSettings={setSettings} />
                <Gallery mappings={mappings} cards={cards} />
            </div>
            <Footer cards={cards} />
        </div>
    );
};

// Toolbar Component
const Toolbar = ({ mappings, cards, settings }) => {
    const copyToClipboard = (data) => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        alert("Data copied to clipboard!");
    };

    return (
        <header style={{ padding: "10px", background: "#f4f4f4", borderBottom: "1px solid #ddd", display: "flex", justifyContent: "space-between" }}>
            <h1>Monster Poker Cards</h1>
            <div>
                <button onClick={() => copyToClipboard(mappings)}>Copy Mappings</button>
                <button onClick={() => copyToClipboard(cards)}>Copy Cards</button>
                <button onClick={() => copyToClipboard(settings)}>Copy Settings</button>
            </div>
        </header>
    );
};

// Settings Editor Component
const SettingsEditor = ({ settings, setSettings }) => {
    useEffect(() => {
        const savedSettings = JSON.parse(localStorage.getItem("settings")) || {};
        setSettings(savedSettings);
    }, [setSettings]);

    useEffect(() => {
        localStorage.setItem("settings", JSON.stringify(settings));
    }, [settings]);

    return (
        <aside style={{ padding: "10px", borderRight: "1px solid #ddd", background: "#f9f9f9" }}>
            <h2>Settings</h2>
            <p>Adjust global settings here.</p>
        </aside>
    );
};

// Gallery Component
// Card Component
const Card = ({ card, mappings }) => {
    const cardStyles = {
        outer: {
            width: "635px",
            height: "888px",
            backgroundSize: "cover",
            backgroundImage: `url(${card.images[0] || "https://via.placeholder.com/635x888"})`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative"
        },
        innerMargin: {
            width: "90%",
            height: "90%",
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "10px"
        },
        effect: {
            fontSize: "24px",
            textAlign: "center",
            fontWeight: "bold"
        },
        verticalLock: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px"
        },
        statIcon: {
            width: "20px",
            height: "20px"
        }
    };

    const getStatIconOrText = (stat, index) => {
        const mapping = mappings[index];
        return mapping ? (
            mapping?.icon.startsWith("http") ? (
                <img src={mapping.icon} alt={mapping.name} style={cardStyles.statIcon} />
            ) : (
                <span>{mapping.icon}</span>
            )
        ) : null;
    };

    return (
        <div style={cardStyles.outer}>
            <div style={cardStyles.innerMargin}>
                <div style={cardStyles.effect}>{card.effect || "Effect Placeholder"}</div>
                <div style={cardStyles.verticalLock}>
                    {card.stats.map((stat, index) => (
                        <div key={index}>{getStatIconOrText(stat, index)}</div>
                    ))}
                    <div>{card.cd || "CD Placeholder"}</div>
                </div>
            </div>
        </div>
    );
};

// Gallery Component
const Gallery = ({ mappings, cards }) => {
    const [zoom, setZoom] = useState(1);

    const galleryStyles = {
        container: {
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            padding: "10px"
        },
        zoomControl: {
            marginBottom: "10px",
            textAlign: "center"
        },
        cardWrapper: (zoom) => ({
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
            display: "inline-block"
        })
    };

    return (
        <main style={{ padding: "10px" }}>
            <div style={galleryStyles.zoomControl}>
                <label>Zoom: </label>
                <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                />
            </div>
            <div style={galleryStyles.container}>
                {cards?.map((card) => (
                    <div key={card.cardName} style={galleryStyles.cardWrapper(zoom)}>
                        <Card card={card} mappings={mappings} />
                    </div>
                ))}
            </div>
        </main>
    );
};

// Footer Component
const Footer = ({ cards }) => {
    const totalCards = cards.reduce((sum, card) => sum + card.copies, 0);
    const uniqueCards = cards.length;

    return (
        <footer style={{ padding: "10px", background: "#f4f4f4", borderTop: "1px solid #ddd", textAlign: "center" }}>
            <p>Total Cards: {totalCards}</p>
            <p>Unique Cards: {uniqueCards}</p>
        </footer>
    );
};




export default MonsterPokerCards;
