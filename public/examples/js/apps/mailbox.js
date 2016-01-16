/*!
 * remark v1.0.6 (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function(document, window, $) {
  'use strict';

  window.AppMailbox = App.extend({
    handleAction: function() {
      $(document).on('change', '.selectable-item', function() {
        var $checked = $('input.selectable-item:checked'),
          length = $checked.length;

        if (length > 0) {
          $('.site-action').addClass('site-action-toggle');
        } else {
          $('.site-action').removeClass('site-action-toggle');
        }
      });

      $('.site-action').on('click', function(e) {
        var $this = $(this);

        if ($this.hasClass('site-action-toggle')) {

          $('.selectable-all').prop('checked', false).trigger('change');

          $this.removeClass('site-action-toggle');
          e.stopPropagation();
        } else {
          $('#addMailForm').modal('show');
        }
      });
    },
    run: function(next) {
      this.handleAction();

      $('#addMailForm').modal({
        show: false
      });
      $('.checkbox-important').on('click', function(e) {
        e.stopPropagation();
      });
      this.handleMultiSelect();
      next();
    }
  });

  $(document).ready(function() {
    AppMailbox.run();
  });
})(document, window, jQuery);
