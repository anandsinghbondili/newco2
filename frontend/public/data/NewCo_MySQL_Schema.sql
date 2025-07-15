-- Create the users table
CREATE TABLE newco_user_profiles (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('admin', 'user', 'moderator', 'guest') NOT NULL,
    status ENUM('active', 'inactive', 'suspended', 'pending') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Create the settings_menu table
CREATE TABLE newco_settings_menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    route_id VARCHAR(50),
    label VARCHAR(50),
    icon VARCHAR(50),
    parent_id INT NULL,
    display_order INT NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES newco_settings_menu(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Create the navigation_menu table
CREATE TABLE newco_navigation_menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NULL,
    route_id VARCHAR(50) NULL,
    label VARCHAR(50) NULL,
    icon VARCHAR(50) NULL,
    parent_id INT NULL,
    display_order INT NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES newco_navigation_menu(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Create the allSettings table
CREATE TABLE newco_all_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NULL,
    route_id VARCHAR(50) NULL,
    label VARCHAR(100) NULL,
    icon VARCHAR(50) NULL,
    parent_id INT NULL,
    display_order INT NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES newco_all_settings(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Create the allMenu table
CREATE TABLE newco_all_menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NULL,
    route_id VARCHAR(50) NULL,
    label VARCHAR(100) NULL,
    icon VARCHAR(50) NULL,
    parent_id INT NULL,
    display_order INT NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES newco_all_menu(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Create the dealtypes table structure
CREATE TABLE newco_dealtypes (
    id INT PRIMARY KEY,
    deal_type VARCHAR(50) NOT NULL,
    deal_type_name VARCHAR(100) NOT NULL,
    deal_type_access ENUM('BOTH', 'INTERNAL', 'EXTERNAL') NOT NULL,
    active_flag ENUM('Y', 'N') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Create the divisions table structure
CREATE TABLE newco_divisions (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    division_code VARCHAR(50) NOT NULL,
    division_type ENUM('DC', 'W', 'BU', 'OTHER') NOT NULL,
    active_flag BOOLEAN NOT NULL DEFAULT TRUE,
    start_date DATE NULL,
    end_date DATE NULL,
    operating_unit VARCHAR(100) NULL,
    legal_entity VARCHAR(100) NULL,
    ledger VARCHAR(50) NULL,
    credit_account VARCHAR(50) NULL,
    debit_account VARCHAR(50) NULL,
    parent_division_id INT NULL,
    accounted_currency VARCHAR(10) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_division_id) REFERENCES newco_divisions(id)
) ENGINE=InnoDB;

-- Create the deals table structure
CREATE TABLE newco_deal_headers (
    deal_id INT AUTO_INCREMENT PRIMARY KEY,
    deal_name VARCHAR(255) NOT NULL,
    deal_status_code VARCHAR(20) NOT NULL,
    deal_status VARCHAR(50) NOT NULL,
    deal_start_date DATE NOT NULL,
    deal_end_date DATE NULL,
    deal_type_id INT NOT NULL,
    vendor_id INT NOT NULL,
    vendor_name VARCHAR(255) NULL,
    customer_id INT NULL,
    customer_deal_num VARCHAR(100) NULL,
    deal_min_qty DECIMAL(15,2) NULL,
    deal_volume_type VARCHAR(50) NULL,
    tier_break_type VARCHAR(50) NULL,
    brand_name VARCHAR(100) NULL,
    comments TEXT NULL,
    contact_email VARCHAR(255) NULL,
    organization_name VARCHAR(255) NULL,
    program_name VARCHAR(255) NULL,
    plan_header_id INT NULL,
    fund_header_id INT NULL,
    deal_submitted_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_deal_status (deal_status_code),
    INDEX idx_deal_type (deal_type_id),
    INDEX idx_vendor (vendor_id),
    INDEX idx_dates (deal_start_date, deal_end_date)
) ENGINE=InnoDB;

-- Create the status_codes table structure
CREATE TABLE newco_status_codes (
    id INT PRIMARY KEY,
    status_code VARCHAR(50) NOT NULL,
    display_value VARCHAR(100) NOT NULL,
    status_for ENUM('DEAL', 'CLAIM', 'BILLBACK', 'OTHER') NOT NULL,
    show_in_lov_flag ENUM('Y', 'N') NULL,
    creation_date DATE NULL,
    last_update_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_status (status_code, status_for)
) ENGINE=InnoDB;