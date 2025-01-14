// Wrap.innerHTML='<h1>Hello</h1> '


fetch("file:///C:/Users/S-SOUQUE/OneDrive%20-%20Aescra%20Emlyon%20Business%20School/Documents/Cours/portfolio_web/texte.json")   //J'appel mon fichier json qui est sur une autre page
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
        div.appendChild(card);

        let image = document.createElement ("img");
        image.className = "image";
        image.textContent = 
        card.appendChild(image);


        let titre = document.createElement("h2");
        titre.className = "titre";
        titre.textContent = data.titre;
        card.appendChild(titre);
    }})
    
  