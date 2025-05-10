import { InteractiveBGMController } from '@/features/bgm-system/bgm-content'
import { AppProvider } from './provider'
import { AppRouter } from './router'

function App() {
  return (
    <AppProvider>
      <InteractiveBGMController />
      <AppRouter />
    </AppProvider>
  )
}

export default App
