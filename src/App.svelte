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
    STATIC_BASE — адрес папки со статическими файлами внутри корневого каталога. Используется приложением внутри тега <base> для формирования корректных запросов к файлам независимо от маршрута и открытой страницы. Указывается с двумя слешами: STATIC_BASE="/subfolder/" 
  */
  const staticBase = STATIC_BASE || '/'

  /* 
    ROUTER_BASE — константа, которая при сборке проекта заменяется Вебпаком на значение соответствующей переменной окружения. Служит для указания базового пути для случая, когда приложение запускается по более глубокому адресу. Например, чтобы проект открывался по ссылке example.com/subfolder вместо example.com, в .env-файле следует указать ROUTER_BASE=subfolder. 
  */
  const routerBase = ROUTER_BASE || '/'

  // Вставляем <base href="{staticBase}"> первым элементом <head></head>
  const base = document.createElement('base')
  base.setAttribute('href', staticBase)
  document.head.insertBefore(base, document.head.firstChild)
  
</script>

<!-- 
  В основной части компонента настраиваем маршрутизацию.
  
  Рядом с роутером может находиться содержимое старницы. Например, маршрутизацию можно встроить в компонент <Index>, расположив рядом с основным содержимым главной страницы (тогда из списка маршрутов нужно будет убрать путь к `/`).

  Роутер сам определяет наиболее специфический подходящий маршрут. Например, даже если на первое место поставить <Route path="*" />, этот маршрут будет задействован только в случае, если не найдется хотя бы одного с более точным адресом.
-->

<Router basepath="{routerBase}">
  <Route path="/"><Index /></Route>
  <Route path="/about/"><About /></Route>
  <Route path="*"><NotFound /></Route>
</Router>
