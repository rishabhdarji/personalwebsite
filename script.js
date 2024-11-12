
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnime(){
    var t1 = gsap.timeline();

    t1.from("#nav",{
        y: "-10",
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut
    })
    .to(".boundingelem",{
        y:0,
        duration:1,
        delay:-0.5,
        ease: Expo.easeInOut,
        stagger:0.2
    })

    .from("#herofooter",{
        y:"-10",
        opacity:0,
        duration:1,
        delay:-0.5,
        ease: Expo.easeInOut,
    })
}

var timeout;
function circleChaptakaro(){
    var xscale=1;
    var yscale=1;

    var xprev=0;
    var yprev=0;
    window.addEventListener("mousemove", function(details){
        clearTimeout(timeout);
        var xdiff = details.clientX - xprev;
        var ydiff = details.clientY - yprev;

        xscale = gsap.utils.clamp(.5,1.5,xdiff);
        yscale = gsap.utils.clamp(.5,1.5,ydiff);

        xprev = details.clientX;
        yprev = details.clientY;
        
        circleMouseFollow(xscale, yscale);
        timeout = setTimeout(() => {
            document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px,${details.clientY}px) scale(1,1)`;
        }, 100);
    });
}
circleChaptakaro();


function circleMouseFollow(xscale, yscale){
    window.addEventListener("mousemove",function(details){
        document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px,${details.clientY}px) scale(${xscale}, ${yscale})`;
    })
}


circleMouseFollow();
firstPageAnime();

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById("current-time").textContent = timeString;
  }

  // Update time every second
  setInterval(updateTime, 1000);

  // Initial call to set the time immediately on page load
  updateTime();
  

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var difference = 0;
    elem.addEventListener("mousemove",function(details){
        var diff = details.clientY - elem.getBoundingClientRect().top;
        difference = details.clientX - rotate;
        rotate = details.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power3, 
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20,20, difference)
        })
    });
    elem.addEventListener("mouseleave",function(details){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            duration:0.5
        })
    });
});


// Toggle navigation menu on small screens
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector("#nav");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
