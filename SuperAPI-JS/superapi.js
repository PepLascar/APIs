// Primero, document ready
// Detectar el botón
// Generar Apis

$(document).ready(function() {


    // API COMIDA SIN BOOST
    $('#traer-comida').click(function() {
        $.get({
            url: 'https://www.themealdb.com/api/json/v1/1/categories.php', //Cargar url api
            success: function(response) {

                var tabla = $('#cat-comidas tbody')  // Linkear con tabla del html y manipular/vaciar solo a tbody
                tabla.empty() //para que la tabla vacié los elementos de la tabla
              
                $.each(response.categories, function(index, elemento){  // llevar objetos a la estructura de la tabla
                    console.log(elemento);
                    tabla.append("<tr>" +
                    "<th scope='row'>" + elemento.idCategory + "</th>" +
                    "<td>" + elemento.strCategory + "</td>" +
                    "<td><img src='" + elemento.strCategoryThumb + "' alt='" + elemento.strCategory + "' /></td>" +
                    "<td>" + elemento.strCategoryDescription + "</td>" +
                    "</tr>")
                });
            },
            error: function(e) {
                console.error(e)
            }
        });
    })

    //API TRAER COMIDA CON BOOSTRAP
    $('#traer-comida2').click(function() {
        $.get({
            url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
            success: function(response) {
                var contenedor = $('#cards-container')
                contenedor.empty()

                $.each(response.categories, function(i, categoria) {
                    contenedor.append("<div class='card'>" +   //aquí vincular con el tipo de dato que traiga el JSON
                        "<img src='" + categoria.strCategoryThumb + "' class='card-img-top' alt='" + categoria.strCategory + "'>" +
                        "<div class='card-body'>"+
                        "<h5 class='card-title'>" + categoria.strCategory + "</h5>" +
                        "<p class='card-text'>" + categoria.strCategoryDescription + "</p>" +
                    "</div></div>")
                });
            },
            error: function(e) {
                console.error(e)
            }
        });
    })

    //API STARWARS
    $('#traer-starwars').click(function() {
        $.get({
            url: 'https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/all.json',
            success: function(listado) {

                var contenedor = $('#cards-container')
                contenedor.empty()

                $.each(listado, function(i, personaje) {
                    contenedor.append("<div class='card'>" +
                        "<img src='" + personaje.image + "' class='card-img-top' alt='" + personaje.name + "'>" + // vincular la imagen con la de la card
                        "<div class='card-body'>"+
                        "<h5 class='card-title'>" + personaje.name + "</h5>" +
                        "<p class='card-text'><b>Especie: </b>" + personaje.species + 
                        "</p><p><b>Altura: </b>" + personaje.height + "mt</p>" +
                        "</p><p><b>Mundo de origen: </b>" + personaje.homeworld + "</p>" +
                        "</div></div>")

                    console.log(personaje)
                });
                
            },
            error: function(e) {
                console.error(e)
            }
        });
    })

    //API POKEMON
    $('#traer-pokemon').click(function(){
        $.get({
            url:'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151',
            success: function(datos) {
                var contenedor = $('#cards-container') //linkear con el cards de boostrap: crear la ID
                contenedor.empty()

                $.each(datos.results, function(i, pokemon) { //recorrer un índice por cada elemento

                    $.get({
                        url: pokemon.url,   //aquí ya dentro que los indices que abro traigo los detalles: doble consulta
                        success: function(detPokemon){
                            console.log(detPokemon)
                            contenedor.append("<div class='card'>" +
                                "<img src='" + detPokemon.sprites.front_default + "' class='card-img-top' alt='" + pokemon.name + "'>" +
                                "<div class='card-body'>"+
                                "<h5 class='card-title' >" + pokemon.name + "</h5>" +
                                "<p class='card-text'><b>Exp Base: </b>" + detPokemon.base_experience + "</p>"+
                                "<p class='card-text'><b>NO: </b>" + detPokemon.id + "</p>"+
                                "<p class='card-text'><b>Especie: </b>" + detPokemon.species.name + "</p>"+
                            "</div></div>")
                        },
                        error: function(e){
                            console.error(e)
                        }
                    })                 
                })
            },
            error: function(e){
                console.error(e)
            }
        });
    })


})