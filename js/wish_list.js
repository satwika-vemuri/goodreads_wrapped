

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

        // Function to navigate to another page with parameters


        // Display user's data in the headings
        var wishListHeading1 = document.getElementById('heading1');
        wishListHeading1.textContent += wishList1;
        console.log(wishList1);

        var wishListHeading2 = document.getElementById('heading2');
        wishListHeading2.textContent += wishList2;
        console.log(wishList2);

        var wishListHeading3 = document.getElementById('heading3');
        wishListHeading3.textContent += wishList3;
        console.log(wishList3);

// // get url parameter
// function getUrlParameter(name) {
//     name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
//     var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
//     var results = regex.exec(location.search);
//     return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
//     };

//     console.log(wishList1);
//     console.log(wishList2);
//     console.log(wishList3);

//     // Get data values from url parameters
//     var wishList1 = getUrlParameter('wishList1');
//     var wishList2 = getUrlParameter('wishList2');
//     var wishList3 = getUrlParameter('wishList3');

//     var wishList1Heading = document.getElementById('wishList1Heading');
//     wishList1Heading.textContent = "1: " + wishList1;
//     var wishList2Heading = document.getElementById('wishList2Heading');
//     wishList2Heading.textContent = "2: " + wishList2;
//     var wishList3Heading = document.getElementById('wishList3Heading');
//     wishList3Heading.textContent = "3: " + wishList3;


    

// function nextPage() {
//     // Construct the URL with parameters
//     console.log("hi");
//     var url = "index.html";
//     // Navigate to the other page
//     window.location.href = url;
// }
