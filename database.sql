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
    website VARCHAR(500),
    logo VARCHAR(500),
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
    url VARCHAR(500),
    ad_id INT
); 

-- houses ads with relations to the category and agency they're tied to --
CREATE TABLE ad (
    id SERIAL PRIMARY KEY,
    name VARCHAR(300),
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
    logo VARCHAR(300)
); 

-- houses social media links for agency profiles and the related social_media_type --
CREATE TABLE social_media (
    id SERIAL PRIMARY KEY,
    url VARCHAR(300),
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

-- organization -- 
INSERT INTO organization
(name, description, website, logo)
VALUES ('Prime', 'bootcamp', 'https://primeacademy.io/', 'https://static1.squarespace.com/static/56d5ff46c6fc08e0509790f4/t/5851ab54725e25c5318e535f/1481747309362/PrimeDigitalAcademy')
RETURNING id;

-- must register user first for authentication to work
UPDATE organization 
SET name = 'hunters agency',
description = 'short bio here',
website = 'https://github.com/skwid138',
logo = 'http://www.gettingsmart.com/wp-content/uploads/2013/06/GSWebButton-DeeperLearning-Featured-482x335-copy.jpg'
WHERE email = 'hunter'
RETURNING id;

-- category --
INSERT INTO category
(full_category)
VALUES('school')
RETURNING id
;

-- ad --
INSERT INTO ad
(name, advertiser, award, year, organization_id, category_id)
VALUES('canopus campaign','prime academy', 'gold', 2017,
	(SELECT id FROM organization WHERE name = 'Prime'),
	(SELECT id FROM category WHERE full_category = 'school')
    )
RETURNING id
; 

-- media --
INSERT INTO media
(type, url, ad_id)
VALUES(0, 'https://avatars1.githubusercontent.com/u/33233106?s=200&v=4',
	(SELECT id FROM ad WHERE name = 'canopus campaign')
	)
RETURNING id
;

-- social_media_type -- 
INSERT INTO social_media_type
(name, logo)
VALUES('Facebook', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/F_icon.svg/1000px-F_icon.svg.png')
RETURNING id
;
INSERT INTO social_media_type
(name, logo)
VALUES('Instagram', 'https://instagram-brand.com/wp-content/themes/ig-branding/assets/images/ig-logo-email.png')
RETURNING id
;
INSERT INTO social_media_type
(name, logo)
VALUES('LinkedIn', 'http://www.copyblogger.com/cdn-origin/images/linkedin.png')
RETURNING id
;

-- social_media --
INSERT INTO social_media
(url, organization_id, social_media_type_id)
VALUES('https://www.facebook.com/primedigitalacademy/',
	(SELECT id FROM organization WHERE name = 'Prime'), -- likely can grab id from profile object and can insert it that way, this is more dynamic for testing
	(SELECT id FROM social_media_type WHERE name = 'Facebook') -- same as the above we can grab the id from the profile controller
	)
RETURNING id
;
INSERT INTO social_media
(url, organization_id, social_media_type_id)
VALUES('https://www.instagram.com/explore/locations/755900110/prime-digital-academy/',
	(SELECT id FROM organization WHERE name = 'Prime'),
	(SELECT id FROM social_media_type WHERE name = 'Instagram')
	)
RETURNING id
;
INSERT INTO social_media
(url, organization_id, social_media_type_id)
VALUES('https://www.linkedin.com/edu/prime-digital-academy-170037',
	(SELECT id FROM organization WHERE name = 'Prime'),
	(SELECT id FROM social_media_type WHERE name = 'LinkedIn')
	)
RETURNING id
;

-- credit -- 
INSERT INTO credit
(title, name, ad_id)
VALUES ('President', 'Mark Hurlburt',
	(SELECT id FROM ad WHERE name = 'canopus campaign')
	)
RETURNING id
;