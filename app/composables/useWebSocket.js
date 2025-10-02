let heartbeatInterval = null

export const useWebSocket = () => {
  const runtimeConfig = useRuntimeConfig();
  const ws = ref(null)
  const isConnected = ref(false)

  const openChatConnection = async (payload) => {
    if (!isConnected.value) {
      // ws.value = new WebSocket(`http://localhost:3099/ws-socket?user_id=${payload.user_id}&character_id=${payload.character_id}&session_key=${payload.session_key}`)
      ws.value = new WebSocket(`${runtimeConfig.public.WS_URL}?user_id=${payload.user_id}&character_id=${payload.character_id}&session_key=${payload.session_key}`)

      ws.value.onopen = () => {
        heartbeatInterval = setInterval(() => {
          if (ws.value?.readyState === WebSocket.OPEN) {
            ws.value.send(JSON.stringify({ type: 'ping' }))
          }
        }, 30000)
      }

      ws.value.onclose = () => {
        if (heartbeatInterval) {
          clearInterval(heartbeatInterval)
          heartbeatInterval = null
        }
      }
    }
  }

  const closeChatConnection = () => {
    if (ws.value) {
      ws.value.close()
      ws.value = null
    }
  }

  onBeforeUnmount(() => {
    closeChatConnection()
  })

  if (process.client) {
    window.addEventListener('beforeunload', closeChatConnection)
  }

  return {
    openChatConnection,
  }
}