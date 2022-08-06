const wordList = [
    {
        word: "football",
        hint: "sport"
    },
    {
        word: "badminton",
        hint: "sport"
    },
    {
        word: "basketball",
        hint: "sport"
    },
    {
        word: "volleyball",
        hint: "sport"
    },
    {
        word: "baseball",
        hint: "sport"
    },
    {
        word: "hockey",
        hint: "sport"
    },

    {
        word: "running",
        hint: "exercise"
    },
    {
        word: "gymnastic",
        hint: "exercise"
    },
    {
        word: "yoga",
        hint: "exercise"
    },

    {
        word: "lionel messi",
        hint: "footballer"
    },
    {
        word: "cristiano ronaldo",
        hint: "footballer"
    },
    {
        word: "neymar jr",
        hint: "footballer"
    },
    {
        word: "sergio ramos",
        hint: "footballer"
    },
    {
        word: "robert lewandowski",
        hint: "footballer"
    },
    {
        word: "zlatan ibrahimović",
        hint: "footballer"
    },
    {
        word: "eden hazard",
        hint: "footballer"
    },
    {
        word: "luka modric",
        hint: "footballer"
    },
    {
        word: "tony kroos",
        hint: "footballer"
    },
    {
        word: "luis suarez",
        hint: "footballer"
    },
    {
        word: "vinicius jr",
        hint: "footballer"
    },
    {
        word: "ousmane dembele",
        hint: "footballer"
    },
    {
        word: "marc-andre ter stegen",
        hint: "footballer"
    },
    {
        word: "mohamed salah",
        hint: "footballer"
    },
    {
        word: "thibaut courtois",
        hint: "footballer"
    },
    {
        word: "kevin de bruyne",
        hint: "footballer"
    },
    {
        word: "n'golo kante",
        hint: "footballer"
    },
    {
        word: "kylian mbappe",
        hint: "footballer"
    },

    {
        word: "computer",
        hint: "electronic device"
    },
    {
        word: "smartphone",
        hint: "electronic device"
    },
    {
        word: "television",
        hint: "electronic device"
    },
    {
        word: "headphones",
        hint: "electronic device"
    },
    {
        word: "speaker",
        hint: "electronic device"
    },

    {
        word: "dining table",
        hint: "furniture"
    },
    {
        word: "refrigerator",
        hint: "furniture"
    },
    {
        word: "cupboard",
        hint: "furniture"
    },
    {
        word: "sofa",
        hint: "furniture"
    },
    {
        word: "electric fan",
        hint: "furniture"
    },

    {
        word: "toilet",
        hint: "fixture"
    },
    {
        word: "bathtub",
        hint: "fixture"
    },
    {
        word: "ceiling light",
        hint: "fixture"
    },

    {
        word: "painting",
        hint: "decoration"
    },
    {
        word: "carpet",
        hint: "decoration"
    },

    {
        word: "truck",
        hint: "vehicle"
    },
    {
        word: "motorbike",
        hint: "vehicle"
    },
    {
        word: "bicycle",
        hint: "vehicle"
    },
    {
        word: "airplane",
        hint: "vehicle"
    },
    {
        word: "helicopter",
        hint: "vehicle"
    },
    {
        word: "submarine",
        hint: "vehicle"
    },

    {
        word: "squid",
        hint: "animal"
    },
    {
        word: "octopus",
        hint: "animal"
    },
    {
        word: "python",
        hint: "animal"
    },
    {
        word: "leopard",
        hint: "animal"
    },
    {
        word: "coyote",
        hint: "animal"
    },
    {
        word: "hippopotamus",
        hint: "animal"
    },
    {
        word: "rhinoceros",
        hint: "animal"
    },
    {
        word: "dinosaur",
        hint: "animal"
    },
    {
        word: "monkey",
        hint: "animal"
    },
    {
        word: "gorilla",
        hint: "animal"
    },
    {
        word: "orangutan",
        hint: "animal"
    },
    {
        word: "puffer fish",
        hint: "animal"
    },

    {
        word: "minecraft",
        hint: "game"
    },
    {
        word: "genshin impact",
        hint: "game"
    },
    {
        word: "roblox",
        hint: "game"
    },
    {
        word: "smash legends",
        hint: "game"
    },
    {
        word: "player unknown battleground",
        hint: "game"
    },
    {
        word: "among us",
        hint: "game"
    },
    {
        word: "candy crush saga",
        hint: "game"
    },
    {
        word: "plant vs zombie",
        hint: "game"
    },
    {
        word: "league of legends",
        hint: "game"
    },
    {
        word: "arena of valor",
        hint: "game"
    },
    {
        word: "fortnite",
        hint: "game"
    },

    {
        word: "water",
        hint: "liquid"
    },
    {
        word: "juice",
        hint: "liquid"
    },
    {
        word: "coffee",
        hint: "liquid"
    },
    {
        word: "tea",
        hint: "liquid"
    },
    {
        word: "soda",
        hint: "liquid"
    },

    {
        word: "apple",
        hint: "fruit"
    },
    {
        word: "banana",
        hint: "fruit"
    },
    {
        word: "coconut",
        hint: "fruit"
    },
    {
        word: "kiwi",
        hint: "fruit"
    },
    {
        word: "cherry",
        hint: "fruit"
    },

    {
        word: "one piece",
        hint: "anime"
    },
    {
        word: "naruto shippuden",
        hint: "anime"
    },
    {
        word: "kimetsu no yaiba",
        hint: "anime"
    },
    {
        word: "boku no hero academia",
        hint: "anime"
    },
    {
        word: "hunter x hunter",
        hint: "anime"
    },
    {
        word: "spy x family",
        hint: "anime"
    },
    {
        word: "dragon ball",
        hint: "anime"
    },
    {
        word: "attack on titan",
        hint: "anime"
    },
    {
        word: "detective conan",
        hint: "anime"
    },

    {
        word: "vietnam",
        hint: "country"
    },
    {
        word: "united state of america",
        hint: "country"
    },
    {
        word: "argentina",
        hint: "country"
    },
    {
        word: "united kingdom",
        hint: "country"
    },
    {
        word: "laos",
        hint: "country"
    },
    {
        word: "japan",
        hint: "country"
    },
    {
        word: "china",
        hint: "country"
    },
    {
        word: "russia",
        hint: "country"
    },
    {
        word: "spain",
        hint: "country"
    },
    {
        word: "united arab emirates",
        hint: "country"
    },
]

export default wordList;