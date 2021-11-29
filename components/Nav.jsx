import Image from "next/image";

const Nav = () => {
  return (
    <div className="navbar mb-4 shadow-lg bg-secondary-focus text-neutral-content rounded-box">
      <div className="flex-1 px-2 mx-2">
        <span className="text-lg font-bold">YT tools</span>
        <div className="badge ml-2">beta</div>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <Image
            src="https://img.icons8.com/material-outlined/50/ffffff/github.png"
            alt="github"
            width={30}
            height={30}
          />
        </button>
      </div>
    </div>
  );
};

export default Nav;
