<!-- 
  Основной компонент приложения. Настраивает маршрутизацию, а также может включать контент главной страницы
-->

<script>
  // Импортируем компоненты маршрутизатора
  import { Router, Link, Route } from 'svelte-routing'
  
  // Импортируем компоненты отдельных страниц
  import Index from './pages/Index.svelte'
  import About from './pages/About.svelte'
  import NotFound from './pages/NotFound.svelte'

  /* 
    Константа, которая при сборке проекта заменяется Вебпаком на значение соответствующей переменной окружения. Служит для указания базового пути для случая, когда приложение запускается по более глубокому адресу. Например, чтобы проект открывался по ссылке example.com/subfolder вместо example.com, в .env-файле следует указать APP_BASEPATH=subfolder.

    Если /subfolder — не веритуальный УРЛ, а физическая папка, необходимо дополнительно указать STATIC_BASEPATH="/subfolder/" (со слешами в начале и в конце)
  */
  const appBasepath = APP_BASEPATH || '/'
  const folderBasepath = STATIC_BASEPATH || '/'

  // Вставляем <base href="{folderBasepath}"> первым элементом <head></head>
  const base = document.createElement('base')
  base.setAttribute('href', folderBasepath)
  document.head.insertBefore(base, document.head.firstChild)
  
</script>

<!-- 
  В основной части компонента настраиваем маршрутизацию.
  
  Рядом с роутером может находиться содержимое старницы. Например, маршрутизацию можно встроить в компонент <Index>, расположив рядом с основным содержимым главной страницы (тогда из списка маршрутов нужно будет убрать путь к `/`).

  Роутер сам определяет наиболее специфический подходящий маршрут. Например, даже если на первое место поставить <Route path="*" />, этот маршрут будет задействован только в случае, если не найдется хотя бы одного с более точным адресом.
-->

<Router basepath="{appBasepath}">
  <Route path="/"><Index /></Route>
  <Route path="/about/"><About /></Route>
  <Route path="*"><NotFound /></Route>
</Router>
