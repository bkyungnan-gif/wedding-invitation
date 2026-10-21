(() => {
  const $ = (id) => document.getElementById(id);
  const toast = (message) => {
    const el = $("toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 1800);
  };
  const weddingDate = () => {
    const [y, m, d] = WEDDING.date.split("-").map(Number);
    return new Date(y, m - 1, d, 14, 0, 0);
  };
  const formatDate = () => {
    const d = weddingDate();
    const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${weekdays[d.getDay()]} ${WEDDING.time}`;
  };
  const setText = (id, value) => { $(id).textContent = value || ""; };

  setText("groom-name", WEDDING.groom);
  setText("bride-name", WEDDING.bride);
  setText("hero-date", formatDate());
  setText("hero-venue", `${WEDDING.venue} · ${WEDDING.city}`);
  setText("invitation-text", WEDDING.invitation.replace(/\\n/g, "\n"));
  setText("location-name", WEDDING.venue);
  setText("location-address", WEDDING.address);
  setText("transport-info", WEDDING.transport.replace(/\\n/g, "\n"));
  setText("event-date", formatDate());
  setText("footer-names", `${WEDDING.groom} & ${WEDDING.bride}`);
  $("calendar-month").textContent = weddingDate().toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase();

  const families = [];
  if (WEDDING.groomParents) families.push(`신랑 측 ${WEDDING.groomParents}`);
  if (WEDDING.brideParents) families.push(`신부 측 ${WEDDING.brideParents}`);
  $("family-lines").textContent = families.join("\n");

  // Simple calendar
  const cal = $("calendar");
  ["일", "월", "화", "수", "목", "금", "토"].forEach(day => {
    const el = document.createElement("span"); el.className = "weekday"; el.textContent = day; cal.appendChild(el);
  });
  const dt = weddingDate(), year = dt.getFullYear(), month = dt.getMonth(), day = dt.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < firstDay; i++) cal.appendChild(document.createElement("span"));
  for (let n = 1; n <= lastDay; n++) {
    const el = document.createElement("span"); el.textContent = n;
    if (n === day) el.className = "wedding-day";
    cal.appendChild(el);
  }

  const updateCountdown = () => {
    const now = new Date(), diff = weddingDate() - now;
    if (diff < 0) { $("countdown").textContent = "오늘 함께해 주셔서 감사합니다."; return; }
    const days = Math.ceil(diff / 86400000);
    $("countdown").textContent = `두 사람의 날까지 ${days}일`;
  };
  updateCountdown();

  const gallery = $("gallery");
  const galleryImages = (WEDDING.gallery || []).filter(Boolean);
  galleryImages.forEach((src, i) => {
    const button = document.createElement("button");
    button.className = "gallery-item"; button.type = "button";
    button.setAttribute("aria-label", `웨딩 사진 ${i + 1} 확대하기`);
    const img = document.createElement("img"); img.src = src; img.alt = `웨딩 사진 ${i + 1}`; img.loading = "lazy";
    img.onerror = () => { button.style.display = "none"; };
    button.appendChild(img); button.addEventListener("click", () => openLightbox(i)); gallery.appendChild(button);
  });

  const mapButtons = $("map-buttons");
  [["네이버 지도", WEDDING.naverMapUrl], ["카카오맵", WEDDING.kakaoMapUrl]].forEach(([label, url]) => {
    if (!url) return;
    const a = document.createElement("a"); a.className = "map-button"; a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer"; a.textContent = label; mapButtons.appendChild(a);
  });
  if (!mapButtons.children.length) mapButtons.style.display = "none";

  $("copy-address").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(WEDDING.address); toast("주소를 복사했어요."); }
    catch { toast("주소를 복사할 수 없어요. 주소를 길게 눌러 복사해주세요."); }
  });

  const accounts = $("accounts");
  const validAccounts = (WEDDING.accounts || []).filter(a => a.name && a.bank && a.number);
  if (!validAccounts.length) $("account-section").style.display = "none";
  const groups = [...new Set(validAccounts.map(a => a.group))];
  groups.forEach(group => {
    const wrap = document.createElement("div"); wrap.className = "account-group";
    const toggle = document.createElement("button"); toggle.className = "account-toggle"; toggle.type = "button";
    toggle.innerHTML = `<span>${escapeHtml(group)} 계좌 안내</span><span>＋</span>`;
    const details = document.createElement("div"); details.className = "account-details";
    validAccounts.filter(a => a.group === group).forEach(a => {
      const row = document.createElement("div"); row.className = "account-row";
      const info = document.createElement("div");
      info.textContent = `${a.relation} ${a.name}\n${a.bank} ${a.number}`;
      info.style.whiteSpace = "pre-line";
      const copy = document.createElement("button"); copy.className = "copy-button"; copy.type = "button"; copy.textContent = "계좌 복사";
      copy.addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(`${a.bank} ${a.number}`); toast("계좌번호를 복사했어요."); }
        catch { toast("복사가 지원되지 않는 환경입니다."); }
      });
      row.append(info, copy); details.appendChild(row);
    });
    toggle.addEventListener("click", () => { details.classList.toggle("open"); toggle.lastElementChild.textContent = details.classList.contains("open") ? "−" : "＋"; });
    wrap.append(toggle, details); accounts.appendChild(wrap);
  });

  const contacts = $("contacts");
  (WEDDING.contacts || []).filter(c => c.phone).forEach(c => {
    const card = document.createElement("div"); card.className = "contact-card";
    const strong = document.createElement("strong"); strong.textContent = c.label;
    const tel = document.createElement("a"); tel.href = `tel:${c.phone.replace(/[^+\d]/g, "")}`; tel.textContent = c.phone;
    card.append(strong, tel); contacts.appendChild(card);
  });
  if (!contacts.children.length) $("contacts").parentElement.style.display = "none";

  $("back-to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  let currentImage = 0;
  const lightbox = $("lightbox");
  function openLightbox(index) {
    currentImage = index;
    $("lightbox-image").src = galleryImages[currentImage];
    lightbox.classList.add("open"); lightbox.setAttribute("aria-hidden", "false");
  }
  function closeLightbox() {
    lightbox.classList.remove("open"); lightbox.setAttribute("aria-hidden", "true");
  }
  function moveImage(step) {
    if (!galleryImages.length) return;
    currentImage = (currentImage + step + galleryImages.length) % galleryImages.length;
    $("lightbox-image").src = galleryImages[currentImage];
  }
  $("lightbox-close").addEventListener("click", closeLightbox);
  $("lightbox-prev").addEventListener("click", () => moveImage(-1));
  $("lightbox-next").addEventListener("click", () => moveImage(1));
  lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") moveImage(-1);
    if (e.key === "ArrowRight") moveImage(1);
  });

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
})();
