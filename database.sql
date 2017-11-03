-- DB Name: mn-trails-finder


-- Table Creation --

-- houses ad agency information and auth credentials --
CREATE TABLE organization (
    id SERIAL PRIMARY KEY,
	name VARCHAR(200)  NOT NULL UNIQUE,
    description TEXT,
    website VARCHAR(200),
    logo VARCHAR(200),
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200)  NOT NULL
); 

-- houses the award categorys --
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    full_category VARCHAR(200) NOT NULL UNIQUE
); 

-- houses links to media files for a related ad --
CREATE TABLE media (
    id SERIAL PRIMARY KEY,
    ad_id INT REFERENCES ad (id) ON DELETE CASCADE,
    type INT,
    url_one VARCHAR(200),
    url_two VARCHAR(200),
    url_three VARCHAR(200),
    url_four VARCHAR(200),
    url_five VARCHAR(200),
    url_six VARCHAR(200)
); 

-- houses ads with relations to the category and agency they're tied to --
CREATE TABLE ad (
    id SERIAL PRIMARY KEY,
	category_id INT REFERENCES category (id),
    organization_id INT REFERENCES organization (id),
    advertiser VARCHAR(200),
    award VARCHAR(10),
    year INT
); 

-- houses the people credited for producing a certain ad --
CREATE TABLE credit (
    id SERIAL PRIMARY KEY,
	ad_id INT REFERENCES ad (id) ON DELETE CASCADE,
    title VARCHAR(200),
    name VARCHAR(200)
); 

-- houses social media platform information --
CREATE TABLE social_media_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    logo VARCHAR(200)
); 

-- houses social media links for agency profiles and the related social_media_type --
CREATE TABLE social_media (
    id SERIAL PRIMARY KEY,
    organization_id INT REFERENCES organization (id) ON DELETE CASCADE,
    social_media_type_id INT REFERENCES social_media_type (id) ON DELETE CASCADE,
    url VARCHAR(200)
); 