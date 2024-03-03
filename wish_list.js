
// get url parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    var wishList1 = getUrlParameter('wishList1');
    var wishList2 = getUrlParameter('wishList2');
    var wishList3 = getUrlParameter('wishList3');

    console.log(wishList1);
    console.log(wishList2);
    console.log(wishList3);

function nextPage() {
    // Construct the URL with parameters
    console.log("hi");
    window.location.href = "prediction.html";
}