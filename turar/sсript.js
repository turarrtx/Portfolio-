
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hide');
        setTimeout(() => loader.remove(), 600);
    }, 800);
});
window.addEventListener('DOMContentLoaded', () => {

    // Скрываем всё до загрузки
    document.body.style.overflow = 'hidden';

    const tl = [
        { el: '.greeting',    delay: 200,  from: 'translateY(60px)',  opacity: 0 },
        { el: '.main-title',  delay: 400,  from: 'translateY(80px)',  opacity: 0 },
        { el: '.location',    delay: 600,  from: 'translateY(40px)',  opacity: 0 },
        { el: '.btn-resume',  delay: 750,  from: 'translateY(30px)',  opacity: 0 },
        { el: '.hero-image',  delay: 500,  from: 'translateX(80px)',  opacity: 0 },
        { el: '.decor-plus',  delay: 900,  from: 'scale(0)',          opacity: 0 },
        { el: '.decor-lines', delay: 1000, from: 'translateX(-40px)', opacity: 0 },
        { el: '.head',        delay: 100,  from: 'translateY(-60px)', opacity: 0 },
    ];

    tl.forEach(({ el, delay, from, opacity }) => {
        const node = document.querySelector(el);
        if (!node) return;
        node.style.cssText += `opacity:0; transform:${from}; transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);`;
        setTimeout(() => {
            node.style.opacity = '1';
            node.style.transform = 'none';
        }, delay);
    });

    setTimeout(() => { document.body.style.overflow = ''; }, 1200);
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(
    '.about h1, .about > p, .aboutText, .work h1, .work > .work-content > p, .work-card, .contact-container h1, .contact-image, .contact-info'
).forEach((el, i) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

document.querySelectorAll('.aboutText').forEach((el, i) => el.style.transitionDelay = `${i * 0.13}s`);
document.querySelectorAll('.work-card').forEach((el, i) => el.style.transitionDelay = `${i * 0.18}s`);

const mainTitle = document.querySelector('.main-title');
if (mainTitle) {
    const lines = mainTitle.innerHTML.split('<br>');
    mainTitle.innerHTML = '';
    mainTitle.style.opacity = '1';

    lines.forEach((line, li) => {
        const lineEl = document.createElement('div');
        lineEl.style.overflow = 'hidden';
        const span = document.createElement('span');
        span.style.cssText = 'display:inline-block; transform:translateY(100%); transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);';
        span.innerHTML = line;
        lineEl.appendChild(span);
        mainTitle.appendChild(lineEl);
        if (li < lines.length - 1) mainTitle.appendChild(document.createElement('br'));

        setTimeout(() => {
            span.style.transform = 'translateY(0)';
        }, 450 + li * 180);
    });
}

document.querySelectorAll('.btn-resume, .slider-nav button').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
        btn.style.transition = 'transform 0.15s ease';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0,0)';
        btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    });
});

document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        card.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.transition = 'transform 0.3s ease';
    });
});

document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-8px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
        card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateY(0) rotateX(0)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    });
});

let lastScroll = 0;
const head = document.querySelector('.head');
if (head) {
    window.addEventListener('scroll', () => {
        const curr = window.scrollY;
        if (curr > lastScroll && curr > 100) {
            head.style.transform = 'translateY(-100%)';
            head.style.transition = 'transform 0.4s ease';
        } else {
            head.style.transform = 'translateY(0)';
        }
        lastScroll = curr;
    });
}

const sections = document.querySelectorAll('#head, #about, #work');
const navLinks = document.querySelectorAll('.nav-list a');

const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.style.opacity = link.getAttribute('href') === `#${entry.target.id}` ? '1' : '0.4';
                link.style.transition = 'opacity 0.3s ease';
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(s => activeObserver.observe(s));

function animateCount(el, target, duration = 1500) {
    let start = 0;
    const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

document.querySelectorAll('.slider-wrap').forEach(wrap => {
    const track = wrap.querySelector('.slider-track');
    const imgs = track.querySelectorAll('img');
    const dotsWrap = wrap.querySelector('.slider-dots');
    let cur = 0, startX = 0, isDragging = false, dragOffset = 0;

    imgs.forEach((_, i) => {
        const d = document.createElement('span');
        if (i === 0) d.classList.add('on');
        d.onclick = () => go(i);
        dotsWrap.appendChild(d);
    });

    function go(n) {
        cur = (n + imgs.length) % imgs.length;
        track.style.transition = 'transform 0.55s cubic-bezier(0.77,0,0.175,1)';
        track.style.transform = `translateX(-${cur * 100}%)`;
        dotsWrap.querySelectorAll('span').forEach((d, i) => d.classList.toggle('on', i === cur));

        const dot = dotsWrap.querySelectorAll('span')[cur];
        dot.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(2)' },
            { transform: 'scale(1.3)' }
        ], { duration: 400, easing: 'ease-out' });
    }

    wrap.querySelector('.prev').onclick = () => go(cur - 1);
    wrap.querySelector('.next').onclick = () => go(cur + 1);

    // drag мышью
    track.addEventListener('mousedown', e => {
        startX = e.clientX; isDragging = true;
        track.style.transition = 'none';
        track.style.cursor = 'grabbing';
    });
    window.addEventListener('mousemove', e => {
        if (!isDragging) return;
        dragOffset = e.clientX - startX;
        track.style.transform = `translateX(calc(-${cur * 100}% + ${dragOffset}px))`;
    });
    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = '';
        if (Math.abs(dragOffset) > 70) go(dragOffset < 0 ? cur + 1 : cur - 1);
        else go(cur);
        dragOffset = 0;
    });

    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 40) go(diff < 0 ? cur + 1 : cur - 1);
    });
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

const heroImg = document.querySelector('.hero-image');
if (heroImg) {
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        heroImg.style.transform = `translateY(${y * 0.15}px)`;
    });
}

const scrollProgress = document.getElementById('scroll-progress');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    scrollProgress.style.width = progress + '%';

    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    backToTop.animate([
        { transform: 'translateY(0) scale(1)' },
        { transform: 'translateY(-8px) scale(0.9)' },
        { transform: 'translateY(0) scale(1)' }
    ], { duration: 400, easing: 'ease-out' });
});

const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');

    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    themeToggle.animate([
        { transform: 'scale(1) rotate(0deg)' },
        { transform: 'scale(1.3) rotate(180deg)' },
        { transform: 'scale(1) rotate(360deg)' }
    ], { duration: 500, easing: 'cubic-bezier(0.34,1.56,0.64,1)' });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCounter = document.getElementById('lightbox-counter');

let allImgs = [];
let lbIndex = 0;

document.querySelectorAll('.slider-track img').forEach((img, i) => {
    allImgs.push(img.src);
    img.addEventListener('click', () => openLightbox(i));
});

function openLightbox(index) {
    lbIndex = index;
    lightboxImg.src = allImgs[lbIndex];
    lightboxCounter.textContent = `${lbIndex + 1} / ${allImgs.length}`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

function lightboxGo(dir) {
    lbIndex = (lbIndex + dir + allImgs.length) % allImgs.length;
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = `scale(0.9) translateX(${dir * 40}px)`;
    setTimeout(() => {
        lightboxImg.src = allImgs[lbIndex];
        lightboxCounter.textContent = `${lbIndex + 1} / ${allImgs.length}`;
        lightboxImg.style.transition = 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
        lightboxImg.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1) translateX(0)';
    }, 150);
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', () => lightboxGo(-1));
document.getElementById('lightbox-next').addEventListener('click', () => lightboxGo(1));

lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxGo(-1);
    if (e.key === 'ArrowRight') lightboxGo(1);
});


