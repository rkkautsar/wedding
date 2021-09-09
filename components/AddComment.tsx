import { StoryContext } from "contexts/StoryContext";
import React, { useContext, useState } from "react";

const NUMBER = ["6285772712440", "6285157590255"];
const NAME = ["Faridah & Rakha", "Rakha & Faridah"];

function getWhatsappLink(
  to: number,
  name: string,
  rsvp: string,
  vaccine: string,
  numGuest: string
) {
  const num = NUMBER[to];
  const message = `Halo ${NAME[to]} 👋
Saya mau RSVP untuk acara resepsi ${
    NAME[to]
  } hari Sabtu, 18 September 2021 nanti ya di Royal Tulip Gunung Geulis, Bogor

Nama: ${name}
Kehadiran: ${rsvp}
${rsvp === "Ya!" ? `Vaksin: ${vaccine}` : ""}
${rsvp === "Ya!" ? `Jumlah tamu: ${numGuest}` : ""}

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
  const [rsvp, setRsvp] = useState("-");
  const [vaccine, setVaccine] = useState("-");
  const [numGuest, setNumGuest] = useState("-");
  const [comment, setComment] = useState("");
  const { isInvited } = useContext(StoryContext);
  let isFilled = [username, comment].every((field) => field.length > 0);
  if (isInvited) {
    isFilled = isFilled && rsvp !== "-";
  }

  if (rsvp === "Ya!") {
    isFilled = vaccine !== "-" && numGuest !== "-";
  }

  return (
    <div className="w-full">
      <form
        className="pb-8 mb-4 border-black border-opacity-20 border-b"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ content: comment, author: username });
          setUsername("");
          setComment("");
          setRsvp("-");
          setVaccine("-");
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
              htmlFor="rsvp"
            >
              Bisa datang?
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="rsvp"
              onChange={(e) => setRsvp(e.target.value)}
              value={rsvp}
            >
              <option value="-" disabled>
                (Pilih...)
              </option>
              <option value="Ya!">Ya!</option>
              <option value="Maaf, belum bisa :(">Maaf, belum bisa :(</option>
            </select>
          </div>
        ) : null}
        {isInvited && rsvp === "Ya!" ? (
          <>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="numGuest"
              >
                Berapa yang datang?
              </label>
              <select
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="numGuest"
                onChange={(e) => setNumGuest(e.target.value)}
                value={numGuest}
              >
                <option value="-" disabled>
                  (Pilih...)
                </option>
                <option value="1 orang">1 orang</option>
                <option value="2 orang">2 orang</option>
                <option value="3 orang">3 orang</option>
                <option value="4 orang">4 orang</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="vaccine"
              >
                Semua sudah vaksin?
              </label>
              <select
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="vaccine"
                onChange={(e) => setVaccine(e.target.value)}
                value={vaccine}
              >
                <option value="-" disabled>
                  (Pilih...)
                </option>
                <option value="Semua sudah 2 dosis!">
                  Semua sudah 2 dosis!
                </option>
                <option value="Ada yang baru 1 dosis, nanti antigen dari rumah">
                  Ada yang baru 1 dosis, nanti antigen dari rumah
                </option>
                <option value="Ada yang belum, nanti antigen dari rumah">
                  Ada yang belum, nanti antigen dari rumah
                </option>
              </select>
            </div>
          </>
        ) : null}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="comment"
          >
            Pesan untuk Faridah &amp; Rakha
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
              disabled={!isFilled}
            >
              Submit
            </button>
          ) : null}

          {isInvited ? (
            <>
              <button
                className="bg-dusty-blue text-blue-ink hover:bg-blue-ink hover:text-white font-bold py-2 px-4 rounded border border-transparent focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:text-gray-400"
                type="submit"
                onClick={() =>
                  window.open(
                    getWhatsappLink(0, username, rsvp, vaccine, numGuest)
                  )
                }
                disabled={!isFilled}
              >
                RSVP ke Faridah
              </button>
              <button
                className="bg-dusty-blue text-blue-ink hover:bg-blue-ink hover:text-white font-bold py-2 px-4 rounded border border-transparent focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:text-gray-400"
                type="submit"
                onClick={() =>
                  window.open(
                    getWhatsappLink(1, username, rsvp, vaccine, numGuest)
                  )
                }
                disabled={!isFilled}
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
