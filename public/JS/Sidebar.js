const Navbar = document.querySelector("nav"),
    TomboMenu = document.querySelectorAll(".menu-icon"),
    Hamparan = document.querySelector(".container");

TomboMenu.forEach((TomboMenu) => {
    TomboMenu.addEventListener("click", () => {
        Navbar.classList.toggle("open");
    })
});

Hamparan.addEventListener("click", () => {
    Navbar.classList.remove("open");
});