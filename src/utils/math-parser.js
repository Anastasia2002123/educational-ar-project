// src/utils/math-parser.js

// Ми не імпортуємо mathjs як ES-модуль, оскільки він завантажується як глобальний скрипт.
// Натомість, ми припускаємо, що бібліотека 'math' вже доступна глобально
// (тобто, ви підключили <script src="../libs/mathjs/math.min.js"></script> у HTML).
// Якщо у вас виникають проблеми з 'math' not defined, перевірте порядок завантаження скриптів в HTML.

/**
 * Парсер математичних виразів.
 * Використовує бібліотеку math.js для обчислень.
 */

// Функція для валідації математичного виразу
// Ця функція просто спробує розпарсити вираз, щоб перевірити його синтаксис
export function validateExpression(expression) {
    try {
        if (!expression || typeof expression !== 'string') {
            return false;
        }
        // Використовуємо math.parse для перевірки синтаксису
        // Якщо вираз містить змінні, які не визначені, math.parse може все одно спрацювати.
        // Основна мета - перевірити, чи це валідний математичний вираз.
        math.parse(expression);
        return true;
    } catch (e) {
        console.error("Syntax error in expression:", expression, e);
        return false;
    }
}

/**
 * Обчислює значення виразу для заданої змінної.
 * @param {string} expression Математичний вираз (наприклад, 'x*x + 2*x').
 * @param {string} variableName Ім'я змінної (наприклад, 'x', 't').
 * @param {number} value Значення змінної.
 * @returns {number} Результат обчислення.
 */
export function evaluateExpression(expression, variableName, value) {
    // Math.js автоматично зрозуміє 'pi', 'e' тощо.
    const scope = {
        [variableName]: value,
        // Додаємо підтримку 't' як змінної, якщо це параметрична функція
        t: value,
        // Додаємо 'x' та 'y' для 3D поверхонь, якщо вони не є основним variableName
        x: variableName === 'x' ? value : undefined,
        y: variableName === 'y' ? value : undefined,
    };

    try {
        // Компілюємо вираз для ефективнішого обчислення, якщо він буде викликатися багато разів
        const compiled = math.compile(expression);
        return compiled.evaluate(scope);
    } catch (e) {
        console.error(`Error evaluating expression: "${expression}" for ${variableName}=${value}`, e);
        return NaN; // Повертаємо NaN у випадку помилки обчислення
    }
}

/**
 * Обчислює значення виразу для двох змінних (наприклад, для поверхні z=f(x,y)).
 * @param {string} expression Математичний вираз (наприклад, 'sin(x*y)').
 * @param {number} xValue Значення змінної x.
 * @param {number} yValue Значення змінної y.
 * @returns {number} Результат обчислення.
 */
export function evaluateSurfaceExpression(expression, xValue, yValue) {
    const scope = {
        x: xValue,
        y: yValue
    };
    try {
        const compiled = math.compile(expression);
        return compiled.evaluate(scope);
    } catch (e) {
        console.error(`Error evaluating surface expression: "${expression}" for x=${xValue}, y=${yValue}`, e);
        return NaN;
    }
}