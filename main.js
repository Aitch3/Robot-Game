$(document).ready(function () {
    'use strict';
	$('#statusBar').click(function () {
		$(this).fadeOut('slow');
	});
});

(function (window, $) {
	'use strict';

	var $div = $('div');

	function byeBye() {
		$(this).fadeOut('slow');
	}

	$div.on('click', byeBye);

})(window, $);

'use strict';

//Yourself
var finderbot = {
    name: "finderbot",
    title: "Finderbot",
    broken: 0,
    gearFind: 0.02,
    scrapMetalFind: 0.05,
    dreamHave: 0.02002,
    specialFind: 0.0301
};

//Robots
var scrapbot = {
    name: "scrapbot",
    title: "Scrapbot",
    found: 0,
    broken: 0,
    fixCostGears: 1,
    fixCostScrapMetal: 2,
    scrapMetalFind: 0.05,
    concreteFind: 0.002,
    batterySlots: 2,
    batteryCharge: 200,
    currentPower: 0
};

var grinder = {
    name: "grinder",
    title: "Grinder",
    found: 0,
    broken: 0,
    fixCostGears: 3,
    fixCostScrapMetal: 3,
    gearMake: 0.05,
    scrapMetalUse: 0.02,
    batterySlots: 2,
    batteryCharge: 300,
    currentPower: 0
};

var constructo = {
    name: "constructo",
    title: "Constructo",
    found: 0,
    broken: 0,
    fixCostGears: 5,
    fixCostScrapMetal: 4,
    girderMake: 0.05,
    scrapMetalUse: 0.2,
    concreteMake: 0.1,
    batterySlots: 3,
    batteryCharge: 250,
    currentPower: 0
};

//Buildings
var windmill = {
    name: "windmill",
    title: "Windmill",
    amount: 0,
    batteryChargeRate: 0.005,
    batteryCharge: 0,
    costGears: 2,
    costScrapMetal: 5,
    costIncrement: 1.3,
    landCost: 0
};

var pumpjack = {
    name: "pumpjack",
    title: "Pumpjack",
    amount: 0,
    oilProduce: 0.02,
    costGears: 2,
    costScrapMetal: 5,
    costConcrete: 2,
    costIncrement: 1.3,
    landCost: 1
};

//Resources
var batteries = {
    charged: 5,
    dead: 0
};
var gears = 50;
var scrapMetal = 100;
var concrete = 0;
var girder = 0;
var oil = 0;
var dreams = 0.998;

//Land
var land = {
    ruins: 5,
    wastes: 2,
    clear: 0
};

//Time
var min = 0;
var hour = 0;
var day = 1;
var year = 0;

//Techs
var robofriends = {
    bought: 0,
    costDreams: 1
};
var electricSheep = {
    bought: 0,
    costDreams: 5
};

//Discoveries
var dog = {
    found: 0,
    foodCost: 1,
    happy: 0
};

var toaster = {
    name: "toaster",
    title: "Toaster",
    found: 0,
    flying: 0,
    happy: 0
};

//Misc
var specialCount = 0.95;
var gameState = "production";
var quest = 0;
var questDuration = 0;
var setThing = {
    on: 0,
    scrapbot: 0
};

//Tools
function prettify(input) {
    var output = Math.round(input * 1000000) / 1000000;
	return output.toFixed(1);
}

function prettifyWhole(input) {
    var output = Math.round(input * 1000000) / 1000000;
	return output.toFixed(0);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Updates
function makeVisible() {
    if (dreams >= 1) {
        document.getElementById('tech').style.visibility = "visible";
    }
    if (dreams >= 5) {
        document.getElementById('electricSheepBuy').style.visibility = "visible";
    }
    if (robofriends.bought === 1 && scrapbot.found === 1) {
        document.getElementById('scrapbot').style.visibility = "visible";
    }
    if ((grinder.found + grinder.broken) >= 1) {
        document.getElementById('grinder').style.visibility = "visible";
    }
    if ((constructo.found + constructo.broken) >= 1) {
        document.getElementById('constructo').style.visibility = "visible";
    }
    if (dog.found === 1 || toaster.found === 1) {
        document.getElementById('discoveries').style.visibility = "visible";
         document.getElementById('statusBar').style.visibility = "visible"
    }
    if (dog.found === 1) {
        document.getElementById('dog').style.visibility = "visible";
    }
    if (toaster.found === 1) {
        document.getElementById('toaster').style.visibility = "visible";
    }
    if (dreams >= 3 || land.ruins >= 1) {
        document.getElementById('land').style.visibility = "visible";
    }
    if (concrete >= 1) {
        document.getElementById('concrete').style.visibility = "visible";
    }
    if (girder >= 1) {
        document.getElementById('girder').style.visibility = "visible";
    }
    if (oil >= 1) {
        document.getElementById('oil').style.visibility = "visible";
    }
    if (concrete >= 2 && land.clear >= 1) {
        document.getElementById('pumpjack').style.visibility = "visible";
    }
}

function updateRobots() {
    
}

function updateTime() {
    document.getElementById('hour').innerHTML = prettifyWhole(hour);
    document.getElementById('day').innerHTML = prettifyWhole(day);
    document.getElementById('year').innerHTML = prettifyWhole(year);
}

function updateResources() {
    document.getElementById('scrapbotCurrentPower').innerHTML = scrapbot.currentPower;
    document.getElementById('grinderCurrentPower').innerHTML = grinder.currentPower;
    document.getElementById('constructoCurrentPower').innerHTML = constructo.currentPower;
    document.getElementById('batteriesCharged').innerHTML = prettifyWhole(batteries.charged);
    document.getElementById('batteriesDead').innerHTML = prettifyWhole(batteries.dead);
    document.getElementById('gearsAmount').innerHTML = prettifyWhole(gears);
    document.getElementById('scrapMetalAmount').innerHTML = prettifyWhole(scrapMetal);
    document.getElementById('concreteAmount').innerHTML = prettifyWhole(concrete);
    document.getElementById('girderAmount').innerHTML = prettifyWhole(girder);
    document.getElementById('oilAmount').innerHTML = prettifyWhole(oil);
    document.getElementById('dreams').innerHTML = prettifyWhole(dreams);
}

function updateBuildings() {
    document.getElementById('windmillAmount').innerHTML = windmill.amount;
    document.getElementById('windmillCostGears').innerHTML = prettifyWhole(windmill.costGears);
    document.getElementById('windmillCostScrapMetal').innerHTML = prettifyWhole(windmill.costScrapMetal);
    document.getElementById('pumpjackAmount').innerHTML = pumpjack.amount;
    document.getElementById('pumpjackCostGears').innerHTML = prettifyWhole(pumpjack.costGears);
    document.getElementById('pumpjackCostScrapMetal').innerHTML = prettifyWhole(pumpjack.costScrapMetal);
    document.getElementById('pumpjackCostConcrete').innerHTML = prettifyWhole(pumpjack.costConcrete);
}

function updateLand() {
    document.getElementById('ruins').innerHTML = land.ruins;
    document.getElementById('wastes').innerHTML = land.wastes;
    document.getElementById('clear').innerHTML = land.clear;
}

function updateButtons() {
    if ((scrapbot.currentPower <= ((scrapbot.batterySlots - 1) * scrapbot.batteryCharge)) && batteries.charged >= 1) {
        document.getElementById('scrapbotBatteryReplace').disabled = false;
    } else {
        document.getElementById('scrapbotBatteryReplace').disabled = true;
    }
    if ((grinder.currentPower <= ((grinder.batterySlots - 1) * grinder.batteryCharge)) && batteries.charged >= 1) {
        document.getElementById('grinderBatteryReplace').disabled = false;
    } else {
        document.getElementById('grinderBatteryReplace').disabled = true;
    }
    if ((constructo.currentPower <= ((constructo.batterySlots - 1) * constructo.batteryCharge)) && batteries.charged >= 1) {
        document.getElementById('constructoBatteryReplace').disabled = false;
    } else {
        document.getElementById('constructoBatteryReplace').disabled = true;
    }
    if (windmill.costGears <= gears && windmill.costScrapMetal <= scrapMetal) {
        document.getElementById('buildWindmill').disabled = false;
    } else {
        document.getElementById('buildWindmill').disabled = true;
    }
    if (pumpjack.costGears <= gears && pumpjack.costScrapMetal <= scrapMetal && pumpjack.costConcrete <= concrete && land.clear >= 1) {
        document.getElementById('buildPumpjack').disabled = false;
    } else {
        document.getElementById('buildPumpjack').disabled = true;
    }
    if (robofriends.costDreams <= dreams && robofriends.bought === 0) {
        document.getElementById('robofriendsBuy').disabled = false;
    } else {
        document.getElementById('robofriendsBuy').disabled = true;
    }
    if (electricSheep.costDreams <= dreams && electricSheep.bought === 0) {
        document.getElementById('electricSheepBuy').disabled = false;
    } else {
        document.getElementById('electricSheepBuy').disabled = true;
    }
    if (land.ruins < 1) {
        document.getElementById('clearRuins').disabled = true;
    } else {
        document.getElementById('clearRuins').disabled = false;
    }
    
}

function updateAll() {
    updateRobots();
    updateTime();
    updateBuildings();
    updateResources();
    updateLand();
    updateButtons();
    makeVisible();
}

//Actions
function fix(robot) {
    if (robot === 'scrapbot') {
        if (scrapbot.broken === 1 && gears >= scrapbot.fixCostGears && scrapMetal >= scrapbot.fixCostScrapMetal) {
            scrapbot.broken = 0;
        }
    }
    if (robot === 'grinder') {
        if (grinder.broken >= 1 && gears >= grinder.fixCostGears && scrapMetal >= grinder.fixCostScrapMetal) {
            grinder.broken = 0;
        }
    }
    if (robot === 'constructo') {
        if (constructo.broken >= 1 && gears >= constructo.fixCostGears && scrapMetal >= constructo.fixCostScrapMetal) {
            constructo.broken = 0;
        }
    }
    updateRobots();
}

function replaceBattery(robot) {
    if (robot === 'scrapbot') {
        if (scrapbot.currentPower <= ((scrapbot.batterySlots - 1) * scrapbot.batteryCharge)) {
            batteries.charged -= 1;
            scrapbot.currentPower = scrapbot.currentPower + scrapbot.batteryCharge;
            batteries.dead += 1;
        }
    }
    if (robot === 'grinder') {
        if (grinder.currentPower <= ((grinder.batterySlots - 1) * grinder.batteryCharge)) {
            batteries.charged -= 1;
            grinder.currentPower = grinder.currentPower + grinder.batteryCharge;
            batteries.dead += 1;
        }
    }
    if (robot === 'constructo') {
        if (constructo.currentPower <= ((constructo.batterySlots - 1) * constructo.batteryCharge)) {
            batteries.charged -= 1;
            constructo.currentPower = constructo.currentPower + constructo.batteryCharge;
            batteries.dead += 1;
        }
    }
    updateRobots();
}

function build(building, number) {
    if (building === 'windmill' && windmill.costGears <= gears && windmill.costScrapMetal <= scrapMetal) {
        windmill.amount += number;
        gears -= windmill.costGears;
        scrapMetal -= windmill.costScrapMetal;
        windmill.costGears *= Math.pow(windmill.costIncrement, windmill.amount);
        windmill.costScrapMetal *= Math.pow(windmill.costIncrement, windmill.amount);
        windmill.costGears = windmill.costGears.toFixed(3);
        windmill.costScrapMetal = windmill.costScrapMetal.toFixed(3);
        updateAll();
    }
    if (building === 'pumpjack' && pumpjack.costGears <= gears && pumpjack.costScrapMetal <= scrapMetal  && pumpjack.costConcrete <= concrete && land.clear >= number) {
        pumpjack.amount += number;
        gears -= pumpjack.costGears;
        scrapMetal -= pumpjack.costScrapMetal;
        concrete -= pumpjack.costConcrete;
        land.clear -= number;
        pumpjack.costGears *= Math.pow(pumpjack.costIncrement, pumpjack.amount);
        pumpjack.costScrapMetal *= Math.pow(pumpjack.costIncrement, pumpjack.amount);
        pumpjack.costConcrete *= Math.pow(pumpjack.costIncrement, pumpjack.amount);
        pumpjack.costGears = pumpjack.costGears.toFixed(3);
        pumpjack.costScrapMetal = pumpjack.costScrapMetal.toFixed(3);
        pumpjack.costConcrete = pumpjack.costConcrete.toFixed(3);
        updateAll();
    }
}

function buyTech(tech) {
    if (tech === 'robofriends' && robofriends.costDreams <= dreams) {
        robofriends.bought = 1;
        dreams -= robofriends.costDreams;
        setThing.on += 1;
    }
    if (tech === 'electricSheep' && electricSheep.costDreams <= dreams) {
        electricSheep.bought = 1;
        dreams -= electricSheep.costDreams;
    }
}

function clearRuins() {
    if (gameState === "production" && land.ruins >= 1) {
        gameState = "quest";
        quest = 1;
        questDuration = 50;
    }
}

//Random
function findABot() {
    var randomBot = random(1, 2);
    if (randomBot === 1) {
        if (robofriends.bought === 1 && grinder.found === 0) {
            grinder.found += 1;
        }
    }
    if (randomBot === 2) {
        if (robofriends.bought === 1 && constructo.found === 0) {
            constructo.found += 1;
        }
    }
}

function findADiscovery() {
    if (toaster.found === 0) {
        toaster.found = 1;
    } else if (dog.found === 0) {
        dog.found = 1;
    }
}

function findALand() {
    var randomLand = random(1, 2);
    if (randomLand === 1) {
        land.ruins += 1;
    }
    if (randomLand === 2) {
        land.wastes += 1;
    }
}

function findAResource() {
    var randomResource = random(1, 6);
    if (randomResource === 1) {
        batteries.dead += 1;
    }
    if (randomResource === 2) {
        gears += 5;
    }
    if (randomResource === 3) {
        scrapMetal += 10;
    }
    if (randomResource === 4) {
        concrete += 5;
    }
    if (randomResource === 5) {
        girder += 5;
    }
    if (randomResource === 6) {
        oil += 5;
    }
}

function findASetThing() {
    if (robofriends.bought === 1 && setThing.scrapbot === 0) {
        scrapbot.found = 1;
        setThing.scrapbot = 1;
    }
    setThing.on -= 1;
}

function findAThing() {
    if (setThing.on >= 1) {
        findASetThing();
    } else {
        var finding = random(1, 100);
        if (finding <= 10) {
            findADiscovery();
        }
        if (finding > 10 && finding <= 30) {
            findABot();
        }
        if (finding > 30 && finding <= 50) {
            findALand();
        }
        if (finding > 50 && finding <= 100) {
            findAResource();
        }
    }
}

//Periodics
function produce() {
    if (batteries.dead >= 1) {
        windmill.batteryCharge += (windmill.amount * windmill.batteryChargeRate);
        if (windmill.batteryCharge >= 1) {
            batteries.charged += 1;
            batteries.dead -= 1;
            windmill.batteryCharge = 0;
        }
    }
    if (finderbot.broken === 0) {
        gears += (finderbot.gearFind + grinder.gearMake);
        scrapMetal += finderbot.scrapMetalFind;
        specialCount += finderbot.specialFind;
        if (specialCount >= 1) {
            findAThing();
            specialCount = 0;
        }
        dreams += finderbot.dreamHave;
    }
    if (scrapbot.broken === 0 && scrapbot.currentPower > 0) {
        scrapMetal += scrapbot.scrapMetalFind;
        concrete += scrapbot.concreteFind;
    }
    if (grinder.broken === 0 && grinder.currentPower > 0) {
        gears += grinder.gearMake;
        if (scrapMetal >= grinder.scrapMetalUse) {
            scrapMetal -= grinder.scrapMetalUse;
        }
    }
    if (constructo.broken === 0 && constructo.currentPower > 0) {
        concrete += constructo.concreteMake;
        if (scrapMetal >= constructo.scrapMetalUse) {
            girder += constructo.girderMake;
            scrapMetal -= constructo.scrapMetalUse;
        }
    }
    oil += (pumpjack.amount * pumpjack.oilProduce);
}

function task() {
    if (land.ruins >= 1 && quest === 1 && questDuration > 0) {
        questDuration -= 1;
    } else if (land.ruins >= 1 && quest === 1 && questDuration === 0) {
        land.ruins -= 1;
        land.clear += 1;
        gameState = "production";
    }
}

function consume() {
    if (scrapbot.currentPower >= 1 && scrapbot.broken === 0) {
        scrapbot.currentPower -= 1;
    }
    if (grinder.currentPower >= 1 && grinder.broken === 0) {
        grinder.currentPower -= 1;
    }
    if (constructo.currentPower >= 1 && constructo.broken === 0) {
        constructo.currentPower -= 1;
    }
}

window.setInterval(function () {
    
    if (gameState === "production") {
        produce();
    } else if (gameState === "quest") {
        task();
    }
    consume();
    updateAll();
    min += 5;
    if (min === 60) {
        hour += 1;
        min = 0;
    }
    //if (min === 0 && (hour === 6 || hour === 12 || hour === 18)) {}
    if (hour === 24) {
        day += 1;
        hour = 0;
    }
    if (day === 361) {
        year += 1;
        day = 1;
    }
    
}, 250);