const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;
function firstPageAnim(){
    var t1= gsap.timeline();

    t1.from("#nav",{
        y:'-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    .to(".boundingelem",{
        y:0,
        ease: Expo.easeInOut,
        duration: 2,
        delay:-1,
        stagger: .2  // for delay
    })

    .from("#herofooter",{
        y:'-10',
        opacity:0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}


// jab mouse move ho to hum log skew(chapta) kar paye aur max and min skew define kar paye, jab mouse move ho to chapta ki value badhe, aur jab mouse chalna band ho jaye to chapta hata lo

function circlechaptakaro(){
    var xscale=1;
    var yscale=1;

    var xprev=0;
    var yprev=0;

    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        var xdiff= dets.clientX- xprev;
        var ydiff= dets.clientY-yprev;


        xscale= gsap.utils.clamp(0.7,1.3,xdiff);
        yscale= gsap.utils.clamp(0.7,1.3,ydiff); 

        xprev= dets.clientX;
        yprev= dets.clientY;
        circleMouseFollower(xscale, yscale);
       
         // for back to original positon of circle after stopping
         // jab hm move krna band kare, ye code tab chale
         timeout= setTimeout(function (){
            document.querySelector(".minicircle").style.transform=`translate(${dets.clientX}px , ${dets.clientY}px ) scale(1,1)`;
         },100);
        
    });
}


function circleMouseFollower(xscale,yscale){
window.addEventListener("mousemove",function(dets){
    document.querySelector(".minicircle").style.transform=`translate(${dets.clientX}px , ${dets.clientY}px ) scale(${xscale}, ${yscale})`;
})

}
circleMouseFollower();
firstPageAnim();
circlechaptakaro();


//teeno element to select karo, uske baad teeno pr ek mousemove lagao, jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki x and y position pata karo, ab mouse ki x and y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye

 document.querySelectorAll(".element").forEach(function(element){

    var rotate=0;
    var diffrot=0;

    element.addEventListener("mouseleave",function(details){

       gsap.to(element.querySelector("img"),{
           opacity:0,
           ease: Power3,
           duration:0.5
       });
   });

    element.addEventListener("mousemove",function(details){
         //the plug ki div ki height ki range ke liye
         var diff= details.clientY- element.getBoundingClientRect().top; 

         diffrot= details.clientX -rotate;
        rotate= details.clientX;
        
        
        
        // console.log(details.clientX, details.clientY);
        gsap.to(element.querySelector("img"),{
            opacity:1,
            ease: Power3,
             top:diff,
             left:details.clientX,
             rotate: gsap.utils.clamp(-20, 20,diffrot)
        });
    });
 })