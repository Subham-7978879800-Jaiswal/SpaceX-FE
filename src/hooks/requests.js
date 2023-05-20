// const API_URL = "http://15.206.92.213:4000";
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

// Load launches and return as JSON.
async function httpGetLaunches(limit = 15, page = 1) {
  try {
    const response = await fetch(
      `${API_URL}/launches?limit=${limit}&page=${page}`
    );
    return await response.json();
  } catch (err) {
    return {
      ErrorMessage: err.toString(),
    };
  }
}

// Load upcoming Launches and return as JSON.
async function httpGetUpcomingLaunches() {
  try {
    const response = await fetch(`${API_URL}/launches/upcoming`);
    return await response.json();
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

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
  httpGetUpcomingLaunches,
};
