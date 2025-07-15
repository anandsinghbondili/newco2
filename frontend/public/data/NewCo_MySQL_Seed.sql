

INSERT INTO newco_user_profiles (id, name, username, email, role, status) VALUES
('u-1001', 'John Smith', 'john.smith', 'john.smith@example.com', 'admin', 'active'),
('u-1002', 'Sarah Johnson', 'sarah.j', 'sarah.j@example.com', 'user', 'active'),
('u-1003', 'Michael Chen', 'michael.c', 'michael.c@example.com', 'moderator', 'active'),
('u-1004', 'Emily Wilson', 'emily.w', 'emily.w@example.com', 'user', 'pending'),
('u-1005', 'David Brown', 'david.b', 'david.b@example.com', 'user', 'suspended'),
('u-1006', 'Jessica Lee', 'jessica.l', 'jessica.l@example.com', 'moderator', 'active'),
('u-1007', 'Robert Taylor', 'robert.t', 'robert.t@example.com', 'guest', 'inactive'),
('u-1008', 'Jennifer Davis', 'jennifer.d', 'jennifer.d@example.com', 'user', 'active'),
('u-1009', 'William Martinez', 'william.m', 'william.m@example.com', 'admin', 'active'),
('u-1010', 'Amanda Garcia', 'amanda.g', 'amanda.g@example.com', 'user', 'pending');

INSERT INTO newco_settings_menu (title, route_id, label, icon, parent_id, display_order) VALUES
('Access Control', NULL, NULL, NULL, NULL, 1),
('Deal Setup', NULL, NULL, NULL, NULL, 2),
('Common Setup', NULL, NULL, NULL, NULL, 3),
('Configure', NULL, NULL, NULL, NULL, 4),
('Claim Setup', NULL, NULL, NULL, NULL, 5),
(NULL, 'setupRolesPanel', 'Define Roles', 'KeyRound', 1, 1),
(NULL, 'setupUsersPanel', 'Define Users', 'User', 1, 2),
(NULL, 'dealTypePanel', 'Deal Types', 'Handshake', 2, 1),
(NULL, 'lookupPanel', 'Lookups', 'Search', 3, 1),
(NULL, 'claimTypePanel', 'Claim Types', 'ListChecks', 5, 1);

INSERT INTO newco_navigation_menu (title, route_id, label, icon, parent_id, display_order) VALUES
('Overview', NULL, NULL, NULL, NULL, 1),
('Programs', NULL, NULL, NULL, NULL, 2),
('Deals', NULL, NULL, NULL, NULL, 3),
('Finance', NULL, NULL, NULL, NULL, 4),
('Reports', NULL, NULL, NULL, NULL, 5),
(NULL, 'dashboard', 'Dashboard', 'LayoutDashboard', 1, 1),
(NULL, 'programs', 'All Programs', 'Layers', 2, 1),
(NULL, 'deals', 'Current Deals', 'Handshake', 3, 1),
(NULL, 'payments', 'Payments', 'CreditCard', 4, 1),
(NULL, 'analytics', 'Analytics', 'BarChart', 5, 1);

INSERT INTO newco_all_settings (title, route_id, label, icon, parent_id, display_order) VALUES
('System', NULL, NULL, NULL, NULL, 1),
('Configuration', NULL, NULL, NULL, NULL, 2),
('Integration', NULL, NULL, NULL, NULL, 3),
(NULL, 'userSettings', 'User Settings', 'User', 1, 1),
(NULL, 'roleSettings', 'Role Settings', 'Shield', 1, 2),
(NULL, 'appConfig', 'App Config', 'Settings', 2, 1),
(NULL, 'themeConfig', 'Themes', 'Palette', 2, 2),
(NULL, 'apiSettings', 'API Settings', 'Code', 3, 1),
(NULL, 'webhookSettings', 'Webhooks', 'Link', 3, 2),
(NULL, 'ssoSettings', 'SSO Config', 'Key', 3, 3);

INSERT INTO newco_all_menu (title, route_id, label, icon, parent_id, display_order) VALUES
('Main', NULL, NULL, NULL, NULL, 1),
('Operations', NULL, NULL, NULL, NULL, 2),
('Admin', NULL, NULL, NULL, NULL, 3),
(NULL, 'home', 'Home', 'Home', 1, 1),
(NULL, 'tasks', 'Tasks', 'CheckCircle', 2, 1),
(NULL, 'projects', 'Projects', 'Folder', 2, 2),
(NULL, 'users', 'Users', 'Users', 3, 1),
(NULL, 'audit', 'Audit Log', 'FileText', 3, 2),
(NULL, 'settings', 'Settings', 'Settings', 3, 3),
(NULL, 'help', 'Help Center', 'HelpCircle', 1, 2);

INSERT INTO newco_dealtypes (id, deal_type, deal_type_name, deal_type_access, active_flag) VALUES
(1, 'STANDARD', 'Standard Deal', 'BOTH', 'Y'),
(2, 'PROMO', 'Promotional Deal', 'BOTH', 'Y'),
(3, 'VIP', 'VIP Exclusive', 'INTERNAL', 'Y'),
(4, 'SEASONAL', 'Seasonal Offer', 'BOTH', 'Y'),
(5, 'BULK', 'Bulk Purchase', 'BOTH', 'Y'),
(6, 'TRIAL', 'Trial Offer', 'EXTERNAL', 'Y'),
(7, 'CUSTOM', 'Custom Deal', 'INTERNAL', 'Y'),
(8, 'PARTNER', 'Partner Deal', 'BOTH', 'Y'),
(9, 'LEGACY', 'Legacy Deal', 'INTERNAL', 'N'),
(10, 'TEST', 'Test Deal', 'INTERNAL', 'N');

INSERT INTO newco_divisions (id, name, division_code, division_type, active_flag, start_date) VALUES
(1, 'North America', 'NA', 'DC', TRUE, '2020-01-01'),
(2, 'Europe', 'EU', 'DC', TRUE, '2020-01-01'),
(3, 'Asia Pacific', 'APAC', 'DC', TRUE, '2020-01-01'),
(4, 'New York Office', 'NY', 'W', TRUE, '2020-05-15'),
(5, 'London Office', 'LDN', 'W', TRUE, '2020-05-15'),
(6, 'Tokyo Office', 'TKY', 'W', TRUE, '2020-05-15'),
(7, 'Sales Team', 'SALES', 'BU', TRUE, '2020-03-01'),
(8, 'Marketing Team', 'MKTG', 'BU', TRUE, '2020-03-01'),
(9, 'Engineering Team', 'ENG', 'BU', TRUE, '2020-03-01'),
(10, 'Retired Division', 'OLD', 'OTHER', FALSE, '2019-01-01');


INSERT INTO newco_deal_headers (deal_name, deal_status_code, deal_status, deal_start_date, deal_type_id, vendor_id) VALUES
('Summer Sale 2023', 'ACTIVE', 'Active', '2023-06-01', 1, 101),
('Black Friday Promo', 'PENDING', 'Pending', '2023-11-20', 2, 102),
('VIP Exclusive Offer', 'ACTIVE', 'Active', '2023-05-15', 3, 103),
('Q4 Bulk Purchase', 'DRAFT', 'Draft', '2023-10-01', 4, 104),
('New Customer Trial', 'ACTIVE', 'Active', '2023-07-01', 5, 105),
('Partner Special', 'APPROVED', 'Approved', '2023-08-15', 6, 106),
('Holiday Bundle', 'PENDING', 'Pending', '2023-12-01', 7, 107),
('Test Deal 001', 'DRAFT', 'Draft', '2023-09-01', 8, 108),
('Legacy Renewal', 'ACTIVE', 'Active', '2023-01-01', 9, 109),
('Custom Agreement', 'REVIEWED', 'Reviewed', '2023-04-01', 10, 110);


INSERT INTO newco_status_codes (id, status_code, display_value, status_for, show_in_lov_flag) VALUES
(1, 'DRAFT', 'Draft', 'DEAL', 'Y'),
(2, 'PENDING', 'Pending Approval', 'DEAL', 'Y'),
(3, 'APPROVED', 'Approved', 'DEAL', 'Y'),
(4, 'ACTIVE', 'Active', 'DEAL', 'Y'),
(5, 'COMPLETED', 'Completed', 'DEAL', 'Y'),
(6, 'REJECTED', 'Rejected', 'DEAL', 'Y'),
(7, 'CANCELLED', 'Cancelled', 'DEAL', 'Y'),
(8, 'EXPIRED', 'Expired', 'DEAL', 'Y'),
(9, 'ARCHIVED', 'Archived', 'DEAL', 'N'),
(10, 'HOLD', 'On Hold', 'DEAL', 'Y');