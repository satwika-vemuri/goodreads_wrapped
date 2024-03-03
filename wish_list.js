
// get url parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // Get data values from url parameters
    var wishList1 = getUrlParameter('wishList1');
    var wishList2 = getUrlParameter('wishList2');
    var wishList3 = getUrlParameter('wishList3');

    var wishList1Heading = document.getElementById('wishList1Heading');
    wishList1Heading.textContent = "1: " + wishList1;
    var wishList2Heading = document.getElementById('wishList2Heading');
    wishList2Heading.textContent = "2: " + wishList2;
    var wishList3Heading = document.getElementById('wishList3Heading');
    wishList3Heading.textContent = "3: " + wishList3;


    console.log(wishList1);
    console.log(wishList2);
    console.log(wishList3);