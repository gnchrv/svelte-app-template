<script>
  import Input from '../components/Input.svelte'

  let title = 'Главная страница'
  let name = 'Александр'
</script>

<h1>{title}</h1>  
<Input {name} />
<a href="/about">О компании</a>