import { StoryContext } from "contexts/StoryContext";
import React, { useContext, useState } from "react";

const NUMBER = ["6285772712440", "6285157590255"];
const NAME = ["Faridah & Rakha", "Rakha & Faridah"];

function getWhatsappLink(to: number, name: string, rsvp: string) {
  const num = NUMBER[to];
  const message = `Halo ${NAME[to]} 👋
Saya mau RSVP untuk acara resepsi ${
    NAME[to]
  } hari Sabtu, 18 September 2021 nanti ya di Royal Tulip Gunung Geulis, Bogor

Nama: ${name}
Kehadiran: ${rsvp}
Vaksin: Belum/1 dosis/2 dosis
Jumlah tamu: 1 orang

${
  rsvp === "Ya!"
    ? "Semoga lancar dan sampai jumpa nanti!"
    : "Semoga lancar acaranya! Nanti saya ikut live streamingnya aja di https://faridah-rakha.wedding/live ya~"
}`;

  return `https://api.whatsapp.com/send?phone=${num}&text=${encodeURIComponent(
    message
  )}`;
}

export const AddComment = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [rsvp, setRsvp] = useState("Ya!");
  const [comment, setComment] = useState("");
  const { isInvited } = useContext(StoryContext);

  return (
    <div className="w-full">
      <form
        className="pb-8 mb-4 border-black border-opacity-20 border-b"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ content: comment, author: username });
          setUsername("");
          setComment("");
        }}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Dari..
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Budi &amp; Mawar"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {isInvited ? (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Bisa datang?
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="rsvp"
              onChange={(e) => setRsvp(e.target.value)}
            >
              <option value="Ya!">Ya!</option>
              <option value="Maaf, belum bisa :(">Maaf, belum bisa :(</option>
            </select>
          </div>
        ) : null}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="comment"
          >
            Pesan
          </label>
          <textarea
            name="comment"
            id="comment"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={2}
            placeholder="Congrats! Semoga sakinah mawaddah warahmah 🎊"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          {!isInvited ? (
            <button
              className="bg-dusty-blue text-blue-ink hover:bg-blue-ink hover:text-white font-bold py-2 px-4 rounded border border-transparent focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:text-gray-400"
              type="submit"
              disabled={comment.length === 0 || username.length === 0}
            >
              Submit
            </button>
          ) : null}

          {isInvited ? (
            <>
              <button
                className="bg-dusty-blue text-blue-ink hover:bg-blue-ink hover:text-white font-bold py-2 px-4 rounded border border-transparent focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:text-gray-400"
                type="submit"
                onClick={() => window.open(getWhatsappLink(0, username, rsvp))}
                disabled={comment.length === 0 || username.length === 0}
              >
                RSVP ke Faridah
              </button>
              <button
                className="bg-dusty-blue text-blue-ink hover:bg-blue-ink hover:text-white font-bold py-2 px-4 rounded border border-transparent focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:text-gray-400"
                type="submit"
                onClick={() => window.open(getWhatsappLink(1, username, rsvp))}
                disabled={comment.length === 0 || username.length === 0}
              >
                RSVP ke Rakha
              </button>
            </>
          ) : null}
        </div>
      </form>
    </div>
  );
};
