import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const sendContactForm = async (data) => {
  console.log(`form data: ${JSON.stringify(data)}`)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/contact`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to send message");
    await res.json();
    toast.success("Mail sent, thanks!");
  } catch (error) {
    console.log(error);
    toast.error("Failed to send message. Please try again later.");
  }
};
