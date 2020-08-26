# Шаблон для создания Svelte-приложения

Заготовка для создания приложений с помощью svelte-компонентов. 

Настроена маршрутизация: в качестве роутера используется [tinro](https://www.npmjs.com/package/tinro). Пути настраиваются в файле `src/App.svelte`. Сервер — [sirv-cli](https://www.npmjs.com/package/sirv-cli).

Сборщик — [Webpack](https://webpack.js.org). В папке `src/pages` располагаются отдельные страницы. В `src/components` — более мелкие компоненты. В папках `src/fonts` и `src/img` лежат статические файлы, которые про сборке просто копируются в `/dist`.

Подробнее о Svelte — [svelte.dev](https://svelte.dev).