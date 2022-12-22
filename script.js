let lastOperand = null,
    operation = null;
const inputWindow = document.getElementById('inputWindow');

function initVar() {
    lastOperand = null;
    operation = null;
    inputWindow.value = '';
}

function addOperation(oper) {
    // Повторный ввод операторов блокируется
    if (operation == null) {
        lastOperand = inputWindow.value;
        operation = oper;
        inputWindow.value = '';
    }
}

function stringMath(a, oper, b) {

    //Преобразуем операнды из строк в числа
    a = parseInt(a);
    b = parseInt(b);

    const mathMatrix = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "/": (a, b) => b != 0 ? a / b : 0, // Мини-обработчик ошибок - на 0 делить нельзя
        "*": (a, b) => a * b,
        "%": (a, b) => b > 0 ? Math.sqrt(b) : 0 // Мини-обработчик ошибок - нет корня от отрицательного
      };

    return mathMatrix[oper](a, b); 
}

// Обработчик кликов вешаем на контейнер формы
document.querySelector('.form-group').addEventListener('click', (e) => {
    
    const target = e.target,  
        activeKey = target.getAttribute('btn');

        switch (activeKey) {
            case "C" :
                initVar();
                break;
            case "=" :
                // Так все в рамках условий задачи работает, но способ крайне не безопасен
                //inputWindow.value = eval(lastOperand + operation + inputWindow.value);
                // Альтарнативное решение - парсим значения через матрицу решений:
                inputWindow.value = stringMath(lastOperand, operation, inputWindow.value);
                operation = '=';
                break;
            case "%" :
                if (operation == null) {
                    inputWindow.value = stringMath(lastOperand, activeKey, inputWindow.value);
                    operation = '=';
                }
                break;
            case "+" :
                addOperation(activeKey);
                break;
            case "-" :
                addOperation(activeKey);
                break;
            case "*" :
                addOperation(activeKey);
                break;
            case "/" :
                addOperation(activeKey);
                break;
            default:
                // Ввод чисел
                // Если ввод после вывода итога - сначала инициализация
                if (operation == "=") {
                    initVar();
                }
                inputWindow.value += activeKey;
        }
        
});
