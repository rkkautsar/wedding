import Image from "next/image";
import IconReplay from "assets/icon-replay.svg";
import IconComment from "assets/icon-comment.svg";
import { useContext } from "react";
import { StoryContext } from "contexts/StoryContext";

export const SeeMoreLink = (props: {
  action: any;
  link: string;
  label?: string;
}) => (
  <div
    style={styles.seeMore}
    onClick={(e) => {
      e.preventDefault();
      props.action("pause");
      const win = window.open(props.link, "_blank");
      win.focus();
    }}
  >
    <span style={styles.seeMoreIcon}>⌃</span>
    <span style={styles.seeMoreText}>
      {props.label ? props.label : "See more"}
    </span>
  </div>
);

export const SeeMoreReplayComment = (props: {
  toggleMore: Function;
  action: Function;
}) => {
  const { setCurrentIndex } = useContext(StoryContext);
  const onReplay = () => {
    setCurrentIndex(undefined);
    setTimeout(() => {
      setCurrentIndex(0);
    }, 0);
  };

  return (
    <div
      style={styles.seeMoreReplayComment}
      className=" bottom-0 w-full flex flex-row"
    >
      <div
        className="flex-1 filter drop-shadow-lg flex flex-col items-center content-center p-4 text-blue-ink"
        onClick={onReplay}
      >
        <Image src={IconReplay} width={32} height={32} />
        <span>Replay</span>
      </div>
      <div
        className="flex-1 filter drop-shadow-lg flex flex-col items-center content-center p-4 text-blue-ink"
        onClick={props.toggleMore}
      >
        <Image src={IconComment} width={32} height={32} />
        <span>Comment</span>
      </div>
    </div>
  );
};

const styles = {
  seeMore: {
    height: "10vh",
    background: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2))",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: 0,
  },
  seeMoreReplayComment: {
    height: "10vh",
    background: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2))",
  },
  seeMoreExpanded: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    zIndex: 99999,
  },
  seeMoreText: {
    color: "white",
    textAlign: "center",
    letterSpacing: "0.1em",
    marginBottom: "2.2vh",
    textTransform: "capitalize",
    opacity: "1",
    fontSize: "0.8em",
    transition: "opacity 300ms ease-in-out",
  },
  seeMoreIcon: {
    color: "white",
    textAlign: "center",
    letterSpacing: "0.2em",
    marginBottom: "0.4vh",
    opacity: "1",
    filter: "drop-shadow(0 0 5px black)",
    textTransform: "capitalize",
    transition: "opacity 300ms ease-in-out",
  },
  seeMoreClose: {
    position: "absolute",
    filter: "drop-shadow(0 3px 2px #ccc)",
    right: "0.5rem",
    top: "0.5rem",
    fontSize: "1.5rem",
    opacity: "0.7",
    padding: "1rem",
  },
};
