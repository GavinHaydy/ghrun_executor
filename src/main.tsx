import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {persist, store} from "@/store";
import {Provider} from "react-redux";
import ThemeProvider from "@/layouts/themeProvider.tsx";
import {I18nextProvider} from "react-i18next"
import i18n from "@/locales/i18n.ts";
import {PersistGate} from 'redux-persist/integration/react'


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
            <ThemeProvider>
                <I18nextProvider i18n={i18n}>
                    <App/>
                </I18nextProvider>
            </ThemeProvider>
        </PersistGate>
    </Provider>
)

