fetch("./texte.json")   //J'appel mon fichier json qui est sur une autre page
    .then(response =>{
        if (!response.ok) {
            throw new Error ("Failed to load JSON data")
        } 
        return response.json()
            
        
    })
    .then(data =>{

    // console.log(data);
    

    
    
    for (let key in data) {

        let keys = Object.keys(data);
        // console.log(keys);

        let divjs = document.getElementById ("DivJS");
        let indeximage =0;
        let indexlink =0;
        // let cardall = document.createElement ("div");
        let tableau = [];
        // myArray.push(myObject)

        data.web.forEach(element => {
            indexlink ++
            let card = document.createElement ("div");
            card.id = "cardjs"+indexlink
            card.className = "cardjs";
            divjs.appendChild(card);
            tableau.push(card)
            

            // card[1].addEventListener("click", function (eve) {        //Je crée une fonction qui va servir à supprimer le li lors du click sur le bouton
            //     eve.preventDefault ();                              //           
            //     window.location.href = 'https://www.1formatik.com/creer-lien-hypertexte-html-js';                                 // Je met mon li sur mon ul
            // })
            
            // Array.prototype.push.apply(card)
            // console.log(tableau);
            
            let test = document.createElement ("a");
            test.className = "testlien";
            test.src = element["a-url"];
            card.appendChild(test)
// console.log(card);


        indeximage++
        let image = document.createElement ("div");
        image.id = "image"+indeximage;
        image.textContent = element.image;
        card.appendChild(image);
        // console.log(image);
        
        
        let trait = document.createElement("div");
        trait.className = "traitjs";
        trait.textContent = element.trait;
        card.appendChild(trait);

        let titre = document.createElement("h2");
        titre.className = "titrejs";
        titre.textContent = element.titre;
        card.appendChild(titre);

        let description = document.createElement("p");
        description.className = "descriptionjs";
        description.textContent = element.description;
        card.appendChild(description);

     
    

        });
        // tableau.push(divjs)
            console.log(tableau);
                tableau[1].addEventListener("click", function (eve) {        //Je crée une fonction qui va servir à supprimer le li lors du click sur le bouton
                eve.preventDefault ();
                                              //           
                window.location.href = 'https://yuka.io/';                                 // Je met mon li sur mon ul
            })

            function opentab (params) {
                
            }


        // let test = document.createElement (a);
        // text.className = "testlien";
        // test.src = element["a-url"];
        // card.appendChild(test)
    }})
    
  