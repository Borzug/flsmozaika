export const changeLayout = () => {
    if (window.innerWidth > 768) {
        window.document.querySelector("#menu-links")!.classList.add("show");
    }

};

export const toggleScrollToTop = () => {
    if (window.scrollY > 1000) {
        document.querySelector(".up-arrow")!.classList.remove("d-none");
    } else {
        document.querySelector(".up-arrow")!.classList.add("d-none");
    }
};
