// Dapatkan elemen link
const portfolioLink = document.getElementById('portfolio-link');

// Tambahkan event listener saat link diklik
portfolioLink.addEventListener('click', function (event) {
    event.preventDefault(); // Cegah halaman langsung berubah

    // Tambahkan class 'fade-out' untuk memulai transisi
    document.body.classList.add('fade-out');

    // Tunggu sampai transisi selesai (sesuaikan dengan waktu CSS transition)
    setTimeout(function () {
        // Redirect ke halaman portfolio
        window.location.href = portfolioLink.href;
    }, 500); // 500ms sama dengan waktu transisi CSS
});
