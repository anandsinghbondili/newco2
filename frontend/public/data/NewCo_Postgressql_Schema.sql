-- Create enum types first
CREATE TYPE user_role AS ENUM ('admin', 'user', 'moderator', 'guest');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'pending');
CREATE TYPE deal_access AS ENUM ('BOTH', 'INTERNAL', 'EXTERNAL');
CREATE TYPE active_flag AS ENUM ('Y', 'N');
CREATE TYPE division_type AS ENUM ('DC', 'W', 'BU', 'OTHER');
CREATE TYPE status_for_type AS ENUM ('DEAL', 'CLAIM', 'BILLBACK', 'OTHER');
CREATE TYPE lov_flag AS ENUM ('Y', 'N');

-- Create the users table
CREATE TABLE users (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    role user_role NOT NULL,
    status user_status NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the settings_menu table
CREATE TABLE settings_menu (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    route_id VARCHAR(50),
    label VARCHAR(50),
    icon VARCHAR(50),
    parent_id INT NULL,
    display_order INT NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES settings_menu(id) ON DELETE CASCADE
);

-- Create the navigation_menu table
CREATE TABLE navigation_menu (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NULL,
    route_id VARCHAR(50) NULL,
    label VARCHAR(50) NULL,
    icon VARCHAR(50) NULL,
    parent_id INT NULL,
    display_order INT NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES navigation_menu(id) ON DELETE CASCADE
);

-- Create the allSettings table
CREATE TABLE allSettings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NULL,
    route_id VARCHAR(50) NULL,
    label VARCHAR(100) NULL,
    icon VARCHAR(50) NULL,
    parent_id INT NULL,
    display_order INT NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES allSettings(id) ON DELETE CASCADE
);

-- Create the allMenu table
CREATE TABLE allMenu (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NULL,
    route_id VARCHAR(50) NULL,
    label VARCHAR(100) NULL,
    icon VARCHAR(50) NULL,
    parent_id INT NULL,
    display_order INT NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES allMenu(id) ON DELETE CASCADE
);

-- Create the dealtypes table structure
CREATE TABLE dealtypes (
    id INT PRIMARY KEY,
    deal_type VARCHAR(50) NOT NULL,
    deal_type_name VARCHAR(100) NOT NULL,
    deal_type_access deal_access NOT NULL,
    active_flag active_flag NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the divisions table structure
CREATE TABLE divisions (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    division_code VARCHAR(50) NOT NULL,
    division_type division_type NOT NULL,
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_division_id) REFERENCES divisions(id)
);

-- Create the deals table structure
CREATE TABLE deals (
    deal_id SERIAL PRIMARY KEY,
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for deals table
CREATE INDEX idx_deal_status ON deals (deal_status_code);
CREATE INDEX idx_deal_type ON deals (deal_type_id);
CREATE INDEX idx_vendor ON deals (vendor_id);
CREATE INDEX idx_dates ON deals (deal_start_date, deal_end_date);

-- Create the status_codes table structure
CREATE TABLE status_codes (
    id INT PRIMARY KEY,
    status_code VARCHAR(50) NOT NULL,
    display_value VARCHAR(100) NOT NULL,
    status_for status_for_type NOT NULL,
    show_in_lov_flag lov_flag NULL,
    creation_date DATE NULL,
    last_update_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (status_code, status_for)
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables with updated_at
CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_dealtypes_timestamp
BEFORE UPDATE ON dealtypes
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_divisions_timestamp
BEFORE UPDATE ON divisions
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_deals_timestamp
BEFORE UPDATE ON deals
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_status_codes_timestamp
BEFORE UPDATE ON status_codes
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();