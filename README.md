# Payment Form Application

## Описание проекта

Проект представляет собой форму для онлайн-оплаты, которая включает следующие поля:

- Номер карты (автоматическое разделение цифр по группам и валидация номера).
- Дата окончания действия карты (валидный формат и проверка на минимально допустимую дату).
- CVC/CVV (валидация на строго 3 цифры).
- Email для отправки онлайн-чека (валидация на корректный email).

Форма не позволяет отправить данные, пока все поля не будут корректно заполнены.
Также рядом с полем ввода номера карты отображается логотип платёжной системы (Visa, MasterCard, Мир и др.) в зависимости от введённого номера.

Для сборки проекта используется Webpack, а тесты написаны с использованием Jest.

## Функциональные возможности

- Валидация номера карты (поддержка основных платёжных систем).
- Валидация срока действия карты (месяц/год).
- Валидация CVC/CVV кода.
- Валидация email-адреса.
- Автоматическое отображение логотипов платёжных систем (Visa, MasterCard, Мир).
- Тестирование валидации данных через Jest.

## Стек технологий

- HTML, CSS, JavaScript
- Webpack для сборки проекта
- Redom для динамического создания DOM-элементов
- Babel для транспиляции JavaScript
- Jest для тестирования
- ESLint и Prettier для поддержания стиля кода

## Установка и запуск

1. **Клонирование репозитория:**

   ```bash
   `git clone https://github.com/KateLeonchikova/payment-form-app.git`
   ```

2. **Переход в директорию проекта:**

`cd payment-form-app`

3. **Установка зависимостей:**

Убедитесь, что у вас установлен Node.js, затем выполните команду: `npm install`

4. **Запуск проекта в режиме разработки:**

Для запуска проекта с сервером разработки выполните команду: `npm run dev`
Проект будет запущен на http://localhost:8080.

5. **Сборка проекта для production:**

Для сборки проекта выполните команду: `npm run build`
Сборка будет произведена в папку dist.

## Тестирование

Для тестирования валидации данных используйте следующую команду: `npm run test`

Тесты покрывают следующие сценарии:

- Валидация номера карты: корректные и некорректные значения.
- Валидация CVC/CVV: правильные и неправильные данные.
- Валидация email-адреса: корректный формат.
- Проверка DOM-структуры: наличие всех обязательных полей формы.

## Оптимизация и сборка

Проект использует Webpack для сборки, включая оптимизацию изображений через image-minimizer-webpack-plugin. Сборка настроена на генерацию файлов с хешами для кэширования и минификацию кода для production.

**Команды:**

`npm run dev` — запуск проекта в режиме разработки.
`npm run build` — сборка проекта для production (оптимизированная версия).
`npm run lint` — проверка кода с помощью ESLint.
`lint:fix` — проверяет код и автоматически исправляет ошибки, если это возможно.
`npm run test` — запуск тестов через Jest.

## Линтинг и стиль кода

В проекте настроены следующие инструменты для поддержки единого стиля кода:

ESLint — для проверки кода на соответствие стандартам.
Prettier — для автоматического форматирования кода.
EditorConfig — для согласования настроек редактора.

Чтобы запустить проверку стиля кода, используйте: `npm run lint`

## Картинки платёжных систем

Логотипы платёжных систем (Visa, MasterCard, Мир) расположены в папке src/assets/images. Для их оптимизации используется плагин image-minimizer-webpack-plugin.

## Заключение

Проект реализует базовую форму для ввода данных оплаты с полной валидацией полей и динамическим отображением логотипов платёжных систем. Он оптимизирован для production-сборки и включает набор тестов для проверки функциональности.