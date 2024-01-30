import React, { useState, useEffect,useRef } from 'react';
import { Grid,Button} from '@mui/material';
import styled from 'styled-components';
import textBoxImg from '../images/starsBook/textbox2.png';
import Comfortaa from '../fonts/Comfortaa-VariableFont_wght.ttf';
import AmaticSC from '../fonts/AmaticSC-Bold.ttf';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

const textData = [

    { "id": 1, "text": "Tänk dig en ballong lika stor som hela huset, som smäller. Pang! Fast ännu större! Så började allt! En hög smäll! Boom! Allt som finns hamnade överallt. Som när Någon tappar blåbärsgröten och det målar hela köksgolvet blått. Fast ingen behöver städa." },
    { "id": 2, "text": "" },
    { "id": 3, "text": "" },
    { "id": 4, "text": "För stjärnstoftet ska va där. Det är fint och färgglatt. Glittrande som den bästa snurrkjolen. Sen började alla små stjärnstoft samlas. Stora dansande snurrande ringar som blev galaxer." },
    { "id": 5, "text": "I galaxerna kom megamånga stjärnor. Stjärnstoft som höll hand, hårt. Dom blev stora och varma bollar. Varmare än stekpannan." },
    { "id": 6, "text": "Och stjärnbollarna började lysa starkt. Ljusare än taklampan när du vill sova. “Släck lampan” ropar du! “Nej, tänt ska det va” säger jag. Så blinkar stjärnorna över hela rymden" },
    { "id": 7, "text": "\"Det här är Solen. Vår egen fina stjärna. Runt Solen snurrar vår planet, Jorden, och flera andra planeter.  Solen lyser upp planeterna och värmer oss." },
    { "id": 8, "text": "Jorden är ju vår planet där vår familj bor. Vem mer bor på Jorden? Alla kompisar. Och tigrar, kameleonter, kaniner. Ja alla!" },
    { "id": 9, "text": "För länge sen uppstod livet på jorden. Det började litet! Pytte pytte pytte! Småttingar som kallas för bakterier, alger och plankton. Lika små som tandtrollen! Under låååång lång tid så ändrades dom sakta. Deras bebisar och barn och barnbarn var lite annorlunda och fick nya spännande krafter. Amöbor kunde ändra form, som om deras kroppar var gjorda av deg." },
    { "id": 10, "text": "Så fortsatte det, över många dagar och veckor, över vår, sommar, höst och vinter. Många, många gånger om. Nya barn var lite annorlunda, vissa var mer som maneter. Sen kom sjöstjärnor och fiskar och fler och fler djur! Vissa kunde simma snabbare, andra kunde gömma sig bra. Några hade väldigt vassa tänder. Som hajar." },
    { "id": 11, "text": "Sen kom andra djur med vassa tänder. Tyrannosaurus Rex som åt andra dinosaurier. " },
    { "id": 12, "text": "Stegosaurus med sina plattor och platta tänder åt växter. Det fanns många olika dinosaurier som såg helt olika ut. Stora som hus stampade dinosaurierna runt på jorden och vrålade." },
    { "id": 13, "text": "Ute i mörka mystiska rymden flög en stor sten, en asteroid. Som om någon kastat den mot jorden, fast man inte får. " },
    { "id": 14, "text": "Dinosaurierna tittade upp i himlen och såg ett stort eldklot. Krash! Den krockade med jorden. När stenen träffat marken kallas den för meteorit. Efter meteoritens krock fanns det inga fler dinosaurier. Förutom leksaksdinosaurier såklart" },
    { "id": 15, "text": "Efter dinosauriernas tid kom nya djur. Mammutar som var som håriga elefanter, stora som bussar. Kolla på den där pälsen, lika tjock som den bästa vinteroverallen. Dom frös inte ens när vintern är som kallast." },
    { "id": 16, "text": "Det fanns även sabeltandade tigrar. Som dagens tigrar men med längre och vassare tänder. Förr i tiden fanns det många olika spännande djur, som är försvunna idag. Vissa djur från den tiden finns kvar som till exempel…" },
    { "id": 17, "text": "Dom busiga aporna. Kanske kastade dom bananer på sabeltandade tigrar. Apor finns ju fortfarande idag. Schimpanser, gorillor och mandriller." },
    { "id": 18, "text": "Men det kom också nya apor. Precis som små fiskar i havet blev till stora hajar. På samma sätt så fick aporna barn som hade mindre svans och gick på två ben. Många många barnbarn senare blev sådana apor till människor. Människor som tittade upp på blinkande stjärnor och såg mönster och drömde." },
    { "id": 19, "text": "Människorna planterade frön i jorden. Solen lyste på fröna och hjälpte dom växa. Vete som bakades till bröd, som Pita och Bao. Bönor som kokades till soppa. Knapriga morötter. Vad mer kan man odla och äta?" },
    { "id": 20, "text": "Sen byggde människor städer. Uppfinnare uppfann en massa saker: Varm eld, mysiga hus, spännande böcker, roliga leksaker och massa annat. Så uppfanns också raketer. Metallrör som sprutade eld ur rumpan. Högt och snabbt, högre än fåglar flög dom, snabbare än en bil, hela vägen ut i rymden! Hela vägen till..." },
    { "id": 21, "text": "Månen! I raketer flög människor till månen. Först ett litet steg försiktigt ut på månen. Sen hoppandes och studsandes. På månen går det att hoppa högre än på studsmattan! Oj vad astronauterna skrattade. Lyfta tunga saker är lätt på månen." },
    { "id": 22, "text": "Månen är som en magiskt värld. Fylld med vit sand och många stenar och stora gropar som kallas för kratrar. Ibland ser ju månen ut som en boll, ibland ser den halv ut. Men den är alltid rund. Det mörka är jordens skugga på månen." },
    { "id": 23, "text": "Det här är planeten Venus. Dit har ingen människa åkt än. Där finns det gula moln som luktar prutt. Det är så varmt på Venus, att glassar smälter direkt. Snabbare än på sommaren. Kladdigt va?" },
    { "id": 24, "text": "Mars är en annan planet som ingen åkt till än. Där är det lite kallare. Fullt med röd sand och berg. Massa plats att bygga nya städer på, nya lekplatser kanske. Mars är lite som månen, det går att hoppa högt och lyfta tungt. Vart skulle du vilja åka och vad skulle du packa med dig?" },
    { "id": 25, "text": "Långt ut i rymden, på planeter som snurrar runt andra stjärnor så kanske det finns rymdvarelser. Kanske har dom många huvuden och kan flyga utan vingar." },
    { "id": 26, "text": "Kanske älskar dom att leka kurragömma. Ingen vet, för ingen har kunnat åka så långt än. Då måste vi uppfinna större och snabbare raketer i framtiden." },
    { "id": 27, "text": "Uppe i rymden finns hela universum. Alla andra planeter som snurrar runt andra stjärnor och helt andra galaxer. Det är spännande att fantisera om allt som finns där uppe. Kanske är det du som uppfinner nya raketer och åker på rymdäventyr. Säger hej till alla rymdvarelser och vinkar godnatt till de blinkande stjärnorna." },
    { "id": 28, "text": "" }


];

const PlanetLabels = ({ labels }) => {


    return (
        <div style={{ position: "absolute", color: "white", top: 0, left: 0 }}>
            {labels.map(label => (
                <Text key={label.name} style={{
                    position: "absolute",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    padding: "0.4vw",
                    borderRadius: "0.4vw",
                    fontSize: "0.9vw",
                    top: label.top,
                    width: "max-content",
                    left: label.left
                }}>
                    {label.name}
                </Text>
            ))}
        </div>
    );
};
const planetLabels = [
    { name: "Saturnus", top: "6vw", left: "13vw" },
    { name: "Jupiter", top: "3vw", left: "30.5vw" },
    { name: "Venus", top: "44.2vw", left: "1vw" },
    { name: "Merkurius", top: "32vw", left: "4.9vw" },
    { name: "Jorden", top: "15vw", left: "44vw" },
    { name: "Mars", top: "35.2vw", left: "41.2vw" },
    { name: "Uranus", top: "16.3vw", left: "2vw" },
    { name: "Neptune", top: "43vw", left: "36vw" }
];
// Configuration data for each page
const configData = [
    //BIG BANG
    { id: 1, hasBackground: true, width: 40,top:42, height: 8.5 },
    { id: 2, },
    //GALAXY
    { id: 3, },
    { id: 4, top: 43, left: 12, height:7, width:38, hasBackground:true, opacity: 0.6 },
    //STARS
    { id: 5, top: 0, width: 42, opacity: 0.4 },
    { id: 6, top: 43, left: 12, opacity: 0.4 },
    //SOLEN OCH JORDEN
    {id: 7, left: 9, width: 17, top: 40,  opacity: 0.5,  component: PlanetLabels, componentProps: { labels: planetLabels }},
    { id: 8, top: 40, left: 5, width: 40, opacity: 0.4 },
    //BAKTERIER
    { id: 9, hasBackground: true, top: 43.5, width: 52.1, left: 1, opacity: 0.8, height: 8},
    { id: 10, hasBackground: true, top: 43.5, width: 52.5, left: 1.5, opacity: 0.8, height: 8 },
    //DINOSAURIER
    { id: 11, color: 'black', top: 0, width: 44,left:1.5 },
    { id: 12, top: 0, left: 4, opacity: 0.35, width: 33 },
    //METEORIT
    { id: 13, top: 43.5, width: 38, left: 0 },
    { id: 14, top: 30, left: 1, width: 30 },
    //MAMMUTAR
    { id: 15, hasBackground: true, top: 42, width: 40, left: 9, opacity: 0.44, height: 8 },
    { id: 16, hasBackground: true, top: 30, width: 16, left: 36, opacity: 0.44, height: 17 },
    //APOR
    { id: 17, hasBackground: true, top: 0, width: 27, left: 2, opacity: 0.5, height: 8 },
    { id: 18, top: 39, left: 15, width: 32 },
    //ODLA
    { id: 19, color: 'black', left: 1, top: 1, width: 32, opacity: 0.2},
    //{ id: 20, top: 1,left:33,width:20},
    { id: 20, top: 43.5,  width: 51, hasBackground: true, height: 8, opacity: 0.5, left: 1 },
    //MÅNEN
    { id: 21, top: 40, left: 5, width: 38 },
    { id: 22, top: 0, width: 45, left: 2 },
    //VENUS
    { id: 23, color: 'black', width: 16, top: 1, left: 1, opacity: 0.2 },
    { id: 24, opacity: 0.4, width: 25, height: 17, left: 22, top: 1 },
    //Alient
    { id: 25, top: 38, left: 28, width: 22, height: 9, opacity: 0.5, hasBackground: true },
    { id: 26, width: 24, height: 9, left: 17, opacity: 0.4, hasBackground: true },
    //DREAMS
    { id: 27, hasBackground: true, opacity: 0.4, height: 11, width: 35 },
    { id: 28 },

];

// Define default constants
const DEFAULT_TEXT_COLOR = 'white';
const DEFAULT_TOP = 3;
const DEFAULT_LEFT = 3;
const DEFAULT_HAS_BACKGROUND = false;
const DEFAULT_FONT_SIZE = '1vw';
const DEFAULT_TEXT_WIDTH = 35;
const DEFAULT_TEXT_HEIGHT = 9;
const TEXT_SHADOW_OPACITY = 0.3;
const DEFAULT_TEXTBOX_OPACITY = 0.6;
const SAVE_SIZE = 4;
const BRIGHTNESS_ADJUSTMENT = 1.1;



const StarsBook = () => {
    const pageRefs = useRef([]); // Array to hold refs for each BookPage

    const downloadAllPages = () => {
        console.log("Downloading all pages");
        Promise.all(pageRefs.current.map((pageRef, index) => {
            if (pageRef) {
                return saveAsImage(pageRef, `Page_${index + 1}`);
            }
            return Promise.resolve();
        }))
        .then(() => {
            console.log("All pages downloaded");
        })
        .catch(error => {
            console.error("Error downloading pages", error);
        });
    };

    return (
        <Grid container spacing={0} style={{ background: 'black', margin: 0, padding: 0, fontFamily: Comfortaa, width:"100vw" }}>
             <Button fullWidth onClick={downloadAllPages}>Download All</Button>
            {configData.map((config, index) => {
                const pageText = textData.find(text => text.id === config.id)?.text || '';
                return <BookPage  ref={el => pageRefs.current[index] = el}  key={config.id} text={pageText ?? ""} config={config} />;
            })}
        </Grid>
    );
};


const BookPage = React.forwardRef(({ text, config }, ref) => {
    const {
        id,
        top = DEFAULT_TOP,
        left = DEFAULT_LEFT,
        color = DEFAULT_TEXT_COLOR,
        width = DEFAULT_TEXT_WIDTH,
        height = DEFAULT_TEXT_HEIGHT,
        hasBackground = DEFAULT_HAS_BACKGROUND,
        fontSize = DEFAULT_FONT_SIZE,
        opacity = hasBackground ? DEFAULT_TEXTBOX_OPACITY : TEXT_SHADOW_OPACITY,
        img
    } = config;

    const textStyle = {
        position: 'absolute',
        color: hasBackground ? "white" : color,
        top: `${top}vw`,
        backgroundColor: hasBackground ? "transparent" : color == "white" ? "rgba(0,0,0," + opacity + ")" : "rgba(255,255,255," + opacity + ")",
        boxShadow: hasBackground ? "none" : `0 0 1vw 1vw ${color === "white" ? `rgba(0,0,0,${opacity})` : `rgba(255,255,255,${opacity})`}`,
        textShadow: hasBackground ? "none" : `0 0 0.3vw ${color == "white" ? `rgba(0,0,0,${opacity + 0.3})` : `rgba(255,255,255,${opacity + 0.3})`}`,
        padding: hasBackground ? "0.2vw" : "0.7vw",
        borderRadius: "4vw",
        left: `${left}vw`,
        width: hasBackground ? `${width - 4}vw` : `${width}vw`,
        fontSize: fontSize, // Adjust font size as needed
    };

    const pageContainerStyle = {
        position: 'relative',
        width: 'calc(50vw )', // Adjust width as needed
        height: 'calc(50vw)', // Adjust height as needed
        marginBottom: '20px',
    };
    const [pageImage, setPageImage] = useState(img);

    useEffect(() => {
        if (!img) {
            loadImage(id, setPageImage);
        }
    }, [id, img]);

    const RenderedComponent = config.component;

    return (
        <div style={pageContainerStyle} ref={ref}>
            {pageImage && <img src={pageImage} alt={`Page ${id}`} style={{ width: '100%', height: 'auto' }} />}
            {hasBackground && <img src={textBoxImg} style={{ position: 'absolute', top: `${top - 0.5}vw`, left: `${left - 1.5}vw`, width: width + "vw", height: height + "vw", opacity: opacity }} />}
            <Text style={textStyle}>{text}</Text>
            {RenderedComponent && <RenderedComponent {...config.componentProps} />}
        </div>
    );
});



const saveAsImage = (pageRef, title) => {
    const scale = SAVE_SIZE;

    return new Promise((resolve, reject) => {
        domtoimage.toBlob(pageRef, {
            width: pageRef.clientWidth * scale,
            height: pageRef.clientHeight * scale,
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


const loadImage = async (id, setPageImage) => {
    try {
        const image = await import(`../images/starsBook/${id}.png`);
        setPageImage(image.default);
    } catch (pngError) {
        try {
            const image = await import(`../images/starsBook/${id}.jpg`);
            setPageImage(image.default);
        } catch (jpgError) {
            console.error(`Image for page ${id} not found in either .png or .jpg format`);
        }
    }
};



const Text = styled.p`
 
font-family:Comfortaa;
  @font-face {
    font-family: 'Comfortaa';
    font-style: normal;
    font-weight: 400;
    src: url(${Comfortaa}) format('woff2');
  }
  @font-face {
    font-family: 'AmaticSC';
    font-style: normal;
    font-weight: 400;
    src: url(${AmaticSC}) format('woff2');
  },

 
`;

export default StarsBook;
