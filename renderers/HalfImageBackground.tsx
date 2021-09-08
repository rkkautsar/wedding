import * as React from "react";
import Image from "next/image";
import { WithHeader, WithSeeMore } from "react-insta-stories";
import { Renderer, Tester } from "react-insta-stories/dist/interfaces";
import { Loader } from "components/Loader";

export const renderer: Renderer = (props) => {
  const { story, action, config } = props;
  const [loaded, setLoaded] = React.useState(false);
  const { width, height, loader } = config;

  React.useEffect(() => {
    setLoaded(false);
  }, [story]);

  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (
      !loaded &&
      (ref.current?.firstChild?.firstChild as HTMLImageElement | undefined)
        ?.complete
    ) {
      setLoaded(true);
    }
  }, [loaded]);

  const imageLoaded = () => {
    setLoaded(true);
    action("play");
  };

  const Content = story.originalContent;

  return (
    <WithHeader story={story} globalHeader={config.header}>
      <WithSeeMore story={story} action={action}>
        <div ref={ref} className="relative h-full w-full bg-black inset-0">
          <div className="absolute inset-0 bg-black flex flex-col">
            <div className="flex-1 relative">
              {loaded ? <Content {...props} /> : null}
            </div>

            <div className="flex-1 relative">
              <Image
                src={story.url}
                className="flex-1"
                layout="fill"
                objectFit="cover"
                objectPosition="bottom center"
                onLoad={imageLoaded}
                priority
              />
            </div>
          </div>
          {!loaded ? (
            <div className="absolute inset-0">
              <div
                style={{
                  width: width,
                  height: height,
                  background: "rgba(0, 0, 0, 0.9)",
                  zIndex: 9999,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#ccc",
                }}
              >
                {loader || <Loader />}
              </div>
            </div>
          ) : null}
        </div>
      </WithSeeMore>
    </WithHeader>
  );
};

export const tester: Tester = (story) => {
  return {
    condition: story.content && story.type === "halfImageBackground",
    priority: 99,
  };
};

export default {
  renderer,
  tester,
};
