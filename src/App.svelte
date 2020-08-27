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
    Константа, которая при сборке проекта заменяется Вебпаком на значение соответствующей переменной окружения. Служит для указания базового пути для случая, когда приложение запускается по более глубокому адресу. Например, чтобы проект открывался по ссылке example.com/subfolder вместо example.com, в .env-файле следует указать URL_BASE=subfolder.

    Если /subfolder — не веритуальный УРЛ, а физическая папка, необходимо дополнительно указать FOLDER_BASE="/subfolder" (со слешем в начале)
  */
  const URLBase = URL_BASE || '/'
  const folderBase = FOLDER_BASE || '/'

  // Вставляем <base href="{folderBase}"> первым элементом <head></head>
  const base = document.createElement('base')
  base.setAttribute('href', folderBase)
  document.head.insertBefore(base, document.head.firstChild)
  
</script>

<!-- 
  В основной части компонента настраиваем маршрутизацию.
  
  Рядом с роутером может находиться содержимое старницы. Например, маршрутизацию можно встроить в компонент <Index>, расположив рядом с основным содержимым главной страницы (тогда из списка маршрутов нужно будет убрать путь к `/`).

  Роутер сам определяет наиболее специфический подходящий маршрут. Например, даже если на первое место поставить <Route path="*" />, этот маршрут будет задействован только в случае, если не найдется хотя бы одного с более точным адресом.
-->

<Router basepath="{URLBase}">
  <Route path="/"><Index /></Route>
  <Route path="/about/"><About /></Route>
  <Route path="*"><NotFound /></Route>
</Router>
