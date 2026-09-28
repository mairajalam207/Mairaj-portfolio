async function initPortfolio() {
  try {
    const response = await fetch('resume.json');
    const data = await response.json();
    
    renderHero(data.basics, data.about.metrics, data.skills);
    renderAbout(data.about);
    renderSkills(data.skills);
    renderProjects(data.projects, data.basics.profiles);
    renderContact(data.basics);
    renderFooter();
    
  } catch (error) {
    console.error('Error loading portfolio data:', error);
  }
}

function renderHero(basics, metrics, skills) {
  document.getElementById('hero-headline').textContent = basics.headline;
  document.getElementById('hero-summary').textContent = basics.summary;
  
  const heroBadges = document.getElementById('hero-badges');
  const sampleBadges = skills.flatMap(s => s.items.slice(0, 2)).slice(0, 6);
  heroBadges.innerHTML = sampleBadges.map(b => `<span class="badge">${b}</span>`).join('');

  const heroStats = document.getElementById('hero-stats');
  heroStats.innerHTML = metrics.map(m => `
    <div><div class="stat-val">${m.value}</div><div class="stat-label">${m.label}</div></div>
  `).join('');
}

function renderAbout(about) {
  const aboutText = document.getElementById('about-text');
  aboutText.innerHTML = about.intro.map(p => `<p>${p}</p>`).join('');

  const pillars = document.getElementById('pillars');
  pillars.innerHTML = about.pillars.map(p => `
    <div class="pillar">
      <div class="pillar-title">${p.title}</div>
      <div class="pillar-desc">${p.description}</div>
    </div>
  `).join('');

  const metricsDiv = document.getElementById('metrics');
  metricsDiv.innerHTML = about.metrics.map(m => `
    <div class="metric">
      <div class="metric-val">${m.value}</div>
      <div class="metric-label">${m.label}</div>
    </div>
  `).join('');
}

function renderSkills(skills) {
  const skillsGrid = document.getElementById('skills-grid');
  skillsGrid.innerHTML = skills.map(s => `
    <div class="skill-card">
      <div class="skill-card-header">
        <div class="skill-icon">⚡</div>
        <h3>${s.category}</h3>
      </div>
      <div class="skill-tags">
        ${s.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderProjects(projects, profiles) {
  const li = profiles.find(p => p.network === 'LinkedIn');
  const gh = profiles.find(p => p.network === 'GitHub');
  
  const banner = document.getElementById('social-banner');
  banner.innerHTML = `
    <a href="${li.url}" target="_blank" class="social-banner-card linkedin">
      <span class="sbc-icon">in</span>
      <div><div class="sbc-title">LinkedIn Activity</div><div class="sbc-sub">Lab writeups & updates</div></div>
    </a>
    <a href="${gh.url}" target="_blank" class="social-banner-card github">
      <span class="sbc-icon">🐙</span>
      <div><div class="sbc-title">GitHub Repos</div><div class="sbc-sub">Scripts & tools</div></div>
    </a>
  `;

  const projectsList = document.getElementById('projects-list');
  projectsList.innerHTML = projects.map((p, i) => `
    <div class="project-card">
      <div class="project-num">0${i + 1}</div>
      <div>
        <h3>${p.title}</h3>
        <div class="project-outcome">${p.outcome}</div>
        <p>${p.description}</p>
        <div class="project-tools">
          ${p.tools.map(t => `<span class="tool-tag">${t}</span>`).join('')}
        </div>
      </div>
      <a href="${p.evidence}" target="_blank" class="project-link">↗</a>
    </div>
  `).join('');
}

function renderContact(basics) {
  const contactCards = document.getElementById('contact-cards');
  contactCards.innerHTML = basics.profiles.map(p => `
    <a href="${p.url}" target="_blank" class="contact-card">
      <div class="cc-label">${p.network}</div>
      <div class="cc-sub">${p.username}</div>
    </a>
  `).join('');
}

function renderFooter() {
  const footerText = document.getElementById('footer-text');
  const text = `mairaj@portfolio:~$ echo "© ${new Date().getFullYear()} Mairaj Alam · BSCS Student · Karachi"`;
  let i = 0;
  function type() {
    if (i < text.length) {
      footerText.textContent += text.charAt(i);
      i++;
      setTimeout(type, 50);
    }
  }
  type();
}

document.addEventListener('DOMContentLoaded', initPortfolio);
