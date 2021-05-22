function insert(num) {
    //if there is syntax error displayes, clear it enter input
    if (SyntaxError) {
        clean();
    }
    // insert a number into the display
    if (display.value.length < 20) {
        if (isNaN(num)) {
            //Avoids two operators together
            if ("+-x/%".includes(display.value[display.value.length - 1])) {
                back();
            }
            display.value += num;
        }
        else if (display.value.length == 1 && display.value[0] == 0) {
            display.value = num
        }
        else {
            display.value += num
        }
    }
    else {
        return
    }
}
function clean() {
    //if there is a syntax error, toggle the variable to false (reset)
    SyntaxError = false
    //clear the display value
    display.value = "0";
}
//Parses numbers and operators to different arrays and returns the object of arrays
const parseExpression = (exp) => {
    let operators = [],
        numbers = [];
    let isPrevNumber = true,
        current = "";
    for (let i = 0; i < exp.length; i++) {
        if (!isNaN(exp[i]) || exp[i] == ".") {
            if (isPrevNumber) {
                current += exp[i];
            } else {
                numbers.push(current);
                current = exp[i];
            }
            isPrevNumber = true;
        } else {
            operators.push(exp[i]);
            isPrevNumber = false;
        }
    }
    numbers.push(current);
    numbers = numbers.map(Number);

    return { numArray: numbers, opArray: operators };
};
//Updates the array of numbers and operators
const updateResult = (result, numbers, operators) => {
    operators.splice(index, 1);
    numbers.splice(index, 2, result);
};
let index = 0;
//Evaluates the input expression based on BODMAS rule
const evaluate = (exp) => {
    let left = 0, right = 0, result = 0;
    let parsedExpression = parseExpression(exp);
    let numbers = parsedExpression.numArray;
    let operators = parsedExpression.opArray;
    while (operators.length) {
        if (operators.includes("/")) {
            index = operators.indexOf("/");
            left = numbers[index];
            right = numbers[index + 1];
            result = left / right;
            updateResult(result, numbers, operators);
        } else if (operators.includes("x")) {
            index = operators.indexOf("x");
            left = numbers[index];
            right = numbers[index + 1];
            result = left * right;
            updateResult(result, numbers, operators);
        } else if (operators.includes("+")) {
            index = operators.indexOf("+");
            left = numbers[index];
            right = numbers[index + 1];
            result = left + right;
            updateResult(result, numbers, operators);
        } else if (operators.includes("-")) {
            index = operators.indexOf("-");
            left = numbers[index];
            right = numbers[index + 1];
            result = left - right;

            updateResult(result, numbers, operators);
        }
        else if (operators.includes("%")) {
            index = operators.indexOf("%");
            left = numbers[index];
            right = numbers[index + 1];
            result = left % right;

            updateResult(result, numbers, operators);
        }
    }
    return result;
};
function equal() {
if(!isNaN(display.value[display.value.length-1])){
    
    var exp = display.value
    var answer = evaluate(exp);

    if (answer.toString.length > 19) {
        display.value = "Limit Exceed";
    }
    if (isFinite(answer)) {
        display.value = answer
    }
    else {
        display.value = "Math Error" // if is infinity
        SyntaxError = true
    }
}
}
function back() {
    //if there is syntax error, return the function
    if (SyntaxError) {
        return
    }
    display.value = display.value.substring(0, display.value.length - 1)
    if (display.value == "") {
        display.value = "0"
    }
}


//selecting display
const display = document.querySelector('.display');
//selecting all numbers
const numbers = document.querySelectorAll('.number')
//adding event listener for each number in "numbers"
numbers.forEach((button) => {
    button.addEventListener('click', calculate)
})

//selecting all operators
const operators = document.querySelectorAll('.operator')

//adding event listener for each operator in "operators"
operators.forEach((button) => {
    button.addEventListener('click', calculate)
})

// adding event listener to the keyboard
// window.addEventListener('keypress', check)
window.addEventListener('keydown', check)
function check(keyboardInput) {

    let keyValue = keyboardInput.key

    if (keyboardInput.keyCode) {
        if (!isNaN(keyValue)) {
            insert(keyValue)
        } else {
            alert("Only numbers are allowed");
        }
    }
}
//boolean variable to check if there is syntax error
var SyntaxError = false
function calculate(event) {
    var buttonValue = event.target.value
    if ((!isNaN(buttonValue)) || (".+-x/%".includes(buttonValue))) {
      
        //insert the buttonValue
        insert(buttonValue)
    }
    else if (buttonValue == '=') {
        equal() //calling the equal() function
    }
    else if (buttonValue == "DEL") {
        back() //calling the back() function
    }
    else if (buttonValue == "AC") {
        clean() //calling the clean() function
    }
}