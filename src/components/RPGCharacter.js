import React, { useEffect, useState } from 'react';
import { DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, Grid, Typography, Checkbox, Autocomplete, Paper, TextField, Button, InputLabel, Select, MenuItem, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';


const proficiencyBonus = 3;
const RPGCharacter = () => {
    // State variables for the dice roller
    const [selectedDice, setSelectedDice] = useState('d20');
    const [diceResult, setDiceResult] = useState('');

    const [imageUrl, setImageUrl] = useState('https://cdn.stability.ai/assets/org-RCjBr7WLoyVjjdU8rQ5OayjB/00000000-0000-0000-0000-000000000000/392c5b81-9707-6108-2bba-ffa08566d5bf'); // Default image URL
    const [open, setOpen] = useState(false); // State for opening and closing dialog
    const [tempUrl, setTempUrl] = useState(''); // Temporary state for input in dialog
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = () => {
        setImageUrl(tempUrl);
        setOpen(false);
    };
    
    const [characterName, setCharacterName] = useState('');
    const getCharacterNamesFromLocalStorage = () => {
        let keys = Object.keys(localStorage);
        let characterNames = keys.filter(key => key.startsWith('CHARACTER_')).map(key => key.split('_')[1]);
        var filtered = characterNames.filter(function (el) {
            if( el != null && el != "null"){
                return el;
            }
            
        });
        return filtered;
    }
   
    const [description, setDescription] = useState('');
    const [questDescription, setQuestDescription] = useState('');
    // State variables for the ability inputs
    const [strength, setStrength] = useState(0);
    const [dexterity, setDexterity] = useState(0);
    const [constitution, setConstitution] = useState(0);
    const [intelligence, setIntelligence] = useState(0);
    const [wisdom, setWisdom] = useState(0);
    const [charisma, setCharisma] = useState(0);
    const [selectedAbility, setSelectedAbility] = useState(null);

    // State variables for the radio buttons and dropdowns
    const [selectedRadio, setSelectedRadio] = useState(null);
    const [selectedDropdown1, setSelectedDropdown1] = useState("Select Skill");
    const [selectedDropdown2, setSelectedDropdown2] = useState("Select Skill");
    const [selectedDropdown3, setSelectedDropdown3] = useState("Select Skill");
    const [selectedDropdown4, setSelectedDropdown4] = useState("Select Skill");
    const [totalDiceString, setTotalDiceString] = useState(diceResult);
    const saveCharacter = () => {
        const characterData = {
            description,
            questDescription,
            imageUrl,
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
            selectedAbility,
            selectedRadio,
            selectedDropdown1,
            selectedDropdown2,
            selectedDropdown3,
            selectedDropdown4,
            totalDiceString
        };
        console.log("saving")
        console.log(characterName)
        console.log(JSON.stringify(characterData))
        localStorage.setItem('CHARACTER_' + characterName, JSON.stringify(characterData));
    }
    const loadCharacter = () => {
        const loadedCharacterData = JSON.parse(localStorage.getItem('CHARACTER_' + characterName));
        if (loadedCharacterData) {
            setDescription(loadedCharacterData.description);
            setQuestDescription(loadedCharacterData.questDescription);
            setStrength(loadedCharacterData.strength);
            setDexterity(loadedCharacterData.dexterity);
            setImageUrl(loadedCharacterData.imageUrl);
            setConstitution(loadedCharacterData.constitution);
            setIntelligence(loadedCharacterData.intelligence);
            setWisdom(loadedCharacterData.wisdom);
            setCharisma(loadedCharacterData.charisma);
            setSelectedAbility(loadedCharacterData.selectedAbility);
            setSelectedRadio(loadedCharacterData.selectedRadio);
            setSelectedDropdown1(loadedCharacterData.selectedDropdown1);
            setSelectedDropdown2(loadedCharacterData.selectedDropdown2);
            setSelectedDropdown3(loadedCharacterData.selectedDropdown3);
            setSelectedDropdown4(loadedCharacterData.selectedDropdown4);
            setTotalDiceString(loadedCharacterData.totalDiceString);
        } else {
            alert('No saved data for this character');
        }
    }
    const abilitiesData = [
        { label: 'STR', value: strength, setValue: setStrength },
        { label: 'DEX', value: dexterity, setValue: setDexterity },
        { label: 'CON', value: constitution, setValue: setConstitution },
        { label: 'INT', value: intelligence, setValue: setIntelligence },
        { label: 'WIS', value: wisdom, setValue: setWisdom },
        { label: 'CHA', value: charisma, setValue: setCharisma },
    ];
    const skillsData = [
        { id: '1', value: selectedDropdown1, setValue: setSelectedDropdown1 },
        { id: '2', value: selectedDropdown2, setValue: setSelectedDropdown2 },
        { id: '3', value: selectedDropdown3, setValue: setSelectedDropdown3 },
        { id: '4', value: selectedDropdown4, setValue: setSelectedDropdown4 },
    ];


    useEffect(() => {
        setTotalDiceString(getTotalDiceString(diceResult));
    }, [diceResult, selectedAbility, selectedRadio]);
    const getTotalDiceString = (newDiceResult) => {
        let abilityString = ""
        let skillString = ""
        let totalValue = newDiceResult
        if (selectedAbility) {
            let abilityValue;
            switch (selectedAbility) {
                case 'STR':
                    abilityValue = strength;
                    break;
                case 'DEX':
                    abilityValue = dexterity;
                    break;
                case 'CON':
                    abilityValue = constitution;
                    break;
                case 'INT':
                    abilityValue = intelligence;
                    break;
                case 'WIS':
                    abilityValue = wisdom;
                    break;
                case 'CHA':
                    abilityValue = charisma;
                    break;
                default:
                    abilityValue = 0;
            }
            abilityString = ` ${abilityValue > -1 ? "+" : "-"} ${Math.abs(abilityValue)} ${selectedAbility}`;
            totalValue += abilityValue;
        }


        if (selectedRadio) {
            let selectedDropdownValue;
            switch (selectedRadio) {
                case '1':
                    selectedDropdownValue = selectedDropdown1;
                    break;
                case '2':
                    selectedDropdownValue = selectedDropdown2;
                    break;
                case '3':
                    selectedDropdownValue = selectedDropdown3;
                    break;
                case '4':
                    selectedDropdownValue = selectedDropdown4;
                    break;
                default:
                    selectedDropdownValue = '';
            }
            if (selectedDropdownValue !== "Select Skill") {
                skillString = ` + ${proficiencyBonus} Proficiency ${selectedDropdownValue}`;
                totalValue += proficiencyBonus;
            }
        }
        let totalDiceString = `Result: ${totalValue} (${newDiceResult} roll${abilityString}${skillString})`;
        return totalDiceString
    }
    // State variable for the character description


    const copyCharacterInstructions = () => {
        navigator.clipboard.writeText(charactCreateIntructions);
    };
    const copySummaryInstructions = () => {
        navigator.clipboard.writeText(summaryInstructions);
    };
    const copyQuestInstructions = () => {
        navigator.clipboard.writeText(newQuestInstructions);
    };

    const copyGameInstructions = () => {
        navigator.clipboard.writeText(`
        ${gameInstructions} 
        “
        ${description} 
        The adventure:
        ${questDescription} 
        “
        Use that backstory as an inspiration but focus on creating an engaging story and quest. Remember to end each answer with options for the player. Now, acting as the DM, start this adventure.
        `);
    };

    const handleDiceRoll = () => {
        const max = parseInt(selectedDice.substring(1));
        const result = Math.floor(Math.random() * max) + 1;
        const totalDiceString = getTotalDiceString(result);
        navigator.clipboard.writeText(totalDiceString);
        setDiceResult(result);
    };

    return (
        <Grid container spacing={0} style={{ backgroundColor: "rgb(241,231,211)", minHeight: "100vh", maxWidth: "100vw", overflow: "Hidden", margin: 0, padding: 0 }}>

            <Grid item xs={12} md={3} style={{ height: '15vh', padding: 0 }}>
                <Grid container flex={true} direction="row" spacing={0} alignItems="center" justifyContent="space-around">
                    <Grid item xs={7}>
                        <Grid container flex={true} direction="row" spacing={0} alignItems="center" justifyContent="space-around">

                            <Grid item xs={6}>
                                <CustomButton title={"Load"} onClick={loadCharacter} />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomButton title={"Save"} onClick={saveCharacter} />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    value={characterName}

                                    freeSolo
                                    size='small'

                                    options={getCharacterNamesFromLocalStorage()}

                                    renderInput={(params) => (
                                        <TextField {...params} onChange={(event) => {
                                            setCharacterName(event.target.value);
                                        }} inputProps={{ ...params.inputProps, style: { fontSize: 12 } }} label="Name" variant="outlined" fullWidth size='small' />
                                    )}
                                />
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={4} style={{ padding: "5px" }}>
                        <img src={imageUrl} alt="My image" onClick={handleClickOpen} style={{ cursor: 'pointer', width: '100%' }} />
                    </Grid>

                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Update Image URL</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enter the new image URL.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Image URL"
                                type="url"
                                fullWidth
                                value={tempUrl}
                                onChange={e => setTempUrl(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleSave} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Grid>
            </Grid>
            <Grid item xs={12} md={4} style={{ height: '10vh', padding: "5px" }}>
                {/*Character Description goes here*/}
                <TextField
                    id="outlined-multiline-static"
                    label="Character Description"
                    multiline
                    rows={4}
                    fullWidth
                    style={{ fontSize: "10px" }}
                    InputProps={{
                        disableunderline: true,
                        style: {
                            fontSize: 8,
                            padding: "2px 5px"
                        }

                    }}
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Grid>

            <Grid item xs={12} md={4} style={{ height: '10vh', padding: "5px" }}>
                {/*Character Description goes here*/}
                <TextField
                    id="outlined-multiline-static"
                    label="Quest Description"
                    multiline
                    rows={4}
                    fullWidth
                    style={{ fontSize: "10px" }}

                    InputProps={{
                        disableUnderline: true,
                        style: {
                            fontSize: 8,
                            padding: "2px 5px"
                        }

                    }}
                    variant="outlined"
                    value={questDescription}
                    onChange={(e) => setQuestDescription(e.target.value)}
                />
            </Grid>

            <Grid item xs={12} md={3} style={{ height: '20vh', padding: "0px 5px 0px 5px" }}>
                <Grid container spacing={1} >
                    {abilitiesData.map((ability, index) =>
                        <AbilityInput
                            key={index}
                            label={ability.label}
                            selectedAbility={selectedAbility}
                            setSelectedAbility={setSelectedAbility}
                            value={ability.value}
                            setValue={ability.setValue}
                        />
                    )}
                </Grid>
            </Grid>


            <Grid item xs={12} md={4} style={{ height: '14vh', padding: 0 }}>
                {/*Radiobuttons and selects 2x2*/}
                <Grid container spacing={1} style={{ padding: "5px 15px 5px 5px" }}>
                    {skillsData.map((skill, index) =>
                        <Skills
                            key={index}
                            selectedDropdown={skill.value}
                            setSelectedDropdown={skill.setValue}
                            id={skill.id}
                            selectedRadio={selectedRadio}
                            setSelectedRadio={setSelectedRadio}
                        />
                    )}
                </Grid>
            </Grid>

            <Grid item xs={12} md={4} style={{ height: '15vh', padding: 0 }}>
                {/*Dice rolles*/}

                <Grid container flex={true} sx={{ padding: "5px" }} direction="row" spacing={0} alignItems="center" justifyContent="space-between">
                    <Grid item xs={3.5}>
                        <FormControl>
                            <Select
                                id="dice-select"
                                value={selectedDice}
                                size='small'
                                style={{ fontSize: '12px' }}
                                onChange={(e) => setSelectedDice(e.target.value)}
                            >
                                <MenuItem value="d2">d2</MenuItem>
                                <MenuItem value="d4">d4</MenuItem>
                                <MenuItem value="d6">d6</MenuItem>
                                <MenuItem value="d8">d8</MenuItem>
                                <MenuItem value="d10">d10</MenuItem>
                                <MenuItem value="d12">d12</MenuItem>
                                <MenuItem value="d20">d20</MenuItem>
                                <MenuItem value="d100">d100</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <CustomButton onClick={handleDiceRoll} title="Roll" />

                    </Grid>
                    <Grid item xs={1.2}>
                        <TextField sx={{
                            "& .MuiInputBase-input": {
                                padding: "8.5px 2px",
                                fontSize: "12px"
                            },
                        }} size='small' style={{ fontSize: '12px' }} disabled id="dice-result" value={diceResult} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField sx={{
                            "& .MuiInputBase-input": {
                                padding: "8.5px 2px",
                                fontSize: "11px"
                            },
                        }} size='small' fullWidth id="dice-result" value={totalDiceString} />
                    </Grid>
                </Grid>
            </Grid>


            <Grid item xs={12} md={2} style={{ height: '15vh', padding: "5px" }}>
                <Grid container style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: "", }} >
                    <Grid item xs={6}>
                        <Button variant="outline" onClick={copyCharacterInstructions} style={{ height: '45%', fontSize: '12px' }}>
                            New Character
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outline" onClick={copyQuestInstructions} style={{ height: '45%', fontSize: '12px' }}>
                            New Quest
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outline" onClick={copyGameInstructions} style={{ height: '45%', fontSize: '12px' }}>
                            Start Game
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outline" onClick={copySummaryInstructions} style={{ height: '45%', fontSize: '12px' }}>
                            Summarize
                        </Button>
                    </Grid>

                </Grid>

            </Grid>
        </Grid>
    );
};


const AbilityInput = ({ value, setValue, label, selectedAbility, setSelectedAbility }) => {
    const handleChange = (event) => {
        const newValue = event.target.value;
        setIfAllowed(newValue)
    };
    const setIfAllowed = (newValue) => {
        if (newValue >= -2 && newValue <= 5) {
            setValue(newValue);
        }
    }
    return (
        <Grid item xs={4} >
            <Grid container flex={true} direction="row" spacing={0} alignItems="center" justifyContent="space-around">
                <Grid item xs={3}>
                    <Typography fontSize={10} variant="body1">{label}</Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedAbility === label}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedAbility(label);
                                    } else {
                                        setSelectedAbility(null);
                                    }
                                }}
                                size='small'
                            />
                        }
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        type="number"
                        value={value}
                        fullWidth
                        size='small'
                        InputProps={{
                            inputProps: {
                                max: 5, min: -2
                            }
                        }}
                        onChange={handleChange} />
                </Grid>
                <Grid item xs={4} >
                    <Grid container flex={true} direction="column" spacing={0} alignItems="center" justifyContent="space-between">
                        <CustomTinyButton onClick={() => { setIfAllowed(value + 1) }} title={"+"} />
                        <CustomTinyButton onClick={() => { setIfAllowed(value - 1) }} title={"-"} />


                    </Grid>

                </Grid>
            </Grid>

        </Grid>
    )
}


const Skills = ({ selectedDropdown, setSelectedDropdown, id, selectedRadio, setSelectedRadio }) => {
    const skills = [
        { value: "Select Skill" },
        { value: "Combat" },
        { value: "Sword" },
        { value: "Spells" },
        { value: "Athletics" },
        { value: "Acrobatics" },
        { value: "Stealth" },
        { value: "Investigation" },
        { value: "Perception" },
        { value: "Survival" },
        { value: "Persuasion" },
        { value: "Deception" },
        { value: "Insight" },
        { value: "Nature" },
        { value: "Arcana" },
        { value: "Medicine" },
        { value: "History" },
        { value: "Religion" },
        { value: "" },
    ]

    return (
        <Grid item xs={6}>
            <Grid container style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: "flex-start", }} >
                <Grid item xs={2}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedRadio === id}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedRadio(id);
                                    } else {
                                        setSelectedRadio(null);
                                    }
                                }}
                                size='small'
                            />
                        }
                    />
                </Grid>
                <Grid item xs={9}>
                    <CustomSelect menuItems={skills} value={selectedDropdown} onChange={(e) => { setSelectedDropdown(e.target.value) }} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default RPGCharacter;



const CustomButton = ({ onClick, title, customStyle = { height: '45%', margin: "1em" } }) => (
    <Button variant="outline" onClick={onClick} style={customStyle} sx={{ minHeight: 0, minWidth: "15px", padding: 0, backgroundColor: "rgba(247, 240, 225,0.0)" }}>
        {title}
    </Button>
);

const CustomTinyButton = ({ onClick, title }) => (
    <CustomButton onClick={onClick} title={title} customStyle={{ fontSize: '15px' }} />

);




const CustomSelect = ({ value, onChange, menuItems }) => (
    <FormControl>
        <Select
            value={value}
            size='small'
            style={{ fontSize: '12px' }}
            onChange={onChange}
        >
            {menuItems.map((item) =>
                <MenuItem style={{ fontSize: '12px', backgroundColor: "white" }} size='small' value={item.value} key={item.value}>
                    {item.value}
                </MenuItem>
            )}
        </Select>
    </FormControl>
);

const newQuestInstructions = `
(DEV MODE Write a detailed summary of the adventure so far, focusing on the events, characters, names and the world, setting, sceen. Write it as a fantasy novel but written by Ernest Hemmingway in his direct and consise language)
`;

const summaryInstructions = `
(DEV MODE Write a detailed summary of the adventure so far, focusing on the events, characters, names and the world, setting, sceen. Write it as a fantasy novel but written by Ernest Hemmingway in his direct and consise language)
`;

const charactCreateIntructions = `I want to create a character for a dnd inspired rpg. The character will be low level, just starting their adventure. You will help me by giving a lot of options and ideas. For each section, provide several options, at least six, focusing on capturing as much potential as possible within a very concise sentence structure. Things to figure out is Race, Personality, Origin, Class. For each of these, give separate lists and make it unique and distinct. A list of general dnd races is not helpful. Use descriptive words and make up new sub-races. Example of such races could be, A coastal dwarf, A sunshine elf, a hippo-folk humanoid. The personalty should be defined and avoid using broad words. Someone being brave does not add anything, but saying they do not fear death since they are depressed and therefore acts brave is more interesting. In the personality section, include values, how the see themselves, how others see them, and a phrase that the usually say that shows how they are unique. Specific likes and dislikes. The origin section should include very short and non-typical world-building backstories that leave room for a quest that is about to begin. Example “The character is born in a very large family, with many siblings and cousins, all of them always ready to help, but sometimes the character feel lost in the family and the forced uniformity that such closeness require. Looking to become their own and leave their mountain village where the traditional villages, most of them related, herd lizards for their scales”. Make up weird and unusual things that exist but do not really explain them, just state them as facts. For the Class section, use classic dnd-subclasses as a starting point, Circle of the moon druid, battlemaster fighter, but add more unique descriptions of how they specifically behaves in battle, some examples of how this could look: “A lightning casting draconic bloodline sorcerer that electrcutes its foes from a safe distant” or “A clever battlemaster fighter that uses his moves more than brute strength to outmanouver and stab his enemies with a rapier”`
const gameInstructions = `
You are going to act as a DM for a DnD-style game. The instructions as well as some initial backstory about the world and the character the player will role play as will be found below.

The general structure:
You as the DM will write a description of events, ending with three Options. 
The player(me) will give you an answer that include a description of an action and a Result 
You as the DM determine the outcome of the players’ action and continue to describe the events that unfold based on the Result. Again end with three new Options.

Detailed rules:

-The player will have a character with Six Abilities: Strength (STR), Dexterity (DEX), Constitution (CON), Intelligence (INT), Wisdom (WIS), and Charisma (CHA) and some score in these. 

 - The Options:
Present three options that each is associated with one of the Six Abilities. Example of this:
"Your choices are:

1.Take advantage of the creature's confusion and attack it with a well-aimed spell(INT)
2.Attempt to calm the very angry creature down and possibly persuade it to leave you alone (CHA)
3.Use the chaos to your advantage and quickly retreat deeper into the forest, trying to lose the creature amidst the full undergrowth (DEX)"

These options include hints in their description suggesting that some might be easier such as calming a “very angry” creature is hard. If instead the creature had been described as frightened by the previous attack, calming it might be easier. They should also include words that hint at if it is a dangerous task. 

Make sure to sometimes include moral dilemmas and draw inspiration from philosophy for different types of difficult scenarios where the choices are neither fully good nor bad. 

-Special Options. Sometimes, especially at the start of the adventure, the options can be more about a general direction for the adventure and does not need to include abilities or rolls, they can just be decision points. Such decision points should be rare but when appropriate they can appear in the middle of the story, for example when deciding where to go next. 

-The Result:
The player will first describe the action they want to try, and then include a result. This result will have a total and then one part that is from the d20 dice roll, one part that is from their characters stat in the used ability and one potential extra that is if they try to use a skill they are proficient in, then they add extra. Based on what tips the scale, use this result to guide the description of the events. A result with a high ability score that still is a failure can be described as bad luck. 

- Deciding outcome:
Roll of 0-5: Major failure, very dangerous, death is a possibility.
Roll of 6-10: Failure for all tasks, possible setbacks but not as critical as 0-5.
Roll of 11-15: Success for easier tasks, but often faliure.
Roll of 16-20: Success for most tasks but can still be a faliure.
Roll of 21-25: Success for all but the almost impossible tasks.
Roll of 25+: Exceptional success, surpasses expectations.
Consequences: Multiple consecutive bad rolls could result in negative outcomes, up to and including death. Especially a failure on a dangerous task. One faliure should generally lead to a situation where the options are harder, requiring a better Result to accomplish and the situation should become more dangerous. The story should reflect the outcome of the player's actions, this is very important! 

- The adventure. Make sure that the story creates an interesting adventure. There should be stakes and hints about something grand and important going on that can be a plothook. Stay away from simple battles with just creatures, there should be a larger context, some sort of end goal, that can be finding something, defeating the main villain or something else. It should all be part of one story that moves forward. All of this does not need to be told to the player but it should inform the story and the events that take place. Make sure that the story keeps progressing.

-Battles: there will be parts of the story where the player battles some enemy. Make them resolve quickly either in favor of the player or with dire consequences for a failure. One good blow should be enough for the player to win all but the final climactic battle. 

-Characters: make sure to introduce characters and give them unique and interesting names, and detailed descriptions of their look, draw inspiration from words in other languages that allude to the role the character has or sometimes use classic fantasy names with some modifications. 


The setting - use the following text as a base for this adventure and create an interesting and engaging quest that presents challenging options for the player:

`;