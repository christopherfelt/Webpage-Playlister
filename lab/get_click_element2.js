//TODO: Webpage Treatment Functions
//Number List Not In Ordered Lists



var links = document.getElementsByTagName('a');

for(var an = 0; an <links.length; an++){
    links[an].removeAttribute('href');
}


function clicked(e) {

    e.target.style.color = "red";
    e.target.id = "selected_element";


}

document.addEventListener('click', clicked, false);

console.log("Update 7");


