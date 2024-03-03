 // get url parameter
 function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    var topBook1 = decodeURIComponent(getUrlParameter('topBook1'));
    var topBook2 = decodeURIComponent(getUrlParameter('topBook2'));
    var topBook3 = decodeURIComponent(getUrlParameter('topBook3'));

    console.log("Top Book 1:", topBook1);
    console.log("Top Book 2:", topBook2);
    console.log("Top Book 3:", topBook3);

    var wishList1 = decodeURIComponent(getUrlParameter('wishList1'));
    var wishList2 = decodeURIComponent(getUrlParameter('wishList2'));
    var wishList3 = decodeURIComponent(getUrlParameter('wishList3'));

     // Function to navigate to another page with parameters
     function goToWishList() {
        // Construct the URL with parameters
        var url = "wish_list.html";
        url += "?wishList1=" + encodeURIComponent(wishList1);
        url += "&wishList2=" + encodeURIComponent(wishList2);
        url += "&wishList3=" + encodeURIComponent(wishList3);
        // Navigate to the other page
        window.location.href = url;
    }

    var top_Book1 = document.getElementById('book1');
    top_Book1.textContent += topBook1;

    var top_Book2 = document.getElementById('book2');
    top_Book2.textContent += topBook2;

    var top_Book3 = document.getElementById('book3');
    top_Book3.textContent += topBook3;