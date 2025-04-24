# **App Name**: Smart Shopper

## Core Features:

- Item Management: Users can manually add new items to a shopping list, edit existing items, mark items as purchased, and delete items.
- Multiple Lists: Users can create multiple shopping lists, each with a unique name, color, and emoji.
- AI-Powered Suggestions: Based on past shopping habits, the tool will suggest items the user might want to add to their list, such as 'You usually buy milk on Mondays. Add?'
- Barcode Scanner: Scan product barcodes using the device camera to quickly add items (e.g., using Open Food Facts or mock data).
- Offline Mode: Enable offline mode with Firestore caching and sync when back online.
- Firebase Authentication: Implement Firebase Authentication with Google Sign-In and Email/Password login.
- Real-time Collaboration: Allow users to share lists and edit them together in real-time. The list owner can invite others via email or QR code.
- Push Notifications: Provide local push notifications for shopping reminders and unfinished lists.
- Export & Share: Export the list as a PDF or plain text file, and allow sharing via a system share button.
- UI Customizations: Implement dark mode support, allow emoji in list names, and support a multilingual UI (Ukrainian and English).
- Analytics Integration: Integrate basic analytics with Firebase Analytics to track usage events.
- Home Screen Widget: Add a home screen widget (optional, Android-only).
- Voice Input: Enable voice input to add items using speech-to-text.
- Gestures and Drag & Drop: Allow drag & drop for reordering items, and swipe gestures for quick actions like delete or mark as bought.

## Style Guidelines:

- Primary color: Soft green (#A7D1AB) to convey freshness and organization.
- Secondary color: Light gray (#F0F0F0) for backgrounds and neutral elements.
- Accent: Coral (#FF7F50) for interactive elements and highlights.
- Clean and intuitive layout with clear sections for each shopping list and its items.
- Simple and recognizable icons for common actions like adding, editing, and deleting items.
- Subtle animations for item transitions and user interactions to enhance the feeling of responsiveness.

## Original User Request:
Створи мобільний додаток для ведення списку покупок (shopping list app) з такими функціональними можливостями:

1. Користувач може:
   - додавати новий товар вручну
   - редагувати або видаляти товар
   - відмічати товар як "куплений"
   - сортувати товари перетягуванням (drag & drop)
   - шукати товари у списку
   - додавати товари голосом (speech-to-text)

2. Підтримка **кількох списків**:
   - кожен список має унікальну назву, колір, emoji
   - приклад: “Продукти”, “Будівельні матеріали”, “Святковий список”

3. Firebase інтеграція:
   - Firebase Authentication (Email/Password, Google Sign-In)
   - Firestore для збереження списків і товарів
   - UID-фільтрація: кожен користувач бачить лише свої списки
   - офлайн-режим з автоматичною синхронізацією

4. UX/UI:
   - мобільний UI з адаптивним дизайном (Flutter або React Native)
   - підтримка темної теми
   - swipe-жести для швидких дій (видалити / куплено)
   - автозбереження всіх змін
   - emoji-підтримка в назвах товарів
   - перемикач мов: українська / англійська

5. **Штрих-код сканер**:
   - сканування штрих-коду товару через камеру
   - автоматичне додавання назви та категорії (використовуй Open Food Facts API або mock-дані)
   - можна відредагувати перед збереженням

6. **AI-підказки**:
   - на основі минулих покупок показуються рекомендації типу:
     - "Ви завжди купуєте молоко в понеділок. Додати?"
     - "Закінчилося масло минулого тижня — додати знову?"
   - використовуй просту логіку на Firestore + Cloud Functions для трендів

7. Спільна робота:
   - список може бути спільним (редагування кількома користувачами)
   - власник може запросити іншого користувача через email або QR-код

8. Нотифікації:
   - локальні push-нагадування про незакінчені списки
   - можливість встановити нагадування для кожного списку

9. Експорт:
   - експорт списку в PDF або .txt файл
   - кнопка “Поділитися списком” (share intent)

10. Додатково:
   - додати віджет для головного екрану (у Flutter/Android)
   - базові анімації для UX
   - логування подій в Firebase Analytics
   - теми оформлення (вибір кольорових схем)

Згенеруй код з урахуванням найкращих практик UX, Firebase інтеграції, AI-асистента та швидкого тестування в емуляторі.
  