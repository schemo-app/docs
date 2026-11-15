document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.docs-sidebar');
    const currentPage = sidebar?.querySelector('[aria-current="page"]');

    if (!currentPage || !sidebar.clientHeight) {
        return;
    }

    const top = currentPage.getBoundingClientRect().top - sidebar.getBoundingClientRect().top;

    if (top + currentPage.offsetHeight > sidebar.clientHeight) {
        sidebar.scrollTop += top - sidebar.clientHeight / 2;
    }
});
