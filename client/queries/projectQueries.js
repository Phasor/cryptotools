import { useQuery } from "react-query";

export async function getActiveProjects() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-active-projects`
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data from server");
  }
}

export async function getAllProjects() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-all-projects`
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data from server");
  }
}

export async function getProjectsByCategory(category) {
  const spacedCategory = category.replace(/([A-Z])/g, ' $1').trim();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-projects-by-category?category=${spacedCategory}`
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data from server");
  }
}

export async function getCategoryDescription(category) {
  const spacedCategory = category.replace(/([A-Z])/g, ' $1').trim();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-category-by-name?category=${spacedCategory}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function getProjectById(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-project-by-id?id=${id}`
    );
    if (!res.ok) {
      throw new Error("Something went wrong finding the project by id");
    }
    return res.json();
  } catch (err) {
    throw new Error("Something went wrong, in catch block");
  }
}

export async function getProjectByName(name) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-project-by-name?name=${name}`
    );

    if (!res.ok) {
      if (res.status === 404) {
        // project not found
        // need to add spaces between words e.g. "DuneAnalytics" => "Dune Analytics"
        const updatedName = name.split(/(?=[A-Z])/).join(" ");
        console.log("name updated to ", updatedName);

        const updatedRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-project-by-name?name=${updatedName}`
        );

        if (!updatedRes.ok) {
          throw new Error(
            "Something went wrong with finding the project by updated name"
          );
        }
        return updatedRes.json();
      }
      throw new Error("Something went wrong finding the project by name");
    }

    return res.json();
  } catch (err) {
    throw new Error(`Something went wrong, in catch block: ${err.message}`);
  }
}

export async function editProject({ formData, id }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/edit-project-by-id`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ formData, id }),
      }
    );

    if (!res.ok) {
      throw new Error("Something went wrong with editing the project");
    }
    return res.json();
  } catch (err) {
    throw new Error("Something went wrong, in catch block");
  }
}
