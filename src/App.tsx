import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileQuickNav } from './components/MobileQuickNav';
import { HomePage } from './pages/HomePage';
import { Tap1Chuong1Page } from './pages/Tap1Chuong1Page';
import { Tap1Chuong2Page } from './pages/Tap1Chuong2Page';
import { Tap1Chuong3Page } from './pages/Tap1Chuong3Page';
import { Tap1Chuong4Page } from './pages/Tap1Chuong4Page';
import { Tap1Chuong5Page } from './pages/Tap1Chuong5Page';
import { Tap1Chuong6Page } from './pages/Tap1Chuong6Page';
import { Tap1Chuong7Page } from './pages/Tap1Chuong7Page';
import { Tap1Chuong8Page } from './pages/Tap1Chuong8Page';
import { Tap1Chuong9Page } from './pages/Tap1Chuong9Page';
import { Tap1DoAnPage } from './pages/Tap1DoAnPage';
import { Tap2Chuong1Page } from './pages/Tap2Chuong1Page';
import { Tap2Chuong2Page } from './pages/Tap2Chuong2Page';
import { Tap2Chuong3Page } from './pages/Tap2Chuong3Page';
import { Tap2Chuong4Page } from './pages/Tap2Chuong4Page';
import { Tap2Chuong5Page } from './pages/Tap2Chuong5Page';
import { Tap2PhuLucPage } from './pages/Tap2PhuLucPage';
import { Tap3Chuong1Page } from './pages/Tap3Chuong1Page';
import { Tap3Chuong2Page } from './pages/Tap3Chuong2Page';
import { Tap3Chuong3Page } from './pages/Tap3Chuong3Page';
import { Tap3Chuong4Page } from './pages/Tap3Chuong4Page';
import { Tap3Chuong5Page } from './pages/Tap3Chuong5Page';
import { Tap3Chuong6Page } from './pages/Tap3Chuong6Page';
import { Tap3PhuLucPage } from './pages/Tap3PhuLucPage';
import { Demo3DPage } from './pages/Demo3DPage';
import { FormulaCheatSheetPage } from './pages/FormulaCheatSheetPage';
import { SymbolReferencePage } from './pages/SymbolReferencePage';
import { MaterialAppendixPage } from './pages/MaterialAppendixPage';
import { QuickSearchPage } from './pages/QuickSearchPage';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text-main font-sans selection:bg-primary-light selection:text-primary">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Tập 1 */}
          <Route path="/tap-1/chuong-1" element={<Tap1Chuong1Page />} />
          <Route path="/tap-1/chuong-2" element={<Tap1Chuong2Page />} />
          <Route path="/tap-1/chuong-3" element={<Tap1Chuong3Page />} />
          <Route path="/tap-1/chuong-4" element={<Tap1Chuong4Page />} />
          <Route path="/tap-1/chuong-5" element={<Tap1Chuong5Page />} />
          <Route path="/tap-1/chuong-6" element={<Tap1Chuong6Page />} />
          <Route path="/tap-1/chuong-7" element={<Tap1Chuong7Page />} />
          <Route path="/tap-1/chuong-8" element={<Tap1Chuong8Page />} />
          <Route path="/tap-1/chuong-9" element={<Tap1Chuong9Page />} />
          <Route path="/tap-1/do-an-bt1" element={<Tap1DoAnPage />} />
          <Route path="/tap-1/phu-luc" element={<MaterialAppendixPage />} />
          {/* Tập 2 */}
          <Route path="/tap-2/chuong-1" element={<Tap2Chuong1Page />} />
          <Route path="/tap-2/chuong-2" element={<Tap2Chuong2Page />} />
          <Route path="/tap-2/chuong-3" element={<Tap2Chuong3Page />} />
          <Route path="/tap-2/chuong-4" element={<Tap2Chuong4Page />} />
          <Route path="/tap-2/chuong-5" element={<Tap2Chuong5Page />} />
          <Route path="/tap-2/phu-luc" element={<Tap2PhuLucPage />} />
          {/* Tập 3 */}
          <Route path="/tap-3/chuong-1" element={<Tap3Chuong1Page />} />
          <Route path="/tap-3/chuong-2" element={<Tap3Chuong2Page />} />
          <Route path="/tap-3/chuong-3" element={<Tap3Chuong3Page />} />
          <Route path="/tap-3/chuong-4" element={<Tap3Chuong4Page />} />
          <Route path="/tap-3/chuong-5" element={<Tap3Chuong5Page />} />
          <Route path="/tap-3/chuong-6" element={<Tap3Chuong6Page />} />
          <Route path="/tap-3/phu-luc" element={<Tap3PhuLucPage />} />
          {/* Tiện ích tra cứu */}
          <Route path="/demo-3d" element={<Demo3DPage />} />
          <Route path="/cong-thuc" element={<FormulaCheatSheetPage />} />
          <Route path="/ky-hieu" element={<SymbolReferencePage />} />
          <Route path="/phu-luc" element={<MaterialAppendixPage />} />
          <Route path="/tra-cuu" element={<QuickSearchPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <MobileQuickNav />
      <Footer />
    </div>
  );
};
