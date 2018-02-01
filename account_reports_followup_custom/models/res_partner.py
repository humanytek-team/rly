# -*- coding: utf-8 -*-

from datetime import datetime

from odoo import models


class ResPartner(models.Model):
    _inherit = 'res.partner'

    def get_exclude_credit_notes_ids(self, partner_id=False):
        if partner_id:
            partner = self.env['res.partner'].browse([partner_id])
            refund_aml_ids = []
            for x in partner.unreconciled_aml_ids:
                if x.invoice_id.type == 'out_refund':
                    refund_aml_ids.append(x.id)
            return refund_aml_ids
        return []

    def get_due_dates_ids(self, partner_id=False):
        if partner_id:
            partner = self.env['res.partner'].browse([partner_id])
            today = datetime.today().strftime('%Y-%m-%d')
            due_aml_ids = []
            for x in partner.unreconciled_aml_ids:
                if not x.invoice_id.suggested_payment_date <= today:
                    due_aml_ids.append(x.id)
            return due_aml_ids
        return []

    def exclude_payment_ids(self, partner_id=False):
        if partner_id:
            partner = self.env['res.partner'].browse([partner_id])
            payment_aml_ids = []
            for x in partner.unreconciled_aml_ids:
                if x.payment_id:
                    payment_aml_ids.append(x.id)
            return payment_aml_ids
        return []
