import { useMemo, useEffect } from "react";
import { withStyles, Appear, Link, Paragraph, Table, Words } from "arwes";
import { httpGetUpcomingLaunches } from "../hooks/requests";
import { useStore } from "../hooks/store";
import Clickable from "../components/Clickable";

const styles = () => ({
  link: {
    color: "red",
    textDecoration: "none",
  },
});

const Upcoming = (props) => {
  const { entered, launches, classes, abortLaunch } = props;

  const { setUpcomingLaunches, upcomingLaunches } = useStore();

  const getUpcomingLaunches = async () => {
    const upcomingLaunches = await httpGetUpcomingLaunches();
    setUpcomingLaunches(upcomingLaunches);
  };

  useEffect(async () => {
    getUpcomingLaunches();
  }, []);

  const tableBody = useMemo(() => {
    return upcomingLaunches.map((launch, index) => {
      return (
        <tr key={index}>
          <td>
            <Clickable style={{ color: "red" }}>
              <Link
                className={classes.link}
                onClick={() => abortLaunch(launch.flightNumber)}
              >
                ✖
              </Link>
            </Clickable>
          </td>
          <td>{launch.flightNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.target}</td>
        </tr>
      );
    });
  }, [launches, abortLaunch, classes.link]);

  return (
    <Appear id="upcoming" animate show={entered}>
      <Paragraph>
        Upcoming missions including both SpaceX launches and newly scheduled
        Zero to Mastery rockets.
      </Paragraph>
      <Words animate>Warning! Clicking on the ✖ aborts the mission.</Words>
      <Table animate show={entered}>
        <table style={{ tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th style={{ width: "3rem" }}></th>
              <th style={{ width: "3rem" }}>No.</th>
              <th style={{ width: "10rem" }}>Date</th>
              <th style={{ width: "11rem" }}>Mission</th>
              <th style={{ width: "11rem" }}>Rocket</th>
              <th>Destination</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
      </Table>
    </Appear>
  );
};

export default withStyles(styles)(Upcoming);
