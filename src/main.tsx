import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-600.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import RecoilNexus from 'recoil-nexus'
import { App } from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('nvs-calculator-root')!).render(
	<React.StrictMode>
		<RecoilRoot>
			<App />
			<RecoilNexus />
		</RecoilRoot>
	</React.StrictMode>,
)
