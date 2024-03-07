import UserSearchModal from "../modals/UserSearchModal"

const ChannelSidebar = () => {
  return (
    <div className="grow rounded-tl-xl bg-black/15 p-2 dark:bg-white/15">
      <div className="flex items-center justify-between p-1">
        <span className="text-xs font-[600] text-slate-800 dark:text-slate-300">
          MESSAGES
        </span>

        <UserSearchModal />
      </div>
    </div>
  )
}

export default ChannelSidebar
