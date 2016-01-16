/*!
 * remark v1.0.6 (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function(document, window, $) {
  'use strict';

  window.AppContacts = App.extend({
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
          $('#addUserForm').modal('show');
        }
      });
    },

    handleEdit: function() {

      $(document).on('click', '[data-toggle=edit]', function() {
        var $button = $(this),
          $panel = $button.parents('.slidePanel'),
          $form = $panel.find('.user-info');
        $button.toggleClass('active');
        $form.toggleClass('active');
      });

      $(document).on('slidePanel::afterLoad', function(e, api) {
        $.components.init('material', api.$panel);
      });

      $(document).on('change', '.user-info .form-group', function(e) {
        var $input = $(this).find('input'),
          $span = $(this).siblings('span');
        $span.html($input.val());
      });

    },

    run: function(next) {
      this.handleAction();
      this.handleEdit();

      $('#addUserForm').modal({
        show: false
      });

      next();
    }
  });

  $(document).ready(function() {
    AppContacts.run();
  });
})(document, window, jQuery);
