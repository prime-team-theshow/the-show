-- ** Create Database ** --
-- Make sure database already exists or create it
-- CREATE DATABASE the_show;

-- ** AD ** --
-- admin: username: --

-- ** Drop Foreign Key Contraints
ALTER TABLE IF EXISTS ad
    DROP CONSTRAINT IF EXISTS organization_fk,
    DROP CONSTRAINT IF EXISTS category_fk,
    DROP CONSTRAINT IF EXISTS year_fk;
ALTER TABLE IF EXISTS media
    DROP CONSTRAINT IF EXISTS ad_fk;
ALTER TABLE IF EXISTS credit
    DROP CONSTRAINT IF EXISTS ad_fk;
ALTER TABLE IF EXISTS social_media
    DROP CONSTRAINT IF EXISTS organization_fk,
    DROP CONSTRAINT IF EXISTS social_media_type_fk; 

-- ** Drop Tables** --
DROP TABLE IF EXISTS organization;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS year;
DROP TABLE IF EXISTS ad;
DROP TABLE IF EXISTS credit;
DROP TABLE IF EXISTS social_media_type;
DROP TABLE IF EXISTS social_media;

-- ** Create Tables ** --

-- admin auth credentials
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    ismailer BOOLEAN DEFAULT FALSE,
    invite_template TEXT,
    remind_template TEXT,
    pass_reset TEXT,
    isadmin BOOLEAN DEFAULT TRUE,
    CHECK (isadmin = TRUE)
); 

-- agency information and auth credentials --
CREATE TABLE organization (
    id SERIAL PRIMARY KEY,
	name VARCHAR(200)  NOT NULL UNIQUE,
    description TEXT,
    website VARCHAR(500),
    logo VARCHAR(500),
    email VARCHAR(200) UNIQUE,
    password VARCHAR(200),
    invited BOOLEAN DEFAULT FALSE,
    isadmin BOOLEAN DEFAULT FALSE,
    CHECK (isadmin = FALSE)
);

-- years award show --
CREATE TABLE year (
    id SERIAL PRIMARY KEY,
    num INT,
    background VARCHAR(200),
    png VARCHAR(200)
);

-- award categories --
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    full_category VARCHAR(200) NOT NULL UNIQUE
); 

-- ads with relations to the category and agency they're tied to --
CREATE TABLE ad (
    id SERIAL PRIMARY KEY,
    name VARCHAR(300) NOT NULL,
    advertiser VARCHAR(200),
    award VARCHAR(10),
    organization_id INT,
    category_id INT,
    year_id INT
); 

-- links to media files for a related ad --
CREATE TABLE media (
    id SERIAL PRIMARY KEY,
    type INT,
    url VARCHAR(500),
    ad_id INT
); 

-- people credited for producing a certain ad --
CREATE TABLE credit (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    name VARCHAR(200) NOT NULL,
    ad_id INT NOT NULL
); 

-- social media platform information --
CREATE TABLE social_media_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    logo VARCHAR(300) NOT NULL
); 

-- social media links for agency profiles and the related social_media_type --
CREATE TABLE social_media (
    id SERIAL PRIMARY KEY,
    url VARCHAR(300) NOT NULL,
    organization_id INT NOT NULL,
    social_media_type_id INT NOT NULL

);

-- ** Add Foreign Key Constraints
-- ad foreign keys
ALTER TABLE ad
    ADD CONSTRAINT organization_fk
        FOREIGN KEY (organization_id)
        REFERENCES organization (id),
    ADD CONSTRAINT category_fk
        FOREIGN KEY (category_id)
        REFERENCES category (id),
    ADD CONSTRAINT year_fk
        FOREIGN KEY (year_id)
        REFERENCES year (id);

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
        ON DELETE CASCADE,
    ADD CONSTRAINT social_media_type_fk
        FOREIGN KEY (social_media_type_id)
        REFERENCES social_media_type (id)
        ON DELETE CASCADE;

-- ** Insert Mock Data ** --
-- *** ALL PASSWORDS: a *** --

-- admin --
-- email: admin@gmail.com --
INSERT INTO admin (email, password)
    VALUES ('admin@gmail.com', '$2a$10$8eXkBQUGwQo8CFt4LgYRQ.4nHFnpR96xaVHHyBKj6GtGSKDU/QOjO');
-- mailer account | theshowbookmn@gmail.com  -- 
INSERT INTO admin (email, password, ismailer, invite_template, remind_template, pass_reset)
    VALUES ('theshowbookmn@gmail.com', 
        '$2a$10$n9vs7Yhn55fMrDyaf0Z.gODx.NcvZoEmwIJg8mwt5BwQN4kSNGQ9.',
        true,
        'Hello, please follow the link below to create a username and password for your organization.',
        'Hello, we noticed your account is still not setup yet. Please follow the link below to create a username and password.',
        'Hello, please follow the below link and enter in the provided temporary password.'
     );



-- social media types --
INSERT INTO social_media_type (name, logo)
    VALUES
        ('facebook', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/F_icon.svg/1000px-F_icon.svg.png'),
        ('twitter', 'https://tooagile-wpengine.netdna-ssl.com/wp-content/uploads/2015/12/Twitter.png'),
        ('linkedIn', 'http://www.copyblogger.com/cdn-origin/images/linkedin.png'),
        ('instagram', 'https://instagram-brand.com/wp-content/themes/ig-branding/assets/images/ig-logo-email.png');

-- years --
INSERT INTO year (num, background, png)
    VALUES (
        2017,
        'http://2017book.theshowmn.org/_a/images/flannel.png',
        'http://2017book.theshowmn.org/_a/images/logo-2017.png'
    );

-- Organizations --
-- organization #1: active --
INSERT INTO organization (name, description, website, logo, email, password, invited)
    VALUES (
        'BBDO',
        'In 1891, a small agency named Batten Company opened in a single room on Park Row in New York City. In subsequent years, it thrived, and in 1928, merged with Barton, Durstine and Osborn. Thus, BBDO was born.',
        'www.bbdo.com',
        'https://www.bbdo.com/assets/images/BBDO_logo_white.svg',
        'bbdo@gmail.com',
        '$2a$10$8eXkBQUGwQo8CFt4LgYRQ.4nHFnpR96xaVHHyBKj6GtGSKDU/QOjO',
        true
    );

INSERT INTO social_media (organization_id, social_media_type_id, url)
    VALUES
        (1, 1, 'https://www.facebook.com/bbdoworldwide'),
        (1, 2, 'https://twitter.com/bbdoworldwide'),
        (1, 3, 'https://www.linkedin.com/company/bbdo');

-- category #1
INSERT INTO category (full_category)
    VALUES('Consumer Website');

-- ad #1
INSERT INTO ad (year_id, organization_id, category_id, name, award, advertiser)
    VALUES(1, 1, 1, 'The Black Market', 'Gold', 'Hormel Foods-Black Label Bacon');

INSERT INTO media (ad_id, type, url)
    VALUES (1, 0, 'http://2017book.theshowmn.org/winners/37A%20-191173-08-AFM/The%20Black%20Market-01.jpg');

INSERT INTO credit (ad_id, title, name)
    VALUES
        (1, 'Art Director', 'Shannon Murphy'),
        (1, 'Copywriter', 'David Mackereth'),
        (1, 'Executive Creative Director', 'Noel Haan'),
        (1, 'Associate Creative Director', 'Allison Brink'),
        (1, 'Associate Creative Directo', 'David Mackereth'),
        (1, 'Technical Lead', 'Justin Mueller'),
        (1, 'Sr Digital Producer', 'Andrew Peterson'),
        (1, 'Design/Development', 'Haus'),
        (1, 'Account Director', 'Scott Schraufnagel');

-- category #2
INSERT INTO category (full_category)
    VALUES('Copywriting');

-- ad #2
INSERT INTO ad (year_id, organization_id, category_id, name, award, advertiser)
    VALUES(1, 1, 2, 'Cave', 'Silver', 'Hormel Foods-Black Label Bacon');

INSERT INTO media (ad_id, type, url)
    VALUES (2, 1, 'http://2017book.theshowmn.org/winners/79-194612-08-AFM/Cave-01(1)_converted.mp4');

INSERT INTO credit (ad_id, title, name)
    VALUES
        (2, 'Art Director', 'Shannon Murphy'),
        (2, 'Copywriter', 'David Mackereth'),
        (2, 'Executive Creative Directo', 'Noel Haan'),
        (2, 'Associate Creative Director', 'Allison Brink'),
        (2, 'Associate Creative Director', 'David Mackereth'),
        (2, 'Agency Producer', 'Bill Smallcombe'),
        (2, 'Editorial', 'Ditch'),
        (2, 'Editor', 'Brody Howard'),
        (2, 'Production Company', 'BBDO Minneapolis'),
        (2, 'Director of Photography', 'Alex Horner');

-- category #3
INSERT INTO category (full_category)
    VALUES('Poster Campaign');

-- ad #3
INSERT INTO ad (year_id, organization_id, category_id, name, award, advertiser)
    VALUES(1, 1, 3, 'SPAMERICAN Tour-Thank You', 'Bronze', 'Hormel Foods-SPAM');

INSERT INTO media (ad_id, type, url)
    VALUES
        (3, 0, 'http://2017book.theshowmn.org/thumbnails/27B-194764-08-AFM/SPAMERICAN%20Tour-Thank%20You-02.jpg'),
        (3, 0, 'http://2017book.theshowmn.org/thumbnails/27B-194764-08-AFM/SPAMERICAN%20Tour-Thank%20You-03.jpg'),
        (3, 0, 'http://2017book.theshowmn.org/thumbnails/27B-194764-08-AFM/SPAMERICAN%20Tour-Thank%20You-04.jpg');

INSERT INTO credit (ad_id, title, name)
    VALUES
        (3, 'Art Director', 'Chris Corum'),
        (3, 'Copywriter', 'David Mackereth'),
        (3, 'Creative Director', 'Tim Brunelle'),
        (3, 'Executive Creative Director', 'Noel Haan'),
        (3, 'Art Production Manager', 'Pamala Saturn');


-- organization #2: inactive --
INSERT INTO organization (name)
    VALUES ('5IVE');

-- ad #4
INSERT INTO ad (year_id,organization_id, category_id, name, award, advertiser)
    VALUES(1, 2, 2, 'Virgin Islands Craft Distillers', 'Bronze', 'Virgin Islands Craft Distillers');

INSERT INTO media (ad_id, type, url)
    VALUES (4, 0, 'http://2017book.theshowmn.org/thumbnails/79-207526-08-AFM/Virgin%20Islands%20Craft%20Distillers-01.jpg');

INSERT INTO credit (ad_id, title, name)
    VALUES
        (4, 'Creative Directo', 'Boriana Strzok'),
        (4, 'Writer', 'Mike Borell'),
        (4, 'Designer', 'Andi Jordt');

-- category #4
INSERT INTO category (full_category)
    VALUES('Packaging');

-- ad #5
INSERT INTO ad (year_id, organization_id, category_id, name, award, advertiser)
    VALUES(1, 2, 4, 'Minnesota 13', 'Gold', '11 Wells Spirits');

INSERT INTO media (ad_id, type, url)
    VALUES (5, 0, 'http://2017book.theshowmn.org/thumbnails/02A-205543-08-AFM/Minnesota%2013-01.jpg');

INSERT INTO credit (ad_id, title, name)
    VALUES
        (5, 'Creative Director & Designer', 'Boriana Strzok'),
        (5, 'Illustrator', 'Jared Tuttle'),
        (5, 'Writer', 'Mike Borell');


-- organization #3:  --
INSERT INTO organization (name, email)
    VALUES (
        'KNOCK Inc.',
        'knock@gmail.com'
    );

-- ad #6
INSERT INTO ad (year_id, organization_id, category_id, name, award, advertiser)
    VALUES(1, 3, 1, 'LaMarca Website', 'Bronze', 'LaMarca');

INSERT INTO media (ad_id, type, url)
    VALUES (6, 0, 'http://2017book.theshowmn.org/thumbnails/37A%20-206548-08-AFM/LaMarca%20Website-01.jpg');

INSERT INTO credit (ad_id, title, name)
    VALUES
        (6, 'Creative Director', 'Todd Paulson'),
        (6, 'VP Creative Director', 'Dan Weston'),
        (6, 'Copywriter', 'Mary Lou Hidalgo'),
        (6, 'Design Director', 'Jillian Frey'),
        (6, 'Interactive Art Director', 'Bryan Pieper'),
        (6, 'Photographer', 'Liz Von Hoene'),
        (6, 'Interactive Developer', 'Kobby Appiah'),
        (6, 'Senior Director of Video', 'Dallas Currie');

-- category #5
INSERT INTO category (full_category)
    VALUES('Video Editing');

-- ad #7
INSERT INTO ad (year_id, organization_id, category_id, name, award, advertiser)
    VALUES(1, 3, 5, 'Minnesota RollerGirls All Sta', 'Silver', 'Minnesota RollerGirls');

INSERT INTO media (ad_id, type, url)
    VALUES (7, 1, 'http://2017book.theshowmn.org/winners/87-206643-08-AFM/Minnesota%20RollerGirls%20All%20Star-01_converted.mp4');

INSERT INTO credit (ad_id, title, name)
    VALUES
        (7, 'Creative Director', 'Todd Paulson'),
        (7, 'VP Creative Director', 'Dan Weston'),
        (7, 'Senior Director of Video', 'Dallas Currie');

-- category #6
INSERT INTO category (full_category)
    VALUES('Logo Design');

-- ad #8
INSERT INTO ad (year_id, organization_id, category_id, name, award, advertiser)
    VALUES(1, 3, 6, 'Kinderberry Hill: Logo', 'Bronze', 'Kinderberry Hill Child Development Centers');

INSERT INTO media (ad_id, type, url)
    VALUES (8, 0, 'http://2017book.theshowmn.org/thumbnails/80-214538-08-AFM/Kinderberry%20Hill-%20Logo-01.jpg');

INSERT INTO credit (ad_id, title, name)
    VALUES
        (8, 'Creative Director', 'Sara Nelson'),
        (8, 'Designer', 'Jillian Frey'),
        (8, 'Designer, Illustrator', 'Alison Swan'),
        (8, 'Interactive Designer', 'Annika Orne'),
        (8, 'Illustrator', 'Ashley Mary');


-- organization #4: invited --
INSERT INTO organization (name, email, invited)
    VALUES (
        'Drive Thru Productions',
        'drivethruproductions@gmail.com',
        true
    );

-- ad #9
INSERT INTO ad (year_id, organization_id, category_id, name, award, advertiser)
    VALUES(1, 4, 5, 'Subaru Dogs - MY16-Puppy/LG/:60', 'Silver', 'Subaru');

INSERT INTO media (ad_id, type, url)
    VALUES (9, 1, 'http://2017book.theshowmn.org/winners/87-214855-08-AFM/Subaru%20Dogs%20-%20MY16-Puppy-LG--60-01(1)_converted.mp4');

INSERT INTO credit (ad_id, title, name)
    VALUES
        (9, 'Senior Creative Edito', 'Mick Uzendoski'),
        (9, 'Executive Producer', 'Beth Wilson'),
        (9, 'Senior Colorist', 'Sean Coleman'),
        (9, 'Online Artist', 'Derek Johnson'),
        (9, 'Production Company', 'Skunk'),
        (9, 'Director', 'Brian Lee Hughes'),
        (9, 'Director of Photography', 'Jason McCormick'),
        (9, 'Agency', 'Carmichael Lynch'),
        (9, 'Creative Director', 'Michael Rogers'),
        (9, 'Agency Producer', 'Brynn Hausmann'),
        (9, 'Copy Writer', 'Nick Hart');

-- category #7
INSERT INTO category (full_category)
    VALUES(' Animation, Special Effects or Motion Graphics');

-- ad #10
INSERT INTO ad (year_id, organization_id, category_id, name, award, advertiser)
    VALUES(1, 4, 7, 'Rapala Sky Bass', 'Bronze', 'Rapala VMC Corporation');

INSERT INTO media (ad_id, type, url)
    VALUES (10, 1, 'http://2017book.theshowmn.org/winners/86-214838-08-AFM/Rapala%20Sky%20Bass-01_converted.mp4');

INSERT INTO credit (ad_id, title, name)
    VALUES
        (10, 'Senior Broadcast and Motion Designer / Flame / VFX Artist', 'Randy Gackstetter'),
        (10, 'Flame / VFX Assistant', 'Aaron Esterling'),
        (10, 'Motion Designer / CG Artist', 'Ben Leisen'),
        (10, 'Executive Producer', 'Beth Wilson'),
        (10, 'Senior Creative Editor', 'Mick Uzendoski'),
        (10, 'Agency', 'Pocket Hercules'),
        (10, 'Chief Creative Officer / Writer', 'Jack Supple'),
        (10, 'Senior Writer', 'Ryan Burk'),
        (10, 'Art Director', 'Chue Yang'),
        (10, 'Agency Producer', 'Lisa Norman'),
        (10, 'Flame/Online Artist', 'Derek Johnson');


-- organization #5: alicia's bull it  --
-- this gmail account can be used to test the redirect link --
INSERT INTO organization (name, email, invited)
    VALUES (
        'Bull It',
        'agency.test.theshow@gmail.com',
        true
    );

-- organization #6: demo --
INSERT INTO organization (name, email, invited)
    VALUES (
        'S.S. Hax',
        'sshax@gmail.com',
        true
    );

-- category #8
INSERT INTO category (full_category)
    VALUES('Website');

-- ad #11
INSERT INTO ad (year_id, organization_id, category_id, name, award, advertiser)
    VALUES(1, 7, 8, 'BeenThere', 'Gold', 'Travel');

INSERT INTO media (ad_id, type, url)
    VALUES
    (11, 1, './assets/images/landing.jpeg'),
    (11, 1, './assets/images/profile.jpeg');


INSERT INTO credit (ad_id, title, name)
    VALUES
        (11, 'Creative Directory', 'Xiong Vang');

-- INSERT INTO category (full_category)
--     VALUES('');

-- INSERT INTO ad (year_id, organization_id, category_id, name, award, advertiser)
--     VALUES(1, 1, 1, '', '', '');

-- INSERT INTO media (ad_id, type, url)
--     VALUES (1, 0, '');

-- INSERT INTO credit (ad_id, title, name)
--     VALUES
--         (1, '', ''),
--         (1, '', ''),
--         (1, '', ''),
--         (1, '', ''),
--         (1, '', ''),
--         (1, '', ''),
--         (1, '', ''),
--         (1, '', ''),
--         (1, '', ''),
--         (1, '', ''),
--         (1, '', ''),
--         (1, '', '');


