document.addEventListener("DOMContentLoaded", function () {
  // Document elements
  const uploadDocBtn = document.getElementById("uploadDocBtn");
  const createFolderBtn = document.getElementById("createFolderBtn");
  const uploadDocModal = document.getElementById("uploadDocModal");
  const closeUploadModalBtn = uploadDocModal?.querySelector(".close-btn");
  const cancelUploadBtn = document.getElementById("cancelUploadBtn");
  const confirmUploadBtn = document.getElementById("confirmUploadBtn");
  const uploadForm = document.getElementById("uploadDocForm");
  const uploadZone = document.querySelector(".upload-zone");
  const fileUpload = document.getElementById("fileUpload");
  const viewButtons = document.querySelectorAll(".view-btn");
  const documentsContainer = document.querySelector(".documents-container");
  const searchInput = document.querySelector(".search-documents input");

  // View toggling
  if (viewButtons.length > 0 && documentsContainer) {
    viewButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        viewButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // Get view type
        const viewType = this.getAttribute("data-view");

        // Update view
        if (viewType === "grid") {
          documentsContainer.classList.remove("list-view");
          documentsContainer.classList.add("grid-view");
        } else {
          documentsContainer.classList.remove("grid-view");
          documentsContainer.classList.add("list-view");
        }
      });
    });
  }

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      const documents = document.querySelectorAll(".document-item");

      documents.forEach((doc) => {
        const title = doc.querySelector("h3").textContent.toLowerCase();

        if (title.includes(query)) {
          doc.style.display = "";
        } else {
          doc.style.display = "none";
        }
      });
    });
  } // Folder navigation
  const folderPath = document.querySelector(".folder-path");
  if (folderPath) {
    folderPath.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        e.preventDefault();

        // In a real app, this would load the folder contents
        const folderName = e.target.textContent;
        alert(`Navigating to ${folderName} folder...`);
      }
    });
  }

  // Folder click handler
  const folderItems = document.querySelectorAll(".document-item.folder");
  if (folderItems.length > 0) {
    folderItems.forEach((folder) => {
      folder.addEventListener("click", function () {
        const folderName = this.querySelector("h3").textContent;
        alert(`Opening ${folderName} folder...`);
      });
    });
  }

  // Document action buttons
  const documentActions = document.querySelectorAll(
    ".document-actions .btn-icon"
  );
  if (documentActions.length > 0) {
    documentActions.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent event from bubbling to document item

        const action = this.getAttribute("title");
        const documentName =
          this.closest(".document-item").querySelector("h3").textContent;

        if (action === "Download") {
          alert(`Downloading ${documentName}...`);
        } else if (action === "Share") {
          alert(`Sharing options for ${documentName}...`);
        } else if (action === "More Options") {
          showDocumentOptions(this, documentName);
        }
      });
    });
  }

  // Upload modal functionality
  if (uploadDocBtn && uploadDocModal) {
    // Open modal
    uploadDocBtn.addEventListener("click", function () {
      uploadDocModal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });

    // Close modal
    [closeUploadModalBtn, cancelUploadBtn].forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", closeUploadModal);
      }
    });

    // Close modal when clicking outside
    uploadDocModal.addEventListener("click", function (e) {
      if (e.target === uploadDocModal) {
        closeUploadModal();
      }
    });

    // Upload zone click and drag/drop functionality
    if (uploadZone && fileUpload) {
      // Click to browse files
      uploadZone.addEventListener("click", function () {
        fileUpload.click();
      });

      // File selection change
      fileUpload.addEventListener("change", function () {
        if (this.files.length > 0) {
          updateUploadZoneWithFiles(this.files);
        }
      });

      // Drag and drop events
      uploadZone.addEventListener("dragover", function (e) {
        e.preventDefault();
        this.style.borderColor = "var(--bosch-blue)";
        this.style.backgroundColor = "rgba(0, 119, 181, 0.05)";
      });

      uploadZone.addEventListener("dragleave", function (e) {
        e.preventDefault();
        this.style.borderColor = "#ddd";
        this.style.backgroundColor = "";
      });

      uploadZone.addEventListener("drop", function (e) {
        e.preventDefault();
        this.style.borderColor = "#ddd";
        this.style.backgroundColor = "";

        if (e.dataTransfer.files.length > 0) {
          fileUpload.files = e.dataTransfer.files;
          updateUploadZoneWithFiles(e.dataTransfer.files);
        }
      });
    }

    // Confirm upload
    if (confirmUploadBtn && uploadForm) {
      confirmUploadBtn.addEventListener("click", function () {
        // Check if files have been selected
        if (fileUpload && fileUpload.files.length === 0) {
          alert("Please select at least one file to upload.");
          return;
        }

        // Show loading state
        confirmUploadBtn.disabled = true;
        confirmUploadBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Uploading...';

        // Simulate upload process
        setTimeout(function () {
          // Get form data
          const folderSelect = document.getElementById("docFolder");
          const folder = folderSelect ? folderSelect.value : "root";

          // In a real app, this would upload the files to the server
          // Here we'll just simulate adding new files to the document list
          if (fileUpload && fileUpload.files.length > 0) {
            for (let i = 0; i < fileUpload.files.length; i++) {
              addDocumentToContainer(fileUpload.files[i]);
            }
          }

          // Reset form
          if (uploadForm) {
            uploadForm.reset();
            resetUploadZone();
          }

          // Close modal
          closeUploadModal();

          // Show success message
          showMessage("Files uploaded successfully!", "success");
        }, 2000);
      });
    }
  }

  // Create folder functionality
  if (createFolderBtn) {
    createFolderBtn.addEventListener("click", function () {
      const folderName = prompt("Enter folder name:");

      if (folderName && folderName.trim() !== "") {
        addFolderToContainer(folderName.trim());
        showMessage("Folder created successfully!", "success");
      }
    });
  }

  // Helper functions
  function closeUploadModal() {
    if (uploadDocModal) {
      uploadDocModal.classList.remove("active");
      document.body.style.overflow = ""; // Restore background scrolling

      // Reset form and upload zone
      if (uploadForm) {
        uploadForm.reset();
        resetUploadZone();
      }
    }
  }

  function updateUploadZoneWithFiles(files) {
    if (!uploadZone) return;

    // Update upload zone to show selected files
    uploadZone.innerHTML = '<i class="fas fa-file-alt"></i>';

    // Create file list
    const fileList = document.createElement("div");
    fileList.className = "file-list";

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileItem = document.createElement("div");
      fileItem.className = "file-item";
      fileItem.innerHTML = `
                <i class="fas ${getFileIcon(file.name)}"></i>
                <span>${file.name}</span>
                <span class="file-size">(${formatFileSize(file.size)})</span>
            `;
      fileList.appendChild(fileItem);
    }

    uploadZone.appendChild(fileList);
    uploadZone.appendChild(document.createElement("p")).textContent =
      "Click or drop to change selection";
  }

  function resetUploadZone() {
    if (uploadZone) {
      uploadZone.innerHTML = `
                <i class="fas fa-cloud-upload-alt"></i>
                <p>Drag & drop files here or click to browse</p>
            `;
    }
  }

  function getFileIcon(filename) {
    const extension = filename.split(".").pop().toLowerCase();

    if (["pdf"].includes(extension)) {
      return "fa-file-pdf";
    } else if (["doc", "docx"].includes(extension)) {
      return "fa-file-word";
    } else if (["xls", "xlsx", "csv"].includes(extension)) {
      return "fa-file-excel";
    } else if (["ppt", "pptx"].includes(extension)) {
      return "fa-file-powerpoint";
    } else if (["jpg", "jpeg", "png", "gif", "bmp"].includes(extension)) {
      return "fa-file-image";
    } else if (["zip", "rar", "7z"].includes(extension)) {
      return "fa-file-archive";
    } else {
      return "fa-file";
    }
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  function addDocumentToContainer(file) {
    if (!documentsContainer) return;

    // Create document element
    const docElement = document.createElement("div");
    docElement.className = "document-item file";

    // Add file type class based on extension
    const extension = file.name.split(".").pop().toLowerCase();
    if (["pdf"].includes(extension)) {
      docElement.classList.add("pdf");
    } else if (["doc", "docx"].includes(extension)) {
      docElement.classList.add("doc");
    } else if (["xls", "xlsx", "csv"].includes(extension)) {
      docElement.classList.add("excel");
    }

    // Current date for "last modified"
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    docElement.innerHTML = `
            <div class="document-icon">
                <i class="fas ${getFileIcon(file.name)}"></i>
            </div>
            <div class="document-info">
                <h3>${file.name}</h3>
                <p>Last modified: ${formattedDate}</p>
            </div>
            <div class="document-actions">
                <button class="btn-icon" title="Download"><i class="fas fa-download"></i></button>
                <button class="btn-icon" title="Share"><i class="fas fa-share-alt"></i></button>
                <button class="btn-icon" title="More Options"><i class="fas fa-ellipsis-v"></i></button>
            </div>
        `;

    // Add click handlers to the new action buttons
    const actionButtons = docElement.querySelectorAll(
      ".document-actions .btn-icon"
    );
    actionButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();

        const action = this.getAttribute("title");
        const documentName =
          this.closest(".document-item").querySelector("h3").textContent;

        if (action === "Download") {
          alert(`Downloading ${documentName}...`);
        } else if (action === "Share") {
          alert(`Sharing options for ${documentName}...`);
        } else if (action === "More Options") {
          showDocumentOptions(this, documentName);
        }
      });
    });

    // Add to container
    documentsContainer.prepend(docElement);

    // Add fade-in effect
    docElement.style.opacity = "0";
    docElement.style.transform = "translateY(10px)";
    setTimeout(() => {
      docElement.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      docElement.style.opacity = "1";
      docElement.style.transform = "translateY(0)";
    }, 10);
  }

  function addFolderToContainer(folderName) {
    if (!documentsContainer) return;

    // Create folder element
    const folderElement = document.createElement("div");
    folderElement.className = "document-item folder";

    // Current date for "last modified"
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    folderElement.innerHTML = `
            <div class="document-icon">
                <i class="fas fa-folder"></i>
            </div>
            <div class="document-info">
                <h3>${folderName}</h3>
                <p>Last modified: ${formattedDate}</p>
            </div>
        `;

    // Add click handler
    folderElement.addEventListener("click", function () {
      alert(`Opening ${folderName} folder...`);
    });

    // Add to container
    documentsContainer.prepend(folderElement);

    // Add fade-in effect
    folderElement.style.opacity = "0";
    folderElement.style.transform = "translateY(10px)";
    setTimeout(() => {
      folderElement.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      folderElement.style.opacity = "1";
      folderElement.style.transform = "translateY(0)";
    }, 10);
  }

  function showDocumentOptions(triggerElement, documentName) {
    // Remove any existing options menu
    const existingMenu = document.querySelector(".doc-options-menu");
    if (existingMenu) {
      existingMenu.remove();
    }

    // Create options menu
    const menu = document.createElement("div");
    menu.className = "doc-options-menu";
    menu.innerHTML = `
            <ul>
                <li><a href="#" data-action="rename">Rename</a></li>
                <li><a href="#" data-action="move">Move to...</a></li>
                <li><a href="#" data-action="copy">Make a copy</a></li>
                <li class="danger"><a href="#" data-action="delete">Delete</a></li>
            </ul>
        `;

    // Position the menu
    const rect = triggerElement.getBoundingClientRect();
    menu.style.position = "absolute";
    menu.style.top = `${rect.bottom + window.scrollY}px`;
    menu.style.left = `${rect.left + window.scrollX - 120}px`;
    menu.style.backgroundColor = "white";
    menu.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    menu.style.borderRadius = "4px";
    menu.style.zIndex = "1000";
    menu.style.minWidth = "150px";
    menu.style.overflow = "hidden";

    // Style menu items
    const style = document.createElement("style");
    style.textContent = `
            .doc-options-menu ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .doc-options-menu li {
                padding: 0;
            }
            .doc-options-menu li a {
                display: block;
                padding: 8px 16px;
                color: var(--bosch-dark);
                text-decoration: none;
                transition: background-color 0.3s ease;
            }
            .doc-options-menu li a:hover {
                background-color: var(--bosch-light-gray);
            }
            .doc-options-menu li.danger a {
                color: var(--bosch-red);
            }
        `;
    document.head.appendChild(style);

    // Add to DOM
    document.body.appendChild(menu);

    // Add event listeners to menu items
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const action = this.getAttribute("data-action");

        switch (action) {
          case "rename":
            const newName = prompt("Enter new name:", documentName);
            if (newName && newName.trim() !== "") {
              renameDocument(triggerElement, newName.trim());
              showMessage(`Renamed to "${newName.trim()}"`, "success");
            }
            break;
          case "move":
            alert(`Move ${documentName} to another folder...`);
            break;
          case "copy":
            alert(`Creating a copy of ${documentName}...`);
            break;
          case "delete":
            if (confirm(`Are you sure you want to delete "${documentName}"?`)) {
              deleteDocument(triggerElement);
              showMessage(`Deleted "${documentName}"`, "success");
            }
            break;
        }

        // Remove menu
        menu.remove();
      });
    });

    // Close menu when clicking elsewhere
    document.addEventListener("click", function closeMenu(e) {
      if (!menu.contains(e.target) && e.target !== triggerElement) {
        menu.remove();
        document.removeEventListener("click", closeMenu);
      }
    });
  }

  function renameDocument(triggerElement, newName) {
    // Find the document name element
    const docItem = triggerElement.closest(".document-item");
    const nameElement = docItem.querySelector("h3");

    if (nameElement) {
      nameElement.textContent = newName;
    }
  }

  function deleteDocument(triggerElement) {
    // Find the document item
    const docItem = triggerElement.closest(".document-item");

    if (docItem) {
      // Add fade-out effect
      docItem.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      docItem.style.opacity = "0";
      docItem.style.transform = "translateY(10px)";

      // Remove after animation
      setTimeout(() => {
        docItem.remove();
      }, 300);
    }
  }

  function showMessage(text, type = "info") {
    // Create message element
    const message = document.createElement("div");
    message.className = `toast-message ${type}`;
    message.textContent = text;

    // Add styles
    Object.assign(message.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "10px 20px",
      borderRadius: "4px",
      color: "white",
      zIndex: "9999",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease",
      opacity: "0",
      transform: "translateY(20px)",
    });

    // Set background color based on type
    if (type === "success") {
      message.style.backgroundColor = "var(--bosch-green)";
    } else if (type === "error") {
      message.style.backgroundColor = "var(--bosch-red)";
    } else {
      message.style.backgroundColor = "var(--bosch-blue)";
    }

    // Add to DOM
    document.body.appendChild(message);

    // Trigger animation
    setTimeout(() => {
      message.style.opacity = "1";
      message.style.transform = "translateY(0)";
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      message.style.opacity = "0";
      message.style.transform = "translateY(20px)";

      // Remove from DOM after animation
      setTimeout(() => {
        message.remove();
      }, 300);
    }, 3000);
  }
});
