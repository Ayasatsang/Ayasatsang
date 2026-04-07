import { useEffect } from 'react';

/**
 * Хук для scroll-triggered анімацій
 * Додає клас 'visible' до елементів з класами scroll-animate-*
 */
export const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Спостерігаємо за всіма елементами з анімаціями
    const selectors = [
      '.scroll-animate',
      '.scroll-animate-left',
      '.scroll-animate-right',
      '.scroll-animate-scale',
      '.scroll-animate-float',
      '.scroll-animate-crystal',
    ];

    document.querySelectorAll(selectors.join(', ')).forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

export default useScrollAnimation;
