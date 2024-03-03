
// Event listener for form submission
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");
const r = document.getElementById("rating-txt");
const a = document.getElementById("author-txt");
const language = document.getElementById("language");
const overall = document.getElementById("overall");
//h1 averageRating element
    
myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let title = (document.getElementById("title")).value;
    let author = (document.getElementById("author")).value;
    let isbn = (document.getElementById("isbn")).value;
    let rating = +((document.getElementById("rating")).value);
    console.log(title);
    console.log(author);
    console.log(isbn);
    console.log("rating: ");
    console.log(rating);

    // Give equal weight too 

    
    const input = csvFile.files[0];
    const reader = new FileReader();
    
    // When file reading is done
    reader.onload = function (e) {
        const text = e.target.result;
        // Parse CSV data using D3.js
         const data = d3.csvParse(text);


        var authors = {};
        let numBooks = 0;
        let popBooks = [];
        // Calculate standard deviation of your rating from general ratings
        total_ratings = 0;
        sum = 0;
        let onlyEnglish = true;
        let authorSeen = false;

        data.forEach(function(d) {
            my_rating = +(d["My Rating"]);
            avg_rating = +(d["Average Rating"]);
            isb_n = d['ISBN'];
            auth = d['Author'];

            if(my_rating != 0){
                total_ratings++;
                sum += Math.abs(avg_rating - my_rating);
            }
            if(((isbn != "") && (isb_n.substring(0,1) != '0') && (isb_n.substring(0,1) != '1'))){
                onlyEnglish = false;
            }
            if(author == auth){
                authorSeen = true;
            }
        });
        
        let std_dev = Math.abs(avg_rating-my_rating);
        let lower_bound = rating-std_dev;
        let upper_bound = rating+std_dev;
        let count = 0;

        if(lower_bound < 0){
            lower_bound = 0;
        }
        if(upper_bound > 5){
            upper_bound = 5;
        }

        if((4 >= lower_bound) && (4 <= upper_bound)){
            r.textContent = "By looking at the books in your library as per how well your ratings coincide with the general GoodReads ratings, we feel like this book might be something you'll rate pretty highly (if you were to make it through).";
            count++;
        }
        else{
            r.textContent = "By looking at the books in your library as per how well your ratings coincide with the general GoodReads ratings, we feel like this book might be something you won't rate super highly. In fact, we think you'd give it less than 4 stars.";
        }

        if(isbn.substring(0,1) > 1){
            if(onlyEnglish){
                language.textContent = "We wanted to point out that your library only has English books. The book you entered isn't English though, so it might not be a great fit for you since you don't seem to have much experience in foreign language books.";
            }
            else{
                count++;
                language.textContent = "We wanted to point out that this is not an English book. However, your library does have other books that are not American/English based books, so you already have some experience with this!";
            }
        }
        else{
            count++;
            language.textContent = "We also wanted to point out that this book is in English, which means you'll most likely understand it.";
        }

        if(authorSeen){
            count++;
            a.textContent = "By the way, you've read books by this author before! Nice to see a familiar face (or in this case, a familiar voice) right?";
        }
        else{
            a.textContent = "By the way, you haven't seen this author before. But maybe you should give something new a shot.";
        }

        if(count == 0){
            overall.textContent = "Taking all these factors into consideration, we feel like you might not like this book. But hey, maybe you should give something new a try!";
        }
        else if((count == 1) || (count == 2)){
            overall.textContent = "Taking all these factors into consideration, we feel like you MIGHT like this book. It definitely has a few things going for it, but it all depends on what you value in literature";
        }
        else{
            overall.textContent = "OMG! New Favorite Book Alert! We really feel like you'd love this book. And who knows, maybe it'll show up on your top books next time around."
        }

        console.log(rating+std_dev);
        console.log(rating-std_dev);
        console.log(onlyEnglish);
        console.log(authorSeen);

    };
    
    // Read the uploaded file as text
    reader.readAsText(input);
});

