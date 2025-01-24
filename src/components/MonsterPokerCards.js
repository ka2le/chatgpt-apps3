import React, { useState, useEffect} from "react";

////////////////////////////////////////////////////////////////////////
// IconOrImage - Reusable component
////////////////////////////////////////////////////////////////////////
const IconOrImage = ({ value, fontSize }) => {
  // If it starts with http or https, treat it as an image
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
          // minimal fallback -> show an 'X'
          e.currentTarget.outerHTML = `<span style="font-size: ${fontSize}">X</span>`;
        }}
      />
    );
  }

  // Otherwise treat as text/emoji
  if (typeof value === "string") {
    return (
      <span style={{ fontSize }}>{value}</span>
    );
  }

  // If something else is passed or fails, show 'X'
  return <span style={{ fontSize }}>X</span>;
};

////////////////////////////////////////////////////////////////////////
// Card Component
////////////////////////////////////////////////////////////////////////
const Card = ({ card, mappings, settings }) => {
  // Pull styles from settings for easy reuse
  const {
    fontSize = 80,
    marginSize = 30,
    contentPadding = 10,
    dmgIcon = "🔥",
    multiplierIcon = "x",
    defaultImage = "https://via.placeholder.com/635x888"
  } = settings;

  const fontSizePx = `${fontSize}px`;
  const marginSizePx = `${marginSize}px`;

  // Pre-calc card base sizes
  const cardWidth = 635; 
  const cardHeight = 888;

  // Centralized styles
  const cardStyles = {
    outer: {
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
      backgroundSize: "cover",
      backgroundImage: `url(${card.images?.[0] || defaultImage})`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    innerMargin: {
      // Subtract the margin from both sides
      width: `calc(100% - ${marginSizePx})`,
      height: `calc(100% - ${marginSizePx})`,
      background: "rgba(255, 255, 255, 0.0)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      // No direct padding – let contentContainer handle that
    },
    contentContainer: {
      // The actual "inner" area we want to position
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: contentPadding,
      height: "100%",
      width: "100%",
      boxSizing: "border-box",
    },
    effect: {
      fontSize: fontSizePx,
      textAlign: "center",
      fontWeight: "bold",
    },
    verticalLock: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "10px",
    },
  };

  // Reusable function to get the mapped icon/text
  const getStatIconOrText = (index) => {
    const mapping = mappings[index];
    if (!mapping) return null;
    return <IconOrImage value={mapping.icon} fontSize={fontSizePx} />;
  };

  // Render an action's effect line (e.g. dmg, custom icons, etc.)
  const renderEffect = () => {
    if (!card.effect) return null;
    const { dmg = 0, dmgType, customIcon } = card.effect;

    const dmgIcons = [...Array(dmg)].map((_, i) => (
      <IconOrImage key={`dmg-${i}`} value={dmgIcon} fontSize={fontSizePx} />
    ));

    // For dmgType, we show the multiplier icon then the mapped stat icon
    const dmgTypeIcons = dmgType != null && (
      <>
        <IconOrImage value={multiplierIcon} fontSize={fontSizePx} />
        {getStatIconOrText(dmgType)}
      </>
    );

    // For customIcon, show it if present
    const customIconElement = customIcon && (
      <IconOrImage value={customIcon} fontSize={fontSizePx} />
    );

    return (
      <div style={cardStyles.effect}>
        {dmgIcons}
        {dmgTypeIcons}
        {customIconElement}
      </div>
    );
  };

  return (
    <div style={cardStyles.outer}>
      <div style={cardStyles.innerMargin}>
        <div style={cardStyles.contentContainer}>
          {/* If it's an action card, show damage/effect row */}
          {card.cardType === "action" && renderEffect()}

          {/* If it's a stat card, show each stat icon */}
          {card.cardType === "stat" && (
            <div style={cardStyles.verticalLock}>
              {card.stats.map((stat, index) => (
                <div key={`stat-${index}`}>
                  {getStatIconOrText(index)}
                </div>
              ))}
            </div>
          )}

          {/* If it's an action card, show cooldown */}
          {card.cardType === "action" && (
            <div style={cardStyles.verticalLock}>
              {card.cd || "CD Placeholder"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

////////////////////////////////////////////////////////////////////////
// Gallery - just updated references, same approach
////////////////////////////////////////////////////////////////////////
const Gallery = ({ mappings, cards, settings }) => {
  const [zoom, setZoom] = useState(0.5);

  const galleryStyles = {
    container: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
      padding: "10px",
    },
    zoomControl: {
      marginBottom: "10px",
      textAlign: "center",
    },
    cardWrapper: (z) => ({
      transform: `scale(${z})`,
      transformOrigin: "top left",
      display: "inline-block",
    }),
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
        {cards.map((card) => (
          <div key={card.cardName} style={galleryStyles.cardWrapper(zoom)}>
            <Card card={card} mappings={mappings} settings={settings} />
          </div>
        ))}
      </div>
    </main>
  );
};

////////////////////////////////////////////////////////////////////////
// Example usage - MonsterPokerCards container
////////////////////////////////////////////////////////////////////////
const MonsterPokerCards = () => {
  const [mappings, setMappings] = useState([
    { name: "robot", icon: "⚙️" },
    { name: "dragon", icon: "🐉" },
  ]);
  const [cards, setCards] = useState([
    {
      cardName: "robot_stat_boost_base",
      copies: 5,
      cardType: "stat",
      stats: [0], // indexes into the mappings array
      images: ["https://cdn.midjourney.com/6d8979f0-5a43-4613-9b57-04caef84ca98/0_0.png"],
    },
    {
      cardName: "dragon_stat_boost",
      copies: 3,
      cardType: "stat",
      stats: [1],
      images: ["https://cdn.midjourney.com/680ffc3f-19f0-4c33-a8ef-9a9af8620f51/0_0.png"],
    },
    {
      cardName: "dragon_action",
      copies: 3,
      cardType: "action",
      effect: { dmg: 3, dmgType: 1 },
      cd: 3,
      images: ["https://cdn.midjourney.com/680ffc3f-19f0-4c33-a8ef-9a9af8620f51/0_0.png"],
    },
  ]);
  const [settings, setSettings] = useState({
    fontSize: 80,          // drives icon & text size
    marginSize: 35,        // sets the inner margin offset
    contentPadding: 10,    // sets padding inside the content container
    dmgIcon: "🔥",
    multiplierIcon: "x",
    defaultImage: "https://via.placeholder.com/635x888",
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Example: mock toolbar & editor (your own components) */}
      <Toolbar mappings={mappings} cards={cards} settings={settings} />
      <div style={{ flex: 1, display: "flex" }}>
        <SettingsEditor settings={settings} setSettings={setSettings} />
        <Gallery mappings={mappings} cards={cards} settings={settings} />
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
