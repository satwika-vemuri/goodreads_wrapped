
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

        //extract all non-zero ratings
        const ratings = data.map(d => parseFloat(d["My Rating"]));
        const ratings_zeroless = [];
        for(let i = 0; i < ratings.length; i++)
        {
            if(ratings[i] != 0)
            {
                ratings_zeroless.unshift(ratings[i]);
            }
        }
        //take average of these ratings
        const averageRating = d3.mean(ratings_zeroless);
        //set this value to html element
        averageRatingElement.textContent = "Average Rating: " + averageRating.toFixed(2);
        console.log(averageRating);
        console.log(selectedYear);

        //fill array for books read in each month
        let booksPerMonth = [12]; 
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        for(let i = 0; i < 12; i++){
            booksPerMonth[i] = 0;
        }
        //get values of books read for each month in the year
        data.forEach(function(d) {
        date = d["Date Read"];
        if(date.substring(0, 4) == selectedYear){
            let month= +(date.substring(5,7)) - 1;
            booksPerMonth[month] += 1;
        }
        });
        //determine month with max books read
        let maxMonth = 0;
        for(let i = 0; i < 12; i++){
            if(booksPerMonth[i] > booksPerMonth[maxMonth]){
                maxMonth = i;
            }
        }
       //set this to value of html element
        topMonth.textContent = "Top Month: " + months[maxMonth];

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