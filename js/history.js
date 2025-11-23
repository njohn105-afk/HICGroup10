

function loadSection(section) {
    const content = document.querySelector('.profile-content')
    if (section === "History") {
        console.log("hello");
    }
}

window.onload = function () {
    document.querySelectorAll('.profile-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            loadSection(btn.textContent);
        });
    });
}