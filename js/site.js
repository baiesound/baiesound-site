// site.js – Baie Sound Dynamic Loader
async function loadSongs() {
  try {
    const response = await fetch("data/songs.json");
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
           style="background-image:url('${song.cover}');
                  background-size:cover;background-position:center;">
          <span><b>${song.title}</b></span>
        </a>`;

      if (song.status === "latest" && latestList)
        latestList.insertAdjacentHTML("beforeend", itemHTML);

      if (song.status === "coming" && comingList)
        comingList.insertAdjacentHTML("beforeend", itemHTML);

      if (grid)
        grid.insertAdjacentHTML("beforeend", tileHTML);
    });

    // Update counters
    const trackCounter = document.getElementById("trackCounter");
    const studioCount = document.getElementById("studioCount");
    const total = songs.length;

    if (trackCounter) trackCounter.textContent = `• ${total} tracks live`;
    if (studioCount) studioCount.textContent = `• ${total} items`;

    // Update year in footer
    document.querySelectorAll("#y, #year").forEach(el => {
      el.textContent = new Date().getFullYear();
    });

  } catch (err) {
    console.error("Failed to load songs:", err);
  }
}

// Mouse parallax glow (optional flair)
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;
  document.documentElement.style.setProperty('--glowX', `${x}px`);
  document.documentElement.style.setProperty('--glowY', `${y}px`);
});

// Aura flash on internal links (already in contact.html — reuse if wanted)
document.querySelectorAll('a[href]').forEach(link => {
  if (link.hostname === location.hostname && !link.target && !link.download) {
    link.addEventListener('click', e => {
      if (link.href === location.href) return;
      e.preventDefault();
      const flash = document.createElement('div');
      flash.className = 'aura-flash';
      document.body.appendChild(flash);
      document.body.style.opacity = '0';
      setTimeout(() => location = link.href, 450);
    });
  }
});

// Load everything
loadSongs();
[
  {
    "title": "Forget Work (I'm Stayin’ in Bed)",
    "status": "latest",
    "desc": "Single • Chill Trap / Clean + Explicit",
    "release": "Out Now",
    "cover": "assets/forgetwork.png"
  },
  {
    "title": "Taxed",
    "status": "latest",
    "desc": "Single • Gritty Southern Trap",
    "release": "Out Now",
    "cover": "assets/taxed.png"
  },
  {
    "title": "Mom’s Little Best Broke Friend",
    "status": "latest",
    "desc": "Single • Playful Hip-Hop Story",
    "release": "Out Now",
    "cover": "assets/momslittle.png"
  },
  {
    "title": "If It Ain’t One Thing, It’s Another",
    "status": "latest",
    "desc": "Single • Reflective Mood Trap",
    "release": "Out Now",
    "cover": "assets/oneThing.png"
  },
  {
    "title": "The Hard Way",
    "status": "latest",
    "desc": "Single • Emotional / Motivational",
    "release": "Out Now",
    "cover": "assets/theHardWay.png"
  },
  {
    "title": "Snow in Florida",
    "status": "coming",
    "desc": "Cinematic / Hopeful Storytelling",
    "release": "Nov 14, 2025",
    "cover": "assets/snowInFlorida.png"
  },
  {
    "title": "Still Them Younginz",
    "status": "coming",
    "desc": "Reunion Anthem • 138 BPM",
    "release": "TBA",
    "cover": "assets/younginz.png"
  },
  {
    "title": "All Gas No Brakes",
    "status": "coming",
    "desc": "High-Octane Trap Rock",
    "release": "TBA",
    "cover": "assets/allgas.png"
  },
  {
    "title": "Summer Scooter Song",
    "status": "coming",
    "desc": "Uplifting / Family Fun Vibe",
    "release": "TBA",
    "cover": "assets/scooter.png"
  },
  {
    "title": "Deep Pockets",
    "status": "coming",
    "desc": "Low-End Groove / Hustle Talk",
    "release": "TBA",
    "cover": "assets/deepPockets.png"
  }
]