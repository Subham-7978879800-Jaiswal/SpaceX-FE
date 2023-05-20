import { useCallback, useMemo, useRef } from "react";
import { Appear, Table, Paragraph } from "arwes";
import { Loading } from "arwes";

const options = {
  root: null,
};

const History = ({
  onSuccessSound,
  onAbortSound,
  onFailureSound,
  sounds,
  entered,
  launches,
  isPendingLaunch,
  hasMoreLaunches,
  setPage
}) => {
  console.log("Direct History");

  const observerRef = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();
      const observer = new IntersectionObserver((entries) => {
        if (isPendingLaunch) return;

        if (entries[0].isIntersecting && hasMoreLaunches) {
          setPage((prev) => prev + 1);
        }
      }, options);
      if (node) observer.observe(node); // start observing the last element
      observerRef.current = observer;
    },
    [hasMoreLaunches, setPage, isPendingLaunch]
  );

  const tableBody = useMemo(() => {
    return launches
      ?.filter((launch) => !launch.upcoming)
      .map((launch, index) => {
        return (
          <tr
            ref={launches.length - 1 === index ? lastElementRef : null}
            key={index}
          >
            <td>
              <span style={{ color: launch.success ? "greenyellow" : "red" }}>
                █
              </span>
            </td>
            <td>{launch.flightNumber}</td>
            <td>{new Date(launch.launchDate).toDateString()}</td>
            <td>{launch.mission}</td>
            <td>{launch.rocket}</td>
            <td>{launch.customers?.join(", ")}</td>
          </tr>
        );
      });
  }, [launches, lastElementRef]);

  return (
    <article id="history">
      <Appear animate show={entered}>
        <Paragraph>
          History of mission launches including SpaceX launches starting from
          the year 2006.
        </Paragraph>
        {isPendingLaunch && <Loading size={20} speed={4} full />}
        <Table animate>
          <table style={{ tableLayout: "fixed" }}>
            <thead>
              <tr>
                <th style={{ width: "2rem" }}></th>
                <th style={{ width: "3rem" }}>No.</th>
                <th style={{ width: "9rem" }}>Date</th>
                <th>Mission</th>
                <th style={{ width: "7rem" }}>Rocket</th>
                <th>Customers</th>
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
        </Table>
      </Appear>
    </article>
  );
};

export default History;
