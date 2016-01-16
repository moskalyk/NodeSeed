/*!
 * remark v1.0.6 (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function(document, window, $) {
  'use strict';

  window.AppCalendar = App.extend({

    handleAction: function() {
      $('.site-action').on('click', function() {
        var $this = $(this);

        if (!$this.hasClass('site-action-toggle')) {
          $('#addNewCalendarForm').modal('show');
        }
      });

      $('.site-action').on('mouseover', function() {
        var $this = $(this);

        if ($this.hasClass('site-action-toggle')) {
          $(this).addClass('active');
        }
      });

      $('.site-action').on('mouseleave', function() {
        var $this = $(this);

        if ($this.hasClass('site-action-toggle')) {
          $(this).removeClass('active');
        }
      });
    },

    handleEventList: function() {
      $('#addNewGroupBtn').on('click', function() {
        $('#addNewGroup').modal('show');
      });

      $('.calendar-list .calendar-event').each(function() {
        var $this = $(this),
          color = $this.data('color').split('-');
        $this.data('event', {
          title: $this.data('title'),
          stick: $this.data('stick'),
          backgroundColor: $.colors(color[0], color[1]),
          borderColor: $.colors(color[0], color[1])
        });
        $this.draggable({
          zIndex: 999,
          revert: true,
          revertDuration: 0,
          helper: function() {
            return '<a class="fc-day-grid-event fc-event fc-start fc-end" style="background-color:' + $.colors(color[0], color[1]) + ';border-color:' + $.colors(color[0], color[1]) + '">' +
              '<div class="fc-content">' +
              '<span class="fc-title">' + $this.data('title') + '</span>' +
              '</div>' +
              '</a>';
          }
        });
      });
    },

    run: function(next) {
      $('#addNewCalendarForm').modal({
        show: false
      });


      this.handleEventList();
      this.handleAction();

      next();
    }
  });

  $(document).ready(function() {
    AppCalendar.run();
  });
})(document, window, jQuery);
