import Image from "next/image";

export default function SideMenu({ openModal }: { openModal: () => void }) {
  return (
    <div className="h-full w-full border border-gray-400">
      {/* SideMenu - 60px wide */}
      <div className="p-2 text-xs text-gray-500">
        SideMenu
        <button className="mb-4" onClick={() => openModal()}>
          <Image
            src="icon.svg"
            alt="app_icon"
            width={40}
            height={40}
            className="dark:invert"
          />
        </button>
      </div>
      <div className="mb-4">
        <Image
          src="close.svg"
          alt="close_icon"
          width={40}
          height={40}
          className="dark:invert"
        />
      </div>
      <div className="mb-4">
        <Image
          src="send.svg"
          alt="send_icon"
          width={40}
          height={40}
          className="dark:invert"
        />
      </div>
      <div className="mb-4">
        <Image
          src="settings.svg"
          alt="settings_icon"
          width={40}
          height={40}
          className="dark:invert"
        />
      </div>
    </div>
  );
}
