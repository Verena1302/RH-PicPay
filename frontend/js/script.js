(() => {
    const saved = localStorage.getItem('rh-theme');
    if (saved === 'light') document.body.classList.add('light');
  
    const updateThemeButtons = () => document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.innerHTML = document.body.classList.contains('light')
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.5 14.7A8.5 8.5 0 1 1 9.3 3.5 6.8 6.8 0 0 0 20.5 14.7Z"/></svg>';
    });
    updateThemeButtons();
  
    document.querySelectorAll('.theme-toggle').forEach(btn => btn.addEventListener('click', () => {
      document.body.classList.toggle('light');
      localStorage.setItem('rh-theme', document.body.classList.contains('light') ? 'light' : 'dark');
      updateThemeButtons();
    }));
  
    // abrir/fechar modal — usado pelas telas de candidatos
    window.openModal = id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.add('open');
      el.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
  
    window.closeModal = id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.remove('open');
      el.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
  
    document.addEventListener('click', e => {
      const close = e.target.closest('[data-close]');
      if (close) closeModal(close.dataset.close);
    });
  
    document.querySelectorAll('.modal-backdrop').forEach(backdrop =>
      backdrop.addEventListener('click', e => {
        if (e.target === backdrop) closeModal(backdrop.id);
      })
    );
  
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') document.querySelectorAll('.modal-backdrop.open').forEach(m => closeModal(m.id));
    });
  })();
  