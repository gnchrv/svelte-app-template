# Шаблон для создания Svelte-приложений с применением SCSS

Заготовка полноценного проекта с маршрутизацией.

## Структура папок
Исходные файлы находятся внутри папки `/src`. Готовый бандл попадает в папку `/dist`.

```
src/
  pages/ — отдельные страницы приложения
  components/ — более мелкие компоненты
  scss/ — глобальные стилей для всего приложения
  img/ и fonts/ — статические файлы, которые при сборке копируются в соответствующие папки внутри /dist

  App.svelte — основной компонент приложения
  index.html — базовая html-страница, в которую встраивается приложение
  main.js — entry-point для Вебпака; инициализирует основной компонент приложения и интегрирует его в index.html
```

## Маршрутизация
В качестве роутера используется [svelte-routing](https://www.npmjs.com/package/svelte-routing). Пути настраиваются в файле `src/App.svelte` c помощью компонентов `<Router>` и `<Route>`: 
```html
<Router>
  <Route path="/"><Index /></Route>
  <Route path="/about/"><About /></Route>
  <Route path="*"><NotFound /></Route>
</Router>
```

Для навигации между страницами приложения вместо нативных ссылок `<a href="…"></a>` используются компоненты `<Link>`:
```html
<Link to="/">Главная</Link>
<Link to="about">О компании</Link>
<Link to="contacts">Контакты</Link>
```

Пути к статическим файлам должны начинаться со слеша: например, `src="/img/logo.jpg"`. Это необходимо, чтобы приложение обращалось к одной и той же папке вне зависимости от вложенности УРЛ. Если не добавить слеш, при поиске статических файлов на странице `example.com/sub/folder` сервер будет обращаться к папке `example.com/sub/folder/static` вместо `example.com/static`. В результате файлы не будут найдены — даже `main.js`, файл самого приложения. Пользователь будет видеть пустую страницу.

Приложение умеет работать с «глубокими» адресами. Если необходимо, чтобы проект был доступен по адресу `example.com/subfolder` вместо `example.com`, в корневой папке следует создать файл .env с переменной `URL_BASE=subfolder`. В настройках маршрутизации дополнительно указывается `basepath`:
```html
<!-- src/App.svelte -->

<script>
  …
  const base = URL_BASE
</script>

<Router basepath="{base}">
  …
</Router>
```

Если `subfolder` представляет собой не виртуальный адрес, а физическую папку, необходимо также добавить в файл .env переменную `FOLDER_BASE=subfolder` для корректного подключения статических файлов.

## Бэкенд
В качестве сервера используется [sirv-cli](https://www.npmjs.com/package/sirv-cli). Перед запуском необходимо собрать бандл с помощью `npm run build` и указать значение переменной окружения `PORT`: `PORT=3000 npm start`.

## Сборка бандла
Проект собирается с помощью [Вебпака](https://webpack.js.org). Переменные окружения, необходимые при сборке, указываются в .env-файле, расположенном в корне проекта. Переменные, которые необходимо передать в сам код приложения, дополнительно отмечаются в настройках плагина `webpack.DefinePlugin({…})` внутри файла `webpack.config.js`.
