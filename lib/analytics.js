// TODO: Replace 'G-90GN5TNZVK' with actual GA4 Measurement ID
// (Google Analytics > Admin > Data Streams > select your web stream > Measurement ID)

function gtag(...args) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag(...args);
}

export function trackEvent(eventName, params = {}) {
  gtag("event", eventName, params);
}

// ── Sayfa görüntüleme ────────────────────────────────────────────────────────
export function trackPageView(url, title) {
  gtag("event", "page_view", {
    page_location: url,
    page_title: title,
    send_to: "G-90GN5TNZVK",
  });
}

// ── Blog ─────────────────────────────────────────────────────────────────────
export function trackBlogView(title, slug) {
  trackEvent("blog_goruntulendi", {
    blog_baslik: title,
    blog_slug: slug,
    icerik_turu: "makale",
  });
}

export function trackScrollDepth(depthPercent, context = {}) {
  trackEvent("sayfa_kaydirildi", {
    kaydirma_yuzdesi: depthPercent,
    ...context,
  });
}

export function trackBlogReadComplete(title, slug, timeOnPageSec) {
  trackEvent("blog_okundu", {
    blog_baslik: title,
    blog_slug: slug,
    sayfada_gecen_sure: timeOnPageSec,
  });
}

export function trackBlogCardClick(title, slug) {
  trackEvent("blog_kart_tiklandi", {
    blog_baslik: title,
    blog_slug: slug,
  });
}

// share is a standard GA4 event — kept in English so GA4 recognises it natively
export function trackBlogShare(title, slug) {
  trackEvent("share", {
    content_type: "makale",
    item_id: slug,
    method: "pano",
    blog_baslik: title,
  });
}

// ── Navigasyon ───────────────────────────────────────────────────────────────
export function trackNavClick(label, href) {
  trackEvent("menu_tiklandi", {
    menu_etiketi: label,
    menu_linki: href,
  });
}

export function trackMobileMenuToggle(open) {
  trackEvent(open ? "mobil_menu_acildi" : "mobil_menu_kapatildi");
}

// ── İletişim & Sosyal ────────────────────────────────────────────────────────
// kanal: 'whatsapp' | 'instagram' | 'email' | 'phone'
export function trackContactClick(channel, href) {
  trackEvent("iletisim_tiklandi", {
    iletisim_kanali: channel,
    iletisim_linki: href,
  });
}

export function trackWhatsAppPanelClick() {
  trackEvent("whatsapp_panel_tiklandi", { iletisim_kanali: "whatsapp" });
}

// ── Form ─────────────────────────────────────────────────────────────────────
export function trackFormStart(formName) {
  trackEvent("form_baslatildi", { form_adi: formName });
}

export function trackFormSubmit(formName, success = true) {
  trackEvent("form_gonderildi", { form_adi: formName, basarili: success });
}

// ── Ücretsiz Araçlar ─────────────────────────────────────────────────────────
export function trackToolSwitch(toolId, toolLabel) {
  trackEvent("arac_degistirildi", { arac_id: toolId, arac_adi: toolLabel });
}

export function trackToolCalculate(toolId, resultSummary = {}) {
  trackEvent("hesaplama_yapildi", { arac_id: toolId, ...resultSummary });
}

export function trackQuizStepComplete(stepIndex, questionKey, answer) {
  trackEvent("test_adimi_tamamlandi", {
    test_adimi: stepIndex + 1,
    test_sorusu: questionKey,
    test_cevabi: answer,
  });
}

export function trackQuizComplete(resultType) {
  trackEvent("test_tamamlandi", { test_sonucu: resultType });
}

// ── CTA ──────────────────────────────────────────────────────────────────────
export function trackCtaClick(label, location) {
  trackEvent("buton_tiklama", { buton_etiketi: label, buton_konumu: location });
}
