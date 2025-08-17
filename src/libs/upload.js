// import toast from "react-hot-toast";

// export async function upload(ev, callbackFn) {
//   const file = ev.target.files?.[0];

//   if (file) {

//     const uploadPromise = new Promise((resolve, reject) => {
//       const data = new FormData;
//       data.set('file', file);
//       fetch('/api/upload', {
//         method: 'POST',
//         body: data,
//       }).then(response => {
//         if (response.ok) {
//           response.json().then(link => {
//             callbackFn(link);
//             resolve(link);
//           });
//         } else {
//           reject();
//         }
//       });
//     });

//     await toast.promise(uploadPromise, {
//       loading: 'Uploading...',
//       success: 'Uploaded!',
//       error: 'Upload error!',
//     });

//   }
// }

import toast from "react-hot-toast";

/**
 * Uploads a file to Vercel Blob storage
 * @param {Event} ev - The file input change event
 * @param {Function} callbackFn - Callback function to handle the returned URL
 * @returns {Promise<void>}
 */
export async function upload(ev, callbackFn) {
  const file = ev.target.files?.[0];

  if (!file) {
    toast.error("No file selected");
    return;
  }

  const uploadPromise = new Promise((resolve, reject) => {
    const data = new FormData();
    data.set("file", file);

    fetch("/api/upload", {
      method: "POST",
      body: data,
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Upload failed");
        }
        return response.json();
      })
      .then((link) => {
        callbackFn(link);
        resolve(link);
      })
      .catch((err) => {
        console.error("Upload error:", err);
        reject(err);
      });
  });

  try {
    await toast.promise(uploadPromise, {
      loading: "Uploading...",
      success: "Uploaded!",
      error: "Upload error!",
    });
  } catch (error) {
    console.error("Toast promise error:", error);
  }
}
