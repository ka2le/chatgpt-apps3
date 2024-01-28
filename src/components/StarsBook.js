import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import styled from 'styled-components';
import img9 from '../images/starsBook/9.png';
import img10 from '../images/starsBook/10.png';
import img27 from '../images/starsBook/27.jpg';
import img28 from '../images/starsBook/28.jpg';
import textBoxImg from '../images/starsBook/textbox.png';
import Comfortaa from '../fonts/Comfortaa-VariableFont_wght.ttf';
import AmaticSC from '../fonts/AmaticSC-Bold.ttf';

const textData = [

    { "id": 1, "text": "Tänk dig en ballong lika stor som hela huset, som smäller. Pang! Fast ännu större! Så började allt! En hög smäll! Boom! Allt som finns hamnade överallt. Som när Någon tappar blåbärsgröten och det målar hela köksgolvet blått. Fast ingen behöver städa." },
    { "id": 2, "text": "" },
    { "id": 3, "text": "För stjärnstoftet ska va där. Det är fint och färgglatt. Glittrande som den bästa snurrkjolen. Sen började alla små stjärnstoft samlas. Stora dansande snurrande ringar som blev galaxer." },
    { "id": 4, "text": "" },
    { "id": 5, "text": "I galaxerna kom megamånga stjärnor. Stjärnstoft som höll hand, hårt. Dom blev stora och varma bollar. Varmare än stekpannan." },
    { "id": 6, "text": "Och stjärnbollarna började lysa starkt. Ljusare än taklampan när du vill sova. “Släck lampan” ropar du! “Nej, tänt ska det va” säger jag. Så blinkar stjärnorna över hela rymden" },
    { "id": 7, "text": "\"Det här är Solen. Vår egen fina stjärna. Runt Solen snurrar vår planet, Jorden, och flera andra planeter. [Merkurius, Venus, Jorden, Mars, Jupiter, Saturnus, Uranus och Neptunus] Solen lyser upp planeterna och värmer oss." },
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
    { "id": 22, "text": "Månen är som en magiskt värld. Fylld med vit sand och många stenar och stora gropar som kallas för kratrar. Ibland ser ju månen ut som en boll, ibland ser den halv ut. Men den är alltid rund. Det mörka är jordens skugga på månen. Precis som din skugga kan göra marken mörk." },
    { "id": 23, "text": "Det här är planeten Venus. Dit har ingen människa åkt än. Där finns det gula moln som luktar prutt. Det är så varmt på Venus, att glassar smälter direkt. Snabbare än på sommaren. Kladdigt va?" },
    { "id": 24, "text": "Mars är en annan planet som ingen åkt till än. Där är det lite kallare. Fullt med röd sand och berg. Massa plats att bygga nya städer på, nya lekplatser kanske. Mars är lite som månen, det går att hoppa högt och lyfta tungt. Vart skulle du vilja åka och vad skulle du packa med dig?" },
    { "id": 25, "text": "Långt ut i rymden, på planeter som snurrar runt andra stjärnor så kanske det finns rymdvarelser. Kanske har dom många huvuden och kan flyga utan vingar. Kanske älskar dom att leka kurragömma. Ingen vet, för ingen har kunnat åka så långt än. Då måste vi uppfinna större och snabbare raketer i framtiden." },
    { "id": 26, "text": "" },
    { "id": 27, "text": "Uppe i rymden finns hela universum. Alla andra planeter som snurrar runt andra stjärnor och helt andra galaxer. Det är spännande att fantisera om allt som finns där uppe. Kanske är det du som uppfinner nya raketer och åker på rymdäventyr. Säger hej till alla rymdvarelser och vinkar godnatt till de blinkande stjärnorna." },
    { "id": 28, "text": "" }


];

// Define default constants
const DEFAULT_TEXT_COLOR = 'white';
const DEFAULT_TOP = 5;
const DEFAULT_LEFT = 5;
const DEFAULT_HAS_BACKGROUND = false;
const DEFAULT_FONT_SIZE = '16px';
const DEFAULT_TEXT_WIDTH = 60;
const TEXT_SHADOW_OPACITY = 0.1;

// Text data for each page


// Configuration data for each page
const configData = [
    { id: 1,  hasBackground: true, width:80 },
    { id: 2, },
    { id: 3, top:80,left:30, hasBackground:true},
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11, color: 'black', top: 1, },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15,color:"black" },
    { id: 16,color:"black" },
    { id: 17,hasBackground:true,left:10},
    { id: 18, top:80,left:32, width:65 },
    { id: 19,color:'black'},
    { id: 20, top: 1,left:63,width:35},
    { id: 21,top:80, left:20},
    { id: 22, top: 1,},
    { id: 23, color: 'black'},
    { id: 24 },
    { id: 25 },
    { id: 26 },
    { id: 27 },
    { id: 28 },

];

const StarsBook = () => {

    return (
        <Grid container spacing={0} style={{ background: 'white', height: '100%', margin: 0, padding: 0, fontFamily: Comfortaa }}>
            {configData.map((config) => {
                const pageText = textData.find(text => text.id === config.id)?.text || '';
                return <BookPage key={config.id} text={pageText ?? ""} config={config} />;
            })}
        </Grid>
    );
};


const BookPage = ({ text, config }) => {
    const {
        id,
        top = DEFAULT_TOP,
        left = DEFAULT_LEFT,
        color = DEFAULT_TEXT_COLOR,
        width = DEFAULT_TEXT_WIDTH,
        hasBackground = DEFAULT_HAS_BACKGROUND,
        img
    } = config;

    const textStyle = {
        position: 'absolute',
        color: hasBackground ? "white": color,
        top: `${top}%`,
        backgroundColor: hasBackground ? "transparent" : color =="white" ? "rgba(0,0,0,"+TEXT_SHADOW_OPACITY+")" : "rgba(255,255,255,"+TEXT_SHADOW_OPACITY+")",
        padding:"1%",
        borderRadius: "20%",
        left: `${left}%`,
        width: `${width}%`,
        fontSize: DEFAULT_FONT_SIZE, // Adjust font size as needed
    };

    const pageContainerStyle = {
        position: 'relative',
        width: '50%', // Adjust width as needed
        height: 'auto', // Adjust height as needed
    };
    const [pageImage, setPageImage] = useState(img);

    useEffect(() => {
        if (!img) {
            loadImage(id, setPageImage);
        }
    }, [id, img]);

    return (
        <div style={pageContainerStyle}>
            {pageImage && <img src={pageImage} alt={`Page ${id}`} style={{ width: '100%', height: 'auto' }} />}
            {hasBackground && <img src={textBoxImg} style={{ position: 'absolute', top: `${top - 6}%`, left: `${left - 15}%`, width: width*1.4+"%", height: "30%", opacity: "0.8" }} />}
            <Text style={textStyle}>{text}</Text>
        </div>
    );
};


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
 
font-family:AmaticSC;
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
