// site.js – Baie Sound Dynamic Loader
async function loadSongs() {
  try {
    const response = await fetch("songs.json"); // ← correct path
    if (!response.ok) throw new Error("songs.json not found");
    const songs = await response.json();

    const latestList = document.getElementById("latestList");
    const comingList = document.getElementById("comingList");
    const grid = document.getElementById("grid");

    if (!latestList && !comingList && !grid) return;

    songs.forEach(song => {
      const slug = song.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      const link = `https://distrokid.com/hyperfollow/baiesound/${slug}`;

      const itemHTML = `
        <a class="item" href="${link}" target="_blank" rel="noopener">
          <span class="cover" style="background-image:url('${song.cover}')"></span>
          <div class="meta">
            <b>${song.title}</b>
            <small>${song.release} • ${song.desc}</small>
          </div>
        </a>`;

      const tileHTML = `
        <a class="tile" href="${link}" target="_blank" rel="noopener" 
           style="background-image:url('${song.cover}');background-size:cover;background-position:center;">
          <span><b>${song.title}</b></span>
        </a>`;

      if (song.status === "latest" && latestList)
        latestList.insertAdjacentHTML("beforeend", itemHTML);
      if (song.status === "coming" && comingList)
        comingList.insertAdjacentHTML("beforeend", itemHTML);
      if (grid)
        grid.insertAdjacentHTML("beforeend", tileHTML);
    });

    // Counters
    document.getElementById("trackCounter")?.insertAdjacentText("beforeend", ` ${songs.length} tracks live`);
    document.getElementById("studioCount")?.insertAdjacentText("beforeend", ` ${songs.length} items`);

    // Year
    document.querySelectorAll("#y, #year").forEach(el => el.textContent = new Date().getFullYear());
  } catch (err) {
    console.error("Baie Sound JSON failed:", err);
  }
}

// Parallax glow
document.addEventListener('mousemove', e => {
  const x = (e.clientX / innerWidth - 0.5) * 14;
  const y = (e.clientY / innerHeight - 0.5) * 14;
  document.documentElement.style.setProperty('--glowX', `${x}px`);
  document.documentElement.style.setProperty('--glowY', `${y}px`);
});

// Aura flash navigation
document.querySelectorAll('a[href]').forEach(link => {
  if (link.hostname === location.hostname && !link.target && !link.hasAttribute('download')) {
    link.addEventListener('click', e => {
      if (link.href === location.href) return;
      e.preventDefault();
      const flash = Object.assign(document.createElement('div'), { className: 'aura-flash' });
      document.body.appendChild(flash);
      document.body.style.opacity = '0';
      setTimeout(() => location = link.href, 450);
    });
  }
});

loadSongs();
