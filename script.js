const internships = [
  {id:1,title:"Frontend Developer Intern",company:"PixelCraft Studio",initials:"PC",logo:"logo-blue",category:"Development",mode:"Remote",duration:"8 weeks",stipend:"Learning opportunity",skills:["HTML","CSS","JavaScript"],description:"Build responsive pages and improve accessible user interfaces."},
  {id:2,title:"UI/UX Design Intern",company:"Northstar Creative",initials:"NC",logo:"logo-purple",category:"Design",mode:"Hybrid",duration:"10 weeks",stipend:"Learning opportunity",skills:["Figma","Wireframes","Prototyping"],description:"Explore user flows, wireframes, and clean interface design."},
  {id:3,title:"Python Developer Intern",company:"CodeHarbor Labs",initials:"CH",logo:"logo-green",category:"Development",mode:"Remote",duration:"8 weeks",stipend:"Learning opportunity",skills:["Python","Git","APIs"],description:"Practice Python fundamentals and create small useful tools."},
  {id:4,title:"Data Analytics Intern",company:"BrightPath Insights",initials:"BI",logo:"logo-orange",category:"Data",mode:"On-site",duration:"12 weeks",stipend:"Learning opportunity",skills:["Excel","SQL","Data"],description:"Turn sample datasets into clear reports and visual insights."},
  {id:5,title:"Digital Marketing Intern",company:"GoodReach Media",initials:"GM",logo:"logo-pink",category:"Marketing",mode:"Hybrid",duration:"6 weeks",stipend:"Learning opportunity",skills:["Content","SEO","Analytics"],description:"Learn content planning, search basics, and campaign reporting."},
  {id:6,title:"Java Developer Intern",company:"StackSpring Tech",initials:"ST",logo:"logo-cyan",category:"Development",mode:"Remote",duration:"10 weeks",stipend:"Learning opportunity",skills:["Java","OOP","Problem solving"],description:"Strengthen Java fundamentals through beginner-friendly exercises."}
];

const grid = document.getElementById("internshipGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const modeFilter = document.getElementById("modeFilter");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const activeFilters = document.getElementById("activeFilters");
const savedIds = new Set();

function renderInternships() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const mode = modeFilter.value;
  const filtered = internships.filter(job => {
    const text = [job.title, job.company, job.category, job.mode, job.description, ...job.skills].join(" ").toLowerCase();
    return text.includes(query) && (category === "all" || job.category === category) && (mode === "all" || job.mode === mode);
  });

  grid.innerHTML = filtered.map(job => `
    <article class="job-card">
      <div class="job-top">
        <div class="company-logo ${job.logo}" aria-hidden="true">${job.initials}</div>
        <button class="save-button ${savedIds.has(job.id) ? "saved" : ""}" data-save="${job.id}" aria-label="${savedIds.has(job.id) ? "Unsave" : "Save"} ${job.title}" aria-pressed="${savedIds.has(job.id)}">${savedIds.has(job.id) ? "♥" : "♡"}</button>
      </div>
      <h3>${job.title}</h3>
      <p class="company-name">${job.company}</p>
      <div class="job-tags"><span class="tag">${job.category}</span><span class="tag">${job.mode}</span></div>
      <p class="company-name">${job.description}</p>
      <div class="job-meta"><span>◷ ${job.duration}</span><span>⌘ ${job.skills.slice(0,2).join(" · ")}</span></div>
      <div class="job-bottom"><span class="stipend">${job.stipend}</span><button class="apply-button" data-apply="${job.id}">View details ↗</button></div>
    </article>`).join("");

  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "opportunity" : "opportunities"}`;
  emptyState.classList.toggle("hidden", filtered.length !== 0);
  grid.classList.toggle("hidden", filtered.length === 0);
  const tags = [];
  if (query) tags.push(`Search: “${query}”`);
  if (category !== "all") tags.push(category);
  if (mode !== "all") tags.push(mode);
  activeFilters.textContent = tags.length ? `Active filters: ${tags.join(" · ")}` : "";
}

grid.addEventListener("click", event => {
  const saveButton = event.target.closest("[data-save]");
  const applyButton = event.target.closest("[data-apply]");
  if (saveButton) {
    const id = Number(saveButton.dataset.save);
    savedIds.has(id) ? savedIds.delete(id) : savedIds.add(id);
    renderInternships();
  }
  if (applyButton) {
    const job = internships.find(item => item.id === Number(applyButton.dataset.apply));
    if (job) alert(`${job.title}\n\nCompany: ${job.company}\nCategory: ${job.category}\nMode: ${job.mode}\nDuration: ${job.duration}\n\nThis is a sample portfolio listing, not a real vacancy. Add a verified application link before using this for real applications.`);
  }
});

[searchInput, categoryFilter, modeFilter].forEach(control => control.addEventListener("input", renderInternships));
document.getElementById("clearFilters").addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "all";
  modeFilter.value = "all";
  renderInternships();
});
renderInternships();
