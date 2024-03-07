"use client"
import { useParams } from "next/navigation"

const ConversationPage = () => {
  const { conversationId } = useParams()
  return <div>{conversationId}</div>
}

export default ConversationPage
