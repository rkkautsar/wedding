import { useEffect } from "react";
import { useComments } from "use-comments";
import { AddComment } from "./AddComment";

export const formatStatus = (status) => {
  switch (status) {
    case "failed":
      return "request failed";
    case "added":
      return "👌";
    case "delivered-awaiting-approval":
      return "🕑";
    case "sending":
      return "✉️";
    default:
      return "";
  }
};

const stopPropagation = (e: Event) => {
  e.stopPropagation();
};

export const CommentsModal = ({ close }) => {
  const { comments, addComment, count, loading } = useComments(
    "https://wed-comments.herokuapp.com/v1/graphql",
    "wedding-comments"
  );

  useEffect(() => {
    document.addEventListener("keydown", stopPropagation, true);
    return () => document.removeEventListener("keydown", stopPropagation, true);
  }, []);

  return (
    <div className="h-screen w-full flex items-end relative pt-12">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={close}
      />
      <div className="absolute inset-0 pt-12 flex items-end pointer-events-none">
        <div className="max-h-full bg-white rounded-t-xl overflow-auto w-full pointer-events-auto grid place-items-center">
          <div className="w-full flex justify-end">
            <button onClick={close} className="text-4xl self-end p-4">
              &times;
            </button>
          </div>
          <section className="w-full max-w-md p-4 grid place-items-center">
            <AddComment onSubmit={addComment} />
            <h3 className="font-bold text-xm">
              {count === 1 ? "1 comment" : `${count} comments`}
            </h3>
            {loading ? (
              "Loading..."
            ) : (
              <div className="w-full">
                {comments.map(
                  ({ author, content, created_at: createdAt, status }) => (
                    <article
                      key={`${createdAt}${author}`}
                      className="bg-white overflow-hidden border-black border-opacity-20 border-b my-6 py-4 w-full"
                    >
                      <div className="font-bold text-xm mb-2">
                        {author} ・ {new Date(createdAt).toLocaleDateString()}
                        {status && `・ ${formatStatus(status)}`}
                      </div>
                      <p className="text-gray-700 text-base">{content}</p>
                    </article>
                  )
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
