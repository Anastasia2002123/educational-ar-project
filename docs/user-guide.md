# Посібник користувача: Освітній AR/VR проєкт "Графіки функцій у 3D"

Вітаємо у світі тривимірної математики! Цей посібник допоможе вам максимально ефективно використовувати освітній AR/VR проєкт, що дозволяє візуалізувати математичні функції в інтерактивному 3D просторі.

## 1. Вступ

Проєкт "Графіки функцій у 3D" розроблений для студентів та учнів, які вивчають математику, фізику, інженерію та інформатику. Він дозволяє:

* **Візуалізувати** графіки функцій $y=f(x)$ та параметричних кривих.
* **Досліджувати** поверхні $z=f(x,y)$ у тривимірному просторі.
* **Інтерактивно** змінювати параметри функцій та спостерігати за трансформаціями графіків.
* (Опціонально, якщо реалізовано) **Розпізнавати** рукописні формули та автоматично будувати їх графіки.

## 2. Системні вимоги

Для комфортної роботи з проєктом вам знадобиться:

* **Сучасний веб-браузер:** Google Chrome, Mozilla Firefox, Safari (оновлені версії).
* **Мобільний пристрій:** Смартфон або планшет з підтримкою WebGL (більшість сучасних пристроїв її мають).
* **Дозвіл на використання камери:** Для функціоналу доповненої реальності (AR).
* **Достатньо потужний процесор та графічний прискорювач:** Для плавного рендерингу 3D моделей.
* **Стабільне підключення до Інтернету:** Для завантаження початкових ресурсів проєкту.

## 3. Запуск проєкту

1.  **Відкрийте посилання:** Перейдіть за посиланням на GitHub Pages, де розміщено проєкт (це зазвичай `https://[Ваш_нікнейм].github.io/[Назва_репозиторію]/`).
2.  **Виберіть режим:** На головній сторінці ви побачите кнопку "Запустити демо" або подібну. Натисніть її, щоб перейти до інтерактивної частини.

## 4. Інтерфейс користувача та навігація

Інтерфейс проєкту буде інтуїтивно зрозумілим. Ось основні елементи, з якими ви будете взаємодіяти:

* **Вікно візуалізації:** Основна область, де відображатимуться 3D графіки функцій.
* **Панель керування/параметрів:** Зазвичай розташована збоку або знизу, містить поля для введення формул, повзунки для зміни параметрів, кнопки для вибору типу графіку (функція $y=f(x)$, параметрична крива, поверхня $z=f(x,y)$).
* **Керування камерою (для VR/3D режиму):**
    * **Мишка:** Ліва кнопка миші для обертання, коліщатко для масштабування (наближення/віддалення).
    * **Клавіатура (опціонально):** W, A, S, D для переміщення, Q, E для підняття/опускання.
    * **Тачскрін (для мобільних):** Один палець для обертання, два пальці для масштабування.
* **Керування AR (для режиму доповненої реальності):**
    * **Позиціонування маркера:** Наведіть камеру вашого пристрою на роздрукований AR-маркер (якщо проєкт використовує маркери). Графік з'явиться над маркером.
    * **Керування об'єктом:** Залежно від реалізації, ви можете переміщувати або обертати графік, переміщуючи пристрій або використовуючи жести на екрані.

## 5. Основні функції

### 5.1. Графіки функції $y=f(x)$

1.  **Введіть формулу:** У відповідне поле введіть математичну функцію від однієї змінної, наприклад: `sin(x)`, `x^2`, `exp(-x^2) * cos(5*x)`.
2.  **Задайте діапазон:** Вкажіть діапазон для змінної $x$ (наприклад, від -10 до 10).
3.  **Побудувати:** Натисніть кнопку "Побудувати" або "Оновити".

### 5.2. Параметричні криві

1.  **Введіть параметричні рівняння:** Зазвичай це три рівняння для $x, y, z$ залежно від параметра $t$, наприклад:
    * $x = R \cos(t)$
    * $y = R \sin(t)$
    * $z = t$ (для спіралі)
2.  **Задайте діапазон:** Вкажіть діапазон для параметра $t$.
3.  **Побудувати:** Натисніть кнопку "Побудувати".

### 5.3. Поверхні $z=f(x,y)$

1.  **Введіть формулу:** У відповідне поле введіть математичну функцію від двох змінних, наприклад: `sin(sqrt(x^2 + y^2))`, `x*y`, `x^2 - y^2`.
2.  **Задайте діапазон:** Вкажіть діапазон для змінних $x$ та $y$.
3.  **Побудувати:** Натисніть кнопку "Побудувати".

### 5.4. Інтерактивна зміна параметрів

Якщо ваша функція містить параметри (наприклад, $y = A \sin(Bx)$), ви можете знайти повзунки або поля для введення значень цих параметрів. Змінюйте їх та спостерігайте, як графік трансформується в реальному часі.

### 5.5. (Опціонально) Розпізнавання рукописних формул

* Якщо ця функція реалізована, ви побачите область для малювання або кнопку для запуску режиму розпізнавання.
* Намалюйте математичну формулу чітко і розбірливо.
* Система спробує розпізнати формулу та побудувати відповідний графік.
    * *Примітка:* Точність розпізнавання може залежати від якості вашого рукопису та складності формули.

## 6. Усунення несправностей

* **Графік не відображається:**
    * Перевірте правильність введеної формули (синтаксичні помилки).
    * Переконайтеся, що діапазон для змінних є коректним.
    * Перезавантажте сторінку.
* **Низька продуктивність/зависання:**
    * Закрийте інші вкладки браузера та програми.
    * Спробуйте зменшити складність формули або діапазони.
    * Перевірте, чи ваш пристрій відповідає системним вимогам.
* **Проблеми з AR-камерою:**
    * Переконайтеся, що ви надали дозволи браузеру на використання камери.
    * Освітлення повинно бути достатнім, а маркер чітким (для маркерної AR).

## 7. Зворотний зв'язок

Якщо у вас є запитання, пропозиції або ви зіткнулися з проблемою, яку не вдалося вирішити за допомогою цього посібника, будь ласка, зверніться до технічної документації або README файлу проєкту.

Бажаємо успіхів у вивченні математики з AR/VR!