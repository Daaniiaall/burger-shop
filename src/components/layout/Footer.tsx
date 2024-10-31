import { IoMdHeart } from "react-icons/io";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-teal-500 to-lime-500  my-4 w-11/12 mx-auto rounded-lg h-12 text-center text-md text-neutral-100 flex justify-center items-center">
      <p style={{direction: "ltr"}}>
        developed by{" "}
        <a
          href="https://github.com/Daaniiaall/"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-100 e text-lg"
        >
          Danial Momenpour
        </a>{" "}
        with <IoMdHeart className="inline-block text-red-500  relative -top-[0.2rem]" />
      </p>
    </footer>
  );
}

export default Footer;