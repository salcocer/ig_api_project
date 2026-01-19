import Stories from "./Stories";

export default function Profile() {
  return (
    <div className="border-b border-gray-300">
      {/* Profile Header - 120px height */}
      <div className="h-[120px] border border-gray-400 p-4">
        <div className="text-xs text-gray-500">Profile</div>
      </div>
      
      {/* Stories - 180px height */}
      <Stories />
    </div>
  );
}