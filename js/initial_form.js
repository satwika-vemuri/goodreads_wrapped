
// Event listener for form submission
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");
//h1 averageRating element
const averageRatingElement = document.getElementById("averageRating"); // Reference to the heading element
    
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
        const averageRating = d3.mean(ratings);
        averageRatingElement.textContent = "Average Rating: " + averageRating.toFixed(2);
        console.log(averageRating);
        console.log(selectedYear);
        // Now you can use 'data' to create your visualizations
        // For example, you can use D3.js to create charts, graphs, etc.
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