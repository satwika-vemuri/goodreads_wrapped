
        // get url parameter
        function getUrlParameter(name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        };

        // Get data values from url parameters
        var averageRating = getUrlParameter('averageRating');
        var year = getUrlParameter('selectedYear');
        var maxMonth = getUrlParameter('topMonth');
        var numBooks = getUrlParameter('numBooks');
        var topAuthor = getUrlParameter('topAuthor');
        var maxTitle = getUrlParameter('maxTitle');
        var maxPages = getUrlParameter('maxPages');

        var wishList1 = decodeURIComponent(getUrlParameter('wishList1'));
        var wishList2 = decodeURIComponent(getUrlParameter('wishList2'));
        var wishList3 = decodeURIComponent(getUrlParameter('wishList3'));

        var topBook1 = decodeURIComponent(getUrlParameter('topBook1'));
        var topBook2 = decodeURIComponent(getUrlParameter('topBook2'));
        var topBook3 = decodeURIComponent(getUrlParameter('topBook3'));

        //check that this worked by console log
        console.log(topBook1);
        console.log(topBook2);
        console.log(topBook3);

        // Function to navigate to another page with parameters
        function goToAnotherPage() {
            // Construct the URL with parameters
           
            var url = "top_books.html";
            url += "?wishList1=" + encodeURIComponent(wishList1);
            url += "&wishList2=" + encodeURIComponent(wishList2);
            url += "&wishList3=" + encodeURIComponent(wishList3);
            url += "&topBook1=" + encodeURIComponent(topBook1);
            url += "&topBook2=" + encodeURIComponent(topBook2);
            url += "&topBook3=" + encodeURIComponent(topBook3);
            // Navigate to the other page
            window.location.href = url;
           // window.location.href = "wish_list.html?selectedYear=" + year + "&averageRating=" + averageRating + "&topMonth=" + maxMonth+ "&numBooks=" + numBooks + "&topAuthor=" + topAuthor + "&maxTitle=" + maxTitle + "&maxPages=" + maxPages + "&wishList1=" + wishList1 + "&wishList2=" + wishList2 + "&wishList3=" + wishList3 + "&topBook1=" + topBook1 + "&topBook2=" + topBook2 + "&topBook3=" + topBook3;

        }


        // Display user's data in the headings
        var averageRatingHeading = document.getElementById('averageRatingHeading');
        averageRatingHeading.textContent += averageRating;

        var numBooksHeading = document.getElementById('numBooks');
        numBooksHeading.textContent += numBooks;

        var topMonthHeading = document.getElementById('topMonth');
        topMonthHeading.textContent += maxMonth;

        var topAuthorHeading = document.getElementById('topAuthor');
        topAuthorHeading.textContent += topAuthor;

        var longestBookHeading = document.getElementById('longestBook');
       longestBookHeading.textContent += maxTitle + ", " + maxPages + " pages!";

       // Function to set image based on month
function setImageForMonth(month) {
    const imgElement = document.getElementById('topMonthImage');
    let imageSrc = '';

    // Determine image source based on month
    switch (month) {
        case 'January':
        case 'February':
        case 'December':
            imageSrc = 'img/snow-flake.png';
            break;
        case 'March':
        case 'April':
        case 'May':
            imageSrc = 'img/flowers.png';
            break;
        case 'June':
        case 'July':
        case 'August':
            imageSrc = 'img/sunny.png';
            break;
        case 'September':
        case 'October':
        case 'November':
            imageSrc = 'img/autumn.png';
            break;
        default:
            // Default image if month doesn't match any case
            imageSrc = 'img/sunny.png';
    }

    // Set image source
    imgElement.src = imageSrc;
}

setImageForMonth(maxMonth);

function setImageForRating(rating) {
    const imgElement = document.getElementById('avgRatingImg');
    let imageSrc = '';

    // Determine image source based on month
    switch (rating) {
        case 1:
            imageSrc = 'img/two.png';
            break;
        case 2:
            imageSrc = 'img/two.png';
            break;
        case 3:
            imageSrc = 'img/stars.png';
            break;
        case 4:
            imageSrc = 'img/ratings.png';
            break;
        case 5:
            imageSrc = 'img/rating.png'
        default:
            // Default image if rating doesn't match any case
            imageSrc = 'img/rating.png';
    }

    // Set image source
    imgElement.src = imageSrc;
}

var avg = parseFloat(averageRating);
var roundedAvg = Math.round(avg);

setImageForRating(roundedAvg);




