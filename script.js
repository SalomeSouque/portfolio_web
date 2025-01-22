fetch("./texte.json")   //J'appel mon fichier json qui est sur une autre page
    .then(response =>{
        if (!response.ok) {
            throw new Error ("Failed to load JSON data")
        } 
        return response.json()
            
        
    })
    .then(data =>{

    console.log(data);
    

    
    
    for (let key in data) {

        let keys = Object.keys(data);
        console.log(keys);

        let div = document.getElementById ("Div");
        let indeximage =0;

        data.web.forEach(element => {

            let card = document.createElement ("div");
            card.className = "card";
            div.appendChild(card);
        
        indeximage++
        let image = document.createElement ("div");
        image.id = "image"+indeximage;
        image.textContent = element.image;
        card.appendChild(image);
        console.log(image);
        
        
        let trait = document.createElement("div");
        trait.className = "trait";
        trait.textContent = element.trait;
        card.appendChild(trait);

        let titre = document.createElement("h2");
        titre.className = "titre";
        titre.textContent = element.titre;
        card.appendChild(titre);

        let description = document.createElement("p");
        description.className = "description";
        description.textContent = element.description;
        card.appendChild(description);

     
        

        });
        
        
    }})
    
  