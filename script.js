/* Iryna Lopatina — portfolio
   - preloader counter + removal
   - yellow "look inside" lens that follows the cursor in the hero
   - hover states for the buttons inside the lens layer */
(function () {
  // ---------- Preloader ----------
  var pre = document.getElementById('pre');
  var counter = document.getElementById('counter');
  if (pre) {
    var start = performance.now();
    var duration = 1600;
    (function tick(now) {
      var t = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      if (counter) counter.textContent = Math.round(eased * 100) + '%';
      if (t < 1) requestAnimationFrame(tick);
    })(start);
    setTimeout(function () { pre.remove(); }, 2900);
  }

  // ---------- Hero lens ----------
  var hero = document.getElementById('top');
  var lens = document.getElementById('lens');
  var ring = document.getElementById('ring');
  var bContact = document.getElementById('bContact');
  var bCv = document.getElementById('bCv');
  if (!hero || !lens || !ring) return;

  var R = 170;           // lens radius in px
  var IDLE = 'animate-lens-idle';
  var raf = null;
  var p = null;

  function showRing(x, y) {
    ring.style.width = 2 * R + 'px';
    ring.style.height = 2 * R + 'px';
    ring.style.opacity = '1';
    ring.style.transform = 'translate(' + (x - R) + 'px, ' + (y - R) + 'px)';
  }
  function hideRing() {
    ring.style.width = '0px';
    ring.style.height = '0px';
    ring.style.opacity = '0';
  }
  function setButtonState(which) {
    if (bContact) bContact.toggleAttribute('data-on', which === 'contact');
    if (bCv) bCv.toggleAttribute('data-on', which === 'cv');
  }

  hero.addEventListener('mousemove', function (e) {
    var rect = hero.getBoundingClientRect();
    var x = Math.round(e.clientX - rect.left);
    var y = Math.round(e.clientY - rect.top);
    var target = e.target;

    // Hide the lens over menu links and social icons so their own hover is visible
    if (target.closest('[data-nolens]')) {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      lens.classList.remove(IDLE);
      lens.style.clipPath = 'circle(0px at ' + x + 'px ' + y + 'px)';
      hideRing();
      setButtonState('');
      return;
    }

    var btn = target.closest('[data-hb]');
    p = { x: x, y: y, hb: btn ? btn.getAttribute('data-hb') : '' };

    if (!raf) {
      raf = requestAnimationFrame(function () {
        raf = null;
        if (!p) return;
        lens.classList.remove(IDLE);
        lens.style.clipPath = 'circle(' + R + 'px at ' + p.x + 'px ' + p.y + 'px)';
        showRing(p.x, p.y);
        setButtonState(p.hb);
      });
    }
  });

  hero.addEventListener('mouseleave', function () {
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    p = null;
    lens.style.clipPath = '';
    lens.classList.add(IDLE);
    hideRing();
    setButtonState('');
  });
})();

// ---------- Contact form (Formspree) ----------
(function () {
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (!form || !status) return;
  var btn = form.querySelector('button[type="submit"]');
  var btnHTML = btn.innerHTML;

  function showStatus(message, ok) {
    status.textContent = message;
    status.classList.toggle('text-sun', ok);
    status.classList.toggle('text-pink', !ok);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.textContent = '';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          showStatus('Thanks! Your message has been sent.', true);
        } else {
          return res.json().catch(function () { return {}; }).then(function (data) {
            var msg = data.errors && data.errors.length
              ? data.errors.map(function (er) { return er.message; }).join(', ')
              : 'Oops, something went wrong. Please try again.';
            showStatus(msg, false);
          });
        }
      })
      .catch(function () {
        showStatus('Network error. Please check your connection and try again.', false);
      })
      .finally(function () {
        btn.disabled = false;
        btn.innerHTML = btnHTML;
      });
  });
})();
