// Импортируем основной компонент приложения
import App from './App.svelte'

/* 
  Инициализируем компонент приложения и указываем ему место для интеграции. Явное создание через `new` используется только для компонента верхнего уровня: дочерние элементы встраиваются через разметку типа `<App> <Sibling/> </App>`. Подробнее о создании компонентов: https://svelte.dev/docs#Creating_a_component 
*/
const app = new App({
  target: document.body,
})

/* 
  Упрощение для того, чтобы при поиске ошибок можно было ввести в консоле `app` или `window.app` и получить доступ к компоненту приложения. 
  Подробнее: https://github.com/sveltejs/template-webpack/issues/19#issuecomment-500083588
*/
window.app = app

export default app