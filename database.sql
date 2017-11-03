-- ** Create Database ** --
-- Make sure database already exists or create it
-- CREATE DATABASE the_show;

-- ** Drop Foreign Key Contraints
ALTER TABLE IF EXISTS ad
    DROP CONSTRAINT IF EXISTS organization_fk;
ALTER TABLE IF EXISTS ad
    DROP CONSTRAINT IF EXISTS category_fk;
ALTER TABLE IF EXISTS media
    DROP CONSTRAINT IF EXISTS ad_fk;
ALTER TABLE IF EXISTS credit
    DROP CONSTRAINT IF EXISTS ad_fk;
ALTER TABLE IF EXISTS social_media
    DROP CONSTRAINT IF EXISTS organization_fk;
ALTER TABLE IF EXISTS social_media
    DROP CONSTRAINT IF EXISTS social_media_type_fk; 

-- ** Drop Tables** --
DROP TABLE IF EXISTS organization;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS ad;
DROP TABLE IF EXISTS credit;
DROP TABLE IF EXISTS social_media_type;
DROP TABLE IF EXISTS social_media;

-- ** Create Tables ** --
-- houses ad agency information and auth credentials --
CREATE TABLE organization (
    id SERIAL PRIMARY KEY,
	name VARCHAR(200)  NOT NULL UNIQUE,
    description TEXT,
    website VARCHAR(200),
    logo VARCHAR(200),
    email VARCHAR(200) UNIQUE,
    password VARCHAR(200),
    isadmin boolean DEFAULT FALSE,
    CHECK (isadmin = FALSE)
);

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    isadmin boolean DEFAULT TRUE,
    CHECK (isadmin = TRUE)
); 

-- houses the award categories --
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    full_category VARCHAR(200) NOT NULL UNIQUE
); 

-- houses links to media files for a related ad --
CREATE TABLE media (
    id SERIAL PRIMARY KEY,
    type INT,
    url VARCHAR(200),
    ad_id INT
); 

-- houses ads with relations to the category and agency they're tied to --
CREATE TABLE ad (
    id SERIAL PRIMARY KEY,
    advertiser VARCHAR(200),
    award VARCHAR(10),
    year INT,
    organization_id INT,
    category_id INT
); 

-- houses the people credited for producing a certain ad --
CREATE TABLE credit (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    name VARCHAR(200),
    ad_id INT
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
    url VARCHAR(200),
    organization_id INT,
    social_media_type_id INT

);

-- ** Add Foreign Key Constraints
-- ad foreign keys
ALTER TABLE ad
    ADD CONSTRAINT organization_fk
    FOREIGN KEY (organization_id)
    REFERENCES organization (id);
ALTER TABLE ad
    ADD CONSTRAINT category_fk
    FOREIGN KEY (category_id)
    REFERENCES category (id);

-- media foreign key
ALTER TABLE media
    ADD CONSTRAINT ad_fk
    FOREIGN KEY (ad_id)
    REFERENCES ad (id)
    ON DELETE CASCADE;

-- credit foreign key
ALTER TABLE credit
    ADD CONSTRAINT ad_fk
    FOREIGN KEY (ad_id)
    REFERENCES ad (id)
    ON DELETE CASCADE;

-- social media foreign key
ALTER TABLE social_media
    ADD CONSTRAINT organization_fk
    FOREIGN KEY (organization_id)
    REFERENCES organization (id)
    ON DELETE CASCADE;
ALTER TABLE social_media
    ADD CONSTRAINT social_media_type_fk
    FOREIGN KEY (social_media_type_id)
    REFERENCES social_media_type (id)
    ON DELETE CASCADE;

-- ** Insert Mock Data **
--