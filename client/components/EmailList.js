import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DOMPurify from "dompurify";

export default function EmailList() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitise email input
    const sanitizedEmail = DOMPurify.sanitize(email);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("You're on the list!");
        setEmail("");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto flex justify-center max-w-6xl">
      <form
        onSubmit={handleSubmit}
        className="w-full m-4 mb-10 p-4  rounded-lg shadow-lg bg-yellow-500"
      >
        <p className="px-1 py-2 font-semi-bold text-md font-semibold">
          Yes, notify me of new crypto tools and send me{" "}
          <span className="text-white"> exclusive crypto offers </span> and
          discounts:
        </p>
        <div className="space-x-4 mb-2 flex items-center justify-center">
          <FontAwesomeIcon icon={faEnvelope} className="h-14 w-14 text-black" />
          <input
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
            name="email"
            placeholder="example@gmail.com"
            className="rounded p-2 w-full outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={email == ""}
            className={
              email != ""
                ? "bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md shadow"
                : "bg-blue-400  text-white p-2 rounded-md shadow"
            }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
