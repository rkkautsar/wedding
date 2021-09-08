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
    className="seeMore"
    onClick={(e) => {
      e.preventDefault();
      props.action("pause");
      const win = window.open(props.link, "_blank");
      win.focus();
    }}
  >
    <span className="seeMoreIcon">⌃</span>
    <span className="seeMoreText">
      {props.label ? props.label : "See more"}
    </span>
  </div>
);

export const SeeMoreReplayComment = (props: {
  toggleMore: any;
  action: Function;
}) => {
  const { setCurrentIndex, isInvited } = useContext(StoryContext);
  const onReplay = () => {
    setCurrentIndex(undefined);
    setTimeout(() => {
      setCurrentIndex(0);
    }, 0);
  };

  return (
    <div className="seeMoreReplayComment bottom-0 w-full flex flex-row">
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
        <span>{isInvited ? "RSVP" : "Comment"}</span>
      </div>
    </div>
  );
};
