import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {store} from "@/store";
import {Provider} from "react-redux";
import ThemeProvider from "@/layouts/themeProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </Provider>
)
