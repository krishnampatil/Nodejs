const API_URL = "http://localhost:5000/api";

const fileInput = document.getElementById("fileInput");

const uploadBtn = document.getElementById("uploadBtn");

const refreshBtn = document.getElementById("refreshBtn");

const filesContainer = document.getElementById("filesContainer");

const loading = document.getElementById("loading");

const fileCount = document.getElementById("fileCount");

const previewModal = document.getElementById("previewModal");

const previewContent = document.getElementById("previewContent");

const closeModal = document.getElementById("closeModal");

let files = [];



function showLoading() {

    loading.style.display = "block";

}

function hideLoading() {

    loading.style.display = "none";

}



function getStorageType() {

    return document.querySelector(

        'input[name="storage"]:checked'

    ).value;

}



async function uploadFile() {

    if (!fileInput.files.length) {

        alert("Please select a file");

        return;

    }

    const storage = getStorageType();

    const formData = new FormData();

    formData.append(

        "file",

        fileInput.files[0]

    );

    try {

        uploadBtn.disabled = true;

        uploadBtn.innerText = "Uploading...";

        const response = await fetch(

            `${API_URL}/upload/${storage}`,

            {

                method: "POST",

                body: formData

            }

        );

        const data = await response.json();

        alert("Upload Successful");

        fileInput.value = "";

        getFiles();

    }

    catch (err) {

        console.log(err);

        alert("Upload Failed");

    }

    finally {

        uploadBtn.disabled = false;

        uploadBtn.innerText = "Upload File";

    }

}



async function getFiles() {

    showLoading();

    filesContainer.innerHTML = "";

    try {

        const response = await fetch(

            `${API_URL}/files`

        );

        files = await response.json();

        fileCount.innerText =

            files.length + " Files";

        renderFiles();

    }

    catch (err) {

        console.log(err);

    }

    hideLoading();

}



function renderFiles() {

    filesContainer.innerHTML = "";

    if (files.length === 0) {

        filesContainer.innerHTML =

            "<h3>No Files Uploaded</h3>";

        return;

    }

    files.forEach(file => {

        const card = document.createElement("div");

        card.className = "file-card";



        let badge = "";



        if (

            file.storageType === "local"

        ) {

            badge =

                '<span class="badge local">Local</span>';

        }

        else if (

            file.storageType === "cloudinary"

        ) {

            badge =

                '<span class="badge cloudinary">Cloudinary</span>';

        }

        else {

            badge =

                '<span class="badge database">Database</span>';

        }



        card.innerHTML = `

        <div class="file-info">

            <div class="file-name">

                ${file.originalName || "Untitled"}

            </div>

            <div class="file-details">

                ${file.mimeType || ""}

                <br>

                ${badge}

            </div>

        </div>

        <div class="file-actions">

            <button

                class="viewBtn"

                onclick="viewFile('${file._id}')"

            >

                View

            </button>

            <button

                class="deleteBtn"

                onclick="deleteFile('${file._id}')"

            >

                Delete

            </button>

        </div>

        `;

        filesContainer.appendChild(card);

    });

}



uploadBtn.addEventListener(

    "click",

    uploadFile

);



refreshBtn.addEventListener(

    "click",

    getFiles

);


// ===============================
// VIEW FILE
// ===============================

function viewFile(id) {

    const file = files.find(item => item._id === id);

    if (!file) {

        alert("File not found");

        return;

    }

    previewModal.style.display = "flex";

    previewContent.innerHTML = "";

    // Database Image

    if (file.storageType === "database") {

        previewContent.innerHTML = `

            <img
                src="${API_URL}/image/${id}"
                alt="Image Preview"
            >

        `;

        return;

    }

    // Cloudinary Image / Video

    if (file.storageType === "cloudinary") {

        if (file.mimeType.startsWith("image")) {

            previewContent.innerHTML = `

                <img
                    src="${file.url}"
                    alt="Preview"
                >

            `;

        }

        else if (file.mimeType.startsWith("video")) {

            previewContent.innerHTML = `

                <video controls>

                    <source
                        src="${file.url}"
                        type="${file.mimeType}"
                    >

                </video>

            `;

        }

        else {

            window.open(file.url, "_blank");

        }

        return;

    }

    // Local Storage

    if (file.storageType === "local") {

        const localPath = file.path.replace("src/", "/");

        if (file.mimeType.startsWith("image")) {

            previewContent.innerHTML = `

                <img
                    src="${localPath}"
                    alt="Preview"
                >

            `;

        }

        else if (file.mimeType.startsWith("video")) {

            previewContent.innerHTML = `

                <video controls>

                    <source
                        src="${localPath}"
                        type="${file.mimeType}"
                    >

                </video>

            `;

        }

        else {

            window.open(localPath, "_blank");

        }

    }

}



// ===============================
// DELETE FILE
// ===============================

async function deleteFile(id) {

    const confirmDelete = confirm(

        "Delete this file?"

    );

    if (!confirmDelete) return;

    try {

        const response = await fetch(

            `${API_URL}/files/${id}`,

            {

                method: "DELETE"

            }

        );

        const data = await response.json();

        alert(data.message);

        getFiles();

    }

    catch (err) {

        console.log(err);

        alert("Delete Failed");

    }

}



// ===============================
// CLOSE MODAL
// ===============================

closeModal.addEventListener(

    "click",

    () => {

        previewModal.style.display = "none";

        previewContent.innerHTML = "";

    }

);



// ===============================
// CLOSE MODAL ON OUTSIDE CLICK
// ===============================

window.addEventListener(

    "click",

    (e) => {

        if (e.target === previewModal) {

            previewModal.style.display = "none";

            previewContent.innerHTML = "";

        }

    }

);



// ===============================
// LOAD FILES ON PAGE LOAD
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    () => {

        getFiles();

    }

);
