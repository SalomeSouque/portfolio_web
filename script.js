// Wrap.innerHTML='<h1>Hello</h1> '


fetch("https://js-dynamic-portfolio-data-makerslab-emlyon-cdweb-8f83155c64a0cc.gitlab.io/json/escape-game.json")   //J'appel mon fichier json qui est sur une autre page
    .then(response =>{
        if (!response.ok) {
            throw new Error ("Failed to load JSON data")
        } 
        return response.json()
            
        
    })
    .then(data =>{

    

    
    
    for (let key in data) {

        let keys = Object.keys(data);
        console.log(keys);


        let div = document.getElementById ("Div");


        let card = document.createElement ("div");
        card.className = "card";


        card.appendChild(div);

        let image = document.createElement ("img");
        image.className = "image";
        image.textContent = 
        image.appendChild(card);


        let titre = document.createElement("h2");
        titre.className = "titre";
        titre.textContent = data.titre;
        titre.appendChild(card);
    }})
    
  