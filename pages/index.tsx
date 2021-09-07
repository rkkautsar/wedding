import useWindowDimensions from "hooks/useWindowDimensions";
import React, { Component, createContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import Logo from "assets/logo.svg";
import LogoCircle from "assets/logo-circle.svg";
import SVGQRCode from "assets/qr-code.svg";
import Image from "next/image";
import ImgCover1 from "assets/cover-1.jpg";
import ImgCover2 from "assets/cover-2.jpg";
import ImgCover3 from "assets/cover-3.jpg";
import ImgAvatar from "assets/avatar.jpg";
import ImgFaridah from "assets/faridah.jpg";
import ImgRakha from "assets/rakha.jpg";
import ImgRoyalTulip from "assets/royal-tulip.jpg";
import ImgMap from "assets/map.jpg";
import GettingMarried from "assets/getting-married.svg";

import Stories, { WithSeeMore } from "react-insta-stories";
import { Story } from "react-insta-stories/dist/interfaces";
import { formatDuration, intervalToDuration } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { SeeMoreLink, SeeMoreReplayComment } from "components/SeeMoreCollapsed";
import BackgroundCustomContent from "renderers/BackgroundCustomContent";
import GoogleMapReact from "google-map-react";
import { StoryContext } from "contexts/StoryContext";
import { CommentsModal } from "components/CommentsModal";
import { useComments } from "use-comments";
import Truncate from "react-truncate";

const INITIAL_ZOOM = 12;
const ASPECT_RATIO = 16 / 9;
const THE_DATE = zonedTimeToUtc("2021-09-18 07:30", "Asia/Jakarta");

function MapPin(props: { lat: number; lng: number }) {
  return (
    <div className="content-container text-black">
      <div className="grid gap-2 bg-white w-full rounded-lg">
        <Image
          src={ImgRoyalTulip}
          className="rounded-b-none rounded-lg"
          height="10rem"
          width="20rem"
          objectFit="cover"
          layout="responsive"
        />
        <div className="p-4 text-lg">
          <h3 className="text-xl">Royal Tulip Gunung Geulis</h3>
          <p>07.30-10.00 WIB (Akad)</p>
          <p>12.00-14.00 WIB (Resepsi)</p>
        </div>
      </div>
    </div>
  );
}

const App = () => {
  const { width, height } = useWindowDimensions();

  let storyWidth, storyHeight;

  if (width == null || height == null) {
    return null;
  }

  if (isMobile) {
    storyWidth = "100vw";
    storyHeight = "calc(var(--vh) * 100)";
  } else {
    storyWidth = height / ASPECT_RATIO;
    storyHeight = height;

    if (storyWidth > width) {
      storyWidth = width;
      storyHeight = width * ASPECT_RATIO;
    }
  }

  const [currentIndex, setCurrentIndex] = useState(undefined);

  return (
    <div className="stories-container">
      <StoryContext.Provider value={{ setCurrentIndex }}>
        <Stories
          currentIndex={currentIndex}
          stories={stories}
          defaultInterval={10000}
          height={storyHeight}
          width={storyWidth}
          keyboardNavigation
          renderers={[BackgroundCustomContent]}
        />
      </StoryContext.Provider>
    </div>
  );
};

export default App;

const defaultHeader = {
  heading: "Faridah & Rakha",
  subheading: null,
  profileImage: ImgAvatar,
};

const stories: Story[] = [
  {
    type: "backgroundCustomContent",
    url: ImgCover1,
    duration: 3000,
    content: () => {
      return (
        <div className="story story-with-header text-white grid py-32 content-start">
          <Image src={Logo} height={140} width={140} />
        </div>
      );
    },
  },
  {
    header: defaultHeader,
    type: "backgroundCustomContent",
    url: ImgCover2,
    duration: 3000,
    content: () => {
      const [now, setNow] = useState(new Date());
      useEffect(() => {
        const id = setInterval(() => {
          setNow(new Date());
        }, 1000);
        return () => clearInterval(id);
      }, []);
      const duration = intervalToDuration({
        start: now,
        end: THE_DATE,
      });
      const isStarted = THE_DATE < now;
      const formattedDuration = formatDuration(duration);
      return (
        <div className="story bg-dusty-blue bg-opacity-80 grid py-32 content-between text-center">
          <Image src={Logo} height={140} width={140} priority />
          <Image src={GettingMarried} height={843} width={1026} priority />

          <div>
            <h3 className="text-4xl text-blue-ink">
              <time dateTime="2021-09-18 07:30+07:00">18.09.2021</time>
            </h3>
            <em className="text-blue-ink">{formattedDuration}</em>
          </div>
        </div>
      );
    },
  },

  {
    header: defaultHeader,
    type: "backgroundCustomContent",
    url: ImgFaridah,
    duration: 5000,
    content: () => {
      return (
        <div className="story story-with-header text-white bg-blue-ink bg-opacity-50 grid content-start pr-32">
          <h2 className="text-xl italic">The Bride</h2>
          <h3 className="text-4xl">Faridah Nur Suci Amirahmandani, S.Kom</h3>
          <p className="italic">
            putri dari <br />
            Bpk. Arief Hamdani dan Ibu Khukamah
          </p>
        </div>
      );
    },
    seeMore: () => {},
    seeMoreCollapsed: ({ action }) => (
      <SeeMoreLink link="https://instagram.com/faridansaa" action={action} />
    ),
  },
  {
    header: defaultHeader,
    type: "backgroundCustomContent",
    url: ImgRakha,
    duration: 5000,
    content: () => {
      return (
        <div className="story story-with-header text-white bg-blue-ink bg-opacity-50 grid content-between">
          <div className="max-w-sm">
            <h2 className="text-xl italic">The Groom</h2>
            <h3 className="text-4xl">Rakha Kanz Kautsar, S.Kom</h3>
            <p className="italic">
              putra dari <br />
              Bpk. Brilliantoro dan Ibu Maulina Dian Purwanti
            </p>
          </div>
        </div>
      );
    },
    seeMore: () => {},
    seeMoreCollapsed: ({ action }) => (
      <SeeMoreLink link="https://instagram.com/rakhakk" action={action} />
    ),
  },
  {
    header: defaultHeader,
    type: "backgroundCustomContent",
    url: ImgMap,
    duration: 5000,
    content: () => {
      return (
        <div className="story text-white bg-black bg-opacity-50 grid place-content-center">
          <MapPin lat={-6.626632} lng={106.863031} />
        </div>
      );
    },
    seeMore: () => {},
    seeMoreCollapsed: ({ action }) => (
      <SeeMoreLink link="https://g.page/royaltulipgg?share" action={action} />
    ),
  },
  {
    header: defaultHeader,
    type: "backgroundCustomContent",
    url: ImgCover3,
    duration: 5000,
    content: () => {
      return (
        <div className="story story-with-header text-white bg-black bg-opacity-50">
          <div className="text-center grid place-content-evenly h-full py-12">
            <p className="italic text-2xl sm:text-3xl">
              Due to the current pandemic situation, we will be very glad to
              have you witness our wedding vows through our youtube live
              streaming below.
            </p>
            <div className="grid gap-4">
              <Image src={SVGQRCode} height={120} width={120} />
              <p className="italic text-xl sm:text-2xl underline">
                https://faridah-rakha.wedding/live
              </p>
            </div>
          </div>
        </div>
      );
    },
    seeMore: () => {},
    seeMoreCollapsed: ({ action }) => (
      <SeeMoreLink link="/live" action={action} />
    ),
  },
  {
    duration: 30000,
    content: ({ story, action }) => {
      const { comments, loading } = useComments(
        "https://wed-comments.herokuapp.com/v1/graphql",
        "wedding-comments",
        {
          limit: 2,
        }
      );
      return (
        <WithSeeMore story={story} action={action}>
          <div className="story bg-white grid place-content-evenly">
            <Image src={Logo} height={120} width={120} layout="intrinsic" />
            {loading ? (
              <div className="text-2xl min-h-60 text-center">Loading...</div>
            ) : (
              <div className="text-xl min-h-60 text-center">
                {comments.length === 0
                  ? "No comments yet, be the first one to add!"
                  : null}
                {comments.map((comment) => (
                  <p>
                    “
                    <Truncate lines={3} ellipsis="...”">
                      {comment.content}”
                    </Truncate>
                    {" —"} {comment.author}
                  </p>
                ))}
              </div>
            )}
          </div>
        </WithSeeMore>
      );
    },
    seeMore: CommentsModal,
    seeMoreCollapsed: SeeMoreReplayComment,
  },
];
