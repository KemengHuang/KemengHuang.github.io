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

    // Clone right-column widgets into the shadow column (shown on tablet widths)
    var rightColumn = document.querySelector('.columns .column-right');
    var shadowColumn = document.querySelector('.columns .column-right-shadow');
    if (rightColumn && shadowColumn && !shadowColumn.children.length) {
        Array.prototype.slice.call(rightColumn.children).forEach(function(child) {
            shadowColumn.appendChild(child.cloneNode(true));
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
