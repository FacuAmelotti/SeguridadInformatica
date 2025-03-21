        // Autoajuste de altura
        document.querySelectorAll('.console-code').forEach(container => {
            const resizeObserver = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    const contentHeight = Array.from(entry.target.children)
                        .reduce((acc, el) => acc + el.offsetHeight, 0);
                    entry.target.style.height = `${contentHeight + 30}px`;
                });
            });

            resizeObserver.observe(container);
        });