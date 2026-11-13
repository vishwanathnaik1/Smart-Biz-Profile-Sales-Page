/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ClaimProfileModal } from "./components/ClaimProfileModal";
import { FaqAndFooter } from "./components/FaqAndFooter";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { MobileStickyCta } from "./components/MobileStickyCta";
import { OfferAndComparisonSections } from "./components/OfferAndComparisonSections";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header onOpenModal={openModal} />

      <main>
        <HeroSection onOpenModal={openModal} />
        <OfferAndComparisonSections onOpenModal={openModal} />
        <FaqAndFooter onOpenModal={openModal} />
      </main>

      <MobileStickyCta onOpenModal={openModal} />
      <ClaimProfileModal open={modalOpen} onClose={closeModal} />
    </div>
  );
}
