document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#reviews .cards');
  if (!container) return;

  fetch('data.json')
    .then(r => {
      if (!r.ok) throw new Error('Failed loading data.json');
      return r.json();
    })
    .then(list => {
      console.log("Loaded reviews:", list);
console.log("First object:", list[0]);
      if (!Array.isArray(list) || list.length === 0) return; // keep fallback if no data

      container.innerHTML = ''; // remove static fallback

      list.forEach(r => {
        const name = r["Name"] || "Anonymous";
        let rating = "";
        if (r["rating"]) {
          rating = String(r["rating"]).replace(" star rating", "★");
        }
        const date = r["Reviewdate"] || "";
        const text = r["reviewtext"] || "";
        const location = r["Location"] || "";
        const photo = r["image-src"] || "";
        const overall = r["overallrating"] || "";

        const card = document.createElement('article');
        card.className = 'card review-card';
        card.innerHTML = `
          ${photo ? `<img src="${photo}" alt="Review photo" style="max-width:100%;border-radius:8px;margin-bottom:0.5rem;">` : ""}
          <p class="review-meta">
            <strong>${name}</strong> · ${rating} · ${date}
          </p>
          <p>${text}</p>
          ${location ? `<p class="muted">📍 ${location}</p>` : ""}
          ${overall ? `<p class="muted">Overall: ${overall.replace(" star rating","★")}</p>` : ""}
        `;
        container.appendChild(card);
      });
    })
    .catch(err => {
      console.warn('[SLUview] Could not load JSON; falling back to static reviews.', err);
    });
});
