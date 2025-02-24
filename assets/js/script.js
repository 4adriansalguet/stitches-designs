// Nav Scroll Effect 

    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });


// Slider Section 

    document.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll(".slider-section").forEach((slider) => {
            const wrapper = slider.querySelector(".wrapper");
            const images = Array.from(wrapper.querySelectorAll("img"));
            const prevBtn = slider.querySelector(".prev-btn");
            const nextBtn = slider.querySelector(".next-btn");
            let isDragging = false,
                startX, startScroll;

            // Duplicate images for infinite loop
            images.forEach((img) => {
                let clone = img.cloneNode(true);
                wrapper.appendChild(clone);
            });

            function startDrag(e) {
                isDragging = true;
                startX = e.pageX || e.touches[0].pageX;
                startScroll = wrapper.scrollLeft;
                wrapper.style.cursor = "grabbing";
            }

            function moveDrag(e) {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.pageX || e.touches[0].pageX;
                const moveX = x - startX;
                wrapper.scrollLeft = startScroll - moveX;
            }

            function stopDrag() {
                isDragging = false;
                wrapper.style.cursor = "grab";
            }

            function scrollNext() {
                if (wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth / 2 - images[0].clientWidth) {
                    const firstImage = wrapper.querySelector(".img-fade");
                    if (firstImage) {
                        firstImage.style.transition = "opacity 1s ease-in-out";
                        firstImage.style.opacity = "0";
                    }
                    setTimeout(() => {
                        wrapper.scrollLeft = 0;
                        if (firstImage) {
                            firstImage.style.opacity = "1";
                        }
                    }, 1000);
                } else {
                    wrapper.style.transition = "transform 0.5s ease-in-out";
                    wrapper.scrollLeft += images[0].clientWidth;
                }
            }

            function scrollPrev() {
                if (wrapper.scrollLeft <= 0) {
                    wrapper.style.transition = "none";
                    wrapper.scrollLeft = wrapper.scrollWidth / 2 - images[0].clientWidth;
                } else {
                    wrapper.style.transition = "transform 0.5s ease-in-out";
                    wrapper.scrollLeft -= images[0].clientWidth;
                }
            }

            function autoScroll() {
                scrollNext();
            }

            let autoPlay = setInterval(autoScroll, 3000);

            wrapper.addEventListener("mousedown", startDrag);
            wrapper.addEventListener("mousemove", moveDrag);
            wrapper.addEventListener("mouseup", stopDrag);
            wrapper.addEventListener("mouseleave", stopDrag);

            wrapper.addEventListener("touchstart", startDrag);
            wrapper.addEventListener("touchmove", moveDrag);
            wrapper.addEventListener("touchend", stopDrag);

            prevBtn.addEventListener("click", scrollPrev);
            nextBtn.addEventListener("click", scrollNext);

            wrapper.addEventListener("mouseenter", () => clearInterval(autoPlay));
            wrapper.addEventListener("mouseleave", () => autoPlay = setInterval(autoScroll, 3000));
        });
    });

// Responsive

    document.addEventListener("DOMContentLoaded", function() {
        const menuToggle = document.querySelector(".menu-toggle");
        const menu = document.querySelector(".menu");
        const toggleIcon = menuToggle.querySelector("img");
        const logo = document.querySelector(".logo");

        menuToggle.addEventListener("click", function() {
            menu.classList.toggle("show");
            logo.classList.toggle("move-left"); // Toggle class to move logo
            toggleIcon.src = menu.classList.contains("show") ?
                "./public/images/close.png" :
                "./public/images/toggle.png";
        });
    });
