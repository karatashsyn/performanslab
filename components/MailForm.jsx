import React from "react";

export default function MailForm() {
  return (
    <>
      <h1 className="mt-36 sm:mt-48 mb-12 text-primary-white text-center  arial text-[1.6rem] leading-[0.72]  font-bold">
        Mail Gönder
      </h1>
      <div className="w-full justify-between flex sm:px-24 ">
        <form className="flex h-full flex-col gap-4  w-full mt-[1px]">
          <input
            type="text"
            placeholder="Adınız"
            className="outline-none p-2 bg-neutral-800 focus:placeholder:opacity-100 placeholder:opacity-50 placeholder:text-white  rounded-sm text-white"
          />
          <input
            type="email"
            placeholder="Mail Adresiniz"
            className=" outline-none p-2 bg-neutral-800 focus:placeholder:opacity-100 placeholder:opacity-50 placeholder:text-white rounded-sm text-white"
          />
          <textarea
            placeholder="Mesajınız"
            className="outline-none bg-neutral-800 p-2  focus:placeholder:opacity-100 placeholder:opacity-50 placeholder:text-white  rounded-sm text-white "
          ></textarea>
          <button className="mt-auto !w-full bg-bright-red text-white font-semibold p-2 rounded-sm">
            Gönder
          </button>
        </form>
      </div>
    </>
  );
}
