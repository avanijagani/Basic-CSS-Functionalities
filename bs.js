var db;

var bs = {
    startUp: function () {
        firebase.initializeApp(firebaseConfig);

        var opts = {
            typ: 'table', css: { width: '95%', margin: '20px' },
            children: [{
                typ: 'tr',
                child: {
                    typ: 'td', id: 'tabsTd',
                }
            }, {
                typ: 'tr',
                child: {
                    typ: 'td', id: 'dataTd',
                    css: { height: '90vh', 'vertical-align': 'top', 'text-align': 'center', padding: '20px', 'border-left': '1px solid #DDD', 'border-right': '1px solid #DDD', 'border-bottom': '1px solid #DDD' },
                }
            }],
        }

        $body = $('body');
        $ele = util_bs.buildElement(opts);
        $ele.appendTo($body);

        var tabMenu = [
            { title: 'Home' },
            {
                title: 'Menu 1',
                subMenu: [
                     'Sub Menu 2.1',
                     'Sub Menu 2.2',
                     'Sub Menu 2.3',
                     'Sub Menu 2.4',
                ]
            },
            { title: 'Menu 2', active: true },
            {
                title: 'Menu 3',
                subMenu: [
                     'Sub Menu 3.1',
                     'Sub Menu 3.2',
                ]
            }
        ];

        var badgeType = [
        { title: 'default' },
        { title: 'primary' },
        { title: 'success' },
        ];

        var alertType = [
        { title: 'danger' },
        { title: 'info' },
        { title: 'warning' },
        ];

        var tabData = [
            { title: 'glyphicon', onClick: bs.buildGlyphicon },
            { title: 'progressbar', onClick: bs.buildProgressbar },
            { title: 'badge', onClick: function () { bs.buildBadge(badgeType); } },
            { title: 'panel', onClick: bs.buildPanel },
            { title: 'collapse', onClick: bs.buildCollapse },
            { title: 'alerts', onClick: function () { bs.buildAlerts(alertType); } },
            { title: 'tabs', onClick: function () { bs.buildTabs(tabMenu); } },
            { title: 'form', onClick: bs.buildForms },
        ]

        var $tabs = bs.buildMainTabs(tabData);
        $tabs.appendTo($('#tabsTd'));
    },

    buildMainTabs: function (tabData) {
        var $ul = $('<ul />').addClass('nav nav-tabs');
        $.each(tabData, function (i, tab) {
            var tab = tabData[i];
            var $li = $('<li />').appendTo($ul);
            var $a = $('<a />').attr({ 'data-toggle': 'tab' }).html(tab.title).appendTo($li);
            $a.click(tab.onClick);
            if (i == 0) $li.addClass('active');
        });
        return $ul;
    },

    showElement: function (opts) {
        var $parent = $('#dataTd');
        $parent.empty();
        util_bs.buildElement(opts).appendTo($parent);
    },

    showElements: function (opts) {
        var $parent = $('#dataTd');
        $parent.empty();
        for (var i = 0; i < opts.length; i++) {
            util_bs.buildElement(opts[i]).appendTo($parent);
        }
    },

    buildGlyphicon: function () {
        var opts = { typ: 'span', class: 'glyphicon glyphicon-print', css: { 'font-size': '1.4em', color: '#006D85' } };
        bs.showElement(opts);
    },

    buildProgressbar: function () {
        var opts = {
            typ: 'div', class: 'progress',
            child: {
                typ: 'div', class: 'progress-bar', style: 'width:70%',
                child: {
                    typ: 'div', class: 'sr-only', html: '70% Complete'
                },
            },
        }
        bs.showElement(opts);
    },

    buildBadge: function (badgeType) {

        var $parent = $('#dataTd');
        $parent.empty();
        for (var i = 0; i < badgeType.length; i++) {
            var type = badgeType[i];
            var $span = $('<span />').addClass('label label-' + type.title).css({ margin: '5px' }).html(type.title).appendTo($parent);
        }

    },

    buildPanel: function () {
        var opts = {
            typ: 'div', class: 'panel panel-primary',
            children: [
                { typ: 'div', class: 'panel-heading', html: 'Panel Heading' },
                { typ: 'div', class: 'panel-body', html: 'A Basic Panel' },
            ],
        };

        bs.showElement(opts);
    },

    buildCollapse: function () {
        var btn = { typ: 'button', 'data-toggle': 'collapse', 'data-target': '#collapse_div', class: 'btn btn-primary', html: 'Collapsible' };
        var div = {
            typ: 'div', id: 'collapse_div', class: 'collapse alert alert-success',
            html: 'The collapse class indicates a collapsible element (in our example); this is the content that will be shown or hidden with a click of a button. To control (show/hide) the collapsible content',
            css: { border: '1px solid black', margin: '20px' }
        };
        bs.showElements([btn, div]);
    },

    buildAlerts: function (alertType) {
        var $parent = $('#dataTd');
        $parent.empty();
        var $childDiv = $('<div />').addClass('dropdown').appendTo($parent);
        var $alertDiv = $('<div />').css('margin-top', '20px').appendTo($parent);

        var $btn = $('<button />').addClass('btn btn-primary dropdown-toggle').attr({ 'data-toggle': 'dropdown' }).html('Alerts').appendTo($childDiv);
        var $span = $('<span />').css({ 'margin-left': '25px' }).addClass('caret').appendTo($btn);
        var $ul = $('<ul />').addClass('dropdown-menu').appendTo($childDiv);
        $.each(alertType, function (i, type) {
            var $li = $('<li />').appendTo($ul);
            var $a = $('<a />').html(type.title).appendTo($li);
            $a.click(function () {
                var div = { typ: 'div', class: 'alert alert-' + type.title, html: type.title };
                var $div = util_bs.buildElement(div);
                $alertDiv.empty();
                $div.appendTo($alertDiv);
            })
        });

        $btn.css({ width: $ul.width() });
        $ul.css({ left: $btn.position().left });
    },

    buildTabs: function (tabMenu) {
        var $parent = $('#dataTd');
        $parent.empty();

        var $ul = $('<ul />').addClass('nav nav-tabs').appendTo($parent);
        $.each(tabMenu, function (i, menu) {
            var menu = tabMenu[i];
            var $li = $('<li />').appendTo($ul);
            var $a = $('<a />').attr({ 'data-toggle': 'tab' }).html(menu.title).appendTo($li);
            if (menu.active) $li.addClass('active');
            if (menu.subMenu) {
                var subMenu = menu.subMenu;
                $li.addClass('dropdown').appendTo($ul);
                $a.addClass('dropdown-toggle').attr({ 'data-toggle': 'dropdown' });
                $span = $('<span />').addClass('caret').appendTo($a);
                var $ulDrop = $('<ul />').addClass('dropdown-menu').appendTo($li);
                for (var j = 0; j < subMenu.length; j++) {
                    var $liDrop = $('<li />').appendTo($ulDrop);
                    var $adrop = $('<a />').attr({ 'href': '#' }).html(subMenu[j]).appendTo($liDrop);
                }

            }
        });

    },

    buildForms: function () {
        db = util.getFirebaseDB();
        var $parent = $('#dataTd');
        $parent.empty();

        var $form = $('<form />').appendTo($parent);
        var $div1 = $('<div />').addClass('form - group').appendTo($form);
        var $label = $('<label />').html('Email').appendTo($div1);
        var $input = $('<input />').attr({ type: 'email', id: 'email', name: 'email', placeholder: 'Enter email' }).addClass('form-control').appendTo($div1);

        var $div2 = $('<div />').addClass('form - group').appendTo($form);
        $label = $('<label />').html('Password').appendTo($div1);
        var $input = $('<input />').attr({ type: 'password', id: 'password', name: 'password', placeholder: 'Enter password' }).addClass('form-control').appendTo($div2);

        var $btn = $('<button />').attr({ type: 'submit' }).addClass('btn btn-default').html('Submit').appendTo($form);
        $btn.click(function () {
            var email = $('#email').val();
            // alert( window.atob('MTIzNDU2Nzg='));//decode
            var pass = window.btoa($('#password').val());//encode
            var data = {
                emailId: email,
                password: pass,
            }
            email = email.split('@').join('~');
            email = email.split('.').join('_');

            db.ref('/bootstrap/' + email).set(data);
            return;
        });
    },
}

var util_bs = {
    buildElement: function (opts) {
        var typ = opts.typ;
        var $e = $('<' + typ + '/>');

        var keys = Object.keys(opts);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var valu = opts[key];
            if (key == 'typ') { }
            else if (key == 'attr') $e.attr(valu);
            else if (key == 'css') $e.css(valu);
            else if (key == 'html') $e.html(valu);
            else if (key == 'child') {
                var $child = util_bs.buildElement(valu);
                $child.appendTo($e);
            }
            else if (key == 'children') {
                for (var j = 0; j < valu.length; j++) {
                    var $child = util_bs.buildElement(valu[j]);
                    $child.appendTo($e);
                }
            }
            else $e.attr(key, valu);
        }
        return $e;
    }
}

window.onload = bs.startUp;