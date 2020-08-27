<script>
  // Испортируем компонент роутера для ссылки для навигации между страницами приложения
  import { Link } from 'svelte-routing'
  
  // Импортируем компонент поля ввода с привязанной к нему надписью
  import Input from '../components/Input.svelte'

  let title = 'Главная страница'
  let name = 'Александр'
</script>

<h1>{title}</h1>  
<Input {name} />
<Link to="about">О компании</Link>