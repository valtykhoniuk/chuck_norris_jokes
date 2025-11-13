export async function getHttp(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status is ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("HTTP error: ", error.message);
    throw error;
  }
}
