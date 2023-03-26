const API_URL = "http://localhost:4000";

// Load planets and return as JSON.
async function httpGetPlanets() {
  try {
    const response = await fetch(`${API_URL}/planets`);
    return await response.json();
  } catch (err) {
    return {
      ErrorMessage: err.toString(),
    };
  }
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  try {
    const response = await fetch(`${API_URL}/launches`);
    const fetchedLaunches = await response.json();
    return fetchedLaunches.sort((a, b) => {
      return a.flightNumber - b.flightNumber;
    });
  } catch (err) {
    return {
      ErrorMessage: err.toString(),
    };
  }
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    const submitLaunchResponse = await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
    const submitLaunchResponseJSON = await submitLaunchResponse.json();

    return submitLaunchResponseJSON;
  } catch (err) {
    return {
      ErrorMessage: err.toString(),
    };
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    const abortLaunchResponse = await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
    const abortLaunchResponseJSON = await abortLaunchResponse.json();
    return abortLaunchResponseJSON;
  } catch (err) {
    return {
      ErrorMessage: err.toString(),
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
