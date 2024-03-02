
// Event listener for form submission
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");
//h1 averageRating element
const averageRatingElement = document.getElementById("averageRating"); // Reference to the heading element
const numBooksElement = document.getElementById("numBooks");
const longestBookElement = document.getElementById("longestBook");
const wishListElement = document.getElementById("wishList");
    
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
        let ratingsIdx = 0;
        data.forEach(function(d) {
            date = d["Date Read"];
            if(ratings[ratingsIdx] != 0 && date.substring(0, 4) == selectedYear){
                ratings_zeroless.unshift(ratings[ratingsIdx]);
            }
            ratingsIdx++;
        });

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
        
                data.forEach(function(d) {
                    date = d["Date Read"];
                    if(date.substring(0, 4) == selectedYear){
                        let month= +(date.substring(5,7)) - 1;
                        booksPerMonth[month] += 1;
                    }
                });
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

        // print out longest book read
        let maxPages = 0;
        let curIdx = 0;
        let maxIdx = 0;
        let maxTitle = "";
        data.forEach(function(d) {
            numPages = d["Number of Pages"];
            date = d["Date Read"];
            if(numPages > maxPages && date.substring(0, 4) == selectedYear){
                maxIdx = curIdx;
                maxPages = numPages;
                maxTitle = d["Title"];
            }
            curIdx++;
        });
        longestBookElement.textContent = "Longest Book Read: " + maxTitle + " (" + maxPages + " Pages!)";
        
        // Wish List Books
        let booksToRead = [];
        // let titles = data.map(d => parseFloat(d["Title"]));
        data.forEach(function(d) {
            toRead = d["Exclusive Shelf"];
            title = d["Title"];
            if(!toRead.localeCompare("to-read")){
                booksToRead.unshift(title);
            }
        });
        // pick 3 random, unique elements of booksToRead
        let randIdx1 = Math.floor(Math.random() * booksToRead.length);
        let randIdx2 = randIdx1;
        while(randIdx2 == randIdx1)
        {
            randIdx2 = Math.floor(Math.random() * booksToRead.length);
        }
        let randIdx3 = randIdx2;
        while(randIdx3 == randIdx1 || randIdx3 == randIdx2)
        {
            randIdx3 = Math.floor(Math.random() * booksToRead.length);
        }
        wishListElement.textContent = "Books on your wish list: " + booksToRead[randIdx1] + booksToRead[randIdx2] + booksToRead[randIdx3];
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