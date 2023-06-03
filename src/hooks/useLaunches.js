import { useCallback, useEffect, useState } from "react";
import { useErrorContext } from "./errorContext";

import { httpGetLaunches, httpSubmitLaunch, httpAbortLaunch } from "./requests";
import { useStore } from "./store";

function useLaunches(onSuccessSound, onAbortSound, onFailureSound) {
  const { launches, saveLaunches } = useStore();

  const pageNumber = launches.length / 20 === 0 ? 1 : launches.length / 20;

  const [isPendingLaunch, setPendingLaunch] = useState(false);
  const { updateErrorMessage } = useErrorContext();
  const [page, setPage] = useState(pageNumber);
  const [hasMoreLaunches, setHasMoreLaunches] = useState(true);

  const getLaunches = useCallback(async () => {
    setPendingLaunch(true);
    const fetchedLaunches = await httpGetLaunches(20, page);
    setPendingLaunch(false);
    if (!fetchedLaunches.ErrorMessage) {
      setHasMoreLaunches(fetchedLaunches.length > 0);
      saveLaunches((prev) => {
        return [...prev, ...fetchedLaunches];
      });
    }
  }, [page, saveLaunches]);

  useEffect(() => {
    getLaunches();
  }, [getLaunches, page]);

  const submitLaunch = useCallback(
    async (e) => {
      e.preventDefault();
      setPendingLaunch(true);
      const data = new FormData(e.target);
      const launchDate = data.get("launch-day");
      const mission = data.get("mission-name");
      const rocket = data.get("rocket-name");
      const target = data.get("planets-selector");

      const response = await httpSubmitLaunch({
        launchDate,
        mission,
        rocket,
        target,
      });

      if (!response.ErrorMessage) {
        getLaunches();
        setTimeout(() => {
          setPendingLaunch(false);
          onSuccessSound();
        }, 800);
      } else {
        setTimeout(() => {
          onFailureSound();
          updateErrorMessage(response.ErrorMessage);
          setPendingLaunch(false);
        }, 300);
      }
    },
    [getLaunches, onSuccessSound, onFailureSound, updateErrorMessage]
  );

  const abortLaunch = useCallback(
    async (id) => {
      const response = await httpAbortLaunch(id);

      const success = response.ok;
      if (success) {
        getLaunches();
        onAbortSound();
      } else {
        onFailureSound();
      }

      if (!response.ErrorMessage) {
        getLaunches();
        onAbortSound();
      } else {
        setTimeout(() => {
          onFailureSound();
          updateErrorMessage(response.ErrorMessage);
        }, 300);
      }
    },
    [getLaunches, onAbortSound, onFailureSound, updateErrorMessage]
  );

  return {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
    setPage,
    page,
    hasMoreLaunches,
  };
}

export default useLaunches;
