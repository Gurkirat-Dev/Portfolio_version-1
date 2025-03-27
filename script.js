gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

const navHandler = () => {
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(CustomEase, ScrollTrigger);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    const links = document.querySelectorAll(".link");
    const socialLinks = document.querySelectorAll(
      ".socials p,.socials a,.time"
    );
    const menuLinks = document.querySelectorAll(".menu a");
    let isAnimating = false;

    const splitTextIntoSpans = (selector) => {
      let elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        let text = element.innerText;
        let splitText = text
          .split("")
          .map(function (char) {
            return `<span>${char === "" ? "&nbsp;&nbsp;" : char}</span>`;
          })
          .join("");
        element.innerHTML = splitText;
      });
    };
    splitTextIntoSpans(".header h1");

    menuToggle.addEventListener("click", () => {
      if (isAnimating) return;
      if (menuToggle.classList.contains("closed")) {
        menuToggle.classList.remove("closed");
        menuToggle.classList.add("opened");
        isAnimating = true;

        gsap.to(menu, {
          clipPath: "polygon(0% 0%,100% 0%, 100% 100% ,0% 100%)",
          ease: "hop",
          duration: 1.5,
          onStart: () => {
            menu.computedStyleMap.pointerEvents = "all";
          },
          onComplete: () => {
            isAnimating = false;
          },
        });

        gsap.to(links, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          delay: 0.85,
          duration: 1,
          ease: "power3.out",
        });

        gsap.to(socialLinks, {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          delay: 0.85,
          duration: 1,
          ease: "power3.out",
        });

        gsap.to(".video-wrapper", {
          clipPath: "polygon(0% 0%,100% 0%,100% 100%, 0% 100%)",
          ease: "hop",
          duration: 1.5,
          delay: 0.5,
        });

        gsap.to(".header h1 span", {
          rotateY: 0,
          stagger: 0.05,
          delay: 0.75,
          duration: 1.5,
          ease: "power4.out",
        });

        gsap.to(".header h1 span", {
          y: 0,
          scale: 1,
          stagger: 0.05,
          delay: 0.5,
          duration: 1.5,
          ease: "power4.out",
        });

        const displayTime = () => {
          const timeElement = document.querySelector(".time"); // Get the element once

          if (!timeElement) return; // Prevent errors if element is missing

          const updateClock = () => {
            const date = new Date();
            timeElement.innerHTML = date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
          };

          updateClock(); // Show time immediately
          setInterval(updateClock, 10000); // Update every minute
        };

        displayTime();
      } else {
        menuToggle.classList.remove("opened");
        menuToggle.classList.add("closed");
        isAnimating = true;
        gsap.to(menu, {
          clipPath: "polygon(0% 0%,100% 0%,100% 0%, 0% 0%)",
          ease: "hop",
          duration: 1.5,
          onComplete: () => {
            menu.style.pointerEvents = "all";
            gsap.set(menu, {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            });
            gsap.set(links, { y: 30, opacity: 0 });
            gsap.set(socialLinks, { y: 30, opacity: 0 });
            gsap.set(".video-wrapper", {
              clipPath: "polygon(0% 100%, 100% 100%,100% 100%,0% 100%)",
            });
            gsap.set(".header h1 span", {
              y: 500,
              rotateY: 90,
              scale: 0.75,
            });
            isAnimating = false;
          },
        });
      }
      menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
          if (isAnimating) return;
          menuToggle.classList.remove("opened");
          menuToggle.classList.add("closed");
          isAnimating = true;
          gsap.to(menu, {
            clipPath: "polygon(0% 0%,100% 0%,100% 0%, 0% 0%)",
            ease: "hop",
            duration: 1.5,
            onStart: () => {
              menu.style.pointerEvents = "all"; // Disable pointer events when closing
            },
            onComplete: () => {
              menu.style.pointerEvents = "all"; // Ensure pointer events remain disabled during closing
              gsap.set(menu, {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              });
              gsap.set(links, { y: 30, opacity: 0 });
              gsap.set(socialLinks, { y: 30, opacity: 0 });
              gsap.set(".video-wrapper", {
                clipPath: "polygon(0% 100%, 100% 100%,100% 100%,0% 100%)",
              });
              gsap.set(".header h1 span", {
                y: 500,
                rotateY: 90,
                scale: 0.75,
              });
              isAnimating = false;
            },
          });
        });
      });
    });
  });
};

const pinAnimation = () => {
  let projectsContainer = document.querySelector(".projects");
  let totalWidth = projectsContainer.scrollWidth - window.innerWidth;

  gsap.to(projectsContainer, {
    x: -totalWidth,
    ease: "none",
    scrollTrigger: {
      trigger: ".projects",
      start: "top top",
      end: () => `+=${totalWidth}`,
      pin: true,
      scrub: true,
    },
  });
};

navHandler();

pinAnimation();
