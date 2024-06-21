const screen = document.querySelector("#screen");
const buttons = document.querySelectorAll(".btn");
const clear = document.querySelector("#clear");
const del = document.querySelector("#del");

let operation = [];

clear.addEventListener("click", function(){
    operation = [];
    screen.innerHTML = "";
});

del.addEventListener("click", function(){
    operation.pop();
    screen.innerHTML = operation.join("");
});

function calculate(operation){
    let result = 0;
    let temp = "";
    let coef = 1;
    let operator = "";
    
    operation.forEach(function(val,i){
        if ((i==0) && (val=="-")){
            coef = -1;
        }
        else{
            if (!(isNaN(val))){
                temp += val
            }
            else{
                if (operator != ""){
                    if (temp != ""){
                        switch (operator){
                            case "+": {
                                result += coef * parseInt(temp);
                                break;
                            }
                            case "-": {
                                result -= coef * parseInt(temp);
                                break;
                            }
                            case "X": {
                                result *= coef * parseInt(temp);
                                break;
                            }
                            case "/": {
                                result /= coef * parseInt(temp);
                                break;
                            }
                        }
                        
                    }
                }
                else{
                    result = coef * parseInt(temp);
                    coef = 1;
                }
                temp = "";
                operator = val;
            }
        }
    });

    if (temp!=""){
        switch (operator){
            case "+": {
                result += coef * parseInt(temp);
                break;
            }
            case "-": {
                result -= coef * parseInt(temp);
                break;
            }
            case "X": {
                result *= coef * parseInt(temp);
                break;
            }
            case "/": {
                result /= coef * parseInt(temp);
                break;
            }
        }
    }
    if ((operation.length==1) && operation[0]){
        result = 0;
    }
    return result;
}

buttons.forEach(function(btn){
    if ((btn.innerHTML != "Delete") && (btn.innerHTML != "Clear")){
        btn.addEventListener("click", function() {
            if (operation.length == 0){
                if (!("+X.=/".includes(btn.innerHTML))){
                    operation.push(btn.innerHTML);
                }
            }
            else {
                if (!((isNaN(operation[operation.length-1])) && (isNaN(btn.innerHTML)))){
                    operation.push(btn.innerHTML);
                }
                else {
                    operation[operation.length-1] = btn.innerHTML;
                }
            }
            if (btn.innerHTML != "="){
                screen.innerHTML = operation.join("");
            }
            else {
                operation.push(calculate(operation));
                screen.innerHTML = operation.join("");
                operation.splice(0, operation.length-1);
            }
        });
    }
});