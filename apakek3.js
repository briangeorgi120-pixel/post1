    // ====== Floating petals (decor) ======
    const petalEmoji = ["❀","✿","❁","✾"]; // ringan & pastel
    function spawnPetal(){
      const span = document.createElement('span');
      span.className = 'petal';
      span.textContent = petalEmoji[Math.floor(Math.random()*petalEmoji.length)];
      const size = 12 + Math.random()*16;
      span.style.left = Math.random()*100 + 'vw';
      span.style.fontSize = size + 'px';
      span.style.animationDuration = (6 + Math.random()*6) + 's';
      document.body.appendChild(span);
      setTimeout(()=>span.remove(), 12000);
    }
    setInterval(spawnPetal, 600);

    // ====== Countdown ======
    const targetDate = new Date('2025-10-12T10:00:00+07:00'); // UBAH sesuai tanggal
    const cd = document.getElementById('countdown');
    function updateCountdown(){
      const now = new Date();
      const diff = Math.max(0, targetDate - now);
      const d = Math.floor(diff/ (1000*60*60*24));
      const h = Math.floor((diff/ (1000*60*60)) % 24);
      const m = Math.floor((diff/ (1000*60)) % 60);
      const s = Math.floor((diff/ 1000) % 60);
      cd.innerHTML = ['Hari','Jam','Menit','Detik'].map((lab,i)=>{
        const num = [d,h,m,s][i];
        return <div class="box"><div class="num">${String(num).padStart(2,'0')}</div><div class="lab">${lab}</div></div>
      }).join('');
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ====== Gallery Lightbox ======
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    document.querySelectorAll('#gallery .gallery img').forEach(img=>{
      img.style.cursor='zoom-in';
      img.addEventListener('click',()=>{lbImg.src=img.src;lb.style.display='flex'})
    });
    lb.addEventListener('click',()=>lb.style.display='none');

    // ====== Copy helper ======
    async function copyText(text){
      try{await navigator.clipboard.writeText(text);alert('Disalin: '+text)}catch(e){alert('Gagal menyalin')}
    }
    window.copyText = copyText;

    // ====== RSVP (demo localStorage) ======
    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(rsvpForm));
      const list = JSON.parse(localStorage.getItem('rsvp_list')||'[]');
      list.push({...data, time: new Date().toISOString()});
      localStorage.setItem('rsvp_list', JSON.stringify(list));
      alert('Terima kasih! RSVP Anda terekam.');
      rsvpForm.reset();
    });

    // ====== Buku Tamu (localStorage) ======
    const wishForm = document.getElementById('wish-form');
    const wishesEl = document.getElementById('wishes');
    function renderWishes(){
      const wishes = JSON.parse(localStorage.getItem('wishes')||'[]').reverse();
      wishesEl.innerHTML = wishes.map(w=>`
        <div style="background:#fff;border:1px solid rgba(15,23,42,.08);border-radius:14px;padding:12px 14px">
          <strong>${w.nama}</strong>
          <p class="muted" style="margin:.3rem 0 0">${w.pesan}</p>
          <small class="muted">${new Date(w.time).toLocaleString('id-ID', {dateStyle:'medium', timeStyle:'short'})}</small>
        </div>
      `).join('');
    }
    wishForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(wishForm));
      const list = JSON.parse(localStorage.getItem('wishes')||'[]');
      list.push({...data, time:new Date().toISOString()});
      localStorage.setItem('wishes', JSON.stringify(list));
      wishForm.reset();
      renderWishes();
    });
    renderWishes();

    // ====== Music control ======
    const toggleBtn = document.getElementById('music-toggle');
    const bgm = document.getElementById('bgm');
    let playing=false;
    toggleBtn.addEventListener('click', async ()=>{
      if(!playing){try{await bgm.play();playing=true;toggleBtn.textContent='⏸';}catch(e){alert('Klik sekali lagi untuk memutar.')}}
      else{bgm.pause();playing=false;toggleBtn.textContent='♪'}
    });