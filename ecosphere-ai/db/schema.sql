-- Enable PostGIS extension for location/spatial queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Users table (Farmers, NGOs, Govt)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) CHECK (role IN ('farmer', 'ngo', 'government')) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    location GEOMETRY(Point, 4326), -- PostGIS spatial column for exact location
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crop Records table
CREATE TABLE crop_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    crop_type VARCHAR(100) NOT NULL,
    planting_date DATE NOT NULL,
    area_size_hectares NUMERIC(10, 2),
    location GEOMETRY(Polygon, 4326), -- Field boundaries
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Analysis Results (Store agent responses)
CREATE TABLE analysis_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    crop_record_id UUID REFERENCES crop_records(id) ON DELETE SET NULL,
    agent_type VARCHAR(100) NOT NULL, -- e.g., 'crop-doctor', 'smart-irrigation'
    input_data JSONB, -- Store inputs dynamically
    result_data JSONB, -- Store structured output
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sustainability Scores
CREATE TABLE sustainability_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    score_value NUMERIC(5, 2) NOT NULL,
    water_usage_metric NUMERIC(10, 2),
    carbon_footprint NUMERIC(10, 2),
    assessment_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Alerts table
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    alert_type VARCHAR(100) NOT NULL, -- e.g., 'heatwave', 'disease_outbreak'
    severity VARCHAR(50) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_crop_records_user_id ON crop_records(user_id);
CREATE INDEX idx_analysis_results_agent_type ON analysis_results(agent_type);
CREATE INDEX idx_alerts_user_id_is_read ON alerts(user_id, is_read);

-- Spatial Indexes (PostGIS)
CREATE INDEX idx_users_location ON users USING GIST(location);
CREATE INDEX idx_crop_records_location ON crop_records USING GIST(location);
