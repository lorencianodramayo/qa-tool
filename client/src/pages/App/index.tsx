import React, { FC } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
//pages
import { Adlib, Playground } from '../../pages';

const App: FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Adlib />} />
        <Route path="/playground/:id" element={<Playground />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
