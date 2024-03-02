
// Event listener for form submission
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");
//h1 averageRating element
const averageRatingElement = document.getElementById("averageRating"); // Reference to the heading element
const numBooksElement = document.getElementById("numBooks");
    
myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    //extracting value user submitted for the year
    var selectedYear = document.getElementById("year").value;
    const input = csvFile.files[0];
    const reader = new FileReader();
    
    // When file reading is done
    reader.onload = function (e) {
        const text = e.target.result;
        // Parse CSV data using D3.js
         const data = d3.csvParse(text);

        // Here you can analyze the data and create visualizations
        // For example, let's log the data to the console
        const ratings = data.map(d => parseFloat(d["My Rating"]));
                const ratings_zeroless = [];
                for(let i = 0; i < ratings.length; i++)
                {
                    if(ratings[i] != 0)
                    {
                        ratings_zeroless.unshift(ratings[i]);
                    }
                }
        const averageRating = d3.mean(ratings_zeroless);
        averageRatingElement.textContent = "Average Rating: " + averageRating.toFixed(2);
        console.log(averageRating);
        console.log(selectedYear);
        // Now you can use 'data' to create your visualizations
        // For example, you can use D3.js to create charts, graphs, etc.

                let booksPerMonth = [12]; 
                let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                for(let i = 0; i < 12; i++){
                    booksPerMonth[i] = 0;
                }

                var authors = {};
                console.log(authors["hi"]);
        
                data.forEach(function(d) {
                    date = d["Date Read"];
                    author = d["Author"]

                    if(date.substring(0, 4) == selectedYear){
                        let month= +(date.substring(5,7)) - 1;
                        booksPerMonth[month] += 1;
                    }
                    if(authors[author] == undefined){
                        authors[author] = 1;
                    }
                    else{
                        authors[author] += 1;
                    }
                });
                
                // top month processing 
                let maxMonth = 0;
                for(let i = 0; i < 12; i++){
                    if(booksPerMonth[i] > booksPerMonth[maxMonth]){
                        maxMonth = i;
                    }
                }
                topMonth.textContent = "Top Month: " + months[maxMonth];

                // now print out total books read
                let numBooks = 0;
                data.forEach(function(d) {
                    date = d["Date Read"];
                    if(date.substring(0, 4) == selectedYear){
                        numBooks++;
                    }
                });
                numBooksElement.textContent = "Num Books Read: " + numBooks;

                // author processing

                let top_author = undefined;
                for(var a in authors) {
                    if(top_author == undefined){
                        top_author = a;
                    }
                    else if(authors[a] > authors[top_author]){
                        top_author = a;
                    }
                  
                }
                if(authors[top_author] > 1){
                    topAuthor.textContent = "Top Author: " + top_author;
                }
    };
    
    // Read the uploaded file as text
    reader.readAsText(input);
});

//dynamically filling in year dropdown options
var yearDropdown = document.getElementById("year");
var currYear = new Date().getFullYear();
for (var year = 2007; year <= currYear; year++){
    var option = document.createElement("option");
    option.value = year;
    option.text = year;

    yearDropdown.appendChild(option);
}