
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

        //extract all non-zero ratings
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
        //set this value to html element
        console.log(averageRating);

       // Redirect to display.html after processing, including user metrics
        console.log(selectedYear);

        //fill array for books read in each month
        let booksPerMonth = [12]; 
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        for(let i = 0; i < 12; i++){
            booksPerMonth[i] = 0;
        }

        var authors = {};
        let numBooks = 0;
        let popBooks = [];

        data.forEach(function(d) {
            date = d["Date Read"];
            author = d["Author"];
            stars = d["My Rating"];

            if(date.substring(0, 4) == selectedYear){
                let month= +(date.substring(5,7)) - 1;
                booksPerMonth[month] += 1;
            }
            if(date.substring(0, 4) == selectedYear){
                numBooks++;
            }
            if((stars == 5) && (date.substring(0, 4) == selectedYear)){
                popBooks.push(d["Title"]);
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

        // top books read
        let books = "";
        for(let i = 0; i < popBooks.length; i++){
            books += popBooks[i];
            books += "\n";
        }


        
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

        console.log(popBooks[0]);
        console.log(popBooks[1]);

        window.location.href = "display.html?selectedYear=" + selectedYear + "&averageRating=" + averageRating.toFixed(2) + "&topMonth=" + months[maxMonth] + "&numBooks=" + numBooks + "&topAuthor=" + top_author + "&maxTitle=" + maxTitle + "&maxPages=" + maxPages + "&wishList1=" + encodeURIComponent(booksToRead[randIdx1]) + "&wishList2=" + encodeURIComponent(booksToRead[randIdx2]) + "&wishList3=" + encodeURIComponent(booksToRead[randIdx3]) + "&topBook1=" + encodeURIComponent(popBooks[0]) + "&topBook2=" + encodeURIComponent(popBooks[1]) + "&topBook3=" + encodeURIComponent(popBooks[2]);

    };
    
    // Read the uploaded file as text
    reader.readAsText(input);
});


//dynamically filling in year dropdown options
var yearDropdown = document.getElementById("year");
var currYear = new Date().getFullYear();
for (var year = currYear; year >= 2007; year--){
    var option = document.createElement("option");
    option.value = year;
    option.text = year;

    yearDropdown.appendChild(option);
}