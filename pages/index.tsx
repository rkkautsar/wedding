import React, { useContext, useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";
import { useRouter } from "next/router";
import Logo from "assets/logo.svg";
import SVGQRCode from "assets/qr-code.svg";
import Image from "next/image";
import ImgCover1 from "assets/cover-1.jpg";
import ImgCover2 from "assets/cover-2.jpg";
import ImgCover3 from "assets/cover-3.jpg";
import ImgCover4 from "assets/cover-4.jpg";
import ImgAvatar from "assets/avatar.jpg";
import ImgFaridah from "assets/faridah.jpg";
import ImgRakha from "assets/rakha.jpg";
import ImgRoyalTulip from "assets/royal-tulip.jpg";
import ImgMap from "assets/map.jpg";
import GettingMarried from "assets/getting-married-2.svg";

import Stories, { WithHeader, WithSeeMore } from "react-insta-stories";
import { Story } from "react-insta-stories/dist/interfaces";
import { formatDuration, intervalToDuration } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { SeeMoreLink, SeeMoreReplayComment } from "components/SeeMoreCollapsed";
import BackgroundCustomContent from "renderers/BackgroundCustomContent";
import { StoryContext } from "contexts/StoryContext";
import { CommentsModal } from "components/CommentsModal";
import { useComments } from "hooks/useComments";
import HalfImageBackground from "renderers/HalfImageBackground";

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
        <div className="p-4 text-lg text-gray-700">
          <h3 className="text-xl text-gray-800">
            Royal Tulip Gunung Geulis, Bogor
          </h3>
          <p>07.30-10.00 WIB (Akad)</p>
          <p>12.00-14.00 WIB (Resepsi)</p>
        </div>
      </div>
    </div>
  );
}

const App = (props: { deviceType: "mobile" | "desktop" }) => {
  const router = useRouter();

  let storyWidth = `calc(var(--vh) * 100 / ${ASPECT_RATIO})`;
  let storyHeight = "calc(var(--vh) * 100)";

  if (props.deviceType === "mobile") {
    storyWidth = "100vw";
    storyHeight = "calc(var(--vh) * 100)";
  }

  const [currentIndex, setCurrentIndex] = useState(undefined);

  return (
    <div className="stories-container">
      <StoryContext.Provider
        value={{ setCurrentIndex, isInvited: router.query["i"] === "1" }}
      >
        <Stories
          currentIndex={currentIndex}
          stories={stories}
          defaultInterval={10000}
          height={storyHeight}
          width={storyWidth}
          keyboardNavigation
          renderers={[BackgroundCustomContent, HalfImageBackground]}
        />
      </StoryContext.Provider>
    </div>
  );
};

export async function getServerSideProps(context) {
  const UA = context.req.headers["user-agent"];
  const isMobile = Boolean(
    UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  return {
    props: {
      deviceType: isMobile ? "mobile" : "desktop",
    },
  };
}

export default App;

const defaultHeader = {
  heading: "Faridah & Rakha",
  subheading: null,
  profileImage: ImgAvatar,
};

const stories: Story[] = [
  {
    header: defaultHeader,
    type: "backgroundCustomContent",
    url: ImgCover1,
    duration: 3000,
    content: () => {
      return (
        <div className="story story-with-header text-white grid py-32 content-start">
          <Image src={Logo} height={120} width={120} />
        </div>
      );
    },
  },
  {
    header: defaultHeader,
    type: "backgroundCustomContent",
    url: ImgCover2,
    duration: 5000,
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
          <Image src={Logo} height={120} width={120} priority />
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
    url: ImgCover4,
    type: "halfImageBackground",
    duration: 5000,
    content: ({ story, config }) => {
      return (
        <div className="story story-with-header w-full h-full grid place-items-center p-4 bg-white text-black text-center ">
          <div>
            <p className="italic unna mb-4">
              And one of His signs is that He created for you spouses from among
              yourselves so that you may find comfort in them. And He has placed
              between you compassion and mercy. Surely in this are signs for
              people who reflect.
            </p>
            <p className="font-bold">Ar-Ruum (The Romans): 21</p>
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
          <h2 className="text-xl text-gray-200">The Bride</h2>
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
            <h2 className="text-xl text-gray-200">The Groom</h2>
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
      const { isInvited } = useContext(StoryContext);
      return (
        <div className="story story-with-header text-white bg-black bg-opacity-10">
          <div className="text-center grid place-content-evenly sm:pt-16 h-full py-12">
            {isInvited ? (
              <div>
                <p className="text-lg italic sm:text-2xl mb-4">
                  Kami sangat mengharapkan kehadiran anda di acara resepsi kami!
                </p>
                <p className="text-xs sm:text-lg">
                  Namun demi keamanan dan kenyamanan bersama, setiap tamu
                  (kecuali umur 12 tahun ke bawah) diwajibkan untuk menunjukkan
                  bukti vaksin kedua atau swab antigen 1x24 jam sebelum
                  kehadiran. Kami mohon pengertian dan kerjasamanya. Jika
                  berhalangan, kami juga menyediakan siaran langsung akad kami
                  di link berikut:
                </p>
              </div>
            ) : null}
            {!isInvited ? (
              <p className="italic text-2xl sm:text-3xl">
                Due to the current pandemic situation, we will be very glad to
                have you witness our wedding vows through our youtube live
                streaming below.
              </p>
            ) : null}
            <div className="grid gap-4">
              <Image src={SVGQRCode} height={120} width={120} />
            </div>
          </div>
        </div>
      );
    },
    seeMore: () => {},
    seeMoreCollapsed: ({ action }) => (
      <SeeMoreLink
        label="https://faridah-rakha.wedding/live"
        link="/live"
        action={action}
      />
    ),
  },
  {
    header: defaultHeader,
    duration: 30000,
    content: ({ story, action, config }) => {
      const { comments, loading } = useComments(
        process.env.NODE_ENV === "production"
          ? "https://wed-comments-fr.graphcdn.app"
          : "https://wed-comments.herokuapp.com/v1/graphql",
        "wedding-comments",
        {
          limit: 10,
        }
      );
      const [commentIdx, setCommentIdx] = useState<number>(0);

      useEffect(() => {
        if (loading) return;
        if (comments.length === 0) {
          return;
        }

        setCommentIdx(0);
        const id = setInterval(() => {
          setCommentIdx((prev) => (prev + 1) % comments.length);
        }, 3000);
        return () => clearInterval(id);
      }, [loading, comments]);

      return (
        <WithHeader story={story} globalHeader={config.header}>
          <WithSeeMore story={story} action={action}>
            <div className="story story-with-header bg-white grid place-content-evenly">
              <Image src={Logo} height={120} width={120} layout="intrinsic" />
              {loading ? (
                <div className="text-2xl min-h-60 text-center">Loading...</div>
              ) : (
                <div className="text-xl min-h-60 text-center">
                  {comments.length === 0 ? (
                    "No comments yet, be the first one to add!"
                  ) : (
                    <div className="text-center">
                      <TextTransition
                        text={`“${comments[commentIdx].content}” —${comments[commentIdx].author}`}
                        springConfig={presets.stiff}
                        direction="down"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </WithSeeMore>
        </WithHeader>
      );
    },
    seeMore: CommentsModal,
    seeMoreCollapsed: SeeMoreReplayComment,
  },
];
