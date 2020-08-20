$('.warp').width(screen.width);

new WOW().init();

$(document).ready(function() {
    $('.showmenu').on('click',  function(e){
       e.preventDefault();
       $('body').toggleClass('menu-show');
   });
 });

$(window).on('scroll',function(){
    if($(window).scrollTop()){
        $('nav').addClass('white');
    }
    else{
        $('nav').removeClass('white');
        $('nav').addClass('navset');
    }
})

// var turnplace3 = () => {
//     document.getElementById('place1').style.display = "none";
//     document.getElementById('place2').style.display = "none";
//     document.getElementById('place3').style.display = "flex";
// }