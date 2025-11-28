"use client"

import { persistor, store } from "@/store/store"
import {
  MantineProvider,
  createTheme,
  localStorageColorSchemeManager,
} from "@mantine/core"
import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

const theme = createTheme({
  primaryColor: "blue",
  fontFamily: "Inter, sans-serif",
  headings: {
    fontFamily: "Inter, sans-serif",
  },
})

const colorSchemeManager = localStorageColorSchemeManager({
  key: "my-app-color-scheme",
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager}>
          {children}
        </MantineProvider>
      </PersistGate>
    </ReduxProvider>
  )
}
