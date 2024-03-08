import UserAvatar from "../user/UserAvatar"

const UserCard = ({ user: { avatar, username, name } }) => (
  <div className="flex items-center gap-3">
    <UserAvatar src={avatar} username={username} />

    <div className="flex flex-col">
      <span className="text-sm font-semibold">{username}</span>
      <span className="text-xs font-light">({name})</span>
    </div>
  </div>
)

export default UserCard
