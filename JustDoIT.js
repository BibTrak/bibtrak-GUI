(function(){
    "use strict";
    
    //variables for user input
    var author = undefined,
        idNum = undefined,
        addID = undefined,
        database = undefined,
        directoryLocation = undefined;
    
    
    
    function init(){
        var myElement = document.querySelector('#results');

        //call respective functions when buttons are pressed
        document.querySelector('#searchButton').onclick = function(){
            searchBib();
        }
        
         document.querySelector('#setDirectory').onclick = function(){
            directoryLocation = document.querySelector('#directory').value;
            //console.log(directoryLocation);
        }
        
        
        document.querySelector('#addButton').onclick= function(){
            addBib();
        }
        
        document.querySelector('#deleteButton').onclick= function(){
            deleteBib();
        }
        
        document.querySelector('#fileButton').onclick= function(){
            findBib();
        }
        
    }

    //======DISPLAYS SEARCHED THINGS
    function searchBib(){
        database = document.querySelector('#dataBase').value;
        author = document.querySelector('#author').value;
        idNum = document.querySelector('#idNum').value;
        
        
        
        
    }
    
    //======CREATES NEW DIVS WITH UNIQUE IDs
    function bookmarkLoaded(obj){
        
        // if there's an error, print a message and return
		if(obj.error){
			var status = obj.status;
			var description = obj.description;
			document.querySelector("#results").innerHTML = "<h3 class='issues'><b>Error!</b></h3>" + "<p class='issues'><i>" + status + "</i><p>" + "<p><i>" + description + "</i><p>";
			$("#results").fadeIn(500);
			return; // Bail out
		}
		
		// if there are no results, print a message and return
		if(obj.matches == 0){
			var status = "No results found";
			document.querySelector("#results").innerHTML = "<p class='issues'><i>" + status + "</i><p>" + "<p><i>";
			$("#results").fadeIn(500);
			return; // Bail out
		}
		
		if(obj.total_items == 1){
            var object = [obj.event]; 
            return object;
        }
        
		// If there is an array of results, loop through them
		var allBibs = obj.matches;

        //clear the results section 
        var page = document.querySelector("#results");
        page.innerHTML = "";

		// loop through recipe ids
        for(var i= 0 ; i <allBibs.length; i++){
            //get each bookmark's ID
            bookmarkID = allBibs[i].id;
            
            //create a unique div box for each recipe id
            var divBox = document.createElement('div');
            divBox.id = "bib_" + bookmarkID;
            divBox.className = "bookmark";
            //add div to page
            document.querySelector("#results").appendChild(divBox);
            
            bookMarkBody(obj);           
        }
    }
    
    //======CREATES INFO IN EACH UNIQUE DIV
    function bookmarkBody(obj){
        var div = document.querySelector("#bib_" + obj.id);
        //console.log(div);
        //ig obj has author
        if(obj.author){
            bigString += "<p class='auth'><strong>Author:</strong> " + obj.author + "</p>";
        }
        
        //if obj has id
        if(obj.id){
            bigString += "<p><strong>ID: </strong> " + obj.id + "</p>";
        }
       
        //add a link to file
        if(obj.fileLink){
            bigString += "<button type='button' id='fileButton'>Open File</button>";
        }      
        
        //add a delete button
        bigString +="<p id='deleteButton'>Delete</p>"
        
        div.innerHTML = bigString;
        
		$("#results").fadeIn(500);
    }
    
    //===ALLOWS USER TO ENTER A NEW BOOKMARK
    function addBib(){
        $.ajax({
          type: "POST",
          url: "~/pythoncode.py",
          data: { param: text}
        }).done(function( o ) {
           // do something
        });
        
        
        addDatabase = document.querySelector('#addDatabase').value;
        addID = document.querySelector('#addID').value;
        
        //create a unique div box for each recipe id
        var divBox = document.createElement('div');
        divBox.id = "bib_" + addID;
        divBox.className = "bookmark";
        //add div to page
        document.querySelector("#results").appendChild(divBox);
        
        bookmarkBody();
    }
    
    //ALLOWS USER TO DELETE CURRENT BOOKMARK BOX
    function deleteBib(){
        
    }
    
    //===SEARCHES LOCAL COMPUTERS TO FIND PATH TO FILE
    function findBib(){
        
    }
    
    
    window.addEventListener("load",init);
})();