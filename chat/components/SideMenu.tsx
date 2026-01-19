import Image from "next/image";

export default function SideMenu() {
  return (
    <div className="h-full w-full border border-gray-400">
      {/* SideMenu - 60px wide */}
      <div className="p-2 text-xs text-gray-500">
        SideMenu
        <div className="mb-4">
          <Image
            src="icon.svg"
            alt="app_icon"
            width={24}
            height={24}
            className="dark:invert"
          />
        </div>
        <div className="mb-4">
          <Image
            src="close.svg"
            alt="close_icon"
            width={24}
            height={24}
            className="dark:invert"
          />
        </div>
        <div className="mb-4">
          <Image
            src="send.svg"
            alt="send_icon"
            width={24}
            height={24}
            className="dark:invert"
          />
        </div>
        <div className="mb-4">
          <Image
            src="settings.svg"
            alt="settings_icon"
            width={24}
            height={24}
            className="dark:invert"
          />
        </div>
      </div>
    </div>
  );
}
