import useWindowDimensions from "hooks/useWindowDimensions";
import React, { Component, useEffect } from "react";
import { isMobile } from "react-device-detect";
import Logo from "assets/logo.svg";
import LogoCircle from "assets/logo-circle.svg";
import Image from "next/image";
import ImgCover1 from "assets/cover-1.jpg";
import ImgCover2 from "assets/cover-2.jpg";
import ImgFaridah from "assets/faridah.jpg";
import ImgRakha from "assets/rakha.jpg";
import GettingMarried from "assets/getting-married.svg";

import Stories, { WithHeader, WithSeeMore } from "react-insta-stories";
import { Story } from "react-insta-stories/dist/interfaces";

const ASPECT_RATIO = 16 / 9;

const App = () => {
  const { width, height } = useWindowDimensions();

  let storyWidth, storyHeight;

  if (width == null || height == null) {
    return null;
  }

  if (isMobile) {
    storyWidth = "100vw";
    storyHeight = "100vh";
  } else {
    storyWidth = height / ASPECT_RATIO;
    storyHeight = height;

    if (storyWidth > width) {
      storyWidth = width;
      storyHeight = width * ASPECT_RATIO;
    }
  }

  return (
    <div className="stories-container">
      <Stories
        stories={stories}
        defaultInterval={10000}
        height={storyHeight}
        width={storyWidth}
        keyboardNavigation
        // currentIndex={3}
        // loop
      />
    </div>
  );
};

export default App;

const defaultHeader = {
  heading: "Faridah & Rakha",
  subheading: null,
  profileImage: LogoCircle,
};

const socials = [
  {
    name: "linkedin",
    logo: "logo-linkedin.svg",
  },
  {
    name: "twitter",
    logo: "logo-twitter.svg",
  },
  {
    name: "instagram",
    logo: "logo-instagram.svg",
  },
  {
    name: "github",
    logo: "logo-github.svg",
  },
];

const stories: Story[] = [
  {
    // header: defaultHeader,
    duration: 3000,
    content: ({ story, action, config }) => {
      // useEffect(() => {
      //   setTimeout(() => {
      //     action("pause");
      //   }, 100);
      // }, []);
      return (
        <div className="relative h-full w-full">
          <Image
            src={ImgCover1}
            className="absolute inset-0"
            layout="fill"
            objectFit="cover"
          />
          <div className="story story-with-header text-white absolute inset-0 grid py-32 content-start">
            <Image src={Logo} height={140} width={140} />
          </div>
        </div>
      );
    },
  },
  {
    header: defaultHeader,
    duration: 3000,
    content: ({ story, action, config }) => {
      // useEffect(() => {
      //   setTimeout(() => {
      //     action("pause");
      //   }, 2000);
      // }, []);
      return (
        <div className="relative h-full w-full">
          <Image
            src={ImgCover2}
            className="absolute inset-0"
            layout="fill"
            objectFit="cover"
          />
          <div className="story bg-dusty-blue bg-opacity-80 absolute inset-0 grid py-32 content-between text-center">
            <Image src={Logo} height={140} width={140} />
            <Image src={GettingMarried} height={843} width={1026} />

            <div>
              <h3 className="text-6xl text-blue-ink">
                <time dateTime="2021-09-18 07:30+07:00">18.09.2021</time>
              </h3>
              <h4 className="text-3xl text-blue-ink italic">
                Royal Tulip Gunung Geulis
              </h4>
            </div>
          </div>
        </div>
      );
    },
  },

  {
    // header: defaultHeader,
    duration: 5000,
    content: ({ story, config }) => {
      return (
        <div className="relative h-full w-full">
          <Image
            src={ImgFaridah}
            className="absolute inset-0"
            layout="fill"
            objectFit="cover"
          />
          <div className="story story-with-header text-white bg-blue-ink bg-opacity-50 absolute inset-0 grid content-start pr-32">
            <h2 className="text-xl italic">The Bride</h2>
            <h3 className="text-4xl">Faridah Nur Suci Amirahmandani, S.Kom</h3>
            <p className="italic">
              putri dari <br />
              Bpk. Arief Hamdani dan Ibu Khukamah
            </p>
          </div>
        </div>
      );
    },
  },
  {
    header: defaultHeader,
    duration: 1000,
    content: ({ story, config }) => {
      return (
        <div className="relative h-full w-full">
          <Image
            src={ImgRakha}
            className="absolute inset-0"
            layout="fill"
            objectFit="cover"
          />
          <div className="story story-with-header text-white bg-blue-ink bg-opacity-50 absolute inset-0 grid content-between">
            <div className="max-w-sm">
              <h2 className="text-xl italic">The Groom</h2>
              <h3 className="text-4xl">Rakha Kanz Kautsar, S.Kom</h3>
              <p className="italic">
                putra dari <br />
                Bpk. Brilliantoro dan Ibu Maulina Dian Purwanti
              </p>
            </div>
            {/* <div className="grid social mt-4 place-content-center">
              {socials.map((social, index) => (
                <a
                  key={social.name}
                  role="button"
                  href={`/${social.name}`}
                  className="btn btn-secondary"
                  data-splitbee-event="External Link"
                  data-splitbee-event-type={social.name}
                >
                  {social.name}
                </a>
              ))}
            </div> */}
          </div>
        </div>
      );
    },
  },
  // {
  //   header: {
  //     heading: "Mohit Karekar",
  //     subheading: "Posted 30m ago",
  //     profileImage: "https://picsum.photos/100/100",
  //   },
  //   content: ({ action, story, config }) => {
  //     return (
  //       <WithHeader story={story} globalHeader={config.header}>
  //         <WithSeeMore story={story} action={action}>
  //           <div style={{ background: "snow", padding: 20, height: "100%" }}>
  //             <h1 style={{ marginTop: "100%", marginBottom: 0 }}>🌝</h1>
  //             <h1 style={{ marginTop: 5 }}>
  //               We have our good old image and video stories, just the same.
  //             </h1>
  //           </div>
  //         </WithSeeMore>
  //       </WithHeader>
  //     );
  //   },
  //   seeMoreCollapsed: ({ toggleMore, action }) => (
  //     <p style={customSeeMore} onClick={() => toggleMore(true)}>
  //       A custom See More message →
  //     </p>
  //   ),
  //   seeMore: ({ close }) => (
  //     <div
  //       style={{
  //         maxWidth: "100%",
  //         height: "100%",
  //         padding: 40,
  //         background: "white",
  //       }}
  //     >
  //       <h2>Just checking the see more feature.</h2>
  //       <p style={{ textDecoration: "underline" }} onClick={close}>
  //         Go on, close this popup.
  //       </p>
  //     </div>
  //   ),
  //   duration: 10000,
  // },
  // {
  //   url: "https://picsum.photos/1080/1920",
  //   header: {
  //     heading: "Mohit Karekar",
  //     subheading: "Posted 30m ago",
  //     profileImage: "https://picsum.photos/100/100",
  //   },
  //   seeMore: ({ close }) => (
  //     <div
  //       style={{
  //         maxWidth: "100%",
  //         height: "100%",
  //         padding: 40,
  //         background: "white",
  //       }}
  //     >
  //       <h2>Just checking the see more feature.</h2>
  //       <p style={{ textDecoration: "underline" }} onClick={close}>
  //         Go on, close this popup.
  //       </p>
  //     </div>
  //   ),
  // },
  // {
  //   url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  //   type: "video",
  // },
];

const image = {
  display: "block",
  maxWidth: "100%",
  borderRadius: 4,
};

const code = {
  background: "#eee",
  padding: "5px 10px",
  borderRadius: "4px",
  color: "#333",
};

const contentStyle = {
  background: "#333",
  width: "100%",
  maxWidth: 768,
  maxHeight: 1024,
  padding: 20,
  color: "white",
  height: "100%",
};

const customSeeMore = {
  textAlign: "center",
  fontSize: 14,
  bottom: 20,
  position: "relative",
};
