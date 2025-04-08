document.addEventListener("DOMContentLoaded", () => {
    const text = "Portfólio";
    const container = document.getElementById("portfolio");

    text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.classList.add("letter");
        span.style.animationDelay = `${index * 0.2}s`;
        container.appendChild(span);
    });
});

