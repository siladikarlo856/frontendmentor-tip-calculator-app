const billValueEl = document.getElementById('bill-value');
const fivePercentTipBtn = document.getElementById('fivePercentTip');
const tenPercentTipBtn = document.getElementById('tenPercentTip');
const fifteenPercentTipBtn = document.getElementById('fifteenPercentTip');
const twentyfivePercentTipBtn = document.getElementById('twentyfivePercentTip');
const fiftyPercentTipBtn = document.getElementById('fiftyPercentTip');
const customTipEl = document.getElementById('customTip');
const numberOfPeopleEl = document.getElementById('people-number');
const tipPerPersonEl = document.getElementById('tipAmount');
const totalPerPersonEl = document.getElementById('total');
const resetBtn = document.getElementById("resetButton");
const invalidInputTextEl = document.getElementById("invalidInputText");


let billValue = 0;
let selectedTip = 0;
let numberOfPeople = 0;
let tipPerPerson = 0;
let totalPerPerson = 0;

function updateTipDOMElements() {
    tipPerPersonEl.innerText = tipPerPerson===0?"0.00":tipPerPerson;
    totalPerPersonEl.innerText = totalPerPerson===0?"0.00":totalPerPerson;
}

function calculateTip() {
    // there is an input - enable reset button
    resetBtn.disabled = false;

    // check all parameters
    if(billValue === 0 || selectedTip === 0 || numberOfPeople === 0) {
        return;
    }

    let tipValue = billValue * selectedTip / 100;
    let totalBill = billValue + tipValue;
    
    tipPerPerson = (tipValue / numberOfPeople).toFixed(2);
    totalPerPerson = (totalBill / numberOfPeople).toFixed(2);
    updateTipDOMElements();
}

function totalBillUpdate(e) {
    billValue = parseFloat(e.target.value);
    if(billValue < 0) {
        billValue = 0;
        billValueEl.value = 0;
    }
    calculateTip();
}

function resetInputElements() {
    billValueEl.value = 0;
    numberOfPeopleEl.value = 0;
}

function unselectAllButtons() {
    fivePercentTipBtn.classList.remove("tip-btn-selected");
    tenPercentTipBtn.classList.remove("tip-btn-selected");
    fifteenPercentTipBtn.classList.remove("tip-btn-selected");
    twentyfivePercentTipBtn.classList.remove("tip-btn-selected");
    fiftyPercentTipBtn.classList.remove("tip-btn-selected");
}

function unselectAll() {
    unselectAllButtons();
    customTipEl.value = "";
}


function tipValueUpdate(e) {
    const id = e.target.id;
    switch(id) {
        case "fivePercentTip":
            selectedTip = 5;
            unselectAll();
            fivePercentTipBtn.classList.add("tip-btn-selected");
            break;
        case "tenPercentTip":
            selectedTip = 10;
            unselectAll();
            tenPercentTipBtn.classList.add("tip-btn-selected");
            break;
        case "fifteenPercentTip":
            selectedTip = 15;
            unselectAll();
            fifteenPercentTipBtn.classList.add("tip-btn-selected");
            break;
        case "twentyfivePercentTip":
            selectedTip = 25;
            unselectAll();
            twentyfivePercentTipBtn.classList.add("tip-btn-selected");
            break;
        case "fiftyPercentTip":
            selectedTip = 50;
            unselectAll();
            fiftyPercentTipBtn.classList.add("tip-btn-selected");
            break;
        case "customTip":
            unselectAllButtons();
            selectedTip = parseInt(e.target.value);
            break;
    }
    calculateTip();
}

function numberOfPeopleUpdate(e) {
    numberOfPeople =  parseInt(e.target.value);
    
    if(numberOfPeople === 0) {
        console.log("Can't be zero");
        // invalid
        numberOfPeopleEl.classList.add("invalid-zero");
        invalidInputTextEl.style.opacity = 1;
    } else {
        // valid
        numberOfPeopleEl.classList.remove("invalid-zero");
        invalidInputTextEl.style.opacity = 0;
    }


    numberOfPeopleEl.value = numberOfPeople;    
    calculateTip();
}

function resetValues() {
    // reset variables
    billValue = 0;
    selectedTip = 0;
    numberOfPeople = 0;
    tipPerPerson = 0;
    totalPerPerson = 0;

    // reset UI
    resetInputElements();
    unselectAll();
    updateTipDOMElements();

    resetBtn.disabled = true;
}


// Event listeners
billValueEl.addEventListener('change', totalBillUpdate);
fivePercentTipBtn.addEventListener('click', tipValueUpdate);
tenPercentTipBtn.addEventListener('click', tipValueUpdate);
fifteenPercentTipBtn.addEventListener('click', tipValueUpdate);
twentyfivePercentTipBtn.addEventListener('click', tipValueUpdate);
fiftyPercentTipBtn.addEventListener('click', tipValueUpdate);
customTipEl.addEventListener('change', tipValueUpdate);
numberOfPeopleEl.addEventListener('change', numberOfPeopleUpdate);
resetBtn.addEventListener('click', resetValues);



// On Load
console.log("Start");