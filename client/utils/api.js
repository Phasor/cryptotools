// used to post the suggest a link form data to the server for emailing

export const sendContactForm = async (data) => {
  fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};
