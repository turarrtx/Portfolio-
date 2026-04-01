document.querySelectorAll('.slider-wrap').forEach(wrap => {
    const track = wrap.querySelector('.slider-track');
    const imgs = track.querySelectorAll('img');
    const dotsWrap = wrap.querySelector('.slider-dots');
    let cur = 0;

    imgs.forEach((_, i) => {
        const d = document.createElement('span');
        if (i === 0) d.classList.add('on');
        d.onclick = () => go(i);
        dotsWrap.appendChild(d);
    });

    function go(n) {
        cur = (n + imgs.length) % imgs.length;
        track.style.transform = `translateX(-${cur * 100}%)`;
        dotsWrap.querySelectorAll('span').forEach((d, i) => d.classList.toggle('on', i === cur));
    }

    wrap.querySelector('.prev').onclick = () => go(cur - 1);
    wrap.querySelector('.next').onclick = () => go(cur + 1);
});