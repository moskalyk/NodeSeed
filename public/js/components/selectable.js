/*!
 * remark v1.0.5 (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
$.components.register("selectable", {
  mode: "init",
  defaults: {
    allSelector: '.selectable-all',
    itemSelector: '.selectable-item',
    rowSelector: 'tr',
    rowSelectable: false,
    rowActiveClass: 'active'
  },
  init: function(context) {
    var defaults = $.components.getDefaults('selectable');

    $('[data-selectable="selectable"]', context).each(function() {
      var $this = $(this),
        options = $.extend(true, {}, defaults, $this.data());

      /* selectable */
      var selectRow = function(item, value) {
        if (value) {
          item.parents(options.rowSelector).addClass(options.rowActiveClass);
        } else {
          item.parents(options.rowSelector).removeClass(options.rowActiveClass);
        }
      };

      $this.on('click', options.allSelector, function() {
        var value = $(this).prop("checked");

        $this.find(options.itemSelector).each(function() {
          var $one = $(this);
          $one.prop("checked", value);

          selectRow($one, value);
        });
      });

      $this.on('click', options.itemSelector, function(e) {
        var $one = $(this);
        value = $one.prop("checked");
        selectRow($one, value);
        e.stopPropagation();
      });

      $this.on('click', options.itemSelector, function(e) {
        var $one = $(this);
        value = $one.prop("checked");
        selectRow($one, value);
        e.stopPropagation();
      });

      $this.on('change', options.itemSelector, function() {
        $all = $this.find(options.allSelector),
          $row = $this.find(options.itemSelector),
          total = $row.length,
          checked = $(options.itemSelector, $this).filter(':checked').length;

        if (total === checked) {
          $all.prop('checked', true);
        } else {
          $all.prop('checked', false);
        }
      });

      if (options.rowSelectable) {
        $this.on('click', options.rowSelector, function(e) {
          if ("checkbox" !== e.target.type && "button" !== e.target.type && "a" !== e.target.tagName.toLowerCase() && !$(e.target).parent("div.checkbox-custom").length) {
            var $checkbox = $(options.itemSelector, this),
              value = $checkbox.prop("checked");
            $checkbox.prop("checked", !value);
            selectRow($checkbox, !value);
          }
        });
      }
    });
  }
});
