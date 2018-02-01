odoo.define('account_reports_followup_custom.report_followup_custom', function(require) {
    "use strict";

var Model = require('web.Model');
var account_report_followup_generic = require('account_reports.account_report_followup_generic');

account_report_followup_generic.include({

    events: _.defaults({
        'click .ex_cr_note_dis': 'ex_cr_note_dis',
        'click .con_due_dates': 'con_due_dates',
        'click .exclude_payment': 'exclude_payment',
    }, account_report_followup_generic.prototype.events),

    ex_cr_note_dis: function(e) {
        var partner_id = $(e.target).parents('span').data("active-id");
        return new Model('res.partner').call('get_exclude_credit_notes_ids', [parseInt(partner_id),parseInt(partner_id)]).then(function (result) {
            var main_checkbox = $('.ex_cr_note_dis').is(':checked');
            for (var i = 0; i < result.length; i++) {
                var checkbox = $('tr.unreconciled_aml[data-id=' + result[i] + ']').find("input[name='blocked']");
                if (main_checkbox){
                    checkbox.prop('checked', true);
                }
                else{
                    checkbox.prop('checked', false);
                }
                if (checkbox.is(":checked")) {
                    checkbox.parents('tr').attr('bgcolor', 'LightGray');
                }
                else {
                    checkbox.parents('tr').attr('bgcolor', 'white');
                }
            }
            return new Model('account.move.line').call('write_blocked', [result, main_checkbox]);
        });
    },

    con_due_dates: function(e) {
        var partner_id = $(e.target).parents('span').data("active-id");
        return new Model('res.partner').call('get_due_dates_ids', [parseInt(partner_id),parseInt(partner_id)]).then(function (result) {
            var main_checkbox = $('.con_due_dates').is(':checked');
            for (var i = 0; i < result.length; i++) {
                var checkbox = $('tr.unreconciled_aml[data-id=' + result[i] + ']').find("input[name='blocked']");
                if (main_checkbox){
                    checkbox.prop('checked', true);
                }
                else{
                    checkbox.prop('checked', false);
                }
                if (checkbox.is(":checked")) {
                    checkbox.parents('tr').attr('bgcolor', 'LightGray');
                }
                else {
                    checkbox.parents('tr').attr('bgcolor', 'white');
                }
            }
            return new Model('account.move.line').call('write_blocked', [result, main_checkbox]);
        });
    },

    exclude_payment: function(e) {
        var partner_id = $(e.target).parents('span').data("active-id");
        return new Model('res.partner').call('exclude_payment_ids', [parseInt(partner_id),parseInt(partner_id)]).then(function (result) {
            var main_checkbox = $('.exclude_payment').is(':checked');
            for (var i = 0; i < result.length; i++) {
                var checkbox = $('tr.payment[data-id=' + result[i] + ']').find("input[name='blocked']");
                if (main_checkbox){
                    checkbox.prop('checked', true);
                }
                else{
                    checkbox.prop('checked', false);
                }
                if (checkbox.is(":checked")) {
                    checkbox.parents('tr').attr('bgcolor', 'LightGray');
                }
                else {
                    checkbox.parents('tr').attr('bgcolor', 'white');
                }
            }
            return new Model('account.move.line').call('write_blocked', [result, main_checkbox]);
        });
    },
});
});
