// State
let items = [];
const csvUrl = 'Item List.csv';

// Fallback data for local file access (file://) where CORS blocks reading external files
// Sourced from Item List.csv
const FALLBACK_CSV = `
Item Title,Description,Unit Size,Number Sold,Quantity,Unit Price,Deposit Price,Price/Lb,Min Weight,Max Weight,Shipping Enabled,Shipping Weight,Pricing Sheet,Category,Farm Responsible,Schedule
12-pack Sourdough Cookies,12-pack Sourdough Cookies,12-pack,44,-40,24,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F18],Retail
A2A2 Cow Milk Kefir,A2A2 Cow Milk Kefir,Pint,36,-35,12,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Apple Cinnamon Goat Milk Soap,Apple Cinnamon Goat Milk Soap,Bar,2,13,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Bagels - Sourdough - 4 pack,Bagels - Sourdough - 4 pack,4 Pack,14,-11,10,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F7],Retail
Beef - 10-pack Ground bundle,Beef - 10-pack Ground bundle,10 Pounds,8,2,100,-,,-,-,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Back Ribs,Beef - Back Ribs,2-3 LBS,3,-,-,12,10,2,3,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - BBQ Ribs,Beef - BBQ Ribs,3-4.25 LB,6,-,-,14,15,3,4.25,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Bones,Beef - Bones,2-4 LBS,5,-1,-,10,8,2,4,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Bottom Round Roast  Rump Roast ,Beef - Bottom Round Roast  Rump Roast ,2-3 LB,5,-1,-,20,20,2,3,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Bottom Round Steak,Beef - Bottom Round Steak,0.4 - 0.75 LB,33,-13,-,7,15,0.4,0.75,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Brisket,#NAME?,1.5-6.75 lb,3,-1,-,12,15,1.5,6.75,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Chuck Roast,#NAME?,0.9-6.5 lb,8,-3,-,9,16,0.9,6.5,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Eye Round,#NAME?,0.7-2.25 lb,-,1,-,7.5,20,0.7,2.25,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Filet Mignon,"--- Filet Mignon is a delicate steak cut of beef from the tenderloin  back of a beef . It is an extremely tender and elegant cut with a melt-in-your-mouth texture. Enjoy the ""King of Steaks""!",0.2-0.8 lb,15,-3,-,3,42,0.2,0.8,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Flank Steak,--- Flank Steak is a lean steak that is perfect for grilling  roasting  or broiling!,0.35-2 lb,-,4,-,5,24,0.35,2,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Flanken Ribs - Korean Style  labeled Flaken ,Beef - Flanken Ribs - Korean Style,1.5-2.5 LBS,2,1,-,10,15,1.5,2.5,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Flat Iron,#NAME?,0.3-1.5 lb,1,4,-,3.5,24,0.3,1.5,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Ground / Hamburger,Enjoy delicious minced beef in your next meal or make the best burgers around. Quick  easy  and versatile!,0.75-1.25 LB,43,208,-,7,12,0.75,1.25,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Ground Brisket,Beef - Ground Brisket,0.75-1.75 lb,21,14,-,5,13,0.75,1.75,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Ground with Organ Meat,Beef - Ground with Organ Meat,0.75-1.25 LB,45,40,-,7,13,0.75,1.25,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Hanger Steak  Hanging Tender ,Beef - Hanger Steak  Haning Tender ,0.75-1.5 lb,-,2,-,13,25,0.75,1.5,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Heart,#NAME?,2-3.5 lb,1,2,-,10,11,2,3.5,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Knuckle Bones,Beef - Knuckle Bones,0.45-1.75 lb,13,3,-,1.5,10,0.45,1.75,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Liver,--- Plentiful in protein and iron  the Beef Liver has a rich flavor. Great to pan-fry!,0.75-3 lb,5,5,-,2.5,15,0.75,3,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - London Broil,#NAME?,1.4-4.25 lb,4,1,-,14,13,1.4,4.25,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Marrow Bones,#NAME?,1-2 lb,3,3,-,2,12,1,2,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - NY Strip Steak,Beef - NY Strip Steak/Beef Loin Strip Steak,0.3-1.25 lb,-,10,-,7,35,0.3,1.25,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Osso Buco/Beef Shank,#NAME?,0.3-2.5 lb,6,4,-,3,15,0.3,2.5,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Ox Tail,#NAME?,0.75-1.75 lb,1,1,-,8,18,0.75,1.75,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Patties - 4 pack,Beef - Patties - 4 pack,0.85-1.25 LB,20,10,-,7,13,0.85,1.25,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Rendered Tallow - Quart,Rendered Tallow - Quart. Rendered at a USDA faciility.,Quart,6,24,35,-,,-,-,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Ribeye Steak,--- A perfect prime steak with a buttery taste and marbling. A tender cut that is great to grill for the best sear!,0.6-3 lb,9,11,-,12,35,0.6,3,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Short Ribs,Beef - Short Ribs,1.2-4.5 lb,9,6,-,5,15,1.2,4.5,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Shoulder Roast  Shoulder Pot Roast ,Beef - Shoulder Roast  Shoulder Pot Roast The Shoulder Roast is a very tender and lean cut from the shoulder of a cow. Rich in flavor and can be cubed  stewed  braised  or used in a pot roast. ,1-6 lb,7,-3,-,10,18,1,6,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Sirloin Beef Roast,Beef - Sirloin Beef Roast,2.5-3.5 LB,13,-6,-,30,17,2.5,3.5,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Sirloin Steak,#NAME?,0.45-4.1 lb,13,9,-,5,24,0.45,4.1,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Sirloin Tip Roast,#NAME?,2-4 lb,5,-3,-,25,17,2,4,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Skirt Steak,--- Skirt steaks are great marinated and grilled. Slice it thin against the grain and serve over some cilantro rice or tacos- or both!,0.2-3.0 lb,5,-,-,3,25,0.2,3,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Soup Bones,--- Beef Soup Bones are ideal for a flavorful stock or soup. It adds richness and is highly nutritious! ,1-4 lb,6,-2,-,2,8,1,4,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Stew meat,Beef - Stew meat,0.75-1.25 lb,11,19,-,6,15,0.75,1.25,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Tongue,--- Beef Tongue  or Lengua  is a key ingredient in many national cuisines  Beef Tongue can be boiled  pickled  roasted  or braised for a chewy  nutritious meal!,1-4 lb,1,-,-,6,12,1,4,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef - Tri Tip,--- This triangular cut from the sirloin is very juicy and flavorful. Rub it with seasoning and place on the grill!,1.5-3 lb,1,-,-,6,22,1,2.5,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef and Pork Sampler Bundle  12 lbs ,A versatile introduction to our pasture-raised beef and pork  perfect for customers who want variety without committing to a full freezer load. This sampler includes a balanced mix of beef and pork cuts selected based on seasonal availability and what’s cutting best at the time.Expect a rotating assortment of steaks  roasts  ground  chops  and sausages — designed to give you multiple meals and a true taste of what we raise. Exact cuts will vary  but every box is thoughtfully packed for quality  value  and everyday cooking.Great for couples  smaller households  or first-time customers looking to explore both beef and pork.,Bundle,-,2,160,-,,-,-,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef Bundle Large Family Pack  20 lbs ,Ideal for larger households or anyone looking to stock the freezer. This box features a hearty mix of ground beef  roasts  and versatile family-friendly cuts selected for everyday cooking and long-lasting value.Exact cuts vary with the season  but you’ll always receive a well-balanced box totaling approximately 20 pounds of our farm-raised beef.,Bundle,-,2,350,-,,-,-,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef Bundle Medium Family Pack  15 lbs ,A customer favorite for feeding a family. This box includes a generous mix of ground beef  slow-cook favorites  and a few nicer cuts for weeknight meals and weekend dinners alike.Cuts vary based on availability  but every box is carefully packed to deliver balanced variety  great value  and approximately 15 pounds of our locally raised beef.,Bundle,-,2,250,-,,-,-,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Beef Sampler Bundle  10 lbs ,New to our beef? This is the place to start. Each sampler box features a hand-selected mix of ground beef and farm-favorite cuts  chosen for flavor  versatility  and value.Exact cuts vary with the season  but you’ll always receive a well-balanced box totaling approximately 10 pounds of our locally raised beef.,Bundle,1,1,140,-,,-,-,FALSE,-,Retail,Beef,Fuster Cluck Farm,Retail
Blueberry Bovre Cow Cheese,Blueberry Bovre Cow Cheese,8 oz,7,-,12,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Blueberry Jam,Blueberry Jam,Half Pint,8,-1,15,-,,-,-,FALSE,-,Retail,Fruit,Old Glory Farm [P80],Retail
Book - 11 Dietary Principles,Book - 11 Dietary Principles,Each,7,1,10,-,,-,-,FALSE,-,Private,Non-Food Items,Fuster Cluck Farm,Retail
Book - Healthy 4 Life,Book - Healthy 4 Life,Each,4,4,10,-,,-,-,FALSE,-,Private,Non-Food Items,Fuster Cluck Farm,Retail
Book - Nourishing Traditions,Book - Nourishing Traditions,Each,6,2,27,-,,-,-,FALSE,-,Retail,Non-Food Items,Fuster Cluck Farm,Retail
Book - Nourishing Traditions Book of Baby & Child Care,Book - Nourishing Traditions Book of Baby & Child Care,Each,4,10,27,-,,-,-,FALSE,-,Retail,Non-Food Items,Fuster Cluck Farm,Retail
Book - Nourishing Traditions Cookbook for Children,Book - Nourishing Traditions Cookbook for Children,Each,5,11,27,-,,-,-,FALSE,-,Retail,Non-Food Items,Fuster Cluck Farm,Retail
Bovre - Everything Bagel Cow Cheese,Bovre - Everything Bagel Cow Cheese,1/2 Pound,23,-23,12,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Bovre - French Onion Cow Cheese,Bovre - French Onion Cow Cheese,8 oz.,26,-26,12,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Bovre with Pepper Jelly Cheese,Bovre with Pepper Jelly Cheese,8 oz,14,-11,16,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Bread - Sliced Sourdough Sandwich,Bread - Sliced Sourdough Sandwich,Loaf,423,-421,15,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F10],Retail
Bread - Sourdough Crusty Country,Bread - Sourdough Crusty Country,Loaf,606,-602,15,-,,-,-,FALSE,-,Private,Pantry,Sourdough Haven Bread and Bakery [F10],Retail
Bread - Sweet Sourdough Loaf,Bread - Sweet Sourdough Loaf,Loaf,42,-42,15,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F10],Retail
Breakfast Bundle,Everything you need for a hearty  farm-style breakfast in one easy bundle. This box brings together some of our most popular pantry and freezer staples  making it perfect for slow mornings  family breakfasts  or stocking up for the week.Every Breakfast Bundle includes farm-fresh eggs and a rotating selection of breakfast favorites such as pork sausage  pancake mix  maple syrup  coffee  honey  and stone-ground grits. Specific flavors and package sizes may vary based on availability  but each bundle is thoughtfully packed to deliver quality  convenience  and classic comfort.Ideal for families  weekend brunch lovers  or anyone who wants to start the day with real food from the farm.Contents may vary based on availability. Eggs are included in every bundle.,Bundle,-,2,85,-,,-,-,FALSE,-,Retail,Dairy & Eggs,Fuster Cluck Farm,Retail
Butter - Salted - Simply Natural Creamery,Butter - Salted - Simply Natural Creamery,1 LB,23,-11,14,-,,-,-,FALSE,-,Retail,Dairy & Eggs,Simply Natural Creamery,Retail
Cajeta Caramel Sauce Nigerian Dwarf Goat Milk Cheese,Cajeta Caramel Sauce Nigerian Dwarf Goat Milk Cheese,8 oz.,19,-19,14,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Candied Cinnamon Pecans,Candied Cinnamon Pecans,Jar,10,-6,15,-,,-,-,FALSE,-,Private,Pantry,Fuster Cluck Farm [P25],Retail
Chevre - Blueberry Nigerian Goat Cheese,Chevre - Blueberry Nigerian Goat Cheese,1/2 Pound,16,-,14,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Chevre - Everything Bagel Goat Cheese,Chevre - Everything Bagel Goat Cheese,1/2 Pound,26,-22,14,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Chevre - French Onion Nigerian Dwarf Goat Cheese,Chevre - French Onion Nigerian Dwarf Goat Cheese,1/2 Pound,6,-2,14,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Chevre - Garlic-Herb Nigerian Dwarf Goat Cheese,Cajeta Caramel Sauce Nigerian Dwarf Goat Milk Cheese,1/2 Pound,34,-33,14,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Chevre - Honey-Vanilla - Nigerian Dwarf Goat Cheese,Chevre - Honey-Vanilla - Nigerian Dwarf Goat Cheese,1/2 Pound,19,-18,14,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Chevre - Salted Nigerian Dwarf Goat Cheese,Chevre - Salted Nigerian Dwarf Goat Cheese,1/2 Pound,15,-12,14,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Chevre - Spiced Fig Chevre Goat Cheese,Chevre - Spiced Fig Chevre Goat Cheese,1/2 Pound,14,-14,14,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Chevre - Strawberry Goat Cheese,Chevre - Strawberry Goat Cheese,1/2 Pound,4,-,14,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Chevre - Un-salted Nigerian Dwarf Goat Cheese,Chevre - Un-salted Nigerian Goat Dwarf Cheese,1/2 Pound,2,-,14,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Chicken - Boneless Skinless Breast,--- Juicy chicken breasts. These tender cuts are versatile and delicious on the grill  baked  cut up for stir fry or salad  and more!,0.25-1 lb,133,-129,-,4,19,0.25,1,FALSE,-,Retail,Poultry,Fuster Cluck Farm,Retail
Chicken - Feet,#NAME?,0.3-1.5 lb,21,-1,-,1,4,0.3,1.5,FALSE,-,Retail,Poultry,Fuster Cluck Farm,Retail
Chicken - Heads,Chicken - Heads,0.75-1.25 LB,3,7,-,2,4,1.25,1.75,FALSE,-,Retail,Poultry,Fuster Cluck Farm,Retail
Chicken - Hearts,Chicken hearts are high in iron  vitamin B  and zinc. They are easy to pan fry or grill with olive oil and your choice of seasoning.,0.25-0.6 lb,3,-3,-,1,11,0.25,0.6,FALSE,-,Retail,Poultry,Fuster Cluck Farm,Retail
Chicken - Leg Quarters,#NAME?,1-2 lb,17,8,-,6.5,11,1,2,FALSE,-,Retail,Poultry,Fuster Cluck Farm,Retail
Chicken - Livers,Chicken livers are packed full of nutrients. Pan fry  grill  or make delicious pÃ¢tÃ©.,1-2 lb,-,-,-,4,10,1,2,FALSE,-,Retail,Poultry,Fuster Cluck Farm,Retail
Chicken - Necks,Chicken - Necks,1-2 Lbs,21,7,-,1.5,4,1,2,FALSE,-,Retail,Poultry,Fuster Cluck Farm,Retail
Chicken - Spatchcock,Chicken - Spatchcock,2.5-5 lb,5,-1,-,19,10,2.5,6,FALSE,-,Retail,Poultry,Fuster Cluck Farm,Retail
Chicken - Stock Kit,Chicken - Stock Kit - make your own chicken stock / broth!,Pound,2,-,-,0.75,4,0.5,2.25,FALSE,-,Retail,Poultry,Fuster Cluck Farm,Retail
Chicken - Tenderloin  Tenders ,#NAME?,0.25-1.5 LB,5,-5,-,8,19,0.25,1.5,FALSE,-,Retail,Poultry,Fuster Cluck Farm,Retail
Chicken - Thighes - Bone In,#NAME?,1-2 lb,12,-12,-,4,12,1,2,FALSE,-,Retail,Poultry,Fuster Cluck Farm,Retail
Chicken - Whole,#NAME?,2.5-6 lb,9,-2,-,12,9,2.5,6,FALSE,-,Retail,Poultry,Fuster Cluck Farm,Retail
Chicken - Wings,--- Chicken wings are a great crowd pleaser. These finger-licking-good wings are great grilled  fried  or baked. Don't forget the sauce!,1.5-3.5 lb,23,-8,-,10,9,1.5,3.5,FALSE,-,Retail,Poultry,Fuster Cluck Farm,Retail
Chocolate Milk - Simply Natural Creamery,Chocolate Milk - Simply Natural Creamery,Pint,10,-10,5,-,,-,-,FALSE,-,Retail,Dairy & Eggs,Fuster Cluck Farm,Retail
Christmas Jam,Christmas Jam,Jar,43,-39,15,-,,-,-,FALSE,-,Retail,Pantry,Old Glory Farm [P80],Retail
Christmas Splendor Goat Milk Soap,Christmas Splendor Goat Milk Soap,Bar,-,15,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Cinnamon Rolls,Cinnamon Rolls,Container,60,-36,15,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F10],Retail
Cinnamon Tincture,Cinnamon Tincture,2 oz,21,-19,15,-,,-,-,FALSE,-,Private,Pantry,Sunday's Farm [P70],Retail
Cinnamon Tincture,-,2 oz,21,-19,15,-,,-,-,FALSE,-,Retail,Pantry,Sunday's Farm [P70],Retail
Class - Dairy - Butter  Kefir  Cheese,Join us for a fun-filled class! We will learn to make butter  kefir and three types of cheeses: Chevre  Dream Cheese & Feta. This class offers hands-on experience as well as deliciious samples to taste.,Person,-,12,125,-,,-,-,FALSE,-,Retail,Events,Fuster Cluck Farm,Dairy Class
Clean Cotton Goat Milk Soap,Clean Cotton Goat Milk Soap,Bar,12,-5,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Coconut Lime Verbena Goat Milk Soap,Coconut Lime Verbena Goat Milk Soap,Bar,-,-,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Coffee - 12 oz. Roasted,Coffee - 12 oz. Roasted,12 oz,117,-117,16,-,,-,-,FALSE,-,Private,Pantry,Fuster Cluck Farm,Retail
Coffee - 8 oz. Roasted,Coffee - 8 oz. Roasted,8 oz,27,-27,12,-,,-,-,FALSE,-,Private,Pantry,Fuster Cluck Farm,Retail
Coffee - K-Cups,Coffee - K-Cups,12 Cups,2,-,10.5,-,,-,-,FALSE,-,Private,Pantry,Fuster Cluck Farm,Retail
Collins Rub & Seasoning Mix,Collins Rub & Seasoning Mix,Container,2,-,10,-,,-,-,FALSE,-,Retail,Pantry,Sunday's Farm [P70],Retail
Cow Milk Feta,Cow Milk Feta,1/2 Pint,3,-2,16,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Crackers - Rosemary Sourdough,Crackers - Rosemary Sourdough,Package,8,-,12,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F9.6],Retail
Crackers - Sea Salt Sourdough,Crackers - Sea Salt Sourdough,Package,16,-13,12,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F9.6],Retail
Crackers -Cheddar Sourdough,Crackers -Cheddar Sourdough,Package,159,-152,12,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F9.6],Retail
Deodorant - Sundays Farm,Deodorant - Sundays Farm,1 oz.,28,-25,15,-,,-,-,FALSE,-,Private,Non-Food Items,Sunday's Farm [P70],Retail
Dream Cheese  Goat ,Dream Cheese  Goat ,1/2 Pint,48,-39,20,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Dual Double Mushroom Tincture,Dual Double Extraction Shiitake & Oyster Mushroom Tincture,2 oz,9,-7,15,-,,-,-,FALSE,-,Private,Pantry,Sunday's Farm [P70],Retail
Eggs - 12 count  medium  large  extra large ,Fresh eggs from free range Fuster Cluck Farm chickens. You can see and taste the difference! Unwashed.,Dozen,3,2,8,-,,-,-,FALSE,-,Retail,Dairy & Eggs,Fuster Cluck Farm,Retail
Eggs - 12 Count  Subscription ,Eggs - 12 Count  Subscription . This subscription is for one dozen chicken eggs to be picked up at the specified pickup time and location every week. You will automatically be charged 4 days in advance of your scheduled pickup time. You can skip a pickup 6 days in advance. You can cancel your subscription any time.,Dozen,-,5,-,-,,-,-,FALSE,-,Private,Dairy & Eggs,Fuster Cluck Farm,Retail
Eggs - WASHED - 12 count  medium  large  extra large ,Fresh eggs from free range Fuster Cluck Farm chickens. You can see and taste the difference! Washed and Refrigerated,Dozen,5,10,8,-,,-,-,FALSE,-,Retail,Dairy & Eggs,Fuster Cluck Farm,Retail
Elderberry Tincture,Elderberry Tincture,2 oz.,31,-29,15,-,,-,-,FALSE,-,Private,Pantry,Sunday's Farm [P70],Retail
Energy Tea,Energy Tea,Each,5,-1,12,-,,-,-,FALSE,-,Private,Pantry,Old Glory Farm [P80],Retail
English Muffins - Sourdough,English Muffins - Sourdough,4-Pack,371,-371,10,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F5],Retail
Everything Bagel Dip Mix,Everything Bagel Dip Mix,Package,-,-,6,-,,-,-,FALSE,-,Private,Pantry,Sunday's Farm [P70],Retail
Fermented Garlic Honey,Fermented Garlic Honey,Jar,8,-5,20,-,,-,-,FALSE,-,Private,Pantry,Sunday's Farm [P70],Retail
Fiesta Dip Mix,Fiesta Dip Mix,Package,1,-1,6,-,,-,-,FALSE,-,Private,Pantry,Sunday's Farm [P70],Retail
Fiesta Dip Mix,-,Package,1,-1,6,-,,-,-,FALSE,-,Retail,Pantry,Sunday's Farm [P70],Retail
Fig Jam,Fig Jam,Jar,5,-2,15,-,,-,-,FALSE,-,Retail,Pantry,Old Glory Farm [P80],Retail
French Onion Dip Mix,French Onion Dip Mix,Package,1,-1,6,-,,-,-,FALSE,-,Private,Pantry,Sunday's Farm [P70],Retail
Fresh Linen Goat Milk Soap,Fresh Linen Goat Milk Soap,Bar,7,8,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Frozen Corn - Whole 6-pack,Frozen Corn - Whole 6-pack,Package of 6,33,-29,8.5,-,,-,-,FALSE,-,Private,Vegetables,Fuster Cluck Farm,Retail
Gardenia Goat Milk Soap,Gardenia Goat Milk Soap,Bar,3,10,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Garlic Herb Bovre Cow Cheese,Garlic Herb Bovre Cow Cheese,8 oz,1,-,12,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Gift Certificate,Gift Certificate,Dollars,18,-13,1,-,,-,-,FALSE,-,Private,Meat (Other),Fuster Cluck Farm,Retail
Ginger Shot,Ginger Shot,Container,120,-108,8,-,,-,-,FALSE,-,Private,Pantry,Sunday's Farm [P70],Retail
Ginger Tincture,Ginger Tincture,2 oz,15,-13,15,-,,-,-,FALSE,-,Private,Pantry,Sunday's Farm [P70],Retail
Goat Milk Feta Cheese,Goat Milk Feta Cheese,0.3 lb,14,-7,20,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Goat Milk Kefir - Plain,Goat Milk Kefir - Plain,Pint,240,-235,20,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Granola 8 oz,Granola 8 oz,8 oz,7,-3,7,-,,-,-,FALSE,-,Private,Pantry,Fuster Cluck Farm,Retail
Grits - Organic Blue,Grits - Organic Blue,Pound,4,-1,8,-,,-,-,FALSE,-,Retail,Pantry,Fuster Cluck Farm,Retail
Grits - Organic White,Grits - Organic White,Pound,7,1,8,-,,-,-,FALSE,-,Private,Pantry,Fuster Cluck Farm,Retail
Grits - Organic Yellow,Grits - Organic Yellow,Pound,4,-1,8,-,,-,-,FALSE,-,Retail,Pantry,Fuster Cluck Farm,Retail
Half Sourdough Rosemary Focaccia,Half Sourdough Rosemary Focaccia,Half Loaf,4,-,8,-,,-,-,FALSE,-,Private,Bakery,Old Glory Farm [P80],Retail
Hard Lotion,Hard Lotion,Bar,9,-7,6,-,,-,-,FALSE,-,Private,Non-Food Items,Sunday's Farm [P70],Retail
Harvest Spice Goat Milk Soap,Harvest Spice Goat Milk Soap,Bar,6,9,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Heavy Cream - Simply Natural Creamery,Heavy Cream - Simply Natural Creamery,Pint,18,-11,8,-,,-,-,FALSE,-,Private,Dairy & Eggs,Fuster Cluck Farm,Retail
Homemade Marshmallows - Maple,Homemade Marshmallows - Maple,4 Pack,11,-7,15,-,,-,-,FALSE,-,Private,Pantry,Fuster Cluck Farm [P25],Retail
Homemade Marshmallows - Regular,Homemade Marshmallows - Regular,4 Pack,14,-10,15,-,,-,-,FALSE,-,Private,Pantry,Fuster Cluck Farm [P25],Retail
Honey-Vanilla Bovre Cow Cheese,Honey-Vanilla Bovre Cow Cheese,8 oz,11,-,12,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Hot Chocolate Kit,Hot Chocolate Mix with Marshmallows,Each,2,-1,25,-,,-,-,FALSE,-,Private,Pantry,Fuster Cluck Farm [P25],Retail
Hot Chocolate Mix,Hot Chocolate Mix,Jar,18,-12,15,-,,-,-,FALSE,-,Private,Pantry,Fuster Cluck Farm [P25],Retail
Ice Cream - Vollmer Farm,Ice Cream - Vollmer Farm,1/2 Pint,254,-254,5,-,,-,-,FALSE,-,Private,Dairy & Eggs,Fuster Cluck Farm,Retail
Inspirational Cards,Inspirational Cards,Each,6,-2,15,-,,-,-,FALSE,-,Private,Non-Food Items,DiGiulio Studios [F7.5],Retail
Introduction to Sourdough Class,Curious about sourdough but not sure where to start? Join us for a hands-on Introduction to Sourdough class  hosted by Fuster Cluck Farm in collaboration with Sourdough Haven Bread Bakery. You'll learn the basics of maintaining a starter  mixing  shaping  proofing  and baking your own beautiful artisan loaves at home.This beginner-friendly class will walk you through every step of the process  answer all your sourdough questions  and send you home with your own live sourdough starter  a detailed instruction guide  a fresh-baked loaf and confidence to bake with wild yeast on your own. Whether you're brand new to baking or just need a refresher  this class will give you the foundation to master sourdough. Spots are limited - reserve yours today!,Person,11,1,125,-,,-,-,FALSE,-,Retail,Events,Sourdough Haven Bread Bakery,Sourdough Class
Jam - Hot Pepper,Jam - Hot Pepper,8 oz Jar,30,-27,12,-,,-,-,FALSE,-,Private,Pantry,Fuster Cluck Farm,Retail
Kefir Grains,Kefir Grains,Jar,28,-26,10,-,,-,-,FALSE,-,Retail,Pantry,Old Glory Farm [P80],Retail
Kitchen Coffee Spice Soap,Kitchen Coffee Spice Soap,Bar,4,11,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Lamb - Bone-In Leg Roast,Lamb - Bone-In Leg Roast,1.5-2.5 LB,-,8,-,18,32,1.5,2.5,FALSE,-,Retail,Lamb,Fuster Cluck Farm,Retail
Lamb - Boneless Leg Roast,Lamb - Boneless Leg Roast,1.5-2.5 LB,-,8,-,15,27,1.5,2.5,FALSE,-,Retail,Lamb,Fuster Cluck Farm,Retail
Lamb - Denver Ribs,Lamb - Denver Ribs,0.5-1.65 lb,-,8,-,10,24,0.5,1.65,FALSE,-,Retail,Lamb,Fuster Cluck Farm,Retail
Lamb - Frenched Rack of Ribs,Lamb - Frenched Rack of Ribs,0.95-1.6 LB,-,8,-,18,26,0.95,1.6,FALSE,-,Retail,Lamb,Fuster Cluck Farm,Retail
Lamb - Ground,Lamb - Ground,0.75-1.25 LB,-,55,-,8,16,0.75,1.25,FALSE,-,Retail,Lamb,Fuster Cluck Farm,Retail
Lamb - Loin Chop,Lamb - Loin Chop,0.3-0.65 lb,-,25,-,6,23,0.3,0.65,FALSE,-,Retail,Lamb,Fuster Cluck Farm,Retail
Lamb - Shank,Lamb - Shank,0.75-1.5 lb,-,8,-,10,18,0.75,1.5,FALSE,-,Retail,Lamb,Fuster Cluck Farm,Retail
Large Ginger Shot,Large Ginger Shot,Container,17,-16,16,-,,-,-,FALSE,-,Private,Pantry,Sunday's Farm [P70],Retail
Laundry Soap - Sunday's Farm,Laundry Soap - Sunday's Farm,2.5 LB,61,-59,15,-,,-,-,FALSE,-,Private,Non-Food Items,Sunday's Farm [P70],Retail
Lavender Vanilla Lard Soap,Lavender Vanilla Lard Soap,Bar,5,-,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Lilac & Lilly Goat Milk Soap,Lilac & Lilly Goat Milk Soap,Bar,3,-1,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Lily of the Valley Goat Milk Soap,Lily of the Valley Goat Milk Soap,Bar,2,12,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Lip Balm,Lip Balm,Each,83,-75,5,-,,-,-,FALSE,-,Private,Non-Food Items,Sunday's Farm [F2.5],Retail
Livestock - Baby Chicks  barnyard mix - straight run ,Livestock - Baby Chicks  barnyard mix - straight run ,Each,11,-6,5,-,,-,-,FALSE,-,Private,Meat (Other),Fuster Cluck Farm,Retail
Livestock - Baby Chicks  Black Star ,Livestock - Baby Chicks  Black Star ,Each,103,-95,10,-,,-,-,FALSE,-,Private,Livestock,Fuster Cluck Farm,Retail
Livestock - Roosters,Livestock - Roosters,Each,20,-,10,-,,-,-,FALSE,-,Private,Livestock,Fuster Cluck Farm,Retail
Local Honey - 16 oz,Local Honey - 16 oz,Pound,12,12,20,-,,-,-,FALSE,-,Retail,Pantry,Fuster Cluck Farm,Retail
Luffa Sponge,Luffa Sponge,Each,6,-1,3,-,,-,-,FALSE,-,Retail,Non-Food Items,Fuster Cluck Farm,Retail
Magnesium Butter Lotion,Magnesium Butter Lotion,4 oz,36,-30,25,-,,-,-,FALSE,-,Private,Non-Food Items,Sunday's Farm [P70],Retail
Magnesium Oil Spray - 4 oz,Magnesium Oil Spray - 4 oz,4 oz.,36,-32,20,-,,-,-,FALSE,-,Private,Non-Food Items,Sunday's Farm [P70],Retail
Magnet Clip - Fuster Cluck Farm,Magnet Clip - Fuster Cluck Farm,Each,1,5,4,-,,-,-,FALSE,-,Private,Non-Food Items,Fuster Cluck Farm,Retail
Maple Syrup,Maple Syrup,8 ounce,10,-2,15,-,,-,-,FALSE,-,Retail,Pantry,Fuster Cluck Farm,Retail
Microgreens - Cantaloupe,Microgreens - Cantaloupe,2 oz,13,-11,7,-,,-,-,FALSE,-,Private,Vegetables,Fuster Cluck Farm,Retail
Microgreens - Pizza Topper,Microgreens - Pizza Topper,2 oz,23,-21,7,-,,-,-,FALSE,-,Private,Vegetables,Fuster Cluck Farm,Retail
Microgreens - Powerhouse Blend,Microgreens - Powerhouse Blend - Arugula  Kale  Kohlrabi  Broccoli Cabbage,1.5 oz,69,-67,7,-,,-,-,FALSE,-,Private,Vegetables,Fuster Cluck Farm,Retail
Microgreens - Spicy Salad,Microgreens - Spicy Salad,2 oz,38,-36,7,-,,-,-,FALSE,-,Private,Vegetables,Fuster Cluck Farm,Retail
Microgreens - Veggie Confetti,Microgreens - Veggie Confetti,2 oz,49,-47,7,-,,-,-,FALSE,-,Private,Vegetables,Fuster Cluck Farm,Retail
Milk - A2A2 Cow - Raw Pet Treat  Delivery Only ,Milk - A2A2 Cow - Raw Pet Treat  Delivery Only ,Half Gallon,-,30,12,-,,-,-,FALSE,-,Retail,Dairy & Eggs,Fuster Cluck Farm,Home Delivery Test
Milk - A2A2 Cow - Raw Pet Treat  Friday pickup ,Milk - A2A2 Cow - Raw Pet Treat  Friday pickup ,Half Gallon,45,-25,12,-,,-,-,FALSE,-,Retail,Dairy & Eggs,Fuster Cluck Farm,Friday Only
Milk - A2A2 Cow - Raw Pet Treat  Friday Subscription ,Milk - A2A2 Cow - Raw Pet Treat  Friday Subscription ,Half Gallon,-,-,-,-,,-,-,FALSE,-,Retail,Dairy & Eggs,Fuster Cluck Farm,Friday Only
Milk - A2A2 Cow - Raw Pet Treat  Monday pickup ,Milk - A2A2 Cow - Raw Pet Treat  Monday pickup ,Half Gallon,12,18,12,-,,-,-,FALSE,-,Retail,Dairy & Eggs,Fuster Cluck Farm,Monday Evening Only
Milk - A2A2 Cow - Raw Pet Treat  Monday Subscription ,Milk - A2A2 Cow - Raw Pet Treat  Monday Subscription ,Half Gallon,-,10,-,-,,-,-,FALSE,-,Retail,Dairy & Eggs,Fuster Cluck Farm,Monday Evening Only
Milk - A2A2 Cow - Raw Pet Treat  Saturday pickup ,Milk - A2A2 Cow - Raw Pet Treat  Saturday pickup ,Half Gallon,29,-9,12,-,,-,-,FALSE,-,Retail,Dairy & Eggs,Fuster Cluck Farm,Saturday Only
Milk - A2A2 Cow - Raw Pet Treat  Saturday Subscription ,Milk - A2A2 Cow - Raw Pet Treat  Saturday Subscription ,Half Gallon,-,-,-,-,,-,-,FALSE,-,Retail,Dairy & Eggs,Fuster Cluck Farm,Saturday Only
Milk - Nigerian Dwarf Goat - Raw Pet Treat,Milk - Nigerian Dwarf Goat - Raw Pet Treat,1/2 Gallon,23,-19,25,-,,-,-,FALSE,-,Retail,Dairy & Eggs,Old Glory Farm [F23],Retail
Misc - Hat - Embroidered,Misc - Hat - Embroidered,Each,9,-4,30,-,,-,-,FALSE,-,Private,Non-Food Items,Fuster Cluck Farm,Retail
Misc Elderberry Syrup DIY Kit,Misc Elderberry Syrup DIY Kit,Each,4,-4,20,-,,-,-,FALSE,-,Private,Non-Food Items,Sunday's Farm [P70],Retail
Misc Elderberry Syrup Jar 16 oz,Misc Elderberry Syrup Jar 16 oz,16 oz.,4,-2,30,-,,-,-,FALSE,-,Private,Non-Food Items,Sunday's Farm [P70],Retail
Misc Koozie - regular,Misc Koozie - regular,Each,37,-17,4,-,,-,-,FALSE,-,Retail,Non-Food Items,Fuster Cluck Farm,Retail
Misc Koozie - tall,Misc Koozie - tall,Each,15,-5,4,-,,-,-,FALSE,-,Retail,Non-Food Items,Fuster Cluck Farm,Retail
Misc T-Shirt Adult,Misc T-Shirt Adult,Each,25,-23,30,-,,-,-,FALSE,-,Private,Non-Food Items,Fuster Cluck Farm,Retail
Muffins,Muffins,Package,289,-285,15,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F10],Retail
Muscadine Jelly,Muscadine Jelly,Jar,4,-,15,-,,-,-,FALSE,-,Retail,Pantry,Old Glory Farm [P80],Retail
Oat and Honey Goat Milk Soap,Oat and Honey Goat Milk Soap,Bar,16,-8,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Organic Chocolate Syrup,Organic Chocolate Syrup,Jar,7,-5,8,-,,-,-,FALSE,-,Retail,Pantry,Sunday's Farm [P70],Retail
Papa Scott's Farmhouse Blend Seasoning,Papa Scott's Farmhouse Blend Seasoning,Container,2,1,7.5,-,,-,-,FALSE,-,Retail,Pantry,Sunday's Farm [F5],Retail
Papa Scott's Ranch Dressing,Papa Scott's Ranch Dressing,Jar,4,-4,7,-,,-,-,FALSE,-,Retail,Pantry,Sunday's Farm [F5],Retail
Pecans - Pieces,Pecans - Pieces,Pound,10,-3,16,-,,-,-,FALSE,-,Retail,Vegetables,Fuster Cluck Farm,Retail
Pecans - Whole,Pecans - Whole,Pound,8,-1,16,-,,-,-,FALSE,-,Retail,Vegetables,Fuster Cluck Farm,Retail
Pepper Hash - Homemade,Pepper Hash - Homemade,Pint Jar,19,-19,12,-,,-,-,FALSE,-,Private,Pantry,Fuster Cluck Farm,Retail
Pimiento Cheese - Homemade,Pimiento Cheese - Homemade,1/2 Pound,575,-570,10,-,,-,-,FALSE,-,Private,Dairy & Eggs,Sunday's Farm [P70],Retail
Pork - Bacon,Pork - Bacon,0.5-1.5 LB,25,-25,-,7,15,0.5,1.5,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Bacon Ends and Pieces,Pork - Bacon Ends and Pieces,0.75-1.25 LB,5,15,-,3.5,7,0.75,1.25,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Boston Butt,Pork - Boston Butt,2.25-10.5 lb,7,-3,-,15,9,2.25,10.5,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Cheek,Pork - Cheek,0.35-2.25 lb,1,-1,-,1.75,7,0.35,2.25,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Chorizo Sausage,Pork - Chorizo Sausage,0.9-1.4 lbs,18,14,-,7,12,0.9,1.4,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Fuster Cluck Farm Bratwurst,Pork - Fuster Cluck Farm Bratwurst,0.75-1.15 LB,24,36,-,6,15,0.75,1.15,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Ground,Pork - Ground,.75-1.25 lb,19,1,-,4,10,0.75,1.25,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Hot Baby Links,Pork - Hot Baby Links,0.75-1.25 LB,5,35,-,5,12,0.75,1.25,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Hot Sausage Ground,Pork - Hot Sausage Ground,0.75-1.25 LB,9,21,-,5,12,0.75,1.25,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Jalapeno Smoked Sausage,Pork - Jalapeno Smoked Sausage,0.75-1.25 LB,19,-4,-,5,12,0.75,1.25,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Loin Roast Boneless,Pork - Loin Roast Boneless,2.5-4.5 LB,4,1,-,14,13,2.5,4.5,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Mild Baby Links,Pork - Mild Baby Links,0.75-1.25 LB,13,23,-,5,12,0.75,1.25,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Mild Italian Sausage Ground,Pork - Mild Italian Sausage Ground,0.75-1.75 LB,-,5,-,5,12,0.75,1.25,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Mild Sausage Ground,Pork - Mild Sausage Ground,0.75-1.5 LB,14,11,-,6,12,0.75,1.5,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Neckbones,Pork - Neckbones,2-3 lbs,11,5,-,5,4,2,3,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Picnic,Pork - Picnic,1.75-12 lbs,5,1,-,15,12,1.75,12,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Pinwheel Mild Italian Sausage,Pork - Pinwheel Mild Italian Sausage,1.5-2.5 LB,21,1,-,7,12,1.5,2.5,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Pork Chops,Pork - Pork Chops,0.4-1.5 lbs,50,50,-,3,12,0.4,1.5,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Rendered Lard Quart,Pork - Rendered Lard Quart from Heritage hogs. Rendered in a USDA facility.,Quart,2,28,30,-,,-,-,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - Smoked Polish Sausage  Kielbasa ,Pork - Smoked Polish Sausage  Kielbasa ,4-pack,-,5,-,7,15,0.75,1.25,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork - St. Louis Spare Ribs,Pork - St. Louis Spare Ribs,1-4.5 lb,2,5,-,6.5,10,1,4.5,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork Bundle Large Family Pack  20 lbs ,Built for serious home cooks  large households  and sausage lovers. This bundle includes a wide range of pork cuts with a substantial portion dedicated to our house-made sausages in rotating flavors.You’ll receive a diverse assortment of sausages alongside roasts  chops  and other premium pork cuts  selected based on availability to maximize usefulness and value. No two boxes are exactly alike  but every box is designed to keep your freezer full and your meals interesting.Best value per pound and ideal for stocking the freezer with premium pork and plenty of sausages.,Bundle,-,2,190,-,,-,-,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork Bundle Medium Family Pack  12 lbs ,Our most popular pork bundle  designed for families who cook at home and appreciate variety — especially sausages. This box features a generous assortment of pork cuts along with a solid mix of our house-made sausages in multiple flavors.Each bundle includes a thoughtful balance of sausages  roasts  chops  and versatile cuts that work across grilling  pan cooking  and slow cooking. Specific cuts and sausage flavors will vary  but every box delivers consistent value and freezer-friendly variety.Perfect for families who enjoy easy meals without sacrificing quality or flavor.,Bundle,-,2,150,-,,-,-,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pork Sampler Bundle  8 lbs ,A well-rounded introduction to pasture-raised pork  with a strong emphasis on our flavorful pork sausages. This bundle includes a mix of fresh and frozen cuts for everyday meals  plus a selection of sausages in rotating flavors.Expect a combination of sausages  chops  roasts  and other customer favorites. Exact cuts and sausage flavors may vary based on availability  but every box is packed for convenience  variety  and great eating.Ideal for individuals or couples who want high-quality pork with plenty of ready-to-cook options.,Bundle,-,2,80,-,,-,-,FALSE,-,Retail,Pork,Fuster Cluck Farm,Retail
Pure Vanilla Extract,Pure Vanilla Extract,4 oz.,3,7,30,-,,-,-,FALSE,-,Retail,Pantry,Fuster Cluck Farm [P25],Retail
Ranch Seasoning Mix,Ranch Seasoning Mix,4 oz,4,-2,7,-,,-,-,FALSE,-,Retail,Pantry,Fuster Cluck Farm [P25],Retail
Raspberry Lemonade Goat Milk Soap,Raspberry Lemonade Goat Milk Soap,Bar,3,19,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Raspberry Vanilla Goat Milk Soap,Raspberry Vanilla Goat Milk Soap,Bar,9,1,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Rose & Peony Goat Milk Soap,Rose & Peony Goat Milk Soap,Bar,13,-6,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Scone Flight - Sourdough,Scone Flight - Sourdough,Package,12,-12,12,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F8],Retail
Scones - Sourdough,Scones - Sourdough,2-pack,281,-280,7.5,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F4],Retail
Seasoning Gift Pack,Seasoning Gift Pack,Package,2,1,20,-,,-,-,FALSE,-,Retail,Pantry,Sunday's Farm [P70],Retail
Simmer Potpourri,Simmer Potpourri,Bag,13,-13,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Fuster Cluck Farm [P25],Retail
Sourdough Baguette,Sourdough Baguette,Loaf,107,-105,8,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F5],Retail
Sourdough Bread Cubes,Sourdough Bread Cubes,1 Pound,6,-4,15,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F10],Retail
Sourdough Bread Flight,Sourdough Bread Flight,4 Pack,8,-8,30,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F20],Retail
Sourdough Brownies 2-pack,Sourdough Brownies 2-pack,2-pack,397,-390,8,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F5],Retail
Sourdough Buttermilk Waffles  8 Pack  Frozen ,Sourdough Buttermilk Waffles  8 Pack  Frozen ,8 Pack,10,-7,15,-,,-,-,FALSE,-,Private,Bakery,Fuster Cluck Farm [P25],Retail
Sourdough Cinnamon Sugar Pull Apart Bread,Sourdough Cinnamon Sugar Pull Apart Bread,Package,19,-18,15,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F10],Retail
Sourdough Cookies - 6-pack,Sourdough Cookies - 6-pack,6-pack,1399,-1399,12,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F9],Retail
Sourdough Focaccia,Sourdough Focaccia,Loaf,240,-239,10,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F7],Retail
Sourdough Gingerbread Cookies,Sourdough Gingerbread Cookies,Package,17,-13,12,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F9],Retail
Sourdough Hamburger Buns - 8 Pack,Sourdough Hamburger Buns - 8 Pack,8-Pack,40,-40,16,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F12],Retail
Sourdough Hot Dog Buns - 8 Pack,Sourdough Hot Dog Buns - 8 Pack,8 Pack,5,-5,14,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F10],Retail
Sourdough Pancake Mix,Sourdough Pancake Mix,Package,10,-8,12,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F9],Retail
Sourdough Pizza Crust,Sourdough Pizza Crust,2 Pack,124,-124,15,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F10],Retail
Sourdough Rolls,Sourdough Rolls,Half Dozen,15,-11,12,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F8],Retail
Sourdough Snicker Doodle Cookies - 6-pack,Sourdough Snicker Doodle Cookies - 6-pack,6-Pack,6,-,12,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F9],Retail
Sourdough Starter - Pint,Sourdough Starter - Pint,Pint,3,-1,15,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F10],Retail
Sourdough Sweet Bread 2 Slices,Sourdough Sweet Bread 2 Slices,2 Slices,124,-124,8,-,,-,-,FALSE,-,Private,Bakery,Sourdough Haven Bread and Bakery [F5.5],Retail
Spinach - Organic Baby Leaf,Spinach - Organic Baby Leaf ,6 oz,7,-7,7,-,,-,-,FALSE,-,Private,Vegetables,Fuster Cluck Farm,Retail
Spreadable Whipped Honey,Spreadable Whipped Honey,Half Pint,7,-3,25,-,,-,-,FALSE,-,Private,Pantry,Fuster Cluck Farm [P25],Retail
Strawberry Bovre Cow Cheese,Strawberry Bovre Cow Cheese,8 oz,43,-39,12,-,,-,-,FALSE,-,Private,Dairy & Eggs,Old Glory Farm [P80],Retail
Strawberry Jam,Strawberry Jam,Half Pint,8,-6,15,-,,-,-,FALSE,-,Private,Fruit,Fuster Cluck Farm,Retail
Sundays Farm Gift Pack 20,Sundays Farm Gift Pack 20,Pack,7,-3,26,-,,-,-,FALSE,-,Private,Non-Food Items,Sunday's Farm [P70],Rebel Canning
Tabbaco & Bay Leaf Goat Milk Soap,Tabbaco & Bay Leaf Goat Milk Soap,Bar,1,-,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Tallow Balm - 2 oz Lavender-Comfrey Whipped,Tallow Balm - 2 oz Lavender-Comfrey Whipped - 6 oz,2 oz,5,-3,15,-,,-,-,FALSE,-,Retail,Non-Food Items,Fuster Cluck Farm [P25],Retail
Tallow Balm - 4 oz Lavender-Comfrey Whipped,Tallow Balm - 4 oz Lavender-Comfrey Whipped,4 oz,3,-1,24,-,,-,-,FALSE,-,Retail,Non-Food Items,Fuster Cluck Farm [P25],Retail
Tincture,Tincture,Bottle,48,-43,15,-,,-,-,FALSE,-,Private,Pantry,Fuster Cluck Farm,Retail
Tomato Juice - Homemade,Tomato Juice - Homemade,Quart Jar,11,-11,15,-,,-,-,FALSE,-,Retail,Pantry,Fuster Cluck Farm,Retail
Tooth Powder,Tooth Powder,2 oz.,45,-38,18,-,,-,-,FALSE,-,Retail,Non-Food Items,Sunday's Farm [P70],Retail
Tuscan Bread Dip Mix,Tuscan Bread Dip Mix,Package,37,-37,7.5,-,,-,-,FALSE,-,Retail,Bakery,Sourdough Haven Bread and Bakery [F5],Retail
Unsalted Butter - Simply Natural Creamery,Unsalted Butter - Simply Natural Creamery,1 LB,8,-1,14,-,,-,-,FALSE,-,Retail,Dairy & Eggs,Simply Natural Creamery,Retail
Unscented Goat Milk Soap,Unscented Goat Milk Soap,Bar,9,2,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Violet Goat Milk Soap,Violet Goat Milk Soap,Bar,21,-11,10,-,,-,-,FALSE,-,Retail,Non-Food Items,Wendell Blueberry Farm [P80],Retail
Whipped Tallow Face Balm 2 oz,Whipped Tallow Face BalmTallow  JoJoba Oil  Castor Oil  Rosehip Seed Oil  Frankincense Oil  Lavender Essential Oil,2 oz,8,-7,20,-,,-,-,FALSE,-,Retail,Non-Food Items,Fuster Cluck Farm [P25],Retail
Whipped Tallow Face Balm 6 oz,Whipped Tallow Face BalmTallow  JoJoba Oil  Castor Oil  Rosehip Seed Oil  Frankincense Oil  Lavender Essential Oil,6 oz,4,1,40,-,,-,-,FALSE,-,Retail,Non-Food Items,Fuster Cluck Farm [P25],Retail
Yogurt - 8 oz,Yogurt - 8 oz,8 oz,75,-74,5,-,,-,-,FALSE,-,Private,Dairy & Eggs,Fuster Cluck Farm [P25],Retail
`;

// Elements
const grid = document.getElementById('itemGrid');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('previewModal');
const closeModal = document.getElementById('closeModal');
const printBtn = document.getElementById('printBtn');
const pTitle = document.getElementById('pTitle');
const pPrice = document.getElementById('pPrice');
const pUnit = document.getElementById('pUnit');

// PrintNode State
let printNodeApiKey = '';
let printNodePrinterId = '';

// Settings Elements
const settingsModal = document.getElementById('settingsModal');
const settingsBtn = document.getElementById('settingsBtn');
const closeSettingsModal = document.getElementById('closeSettingsModal');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const apiKeyInput = document.getElementById('apiKeyInput');
const printerIdInput = document.getElementById('printerIdInput');

// Firebase Settings Elements
const fbApiKeyInput = document.getElementById('fbApiKeyInput');
const fbAuthDomainInput = document.getElementById('fbAuthDomainInput');
const fbProjectIdInput = document.getElementById('fbProjectIdInput');
const fbStorageBucketInput = document.getElementById('fbStorageBucketInput');
const fbMessagingSenderIdInput = document.getElementById('fbMessagingSenderIdInput');
const fbAppIdInput = document.getElementById('fbAppIdInput');

// Firebase State
let firebaseConfig = null;
let db = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    fetchCDF();
    setupEventListeners();
});

function loadSettings() {
    printNodeApiKey = localStorage.getItem('printNodeApiKey') || '';
    printNodePrinterId = localStorage.getItem('printNodePrinterId') || '';
    
    const savedFbConfig = localStorage.getItem('firebaseConfig');
    if (savedFbConfig) {
        try {
            firebaseConfig = JSON.parse(savedFbConfig);
            initFirebase();
        } catch(e) {
            console.error("Error parsing saved Firebase config", e);
        }
    }
}

function initFirebase() {
    if (!firebaseConfig || !firebaseConfig.apiKey) return;
    
    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        db = firebase.firestore();
        console.log("Firebase initialized successfully.");
    } catch(e) {
        console.error("Error initializing Firebase", e);
    }
}

async function fetchCDF() {
    // 1. Try Firebase First
    if (db) {
        try {
            const docRef = db.collection("shelf_labels").doc("item_list");
            const docSnap = await docRef.get();
            
            if (docSnap.exists) {
                console.log("Loaded items from Firebase!");
                const data = docSnap.data();
                if (data.items && data.items.length > 0) {
                    items = data.items;
                    renderItems(items);
                    return;
                }
            } else {
                console.log("No items found in Firebase. Falling back to default list.");
            }
        } catch(e) {
            console.error("Error loading from Firebase:", e);
        }
    }

    // 2. Fallback to Local/Embedded Data
    if (window.location.protocol === 'file:') {
        console.warn('Running locally via file:// protocol. Using embedded fallback data.');
        parseCSV(FALLBACK_CSV);
        return;
    }

    Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: function (results) {
            handleParseResults(results);
        },
        error: function (err) {
            console.error("Error parsing CSV:", err);
            showError();
        }
    });
}

function parseCSV(csvString) {
    Papa.parse(csvString, {
        header: true,
        complete: function (results) {
            handleParseResults(results);
        },
        error: function (err) {
            console.error("Error parsing embedded CSV:", err);
            showError();
        }
    });
}

function handleParseResults(results) {
    items = results.data.filter(item => item['Item Title']); // Filter empty lines
    renderItems(items);
}

function showError() {
    grid.innerHTML = `
        <div class="error-message" style="grid-column: 1/-1; text-align: center; padding: 2rem;">
            <h3>Error Loading Data</h3>
            <p>Could not load <code>data.csv</code>.</p>
            <p><strong>Note:</strong> If you are opening this file directly (file://), browser security restricts reading local files.</p>
            <p>Please use a local web server (like VS Code Live Server) or upload these files to a web host.</p>
        </div>
    `;
}

function renderItems(data) {
    grid.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';

        let priceDisplay = getPriceDisplay(item);

        card.innerHTML = `
            <h3>${item['Item Title']}</h3>
            <p class="price">${priceDisplay}</p>
        `;

        card.addEventListener('click', () => openPreview(item));
        grid.appendChild(card);
    });
}

function filterItems(query) {
    const lowerQuery = query.toLowerCase();
    const filtered = items.filter(item =>
        item['Item Title'] && item['Item Title'].toLowerCase().includes(lowerQuery)
    );
    renderItems(filtered);
}

function openPreview(item) {
    pTitle.textContent = item['Item Title'];

    const unitPrice = item['Unit Price'];
    const pricePerLb = item['Price/Lb'];
    const unitSize = item['Unit Size'];

    if (isValidPrice(unitPrice)) {
        pPrice.textContent = `$${unitPrice}`;
        // Use Unit Size from CSV if available, otherwise default to "per unit"
        pUnit.textContent = unitSize || "per unit";
    } else if (isValidPrice(pricePerLb)) {
        pPrice.textContent = `$${pricePerLb}`;
        pUnit.textContent = "per lb";
    } else {
        pPrice.textContent = "Ask for Price";
        pUnit.textContent = "";
    }

    modal.classList.remove('hidden');

    // Adjust font size linearly to fit the container
    adjustFontSize(pTitle);
}

// Adjust font size to fit container
function adjustFontSize(element) {
    // Reset to base size first
    let currentSize = 32; // This matches the CSS starting point
    element.style.fontSize = `${currentSize}pt`;

    // Minimum readable font size
    const minSize = 14;

    // Tolerance for sub-pixel rendering differences
    const tolerance = 2;

    // Reduce size until it fits inside the container (approx 2 lines)
    // We check if scrollHeight is significantly larger than clientHeight
    while (element.scrollHeight > (element.clientHeight + tolerance) && currentSize > minSize) {
        currentSize--;
        element.style.fontSize = `${currentSize}pt`;
    }
}

// Helper to check if a price value is valid (not empty, not hyphen)
function isValidPrice(val) {
    return val && val.trim() !== '' && val.trim() !== '-';
}

function getPriceDisplay(item) {
    const unitPrice = item['Unit Price'];
    const pricePerLb = item['Price/Lb'];
    const unitSize = item['Unit Size'];

    if (isValidPrice(unitPrice)) {
        return unitSize ? `$${unitPrice} / ${unitSize}` : `$${unitPrice}`;
    } else if (isValidPrice(pricePerLb)) {
        return `$${pricePerLb} /lb`;
    }
    return '';
}

function setupEventListeners() {
    const clearBtn = document.getElementById('clearSearchBtn');

    searchInput.addEventListener('input', (e) => {
        filterItems(e.target.value);
        if (clearBtn) {
            clearBtn.style.display = e.target.value ? 'block' : 'none';
        }
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            filterItems('');
            clearBtn.style.display = 'none';
            searchInput.focus();
        });
    }

    const customBtn = document.getElementById('customBtn');
    if (customBtn) {
        customBtn.addEventListener('click', openCustomLabel);
    }

    // File Upload handling
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('csvFileInput');

    if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                Papa.parse(file, {
                    header: true,
                    complete: async function (results) {
                        handleParseResults(results);
                        searchInput.value = '';
                        
                        // Auto-sync to Firebase if configured
                        if (db && items.length > 0) {
                            try {
                                uploadBtn.textContent = 'Syncing...';
                                uploadBtn.disabled = true;
                                await db.collection("shelf_labels").doc("item_list").set({
                                    items: items,
                                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                                });
                                console.log("Successfully synced list to Firebase!");
                                alert("List successfully imported and synced to the cloud!");
                            } catch(err) {
                                console.error("Error syncing to Firebase:", err);
                                alert("List imported locally, but failed to sync to the cloud.");
                            } finally {
                                uploadBtn.textContent = 'Load List';
                                uploadBtn.disabled = false;
                            }
                        } else if (!db) {
                            alert("List imported locally. Note: Cloud sync is not configured in Settings, so other devices won't see this new list.");
                        }
                    },
                    error: function (err) {
                        console.error("Error parsing uploaded file:", err);
                        alert("Error parsing file. Please check the CSV format.");
                    }
                });
            }
        });
    }

    // Auto-scale font as user edits the title
    pTitle.addEventListener('input', () => {
        adjustFontSize(pTitle);
    });

    // Prevent newlines in editable fields (optional but good for labels)
    [pTitle, pPrice, pUnit].forEach(el => {
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                el.blur();
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Settings Modal Listeners
    if (settingsBtn) {
        settingsBtn.addEventListener('click', openSettings);
    }
    if (closeSettingsModal) {
        closeSettingsModal.addEventListener('click', () => {
            settingsModal.classList.add('hidden');
        });
    }
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', saveSettings);
    }

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.add('hidden');
        }
        if (e.target == settingsModal) {
            settingsModal.classList.add('hidden');
        }
    });

    document.getElementById('printBtn').addEventListener('click', handlePrint);
}

function openCustomLabel() {
    pTitle.textContent = "New Item Name";
    pPrice.textContent = "$0.00";
    pUnit.textContent = "UNIT";

    modal.classList.remove('hidden');
    adjustFontSize(pTitle);

    // Focus title for immediate editing
    setTimeout(() => {
        pTitle.focus();
        // select all text
        document.execCommand('selectAll', false, null);
    }, 50);
}

function openSettings() {
    apiKeyInput.value = printNodeApiKey;
    printerIdInput.value = printNodePrinterId;
    
    if (firebaseConfig) {
        fbApiKeyInput.value = firebaseConfig.apiKey || '';
        fbAuthDomainInput.value = firebaseConfig.authDomain || '';
        fbProjectIdInput.value = firebaseConfig.projectId || '';
        fbStorageBucketInput.value = firebaseConfig.storageBucket || '';
        fbMessagingSenderIdInput.value = firebaseConfig.messagingSenderId || '';
        fbAppIdInput.value = firebaseConfig.appId || '';
    }

    settingsModal.classList.remove('hidden');
}

function saveSettings() {
    printNodeApiKey = apiKeyInput.value.trim();
    printNodePrinterId = printerIdInput.value.trim();

    localStorage.setItem('printNodeApiKey', printNodeApiKey);
    localStorage.setItem('printNodePrinterId', printNodePrinterId);
    
    // Save Firebase Config
    const fbApiKey = fbApiKeyInput.value.trim();
    if (fbApiKey) {
        const newFbConfig = {
            apiKey: fbApiKey,
            authDomain: fbAuthDomainInput.value.trim(),
            projectId: fbProjectIdInput.value.trim(),
            storageBucket: fbStorageBucketInput.value.trim(),
            messagingSenderId: fbMessagingSenderIdInput.value.trim(),
            appId: fbAppIdInput.value.trim()
        };
        localStorage.setItem('firebaseConfig', JSON.stringify(newFbConfig));
        
        // Reload page to re-initialize firebase
        if (!firebaseConfig || firebaseConfig.apiKey !== newFbConfig.apiKey) {
            alert('Settings Saved! The page will now reload to apply Firebase changes.');
            window.location.reload();
            return;
        }
        firebaseConfig = newFbConfig;
    } else {
        localStorage.removeItem('firebaseConfig');
        firebaseConfig = null;
    }

    alert('Settings Saved!');
    settingsModal.classList.add('hidden');
}

async function handlePrint() {
    if (printNodeApiKey && printNodePrinterId) {
        await printViaPrintNode();
    } else {
        window.print();
    }
}

async function printViaPrintNode() {
    const printBtn = document.getElementById('printBtn');
    const originalText = printBtn.textContent;
    printBtn.textContent = 'Printing...';
    printBtn.disabled = true;

    try {
        const element = document.getElementById('printableLabel');

        // Capture HTML to Canvas
        const canvas = await html2canvas(element, {
            scale: 4, // Higher scale for better resolution
            useCORS: true,
            backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');

        // Create PDF
        // Label size: 4in x 3in (per CSS)
        // Adjust for jsPDF (points or inches). 
        // 1 inch = 72 points
        // 4 inch = 288 points
        // 3 inch = 216 points
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'in',
            format: [4, 3]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, 4, 3);
        const pdfBase64 = pdf.output('datauristring').split(',')[1];

        // Send to PrintNode
        const response = await fetch('https://api.printnode.com/printjobs', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(printNodeApiKey + ':'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                printerId: parseInt(printNodePrinterId),
                title: 'Shelf Label',
                contentType: 'pdf_base64',
                content: pdfBase64,
                source: 'Shelf Labels App'
            })
        });

        if (response.ok) {
            alert('Print job sent to PrintNode!');
        } else {
            const errText = await response.text();
            console.error('PrintNode Error:', errText);
            alert('Failed to send print job. Check console for details.');
        }

    } catch (error) {
        console.error('Printing Error:', error);
        alert('An error occurred while printing.');
    } finally {
        printBtn.textContent = originalText;
        printBtn.disabled = false;
    }
}
