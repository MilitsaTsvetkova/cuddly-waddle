import { JobFilterParams } from "./shared.types";

export async function getJobs(params: JobFilterParams) {
  const { query, page } = params;
  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "fb411b4086msh4684e27ea4b78ffp141115jsn4ad2f6b1f9ea",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
