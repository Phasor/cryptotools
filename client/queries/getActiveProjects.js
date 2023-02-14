export default async function getActiveProjects() {
    const response = await fetch(`${process.env.BASE_API_URL}/api/get-active-projects`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  }

