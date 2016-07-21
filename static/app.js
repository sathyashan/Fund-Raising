 $.ajaxSetup({ cache: true });
  $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '1743139629233160',
      version: 'v2.7'
    });     
    $('#loginbutton,#feedbutton').removeAttr('disabled');
    FB.getLoginStatus(updateStatusCallback);
  });

var totalAmount = 1000;
$("#donationAmount").val("");
var updateDataInTheView= function(data){
    var remFundAmt = totalAmount - data.fundedAmt,
        progressPrecent = (((data.fundedAmt/totalAmount) * 100) > 100) ? 100 : ((data.fundedAmt/totalAmount) * 100); //ensuring progress bar max value to be 100
    if(remFundAmt > 0){
        $(".remAmt").html(remFundAmt);
    }else{
        $(".msgBox").html("Fund requirement for this project has met successfully")
    }
    $("#progressIndicator").width(progressPrecent + "%");
    $("#numDonors").html(data.donors);
    if(data.donors > 0){
        $("#donationMessage0").hide();
        $("#donationMessage").show();
    }
}

var donationData = JSON.parse(localStorage.getItem("donation-local-data")) || {fundedAmt: 0, donors: 0};
if(donationData.donors === 0){
    $("#donationMessage").hide();
    $("#donationMessage0").html("Be the first to support this project. Every dollar helps.")
}
updateDataInTheView(donationData);

$("#donationAmount").focus(function () {
    $(".inputContainer").addClass("inputActive");
});

$("#donationAmount").blur(function () {
    $(".inputContainer").removeClass("inputActive");
});
var setToastMessage = function(message){
    var toastMessenger = $("#toastMessenger");
    toastMessenger.html(message);
    toastMessenger.css({"opacity": "1", "bottom": "20px"});
    setTimeout(function(){
        toastMessenger.css({"opacity": "0", "bottom": "0"});
    },2500); 
}
$(".btnDonate").click(function(){
    if(!(donationData.fundedAmt >= 1000)){
        var ipAmt = $("#donationAmount").val();
        //input validation
        if(ipAmt.trim()!="" && (ipAmt == parseInt(ipAmt, 10)) && ipAmt > 0){
            donationData.fundedAmt += parseInt(ipAmt, 10);
            donationData.donors += 1;
            //update view
            updateDataInTheView(donationData);
            localStorage.setItem("donation-local-data", JSON.stringify(donationData));
            setToastMessage("Thanks for your support");
            $("#donationAmount").val("");
        }else{
            //not a valid input
            setToastMessage("Please enter valid input");
        }
    }else{
        //project funded
        setToastMessage("Project Funded. Thanks for your support");
    }
});
$(".btnTellFriends").click(function () {
    FB.ui({
        method: 'share',
        href: 'https://loktra.com',
        quote: 'Yay, I donated!'
    }, function (response) { });
});
$(".btnSave").click(function(){
    setToastMessage("Saved");
});