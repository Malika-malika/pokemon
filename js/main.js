const API = 'https://pokeapi.co/api/v2/pokemon';
let nextUrl = null; //для пагинации
let prevUrl = null; //для пагинации

fetchData(API)

function fetchData(url){ //для вызова
   fetch(url) //для следующих 20 штук
   .then(res => res.json())
   .then(response => {
      nextUrl = response.next; //для пагинации
      prevUrl =response.previous; //для пагинации
      render(response.results)
   })  
}

function render(data){//отображения
   console.log(data);
   $('.pokemons-list').html(''); //для очищения
   data.forEach(item => {
      $('.pokemons-list').append(`<li>${item.name}</li>`) //добавление лишек
   });
}


$('.previous-btn').on('click', function(){
   if(!prevUrl) return
   fetchData(prevUrl)
})
$('.next-btn').on('click', function(){
   if(!nextUrl) return
   fetchData(nextUrl)
})

$('body').on('click', 'li', function(e){
   let pokemonName = e.target.innerText;
   fetch(`${API}/${pokemonName}/`)
      .then(res => res.json())
      .then(response => showModal(response))
})

function showModal(pokemon){
   $('.pokemon-info').append(`
      <li>
         <img src = "${pokemon.sprites.front_default}" alt = "pokemon img">
      </li>
      <li>name: ${pokemon.name}</li>
      <li>Types: ${pokemon.types.map(item => item.type.name)}</li>
      <li>Weight: ${pokemon.weight}</li>
      <li>Height: ${pokemon.height}</li>
   `)
   $('.main-modal').css('display', 'block')

}
$('.main-modal').on('click',function(){
   $('.pokemon-info').html(''),
   $(".main-modal").css('display','none'); 
})