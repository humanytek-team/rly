# -*- coding: utf-8 -*-
{
    'name': "Account Reports Followup Custom",
    'summary': """Account Reports Followup Custom""",
    'description': """
        Account Reports Followup Custom
    """,
    'author': "My Company",
    'website': "http://www.yourcompany.com",
    'category': 'Test',
    'version': '10.0.1.0.0',
    'depends': ['base', 'account_reports_followup','sale'],
    'data': [
        'views/web_asset_backend_template.xml',
        'views/report_followup.xml',
    ],
    'demo': [
    ],
    'qweb': [
    ],
}
