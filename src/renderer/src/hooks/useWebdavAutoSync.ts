import Logger from '@renderer/config/logger'
import { autoSyncWebdav } from '@renderer/services/BackupService'
import { useCallback, useState } from 'react'

export const useWebDavAutoSync = () => {
  const [syncing, setSyncing] = useState(false)
  const run = useCallback(async () => {
    if (syncing) return
    setSyncing(true)
    try {
      await autoSyncWebdav()
      window.message.success('自动同步成功')
    } catch (error) {
      Logger.error(error)
      window.message.error('自动同步失败')
    } finally {
      setSyncing(false)
    }
  }, [syncing])

  return {
    syncing,
    run
  }
}
