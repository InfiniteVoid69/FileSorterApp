export const SettingsButton = () => {
  const handleSettingsClick = () => {};

  return (
    <button
      className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md hover:bg-[#393939] text-gray-300 w-full"
      onClick={handleSettingsClick}
    >
      Settings
    </button>
  );
};
