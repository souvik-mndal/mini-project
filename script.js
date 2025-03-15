var loco = function(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#wrapper"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#wrapper" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#wrapper", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#wrapper").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
loco()
function loader() {
    var loadertl = gsap.timeline();

    loadertl.from(".line h1", {
        y: 100,
        stagger: 0.32,
        opacity: 0,
        duration: 0.66,
        delay: 0.6
    });
    var counter = document.querySelector("#loader #count h1");
    var num = 0;
    setTimeout(function () {
        var inc = setInterval(function () {
            num++;
            counter.textContent = num;
            if (num === 100) {
                clearInterval(inc);
            }
        }, 26);
    }, 950);

    loadertl.to("#loader .line", {
        opacity: 0,
        duration: 1.2,
        delay: 1.4,
        stagger: 0.2,
        
    });
    loadertl.from("#loader #box",{
        scale: .7,
        duration:.48,
        ease: "none"
    })
    loadertl.from("#page1",{
        scale: .7,
        duration:.48,
        ease: "none"
    })
    loadertl.to(["#loader", "#masking"], {  
        opacity: 0,
        duration: 0.5,
        onComplete: function () {
            document.querySelector("#loader").style.display = "none";  
            document.querySelector("#masking").style.display = "none";  
        }
    });
    
    loadertl.from("#nav-bar",{
        y:-50,
        opacity:0,
        duration:.8
    })
    loadertl.from(".h1cont",{
        y:38,
        opacity:0,
        duration:.5,
        stagger:.2,
        ease:"none"
    })
    // loadertl.to("#wrapper", {
    //     y:"-100vh"        
    // });
}

loader();
function page1(){
    var tl = gsap.timeline({
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#wrapper",
            // markers:true,
            scrub:2,
            start:"top 18%",
             end:"top -15%"
        }
    })
    tl.to("#page1 #hero #one",{
        x:-100,
    },"h1")
    tl.to("#page1 #hero #two",{
        x:85,
    },"h1")
    tl.to("#page1 #engage",{
        width:"97vw",
        height:"92vh"
    },"h1")
    document.getElementById("signup").addEventListener("click", function() {
        window.location.href = "signup.html"; // Change to the actual signup page URL
    });

    document.getElementById("login").addEventListener("click", function() {
        window.location.href = "login.html"; // Change to the actual login page URL
    });
}
page1();
function page2(){
    var tl = gsap.timeline({
        scrollTrigger:{
            trigger:"#page2",
            scroller:"#wrapper",
            // markers:true,
            scrub:2,
            start:"top 70%",
             end:"top 30%"
        }
    })
    tl.to("#page1,#page2",{
        backgroundColor:"white",
        duration:.3
    })    
}
page2();