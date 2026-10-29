(function() {
    'use strict';

    // Wrap article images with a link to the full-size image
    document.querySelectorAll('.article img:not(.not-gallery-item)').forEach(function(img) {
        if (img.parentElement.tagName === 'A') {
            return;
        }
        var link = document.createElement('a');
        link.className = 'gallery-item';
        link.href = img.getAttribute('src');
        link.target = '_blank';
        link.rel = 'noopener';
        img.parentNode.insertBefore(link, img);
        link.appendChild(img);
    });

    // Publication filter: toggle between All and Selected
    var pubFilter = document.querySelector('.pub-filter');
    var pubList = document.querySelector('ol.pub-list');
    if (pubFilter && pubList) {
        pubFilter.querySelectorAll('.pub-filter-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                pubFilter.querySelectorAll('.pub-filter-btn').forEach(function(b) {
                    b.classList.toggle('is-active', b === btn);
                });
                pubList.classList.toggle('show-selected', btn.getAttribute('data-filter') === 'selected');
            });
        });
    }

    // Back-to-top button
    var button = document.getElementById('back-to-top');
    if (button) {
        button.className = 'card has-text-centered is-rounded';
        button.style.right = '20px';
        button.style.bottom = '20px';
        button.style.width = '40px';
        button.style.zIndex = '31';

        var update = function() {
            var show = window.scrollY > 300;
            button.classList.toggle('fade-in', show);
            button.classList.toggle('rise-up', show);
            button.style.pointerEvents = show ? 'auto' : 'none';
        };

        var ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    update();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        window.addEventListener('resize', update);
        update();

        button.addEventListener('click', function(event) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}());
