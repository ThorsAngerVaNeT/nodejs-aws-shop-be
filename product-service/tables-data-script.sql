create extension if not exists "uuid-ossp";

create table products (
	id uuid primary key default uuid_generate_v4(),
	title text not null,		
	description text null,
	price int null,
	"last" varchar not null,
	sole varchar not null,
	image_url varchar null
);

insert into products (id, title, description, price, "last", sole, image_url) values
('b94b2ae4-b3de-4f56-b773-0483ffb42031', 'Taft The Jack Shoe in London', 'Meet the Jack Shoe in London...a bold take on our signature product. This shoe is comfortable, built to last, and guaranteed to get compliments. The sole unit is leather with rubber inserts for added grip, durability, and comfort. This is a versatile shoe, ranging from formal attire to casual wear. We spared no expense on this shoe and the comfort and quality will show from the moment you put them on.\n\nUPPER: Italian cotton\nTOE CAP: Italian full-grain calf skin\nCOUNTER: Italian full-grain calf skin\nOUTSOLE: Leather sole with rubber inserts\nStandard D Width\nBlake Construction (resoleable)', '275', '', 'Leather sole with rubber inserts', 'https://d1wh94yq5jmkrj.cloudfront.net/b94b2ae4-b3de-4f56-b773-0483ffb42031/01.jpg'),
('ce80facb-9804-489b-9b9a-b3a1045df2bd', 'Carlos Santos 9517 in Light Brown Suede', '401 Last\nMade in Portugal\nGoodyear Welted Construction\nLeather Sole \nLeather Lining', '325', 'Z401', 'Leather Sole', 'https://d1wh94yq5jmkrj.cloudfront.net/ce80facb-9804-489b-9b9a-b3a1045df2bd/01.jpg'),
('fec85c80-b81e-4eef-8e59-83b3362c1497', 'Shoepassion No. 6714 Oxford Boots', 'Goodyear welted and handcrafted, this Oxford boot stands out from the crowd with its elaborate design and filigree perforations. An exciting hand finish immerses the shaft in a unique interplay of colors. The robust Dainite rubber outsole ensures stability.', '465', 'Classic', 'Dainite Rubber Sole', 'https://d1wh94yq5jmkrj.cloudfront.net/fec85c80-b81e-4eef-8e59-83b3362c1497/01.jpg'),
('27f6f2da-0dd4-4b90-8fd3-110db683076e', 'Carmina Work Boots Rain', 'Captoe work boots in brown vegano calf and brown karangrein. Featuring a Dainite rubber sole. With a refined Goodyear welt-construction. For this style we choose the best-seller Rain last. Subtly squared-off toe and regular fitting both in the instep and toe area.', '440', 'Rain', 'Dainite Rubber Sole', 'https://d1wh94yq5jmkrj.cloudfront.net/27f6f2da-0dd4-4b90-8fd3-110db683076e/01.jpg'),
('2265bc45-c093-4524-89fd-5134b4ff1d1c', 'Herring Grays rubber-soledChukka boots in Ginger Suede', 'Herring Grays is a simpe but elegant chukka boot style with a Goodyear welted rubber stud sole. This colour comes with an extra pair of red laces to complement the red sole.', '196', 'City Boot', 'Dainite Rubber Sole', 'https://d1wh94yq5jmkrj.cloudfront.net/2265bc45-c093-4524-89fd-5134b4ff1d1c/01.jpg'),
('84688c05-9198-491e-b0fd-859d81aa2ce3', 'Sons of Henrey Field Boot in Black Utah', 'The Sons of Henrey Field Boot is a must have this Fall, as if is a casual boot that at the same time exudes class and elegance. \n\nGoodyear welted in Almansa, Spain by a factory with over a century of experience. The Goodyear welt enables the shoe to be resoled. The leather board heel stiffeners and cork footbed will mould to the foot and guarantee superior comfort.', '353', 'Elegant Round', 'Ridgeway Rubber Sole', 'https://d1wh94yq5jmkrj.cloudfront.net/84688c05-9198-491e-b0fd-859d81aa2ce3/01.jpg'),
('cb52ad4f-b0a6-4f5e-bfc7-4f3f56f58554', 'Carmina Chelsea Boots 80216 in Brown Museum', 'Chelsea boot in brown museum. Finished with a leather sole in a refined goodyear welt construction and full calf lining.This shoe, like all the other Carmina´s, is carefully manufactured by expert craftsmen who follow the exact same techniques that Charles Goodyear created in 1869.Style made on the chiseled and sleek Simpson last. One of the all time favorites. Known for its semi-squared tip and long and narrow appearance. Simpson is one of our narrowest last, therefore, we recommend to upload half size on this last. In case of any doubts, pleaso contact our team for advise on fitting and size.', '413', 'Simpson', 'Leather Sole', 'https://d1wh94yq5jmkrj.cloudfront.net/cb52ad4f-b0a6-4f5e-bfc7-4f3f56f58554/01.jpg'),
('bc53efe2-1032-4464-ba56-b1a29c541809', 'Sons of Henrey George SpTD in Chestnut Jamaica Kudu', 'The iconic split toe derby, with its beautiful, fine stitched edge along the vamp and at the toe, will make you feel perfectly at ease both in a casual and business setting. Made from Chestnut Jamaica Kudu leather with a single leather sole, these shoes will quickly become one of your favourite pair of shoes. Made on the Contemporary Almond last, specifically designed for this model.', '343', 'Contemporary Almond', 'Leather Sole', 'https://d1wh94yq5jmkrj.cloudfront.net/bc53efe2-1032-4464-ba56-b1a29c541809/01.jpg'),
('7d386117-e576-4896-adf2-08c027e2ec15', 'TLB Mallorca Artista Black Chelsea Boots', 'Specially wholecut Chelsea boot made in Vegano Leather using French Calf from Anonnay tannery in brown color, calf lining with vegetable tanned leather insoles finished with our CITY sole.\n\nFor this model, we chose our last PICASSO with width F. A lightly squared toe, very elegant and extremely comfortable. A great pairing for both formal and casual outfits.\n\nMade with the Goodyear Welted technique in our own factory in Inca, Mallorca. Following traditional techniques by very skillful artisans. This manufacturing process, of more than 150 steps, consists of a double stitching to join the leather, the insole and the sole providing a level of durability far superior to other conventional shoe. This type of construction, also provides extraordinary comfort and insulation thanks to the natural cork layer, placed under the insole which allows to be molded and acquiring the anatomy of each foot.\n\nOur shoes are made to last and to just get better looking and more comfortable over the time.', '439', 'Picasso', 'City Rubber Sole', 'https://d1wh94yq5jmkrj.cloudfront.net/7d386117-e576-4896-adf2-08c027e2ec15/01.jpg'),
('ae1e4a57-2c31-413f-8f36-3cc159897448', 'Vass Budapest Alt English II * F', 'A little something else… Dynamic lines, elegant look, a more decorative version of the traditional cap toe Oxford that makes your outfit special and stands you out from the crowd.\nThe seam runs down and back up the side of the quarter.\nThis model perfectly works for both smart and casual looks.\n\nManufactured with the traditional hand-welted method. Completely handmade.', '445', 'F', 'JR Leather Sole', 'https://d1wh94yq5jmkrj.cloudfront.net/ae1e4a57-2c31-413f-8f36-3cc159897448/01.jpg');

create table stocks (
	id uuid primary key default uuid_generate_v4(),
	product_id uuid not null,
	"count" int not null,
	foreign key ("product_id") references "products"("id") on delete cascade,
	constraint product_id_uniq unique (product_id)
);

insert into stocks (product_id, count) values
('b94b2ae4-b3de-4f56-b773-0483ffb42031', '4'),
('ce80facb-9804-489b-9b9a-b3a1045df2bd', '6'),
('fec85c80-b81e-4eef-8e59-83b3362c1497', '7'),
('27f6f2da-0dd4-4b90-8fd3-110db683076e', '12'),
('2265bc45-c093-4524-89fd-5134b4ff1d1c', '7'),
('84688c05-9198-491e-b0fd-859d81aa2ce3', '8'),
('cb52ad4f-b0a6-4f5e-bfc7-4f3f56f58554', '2'),
('bc53efe2-1032-4464-ba56-b1a29c541809', '3'),
('7d386117-e576-4896-adf2-08c027e2ec15', '5'),
('ae1e4a57-2c31-413f-8f36-3cc159897448', '4');
