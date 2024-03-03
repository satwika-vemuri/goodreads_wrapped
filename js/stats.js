
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
        var wishList1 = getUrlParameter('wishList1');
        var wishList2 = getUrlParameter('wishList2');
        var wishList3 = getUrlParameter('wishList3');
        var topBook1 = getUrlParameter('topBook1');
        var topBook2 = getUrlParameter('topBook2');
        var topBook3 = getUrlParameter('topBook3');

        //check that this worked by console log
        console.log(topBook1);
        console.log(topBook2);
        console.log(topBook3);

        // Function to navigate to another page with parameters
        function goToAnotherPage() {
            // Construct the URL with parameters
            var url = "top_books.html";
            url += "?wishList1=" + wishList1;
            url += "&wishList2=" + wishList2;
            url += "&wishList3=" + wishList3;
            url += "&topBook1=" + topBook1;
            url += "&topBook2=" + topBook2;
            url += "&topBook3=" + topBook3;
            // Navigate to the other page
            window.location.href = url;
        }


        // Display user's data in the headings
        var averageRatingHeading = document.getElementById('averageRatingHeading');
        averageRatingHeading.textContent = "Average Rating: " + averageRating;

        var numBooksHeading = document.getElementById('numBooks');
        numBooksHeading.textContent += numBooks;

        var topMonthHeading = document.getElementById('topMonth');
        topMonthHeading.textContent += maxMonth;

        var topAuthorHeading = document.getElementById('topAuthor');
        topAuthorHeading.textContent += topAuthor;

        var longestBookHeading = document.getElementById('longestBook');
       longestBookHeading.textContent += maxTitle + ", " + maxPages + " pages!";

