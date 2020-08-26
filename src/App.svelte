<!-- 
  Основной компонент приложения. Настраивает маршрутизацию, а также может включать контент главной страницы
-->

<script>
  // Импуортируем маршрутизатор
  import { Route } from 'tinro'
  
  // Испортируем компоненты отдельных страниц
  import Index from './pages/Index.svelte'
  import About from './pages/About.svelte'
  import NotFound from './pages/NotFound.svelte'
</script>

<!-- 
  В основной части компонента настраиваем маршрутизацию.
  
  Рядом с роутером может находиться содержимое старницы. Например, маршрутизацию можно встроить в компонент <Index>, расположив рядом с основным содержимым главной страницы (тогда из списка маршрутов нужно будет убрать путь к `/`) 
-->

<Route>
  <Route path="/"><Index/></Route>
  <Route path="/about"><About/></Route>
  <Route fallback><NotFound/></Route>
</Route>