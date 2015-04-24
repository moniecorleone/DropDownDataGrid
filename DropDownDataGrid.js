//Author: Monie Corleone
//Purpose: To show datagrid in dropdown
; (function ($, window, document, undefined) {
    var pluginName = "DropdownDatagrid";
    var defaults = {
        defaultselecttext: "Select",
        defaultvalue: null,
        gridwidth: "500px",
        data: null,
        ValueMemberId: null,
        columns: null,
        displayColumn: null
    };

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this,
            config = that.options;
            $(that.element).addClass('DropdownDatagrid').append('<span class="drpdownselect">' + config.defaultselecttext + '</span>')
                .find('span').bind('click', function () {
                    if ($(that.element).find(".drpdowndatagriddiv").is(":visible")) {
                        $(that.element).find(".drpdowndatagriddiv").hide();
                    }
                    else {
                        $(that.element).find(".drpdowndatagriddiv").css(
                       {
                           'margin-top': $(this).outerHeight()
                       }).show();
                    }
                });;
            var _drpdowntr = $(that.element).append("<div class='drpdowndatagriddiv' />")
                .find(".drpdowndatagriddiv").css({
                    width: config.gridwidth,
                    position: 'absolute',
                    display: 'none'
                }).append("<table>").find('table').append("<thead>").find('thead').append("<tr />").find('tr');
            var _drpdowntbody = $(that.element).find('table').append("<tbody>").find('tbody');
            $.each(config.columns, function (i, val) {
                var _th = $("<th />").append(val.title).appendTo(_drpdowntr);
            });
            $.each(config.data, function (i, val) {
                $('<tr />', {
                    'class': 'bally-dropdown-datagrid-row'
                }).data('rid', config.data[i][config.ValueMemberId]).data('displaymember', config.data[i][config.displayColumn]).append(
                   $.map(config.columns, function (o) {
                       return $('<td />').append(val[o.field]).css({
                           'text-align': o.align
                       });
                   })
               ).bind('click', function () {
                   if ($(this).hasClass('selectedRow')) {
                       $(this.tagName).removeClass('selectedRow');
                   } else {
                       $(this.tagName).removeClass('selectedRow');
                       $(this).addClass('selectedRow');
                   }
                   if ($(this).hasClass('selectedRow')) {
                       $(that.element).find('.drpdownselect').html($(this).data("displaymember"));
                   } else {
                       $(that.element).find('.drpdownselect').html(config.defaultselecttext);
                   }
                   config.onRowSelection($(this).data("rid"), this, $(this).hasClass('selectedRow'));
                   $(that.element).find(".drpdowndatagriddiv").hide();
               }).appendTo(_drpdowntbody);
            });
            if (config.defaultvalue != null && config.defaultvalue != undefined) {
                selectedarr = jQuery.grep(config.data, function (n, i) {
                    return (config.data[i][config.defaultvalue.field] === config.defaultvalue.value)
                });
                $(that.element).find('.drpdownselect').html(selectedarr[0][config.displayColumn]);
                $(that.element).find(".bally-dropdown-datagrid-row").each(function () {
                    if ($(this).data("rid") === selectedarr[0][config.ValueMemberId]) {
                        $(this).addClass('selectedRow');
                    }
                });
            }
            $(document).mouseup(function (e) {
                var container = $(that.element).find(".drpdowndatagriddiv");
                var container1 = $(that.element).find(".drpdownselect");
                if (!container.is(e.target)
                    && container.has(e.target).length === 0 && ($(that.element).find(e.target).length == 0)) {
                    container.hide();
                }
            });
        }
        , reload: function () {
            $(this.element).empty();
            this.init();
        }
    }
    $.fn[pluginName] = function (options) {
        if (typeof options === "string") {
            var args = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var plugin = $.data(this, 'plugin_' + pluginName);
                if (plugin[options]) {
                    plugin[options].apply(plugin, args);
                } else {
                    plugin['options'][options] = args[0];
                }
            });
        } else {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        }
    }
})(jQuery, window, document, undefined);