/* =========================================
   KNOWMATE - APP.JS
   ========================================= */


/* =========================================
   DATA MATA KULIAH PSIKOLOGI
   ========================================= */

const psychologyCourses = {
    1: [
        "Pengantar Psikologi",
        "Psikologi Islam",
        "Pendidikan Agama Islam",
        "Bahasa Indonesia",
        "Bahasa Inggris"
    ],

    2: [
        "Psikologi Perkembangan",
        "Psikologi Kepribadian",
        "Psikologi Sosial",
        "Statistika Dasar",
        "Filsafat Ilmu"
    ],

    3: [
        "Psikologi Kognitif",
        "Psikologi Belajar",
        "Psikologi Eksperimen",
        "Metodologi Penelitian",
        "Psikometri"
    ],

    4: [
        "Psikologi Klinis",
        "Psikologi Pendidikan",
        "Psikologi Industri dan Organisasi",
        "Asesmen Psikologi",
        "Konseling"
    ],

    5: [
        "Psikologi Abnormal",
        "Psikologi Kesehatan",
        "Psikologi Agama",
        "Intervensi Psikologi",
        "Observasi dan Wawancara"
    ],

    6: [
        "Psikodiagnostik",
        "Intervensi Komunitas",
        "Konseling Islam",
        "Seminar Psikologi",
        "Penelitian Kuantitatif"
    ],

    7: [
        "Praktikum Psikologi",
        "Seminar Proposal",
        "KKN",
        "Magang",
        "Persiapan Skripsi"
    ]
};


/* =========================================
   HELPER
   ========================================= */

function getUser() {
    const userData = localStorage.getItem("knowmateUser");

    if (!userData) {
        return null;
    }

    try {
        return JSON.parse(userData);
    } catch (error) {
        return null;
    }
}


function isLoggedIn() {
    return localStorage.getItem("knowmateLoggedIn") === "true";
}


/* =========================================
   HALAMAN LOGIN
   ========================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("loginPassword")
            .value;

        const savedUser = getUser();


        if (!savedUser) {

            alert(
                "Akun belum ditemukan. Silakan daftar terlebih dahulu."
            );

            return;
        }


        if (
            email !== savedUser.email.toLowerCase() ||
            password !== savedUser.password
        ) {

            alert(
                "Email atau password yang kamu masukkan salah."
            );

            return;
        }


        localStorage.setItem(
            "knowmateLoggedIn",
            "true"
        );


        window.location.href = "dashboard.html";

    });

}


/* =========================================
   HALAMAN REGISTER
   ========================================= */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name = document
            .getElementById("registerName")
            .value
            .trim();

        const nim = document
            .getElementById("registerNim")
            .value
            .trim();

        const email = document
            .getElementById("registerEmail")
            .value
            .trim()
            .toLowerCase();

        const university = document
            .getElementById("registerUniversity")
            .value
            .trim();

        const study = document
            .getElementById("registerStudy")
            .value
            .trim();

        const semester = document
            .getElementById("registerSemester")
            .value;

        const password = document
            .getElementById("registerPassword")
            .value;

        const confirmPassword = document
            .getElementById("registerConfirmPassword")
            .value;


        /* VALIDASI PASSWORD */

        if (password !== confirmPassword) {

            alert(
                "Konfirmasi password tidak sama."
            );

            return;
        }


        if (password.length < 6) {

            alert(
                "Password minimal 6 karakter."
            );

            return;
        }


        /* CEK AKUN LAMA */

        const savedUser = getUser();

        if (
            savedUser &&
            savedUser.email.toLowerCase() === email
        ) {

            alert(
                "Email tersebut sudah terdaftar. Silakan masuk."
            );

            window.location.href = "login.html";

            return;
        }


        /* SIMPAN DATA USER */

        const userData = {

            name: name,

            nim: nim,

            email: email,

            university: university,

            study: study,

            semester: semester,

            password: password

        };


        localStorage.setItem(
            "knowmateUser",
            JSON.stringify(userData)
        );


        /* AKUN BELUM LOGIN */

        localStorage.setItem(
            "knowmateLoggedIn",
            "false"
        );


        alert(
            "Pendaftaran berhasil. Silakan masuk menggunakan akunmu."
        );


        window.location.href = "login.html";

    });

}


/* =========================================
   PROTEKSI DASHBOARD
   ========================================= */

const isDashboard =
    window.location.pathname.endsWith("dashboard.html");


if (isDashboard && !isLoggedIn()) {

    alert(
        "Silakan masuk atau daftar terlebih dahulu."
    );

    window.location.href = "login.html";
}


/* =========================================
   TAMPILKAN NAMA USER
   ========================================= */

const userNameElement =
    document.getElementById("userName");


if (userNameElement) {

    const user = getUser();

    if (user) {

        const firstName =
            user.name.split(" ")[0];

        userNameElement.textContent =
            firstName;

    }

}


/* =========================================
   PROGRAM STUDI, MATA KULIAH & SEARCH
   ========================================= */

const programStudy = document.getElementById("programStudy");
const courseSelect = document.getElementById("course");

const semesterButtons = document.querySelectorAll(".semester-button");
const searchButton = document.getElementById("searchButton");

// Pilih semester jika tombol diklik.
// Jika tidak ada semester aktif, pencarian tetap bisa berjalan.
semesterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        semesterButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");
    });
});

// Pencarian
if (searchButton) {
    searchButton.addEventListener("click", function () {
        const study = programStudy
            ? programStudy.value.trim()
            : "";

        const course = courseSelect
            ? courseSelect.value.trim()
            : "";

        const activeSemester = document.querySelector(
            ".semester-button.active"
        );

        const semester = activeSemester
            ? activeSemester.dataset.semester
            : "";

        if (!study) {
            alert("Silakan ketik program studi terlebih dahulu.");
            return;
        }

        if (!course) {
            alert("Silakan ketik mata kuliah terlebih dahulu.");
            return;
        }

        const searchData = {
            study: study,
            semester: semester,
            course: course
        };

        localStorage.setItem(
            "knowmateSearch",
            JSON.stringify(searchData)
        );

        window.location.href = "results.html";
    });
}


/* =========================================
   LOGOUT
   ========================================= */

const logoutButtons =
    document.querySelectorAll(
        '[href="index.html"]'
    );


logoutButtons.forEach(
    function(button) {

        const text =
            button.textContent
                .trim()
                .toLowerCase();


        if (text.includes("keluar")) {

            button.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();


                    localStorage.removeItem(
                        "knowmateLoggedIn"
                    );


                    window.location.href =
                        "index.html";

                }
            );

        }

    }
);


/* =========================================
   MOBILE SIDEBAR
   ========================================= */

const menuButton =
    document.querySelector(".menu-button");

const sidebar =
    document.querySelector(".sidebar");


if (menuButton && sidebar) {

    menuButton.addEventListener(
        "click",
        function() {

            sidebar.classList.toggle("show");

        }
    );

}


/* =========================================
   BOOK CARD
   ========================================= */

const bookCards =
    document.querySelectorAll(".book-card");


bookCards.forEach(
    function(card) {

        card.addEventListener(
            "click",
            function() {

                console.log(
                    "Book card clicked"
                );

            }
        );

    }
);

/* =========================================
   TAMBAH REFERENSI
   ========================================= */

const openReferenceModal =
    document.getElementById("openReferenceModal");

const referenceModal =
    document.getElementById("referenceModal");

const closeReferenceModal =
    document.getElementById("closeReferenceModal");

const cancelReferenceModal =
    document.getElementById("cancelReferenceModal");

const referenceForm =
    document.getElementById("referenceForm");


function closeReference() {

    if (referenceModal) {
        referenceModal.classList.remove("show");
    }

}


if (openReferenceModal) {

    openReferenceModal.addEventListener(
        "click",
        function() {

            referenceModal.classList.add("show");

        }
    );

}


if (closeReferenceModal) {

    closeReferenceModal.addEventListener(
        "click",
        closeReference
    );

}


if (cancelReferenceModal) {

    cancelReferenceModal.addEventListener(
        "click",
        closeReference
    );

}


/* KLIK DI LUAR MODAL */

if (referenceModal) {

    referenceModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target === referenceModal
            ) {

                closeReference();

            }

        }
    );

}


/* SIMPAN REFERENSI */

if (referenceForm) {

    referenceForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const reference = {

                study:
                    document.getElementById(
                        "referenceStudy"
                    ).value.trim(),

                course:
                    document.getElementById(
                        "referenceCourse"
                    ).value.trim(),

                title:
                    document.getElementById(
                        "referenceTitle"
                    ).value.trim(),

                author:
                    document.getElementById(
                        "referenceAuthor"
                    ).value.trim(),

                year:
                    document.getElementById(
                        "referenceYear"
                    ).value.trim(),

                edition:
                    document.getElementById(
                        "referenceEdition"
                    ).value.trim(),

                publisher:
                    document.getElementById(
                        "referencePublisher"
                    ).value.trim(),

                city:
                    document.getElementById(
                        "referenceCity"
                    ).value.trim(),

                url:
                    document.getElementById(
                        "referenceUrl"
                    ).value.trim(),

                description:
                    document.getElementById(
                        "referenceDescription"
                    ).value.trim(),

                status:
                    "Menunggu Verifikasi",

                createdAt:
                    new Date().toISOString()

            };


            /* AMBIL DATA REFERENSI LAMA */

            let references =
                JSON.parse(
                    localStorage.getItem(
                        "knowmateReferences"
                    )
                ) || [];


            references.push(reference);


            localStorage.setItem(
                "knowmateReferences",
                JSON.stringify(references)
            );


            alert(
                "Referensi berhasil dikirim dan sedang menunggu verifikasi."
            );


            referenceForm.reset();

            closeReference();

        }
    );

}

/* =========================================
   RUANG DISKUSI - KIRIM PESAN
   ========================================= */

const chatInput =
    document.getElementById("chatInput");

const chatSendButton =
    document.getElementById("chatSendButton");

const discussionMessages =
    document.querySelector(".discussion-messages");


function getCurrentTime() {

    const now = new Date();

    return now.toLocaleTimeString(
        "id-ID",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


function sendTextMessage() {

    if (!chatInput || !discussionMessages) {
        return;
    }

    const text =
        chatInput.value.trim();

    if (!text) {
        return;
    }

    const messageRow =
        document.createElement("div");

    messageRow.className =
        "message-row my-message-row";

    messageRow.innerHTML = `

        <div class="my-message-time">
            ${getCurrentTime()}
        </div>

        <div class="message-bubble my-message">

            <strong>
                Kamu
            </strong>

            ${escapeHTML(text)}

        </div>

    `;

    discussionMessages.appendChild(
        messageRow
    );

    chatInput.value = "";

    discussionMessages.scrollTop =
        discussionMessages.scrollHeight;

}


if (chatSendButton) {

    chatSendButton.addEventListener(
        "click",
        sendTextMessage
    );

}


if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                sendTextMessage();

            }

        }
    );

}


/* =========================================
   SIDEBAR TOGGLE - DESKTOP DAN HP
   ========================================= */

document.addEventListener("click", function (event) {
    const clickedButton = event.target.closest(
        "#sidebarToggle, .menu-button"
    );

    if (!clickedButton) return;

    const sidebar = document.getElementById("mainSidebar");
    const content = document.querySelector(".main-content");

    if (!sidebar) {
        console.error("Sidebar #mainSidebar tidak ditemukan.");
        return;
    }

    // Tampilan HP: geser sidebar masuk/keluar
    if (window.matchMedia("(max-width: 700px)").matches) {
        sidebar.classList.toggle("open");
        return;
    }

    // Tampilan desktop: kecilkan/besarkan sidebar
    const collapsed = sidebar.classList.toggle(
        "sidebar-collapsed"
    );

    if (content) {
        content.classList.toggle(
            "sidebar-content-collapsed",
            collapsed
        );
    }
});


/* =========================================
   FITUR BUKU TERSIMPAN
   ========================================= */

function getSavedBooks() {
    try {
        return JSON.parse(
            localStorage.getItem("knowmateSavedBooks")
        ) || [];
    } catch (error) {
        return [];
    }
}

function saveBooksToStorage(books) {
    localStorage.setItem(
        "knowmateSavedBooks",
        JSON.stringify(books)
    );
}

function initializeBookBookmarks() {
    const cards = document.querySelectorAll(
        ".book-card, .reference-card"
    );

    const savedBooks = getSavedBooks();

    cards.forEach(function (card) {
        // Hindari membuat tombol dua kali
        if (card.querySelector(".save-book-button")) {
            return;
        }

        const titleElement = card.querySelector(
            ".book-information h3, .reference-info h3"
        );

        if (!titleElement) return;

        const authorElement = card.querySelector(
            ".book-information p, .reference-author"
        );

        const descriptionElement = card.querySelector(
            ".reference-description"
        );

        const yearElement = card.querySelector(
            ".book-information span"
        );

        const coverElement = card.querySelector(
            ".book-cover, .reference-cover"
        );

        const detailLink = card.querySelector(
            ".reference-button"
        );

        const book = {
            id: (
                titleElement.textContent.trim() + "|" +
                (authorElement?.textContent.trim() || "")
            ).toLowerCase(),

            title: titleElement.textContent.trim(),

            author: authorElement
                ? authorElement.textContent.trim()
                : "Penulis belum dicantumkan",

            year: yearElement
                ? yearElement.textContent.trim()
                : "",

            description: descriptionElement
                ? descriptionElement.textContent.trim()
                : "",

            coverClass: coverElement
                ? Array.from(coverElement.classList).find(
                    name => name.startsWith("cover-")
                ) || "cover-purple"
                : "cover-purple",

            detailUrl: detailLink
                ? detailLink.getAttribute("href")
                : "detail.html"
        };

        const button = document.createElement("button");

        button.type = "button";
        button.className = "save-book-button";
        button.setAttribute(
            "aria-label",
            "Simpan buku"
        );

        function updateButton() {
            const isSaved = getSavedBooks().some(
                item => item.id === book.id
            );

            button.classList.toggle("is-saved", isSaved);

            button.textContent = isSaved ? "🔖" : "♧";

            button.title = isSaved
                ? "Hapus dari Buku Tersimpan"
                : "Simpan Buku";
        }

        button.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            let books = getSavedBooks();

            const index = books.findIndex(
                item => item.id === book.id
            );

            if (index >= 0) {
                books.splice(index, 1);
            } else {
                books.push(book);
            }

            saveBooksToStorage(books);
            updateButton();
        });

        card.appendChild(button);
        updateButton();
    });
}

initializeBookBookmarks();

/* =========================================
   TAMPILKAN BUKU TERSIMPAN
   ========================================= */

function renderSavedBooks() {
    const container = document.getElementById("savedBookContainer");
    const emptyMessage = document.getElementById("savedBooksEmpty");
    const countLabel = document.getElementById("savedBookCount");

    // Fungsi hanya berjalan di halaman Buku Tersimpan
    if (!container || !emptyMessage || !countLabel) {
        return;
    }

    let books = [];

    try {
        books = JSON.parse(
            localStorage.getItem("knowmateSavedBooks")
        ) || [];
    } catch (error) {
        books = [];
    }

    container.innerHTML = "";

    countLabel.textContent = books.length + " buku";

    emptyMessage.style.display =
        books.length === 0 ? "block" : "none";

    container.style.display =
        books.length === 0 ? "none" : "grid";

    books.forEach(function (book) {
        const card = document.createElement("article");
        card.className = "book-card";

        const cover = document.createElement("div");
        cover.className = "book-cover " +
            (book.coverClass || "cover-purple");

        cover.innerHTML = `
            <div class="book-design">
                <div class="book-line line-one"></div>
                <div class="book-line line-two"></div>
            </div>
        `;

        const info = document.createElement("div");
        info.className = "book-information";

        const title = document.createElement("h3");
        title.textContent = book.title || "Tanpa Judul";

        const author = document.createElement("p");
        author.textContent = book.author || "Penulis tidak diketahui";

        const year = document.createElement("span");
        year.textContent = book.year || "Referensi";

        info.append(title, author, year);

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "save-book-button is-saved";
        removeButton.textContent = "🔖";
        removeButton.title = "Hapus dari Buku Tersimpan";
        removeButton.setAttribute(
            "aria-label",
            "Hapus " + (book.title || "buku") + " dari koleksi"
        );

        removeButton.addEventListener("click", function () {
            const updatedBooks = books.filter(
                item => item.id !== book.id
            );

            localStorage.setItem(
                "knowmateSavedBooks",
                JSON.stringify(updatedBooks)
            );

            renderSavedBooks();
        });

        card.append(cover, info, removeButton);
        container.appendChild(card);
    });
}

renderSavedBooks();

/* ===== FITUR EDIT PROFIL KNOWMATE ===== */
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("editProfileModal");

    // Jalankan hanya pada halaman yang memiliki modal profil
   
if (!modal) {
    console.error("Modal Edit Profil tidak ditemukan.");
    return;
}

    const openButton = document.getElementById("openEditProfile");
    const closeButton = document.getElementById("closeEditProfile");
    const cancelButton = document.getElementById("cancelEditProfile");
    const form = document.getElementById("editProfileForm");

    const avatarPreview = document.getElementById("editAvatarPreview");
    const profileAvatar = document.getElementById("profileAvatarImage");
    const profileName = document.getElementById("profileDisplayName");
    const profileStudy = document.getElementById("profileDisplayStudy");
    const feedback = document.getElementById("editProfileFeedback");

    const nameInput = document.getElementById("editProfileName");
    const emailInput = document.getElementById("editProfileEmail");
    const studyInput = document.getElementById("editProfileStudy");
    const semesterInput = document.getElementById("editProfileSemester");
    const universityInput = document.getElementById("editProfileUniversity");

    const storageKey = "knowmateProfile";
    let selectedAvatar = "assets/avatars/avatar-1.png";

    const defaultProfile = {
        name: "Nama Mahasiswa",
        email: "",
        study: "Psikologi Islam",
        semester: "1",
        university: "UIN Raden Fatah Palembang",
        avatar: "assets/avatars/avatar-1.png"
    };

    function getProfile() {
        try {
            const saved = localStorage.getItem(storageKey);
            return saved ? { ...defaultProfile, ...JSON.parse(saved) } : { ...defaultProfile };
        } catch (error) {
            return { ...defaultProfile };
        }
    }

    function showProfile() {
        const profile = getProfile();

        profileName.textContent = profile.name;
        profileStudy.textContent =
            `${profile.study} - Semester ${profile.semester}`;

        profileAvatar.src = profile.avatar;
        profileAvatar.onerror = function () {
            this.onerror = null;
            this.src = "assets/avatars/avatar-1.png";
        };
    }

    function openModal() {
        const profile = getProfile();

        nameInput.value = profile.name;
        emailInput.value = profile.email;
        studyInput.value = profile.study;
        semesterInput.value = profile.semester;
        universityInput.value = profile.university;

        selectedAvatar = profile.avatar;
        avatarPreview.src = selectedAvatar;
        feedback.textContent = "";

        document.querySelectorAll(".avatar-option").forEach(function (button) {
            button.classList.toggle(
                "selected",
                button.dataset.avatar === selectedAvatar
            );
        });

        modal.classList.add("active");
    }

    function closeModal() {
        modal.classList.remove("active");
        feedback.textContent = "";
    }

    openButton?.addEventListener("click", openModal);
    closeButton?.addEventListener("click", closeModal);
    cancelButton?.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });

    document.querySelectorAll(".avatar-option").forEach(function (button) {
        button.addEventListener("click", function () {
            selectedAvatar = button.dataset.avatar;
            avatarPreview.src = selectedAvatar;

            document.querySelectorAll(".avatar-option").forEach(function (item) {
                item.classList.remove("selected");
            });

            button.classList.add("selected");
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const profile = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            study: studyInput.value.trim(),
            semester: semesterInput.value,
            university: universityInput.value.trim(),
            avatar: selectedAvatar
        };

        if (
            !profile.name ||
            !profile.email ||
            !profile.study ||
            !profile.semester ||
            !profile.university
        ) {
            feedback.textContent = "Semua kolom wajib diisi.";
            return;
        }

        try {
            localStorage.setItem(storageKey, JSON.stringify(profile));
            showProfile();
            closeModal();
        } catch (error) {
            feedback.textContent = "Profil gagal disimpan. Coba lagi.";
        }
    });

    showProfile();
    
    // ===== KONEKSI TOMBOL UBAH PASSWORD =====
    const openPasswordButton = document.getElementById("openChangePassword");
    const passwordModal = document.getElementById("changePasswordModal");
    const closePasswordButton = document.getElementById("closeChangePassword");
    const cancelPasswordButton = document.getElementById("cancelChangePassword");

    openPasswordButton?.addEventListener("click", function () {
        passwordModal?.classList.add("active");
    });

    closePasswordButton?.addEventListener("click", function () {
        passwordModal?.classList.remove("active");
    });

    cancelPasswordButton?.addEventListener("click", function () {
        passwordModal?.classList.remove("active");
    });

    passwordModal?.addEventListener("click", function (event) {
        if (event.target === passwordModal) {
            passwordModal.classList.remove("active");
        }
    });

});

/* =========================================
   TAMPILKAN FILTER PENCARIAN DI HASIL
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const resultStudy = document.getElementById("resultStudy");
    const resultSemester = document.getElementById("resultSemester");
    const resultCourse = document.getElementById("resultCourse");
    const searchDescription = document.getElementById("searchDescription");

    // Elemen ini hanya tersedia di halaman hasil pencarian
    if (!resultStudy || !resultSemester || !resultCourse) return;

    let searchData = {};

    try {
        searchData = JSON.parse(
            localStorage.getItem("knowmateSearch") || "{}"
        );
    } catch (error) {
        searchData = {};
    }

    resultStudy.textContent = searchData.study || "Semua Program Studi";
    resultCourse.textContent = searchData.course || "Semua Mata Kuliah";

    if (searchData.semester) {
        resultSemester.textContent = "Semester " + searchData.semester;
    } else {
        resultSemester.textContent = "Semester 1–7";
    }

    if (searchDescription) {
        searchDescription.textContent = searchData.semester
            ? "Referensi berdasarkan program studi, mata kuliah, dan semester yang dipilih."
            : "Referensi dari Semester 1 sampai 7 berdasarkan pencarianmu.";
    }
});

/* =========================================
   KNOWMATE - ARTIKEL JURNAL
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const grid = document.getElementById("journalsGrid");
    const modal = document.getElementById("journalModal");

    // Berhenti jika halaman bukan halaman Artikel Jurnal
    if (!grid || !modal) return;

    const form = document.getElementById("journalForm");
    const openButton = document.getElementById("openAddJournal");
    const emptyOpenButton = document.getElementById("emptyAddJournal");
    const closeButton = document.getElementById("closeJournalModal");
    const cancelButton = document.getElementById("cancelJournalModal");
    const searchInput = document.getElementById("journalSearchInput");
    const searchButton = document.getElementById("journalSearchButton");
    const emptyState = document.getElementById("journalsEmpty");
    const countLabel = document.getElementById("journalCount");
    const feedback = document.getElementById("journalFormFeedback");

    const fields = {
        title: document.getElementById("journalTitle"),
        authors: document.getElementById("journalAuthors"),
        journal: document.getElementById("journalName"),
        year: document.getElementById("journalYear"),
        volume: document.getElementById("journalVolume"),
        issue: document.getElementById("journalIssue"),
        pages: document.getElementById("journalPages"),
        doi: document.getElementById("journalDOI")
    };

    const articleKey = "knowmateJournalArticles";
    const bookmarkKey = "knowmateSavedJournals";

    let articles = readStorage(articleKey, []);
    let savedJournals = readStorage(bookmarkKey, []);

    function readStorage(key, fallback) {
        try {
            const value = JSON.parse(localStorage.getItem(key));
            return value === null ? fallback : value;
        } catch (error) {
            return fallback;
        }
    }

    function saveArticles() {
        try {
            localStorage.setItem(articleKey, JSON.stringify(articles));
            return true;
        } catch (error) {
            feedback.textContent = "Penyimpanan gagal. Periksa ruang penyimpanan browser.";
            return false;
        }
    }

    function normalizeDOI(value) {
        const doi = value.trim();

        if (!doi) return "";

        const normalized = doi
            .replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")
            .replace(/^doi:\s*/i, "");

        if (!/^10\.\d{4,9}\/\S+$/i.test(normalized)) {
            return null;
        }

        return "https://doi.org/" + normalized;
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, function (char) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[char];
        });
    }

    function openModal() {
        form.reset();
        feedback.textContent = "";
        modal.classList.add("active");
        fields.title.focus();
    }

    function closeModal() {
        modal.classList.remove("active");
        feedback.textContent = "";
    }

    function renderArticles() {
        const query = (searchInput.value || "").trim().toLowerCase();

        const filtered = articles.filter(function (article) {
            const searchable = [
                article.title,
                article.authors,
                article.journal,
                article.year
            ].join(" ").toLowerCase();

            return searchable.includes(query);
        });

        countLabel.textContent = filtered.length + " artikel";
        grid.innerHTML = "";

        filtered.forEach(function (article) {
            const isSaved = savedJournals.includes(article.id);

            const metadata = [
                article.volume ? "Vol. " + article.volume : "",
                article.issue ? "No. " + article.issue : "",
                article.pages ? "Hal. " + article.pages : ""
            ].filter(Boolean);

            const card = document.createElement("article");
            card.className = "journal-card";

            card.innerHTML = `
                <div class="journal-card-top">
                    <div class="journal-card-icon">📄</div>
                    <span class="journal-card-year">${escapeHTML(article.year)}</span>
                </div>

                <h3>${escapeHTML(article.title)}</h3>
                <p class="journal-card-authors">${escapeHTML(article.authors)}</p>
                <p class="journal-card-name">${escapeHTML(article.journal)}</p>

                <div class="journal-card-meta">
                    ${metadata.map(item => `<span>${escapeHTML(item)}</span>`).join("")}
                </div>

                <div class="journal-card-actions">
                    ${
                        article.doi
                            ? `<a class="journal-doi-link" href="${escapeHTML(article.doi)}" target="_blank" rel="noopener noreferrer">Buka DOI ↗</a>`
                            : `<span class="journal-doi-link" style="opacity:.65">DOI tidak tersedia</span>`
                    }

                    <button type="button"
                        class="journal-save-bookmark ${isSaved ? "saved" : ""}"
                        data-journal-id="${escapeHTML(article.id)}"
                        aria-label="${isSaved ? "Hapus dari" : "Simpan ke"} jurnal tersimpan">
                        ${isSaved ? "🔖" : "♧"}
                    </button>
                </div>
            `;

            grid.appendChild(card);
        });

        emptyState.classList.toggle("visible", filtered.length === 0);
    }

    openButton?.addEventListener("click", openModal);
    emptyOpenButton?.addEventListener("click", openModal);
    closeButton?.addEventListener("click", closeModal);
    cancelButton?.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });

    searchInput.addEventListener("input", renderArticles);
    searchButton.addEventListener("click", renderArticles);

    grid.addEventListener("click", function (event) {
        const button = event.target.closest("[data-journal-id]");
        if (!button) return;

        const id = button.dataset.journalId;

        if (savedJournals.includes(id)) {
            savedJournals = savedJournals.filter(item => item !== id);
        } else {
            savedJournals.push(id);
        }

        try {
            localStorage.setItem(bookmarkKey, JSON.stringify(savedJournals));
        } catch (error) {
            alert("Status bookmark gagal disimpan.");
        }

        renderArticles();
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        feedback.textContent = "";

        const year = Number(fields.year.value);
        const currentYear = new Date().getFullYear();

        if (!Number.isInteger(year) || year < 1800 || year > currentYear + 1) {
            feedback.textContent = "Periksa kembali tahun terbit artikel.";
            fields.year.focus();
            return;
        }

        const doi = normalizeDOI(fields.doi.value);

        if (doi === null) {
            feedback.textContent = "Format DOI tidak valid. Contoh: 10.1234/abcd.2025";
            fields.doi.focus();
            return;
        }

        const article = {
            id: "journal-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
            title: fields.title.value.trim(),
            authors: fields.authors.value.trim(),
            journal: fields.journal.value.trim(),
            year: year,
            volume: fields.volume.value.trim(),
            issue: fields.issue.value.trim(),
            pages: fields.pages.value.trim(),
            doi: doi
        };

        if (!article.title || !article.authors || !article.journal) {
            feedback.textContent = "Lengkapi judul artikel, penulis, dan nama jurnal.";
            return;
        }

        articles.unshift(article);

        if (!saveArticles()) {
            articles.shift();
            return;
        }

        searchInput.value = "";
        renderArticles();
        closeModal();
    });

    renderArticles();
});
