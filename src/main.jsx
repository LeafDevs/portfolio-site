import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './paths/App.jsx'
import Mods from './paths/mods.jsx'
import Photography from './paths/photography.jsx'
import Websites from './paths/websites.jsx'
import Graphic from './paths/graphic.jsx'
import Libraries from './paths/libraries.jsx'
import UI from './paths/ui.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mods" element={<Mods />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/apps" element={<Websites />} />
        <Route path="/design" element={<Graphic />} />
        <Route path="/libraries" element={<Libraries />} />
        <Route path="/ui" element={<UI />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
