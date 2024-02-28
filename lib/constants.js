import {
  BriefcaseIcon,
  FileQuestionIcon,
  HomeIcon,
  StarIcon,
  TagIcon,
  UsersIcon,
} from "lucide-react"

export const navLinks = [
  { route: "/", Icon: HomeIcon, label: "Home" },
  { route: "/community", Icon: UsersIcon, label: "Community" },
  { route: "/collections", Icon: StarIcon, label: "Collections" },
  { route: "/find-job", Icon: BriefcaseIcon, label: "Find Job" },
  { route: "/tags", Icon: TagIcon, label: "Tags" },
  { route: "/ask-question", Icon: FileQuestionIcon, label: "Ask Question" },
]
