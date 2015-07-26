angular
    .module('sg.common.hateoas')
    .factory('Page', function () {
        function Page(data) {
        }

        Page.prototype = {
            next : nextPage,
            prev : prevPage,
            has  : hasPages,
            total: totalPages,
            size : pageSize
        };

        function nextPage() {

        }

        function prevPage() {

        }

        function hasPages() {

        }

        function totalPages() {

        }

        function pageSize() {

        }

        return Page;
    });